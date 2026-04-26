const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "차성재 (smilesjcha)";
pres.title = "AI Native PM으로의 전환 — Agentic AI 서비스 기획과 실행";

// ══════════════════════════════════════════════════════
// DESIGN SYSTEM — Claude theme (Black / White / Blue)
// ══════════════════════════════════════════════════════
const C = {
  black:     "0B0F14",
  deepNavy:  "0E2A47",
  primary:   "2563EB",
  softBlue:  "93C5FD",
  paleBlue:  "DBEAFE",
  slate:     "475569",
  midGray:   "6B7280",
  lightGray: "E5E7EB",
  offWhite:  "F8FAFC",
  white:     "FFFFFF",
};

const SW = 10;
const SH = 5.625;
const BAR_HERO = 0.7;
const BAR      = 0.4;

// ── Layout Constants ──
const L = {
  mx: 0.7,
  cw: 8.6,
  titleY: BAR + 0.16,
  titleH: 0.55,
  subY: BAR + 0.74,
  subH: 0.32,
  topY: 1.20,
  botY: SH - BAR - 0.4,
  titleSize: 26,
  subSize: 12,
  bodySize: 14,
  smallSize: 11,
  captionSize: 10,
};

// ── Font System: 나눔고딕 ──
const F = {
  title: "NanumGothic ExtraBold",
  bold:  "NanumGothic Bold",
  body:  "NanumGothic",
  code:  "Consolas",
};

// ══════════════════════════════════════════════════════
// REUSABLE BUILDERS
// ══════════════════════════════════════════════════════

function darkSlide(opts = {}) {
  const s = pres.addSlide();
  s.background = { color: opts.bg || C.black };
  return s;
}

function lightSlide(opts = {}) {
  const hero = !!opts.hero;
  const bar = hero ? BAR_HERO : BAR;
  const s = pres.addSlide();
  s.background = { color: C.white };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: SW, h: bar, fill: { color: C.black }, line: { color: C.black } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: SH - bar, w: SW, h: bar, fill: { color: C.black }, line: { color: C.black } });
  return s;
}

function addTitle(s, text, opts = {}) {
  const dark = opts.dark || false;
  s.addText(text, {
    x: L.mx, y: opts.y || L.titleY,
    w: L.cw, h: L.titleH,
    fontSize: L.titleSize, fontFace: F.title,
    color: dark ? C.white : C.black,
    bold: true, margin: 0,
  });
}

function addSubtitle(s, text, opts = {}) {
  s.addText(text, {
    x: L.mx, y: opts.y || L.subY,
    w: L.cw, h: opts.h || L.subH,
    fontSize: L.subSize, fontFace: F.body,
    color: opts.color || C.slate, margin: 0,
    lineSpacingMultiple: 1.3,
  });
}

function addBody(s, content, opts = {}) {
  s.addText(content, {
    x: opts.x || L.mx, y: opts.y || L.topY,
    w: opts.w || L.cw, h: opts.h || 3.0,
    fontSize: opts.fs || L.bodySize, fontFace: F.body,
    color: opts.color || C.black, valign: "top", margin: 0,
    lineSpacingMultiple: opts.lh || 1.4,
  });
}

function addFooter(s, text, opts = {}) {
  s.addText(text, {
    x: L.mx, y: L.botY,
    w: L.cw, h: 0.3,
    fontSize: L.captionSize, fontFace: F.body,
    color: opts.color || C.midGray,
    italic: opts.italic !== false,
    bold: opts.bold || false,
    align: opts.align || "left", margin: 0,
  });
}

function addAccentFooter(s, text) {
  addFooter(s, text, { color: C.primary, bold: true, italic: false });
}

function accentLine(s, y, opts = {}) {
  s.addShape(pres.shapes.RECTANGLE, {
    x: opts.x || L.mx, y, w: opts.w || 1.0, h: opts.h || 0.04,
    fill: { color: opts.color || C.primary }, line: { color: opts.color || C.primary },
  });
}

function addCard(s, x, y, w, h, opts = {}) {
  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: opts.bg || C.offWhite },
    line: opts.border ? { color: opts.border, width: 0.5 } : { color: opts.bg || C.offWhite },
  });
  if (opts.leftAccent) {
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.05, h,
      fill: { color: opts.leftAccent }, line: { color: opts.leftAccent },
    });
  }
}

function addPlaceholder(s, x, y, w, h, label) {
  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: C.lightGray },
    line: { color: C.midGray, dashType: "dash", width: 1 },
  });
  s.addText("📷  " + label, {
    x, y, w, h,
    fontSize: L.smallSize, fontFace: F.body,
    color: C.slate, align: "center", valign: "middle", margin: 0,
  });
}

// ── New: 2×2 Quad ──
function addQuad(s, items, opts = {}) {
  const startY = opts.y || 1.25;
  const totalH = opts.h || 3.4;
  const cellW = (L.cw - 0.2) / 2;
  const cellH = (totalH - 0.2) / 2;
  items.slice(0, 4).forEach((it, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = L.mx + col * (cellW + 0.2);
    const y = startY + row * (cellH + 0.2);
    addCard(s, x, y, cellW, cellH, { bg: C.offWhite, leftAccent: C.primary });
    s.addText(it.tag || "", {
      x: x + 0.2, y: y + 0.15, w: cellW - 0.3, h: 0.3,
      fontSize: 11, fontFace: F.bold, color: C.primary, bold: true, margin: 0,
    });
    s.addText(it.title, {
      x: x + 0.2, y: y + 0.45, w: cellW - 0.3, h: 0.45,
      fontSize: 17, fontFace: F.title, color: C.black, bold: true, margin: 0,
    });
    s.addText(it.body, {
      x: x + 0.2, y: y + 0.95, w: cellW - 0.3, h: cellH - 1.05,
      fontSize: 11.5, fontFace: F.body, color: C.slate, margin: 0,
      lineSpacingMultiple: 1.4, valign: "top",
    });
  });
}

// ── New: N-step horizontal arrow flow (chevrons) ──
function addArrowFlow(s, steps, opts = {}) {
  const y = opts.y || 1.6;
  const h = opts.h || 1.6;
  const gap = 0.12;
  const totalW = L.cw;
  const stepW = (totalW - gap * (steps.length - 1)) / steps.length;
  steps.forEach((st, i) => {
    const x = L.mx + i * (stepW + gap);
    const isLast = i === steps.length - 1;
    const accent = st.accent || (i === steps.length - 1 ? C.primary : C.slate);
    s.addShape(isLast ? pres.shapes.RECTANGLE : pres.shapes.CHEVRON, {
      x, y, w: stepW, h,
      fill: { color: st.bg || (i === steps.length - 1 ? C.deepNavy : C.offWhite) },
      line: { color: accent, width: 1 },
    });
    const tc = (st.bg === C.deepNavy || (i === steps.length - 1 && !st.bg)) ? C.white : C.black;
    s.addText(st.tag || `STEP ${i + 1}`, {
      x: x + 0.2, y: y + 0.2, w: stepW - 0.4, h: 0.3,
      fontSize: 10, fontFace: F.bold,
      color: (tc === C.white) ? C.softBlue : C.primary, bold: true, margin: 0,
    });
    s.addText(st.title, {
      x: x + 0.2, y: y + 0.5, w: stepW - 0.4, h: 0.5,
      fontSize: 15, fontFace: F.title, color: tc, bold: true, margin: 0,
    });
    if (st.body) {
      s.addText(st.body, {
        x: x + 0.2, y: y + 1.0, w: stepW - 0.4, h: h - 1.1,
        fontSize: 10.5, fontFace: F.body,
        color: (tc === C.white) ? C.lightGray : C.slate,
        margin: 0, lineSpacingMultiple: 1.3, valign: "top",
      });
    }
  });
}

// ── New: Two-circle Venn ──
function addVennTwo(s, leftLabel, rightLabel, intersection, opts = {}) {
  const cy = opts.cy || 2.85;
  const r = 1.45;
  const lx = 2.1, rx = 5.4;
  // Left circle
  s.addShape(pres.shapes.OVAL, {
    x: lx, y: cy - r, w: r * 2, h: r * 2,
    fill: { color: C.paleBlue, transparency: 30 },
    line: { color: C.primary, width: 1.5 },
  });
  // Right circle
  s.addShape(pres.shapes.OVAL, {
    x: rx, y: cy - r, w: r * 2, h: r * 2,
    fill: { color: C.paleBlue, transparency: 30 },
    line: { color: C.primary, width: 1.5 },
  });
  // Intersection accent (smaller oval centered)
  s.addShape(pres.shapes.OVAL, {
    x: rx, y: cy - r + 0.1, w: (lx + r * 2) - rx, h: r * 2 - 0.2,
    fill: { color: C.softBlue, transparency: 25 },
    line: { color: C.primary, width: 0 },
  });
  // Left label (outside-left)
  s.addText(leftLabel, {
    x: lx - 0.4, y: cy - 0.25, w: 1.6, h: 0.5,
    fontSize: 14, fontFace: F.title, color: C.deepNavy, bold: true,
    align: "center", valign: "middle", margin: 0,
  });
  // Right label (outside-right)
  s.addText(rightLabel, {
    x: rx + r * 2 - 1.2, y: cy - 0.25, w: 1.6, h: 0.5,
    fontSize: 14, fontFace: F.title, color: C.deepNavy, bold: true,
    align: "center", valign: "middle", margin: 0,
  });
  // Intersection label (center, between circles)
  s.addText(intersection, {
    x: 3.85, y: cy - 0.35, w: 1.85, h: 0.7,
    fontSize: 11, fontFace: F.bold, color: C.black, bold: true,
    align: "center", valign: "middle", margin: 0,
    lineSpacingMultiple: 1.2,
  });
}

// ── New: N-step horizontal pipeline of small circles + labels ──
function addStepPipeline(s, steps, opts = {}) {
  const y = opts.y || 2.3;
  const r = 0.45;
  const labelH = 0.7;
  const totalW = L.cw;
  const gap = (totalW - r * 2 * steps.length) / (steps.length - 1);
  steps.forEach((st, i) => {
    const cx = L.mx + i * (r * 2 + gap);
    // Connecting line (from previous)
    if (i > 0) {
      const prev = L.mx + (i - 1) * (r * 2 + gap) + r * 2;
      s.addShape(pres.shapes.LINE, {
        x: prev, y: y + r, w: cx - prev, h: 0,
        line: { color: C.primary, width: 2, endArrowType: "triangle" },
      });
    }
    // Circle
    s.addShape(pres.shapes.OVAL, {
      x: cx, y: y, w: r * 2, h: r * 2,
      fill: { color: st.fill || C.deepNavy },
      line: { color: C.primary, width: 1.5 },
    });
    s.addText(`${i + 1}`, {
      x: cx, y: y, w: r * 2, h: r * 2,
      fontSize: 16, fontFace: F.title, color: C.white, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    // Label below
    s.addText(st.label, {
      x: cx - 0.5, y: y + r * 2 + 0.1, w: r * 2 + 1.0, h: labelH,
      fontSize: 11, fontFace: F.bold, color: C.black, bold: true,
      align: "center", valign: "top", margin: 0, lineSpacingMultiple: 1.2,
    });
    if (st.sub) {
      s.addText(st.sub, {
        x: cx - 0.5, y: y + r * 2 + 0.42, w: r * 2 + 1.0, h: 0.4,
        fontSize: 9, fontFace: F.body, color: C.slate,
        align: "center", valign: "top", margin: 0,
      });
    }
  });
}

// ══════════════════════════════════════════════════════
//  SLIDES (20 total)
// ══════════════════════════════════════════════════════

// ─── SLIDE 1: TITLE (Hero, dark) ───
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  // Hero bars (thicker)
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: SW, h: BAR_HERO, fill: { color: C.black }, line: { color: C.black } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: SH - BAR_HERO, w: SW, h: BAR_HERO, fill: { color: C.black }, line: { color: C.black } });

  // Left vertical primary bar (hero accent)
  s.addShape(pres.shapes.RECTANGLE, {
    x: L.mx, y: BAR_HERO + 0.5, w: 0.06, h: SH - 2 * BAR_HERO - 1.0,
    fill: { color: C.primary }, line: { color: C.primary },
  });

  // Eyebrow
  s.addText("CLAUDE CODE CLUB  ·  2026.04.27", {
    x: L.mx + 0.25, y: BAR_HERO + 0.55, w: L.cw - 0.25, h: 0.35,
    fontSize: 12, fontFace: F.bold, color: C.primary, bold: true, margin: 0, charSpacing: 4,
  });

  // Main title
  s.addText("AI Native PM으로의 전환", {
    x: L.mx + 0.25, y: BAR_HERO + 0.95, w: L.cw - 0.25, h: 0.85,
    fontSize: 38, fontFace: F.title, color: C.black, bold: true, margin: 0,
  });
  s.addText("Agentic AI 서비스 기획과 실행", {
    x: L.mx + 0.25, y: BAR_HERO + 1.78, w: L.cw - 0.25, h: 0.55,
    fontSize: 24, fontFace: F.bold, color: C.deepNavy, margin: 0,
  });
  s.addText("Why  ·  What  ·  How", {
    x: L.mx + 0.25, y: BAR_HERO + 2.35, w: L.cw - 0.25, h: 0.4,
    fontSize: 16, fontFace: F.body, color: C.slate, margin: 0, charSpacing: 2,
  });

  // Speaker
  s.addText("차성재 (smilesjcha)", {
    x: L.mx + 0.25, y: SH - BAR_HERO - 0.85, w: 4.5, h: 0.35,
    fontSize: 14, fontFace: F.bold, color: C.black, margin: 0,
  });
  s.addText("AI Engineer → AI Service PM → Agentic AI side PM", {
    x: L.mx + 0.25, y: SH - BAR_HERO - 0.5, w: 5.5, h: 0.3,
    fontSize: 11, fontFace: F.body, color: C.slate, margin: 0,
  });

  // Disclaimer box (right-bottom)
  const dx = 5.6, dy = SH - BAR_HERO - 0.95, dw = 3.7, dh = 0.85;
  s.addShape(pres.shapes.RECTANGLE, {
    x: dx, y: dy, w: dw, h: dh,
    fill: { color: C.offWhite },
    line: { color: C.slate, width: 0.75 },
  });
  s.addText("DISCLAIMER", {
    x: dx + 0.15, y: dy + 0.08, w: dw - 0.3, h: 0.25,
    fontSize: 9, fontFace: F.bold, color: C.slate, bold: true, charSpacing: 3, margin: 0,
  });
  s.addText("본 발표는 무신사의 공식 입장이 아닌\n발표자 개인의 견해입니다.", {
    x: dx + 0.15, y: dy + 0.32, w: dw - 0.3, h: dh - 0.4,
    fontSize: 10.5, fontFace: F.body, color: C.slate, margin: 0, lineSpacingMultiple: 1.3,
  });
}

// ─── SLIDE 2: 발표자 한 줄 — 4 산업 타임라인 ───
{
  const s = lightSlide();
  addTitle(s, "발표자 한 줄");
  addSubtitle(s, "4개 산업을 거친 AI 실무자, 지금은 PM");

  const items = [
    { tag: "FINANCE",   label: "금융",  sub: "MLOps",    role: "AutoML for 은행/카드/보험" },
    { tag: "MEDICAL",   label: "의료",  sub: "CVOps",    role: "대장내시경 실시간 탐지·진단" },
    { tag: "EDUCATION", label: "교육",  sub: "LLMOps",   role: "영어 첨삭·AICC 학원 상담" },
    { tag: "FASHION",   label: "패션",  sub: "Agentic",  role: "Agentic AI side PM (런칭 전)" },
  ];
  const startX = L.mx;
  const w = (L.cw - 0.45) / 4;
  const y = 1.5;
  items.forEach((it, i) => {
    const x = startX + i * (w + 0.15);
    addCard(s, x, y, w, 1.6, { bg: C.offWhite, leftAccent: C.primary });
    s.addText(it.tag, {
      x: x + 0.2, y: y + 0.15, w: w - 0.3, h: 0.25,
      fontSize: 9, fontFace: F.bold, color: C.primary, bold: true, charSpacing: 3, margin: 0,
    });
    s.addText(it.label, {
      x: x + 0.2, y: y + 0.4, w: w - 0.3, h: 0.4,
      fontSize: 19, fontFace: F.title, color: C.black, bold: true, margin: 0,
    });
    s.addText(it.sub, {
      x: x + 0.2, y: y + 0.8, w: w - 0.3, h: 0.28,
      fontSize: 11, fontFace: F.bold, color: C.deepNavy, margin: 0,
    });
    s.addText(it.role, {
      x: x + 0.2, y: y + 1.1, w: w - 0.3, h: 0.4,
      fontSize: 9.5, fontFace: F.body, color: C.slate, margin: 0, lineSpacingMultiple: 1.3,
    });
  });

  // Role evolution arrow under
  s.addText("AI Engineer (Backend)  →  AI Service PM  →  Agentic AI PM", {
    x: L.mx, y: 3.35, w: L.cw, h: 0.4,
    fontSize: 14, fontFace: F.bold, color: C.deepNavy, align: "center", margin: 0,
  });
  s.addText("+  시립대 / 아주대 AI 부문 겸임교수", {
    x: L.mx, y: 3.75, w: L.cw, h: 0.3,
    fontSize: 11, fontFace: F.body, color: C.slate, align: "center", margin: 0,
  });

  addFooter(s, "산업이 바뀌면 AI의 무게중심도 달라진다.");
}

// ─── SLIDE 3: 4개 산업 × 4가지 AI Ops ───
{
  const s = lightSlide();
  addTitle(s, "4개 산업 × 4가지 AI Ops");
  addSubtitle(s, "같은 'AI'라도 산업마다 무게중심이 다르다");

  addQuad(s, [
    { tag: "FINANCE  ·  MLOPS",   title: "금융 — MLOps",
      body: "은행 / 카드 / 보험 대상 AutoML 솔루션.\n모델 학습·운영 파이프라인이 핵심." },
    { tag: "MEDICAL  ·  CVOPS",   title: "의료 — CVOps",
      body: "대장내시경 실시간 탐지·진단.\n프레임 단위 비전 모델과 의사 워크플로우 결합." },
    { tag: "EDUCATION  ·  LLMOPS", title: "교육 — LLMOps",
      body: "영어 글쓰기·말하기 채점·첨삭 + 학원 상담 AICC.\n프롬프트와 평가 루프 운영이 핵심." },
    { tag: "FASHION  ·  AGENTIC",  title: "패션 — Agentic AI",
      body: "사용자 맥락에 따라 행동하는 에이전트 설계.\nside PM, 런칭 전 단계." },
  ], { y: 1.20, h: 3.45 });
}

// ─── SLIDE 4: 역할 진화 화살표 ───
{
  const s = lightSlide();
  addTitle(s, "역할이 바뀐 게 아니라, 표면적이 넓어졌다");
  addSubtitle(s, "AI Engineer → AI Service PM → Agentic AI PM");

  addArrowFlow(s, [
    { tag: "PHASE 1", title: "AI Engineer",
      body: "모델 · 인프라 · 파이프라인.\n'어떻게 만드는가'에 집중." },
    { tag: "PHASE 2", title: "AI Service PM",
      body: "사용자 · 지표 · 검증.\n'무엇을 만드는가'로 확장." },
    { tag: "PHASE 3", title: "Agentic AI PM",
      body: "워크플로우 · 에이전트 · 컨텍스트.\n'어떻게 일하게 만드는가'로 한 번 더." },
  ], { y: 1.55, h: 1.85 });

  // Bottom emphasis
  addCard(s, L.mx, 3.7, L.cw, 0.6, { bg: C.deepNavy, leftAccent: C.primary });
  s.addText("PM이 다뤄야 할 표면적이 넓어졌다 — 사람·데이터·도구·에이전트까지.", {
    x: L.mx + 0.3, y: 3.7, w: L.cw - 0.4, h: 0.6,
    fontSize: 13, fontFace: F.bold, color: C.white, valign: "middle", margin: 0,
  });
}

// ─── SLIDE 5: 모두가 AI Native가 되었다 ───
{
  const s = lightSlide();
  addTitle(s, "모두가 AI Native가 되었다");
  addSubtitle(s, "도구가 평등해진 세계 — 그럼 PM은?");

  const groups = [
    { tag: "ENGINEER",  title: "개발자",     body: "Claude Code · Cursor\n프롬프팅·리뷰·테스트 자동화" },
    { tag: "DESIGNER",  title: "디자이너",   body: "AI 와이어 · 카피 · 이미지\n브랜드 톤 학습·반복 생성" },
    { tag: "LEADERSHIP", title: "리더십",    body: "AI 요약 · 리서치 보조\n의사결정·전략 자료 생성" },
  ];
  const w = 2.6;
  const startX = L.mx;
  const y = 1.5;
  groups.forEach((g, i) => {
    const x = startX + i * (w + 0.15);
    addCard(s, x, y, w, 1.95, { bg: C.offWhite, leftAccent: C.primary });
    s.addText(g.tag, {
      x: x + 0.2, y: y + 0.15, w: w - 0.3, h: 0.28,
      fontSize: 10, fontFace: F.bold, color: C.primary, bold: true, charSpacing: 3, margin: 0,
    });
    s.addText(g.title, {
      x: x + 0.2, y: y + 0.45, w: w - 0.3, h: 0.45,
      fontSize: 18, fontFace: F.title, color: C.black, bold: true, margin: 0,
    });
    s.addText(g.body, {
      x: x + 0.2, y: y + 0.95, w: w - 0.3, h: 0.95,
      fontSize: 11, fontFace: F.body, color: C.slate, margin: 0, lineSpacingMultiple: 1.4,
    });
  });

  // Big question card on the right portion below
  addCard(s, L.mx, 3.6, L.cw, 0.8, { bg: C.deepNavy, leftAccent: C.primary });
  s.addText("그럼 PM은 어디서 차별점을 만드는가?", {
    x: L.mx + 0.3, y: 3.6, w: L.cw - 0.4, h: 0.8,
    fontSize: 18, fontFace: F.title, color: C.white, bold: true, valign: "middle", margin: 0,
  });
}

// ─── SLIDE 6: PM의 본질 — 회사 목표 × 고객 니즈 (Venn) ───
{
  const s = lightSlide();
  addTitle(s, "PM의 본질 — 회사 목표 × 고객 니즈");
  addSubtitle(s, "도구가 평등할수록 '무엇을 풀지'를 가장 잘 아는 사람이 핵심이 된다");

  addVennTwo(s, "회사 목표\n전략 · 지표", "고객 니즈\n시나리오 · 맥락", "AI Native PM이\n정의하는 문제", { cy: 2.95 });

  addAccentFooter(s, "도구가 아니라 문제 정의가 PM의 차별점이다.");
}

// ─── SLIDE 7: 비일반화 도메인의 시나리오 설계 ───
{
  const s = lightSlide();
  addTitle(s, "비일반화 도메인의 시나리오 설계");
  addSubtitle(s, "패션 같은 도메인은 일반 LLM이 모른다 — 시나리오·검증·지표가 PM의 무기");

  addArrowFlow(s, [
    { tag: "STEP 1", title: "시나리오 정의",
      body: "도메인 맥락에 맞는\n핵심 사용자 시나리오 도출.\n특수 표현·구매 패턴·계절성 반영." },
    { tag: "STEP 2", title: "검증 방식 설계",
      body: "사람 평가 · A/B · 회귀 셋.\n시나리오마다 검증 방법이 다르다." },
    { tag: "STEP 3", title: "성공 지표 연결",
      body: "북극성 지표 · 보조 지표.\n시나리오 → 측정 가능한 수로." },
  ], { y: 1.55, h: 1.95 });

  addCard(s, L.mx, 3.8, L.cw, 0.55, { bg: C.offWhite, leftAccent: C.primary });
  s.addText("도메인이 좁을수록, PM의 디테일이 곧 모델의 디테일이 된다.", {
    x: L.mx + 0.3, y: 3.8, w: L.cw - 0.4, h: 0.55,
    fontSize: 13, fontFace: F.bold, color: C.deepNavy, valign: "middle", margin: 0,
  });
}

// ─── SLIDE 8: End-to-End 로드맵 — 1주/2주/분기 ───
{
  const s = lightSlide();
  addTitle(s, "End-to-End 로드맵 — 세 개의 페이스");
  addSubtitle(s, "페이스가 다른 세 개의 루프가 동시에 돈다");

  const lanes = [
    { tag: "WEEKLY",    label: "1주",
      desc: "프롬프트·시나리오 회귀\n빠른 검증·피드백",
      barW: 1.5, color: C.primary },
    { tag: "BIWEEKLY",  label: "2주",
      desc: "PRD · 디자인 · 프로토 한 사이클\n리더십 리뷰 1회",
      barW: 3.0, color: C.deepNavy },
    { tag: "QUARTER",   label: "분기",
      desc: "지표 · 로드맵 회고\n다음 분기 우선순위 재정의",
      barW: 6.0, color: C.slate },
  ];
  const yStart = 1.45;
  const rowH = 0.95;
  lanes.forEach((ln, i) => {
    const y = yStart + i * rowH;
    // Tag
    s.addText(ln.tag, {
      x: L.mx, y, w: 1.3, h: 0.32,
      fontSize: 10, fontFace: F.bold, color: C.primary, bold: true, charSpacing: 2, margin: 0,
    });
    // Label
    s.addText(ln.label, {
      x: L.mx, y: y + 0.32, w: 1.3, h: 0.45,
      fontSize: 22, fontFace: F.title, color: C.black, bold: true, margin: 0,
    });
    // Bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: L.mx + 1.5, y: y + 0.15, w: ln.barW, h: 0.35,
      fill: { color: ln.color }, line: { color: ln.color },
    });
    // Description right of bar
    s.addText(ln.desc, {
      x: L.mx + 1.5, y: y + 0.55, w: 6.5, h: 0.4,
      fontSize: 10.5, fontFace: F.body, color: C.slate, margin: 0, lineSpacingMultiple: 1.3,
    });
  });

  addFooter(s, "한 페이스로만 일하면 디테일이나 방향성 중 하나를 놓친다.");
}

// ─── SLIDE 9: PRD → Design → Prototype → Engineering ───
{
  const s = lightSlide();
  addTitle(s, "산출물의 경계가 흐려진다");
  addSubtitle(s, "PRD → Design → Prototype → Engineering, PM이 프로토까지 끌고 간다");

  addArrowFlow(s, [
    { tag: "PRD",        title: "문제·시나리오",  body: "MD 기반 SSOT.\n시나리오·지표 정의." },
    { tag: "DESIGN",     title: "와이어·플로우",  body: "AI 와이어 + 디자이너 손길.\n핵심 화면만 우선." },
    { tag: "PROTOTYPE",  title: "클릭되는 흐름",  body: "Claude Code 단일 HTML.\n외부 의존 없는 데모." },
    { tag: "ENGINEERING", title: "구현·핸드오프", body: "사양 + 프로토를 같이 전달.\n구현 갭 최소화." },
  ], { y: 1.5, h: 2.0 });

  addCard(s, L.mx, 3.75, L.cw, 0.6, { bg: C.offWhite, leftAccent: C.primary });
  s.addText("PM이 프로토타입까지 들고 가면 — 합의 비용이 줄고, 구현 갭이 좁아진다.", {
    x: L.mx + 0.3, y: 3.75, w: L.cw - 0.4, h: 0.6,
    fontSize: 13, fontFace: F.bold, color: C.deepNavy, valign: "middle", margin: 0,
  });
}

// ─── SLIDE 10: gstack 인용 — Think→Plan→Build→Review→Test→Ship→Reflect ───
{
  const s = lightSlide();
  addTitle(s, "PM의 7단계 사이클");
  addSubtitle(s, "gstack의 Think→Plan→Build→Review→Test→Ship→Reflect를 PM 버전으로");

  addStepPipeline(s, [
    { label: "Think",   sub: "맥락 정리" },
    { label: "Plan",    sub: "PRD/시나리오" },
    { label: "Build",   sub: "프로토+문서" },
    { label: "Review",  sub: "3관점 리뷰" },
    { label: "Test",    sub: "검증·지표" },
    { label: "Ship",    sub: "핸드오프" },
    { label: "Reflect", sub: "분기 회고" },
  ], { y: 1.85 });

  // Quote card
  addCard(s, L.mx, 3.85, L.cw, 0.55, { bg: C.deepNavy, leftAccent: C.primary });
  s.addText("“혼자서 8명의 전문가를 데리고 일하는 것처럼.”", {
    x: L.mx + 0.3, y: 3.85, w: L.cw - 0.4, h: 0.55,
    fontSize: 13, fontFace: F.bold, color: C.white, valign: "middle", margin: 0, italic: true,
  });

  addFooter(s, "gstack — Garry Tan (Y Combinator) · github.com/garrytan/gstack");
}

// ─── SLIDE 11: VSCode + Claude → Claude Desktop ───
{
  const s = lightSlide();
  addTitle(s, "도구 진화 — 코드 옆에서, 맥락 옆으로");
  addSubtitle(s, "VSCode + Claude 확장  →  Claude Desktop");

  // Before
  addCard(s, L.mx, 1.55, 3.85, 2.3, { bg: C.offWhite, leftAccent: C.slate });
  s.addText("BEFORE", {
    x: L.mx + 0.25, y: 1.7, w: 3.4, h: 0.3,
    fontSize: 10, fontFace: F.bold, color: C.slate, bold: true, charSpacing: 3, margin: 0,
  });
  s.addText("VSCode + Claude 확장", {
    x: L.mx + 0.25, y: 2.0, w: 3.4, h: 0.4,
    fontSize: 17, fontFace: F.title, color: C.black, bold: true, margin: 0,
  });
  s.addText([
    { text: "코드 컨텍스트가 강함", options: { bullet: true, breakLine: true } },
    { text: "PM 작업은 IDE에서 어색", options: { bullet: true, breakLine: true } },
    { text: "맥락이 파일 단위로 끊김", options: { bullet: true } },
  ], {
    x: L.mx + 0.25, y: 2.5, w: 3.4, h: 1.3,
    fontSize: 11, fontFace: F.body, color: C.slate, margin: 0, lineSpacingMultiple: 1.45,
  });

  // Arrow
  s.addShape(pres.shapes.RIGHT_ARROW, {
    x: 4.65, y: 2.45, w: 0.85, h: 0.55,
    fill: { color: C.primary }, line: { color: C.primary },
  });

  // After
  addCard(s, 5.6, 1.55, 3.7, 2.3, { bg: C.deepNavy, leftAccent: C.primary });
  s.addText("AFTER", {
    x: 5.85, y: 1.7, w: 3.2, h: 0.3,
    fontSize: 10, fontFace: F.bold, color: C.softBlue, bold: true, charSpacing: 3, margin: 0,
  });
  s.addText("Claude Desktop", {
    x: 5.85, y: 2.0, w: 3.2, h: 0.4,
    fontSize: 17, fontFace: F.title, color: C.white, bold: true, margin: 0,
  });
  s.addText([
    { text: "맥락·문서 중심 작업 비중 ↑", options: { bullet: true, breakLine: true, color: C.white } },
    { text: "Skill / Plugin / MCP 풀 활용", options: { bullet: true, breakLine: true, color: C.white } },
    { text: "프로젝트별 컨텍스트 영속", options: { bullet: true, color: C.white } },
  ], {
    x: 5.85, y: 2.5, w: 3.2, h: 1.3,
    fontSize: 11, fontFace: F.body, color: C.lightGray, margin: 0, lineSpacingMultiple: 1.45,
  });

  addFooter(s, "코드 옆 PM에서, 문서·맥락 옆 PM으로.");
}

// ─── SLIDE 12: Skill / Plugin 진화 + harness 인용 ───
{
  const s = lightSlide();
  addTitle(s, "Skill · Plugin — 마구(harness)를 다듬는 일");
  addSubtitle(s, "도구 자체가 아니라, 도구를 어떻게 묶어 쓰느냐가 일이 되었다");

  const tiers = [
    { tag: "TIER 1", title: "단일 프롬프트",     body: "한 번의 대화 / 한 번의 결과.\n재현·재사용 어려움." },
    { tag: "TIER 2", title: "역할별 Skill",     body: "PRD-review, scenario-spec,\nleadership-summary 등 분리." },
    { tag: "TIER 3", title: "Plugin · MCP",     body: "개발자와 함께 정비.\n팀 단위 표준 워크플로우." },
  ];
  const w = 2.6, y = 1.55;
  tiers.forEach((t, i) => {
    const x = L.mx + i * (w + 0.15);
    addCard(s, x, y, w, 2.0, { bg: C.offWhite, leftAccent: C.primary });
    s.addText(t.tag, {
      x: x + 0.2, y: y + 0.15, w: w - 0.3, h: 0.28,
      fontSize: 10, fontFace: F.bold, color: C.primary, bold: true, charSpacing: 3, margin: 0,
    });
    s.addText(t.title, {
      x: x + 0.2, y: y + 0.45, w: w - 0.3, h: 0.45,
      fontSize: 16, fontFace: F.title, color: C.black, bold: true, margin: 0,
    });
    s.addText(t.body, {
      x: x + 0.2, y: y + 0.95, w: w - 0.3, h: 1.0,
      fontSize: 11, fontFace: F.body, color: C.slate, margin: 0, lineSpacingMultiple: 1.4,
    });
  });

  // Quote box
  addCard(s, L.mx, 3.75, L.cw, 0.6, { bg: C.deepNavy, leftAccent: C.primary });
  s.addText("“Harness engineering = 도구가 아니라 마구를 다듬는 일.”", {
    x: L.mx + 0.3, y: 3.75, w: L.cw - 0.4, h: 0.6,
    fontSize: 13, fontFace: F.bold, color: C.white, valign: "middle", margin: 0, italic: true,
  });

  addFooter(s, "재인용: gstack — Garry Tan (Y Combinator)");
}

// ─── SLIDE 13: Confluence ↔ Markdown ───
{
  const s = lightSlide();
  addTitle(s, "Confluence ↔ Markdown — 양식의 자유");
  addSubtitle(s, "양식이 아니라 내용에 시간을 쓰기 위해, MD를 작업 표준으로");

  // Left
  addCard(s, L.mx, 1.55, 3.85, 2.3, { bg: C.offWhite, leftAccent: C.slate });
  s.addText("CONFLUENCE", {
    x: L.mx + 0.25, y: 1.7, w: 3.4, h: 0.3,
    fontSize: 10, fontFace: F.bold, color: C.slate, bold: true, charSpacing: 3, margin: 0,
  });
  s.addText("전사 표준", {
    x: L.mx + 0.25, y: 2.0, w: 3.4, h: 0.4,
    fontSize: 17, fontFace: F.title, color: C.black, bold: true, margin: 0,
  });
  s.addText([
    { text: "조직 가시성·검색", options: { bullet: true, breakLine: true } },
    { text: "탭·표·이미지 풍부", options: { bullet: true, breakLine: true } },
    { text: "리뷰/diff 약함", options: { bullet: true } },
  ], {
    x: L.mx + 0.25, y: 2.5, w: 3.4, h: 1.3,
    fontSize: 11, fontFace: F.body, color: C.slate, margin: 0, lineSpacingMultiple: 1.45,
  });

  // Bidirectional arrow
  s.addShape(pres.shapes.LEFT_RIGHT_ARROW, {
    x: 4.65, y: 2.45, w: 0.85, h: 0.55,
    fill: { color: C.primary }, line: { color: C.primary },
  });

  // Right
  addCard(s, 5.6, 1.55, 3.7, 2.3, { bg: C.offWhite, leftAccent: C.primary });
  s.addText("MARKDOWN  ·  GITHUB", {
    x: 5.85, y: 1.7, w: 3.2, h: 0.3,
    fontSize: 10, fontFace: F.bold, color: C.primary, bold: true, charSpacing: 3, margin: 0,
  });
  s.addText("작업 표준", {
    x: 5.85, y: 2.0, w: 3.2, h: 0.4,
    fontSize: 17, fontFace: F.title, color: C.black, bold: true, margin: 0,
  });
  s.addText([
    { text: "diff · 코멘트 · 히스토리", options: { bullet: true, breakLine: true } },
    { text: "PM 문서를 코드처럼 리뷰", options: { bullet: true, breakLine: true } },
    { text: "버전 관리·자동화 친화", options: { bullet: true } },
  ], {
    x: 5.85, y: 2.5, w: 3.2, h: 1.3,
    fontSize: 11, fontFace: F.body, color: C.deepNavy, margin: 0, lineSpacingMultiple: 1.45,
  });

  addFooter(s, "둘 사이를 자유롭게 변환할 수 있어야 한다 — 양식보다 내용이 먼저.");
}

// ─── SLIDE 14: 와이어프레임 → Claude Code 프로토타입 → 리더십 리뷰 ───
{
  const s = lightSlide();
  addTitle(s, "그림이 아니라, 클릭되는 흐름");
  addSubtitle(s, "와이어프레임 → Claude Code 프로토타입 → 리더십 리뷰");

  const w = 2.7, y = 1.5;
  const items = [
    { tag: "STEP 1", title: "와이어프레임", note: "종이 / 피그마",            label: "Wireframe Sketch" },
    { tag: "STEP 2", title: "프로토타입",   note: "Claude Code · 단일 HTML", label: "Clickable HTML Mock" },
    { tag: "STEP 3", title: "리더십 리뷰",  note: "직접 클릭하며 합의",       label: "Stakeholder Review" },
  ];
  items.forEach((it, i) => {
    const x = L.mx + i * (w + 0.25);
    s.addText(it.tag, {
      x: x + 0.05, y: y, w: w - 0.1, h: 0.25,
      fontSize: 10, fontFace: F.bold, color: C.primary, bold: true, charSpacing: 3, margin: 0,
    });
    s.addText(it.title, {
      x: x + 0.05, y: y + 0.25, w: w - 0.1, h: 0.4,
      fontSize: 16, fontFace: F.title, color: C.black, bold: true, margin: 0,
    });
    addPlaceholder(s, x, y + 0.7, w, 1.5, it.label);
    s.addText(it.note, {
      x: x + 0.05, y: y + 2.25, w: w - 0.1, h: 0.3,
      fontSize: 10.5, fontFace: F.body, color: C.slate, margin: 0,
    });
    if (i < items.length - 1) {
      s.addShape(pres.shapes.RIGHT_ARROW, {
        x: x + w + 0.02, y: y + 1.3, w: 0.2, h: 0.3,
        fill: { color: C.primary }, line: { color: C.primary },
      });
    }
  });

  addCard(s, L.mx, 3.95, L.cw, 0.45, { bg: C.offWhite, leftAccent: C.primary });
  s.addText("그림으로 합의하던 걸 클릭으로 합의하면, 의사결정 속도가 바뀐다.", {
    x: L.mx + 0.3, y: 3.95, w: L.cw - 0.4, h: 0.45,
    fontSize: 12, fontFace: F.bold, color: C.deepNavy, valign: "middle", margin: 0,
  });
}

// ─── SLIDE 15: ai-native-pm — 다중 PM × 다중 프로젝트 단일 repo ───
{
  const s = lightSlide();
  addTitle(s, "ai-native-pm — 단일 repo, 다중 PM, 다중 프로젝트");
  addSubtitle(s, "컨텍스트는 공통화, 프로젝트는 분리");

  // Repo tree (left)
  addCard(s, L.mx, 1.45, 4.6, 2.95, { bg: C.offWhite, leftAccent: C.primary });
  s.addText("ai-native-pm/", {
    x: L.mx + 0.3, y: 1.55, w: 4.2, h: 0.32,
    fontSize: 13, fontFace: F.bold, color: C.deepNavy, bold: true, margin: 0,
  });
  const tree = [
    "├── CLAUDE.md          ← 거버넌스",
    "├── context/           ← 무신사 공통 컨텍스트",
    "│   ├── company-policies/",
    "│   ├── domain-knowledge/",
    "│   └── external-services/",
    "├── docs/",
    "│   ├── templates/",
    "│   └── evaluation/   ← 3관점 평가 기준",
    "└── projects/",
    "    ├── 26Q2_PM-A_Project-X/",
    "    ├── 26Q2_PM-B_Project-Y/",
    "    └── 26Q2_PM-C_Project-Z/",
  ];
  s.addText(tree.join("\n"), {
    x: L.mx + 0.3, y: 1.9, w: 4.2, h: 2.4,
    fontSize: 10, fontFace: F.code, color: C.slate, margin: 0, lineSpacingMultiple: 1.35,
  });

  // Right side benefits
  const benefits = [
    { tag: "공통",   title: "Context once, reuse N times", body: "한 번 쌓은 도메인 지식을\n모든 프로젝트가 참조" },
    { tag: "분리",   title: "Project per PM",              body: "PM별·프로젝트별 폴더로\n작업 영역 명확" },
    { tag: "거버넌스", title: "Skill로 자동 검토",          body: "리더십·디자인·엔지니어\n3관점 평가 자동 실행" },
  ];
  const bx = 5.5, by = 1.45, bw = 3.8, bh = 0.92;
  benefits.forEach((b, i) => {
    const y = by + i * (bh + 0.13);
    addCard(s, bx, y, bw, bh, { bg: C.offWhite, leftAccent: C.primary });
    s.addText(b.tag, {
      x: bx + 0.2, y: y + 0.08, w: bw - 0.3, h: 0.25,
      fontSize: 9, fontFace: F.bold, color: C.primary, bold: true, charSpacing: 3, margin: 0,
    });
    s.addText(b.title, {
      x: bx + 0.2, y: y + 0.32, w: bw - 0.3, h: 0.3,
      fontSize: 12.5, fontFace: F.bold, color: C.black, bold: true, margin: 0,
    });
    s.addText(b.body, {
      x: bx + 0.2, y: y + 0.6, w: bw - 0.3, h: bh - 0.55,
      fontSize: 10, fontFace: F.body, color: C.slate, margin: 0, lineSpacingMultiple: 1.3,
    });
  });

  addFooter(s, "ai-native-pm (smilesjcha, 오픈소스) · github.com/smilesjcha/ai-native-pm");
}

// ─── SLIDE 16: 3관점 PRD 평가 — 리더십 / 디자이너 / 엔지니어 ───
{
  const s = lightSlide();
  addTitle(s, "3관점 PRD 평가 — 한 PRD를 세 페르소나가 본다");
  addSubtitle(s, "리더십 · 디자이너 · 엔지니어를 Skill로 동시 실행하면 사각지대가 줄어든다");

  const persons = [
    { tag: "LEADERSHIP", title: "리더십",
      q: "이 프로젝트에 투자할\n가치가 있는가?",
      check: "전략 · 지표 · 우선순위" },
    { tag: "DESIGNER",   title: "디자이너",
      q: "이 PRD만으로 와이어를\n그릴 수 있는가?",
      check: "사용자 흐름 · 일관성" },
    { tag: "ENGINEER",   title: "엔지니어",
      q: "이 범위를 주어진 기간에\n만들 수 있는가?",
      check: "구현 가능성 · 리스크" },
  ];
  const w = 2.6, y = 1.5;
  persons.forEach((p, i) => {
    const x = L.mx + i * (w + 0.15);
    addCard(s, x, y, w, 2.45, { bg: C.offWhite, leftAccent: C.primary });
    s.addText(p.tag, {
      x: x + 0.2, y: y + 0.15, w: w - 0.3, h: 0.28,
      fontSize: 10, fontFace: F.bold, color: C.primary, bold: true, charSpacing: 3, margin: 0,
    });
    s.addText(p.title, {
      x: x + 0.2, y: y + 0.45, w: w - 0.3, h: 0.45,
      fontSize: 18, fontFace: F.title, color: C.black, bold: true, margin: 0,
    });
    s.addText("핵심 질문", {
      x: x + 0.2, y: y + 0.95, w: w - 0.3, h: 0.25,
      fontSize: 9, fontFace: F.bold, color: C.slate, bold: true, charSpacing: 2, margin: 0,
    });
    s.addText("“" + p.q + "”", {
      x: x + 0.2, y: y + 1.2, w: w - 0.3, h: 0.65,
      fontSize: 11.5, fontFace: F.body, color: C.deepNavy, italic: true, margin: 0, lineSpacingMultiple: 1.35,
    });
    s.addText("체크 항목", {
      x: x + 0.2, y: y + 1.85, w: w - 0.3, h: 0.25,
      fontSize: 9, fontFace: F.bold, color: C.slate, bold: true, charSpacing: 2, margin: 0,
    });
    s.addText(p.check, {
      x: x + 0.2, y: y + 2.1, w: w - 0.3, h: 0.3,
      fontSize: 10.5, fontFace: F.body, color: C.slate, margin: 0,
    });
  });

  addAccentFooter(s, "ai-native-pm 레포의 Skill로 구현 — 한 번에 세 명의 리뷰를 받는다.");
}

// ─── SLIDE 17: 거버넌스 — 네이밍·톤·가독성 ───
{
  const s = lightSlide();
  addTitle(s, "거버넌스 — 작은 규약이 큰 마찰을 줄인다");
  addSubtitle(s, "여러 PM이 같은 레포를 쓸 때 필요한 최소 약속");

  const items = [
    { tag: "FOLDER", title: "kebab-case", body: "prd/, specs/, wireframes/" },
    { tag: "PROJECT", title: "YYQ#_Title-Case", body: "26Q2_Claude-Code-Club-Talk/" },
    { tag: "SSOT",   title: "UPPER.md", body: "PRD.md · HLD.md · LLD.md" },
    { tag: "DEPTH",  title: "얕은 계층", body: "이해를 위해 단계 줄이기" },
  ];
  addQuad(s, items, { y: 1.45, h: 2.95 });
}

// ─── SLIDE 18: How 한 장 — Tools · Docs · Process · Governance ───
{
  const s = lightSlide();
  addTitle(s, "한 장으로 보는 How 스택");
  addSubtitle(s, "도구 · 문서 · 프로세스 · 거버넌스 — 4축으로 묶기");

  addQuad(s, [
    { tag: "TOOLS",      title: "도구",
      body: "Claude Desktop · Skills · MCP\nClaude Code (프로토)" },
    { tag: "DOCS",       title: "문서",
      body: "MD ↔ Confluence 변환\nGitHub 스타일 리뷰" },
    { tag: "PROCESS",    title: "프로세스",
      body: "PRD → Design → Proto\n→ Engineering 사이클" },
    { tag: "GOVERNANCE", title: "거버넌스",
      body: "3관점 평가 · 네이밍\n계층 단순화 · 톤 통일" },
  ], { y: 1.20, h: 3.45 });
}

// ─── SLIDE 19: Closing — Key Message ───
{
  const s = lightSlide();
  // Big quote mark on left
  s.addShape(pres.shapes.RECTANGLE, {
    x: L.mx, y: 1.4, w: 0.12, h: 2.2,
    fill: { color: C.primary }, line: { color: C.primary },
  });
  s.addText("AI Native PM은 도구가 아니라\n마구(harness)를 다듬는 사람.", {
    x: L.mx + 0.4, y: 1.4, w: L.cw - 0.4, h: 1.55,
    fontSize: 30, fontFace: F.title, color: C.black, bold: true, margin: 0, lineSpacingMultiple: 1.3,
  });
  s.addText("그리고 이건 진행 중인 실험의 중간 보고입니다.", {
    x: L.mx + 0.4, y: 3.0, w: L.cw - 0.4, h: 0.45,
    fontSize: 16, fontFace: F.body, color: C.slate, margin: 0,
  });

  // Small disclaimer reminder
  addCard(s, L.mx, 4.0, L.cw, 0.45, { bg: C.offWhite, leftAccent: C.slate });
  s.addText("DISCLAIMER  ·  본 발표는 무신사의 공식 입장이 아닌 발표자 개인의 견해입니다.", {
    x: L.mx + 0.3, y: 4.0, w: L.cw - 0.4, h: 0.45,
    fontSize: 10.5, fontFace: F.body, color: C.slate, valign: "middle", margin: 0, charSpacing: 1,
  });
}

// ─── SLIDE 20: Q&A ───
{
  const s = lightSlide();
  s.addText("Q  &  A", {
    x: L.mx, y: 1.6, w: L.cw, h: 1.2,
    fontSize: 60, fontFace: F.title, color: C.black, bold: true,
    align: "center", valign: "middle", margin: 0, charSpacing: 4,
  });
  s.addText("질문과 의견을 환영합니다.", {
    x: L.mx, y: 2.85, w: L.cw, h: 0.4,
    fontSize: 16, fontFace: F.body, color: C.slate, align: "center", margin: 0,
  });

  // Contact card
  addCard(s, 2.0, 3.6, 6.0, 0.85, { bg: C.offWhite, leftAccent: C.primary });
  s.addText("github.com/smilesjcha", {
    x: 2.2, y: 3.7, w: 5.6, h: 0.35,
    fontSize: 14, fontFace: F.bold, color: C.deepNavy, bold: true, align: "center", margin: 0,
  });
  s.addText("ai-native-pm  ·  open source PM workflow repo", {
    x: 2.2, y: 4.05, w: 5.6, h: 0.35,
    fontSize: 11, fontFace: F.body, color: C.slate, align: "center", margin: 0,
  });
}

// ══════════════════════════════════════════════════════
//  OUTPUT
// ══════════════════════════════════════════════════════
const out = "claude-code-club-talk.pptx";
pres.writeFile({ fileName: out })
  .then(() => console.log("Created: " + out + " (" + pres.slides.length + " slides)"))
  .catch(e => { console.error(e); process.exit(1); });
