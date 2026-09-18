// lib.js — pptxgenjs 아키타입 라이브러리 (KMAC M5 교안 덱)
// 디자인 규칙: docs/design-system/ppt-design-guide.md (Apple 그래머 × 나눔고딕, 단일 Action Blue)
// 사용법: const { createDeck } = require('./lib'); const deck = createDeck({ title, footerText });
//        deck.cover({...}); deck.bullets({...}); ... ; await deck.save(outPath);
// 모든 아키타입 함수는 opts.notes(발표자 노트) · opts.kind(유형 pill) · opts.footnote(하단 각주)를 받는다.
// 텍스트는 길이에 따라 폰트를 단계적으로 줄이고, 예상 줄 수가 박스를 넘으면 console.warn('[overflow] slide N …')를 남긴다.

"use strict";

const path = require("path");
const fs = require("fs");
const pptxgen = require("pptxgenjs");

// ══════════════════════════════════════════════════════
// DESIGN TOKENS — ppt-design-guide §1~§4 그대로
// ══════════════════════════════════════════════════════
const C = {
  accent: "0066CC",     // Action Blue — 유일 액센트
  focus: "0071E3",      // 선택/포커스
  sky: "2997FF",        // 다크 표면 위 강조
  ink: "1D1D1F",        // 기본 텍스트 · 다크 타일
  gray: "86868B",       // 보조 텍스트
  grayLine: "D2D2D7",   // 구분선·테두리
  hairline: "E8E8ED",   // 1px 미세 구분선
  canvas: "FFFFFF",
  white: "FFFFFF",
  parchment: "F5F5F7",  // 보조 배경·카드
  tile: "1D1D1F",       // 다크 슬라이드
  tint: "EAF2FB",       // 강조 카드 배경(블루 틴트)
  tintText: "004C99",   // 틴트 위 진한 라벨
  darkCard: "2C2C2E",   // 다크 슬라이드 위 카드
  darkLine: "3A3A3C",   // 다크 슬라이드 위 hairline
  darkGray: "A1A1A6",   // 다크 슬라이드 위 보조 텍스트
};

// 폰트 패밀리명 — 기본은 한글 로컬라이즈명(macOS LibreOffice PDF 변환은 이 이름만 인식; PowerPoint·Windows도 로컬라이즈명을 매칭).
// createDeck({ fontNames: "en" })으로 영문명("NanumGothic ExtraBold" …)으로 전환 가능. Bold는 패밀리 + bold:true 로 표현(파일에 Bold 별도 패밀리명이 없음).
const FONT_SETS = {
  ko: { title: "나눔고딕 ExtraBold", bold: "나눔고딕\u0000BOLD", body: "나눔고딕", light: "나눔고딕 Light", code: "나눔고딕" },
  en: { title: "NanumGothic ExtraBold", bold: "NanumGothic\u0000BOLD", body: "NanumGothic", light: "NanumGothic Light", code: "NanumGothic" },
};
const F = Object.assign({}, FONT_SETS.ko);
// 나눔고딕 자연 행간(lineSpacingMultiple 1.0일 때 줄 높이, em). LibreOffice 렌더 실측 ≈1.33 · PowerPoint ≈1.2 — 큰 값을 기준으로 잡아 넘침을 보수적으로 잡는다
const NAT_LH = 1.33;
const DEFAULT_LH = 1.3; // lineSpacingMultiple 미지정 박스에 적용할 em 값
const TABLE_LH = 1.22; // 표 행 높이 추정용 em 값 — 1.12(과소: 2줄 셀이 note 를 덮음)와 1.33(과대: 정상 표도 overflow 경고) 사이 실측 절충

// F.bold 는 "패밀리 + bold" 센티널 → 실제 XML에는 typeface=패밀리, b=1 로 쓴다
function normFont(o) {
  if (!o || typeof o !== "object") return o;
  if (typeof o.fontFace === "string" && o.fontFace.includes("\u0000BOLD")) { o.fontFace = o.fontFace.split("\u0000")[0]; o.bold = true; }
  return o;
}
function normRuns(text) {
  if (Array.isArray(text)) text.forEach((r) => r && r.options && normFont(r.options));
  return text;
}

const SW = 10;
const SH = 5.625;

const L = {
  sw: SW,
  sh: SH,
  mx: 0.7,                 // 좌우 안전 여백
  top: 0.5,                // 상단 안전 여백
  bottom: 0.45,            // 하단 안전 여백
  cw: SW - 0.7 * 2,        // 콘텐츠 폭 8.6
  kickerY: 0.5,
  titleY: 0.62,
  contentTop: 1.65,        // 기본 콘텐츠 시작
  contentBottom: 4.75,     // 콘텐츠 끝
  footnoteY: 4.78,         // 각주 존 4.78–5.0
  footerRuleY: 5.02,
  footerY: 5.08,
  gutter: 0.3,
  cardPad: 0.25,           // 카드 내부 패딩 24px
  radius: 0.1,
  // 타입 스케일 (pt)
  size: {
    display: 40, h1: 26, h2: 19, lead: 16, body: 13.5, caption: 11, footnote: 9.5, stat: 60,
  },
  // 단계적 축소 사다리
  steps: {
    title: [26, 22, 20],
    subtitle: [15, 13.5, 12.5],
    body: [13.5, 12, 11, 10],
    small: [12, 11, 10],
    prompt: [13, 12, 11, 10, 9],
    display: [40, 34, 30, 26],
  },
  lh: { title: 1.15, body: 1.45, tight: 1.3 }, // 단위 = em(글자 크기 대비 줄 높이). 쓰기 시점에 PPT 배수(÷NAT_LH)로 변환
};

const KINDS = ["강의", "시연", "실습단계", "캡처", "참고"];
const VIRTUAL_RE = /머니핏|핀트리|moneyfit-|fintree-/;
const VIRTUAL_FOOTNOTE = "교육용 가상 사례 · 수치 [가정]";
const CAPTURE_COMMON_CAPTION = "예시 화면 · 교육용 가상 사례"; // 코드 생성 예시 화면 기준(실캡처로 교체 시에도 동일 표기)
const TITLE_MAX_CHARS = 45; // 공백 제외

// ══════════════════════════════════════════════════════
// TEXT METRICS — 한글 1자 ≈ pt/72 in, 영문 소문자 ≈ 0.52em, 대문자·숫자 ≈ 0.62em
// ══════════════════════════════════════════════════════
// 나눔고딕 실측(hmtx, upm 1000): 한글 0.94 · 공백 0.28 · a-z 0.52 · A-Z 0.65 · 숫자 0.61 · '·' 0.29 · '—' 0.86 · 괄호 0.36 · 따옴표 0.19
function charEm(ch) {
  const code = ch.codePointAt(0);
  if (ch === " ") return 0.28;
  if (ch === "\t") return 1.2;
  if (code < 0x80) {
    if (/[A-Z]/.test(ch)) return 0.66;
    if (/[0-9]/.test(ch)) return 0.61;
    if (/[a-z]/.test(ch)) return 0.53;
    if (/[.,:;'`|!]/.test(ch)) return 0.3;
    if (/[()\[\]{}\/\\-]/.test(ch)) return 0.37;
    return 0.5; // 기타 기호
  }
  if (code >= 0x2018 && code <= 0x201f) return 0.2; // ‘’“”
  if (code === 0x00b7 || code === 0x2022) return 0.3;  // · •
  if (code === 0x2014 || code === 0x2013) return 0.87; // — –
  if (code < 0x2e80 && !(code >= 0x1100 && code <= 0x11ff)) return 0.94; // 화살표·기호
  return 0.94; // 한글·CJK·전각
}

function flatText(t) {
  if (t == null) return "";
  if (typeof t === "string") return t;
  if (Array.isArray(t)) return t.map((r) => (typeof r === "string" ? r : flatText(r && r.text)) + (r && r.options && r.options.breakLine ? "\n" : "")).join("");
  if (typeof t === "object" && t.text != null) return flatText(t.text);
  return String(t);
}

function textWidthIn(str, pt) {
  let em = 0;
  for (const ch of str) em += charEm(ch);
  return (em * pt) / 72;
}

// 단어 단위 greedy 줄바꿈(공백 기준) · 단어가 한 줄보다 길면 글자 단위 분할
function estimateLines(text, boxW, pt) {
  const str = flatText(text);
  if (!str) return 1;
  const usable = Math.max(0.3, boxW);
  let lines = 0;
  for (const para of str.split("\n")) {
    if (para.trim() === "") { lines += 1; continue; }
    // 공백 외에도 화살표·중점·대시·슬래시·닫는 괄호 뒤는 줄바꿈 기회(PowerPoint·LibreOffice 동일)
    const words = para.split(" ").flatMap((w) => w.split(/(?<=[→·—–\/,)\]」』、。])/).filter(Boolean));
    let cur = 0;
    let n = 1;
    const spaceW = (0.3 * pt) / 72;
    for (const w of words) {
      const ww = textWidthIn(w, pt);
      if (ww > usable) {
        // 글자 단위 분할
        if (cur > 0) { n += 1; cur = 0; }
        let acc = 0;
        for (const ch of w) {
          const cw = (charEm(ch) * pt) / 72;
          if (acc + cw > usable) { n += 1; acc = cw; } else acc += cw;
        }
        cur = acc + spaceW;
        continue;
      }
      if (cur === 0) cur = ww + spaceW;
      else if (cur + ww > usable) { n += 1; cur = ww + spaceW; }
      else cur += ww + spaceW;
    }
    lines += n;
  }
  return lines;
}

function lineH(pt, lh) { return (pt / 72) * (lh || DEFAULT_LH); } // lh = em

// 박스(w × h)에 텍스트가 들어가도록 폰트를 단계적으로 줄인다.
// sizes: 우선 시도 크기 배열 · minSize 아래로는 내려가지 않는다.
function fitText(text, w, h, opts = {}) {
  const lh = opts.lh != null ? opts.lh : L.lh.body;
  const sizes = (opts.sizes || L.steps.body).slice();
  const minSize = opts.minSize != null ? opts.minSize : 10;
  let last = sizes[sizes.length - 1];
  while (last - 1 >= minSize) { last -= 1; sizes.push(last); }
  let res = null;
  for (const size of sizes) {
    if (size < minSize) break;
    const lines = estimateLines(text, w, size);
    const need = lines * lineH(size, lh);
    res = { size, lines, need, overflow: need > h + 0.03 };
    if (!res.overflow) return res;
    if (opts.maxLines && lines <= opts.maxLines) { res.overflow = false; return res; }
  }
  return res || { size: minSize, lines: 1, need: lineH(minSize, lh), overflow: false };
}

function stripSpaces(s) { return flatText(s).replace(/\s+/g, ""); }

// 제목 전용: 어떤 크기든 1줄이면 그 크기, 아니면 2줄이 되는 가장 큰 크기(제목은 2줄까지 허용)
function fitTitle(text, w, sizes) {
  for (const size of sizes) { const lines = estimateLines(text, w, size); if (lines <= 1) return { size, lines }; }
  for (const size of sizes) { const lines = estimateLines(text, w, size); if (lines <= 2) return { size, lines }; }
  const size = sizes[sizes.length - 1];
  return { size, lines: estimateLines(text, w, size) };
}

// ══════════════════════════════════════════════════════
// DECK
// ══════════════════════════════════════════════════════
function createDeck(cfg = {}) {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = cfg.author || "차성재";
  pres.company = cfg.company || "";
  pres.title = cfg.title || "";
  pres.subject = cfg.subject || cfg.title || "";

  if (cfg.fontNames && FONT_SETS[cfg.fontNames]) Object.assign(F, FONT_SETS[cfg.fontNames]);
  const deck = {
    pres, C, F, L, KINDS,
    title: cfg.title || "",
    footerText: cfg.footerText || cfg.title || "",
    baseDir: cfg.baseDir || path.resolve(__dirname, "..", ".."), // 프로젝트 루트 → 'assets/builder/x.png'
    showKind: cfg.showKind !== false,
    captureCaption: cfg.captureCaption !== undefined ? cfg.captureCaption : CAPTURE_COMMON_CAPTION,
    autoVirtualFootnote: cfg.autoVirtualFootnote !== false,
    virtualFootnote: cfg.virtualFootnote || VIRTUAL_FOOTNOTE,
    warnings: [],
    fitText, estimateLines, textWidthIn, flatText,
  };

  // ── 경고 ──
  function warn(ctx, tag, msg) {
    const line = `[${tag}] slide ${ctx.n} (${ctx.name}) ${msg}`;
    deck.warnings.push({ tag, slide: ctx.n, name: ctx.name, msg });
    console.warn(line);
  }

  // ── 경로 해석: 절대경로 그대로 · 상대경로는 baseDir(기본: 프로젝트 루트) 기준 ──
  function resolveAsset(p) {
    if (!p) return null;
    return path.isAbsolute(p) ? p : path.resolve(deck.baseDir, p);
  }
  deck.resolveAsset = resolveAsset;

  // ── 슬라이드 컨텍스트 ──
  function begin(name, opts = {}) {
    const s = pres.addSlide();
    const n = pres.slides.length;
    const dark = !!opts.dark;
    s.background = { color: dark ? C.tile : opts.parchment ? C.parchment : C.canvas };
    const ctx = { s, n, name, dark, texts: [], title: flatText(opts.title || ""), footer: opts.footer !== false, footnote: opts.footnote, notes: opts.notes };
    return ctx;
  }

  // 텍스트 추가 + 텍스트 수집(가상 표기 자동 각주용)
  function tx(ctx, text, o) {
    ctx.texts.push(flatText(text));
    const base = { fontFace: F.body, margin: 0, color: ctx.dark ? C.white : C.ink };
    const opt = normFont(Object.assign(base, o));
    // em → PPT 배수 변환 (미지정 시 DEFAULT_LH)
    opt.lineSpacingMultiple = +(((opt.lineSpacingMultiple || DEFAULT_LH) / NAT_LH).toFixed(2));
    ctx.s.addText(normRuns(text), opt);
  }

  function rect(ctx, x, y, w, h, fill, line) {
    ctx.s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: fill }, line: line || { type: "none" } });
  }

  function card(ctx, x, y, w, h, o = {}) {
    ctx.s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w, h, rectRadius: o.radius != null ? o.radius : L.radius,
      fill: { color: o.bg || (ctx.dark ? C.darkCard : C.parchment) },
      line: o.border ? { color: ctx.dark ? C.darkLine : C.hairline, width: 0.75 } : { type: "none" },
    });
    if (o.leftAccent) {
      ctx.s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 0.055, h, rectRadius: 0.027, fill: { color: o.leftAccent === true ? C.accent : o.leftAccent } });
    }
  }

  function pill(ctx, x, y, w, h, text, o = {}) {
    ctx.s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: h / 2, fill: { color: o.bg || C.parchment }, line: o.border ? { color: C.grayLine, width: 0.75 } : { type: "none" } });
    tx(ctx, text, { x, y, w, h, fontSize: o.fontSize || 8.5, fontFace: o.fontFace || F.bold, color: o.color || C.gray, align: "center", valign: "middle", charSpacing: o.charSpacing != null ? o.charSpacing : 0.5 });
  }

  function placeholder(ctx, x, y, w, h, label) {
    ctx.s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: ctx.dark ? C.darkCard : C.parchment }, line: { color: C.gray, dashType: "dash", width: 1 } });
    const lines = ["[ 캡처 자리 ]", label || ""].filter(Boolean).join("\n");
    tx(ctx, lines, { x: x + 0.1, y, w: w - 0.2, h, fontSize: 10.5, color: C.gray, align: "center", valign: "middle", lineSpacingMultiple: 1.3 });
  }

  // 이미지: 파일이 있으면 contain 배치, 없으면 placeholder + 경고 대신 info
  function image(ctx, p, x, y, w, h, label) {
    const full = resolveAsset(p);
    if (full && fs.existsSync(full)) {
      // altText: pptxgenjs는 미지정 시 절대경로를 descr 에 넣는다 → 파일명만 남긴다(홈 경로 유출 방지)
      ctx.s.addImage({ path: full, x, y, w, h, sizing: { type: "contain", x, y, w, h }, altText: path.basename(full) });
      return true;
    }
    placeholder(ctx, x, y, w, h, label || (p ? path.basename(p) : ""));
    if (p) warn(ctx, "missing-image", `${p} → placeholder`);
    return false;
  }

  // ── 러닝 푸터(좌 텍스트 · 우 페이지 번호) ──
  function runningFooter(ctx) {
    const dark = ctx.dark;
    rect(ctx, L.mx, L.footerRuleY, L.cw, 0.008, dark ? C.darkLine : C.hairline);
    tx(ctx, deck.footerText, { x: L.mx, y: L.footerY, w: 6.0, h: 0.28, fontSize: L.size.footnote, color: dark ? C.darkGray : C.gray });
    tx(ctx, String(ctx.n).padStart(2, "0"), { x: SW - L.mx - 0.8, y: L.footerY, w: 0.8, h: 0.28, fontSize: L.size.footnote, color: dark ? C.darkGray : C.gray, align: "right" });
  }

  // ── 유형 pill(우상단) ──
  function kindPill(ctx, kind) {
    if (!kind || !deck.showKind) return 0;
    if (!KINDS.includes(kind)) warn(ctx, "kind", `알 수 없는 유형 '${kind}' (허용: ${KINDS.join("|")})`);
    const w = Math.max(0.7, textWidthIn(kind, 8.5) + 0.32);
    const x = SW - L.mx - w;
    let bg = C.parchment, color = C.gray;
    if (kind === "실습단계") { bg = C.tint; color = C.accent; }
    else if (kind === "시연") { bg = C.ink; color = C.white; }
    else if (kind === "참고") { bg = ctx.dark ? C.darkCard : C.white; color = C.gray; }
    if (ctx.dark && bg === C.parchment) { bg = C.darkCard; color = C.darkGray; }
    if (ctx.dark && kind === "시연") { bg = C.white; color = C.ink; }
    pill(ctx, x, L.kickerY, w, 0.24, kind, { bg, color, border: kind === "참고" && !ctx.dark });
    return w + 0.15;
  }

  // ── 타이머 pill(우상단, kind 아래) ──
  function timerPill(ctx, timer) {
    if (!timer) return 0;
    const text = /^\d/.test(String(timer)) ? `⏱ ${timer}` : String(timer);
    const w = Math.max(1.1, textWidthIn(text, 11) + 0.4);
    pill(ctx, SW - L.mx - w, 0.82, w, 0.34, text, { bg: C.ink, color: C.white, fontSize: 11, fontFace: F.bold, charSpacing: 0 });
    return w + 0.2;
  }

  // ── 헤더: kicker · 제목(자동 축소·2줄) · 부제 → 콘텐츠 시작 y 반환 ──
  function header(ctx, o = {}) {
    let title = o.title || "";
    let subtitle = o.subtitle;
    // '—' 뒤 부제 자동 분리(부제 미지정 시)
    if (typeof title === "string" && subtitle == null && o.splitDash !== false) {
      const m = title.match(/^(.+?)\s+[—–]\s+(.+)$/);
      if (m && stripSpaces(m[1]).length >= 6) { title = m[1]; subtitle = m[2]; }
    }
    ctx.title = flatText(title);
    const tl = stripSpaces(title).length;
    if (tl > TITLE_MAX_CHARS) warn(ctx, "title-length", `제목 ${tl}자 > ${TITLE_MAX_CHARS}자(공백 제외): "${ctx.title.slice(0, 30)}…"`);

    const reserve = Math.max(kindPill(ctx, o.kind), timerPill(ctx, o.timer));
    const titleW = L.cw - (reserve ? reserve + 0.2 : 0);
    const dark = ctx.dark;
    let y = L.titleY;
    if (o.kicker) {
      // kicker 는 1줄만 — 2줄이 되면 제목과 겹친다(렌더 QA 2026-09-18 B1-46). 11→10→9.5pt 로 줄이고 그래도 넘치면 경고
      const kw = titleW / 1.08; // charSpacing 1.5 보정
      const kf = fitText(o.kicker, kw, 0.26, { sizes: [11, 10, 9.5], lh: 1.2, minSize: 9.5 });
      if (kf.lines > 1) warn(ctx, "kicker-lines", `kicker ${kf.lines}줄 @${kf.size}pt — 문구 축약 필요: "${flatText(o.kicker).slice(0, 30)}…"`);
      tx(ctx, o.kicker, { x: L.mx, y: L.kickerY, w: titleW, h: 0.26, fontSize: kf.size, fontFace: F.bold, color: dark ? C.sky : C.accent, charSpacing: kf.size < 11 ? 0.8 : 1.5 });
      y = 0.84;
    }
    const tf = fitTitle(title, titleW, o.titleSizes || L.steps.title);
    if (tf.lines > 2) warn(ctx, "title-lines", `제목 ${tf.lines}줄(2줄 초과) @${tf.size}pt`);
    const titleH = Math.max(0.42, tf.lines * lineH(tf.size, L.lh.title) + 0.06);
    tx(ctx, title, { x: L.mx, y, w: titleW, h: titleH, fontSize: tf.size, fontFace: F.title, color: dark ? C.white : C.ink, bold: true, charSpacing: -0.5, valign: "top", lineSpacingMultiple: L.lh.title });
    y += titleH;
    if (subtitle) {
      const sf = fitText(subtitle, titleW, lineH(12.5, 1.3) * 2 + 0.02, { sizes: L.steps.subtitle, lh: 1.3, minSize: 12 });
      if (sf.lines > 2) warn(ctx, "subtitle-lines", `부제 ${sf.lines}줄(2줄 초과)`);
      const subH = sf.lines * lineH(sf.size, 1.3) + 0.04;
      y += 0.06;
      tx(ctx, subtitle, { x: L.mx, y, w: titleW, h: subH, fontSize: sf.size, color: dark ? C.darkGray : C.gray, valign: "top", lineSpacingMultiple: 1.3 });
      y += subH + 0.2;
    } else {
      y += 0.28;
    }
    return Math.max(subtitle ? L.contentTop : 1.5, y);
  }

  // ── 하단 각주(명시 or 가상 표기 자동) ──
  function footnote(ctx, text) {
    tx(ctx, text, { x: L.mx, y: L.footnoteY, w: L.cw, h: 0.22, fontSize: L.size.footnote, color: ctx.dark ? C.darkGray : C.gray, valign: "middle" });
  }

  // ── 슬라이드 마무리: 각주 · 푸터 · 노트 ──
  function finish(ctx, o = {}) {
    let fn = o.footnote != null ? o.footnote : ctx.footnote;
    const all = ctx.texts.join("\n");
    if (!fn && deck.autoVirtualFootnote && o.autoFootnote !== false && VIRTUAL_RE.test(all)) fn = deck.virtualFootnote;
    if (fn) footnote(ctx, fn);
    if (ctx.footer) runningFooter(ctx);
    if (o.notes || ctx.notes) ctx.s.addNotes(String(o.notes || ctx.notes));
    return ctx.s;
  }

  // 콘텐츠 하단(각주가 있으면 조금 위)
  function bottomOf(ctx, o = {}) {
    const hasFn = !!(o.footnote || ctx.footnote || (deck.autoVirtualFootnote && VIRTUAL_RE.test(ctx.texts.join("\n") + flatText(o._probe || ""))));
    return hasFn ? L.contentBottom - 0.05 : L.contentBottom;
  }

  // 일반 본문 박스(자동 축소 + overflow 경고)
  function bodyBox(ctx, text, x, y, w, h, o = {}) {
    const f = fitText(text, w - (o.padX || 0) * 2, h - (o.padY || 0) * 2, { sizes: o.sizes || L.steps.body, lh: o.lh || L.lh.body, minSize: o.minSize != null ? o.minSize : 10 });
    if (f.overflow) warn(ctx, "overflow", `${o.label || "본문"} ${f.lines}줄 @${f.size}pt — 필요 ${f.need.toFixed(2)}in > 박스 ${h.toFixed(2)}in`);
    tx(ctx, text, Object.assign({ x: x + (o.padX || 0), y: y + (o.padY || 0), w: w - (o.padX || 0) * 2, h: h - (o.padY || 0) * 2, fontSize: f.size, fontFace: o.fontFace || F.body, color: o.color || (ctx.dark ? C.white : C.ink), valign: o.valign || "top", lineSpacingMultiple: o.lh || L.lh.body, align: o.align || "left" }, o.extra || {}));
    return f;
  }

  // 항목 배열 → 불릿 문단 runs
  const BULLET_INDENT_PT = 16; // 불릿 들여쓰기(pt) ≈ 0.22in
  // 주의: 불릿 박스에는 반드시 align:"left"를 함께 준다(pptxgenjs가 문단 속성을 '마지막 run' 기준으로 쓰므로,
  // 보조 줄(sub) run에도 같은 bullet 옵션을 복사하고 align 분기로 문단 분리를 막는다).
  function bulletRuns(items, o = {}) {
    const runs = [];
    items.forEach((it, i) => {
      const item = typeof it === "string" ? { text: it } : it;
      const isLast = i === items.length - 1;
      const para = { bullet: o.numbered ? { type: "number", indent: BULLET_INDENT_PT } : { characterCode: "2022", indent: BULLET_INDENT_PT }, paraSpaceBefore: i === 0 ? 0 : (o.paraGap != null ? o.paraGap : 4), align: "left" };
      const main = { text: item.text, options: Object.assign({}, para, { breakLine: !item.sub && !isLast }) };
      if (item.bold) main.options.fontFace = F.bold;
      if (item.color) main.options.color = item.color;
      normFont(main.options);
      runs.push(main);
      // 보조 줄은 같은 문단 안의 soft break → 본문 텍스트와 같은 들여쓰기로 정렬
      if (item.sub) runs.push({ text: item.sub, options: Object.assign({}, para, { softBreakBefore: true, color: C.gray, fontSize: o.subSize, breakLine: !isLast }) });
    });
    return runs;
  }

  // 항목 리스트 전체를 한 문자열로(줄 수 추정용) — 불릿 들여쓰기 0.25in 감안
  function itemsText(items) { return items.map((it) => (typeof it === "string" ? it : it.text + (it.sub ? "\n" + it.sub : ""))).join("\n"); }

  // ══════════════════════════════════════════════════════
  // ARCHETYPES
  // ══════════════════════════════════════════════════════

  // 1) Cover — Ink 풀블리드
  deck.cover = function cover(o = {}) {
    const ctx = begin("cover", { dark: true, footer: false, notes: o.notes });
    rect(ctx, L.mx, 1.02, 0.6, 0.045, C.accent);
    if (o.kicker) tx(ctx, o.kicker, { x: L.mx, y: 1.16, w: L.cw, h: 0.3, fontSize: 12, fontFace: F.bold, color: C.sky, charSpacing: 2 });
    let y = o.kicker ? 1.55 : 1.3;
    const tf = fitText(o.title || "", L.cw, 1.5, { sizes: L.steps.display, lh: 1.12, minSize: 26 });
    if (tf.lines > 2) warn(ctx, "title-lines", `표지 제목 ${tf.lines}줄 @${tf.size}pt`);
    const th = tf.lines * lineH(tf.size, 1.12) + 0.08;
    tx(ctx, o.title || "", { x: L.mx, y, w: L.cw, h: th, fontSize: tf.size, fontFace: F.title, color: C.white, charSpacing: -1, valign: "top", lineSpacingMultiple: 1.12 });
    y += th + 0.1;
    if (o.subtitle) {
      const sf = fitText(o.subtitle, L.cw, 0.9, { sizes: [15, 13.5, 12.5], lh: 1.35, minSize: 12 });
      tx(ctx, o.subtitle, { x: L.mx, y, w: L.cw, h: sf.lines * lineH(sf.size, 1.35) + 0.04, fontSize: sf.size, color: C.darkGray, lineSpacingMultiple: 1.35, valign: "top" });
    }
    // 하단 메타 — 바닥 기준 정렬
    let by = o.disclaimer ? 5.05 : 5.2;
    if (o.disclaimer) {
      const df = fitText(o.disclaimer, L.cw, 0.5, { sizes: [9.5, 9], lh: 1.3, minSize: 9 });
      tx(ctx, o.disclaimer, { x: L.mx, y: by, w: L.cw, h: df.lines * lineH(df.size, 1.3) + 0.04, fontSize: df.size, color: C.gray, lineSpacingMultiple: 1.3 });
      by -= 0.1;
    }
    const metas = [o.meta2, o.meta1].filter(Boolean);
    for (const m of metas) {
      const mf = fitText(m, L.cw, 0.6, { sizes: [12.5, 11.5, 11], lh: 1.3, minSize: 10.5 });
      if (mf.lines > 2) warn(ctx, "overflow", `표지 메타 ${mf.lines}줄: "${flatText(m).slice(0, 20)}…"`);
      const mh = mf.lines * lineH(mf.size, 1.3) + 0.04;
      by -= mh + 0.08;
      tx(ctx, m, { x: L.mx, y: by, w: L.cw, h: mh, fontSize: mf.size, color: m === o.meta1 ? C.white : C.darkGray, fontFace: m === o.meta1 ? F.bold : F.body, lineSpacingMultiple: 1.3, valign: "bottom" });
    }
    if (metas.length) rect(ctx, L.mx, by - 0.14, L.cw, 0.008, C.darkLine);
    return finish(ctx, { notes: o.notes, autoFootnote: false });
  };

  // 2) Section divider — Ink 풀블리드 + PART kicker + (옵션) 미니 파이프라인
  deck.sectionDivider = function sectionDivider(o = {}) {
    const ctx = begin("sectionDivider", { dark: true, footer: o.footer === true, notes: o.notes });
    kindPill(ctx, o.kind);
    rect(ctx, L.mx, 1.5, 0.6, 0.045, C.accent);
    if (o.kicker) tx(ctx, o.kicker, { x: L.mx, y: 1.66, w: L.cw, h: 0.3, fontSize: 13, fontFace: F.bold, color: C.sky, charSpacing: 3 });
    const tf = fitText(o.title || "", L.cw, 1.2, { sizes: [30, 26, 22], lh: 1.12, minSize: 22 });
    if (tf.lines > 2) warn(ctx, "title-lines", `디바이더 제목 ${tf.lines}줄`);
    const th = tf.lines * lineH(tf.size, 1.12) + 0.08;
    let y = o.kicker ? 2.05 : 1.7;
    tx(ctx, o.title || "", { x: L.mx, y, w: L.cw, h: th, fontSize: tf.size, fontFace: F.title, color: C.white, charSpacing: -0.5, lineSpacingMultiple: 1.12, valign: "top" });
    y += th + 0.08;
    if (o.subtitle) {
      const sf = fitText(o.subtitle, L.cw, 0.8, { sizes: [13.5, 12.5], lh: 1.35, minSize: 11.5 });
      tx(ctx, o.subtitle, { x: L.mx, y, w: L.cw, h: sf.lines * lineH(sf.size, 1.35) + 0.04, fontSize: sf.size, color: C.darkGray, lineSpacingMultiple: 1.35 });
      y += sf.lines * lineH(sf.size, 1.35) + 0.2;
    }
    if (Array.isArray(o.steps) && o.steps.length) {
      const n = o.steps.length;
      const g = 0.3;
      const w = (L.cw - g * (n - 1)) / n;
      const sy = Math.max(y + 0.2, 4.0);
      o.steps.forEach((st, i) => {
        const x = L.mx + i * (w + g);
        card(ctx, x, sy, w, 0.5, { bg: C.darkCard, radius: 0.08 }); rect(ctx, x + 0.14, sy + 0.06, 0.26, 0.03, C.sky); // 전 단계 동일 색감(마지막만 강조 금지)
        const f = fitText(st, w - 0.16, 0.5, { sizes: [11.5, 10.5, 10], lh: 1.2, minSize: 9 });
        tx(ctx, st, { x: x + 0.08, y: sy, w: w - 0.16, h: 0.5, fontSize: f.size, fontFace: F.bold, color: C.white, align: "center", valign: "middle", lineSpacingMultiple: 1.2 });
        if (i < n - 1) tx(ctx, "→", { x: x + w - 0.02, y: sy, w: g + 0.04, h: 0.5, fontSize: 12, color: C.gray, align: "center", valign: "middle" });
      });
    }
    return finish(ctx, { notes: o.notes, autoFootnote: false });
  };

  // 3) Statement — 큰 한 문장(+ 보조 본문)
  deck.statement = function statement(o = {}) {
    const ctx = begin("statement", { dark: !!o.dark, notes: o.notes, footnote: o.footnote });
    kindPill(ctx, o.kind);
    const top = 1.1, bottom = bottomOf(ctx, { footnote: o.footnote, _probe: (o.title || "") + (o.body || "") });
    const avail = bottom - top;
    const tf = fitText(o.title || "", L.cw, avail * (o.body ? 0.5 : 0.9), { sizes: [30, 26, 22, 20], lh: 1.2, minSize: 18 });
    if (tf.lines > 3) warn(ctx, "title-lines", `Statement 문장 ${tf.lines}줄(3줄 초과)`);
    const th = tf.lines * lineH(tf.size, 1.2) + 0.1;
    let bodyF = null, bh = 0;
    if (o.body) {
      bodyF = fitText(o.body, L.cw, avail - th - 0.3, { sizes: [14, 13, 12, 11], lh: 1.45, minSize: 10 });
      if (bodyF.overflow) warn(ctx, "overflow", `Statement 본문 ${bodyF.lines}줄 @${bodyF.size}pt`);
      bh = Math.min(avail - th - 0.3, bodyF.lines * lineH(bodyF.size, 1.45) + 0.06);
    }
    const total = th + (o.body ? 0.3 + bh : 0);
    let y = top + Math.max(0, (avail - total) / 2);
    if (o.kicker) { tx(ctx, o.kicker, { x: L.mx, y: y - 0.36, w: L.cw, h: 0.28, fontSize: 11, fontFace: F.bold, color: ctx.dark ? C.sky : C.accent, charSpacing: 1.5 }); }
    rect(ctx, L.mx, y - 0.02, 0.6, 0.04, C.accent);
    y += 0.14;
    tx(ctx, o.title || "", { x: L.mx, y, w: L.cw, h: th, fontSize: tf.size, fontFace: F.title, color: ctx.dark ? C.white : C.ink, charSpacing: -0.5, lineSpacingMultiple: 1.2, valign: "top" });
    if (o.body) {
      y += th + 0.3;
      tx(ctx, o.body, { x: L.mx, y, w: L.cw, h: bh, fontSize: bodyF.size, color: ctx.dark ? C.darkGray : C.gray, lineSpacingMultiple: 1.45, valign: "top" });
    }
    return finish(ctx, { notes: o.notes, footnote: o.footnote });
  };

  // 4) Bullets — 불릿 목록(1단/2단)
  deck.bullets = function bullets(o = {}) {
    const ctx = begin("bullets", { notes: o.notes, footnote: o.footnote, dark: !!o.dark });
    const top = header(ctx, o);
    const items = o.items || [];
    const bottom = bottomOf(ctx, { footnote: o.footnote, _probe: itemsText(items) });
    const avail = bottom - top;
    const cols = o.twoCol ? 2 : 1;
    const colW = cols === 2 ? (L.cw - L.gutter) / 2 : L.cw;
    const groups = cols === 2 ? [items.slice(0, Math.ceil(items.length / 2)), items.slice(Math.ceil(items.length / 2))] : [items];
    groups.forEach((grp, gi) => {
      if (!grp.length) return;
      const x = L.mx + gi * (colW + L.gutter);
      const probe = itemsText(grp);
      const f = fitText(probe, colW - 0.24, avail - (grp.length - 1) * 0.06, { sizes: o.sizes || L.steps.body, lh: L.lh.body, minSize: 10 });
      if (f.overflow) warn(ctx, "overflow", `불릿 ${grp.length}항목 ${f.lines}줄 @${f.size}pt (twoCol 또는 항목 축약 권장)`);
      tx(ctx, bulletRuns(grp, { numbered: o.numbered, subSize: Math.max(9.5, f.size - 1.5) }), { x, y: top, w: colW, h: avail, fontSize: f.size, color: ctx.dark ? C.white : C.ink, valign: "top", lineSpacingMultiple: L.lh.body, align: "left" });
    });
    return finish(ctx, { notes: o.notes, footnote: o.footnote });
  };

  // 5) Cards — 2~4열 카드(5장 이상은 행으로 감쌈)
  deck.cards = function cards(o = {}) {
    const ctx = begin("cards", { notes: o.notes, footnote: o.footnote, dark: !!o.dark });
    const top = header(ctx, o);
    const list = o.cards || [];
    const n = list.length;
    const cols = Math.min(4, Math.max(2, o.cols || (n <= 4 ? n : 3)));
    const rows = Math.ceil(n / cols);
    const bottom = bottomOf(ctx, { footnote: o.footnote, _probe: JSON.stringify(list) });
    const avail = bottom - top;
    const g = cols >= 4 ? 0.22 : L.gutter;
    const rg = 0.2;
    const cw = (L.cw - g * (cols - 1)) / cols;
    const ch = Math.min(o.maxCardH || 2.6, (avail - rg * (rows - 1)) / rows);
    const pad = cols >= 4 ? 0.18 : L.cardPad;
    const y0 = top + (o.alignTop ? 0 : Math.max(0, (avail - (ch * rows + rg * (rows - 1))) / 2) * 0.5);
    list.forEach((cd, i) => {
      const r = Math.floor(i / cols), c = i % cols;
      // 마지막 행이 덜 찼으면 가운데 정렬
      const inRow = r === rows - 1 ? n - r * cols : cols;
      const offset = o.centerLastRow !== false ? ((cols - inRow) * (cw + g)) / 2 : 0;
      const x = L.mx + offset + c * (cw + g);
      const y = y0 + r * (ch + rg);
      const accent = false; // 단일 항목 강조 금지(2026-09-19 사용자 지시) — 모든 카드에 같은 색감
      card(ctx, x, y, cw, ch, { bg: undefined, leftAccent: null });
      rect(ctx, x + pad, y + pad * 0.62, 0.34, 0.035, ctx.dark ? C.sky : C.accent);
      let cy = y + pad * 0.7 + 0.1;
      const innerW = cw - pad * 2;
      if (cd.tag) {
        const tw = Math.max(0.5, textWidthIn(cd.tag, 8.5) + 0.26);
        pill(ctx, x + pad, cy, tw, 0.22, cd.tag, { bg: ctx.dark ? C.darkLine : C.tint, color: ctx.dark ? C.sky : C.accent, border: false });
        cy += 0.32;
      }
      const tf = fitText(cd.title || "", innerW, 0.9, { sizes: cols >= 4 ? [13, 12, 11] : [15, 13.5, 12.5], lh: 1.2, minSize: 11 });
      if (tf.lines > 2) warn(ctx, "overflow", `카드 ${i + 1} 제목 ${tf.lines}줄`);
      const th = tf.lines * lineH(tf.size, 1.2) + 0.04;
      tx(ctx, cd.title || "", { x: x + pad, y: cy, w: innerW, h: th, fontSize: tf.size, fontFace: F.bold, color: ctx.dark ? C.white : C.tintText, lineSpacingMultiple: 1.2, valign: "top" });
      cy += th + 0.08;
      const bh = y + ch - pad * 0.5 - cy;
      if (cd.body && bh > 0.2) {
        const bf = fitText(cd.body, innerW, bh, { sizes: cols >= 4 ? [11, 10.5, 10] : L.steps.small, lh: 1.4, minSize: 10 });
        if (bf.lines > 3) warn(ctx, "card-lines", `카드 ${i + 1} 본문 ${bf.lines}줄(3줄 초과) @${bf.size}pt`);
        if (bf.overflow) warn(ctx, "overflow", `카드 ${i + 1} 본문 ${bf.lines}줄 @${bf.size}pt — 카드 높이 ${ch.toFixed(2)}in`);
        tx(ctx, cd.body, { x: x + pad, y: cy, w: innerW, h: bh, fontSize: bf.size, color: ctx.dark ? C.darkGray : C.gray, lineSpacingMultiple: 1.4, valign: "top" });
      }
    });
    if (n > 8) warn(ctx, "count", `카드 ${n}장 — 8장 초과는 Table 권장`);
    return finish(ctx, { notes: o.notes, footnote: o.footnote });
  };

  // 6) Comparison — 좌/우 카드, 우측 Action Blue 강조
  deck.comparison = function comparison(o = {}) {
    const ctx = begin("comparison", { notes: o.notes, footnote: o.footnote });
    const top = header(ctx, o);
    const bottom = bottomOf(ctx, { footnote: o.footnote, _probe: JSON.stringify([o.left, o.right]) });
    const h = bottom - top;
    const w = (L.cw - L.gutter) / 2;
    const sides = [Object.assign({ x: L.mx, emph: false }, o.left || {}), Object.assign({ x: L.mx + w + L.gutter, emph: true }, o.right || {})];
    if (o.emphasize === "left") { sides[0].emph = true; sides[1].emph = false; }
    if (o.emphasize === "none") { sides[0].emph = false; sides[1].emph = false; }
    sides.forEach((sd, si) => {
      card(ctx, sd.x, top, w, h, { bg: sd.emph ? C.tint : C.parchment, leftAccent: sd.emph ? C.accent : null });
      const pad = L.cardPad;
      let cy = top + pad * 0.8;
      if (sd.label) {
        tx(ctx, sd.label, { x: sd.x + pad, y: cy, w: w - pad * 2, h: 0.32, fontSize: 13, fontFace: F.title, color: sd.emph ? C.accent : C.gray, valign: "middle" });
        cy += 0.42;
      }
      if (sd.title) {
        const tf = fitText(sd.title, w - pad * 2, 0.8, { sizes: [16, 14.5, 13], lh: 1.2, minSize: 12 });
        const th = tf.lines * lineH(tf.size, 1.2) + 0.04;
        tx(ctx, sd.title, { x: sd.x + pad, y: cy, w: w - pad * 2, h: th, fontSize: tf.size, fontFace: F.bold, color: C.ink, lineSpacingMultiple: 1.2 });
        cy += th + 0.1;
      }
      const items = sd.items || [];
      const bh = top + h - pad * 0.8 - cy;
      if (items.length) {
        const probe = itemsText(items);
        const f = fitText(probe, w - pad * 2 - 0.24, bh - (items.length - 1) * 0.05, { sizes: L.steps.body, lh: L.lh.body, minSize: 10 });
        if (f.overflow) warn(ctx, "overflow", `${si === 0 ? "좌" : "우"} 카드 ${items.length}항목 ${f.lines}줄 @${f.size}pt`);
        tx(ctx, bulletRuns(items, { subSize: Math.max(9.5, f.size - 1.5) }), { x: sd.x + pad, y: cy, w: w - pad * 2, h: bh, fontSize: f.size, color: C.ink, valign: "top", lineSpacingMultiple: L.lh.body, align: "left" });
      } else if (sd.body) {
        bodyBox(ctx, sd.body, sd.x + pad, cy, w - pad * 2, bh, { label: si === 0 ? "좌 카드" : "우 카드", color: C.ink });
      }
    });
    if (o.arrow !== false) {
      tx(ctx, "→", { x: L.mx + w - 0.05, y: top + h / 2 - 0.2, w: L.gutter + 0.1, h: 0.4, fontSize: 16, color: C.gray, align: "center", valign: "middle" });
    }
    return finish(ctx, { notes: o.notes, footnote: o.footnote });
  };

  // 7) Process — 3~5 스텝 카드 + → 커넥터
  deck.process = function process(o = {}) {
    const ctx = begin("process", { notes: o.notes, footnote: o.footnote });
    const top = header(ctx, o);
    const steps = o.steps || [];
    const n = steps.length;
    if (n > 5) warn(ctx, "count", `Process ${n}단 — 최대 5단(6단 이상은 Table 또는 2행×3 Cards)`);
    const bottom = bottomOf(ctx, { footnote: o.footnote, _probe: JSON.stringify(steps) });
    const avail = bottom - top;
    const g = n >= 5 ? 0.26 : L.gutter;
    const w = (L.cw - g * (n - 1)) / n;
    const h = Math.min(o.cardH || 2.6, avail);
    const y = top + (avail - h) / 2 * 0.6;
    const pad = n >= 5 ? 0.16 : 0.22;
    steps.forEach((st, i) => {
      const x = L.mx + i * (w + g);
      const emph = false; // 마지막·단일 단계 강조 금지 — 전 단계 동일 색감
      card(ctx, x, y, w, h, { bg: emph ? C.tint : C.parchment, leftAccent: emph ? C.accent : null });
      // 숫자 뱃지
      const b = 0.3;
      ctx.s.addShape(pres.shapes.RECTANGLE, { x: x + pad, y: y + pad, w: b, h: b, fill: { color: C.accent }, line: { type: "none" } });
      tx(ctx, String(i + 1), { x: x + pad, y: y + pad, w: b, h: b, fontSize: 11, fontFace: F.title, color: C.white, align: "center", valign: "middle" });
      if (st.minutes || st.meta) {
        const mt = st.minutes ? `${st.minutes}분` : st.meta;
        tx(ctx, mt, { x: x + pad + b + 0.1, y: y + pad, w: w - pad * 2 - b - 0.1, h: b, fontSize: 10, color: C.gray, valign: "middle", align: "right" });
      }
      let cy = y + pad + b + 0.14;
      const innerW = w - pad * 2;
      const tf = fitText(st.label || "", innerW, 0.8, { sizes: n >= 5 ? [12.5, 11.5, 11] : [14, 13, 12], lh: 1.2, minSize: 10.5 });
      if (tf.lines > 2) warn(ctx, "overflow", `스텝 ${i + 1} 라벨 ${tf.lines}줄`);
      const th = tf.lines * lineH(tf.size, 1.2) + 0.04;
      tx(ctx, st.label || "", { x: x + pad, y: cy, w: innerW, h: th, fontSize: tf.size, fontFace: F.bold, color: emph ? C.tintText : C.ink, lineSpacingMultiple: 1.2 });
      cy += th + 0.08;
      const bh = y + h - pad - cy;
      if (st.body && bh > 0.2) {
        const bf = fitText(st.body, innerW, bh, { sizes: n >= 5 ? [10.5, 10] : [11.5, 11, 10.5, 10], lh: 1.38, minSize: 10 });
        if (bf.overflow) warn(ctx, "overflow", `스텝 ${i + 1} 본문 ${bf.lines}줄 @${bf.size}pt`);
        tx(ctx, st.body, { x: x + pad, y: cy, w: innerW, h: bh, fontSize: bf.size, color: C.gray, lineSpacingMultiple: 1.38, valign: "top" });
      }
      if (i < n - 1) tx(ctx, "→", { x: x + w - 0.03, y: y + h / 2 - 0.2, w: g + 0.06, h: 0.4, fontSize: n >= 5 ? 12 : 14, color: C.gray, align: "center", valign: "middle" });
    });
    return finish(ctx, { notes: o.notes, footnote: o.footnote });
  };

  // 8) Table — 헤더 Ink, 행 높이 가변, 폰트 자동 축소
  deck.table = function table(o = {}) {
    const ctx = begin("table", { notes: o.notes, footnote: o.footnote });
    const top = header(ctx, o);
    const headerRow = o.header || [];
    const rows = o.rows || [];
    const nCols = Math.max(headerRow.length, ...rows.map((r) => r.length));
    if (rows.length > 8) warn(ctx, "count", `표 ${rows.length}행 — 8행 이내 권장`);
    const bottom = bottomOf(ctx, { footnote: o.footnote, _probe: JSON.stringify(rows) });
    const avail = bottom - top - (o.note ? 0.34 : 0);
    // 열 폭: 배열(합이 cw와 다르면 비율로 정규화) 또는 균등
    let colW;
    if (Array.isArray(o.colW) && o.colW.length === nCols) {
      const sum = o.colW.reduce((a, b) => a + b, 0);
      colW = o.colW.map((v) => (v * L.cw) / sum);
    } else {
      colW = Array(nCols).fill(L.cw / nCols);
    }
    const cellText = (c) => flatText(typeof c === "object" && c !== null ? c.text : c);
    const padX = 0.08, padY = 0.04;
    const sizes = o.fontSize ? [o.fontSize] : [12, 11.5, 11, 10.5, 10];
    let chosen = null;
    for (const fs of sizes) {
      const hs = [];
      const hf = fs + 0.5;
      const hLines = Math.max(1, ...headerRow.map((c, ci) => estimateLines(cellText(c), colW[ci] - padX * 2, hf)));
      // 행 높이 추정은 자연 행간(LibreOffice 나눔고딕 ≈1.33em) 기준 — 1.12로 잡으면 2줄 셀이 실제보다 낮게 계산돼 표가 note 를 덮었다(렌더 QA 2026-09-18)
      const headerH = Math.max(0.32, hLines * lineH(hf, TABLE_LH) + padY * 2 + 0.03);
      hs.push(headerH);
      for (const r of rows) {
        const lines = Math.max(1, ...r.map((c, ci) => estimateLines(cellText(c), colW[ci] - padX * 2, fs)));
        hs.push(Math.max(0.28, lines * lineH(fs, TABLE_LH) + padY * 2 + 0.03));
      }
      const total = hs.reduce((a, b) => a + b, 0);
      chosen = { fs, rowH: hs, total };
      if (total <= avail) break;
    }
    if (chosen.total > avail) warn(ctx, "overflow", `표 ${rows.length}행 필요 ${chosen.total.toFixed(2)}in > 가용 ${avail.toFixed(2)}in @${chosen.fs}pt — 행 축약/분할 권장`);
    const accentCol = o.accentCol;
    const emphRows = new Set(o.emphRows || []);
    const hdr = headerRow.map((c, ci) => {
      const cell = typeof c === "object" && c !== null ? c : { text: c };
      return { text: cell.text, options: Object.assign({ fill: { color: ci === accentCol ? C.accent : C.ink }, color: C.white, bold: true, fontFace: F.bold, fontSize: chosen.fs + 0.5, valign: "middle", align: cell.align || "left" }, cell.options || {}) };
    });
    const body = rows.map((r, ri) => r.map((c, ci) => {
      const cell = typeof c === "object" && c !== null ? c : { text: c };
      const opt = { valign: "middle", fontSize: chosen.fs, fontFace: F.body, color: C.ink, align: cell.align || "left" };
      if (ci === 0 && o.boldFirstCol !== false) opt.fontFace = F.bold;
      if (ci === accentCol) { opt.color = C.accent; opt.fontFace = F.bold; }
      if (emphRows.has(ri)) opt.fill = { color: C.tint };
      else if (o.zebra && ri % 2 === 1) opt.fill = { color: C.parchment };
      return { text: cell.text, options: Object.assign(opt, cell.options || {}) };
    }));
    ctx.texts.push(JSON.stringify(rows), JSON.stringify(headerRow));
    hdr.forEach((c) => normFont(c.options)); body.forEach((r) => r.forEach((c) => normFont(c.options)));
    const data = headerRow.length ? [hdr, ...body] : body;
    const rowH = headerRow.length ? chosen.rowH : chosen.rowH.slice(1);
    ctx.s.addTable(data, { x: L.mx, y: top, w: L.cw, colW, rowH, fontFace: F.body, fontSize: chosen.fs, border: { type: "solid", pt: 0.5, color: C.hairline }, margin: [padY, padX, padY, padX], valign: "middle", autoPage: false });
    if (o.note) {
      tx(ctx, o.note, { x: L.mx, y: bottom - 0.28, w: L.cw, h: 0.28, fontSize: 10.5, color: C.gray, valign: "middle" });
    }
    return finish(ctx, { notes: o.notes, footnote: o.footnote });
  };

  // 9) Checklist — □ 체크 항목 + (옵션) 하단 노트·타이머
  deck.checklist = function checklist(o = {}) {
    const ctx = begin("checklist", { notes: o.notes, footnote: o.footnote });
    const top = header(ctx, o);
    const items = o.items || [];
    const bottom = bottomOf(ctx, { footnote: o.footnote, _probe: itemsText(items) + (o.note || "") });
    let avail = bottom - top;
    let noteH = 0;
    if (o.note) {
      const nf = fitText(o.note, L.cw - 0.5, 0.9, { sizes: [11.5, 11, 10.5, 10], lh: 1.35, minSize: 10 });
      noteH = Math.min(0.9, nf.lines * lineH(nf.size, 1.35) + 0.2);
      avail -= noteH + 0.18;
      const ny = bottom - noteH;
      card(ctx, L.mx, ny, L.cw, noteH, { bg: C.parchment, leftAccent: C.accent, radius: 0.06 });
      tx(ctx, o.note, { x: L.mx + 0.25, y: ny, w: L.cw - 0.5, h: noteH, fontSize: nf.size, color: C.ink, valign: "middle", lineSpacingMultiple: 1.35 });
    }
    const n = Math.max(1, items.length);
    const gap = n >= 6 ? 0.08 : 0.1;
    // 행 높이는 가용 높이에서 계산한다 — 예전 하한 0.36in 은 6항목+2줄 note 에서 마지막 항목이 note 를 덮는 원인이었다(경고 없이)
    let rowH = Math.min(0.72, (avail - gap * (n - 1)) / n);
    if (rowH < 0.3) { warn(ctx, "overflow", `체크 ${n}항목 행 ${rowH.toFixed(2)}in < 0.30in — 항목/note 축약 권장`); rowH = 0.3; }
    const boxSize = 0.24;
    // 항목 폰트는 전체 최소값으로 통일(sub 있는 항목만 작아지는 들쭉날쭉 방지)
    const norm = items.map((it) => (typeof it === "string" ? { text: it } : it));
    const uniform = Math.min(...norm.map((item) => {
      const tw0 = L.cw - (0.2 + boxSize + 0.18) - 0.2;
      return fitText(item.text + (item.sub ? "\n" + item.sub : ""), tw0, rowH - 0.08, { sizes: [13.5, 12.5, 11.5, 11], lh: 1.3, minSize: 10 }).size;
    }));
    items.forEach((it, i) => {
      const item = typeof it === "string" ? { text: it } : it;
      const y = top + i * (rowH + gap);
      card(ctx, L.mx, y, L.cw, rowH, { bg: item.done ? C.tint : C.parchment, radius: 0.06 });
      ctx.s.addShape(pres.shapes.RECTANGLE, { x: L.mx + 0.2, y: y + (rowH - boxSize) / 2, w: boxSize, h: boxSize, fill: { color: item.done ? C.accent : C.white }, line: { color: item.done ? C.accent : C.grayLine, width: 1 } });
      if (item.done) tx(ctx, "✓", { x: L.mx + 0.2, y: y + (rowH - boxSize) / 2, w: boxSize, h: boxSize, fontSize: 11, fontFace: F.bold, color: C.white, align: "center", valign: "middle" });
      const tx0 = L.mx + 0.2 + boxSize + 0.18;
      const tw = L.cw - (tx0 - L.mx) - 0.2;
      const text = item.sub ? [{ text: item.text, options: { breakLine: true } }, { text: item.sub, options: { color: C.gray, fontSize: 10.5 } }] : item.text;
      const f = fitText(item.text + (item.sub ? "\n" + item.sub : ""), tw, rowH - 0.08, { sizes: [uniform], lh: 1.3, minSize: 10 });
      if (f.overflow) warn(ctx, "overflow", `체크 ${i + 1} ${f.lines}줄 @${f.size}pt (행 ${rowH.toFixed(2)}in)`);
      tx(ctx, text, { x: tx0, y, w: tw, h: rowH, fontSize: uniform, color: C.ink, valign: "middle", lineSpacingMultiple: 1.3 });
    });
    return finish(ctx, { notes: o.notes, footnote: o.footnote });
  };

  // 10) PromptBlock — 붙여넣기 프롬프트 Parchment 박스(좌 accent 3px), 최소 9pt, 2단 옵션/자동
  deck.promptBlock = function promptBlock(o = {}) {
    const ctx = begin("promptBlock", { notes: o.notes, footnote: o.footnote });
    // kicker 는 박스 안 라벨로만 그린다(헤더에도 그리면 같은 문구가 2번 보임)
    const top = header(ctx, Object.assign({}, o, { kicker: undefined }));
    const text = o.text || "";
    const bottom = bottomOf(ctx, { footnote: o.footnote, _probe: text + (o.note || "") });
    let avail = bottom - top;
    let noteH = 0;
    if (o.note) {
      const nf = fitText(o.note, L.cw, 0.5, { sizes: [10.5, 10], lh: 1.3, minSize: 9.5 });
      noteH = nf.lines * lineH(nf.size, 1.3) + 0.06;
      tx(ctx, o.note, { x: L.mx, y: bottom - noteH, w: L.cw, h: noteH, fontSize: nf.size, color: C.gray, lineSpacingMultiple: 1.3, valign: "bottom" });
      avail -= noteH + 0.12;
    }
    const boxY = top, boxH = avail;
    card(ctx, L.mx, boxY, L.cw, boxH, { bg: C.parchment, leftAccent: C.accent, radius: 0.06 });
    const padX = 0.28, padY = 0.18;
    let ky = boxY + padY;
    let innerTop = ky;
    if (o.kicker) {
      tx(ctx, o.kicker, { x: L.mx + padX, y: ky, w: L.cw - padX * 2, h: 0.24, fontSize: 9.5, fontFace: F.bold, color: C.accent, charSpacing: 1, valign: "middle" });
      innerTop += 0.3;
    }
    const innerH = boxY + boxH - padY - innerTop;
    const innerW = L.cw - padX * 2;
    const lh = 1.38;
    // 1단 시도 → (twoCol 'auto'|true) 2단 시도
    const one = fitText(text, innerW, innerH, { sizes: L.steps.prompt.slice(0, 3), lh, minSize: 11 });
    const forceTwo = o.twoCol === true;
    const autoTwo = o.twoCol !== false && one.overflow && text.split("\n").length >= 2;
    if (!forceTwo && !autoTwo) {
      const f = fitText(text, innerW, innerH, { sizes: L.steps.prompt, lh, minSize: 9 });
      if (f.overflow) warn(ctx, "overflow", `프롬프트 ${f.lines}줄 @${f.size}pt — (1/2)(2/2) 분할 권장`);
      else if (f.size < 11) warn(ctx, "small-font", `프롬프트 ${f.size}pt (11pt 미만)`);
      tx(ctx, text, { x: L.mx + padX, y: innerTop, w: innerW, h: innerH, fontSize: f.size, fontFace: F.code, color: C.ink, valign: "top", lineSpacingMultiple: lh });
    } else {
      // 줄 단위로 두 단에 균형 분배(각 단의 예상 줄 수 기준)
      const colW = (innerW - 0.3) / 2;
      let best = null;
      for (const size of [...L.steps.prompt.slice(0, 3), 10, 9]) {
        const paras = text.split("\n");
        const counts = paras.map((p) => estimateLines(p, colW, size));
        const total = counts.reduce((a, b) => a + b, 0);
        let acc = 0, cut = paras.length;
        for (let i = 0; i < paras.length; i++) { acc += counts[i]; if (acc >= total / 2) { cut = i + 1; break; } }
        const left = paras.slice(0, cut).join("\n"), right = paras.slice(cut).join("\n");
        const lf = fitText(left, colW, innerH, { sizes: [size], lh, minSize: size });
        const rf = fitText(right, colW, innerH, { sizes: [size], lh, minSize: size });
        best = { size, left, right, overflow: lf.overflow || rf.overflow, lines: Math.max(lf.lines, rf.lines) };
        if (!best.overflow) break;
      }
      if (best.overflow) warn(ctx, "overflow", `프롬프트 2단 ${best.lines}줄 @${best.size}pt — (1/2)(2/2) 분할 필요`);
      else if (best.size < 11) warn(ctx, "small-font", `프롬프트 2단 ${best.size}pt (11pt 미만)`);
      tx(ctx, best.left, { x: L.mx + padX, y: innerTop, w: colW, h: innerH, fontSize: best.size, fontFace: F.code, color: C.ink, valign: "top", lineSpacingMultiple: lh });
      tx(ctx, best.right, { x: L.mx + padX + colW + 0.3, y: innerTop, w: colW, h: innerH, fontSize: best.size, fontFace: F.code, color: C.ink, valign: "top", lineSpacingMultiple: lh });
      rect(ctx, L.mx + padX + colW + 0.145, innerTop, 0.008, innerH, C.grayLine);
    }
    return finish(ctx, { notes: o.notes, footnote: o.footnote });
  };

  // 11) LabStep — 입력 → 확인 → 한 번 수정 3단 카드 + 분 pill + 타이머 + 안전 규칙
  deck.labStep = function labStep(o = {}) {
    const ctx = begin("labStep", { notes: o.notes, footnote: o.footnote });
    const top = header(ctx, Object.assign({}, o, { kind: o.kind || "실습단계" }));
    const steps = o.steps || [];
    const n = Math.max(1, steps.length);
    const bottom = bottomOf(ctx, { footnote: o.footnote, _probe: JSON.stringify(steps) + (o.safetyLine || "") });
    let avail = bottom - top;
    let safeH = 0;
    if (o.safetyLine) {
      const sf = fitText(o.safetyLine, L.cw - 0.5, 0.7, { sizes: [11, 10.5, 10], lh: 1.3, minSize: 9.5 });
      safeH = Math.min(0.7, sf.lines * lineH(sf.size, 1.3) + 0.16);
      const sy = bottom - safeH;
      card(ctx, L.mx, sy, L.cw, safeH, { bg: C.tint, leftAccent: C.accent, radius: 0.06 });
      tx(ctx, o.safetyLine, { x: L.mx + 0.25, y: sy, w: L.cw - 0.5, h: safeH, fontSize: sf.size, color: C.tintText, valign: "middle", lineSpacingMultiple: 1.3 });
      avail -= safeH + 0.16;
    }
    const g = 0.26;
    const w = (L.cw - g * (n - 1)) / n;
    const h = avail;
    const pad = 0.2;
    steps.forEach((st, i) => {
      const x = L.mx + i * (w + g);
      const emph = false; // 단일 스텝 강조 금지
      card(ctx, x, top, w, h, { bg: emph ? C.tint : C.parchment, leftAccent: emph ? C.accent : null });
      // Step 뱃지
      const stepLabel = st.step || `Step ${i + 1}`;
      const bw = Math.max(0.7, textWidthIn(stepLabel, 9.5) + 0.3);
      pill(ctx, x + pad, top + pad, bw, 0.24, stepLabel, { bg: C.accent, color: C.white, fontSize: 9.5, charSpacing: 0.5 });
      if (st.minutes != null) {
        const mt = typeof st.minutes === "number" ? `${st.minutes}분` : String(st.minutes);
        const mw = Math.max(0.5, textWidthIn(mt, 9.5) + 0.26);
        pill(ctx, x + w - pad - mw, top + pad, mw, 0.24, mt, { bg: C.white, color: C.gray, fontSize: 9.5, border: true, charSpacing: 0 });
      }
      let cy = top + pad + 0.36;
      const innerW = w - pad * 2;
      const tf = fitText(st.label || "", innerW, 0.7, { sizes: [14, 13, 12], lh: 1.2, minSize: 11 });
      const th = tf.lines * lineH(tf.size, 1.2) + 0.04;
      tx(ctx, st.label || "", { x: x + pad, y: cy, w: innerW, h: th, fontSize: tf.size, fontFace: F.bold, color: emph ? C.tintText : C.ink, lineSpacingMultiple: 1.2 });
      cy += th + 0.1;
      const bh = top + h - pad - cy;
      if (st.body && bh > 0.2) {
        const bf = fitText(st.body, innerW, bh, { sizes: [12, 11.5, 11, 10.5, 10], lh: 1.4, minSize: 10 });
        if (bf.lines > 5) warn(ctx, "card-lines", `LabStep ${i + 1} 본문 ${bf.lines}줄(5줄 초과)`);
        if (bf.overflow) warn(ctx, "overflow", `LabStep ${i + 1} 본문 ${bf.lines}줄 @${bf.size}pt`);
        tx(ctx, st.body, { x: x + pad, y: cy, w: innerW, h: bh, fontSize: bf.size, color: C.ink, lineSpacingMultiple: 1.4, valign: "top" });
      }
      if (i < n - 1) tx(ctx, "→", { x: x + w - 0.03, y: top + h / 2 - 0.2, w: g + 0.06, h: 0.4, fontSize: 13, color: C.gray, align: "center", valign: "middle" });
    });
    return finish(ctx, { notes: o.notes, footnote: o.footnote });
  };

  // 12) Capture — 캡처 이미지(없으면 placeholder) + 캡션(+ 공통 캡션 자동) + (옵션) 요점 불릿
  deck.capture = function capture(o = {}) {
    const ctx = begin("capture", { notes: o.notes, footnote: o.footnote, dark: !!o.dark });
    const top = header(ctx, Object.assign({}, o, { kind: o.kind || "캡처" }));
    const side = o.side || (o.bullets && o.bullets.length ? "right" : "full");
    const bottom = bottomOf(ctx, { footnote: o.footnote, _probe: (o.caption || "") + itemsText(o.bullets || []) });
    let caption = o.caption || "";
    if (o.commonCaption !== false && deck.captureCaption && !o.dark && !/assets\/builder\//.test(String(o.imagePath || "")) && !/예시 화면|가상/.test(caption)) caption = caption ? `${caption} · ${deck.captureCaption}` : deck.captureCaption;
    let ix = L.mx, iw = L.cw, bx = null, bw = 0;
    if (side !== "full") {
      iw = o.imageW || 5.3; bw = L.cw - iw - L.gutter;
      if (side === "left") { ix = L.mx; bx = L.mx + iw + L.gutter; } else { bx = L.mx; ix = L.mx + bw + L.gutter; }
    }
    const cf = fitText(caption, iw, 0.5, { sizes: [10, 9.5], lh: 1.12, minSize: 9 });
    if (cf.lines > 2) warn(ctx, "overflow", `캡션 ${cf.lines}줄 — 캡션 축약 권장`);
    const capH = cf.lines * lineH(cf.size, 1.12) + 0.06;
    const imgBottom = bottom - capH - 0.06;
    const ih = imgBottom - top;
    // 프레임 카드 + 이미지
    if (!ctx.dark) card(ctx, ix, top, iw, ih, { bg: C.white, border: true, radius: 0.08 });
    const ipad = ctx.dark ? 0 : 0.08;
    image(ctx, o.imagePath, ix + ipad, top + ipad, iw - ipad * 2, ih - ipad * 2, o.placeholderLabel || (o.imagePath ? path.basename(o.imagePath) : "캡처 파일명 미정"));
    tx(ctx, caption, { x: ix, y: imgBottom + 0.04, w: iw, h: capH, fontSize: cf.size, color: ctx.dark ? C.darkGray : C.gray, italic: true, align: "center", valign: "top", lineSpacingMultiple: 1.12 });
    if (bx != null && o.bullets && o.bullets.length) {
      const probe = itemsText(o.bullets);
      const f = fitText(probe, bw - 0.24, ih, { sizes: L.steps.body, lh: L.lh.body, minSize: 10 });
      if (f.overflow) warn(ctx, "overflow", `캡처 요점 ${f.lines}줄 @${f.size}pt`);
      tx(ctx, bulletRuns(o.bullets, { subSize: Math.max(9.5, f.size - 1.5) }), { x: bx, y: top, w: bw, h: ih, fontSize: f.size, color: ctx.dark ? C.white : C.ink, valign: "top", lineSpacingMultiple: L.lh.body, align: "left" });
    }
    return finish(ctx, { notes: o.notes, footnote: o.footnote });
  };

  // 13) Video — MP4 삽입(poster 커버) · 실패/부재 시 poster 이미지만 + 파일명 텍스트
  deck.video = function video(o = {}) {
    const ctx = begin("video", { notes: o.notes, footnote: o.footnote, dark: !!o.dark });
    const top = header(ctx, Object.assign({}, o, { kind: o.kind || "시연" }));
    const bottom = bottomOf(ctx, { footnote: o.footnote, _probe: o.caption || "" });
    const capH = 0.3;
    const ih = bottom - capH - 0.06 - top;
    const poster = resolveAsset(o.posterPath);
    // poster PNG 원본 비율 유지(세로형 프로토타입 영상이 16:9 박스에서 늘어나는 문제 방지)
    let ratio = 16 / 9;
    try { if (poster && fs.existsSync(poster)) { const b = fs.readFileSync(poster); if (b.toString("ascii", 1, 4) === "PNG") { const pw = b.readUInt32BE(16), ph = b.readUInt32BE(20); if (pw && ph) ratio = pw / ph; } } } catch (e) {}
    const iw = Math.min(L.cw, ih * ratio);
    const ix = L.mx + (L.cw - iw) / 2;
    const mp4 = resolveAsset(o.mp4Path);
    let mode = "poster";
    if (mp4 && fs.existsSync(mp4)) {
      try {
        const opts = { type: "video", path: mp4, x: ix, y: top, w: iw, h: ih };
        if (poster && fs.existsSync(poster)) {
          const ext = path.extname(poster).slice(1).toLowerCase().replace("jpg", "jpeg");
          opts.cover = `data:image/${ext};base64,` + fs.readFileSync(poster).toString("base64");
        }
        ctx.s.addMedia(opts);
        mode = "video";
      } catch (e) {
        warn(ctx, "video", `addMedia 실패 → poster만: ${e.message}`);
      }
    } else if (o.mp4Path) {
      warn(ctx, "missing-video", `${o.mp4Path} 없음 → poster만`);
    }
    if (mode === "poster") {
      card(ctx, ix, top, iw, ih, { bg: C.ink, radius: 0.08 });
      image(ctx, o.posterPath, ix + 0.06, top + 0.06, iw - 0.12, ih - 0.12, o.posterPath ? path.basename(o.posterPath) : "poster");
      // 재생 표시
      ctx.s.addShape(pres.shapes.OVAL, { x: ix + iw / 2 - 0.3, y: top + ih / 2 - 0.3, w: 0.6, h: 0.6, fill: { color: C.ink, transparency: 25 }, line: { type: "none" } });
      tx(ctx, "▶", { x: ix + iw / 2 - 0.3, y: top + ih / 2 - 0.3, w: 0.6, h: 0.6, fontSize: 18, color: C.white, align: "center", valign: "middle" });
    }
    const fileHint = o.mp4Path ? `▶ 영상 파일: ${path.basename(o.mp4Path)}${mode === "poster" ? " (PDF·이 사본에서는 poster)" : " (PDF에서는 poster)"}` : "";
    const cap = [o.caption, fileHint].filter(Boolean).join("  ·  ");
    const capOpts = { x: L.mx, y: bottom - capH, w: L.cw, h: capH, fontSize: 10, color: ctx.dark ? C.darkGray : C.gray, italic: true, align: "center", valign: "middle" };
    if (o.link) capOpts.hyperlink = { url: o.link };
    tx(ctx, cap, capOpts);
    return finish(ctx, { notes: o.notes, footnote: o.footnote });
  };

  // 14) Profile — 이름·현직 + 키/값 행 + (옵션) 우측 경력 사다리 + disclaimer
  deck.profile = function profile(o = {}) {
    const ctx = begin("profile", { notes: o.notes, footnote: o.footnote });
    const top = header(ctx, Object.assign({}, o, { title: o.title || o.name, subtitle: o.subtitle || o.role, splitDash: false }));
    const rows = o.rows || [];
    const right = o.right;
    const bottom = bottomOf(ctx, { footnote: o.footnote || o.disclaimer, _probe: JSON.stringify(rows) });
    let avail = bottom - top;
    if (o.disclaimer) {
      const df = fitText(o.disclaimer, L.cw, 0.4, { sizes: [9.5, 9], lh: 1.3, minSize: 9 });
      const dh = df.lines * lineH(df.size, 1.3) + 0.04;
      tx(ctx, o.disclaimer, { x: L.mx, y: bottom - dh, w: L.cw, h: dh, fontSize: df.size, color: C.gray, lineSpacingMultiple: 1.3, valign: "bottom" });
      avail -= dh + 0.14;
    }
    const leftW = right ? 4.9 : L.cw;
    const rowH = Math.max(0.36, Math.min(0.6, avail / Math.max(1, rows.length)));
    rows.forEach((r, i) => {
      const y = top + i * rowH;
      rect(ctx, L.mx, y + rowH - 0.004, leftW, 0.008, C.hairline);
      const k = r[0], v = r[1];
      tx(ctx, k, { x: L.mx, y, w: 1.35, h: rowH, fontSize: 11, fontFace: F.bold, color: C.gray, valign: "middle" });
      const vf = fitText(v, leftW - 1.5, rowH - 0.06, { sizes: [13, 12, 11, 10.5], lh: 1.3, minSize: 10 });
      if (vf.overflow) warn(ctx, "overflow", `프로필 행 ${i + 1} ${vf.lines}줄 @${vf.size}pt`);
      tx(ctx, v, { x: L.mx + 1.5, y, w: leftW - 1.5, h: rowH, fontSize: vf.size, color: C.ink, valign: "middle", lineSpacingMultiple: 1.3 });
    });
    if (right) {
      const rx = L.mx + leftW + L.gutter, rw = L.cw - leftW - L.gutter;
      card(ctx, rx, top, rw, avail, { bg: C.parchment });
      let cy = top + 0.2;
      if (right.title) { tx(ctx, right.title, { x: rx + 0.22, y: cy, w: rw - 0.44, h: 0.3, fontSize: 11, fontFace: F.bold, color: C.gray, charSpacing: 1 }); cy += 0.38; }
      const items = right.items || [];
      const n = items.length;
      const ih = Math.min(0.56, (top + avail - 0.2 - cy - 0.1 * (n - 1)) / Math.max(1, n));
      items.forEach((it, i) => {
        const item = typeof it === "string" ? { text: it } : it;
        const y = cy + i * (ih + 0.1);
        const last = i === n - 1;
        ctx.s.addShape(pres.shapes.OVAL, { x: rx + 0.24, y: y + ih / 2 - 0.07, w: 0.14, h: 0.14, fill: { color: last || item.accent ? C.accent : C.grayLine }, line: { type: "none" } });
        if (!last) rect(ctx, rx + 0.3, y + ih / 2 + 0.07, 0.02, ih + 0.1 - 0.14, C.grayLine);
        const text = item.sub ? [{ text: item.text, options: { fontFace: F.bold, breakLine: true } }, { text: item.sub, options: { color: C.gray, fontSize: 10 } }] : item.text;
        tx(ctx, text, { x: rx + 0.55, y, w: rw - 0.77, h: ih, fontSize: 12, color: last || item.accent ? C.accent : C.ink, fontFace: item.sub ? F.body : F.bold, valign: "middle", lineSpacingMultiple: 1.25 });
      });
    }
    return finish(ctx, { notes: o.notes, footnote: o.footnote });
  };

  // 15) Timetable — [시각, 블록명, 설명] 행 카드
  deck.timetable = function timetable(o = {}) {
    const ctx = begin("timetable", { notes: o.notes, footnote: o.footnote });
    const top = header(ctx, o);
    const rows = o.rows || [];
    const bottom = bottomOf(ctx, { footnote: o.footnote, _probe: JSON.stringify(rows) + (o.note || "") });
    let avail = bottom - top;
    if (o.note) {
      const nf = fitText(o.note, L.cw, 0.5, { sizes: [10.5, 10], lh: 1.3, minSize: 9.5 });
      const nh = nf.lines * lineH(nf.size, 1.3) + 0.06;
      tx(ctx, o.note, { x: L.mx, y: bottom - nh, w: L.cw, h: nh, fontSize: nf.size, color: C.gray, lineSpacingMultiple: 1.3, valign: "bottom" });
      avail -= nh + 0.14;
    }
    const n = Math.max(1, rows.length);
    const gap = 0.1;
    const rowH = Math.max(0.36, Math.min(0.66, (avail - gap * (n - 1)) / n));
    const c1 = o.timeW || 1.5, c2 = o.labelW || 3.3;
    rows.forEach((r, i) => {
      const [time, label, desc, tag] = r;
      const y = top + i * (rowH + gap);
      const isBreak = /쉬는|점심|휴식|break/i.test(flatText(label)) || tag === "break";
      const emph = tag === "accent" || (o.accentRow === i);
      card(ctx, L.mx, y, L.cw, rowH, { bg: emph ? C.tint : isBreak ? C.white : C.parchment, leftAccent: emph ? C.accent : null, border: isBreak, radius: 0.06 });
      tx(ctx, time, { x: L.mx + 0.2, y, w: c1, h: rowH, fontSize: 12.5, fontFace: F.title, color: emph ? C.accent : isBreak ? C.gray : C.accent, valign: "middle" });
      tx(ctx, label, { x: L.mx + 0.2 + c1, y, w: c2, h: rowH, fontSize: 13, fontFace: F.bold, color: isBreak ? C.gray : C.ink, valign: "middle" });
      if (desc) {
        const dw = L.cw - 0.4 - c1 - c2;
        const df = fitText(desc, dw, rowH - 0.06, { sizes: [11, 10.5, 10], lh: 1.3, minSize: 9.5 });
        if (df.overflow) warn(ctx, "overflow", `타임테이블 행 ${i + 1} 설명 ${df.lines}줄`);
        tx(ctx, desc, { x: L.mx + 0.2 + c1 + c2, y, w: dw, h: rowH, fontSize: df.size, color: C.gray, valign: "middle", lineSpacingMultiple: 1.3 });
      }
    });
    return finish(ctx, { notes: o.notes, footnote: o.footnote });
  };

  // 16) DataHero — 큰 Stat + 한 줄 해석 + 출처
  deck.dataHero = function dataHero(o = {}) {
    const ctx = begin("dataHero", { dark: !!o.dark, notes: o.notes, footnote: o.footnote });
    const top = header(ctx, o);
    const bottom = bottomOf(ctx, { footnote: o.footnote, _probe: (o.caption || "") + (o.source || "") });
    const avail = bottom - top;
    const stat = String(o.stat || "");
    const sf = fitText(stat, L.cw, 1.3, { sizes: [72, 64, 54, 44, 36], lh: 1.12, minSize: 30 });
    const sh = sf.lines * lineH(sf.size, 1.12) + 0.1;
    const cf = fitText(o.caption || "", L.cw, 0.9, { sizes: [16, 14.5, 13], lh: 1.4, minSize: 12 });
    const chh = (o.caption ? cf.lines * lineH(cf.size, 1.4) + 0.06 : 0);
    const srcH = o.source ? 0.26 : 0;
    const total = sh + (o.caption ? 0.16 + chh : 0) + (o.source ? 0.2 + srcH : 0);
    let y = top + Math.max(0, (avail - total) / 2);
    tx(ctx, stat, { x: L.mx, y, w: L.cw, h: sh, fontSize: sf.size, fontFace: F.title, color: ctx.dark ? C.sky : C.accent, charSpacing: -1.5, valign: "top", lineSpacingMultiple: 1.12 });
    y += sh + 0.16;
    if (o.caption) { tx(ctx, o.caption, { x: L.mx, y, w: L.cw, h: chh, fontSize: cf.size, color: ctx.dark ? C.white : C.ink, lineSpacingMultiple: 1.4, valign: "top" }); y += chh + 0.2; }
    if (o.source) tx(ctx, o.source, { x: L.mx, y, w: L.cw, h: srcH, fontSize: L.size.footnote, color: ctx.dark ? C.darkGray : C.gray, valign: "top" });
    return finish(ctx, { notes: o.notes, footnote: o.footnote });
  };

  // 17) Closing — Ink. 요약 항목 + 연사·기관
  deck.closing = function closing(o = {}) {
    const ctx = begin("closing", { dark: true, footer: o.footer === true, notes: o.notes });
    kindPill(ctx, o.kind);
    rect(ctx, L.mx, 0.95, 0.6, 0.045, C.accent);
    if (o.kicker) tx(ctx, o.kicker, { x: L.mx, y: 1.08, w: L.cw, h: 0.3, fontSize: 12, fontFace: F.bold, color: C.sky, charSpacing: 2 });
    const tf = fitText(o.title || "", L.cw, 1.1, { sizes: [30, 26, 22], lh: 1.12, minSize: 22 });
    const th = tf.lines * lineH(tf.size, 1.12) + 0.08;
    let y = o.kicker ? 1.45 : 1.15;
    tx(ctx, o.title || "", { x: L.mx, y, w: L.cw, h: th, fontSize: tf.size, fontFace: F.title, color: C.white, charSpacing: -0.5, lineSpacingMultiple: 1.12, valign: "top" });
    y += th + 0.25;
    const items = o.items || [];
    const foot = typeof o.footer === "string" ? o.footer : (o.footerLine || null);
    const footY = foot ? 4.75 : 4.85;
    const availH = footY - 0.35 - y;
    const n = Math.max(1, items.length);
    const cols = n > 4 ? 2 : 1;
    const perCol = Math.ceil(n / cols);
    const gap = 0.1;
    const rowH = Math.max(0.36, Math.min(0.6, (availH - gap * (perCol - 1)) / perCol));
    const colW = cols === 2 ? (L.cw - L.gutter) / 2 : L.cw;
    items.forEach((it, i) => {
      const item = typeof it === "string" ? { text: it } : it;
      const c = Math.floor(i / perCol), r = i % perCol;
      const x = L.mx + c * (colW + L.gutter);
      const ry = y + r * (rowH + gap);
      card(ctx, x, ry, colW, rowH, { bg: C.darkCard, radius: 0.06 });
      ctx.s.addShape(pres.shapes.RECTANGLE, { x: x + 0.18, y: ry + (rowH - 0.28) / 2, w: 0.28, h: 0.28, fill: { color: C.accent }, line: { type: "none" } });
      tx(ctx, String(i + 1), { x: x + 0.18, y: ry + (rowH - 0.28) / 2, w: 0.28, h: 0.28, fontSize: 10.5, fontFace: F.title, color: C.white, align: "center", valign: "middle" });
      const tw = colW - 0.7;
      const f = fitText(item.text, tw, rowH - 0.06, { sizes: [13.5, 12.5, 11.5, 11], lh: 1.3, minSize: 10 });
      if (f.overflow) warn(ctx, "overflow", `클로징 항목 ${i + 1} ${f.lines}줄 @${f.size}pt`);
      tx(ctx, item.text, { x: x + 0.58, y: ry, w: tw, h: rowH, fontSize: f.size, color: C.white, valign: "middle", lineSpacingMultiple: 1.3 });
    });
    if (foot) {
      rect(ctx, L.mx, 4.86, L.cw, 0.008, C.darkLine);
      const ff = fitText(foot, L.cw, 0.5, { sizes: [12, 11, 10.5], lh: 1.3, minSize: 10 });
      tx(ctx, foot, { x: L.mx, y: 4.96, w: L.cw, h: ff.lines * lineH(ff.size, 1.3) + 0.04, fontSize: ff.size, color: C.darkGray, lineSpacingMultiple: 1.3 });
    }
    return finish(ctx, { notes: o.notes, autoFootnote: false });
  };

  // ── 저수준 API(커스텀 슬라이드용) ──
  deck.blank = function blank(o = {}) {
    const ctx = begin(o.name || "custom", o);
    const top = o.title ? header(ctx, o) : (o.dark ? 1.0 : L.contentTop);
    return { ctx, s: ctx.s, top, bottom: bottomOf(ctx, o), finish: (fo) => finish(ctx, Object.assign({ notes: o.notes, footnote: o.footnote }, fo || {})) };
  };
  deck.helpers = { tx, rect, card, pill, placeholder, image, header, footnote, finish, bodyBox, bulletRuns, warn, kindPill, timerPill, runningFooter, bottomOf };

  // ── 저장 ──
  deck.count = () => pres.slides.length;
  deck.save = async function save(outPath) {
    const full = path.isAbsolute(outPath) ? outPath : path.resolve(process.cwd(), outPath);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    await pres.writeFile({ fileName: full });
    return full;
  };
  deck.report = function report() {
    const byTag = {};
    for (const w of deck.warnings) byTag[w.tag] = (byTag[w.tag] || 0) + 1;
    return { slides: pres.slides.length, warnings: deck.warnings.length, byTag };
  };

  return deck;
}

module.exports = { createDeck, C, F, L, FONT_SETS, KINDS, fitText, fitTitle, estimateLines, textWidthIn, flatText, VIRTUAL_FOOTNOTE, CAPTURE_COMMON_CAPTION, TITLE_MAX_CHARS };
