const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "차성재";
pres.title = "AI NATIVE 시대, AI PM의 새로운 무기";

// ══════════════════════════════════════════════════════
// DESIGN SYSTEM
// ══════════════════════════════════════════════════════
// Apple grammar × NanumGothic — single Action Blue accent. (keys kept for back-compat)
const C = {
  black: "1D1D1F",     // ink (near-black, premium — not pure black)
  ink: "1D1D1F",
  darkGray: "333333",
  midGray: "86868B",   // Apple gray
  gray: "86868B",
  grayLine: "D2D2D7",
  lightGray: "E8E8ED",
  hairline: "E8E8ED",
  offWhite: "F5F5F7",  // parchment
  parchment: "F5F5F7",
  white: "FFFFFF",
  canvas: "FFFFFF",
  tile: "1D1D1F",      // dark slide / section divider
  accent: "0066CC",    // Action Blue — the single accent
  blue: "0066CC",
  focus: "0071E3",
  sky: "2997FF",       // accent on dark surfaces
  warmBg: "EAF2FB",    // emphasis card = blue tint (replaces old amber)
  warmText: "004C99",
};

const SW = 10;
const SH = 5.625;
const BAR = 0.5;

// ── Layout Constants ──
const L = {
  mx: 0.7,               // margin x (left/right)
  cw: 8.6,               // content width (SW - 2*mx)
  titleY: 0.46,          // title Y position (raised for tighter premium header)
  titleH: 0.55,          // title height
  subY: 1.04,            // subtitle Y
  subH: 0.35,            // subtitle height
  topY: 1.5,             // content area top (lowered for vertical balance)
  botY: SH - BAR - 0.4,  // content area bottom (for footer text)
  titleSize: 26,
  subSize: 12,
  bodySize: 14,
  smallSize: 11,
  captionSize: 10,
};

// ── Font System: 나눔고딕 통합 고정 (코드/숫자 포함 전부 NanumGothic) ──
const F = {
  title: "NanumGothic ExtraBold",
  bold: "NanumGothic Bold",
  body: "NanumGothic",
  light: "NanumGothic Light",
  code: "NanumGothic",
};

// ══════════════════════════════════════════════════════
// REUSABLE BUILDERS
// ══════════════════════════════════════════════════════

function darkSlide() {
  const s = pres.addSlide();
  s.background = { color: C.ink };
  return s;
}

// Premium running footer: hairline rule + left brand + right page number.
function runningFooter(s) {
  const num = pres.slides.length; // this slide is the latest added
  s.addShape(pres.shapes.RECTANGLE, { x: L.mx, y: 5.05, w: L.cw, h: 0.008, fill: { color: C.hairline } });
  s.addText("실무 AI 적용 사례  ·  FastCampus", {
    x: L.mx, y: 5.1, w: 5.0, h: 0.3, fontSize: 9, fontFace: F.body, color: C.midGray, margin: 0,
  });
  s.addText(String(num).padStart(2, "0"), {
    x: SW - L.mx - 0.8, y: 5.1, w: 0.8, h: 0.3, fontSize: 9, fontFace: F.body, color: C.midGray, align: "right", margin: 0,
  });
}

// Clean light canvas — near-invisible chrome (Apple). No heavy bars.
function lightSlide(opts = {}) {
  const s = pres.addSlide();
  s.background = { color: opts.parchment ? C.parchment : C.white };
  if (opts.footer !== false) runningFooter(s);
  return s;
}

function addTitle(s, text, opts = {}) {
  const dark = opts.dark || false;
  s.addText(text, {
    x: L.mx, y: opts.y || L.titleY,
    w: L.cw, h: L.titleH,
    fontSize: opts.size || L.titleSize, fontFace: F.title,
    color: dark ? C.white : C.ink,
    bold: true, charSpacing: -0.4, margin: 0,
  });
}

function addSubtitle(s, text, opts = {}) {
  s.addText(text, {
    x: L.mx, y: opts.y || L.subY,
    w: L.cw, h: opts.h || L.subH,
    fontSize: L.subSize, fontFace: F.body,
    color: C.midGray, margin: 0,
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
  addFooter(s, text, { color: C.accent, bold: true, italic: false });
}

function accentLine(s, y) {
  s.addShape(pres.shapes.RECTANGLE, {
    x: L.mx, y, w: 1.0, h: 0.04,
    fill: { color: C.accent },
  });
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
    color: C.midGray, align: "center", valign: "middle", margin: 0,
  });
}

function addCard(s, x, y, w, h, opts = {}) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: opts.radius != null ? opts.radius : 0.1,
    fill: { color: opts.bg || C.parchment },
    line: opts.border ? { color: C.hairline, width: 1 } : { type: "none" },
  });
  if (opts.leftAccent) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: 0.06, h, rectRadius: 0.03,
      fill: { color: opts.leftAccent },
    });
  }
}

// ══════════════════════════════════════════════════════
//  PART 1: LECTURE SLIDES
// ══════════════════════════════════════════════════════


// ══════════════════════════════════════════════════════
// v05 — 실무 AI 적용 사례 (Shopping Mate / 커머스 Agent)
// 빌더·디자인 시스템은 상단(generate.js 공유)에서 상속.
// ══════════════════════════════════════════════════════
const path = require("path");
const fs = require("fs");
const REF = (f) => path.join(__dirname, "..", "references", f);
const PROTO = (f) => path.join(__dirname, "..", "..", "workshop", "shopping-mate", "prototype", f);
const ANALYSIS = (f) => path.join(__dirname, "..", "..", "analysis", "outputs", f);
const dataUri = (f) => "data:image/png;base64," + fs.readFileSync(f).toString("base64");
const APPLE = { blue: "0066CC", focus: "0071E3", sky: "2997FF", ink: "1D1D1F", parchment: "F5F5F7", tile: "1D1D1F", pearl: "FAFAFC" };

function partDivider(kicker, title, subtitle, steps) {
  const s = darkSlide();
  s.addShape(pres.shapes.RECTANGLE, { x: L.mx, y: 1.5, w: 0.6, h: 0.045, fill: { color: C.accent } });
  s.addText(kicker, { x: L.mx, y: 1.66, w: L.cw, h: 0.3, fontSize: 13, fontFace: F.bold, color: C.sky, charSpacing: 3, margin: 0 });
  s.addText(title, { x: L.mx, y: 2.05, w: L.cw, h: 0.8, fontSize: 30, fontFace: F.title, color: C.white, charSpacing: -0.5, margin: 0, lineSpacingMultiple: 1.1 });
  if (subtitle) s.addText(subtitle, { x: L.mx, y: 2.95, w: L.cw, h: 0.5, fontSize: 13, fontFace: F.body, color: C.midGray, margin: 0, lineSpacingMultiple: 1.3 });
  return s;
}

// ─── SLIDE 1: COVER ───
{
  const s = darkSlide();
  s.addShape(pres.shapes.RECTANGLE, { x: L.mx, y: 1.18, w: 0.6, h: 0.045, fill: { color: C.accent } });
  s.addText("FASTCAMPUS  ·  AI 실무 특강", { x: L.mx, y: 1.32, w: L.cw, h: 0.3, fontSize: 12, fontFace: F.bold, color: C.sky, charSpacing: 2, margin: 0 });
  s.addText("실무 AI 적용 사례", { x: L.mx, y: 1.8, w: L.cw, h: 1.0, fontSize: 46, fontFace: F.title, color: C.white, charSpacing: -1, margin: 0 });
  s.addText("커머스 Shopping Agent를 AI로 — 지표 분석부터 PRD·와이어프레임·프로토타입·데모 영상까지", {
    x: L.mx, y: 2.95, w: L.cw, h: 0.5, fontSize: 13.5, fontFace: F.body, color: C.midGray, margin: 0, lineSpacingMultiple: 1.3 });
  s.addShape(pres.shapes.RECTANGLE, { x: L.mx, y: 4.42, w: L.cw, h: 0.008, fill: { color: "3A3A3C" } });
  s.addText([
    { text: "FastCampus", options: { color: C.white, fontFace: F.bold } },
    { text: "   ·   10주 과정 수강생 대상 실무 특강", options: { color: C.sky } },
  ], { x: L.mx, y: 4.55, w: L.cw, h: 0.3, fontSize: 12.5, fontFace: F.body, margin: 0 });
  s.addText([
    { text: "차성재", options: { color: C.white, fontFace: F.bold } },
    { text: "  —  패션 플랫폼 M사 Agentic AI PM · 시립대·아주대 AI부문 겸임교수", options: { color: C.midGray } },
  ], { x: L.mx, y: 4.86, w: L.cw, h: 0.3, fontSize: 12, fontFace: F.body, margin: 0 });
}

// ─── SLIDE 2: AGENDA ───
{
  const s = lightSlide();
  addTitle(s, "오늘의 여정 — 분석에서 구현까지");
  addSubtitle(s, "내 산업(커머스)의 지표·Agent 관점으로 신규 서비스를 직접 만들어본다.");
  const parts = [
    ["PART 1", "커머스 실무의 언어", "핵심 지표 → 유저 임팩트로 번역하는 노하우", C.accent],
    ["PART 2", "Agent 벤치마크 + 지면 전략", "Alexa·Clova 비교 · Home/SRP/PLP/PDP 매트릭스", APPLE.blue],
    ["PART 3", "데이터로 검증", "mock 데이터로 코호트·퍼널·인사이트 분석", APPLE.sky],
    ["PART 4", "설계 → 구현 (Claude Code)", "PRD 작성 노하우 → 와이어프레임 → 프로토타입 → 데모", "1F883D"],
    ["PART 5", "정렬 — 한 PRD, 세 청중", "디자이너·개발자·리더십을 이해시키는 법", "8B5CF6"],
  ];
  parts.forEach((p, i) => {
    const y = 1.62 + i * 0.62;
    addCard(s, L.mx, y, L.cw, 0.52, { bg: C.offWhite, leftAccent: p[3] });
    s.addText(p[0], { x: L.mx + 0.18, y, w: 1.3, h: 0.52, fontSize: 12, fontFace: F.title, color: p[3], valign: "middle", margin: 0 });
    s.addText(p[1], { x: 2.0, y, w: 3.5, h: 0.52, fontSize: 13.5, fontFace: F.title, color: C.ink, valign: "middle", margin: 0 });
    s.addText(p[2], { x: 5.4, y, w: 4.0, h: 0.52, fontSize: 10.5, fontFace: F.body, color: C.midGray, valign: "middle", margin: 0 });
  });
  addFooter(s, "도구: Claude Desktop의 Claude Code  ·  데모 제품: Shopping Mate (독립 신규 Shopping Agent 앱)");
}

// ─── SLIDE 3: AUDIENCE / CONTEXT ───
{
  const s = lightSlide();
  addTitle(s, "이번 특강은 — 실무 적용 단계");
  addSubtitle(s, "개념이 아니라, 내 도메인에 바로 옮길 수 있는 워크플로우를 함께 만든다.");
  // left card: who
  addCard(s, L.mx, 1.7, 4.2, 2.6, { bg: C.offWhite });
  s.addText("대상", { x: L.mx + 0.2, y: 1.85, w: 3.8, h: 0.3, fontSize: 12, fontFace: F.bold, color: C.midGray, margin: 0 });
  s.addText("10주 과정을 거의 다 소화한\n실제 참여 수강생", { x: L.mx + 0.2, y: 2.2, w: 3.8, h: 0.7, fontSize: 17, fontFace: F.title, color: C.ink, margin: 0, lineSpacingMultiple: 1.15 });
  s.addText([
    { text: "트랙  ", options: { fontFace: F.bold, color: C.midGray } },
    { text: "마케팅/콘텐츠 · 로컬커머스/O2O · 문화/콘텐츠 · 에듀테크", options: { color: C.ink } },
  ], { x: L.mx + 0.2, y: 3.2, w: 3.8, h: 0.9, fontSize: 12, fontFace: F.body, margin: 0, lineSpacingMultiple: 1.4, valign: "top" });
  // right card: shift
  addCard(s, 5.1, 1.7, 4.2, 2.6, { bg: C.warmBg, leftAccent: C.accent });
  s.addText("이번 강의의 전환", { x: 5.3, y: 1.85, w: 3.8, h: 0.3, fontSize: 12, fontFace: F.bold, color: C.warmText, margin: 0 });
  s.addText([
    { text: "✓ 개념 소개 → ", options: { color: C.ink } },
    { text: "실무 워크플로우 시연 + 직접 제작\n", options: { color: C.accent, fontFace: F.bold } },
    { text: "✓ 점심 메이트 → ", options: { color: C.ink } },
    { text: "Shopping Mate (커머스 Agent)\n", options: { color: C.accent, fontFace: F.bold } },
    { text: "✓ 만들기 → ", options: { color: C.ink } },
    { text: "지표 분석으로 ‘왜·무엇을’ 먼저 정의\n", options: { color: C.accent, fontFace: F.bold } },
    { text: "✓ 도구 → ", options: { color: C.ink } },
    { text: "Claude Desktop의 Claude Code 중심", options: { color: C.accent, fontFace: F.bold } },
  ], { x: 5.3, y: 2.25, w: 3.85, h: 1.95, fontSize: 12.5, fontFace: F.body, margin: 0, lineSpacingMultiple: 1.5, valign: "top" });
  addFooter(s, "데모는 커머스(Shopping Mate)로 통일하되, 마지막에 트랙별 응용 가이드로 내 도메인에 연결한다.");
}

// ─── SLIDE: 오늘의 핵심 / 안 다루는 것 (기대치 정렬) ───
{
  const s = lightSlide();
  addTitle(s, "오늘의 핵심 — 하나를 끝까지");
  addSubtitle(s, "마지막 수업이니, 많이 보여주기보다 ‘당신이 다시 할 수 있게’에 집중합니다.");
  // 깊게 다룰 것 (Core)
  addCard(s, L.mx, 1.7, 4.2, 2.55, { bg: C.warmBg, leftAccent: C.accent });
  s.addText("✓ 깊게 (Core)", { x: L.mx + 0.18, y: 1.84, w: 3.8, h: 0.32, fontSize: 13, fontFace: F.title, color: C.warmText, margin: 0 });
  s.addText([
    { text: "디자인 토큰 → 지면 전략 → 데이터 근거\n", options: { color: C.ink } },
    { text: "→ PRD → 시안 → 프로토타입·데모 → 정렬\n\n", options: { color: C.ink } },
    { text: "하나의 사례(Shopping Mate)를 끊김 없이.\n", options: { color: C.accent, fontFace: F.bold } },
    { text: "도구는 Claude Code 하나로 통일.", options: { color: C.midGray } },
  ], { x: L.mx + 0.18, y: 2.24, w: 3.85, h: 1.9, fontSize: 12.5, fontFace: F.body, margin: 0, lineSpacingMultiple: 1.45, valign: "top" });
  // 가져갈 것 (핸드아웃)
  addCard(s, 5.1, 1.7, 4.2, 2.55, { bg: C.offWhite });
  s.addText("○ 가져가기 (핸드아웃)", { x: 5.28, y: 1.84, w: 3.8, h: 0.32, fontSize: 13, fontFace: F.title, color: C.midGray, margin: 0 });
  s.addText([
    { text: "· 벤치마크 심화(Alexa/Clova 디테일)\n", options: {} },
    { text: "· 리서치 정량·메트릭 출처\n", options: {} },
    { text: "· Confluence storage format 변환\n", options: {} },
    { text: "· 트랙별 응용 전체\n\n", options: {} },
    { text: "→ 덱(34장)·플레이북에 다 있습니다.\n", options: { color: C.ink, fontFace: F.bold } },
    { text: "필요할 때 꺼내 쓰세요.", options: { color: C.midGray } },
  ], { x: 5.28, y: 2.24, w: 3.85, h: 1.9, fontSize: 12, fontFace: F.body, color: C.darkGray, margin: 0, lineSpacingMultiple: 1.4, valign: "top" });
  addAccentFooter(s, "‘무엇을 안 다루는지’ 먼저 말하는 게 전문가입니다. 적게 가르치고, 확실히 가져가게.");
}

// ─── PART 1 ───
partDivider("PART 1", "커머스 실무의 언어", "지표를 ‘유저가 느끼는 가치’로 번역하는 노하우 — 분석의 출발점", null);

// ─── SLIDE 5: 커머스 핵심 지표 지도 ───
{
  const s = lightSlide();
  addTitle(s, "커머스 핵심 지표 지도");
  addSubtitle(s, "PM·마케터가 매일 보는 지표 — 무엇을 측정하고 왜 보는가.");
  const tbl = [
    [
      { text: "지표", options: { fill: { color: C.ink }, color: C.white, bold: true, fontFace: F.bold } },
      { text: "정의", options: { fill: { color: C.ink }, color: C.white, bold: true, fontFace: F.bold } },
      { text: "왜 보는가", options: { fill: { color: C.ink }, color: C.white, bold: true, fontFace: F.bold } },
    ],
    [{ text: "GMV", options: { bold: true, fontFace: F.bold } }, "총 거래액", "사업 규모·성장"],
    [{ text: "전환율 (CVR)", options: { bold: true, fontFace: F.bold } }, "방문 대비 구매 비율", "퍼널 효율의 핵심"],
    [{ text: "AOV (객단가)", options: { bold: true, fontFace: F.bold } }, "주문당 평균 금액", "수익성·번들/업셀"],
    [{ text: "재구매율·리텐션", options: { bold: true, fontFace: F.bold } }, "다시 사는 비율", "LTV·정착(코호트)"],
    [{ text: "장바구니 이탈률", options: { bold: true, fontFace: F.bold } }, "담고 안 사는 비율", "결제 마찰 진단"],
    [{ text: "CAC · LTV", options: { bold: true, fontFace: F.bold } }, "획득 비용 · 생애 가치", "성장의 단위 경제성"],
  ];
  s.addTable(tbl, { x: 0.7, y: 1.62, w: 8.6, colW: [2.0, 3.3, 3.3], fontSize: 12.5, fontFace: F.body,
    border: { pt: 0.5, color: C.hairline }, rowH: [0.42, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4], valign: "middle" });
  addAccentFooter(s, "지표는 ‘숫자’가 아니라 ‘질문’이다 — 이 숫자가 흔들리면 유저가 무엇을 못 느끼는가?");
}

// ─── SLIDE 6: 지표 → 유저 임팩트 번역 ───
{
  const s = lightSlide();
  addTitle(s, "지표 → 유저 임팩트로 번역하기");
  addSubtitle(s, "숫자 한 줄을 ‘유저가 느끼는 가치’ 한 줄로 바꾸는 연습.");
  const rows = [
    ["전환율 ↑", "필요한 걸 빠르게 찾아 결정했다", C.accent],
    ["결정 시간 ↓", "고민·비교 피로가 줄었다", APPLE.blue],
    ["장바구니 이탈 ↓", "‘왜 사야 하는지’ 근거가 분명했다", "1F883D"],
    ["재구매율 ↑", "지난 좋은 경험이 다음 구매로 이어졌다", "8B5CF6"],
  ];
  rows.forEach((r, i) => {
    const y = 1.72 + i * 0.62;
    addCard(s, L.mx, y, L.cw, 0.52, { bg: C.offWhite, leftAccent: r[2] });
    s.addText(r[0], { x: L.mx + 0.2, y, w: 2.4, h: 0.52, fontSize: 14, fontFace: F.title, color: r[2], valign: "middle", margin: 0 });
    s.addText("→", { x: 3.0, y, w: 0.4, h: 0.52, fontSize: 14, color: C.midGray, align: "center", valign: "middle", margin: 0 });
    s.addText(r[1], { x: 3.5, y, w: 5.7, h: 0.52, fontSize: 13.5, fontFace: F.body, color: C.ink, valign: "middle", margin: 0 });
  });
  addFooter(s, "PM의 일: 지표 목표를 유저 가치 가설로 번역 → 그 가설을 검증할 기능을 설계한다.");
}

// ─── SLIDE 7: 무대 — Shopping Agent 관점 ───
{
  const s = lightSlide();
  addTitle(s, "무대: Shopping Agent라는 관점");
  addSubtitle(s, "‘검색·리스트’가 아니라 ‘의도 → 결정 근거’로 바꾸는 대화형 에이전트.");
  // left: AS-IS, right: TO-BE
  addCard(s, L.mx, 1.7, 4.2, 2.55, { bg: C.offWhite });
  s.addText("AS-IS — 검색·스크롤", { x: L.mx + 0.18, y: 1.85, w: 3.8, h: 0.35, fontSize: 13, fontFace: F.title, color: C.midGray, margin: 0 });
  s.addText("검색 → 수십 개 비교 → 리뷰 탐색 →\n가격비교 → 보류/이탈\n\n결정 근거가 머릿속에만 남고\n다음 세션에 휘발", { x: L.mx + 0.18, y: 2.3, w: 3.85, h: 1.8, fontSize: 13, fontFace: F.body, color: C.darkGray, margin: 0, lineSpacingMultiple: 1.4, valign: "top" });
  addCard(s, 5.1, 1.7, 4.2, 2.55, { bg: C.warmBg, leftAccent: C.accent });
  s.addText("TO-BE — Shopping Mate", { x: 5.28, y: 1.85, w: 3.8, h: 0.35, fontSize: 13, fontFace: F.title, color: C.warmText, margin: 0 });
  s.addText([
    { text: "의도 입력 → ", options: { color: C.ink } }, { text: "후보 3개로 압축\n", options: { color: C.accent, fontFace: F.bold } },
    { text: "각 후보에 ", options: { color: C.ink } }, { text: "결정 근거(가격·리뷰요약·배송)\n", options: { color: C.accent, fontFace: F.bold } },
    { text: "비교 → 담기, ", options: { color: C.ink } }, { text: "근거 저장 → 재방문 복원", options: { color: C.accent, fontFace: F.bold } },
  ], { x: 5.28, y: 2.3, w: 3.85, h: 1.8, fontSize: 13, fontFace: F.body, margin: 0, lineSpacingMultiple: 1.5, valign: "top" });
  addAccentFooter(s, "Shopping Mate = 독립 신규 Shopping Agent 앱 (쿠팡·Alexa·Clova는 벤치마크 레퍼런스).");
}

// ─── PART 2 ───
partDivider("PART 2", "Agent 벤치마크 분석", "Amazon Alexa · Naver Clova · 리서치 기반 메트릭으로 비교 정의", null);

// ─── SLIDE 9: Alexa ───
{
  const s = lightSlide();
  addTitle(s, "벤치마크 ① Amazon Alexa for Shopping");
  addSubtitle(s, "음성 대화형 쇼핑 — 재주문·추천 중심.");
  const pts = [
    ["입력/인터랙션", "음성 대화 (핸즈프리). 텍스트 보조."],
    ["강점", "재주문·정기구매·간편 추가에 최적 (반복 구매)."],
    ["약점", "음성 한계로 비교·결정 근거 제시가 약함."],
    ["핵심 메트릭(추정)", "재주문율 · 음성 주문 성공률 · 활성 사용 빈도."],
  ];
  pts.forEach((p, i) => {
    const y = 1.7 + i * 0.66;
    addCard(s, L.mx, y, L.cw, 0.56, { bg: C.offWhite });
    s.addText(p[0], { x: L.mx + 0.18, y, w: 2.6, h: 0.56, fontSize: 13, fontFace: F.title, color: C.ink, valign: "middle", margin: 0 });
    s.addText(p[1], { x: 3.4, y, w: 5.8, h: 0.56, fontSize: 12.5, fontFace: F.body, color: C.midGray, valign: "middle", margin: 0 });
  });
  addFooter(s, "출처: 공개 자료·리서치 종합 (AI 구조화). 실제 수치는 강의 시 리서치 캡처로 보강.");
}

// ─── SLIDE 10: Clova ───
{
  const s = lightSlide();
  addTitle(s, "벤치마크 ② Naver Clova Store Shopping Agent");
  addSubtitle(s, "한국 커머스 맥락 — 스토어 연계 추천.");
  const pts = [
    ["입력/인터랙션", "음성/텍스트 + 네이버 스토어 생태계."],
    ["강점", "한국 커머스 맥락·스토어 상품·결제 연동."],
    ["약점", "에이전트 ‘결정 근거 요약’의 일관성은 보통."],
    ["핵심 메트릭(추정)", "스토어 전환 · 추천 클릭률 · 연동 구매."],
  ];
  pts.forEach((p, i) => {
    const y = 1.7 + i * 0.66;
    addCard(s, L.mx, y, L.cw, 0.56, { bg: C.offWhite });
    s.addText(p[0], { x: L.mx + 0.18, y, w: 2.6, h: 0.56, fontSize: 13, fontFace: F.title, color: C.ink, valign: "middle", margin: 0 });
    s.addText(p[1], { x: 3.4, y, w: 5.8, h: 0.56, fontSize: 12.5, fontFace: F.body, color: C.midGray, valign: "middle", margin: 0 });
  });
  addFooter(s, "출처: 공개 자료·리서치 종합 (AI 구조화). 실제 수치는 강의 시 리서치 캡처로 보강.");
}

// ─── SLIDE 11: 벤치마크 비교표 ───
{
  const s = lightSlide();
  addTitle(s, "벤치마크 비교표 — 기능 × 메트릭");
  addSubtitle(s, "Alexa vs Clova vs Shopping Mate(목표) — 차별점을 표로 명확히 정의.");
  const tbl = [
    [
      { text: "관점", options: { fill: { color: C.ink }, color: C.white, bold: true, fontFace: F.bold } },
      { text: "Alexa (Shopping)", options: { fill: { color: C.ink }, color: C.white, bold: true, fontFace: F.bold } },
      { text: "Clova Store", options: { fill: { color: C.ink }, color: C.white, bold: true, fontFace: F.bold } },
      { text: "Shopping Mate (목표)", options: { fill: { color: C.accent }, color: C.white, bold: true, fontFace: F.bold } },
    ],
    [{ text: "입력", options: { bold: true, fontFace: F.bold } }, "음성", "음성/텍스트", { text: "텍스트 의도+조건", options: { color: C.accent, bold: true } }],
    [{ text: "추천", options: { bold: true, fontFace: F.bold } }, "재주문·추천", "스토어 추천", { text: "의도기반 후보 3+근거", options: { color: C.accent, bold: true } }],
    [{ text: "결정 근거", options: { bold: true, fontFace: F.bold } }, "약함", "보통", { text: "강함(가격·리뷰·배송)", options: { color: C.accent, bold: true } }],
    [{ text: "한국 맥락", options: { bold: true, fontFace: F.bold } }, "낮음", "높음", { text: "높음(로켓·가격비교)", options: { color: C.accent, bold: true } }],
    [{ text: "핵심 메트릭", options: { bold: true, fontFace: F.bold } }, "재주문율", "스토어 전환", { text: "상세→장바구니 CVR·결정시간", options: { color: C.accent, bold: true } }],
  ];
  s.addTable(tbl, { x: 0.5, y: 1.62, w: 9.0, colW: [1.5, 2.1, 1.9, 3.5], fontSize: 11.5, fontFace: F.body,
    border: { pt: 0.5, color: C.hairline }, rowH: [0.46, 0.46, 0.46, 0.46, 0.46, 0.46], valign: "middle" });
  addAccentFooter(s, "차별점 = ‘결정 근거 투명성 + 한국 커머스 맥락’ → 측정은 상세→장바구니 CVR·결정 시간으로.");
}

// ─── SLIDE 12: 리서치 기반 메트릭 가설 ───
{
  const s = lightSlide();
  addTitle(s, "리서치 기반 메트릭 가설");
  addSubtitle(s, "최신 리서치(구글 Deep Research)를 근거로 ‘Agent가 바라볼 메트릭’을 정의.");
  const cols = [
    ["탐색 효율", "후보 압축률 · 결정 시간", "정보 과부하 ↓", C.accent],
    ["결정 품질", "추천 채택률 · 비교 사용률", "근거 기반 결정 ↑", APPLE.blue],
    ["전환·유지", "상세→장바구니 CVR · 재구매", "행동·정착으로 연결", "1F883D"],
  ];
  cols.forEach((c, i) => {
    const x = L.mx + i * 2.95;
    addCard(s, x, 1.72, 2.75, 2.0, { bg: C.offWhite, leftAccent: c[3] });
    s.addText(c[0], { x: x + 0.16, y: 1.86, w: 2.45, h: 0.4, fontSize: 15, fontFace: F.title, color: c[3], margin: 0 });
    s.addText(c[1], { x: x + 0.16, y: 2.34, w: 2.45, h: 0.7, fontSize: 12, fontFace: F.body, color: C.ink, margin: 0, lineSpacingMultiple: 1.35 });
    s.addText(c[2], { x: x + 0.16, y: 3.2, w: 2.45, h: 0.4, fontSize: 11, fontFace: F.body, color: C.midGray, margin: 0 });
  });
  addFooter(s, "리서치 원본 캡처는 강의 시 인용 (assets/research/). 본 도표는 가설 정리를 AI로 시각화한 것.");
}

// ─── SLIDE: 지면별 Agent 매트릭스 ───
{
  const s = lightSlide();
  addTitle(s, "지면별 Agent 활용 매트릭스");
  addSubtitle(s, "어느 지면에 무엇을 — 다 넣지 말고, 이탈·임팩트 큰 지면부터 1차 범위.");
  const tbl = [
    [
      { text: "지면", options: { fill: { color: C.ink }, color: C.white, bold: true, fontFace: F.bold } },
      { text: "Agent 활용 가능성", options: { fill: { color: C.ink }, color: C.white, bold: true, fontFace: F.bold } },
      { text: "핵심 메트릭", options: { fill: { color: C.ink }, color: C.white, bold: true, fontFace: F.bold } },
      { text: "범위", options: { fill: { color: C.ink }, color: C.white, bold: true, fontFace: F.bold } },
    ],
    [{ text: "Home", options: { bold: true, fontFace: F.bold } }, "맥락 기반 선제 제안 (가격변동·지난 탐색)", "홈→탐색 전환·알림 CTR", "v2"],
    [{ text: "SRP 검색", options: { bold: true, fontFace: F.bold } }, "모호 질의 의도 보정·조건 제안·순위 근거", "검색→클릭 CTR·0건율", { text: "1차", options: { color: C.accent, bold: true, fontFace: F.bold } }],
    [{ text: "PLP 목록", options: { bold: true, fontFace: F.bold } }, "후보 N→3 압축·나란히 비교", "목록→상세·비교 사용률", { text: "1차", options: { color: C.accent, bold: true, fontFace: F.bold } }],
    [{ text: "PDP 상세", options: { bold: true, fontFace: F.bold } }, "리뷰 요약·조건 적합 이유·대안", "상세→장바구니 CVR", { text: "1차", options: { color: C.accent, bold: true, fontFace: F.bold } }],
    [{ text: "Cart·Checkout", options: { bold: true, fontFace: F.bold } }, "결정 재확인·번들·이탈 복구·마찰 제거", "결제 완료율·AOV", "v2"],
    [{ text: "Post 구매후", options: { bold: true, fontFace: F.bold } }, "재구매 리마인드·CS 자동응대", "재구매율·자동해결률", "v2"],
  ];
  s.addTable(tbl, { x: 0.5, y: 1.62, w: 9.0, colW: [1.7, 4.0, 2.4, 0.9], fontSize: 11, fontFace: F.body,
    border: { pt: 0.5, color: C.hairline }, rowH: [0.42, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4], valign: "middle" });
  addAccentFooter(s, "Shopping Mate 1차 범위 = SRP·PLP·PDP. ‘다 하기’가 아니라 ‘이탈 큰 지면부터’가 실무.");
}

// ─── SLIDE: 지면별 시안 (코드 기반) ───
{
  const s = lightSlide();
  addTitle(s, "지면별 시안 — 코드 기반 (Figma 아님)");
  addSubtitle(s, "디자인 시스템 토큰 기반 코드 시안. 각 지면의 파란 박스가 Agent 적용 지점.");
  // 프레임 카드(매트)에 담아 슬라이드에 자연스럽게 녹임 + 푸터와 분리
  addCard(s, 2.52, 1.5, 4.96, 2.94, { bg: C.offWhite, border: true });
  s.addImage({ path: REF("sm-surfaces-board.png"), x: 2.64, y: 1.62, w: 4.72, h: 2.74 }); // 4.72/2.74 = 1.722 (원본 2480×1440 정확 비율)
  addFooter(s, "코드: workshop/shopping-mate/wireframes/surfaces.html  ·  Claude Code로 생성·갱신");
}

// ─── PART 3 ───
partDivider("PART 3", "데이터로 검증", "mock 데이터로 코호트·퍼널·인사이트 분석 — 측정 로깅까지", null);

// ─── SLIDE 14: mock 데이터 설계 ───
{
  const s = lightSlide();
  addTitle(s, "mock 데이터 + 측정 로깅 설계");
  addSubtitle(s, "분석을 하려면 ‘무엇을 어디서 기록할지’부터 — 이벤트 로깅이 분석의 입력.");
  addCard(s, L.mx, 1.72, L.cw, 1.0, { bg: C.ink });
  s.addText("이벤트 로그 (User Flow 매핑)", { x: L.mx + 0.2, y: 1.84, w: 8.2, h: 0.3, fontSize: 12, fontFace: F.bold, color: C.sky, margin: 0 });
  s.addText("agent_open → intent_submit → candidates_view → candidate_select → compare_view → add_to_cart → checkout → repurchase", {
    x: L.mx + 0.2, y: 2.2, w: 8.2, h: 0.45, fontSize: 12.5, fontFace: F.code, color: C.white, margin: 0, lineSpacingMultiple: 1.3 });
  const uses = [
    ["코호트 분석", "가입 주차별 재구매 리텐션", C.accent],
    ["퍼널 분석", "open→checkout 단계별 이탈", "1F883D"],
    ["인사이트", "최대 이탈 구간 → 개선 우선순위", "8B5CF6"],
  ];
  uses.forEach((u, i) => {
    const x = L.mx + i * 2.95;
    addCard(s, x, 3.0, 2.75, 1.1, { bg: C.offWhite, leftAccent: u[2] });
    s.addText(u[0], { x: x + 0.16, y: 3.14, w: 2.45, h: 0.35, fontSize: 13, fontFace: F.title, color: u[2], margin: 0 });
    s.addText(u[1], { x: x + 0.16, y: 3.52, w: 2.45, h: 0.5, fontSize: 11.5, fontFace: F.body, color: C.midGray, margin: 0, lineSpacingMultiple: 1.3 });
  });
  addFooter(s, "mock 데이터셋·노트북은 analysis/ 에 생성 — 강의 중 Claude Code로 함께 분석한다.");
}

// ─── SLIDE 15: 코호트 + 퍼널 (chart image) ───
{
  const s = lightSlide();
  addTitle(s, "코호트 · 퍼널 분석 (AI와 함께)");
  addSubtitle(s, "mock 데이터로 본 재구매 리텐션과 구매 퍼널 이탈 구간.");
  // 원본 비율(2480×1120 = 2.214) 유지 + 프레임 카드
  addCard(s, 1.72, 1.6, 6.56, 3.04, { bg: C.white, border: true });
  s.addImage({ path: ANALYSIS("sm-cohort-funnel.png"), x: 1.85, y: 1.72, w: 6.30, h: 2.846 }); // 6.30/2.846 = 2.214 (무왜곡)
  addAccentFooter(s, "최대 이탈 = 비교/상세 → 장바구니 구간. 결정 근거 카드를 상세 상단 고정 → A/B 가설.");
}

// ─── SLIDE 16: 인사이트 → 액션 ───
{
  const s = lightSlide();
  addTitle(s, "인사이트 → 액션 (개선 우선순위)");
  addSubtitle(s, "분석은 ‘발견’이 아니라 ‘다음에 무엇을 만들지’로 끝나야 한다.");
  const rows = [
    ["비교/상세 이탈 −17%", "결정 근거 카드를 상세 상단 고정", "P0", C.accent],
    ["W1 재구매 42→51%", "구매 근거 저장 → 재방문 리마인드", "P1", APPLE.blue],
    ["결정 시간 6.5분", "후보 3개 압축 + 1줄 추천 이유", "P0", "1F883D"],
  ];
  rows.forEach((r, i) => {
    const y = 1.72 + i * 0.74;
    addCard(s, L.mx, y, L.cw, 0.62, { bg: C.offWhite });
    s.addText(r[0], { x: L.mx + 0.18, y, w: 3.4, h: 0.62, fontSize: 13, fontFace: F.title, color: C.ink, valign: "middle", margin: 0 });
    s.addText("→  " + r[1], { x: 4.3, y, w: 4.2, h: 0.62, fontSize: 12.5, fontFace: F.body, color: C.midGray, valign: "middle", margin: 0 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 8.65, y: y + 0.16, w: 0.5, h: 0.3, rectRadius: 0.05, fill: { color: r[3] } });
    s.addText(r[2], { x: 8.65, y: y + 0.16, w: 0.5, h: 0.3, fontSize: 10, fontFace: F.title, color: C.white, align: "center", valign: "middle", margin: 0 });
  });
  addFooter(s, "이 우선순위가 다음 단계 PRD의 핵심 스코프가 된다.");
}

// ─── PART 4 ───
partDivider("PART 4", "설계 → 구현", "디자인 토큰 → PRD → 와이어프레임 → 프로토타입 → 데모 (with Claude Code)", null);

// ─── SLIDE: 디자인 토큰 만들기 (웹 → 다운로드 → Claude Code) ───
{
  const s = lightSlide();
  addTitle(s, "먼저, 디자인 토큰부터 — 웹 claude-design");
  addSubtitle(s, "코딩 없이 웹에서 디자인 토큰 폴더를 만들어 다운로드 → Claude Code로 코드화.");
  // left: getdesign capture
  s.addImage({ path: REF("getdesignmd-download-highlight.png"), x: 0.7, y: 1.62, w: 4.6, h: 2.88 });
  s.addText("getdesign.md — Download DESIGN.md", { x: 0.7, y: 4.52, w: 4.6, h: 0.24, fontSize: 9, fontFace: F.body, color: C.midGray, align: "center", italic: true, margin: 0 });
  // right: 3-step flow
  const steps = [
    ["① 웹에서 고르기", "getdesign.md에서 원하는 디자인 선택 (예: apple)", C.accent],
    ["② 다운로드", "Download DESIGN.md / 토큰 폴더 → 작업 폴더에", APPLE.blue],
    ["③ Claude Code", "“이 DESIGN.md를 tokens(json/css/js)로 코드화·검증” ", "1F883D"],
  ];
  steps.forEach((st, i) => {
    const y = 1.66 + i * 0.92;
    addCard(s, 5.5, y, 3.8, 0.8, { bg: C.offWhite, leftAccent: st[2] });
    s.addText(st[0], { x: 5.68, y: y + 0.08, w: 3.5, h: 0.32, fontSize: 13, fontFace: F.title, color: st[2], margin: 0 });
    s.addText(st[1], { x: 5.68, y: y + 0.42, w: 3.5, h: 0.34, fontSize: 11, fontFace: F.body, color: C.midGray, margin: 0, lineSpacingMultiple: 1.2 });
  });
  addFooter(s, "이게 모든 시안의 기반. 준비된 예시: docs/design-system/ (Apple 토큰, 그대로 재사용 가능).");
}

// ─── SLIDE 18: PRD 요약 ───
{
  const s = lightSlide();
  addTitle(s, "Shopping Mate PRD — 핵심 요약");
  addSubtitle(s, "분석으로 정한 ‘왜·무엇을’을 PRD로 고정 (prd/PRD-shopping-mate.md).");
  const items = [
    ["문제", "탐색 과부하 · 결정 근거 부족 · 재구매 약화", C.accent],
    ["솔루션", "의도 → 후보 3 + 결정 근거 → 비교 → 담기", APPLE.blue],
    ["핵심 지표", "상세→장바구니 CVR 22→30% · 결정 6.5→2분", "1F883D"],
    ["Agent 정책", "근거 없는 단정 금지 · 가격/재고 불확실 명시", "8B5CF6"],
  ];
  items.forEach((it, i) => {
    const y = 1.72 + i * 0.62;
    addCard(s, L.mx, y, L.cw, 0.52, { bg: C.offWhite, leftAccent: it[2] });
    s.addText(it[0], { x: L.mx + 0.2, y, w: 1.7, h: 0.52, fontSize: 13, fontFace: F.title, color: it[2], valign: "middle", margin: 0 });
    s.addText(it[1], { x: 2.4, y, w: 6.8, h: 0.52, fontSize: 13, fontFace: F.body, color: C.ink, valign: "middle", margin: 0 });
  });
  addFooter(s, "PRD는 Claude Desktop으로 작성 — 분석 산출물(지표·인사이트)을 그대로 입력으로.");
}

// ─── SLIDE: Agent 정책 & 가드레일 ───
{
  const s = lightSlide();
  addTitle(s, "Agent 정책 & 가드레일");
  addSubtitle(s, "에이전트 제품은 ‘무엇을 하지 말까’가 신뢰를 만든다.");
  const rows = [
    ["근거 없는 단정 금지", "추천 이유는 가격·리뷰·배송 등 ‘근거’와 함께", C.accent],
    ["불확실성 명시", "가격·재고가 불확실하면 단정 대신 ‘확인 필요’ 표기", APPLE.blue],
    ["과장·강요 금지", "‘무조건 사세요’ 금지 — 선택은 사용자에게", "1F883D"],
    ["폴백", "후보 부족 시 조건 완화 재시도 → 인기 카테고리", "8B5CF6"],
  ];
  rows.forEach((r, i) => {
    const y = 1.72 + i * 0.66;
    addCard(s, L.mx, y, L.cw, 0.56, { bg: C.offWhite, leftAccent: r[2] });
    s.addText(r[0], { x: L.mx + 0.2, y, w: 3.0, h: 0.56, fontSize: 13.5, fontFace: F.title, color: C.ink, valign: "middle", margin: 0 });
    s.addText(r[1], { x: 3.7, y, w: 5.5, h: 0.56, fontSize: 12.5, fontFace: F.body, color: C.midGray, valign: "middle", margin: 0 });
  });
  addFooter(s, "가드레일을 PRD §정책에 명시 → 프롬프트·QA의 기준이 된다.");
}

// ─── SLIDE: PRD 작성 노하우 ① ───
{
  const s = lightSlide();
  addTitle(s, "PRD 작성 노하우 ① — 읽히는 문서");
  addSubtitle(s, "두괄식 · 중복 제거 · 표 양식 — 세 가지만 지켜도 문서가 바뀐다.");
  const cards = [
    ["두괄식 (BLUF)", "결론부터. 모든 섹션을 결론 한 줄로 시작.\n‘분석 끝에 X’ → ‘X 하자. 이유는…’", C.accent],
    ["중복 제거", "같은 사실은 한 곳(SSOT)만. 다시 읽기 패스로\n반복 통합. 표↔본문 중복이면 본문은 해석만.", "1F883D"],
    ["표 양식", "비교/정의/매핑은 표로. 첫 열=기준,\n끝 열=액션/근거. 빈 셀 금지(— 표기).", APPLE.blue],
  ];
  cards.forEach((c, i) => {
    const x = L.mx + i * 2.95;
    addCard(s, x, 1.72, 2.75, 2.4, { bg: C.offWhite, leftAccent: c[2] });
    s.addText(c[0], { x: x + 0.16, y: 1.88, w: 2.45, h: 0.4, fontSize: 14.5, fontFace: F.title, color: c[2], margin: 0 });
    s.addText(c[1], { x: x + 0.16, y: 2.36, w: 2.45, h: 1.6, fontSize: 11.5, fontFace: F.body, color: C.ink, margin: 0, lineSpacingMultiple: 1.4, valign: "top" });
  });
  addAccentFooter(s, "다시 읽기 패스: 같은 단어·수치가 3회+ 반복되면 통합 후보. 두괄식 + 중복 0 = 신뢰.");
}

// ─── SLIDE: Confluence storage format ───
{
  const s = lightSlide();
  addTitle(s, "PRD 작성 노하우 ② — Confluence 양식");
  addSubtitle(s, "발행처가 Confluence면 Storage Format(XHTML)을 고려해 표·패널을 설계.");
  // left: mapping table
  const tbl = [
    [
      { text: "Markdown", options: { fill: { color: C.ink }, color: C.white, bold: true, fontFace: F.bold } },
      { text: "Storage Format", options: { fill: { color: C.ink }, color: C.white, bold: true, fontFace: F.bold } },
    ],
    ["표", "<table><tr><th>…</th></tr>"],
    ["결론/주의 박스", "ac:name=\"info|note|warning\""],
    ["접이식", "ac:name=\"expand\""],
    ["이미지(첨부)", "<ac:image><ri:attachment/>"],
    ["코드", "ac:name=\"code\""],
  ];
  s.addTable(tbl, { x: 0.7, y: 1.62, w: 4.5, colW: [1.7, 2.8], fontSize: 10.5, fontFace: F.code,
    border: { pt: 0.5, color: C.hairline }, rowH: [0.4, 0.4, 0.4, 0.4, 0.4, 0.4], valign: "middle" });
  // right: snippet card
  addCard(s, 5.4, 1.62, 3.9, 2.4, { bg: C.ink });
  s.addText("결론 패널 (info macro)", { x: 5.6, y: 1.74, w: 3.5, h: 0.3, fontSize: 11, fontFace: F.bold, color: C.sky, margin: 0 });
  s.addText('<ac:structured-macro\n   ac:name="info">\n  <ac:rich-text-body>\n   <p><strong>결론:</strong>\n   상세→장바구니 CVR\n   22→30% 목표.</p>\n  </ac:rich-text-body>\n</ac:structured-macro>', {
    x: 5.6, y: 2.1, w: 3.5, h: 1.8, fontSize: 10.5, fontFace: F.code, color: C.white, margin: 0, lineSpacingMultiple: 1.25, valign: "top" });
  addFooter(s, "원본은 GitHub MD(SSOT). 발행 시 변환 → /publish-wiki. 이미지는 페이지 첨부로 참조.");
}

// ─── SLIDE: 시안·영상 첨부 (코드 기반) ───
{
  const s = lightSlide();
  addTitle(s, "PRD 작성 노하우 ③ — 시안·영상 임베드");
  addSubtitle(s, "Figma 대신 디자인 시스템 토큰 기반 코드 시안. 로컬 저장 후 본문에 임베드.");
  const steps = [
    ["① 코드 시안", "HTML(토큰) → PNG 캡처", C.accent],
    ["② 로컬 저장", "prd/assets/ 상대경로", APPLE.blue],
    ["③ 임베드", "![시안](assets/...png)", "1F883D"],
    ["④ 데모 영상", "프로토타입 → MP4 링크", "8B5CF6"],
  ];
  steps.forEach((st, i) => {
    const x = L.mx + i * 2.18;
    addCard(s, x, 1.72, 2.0, 1.5, { bg: C.offWhite, leftAccent: st[2] });
    s.addText(st[0], { x: x + 0.14, y: 1.86, w: 1.75, h: 0.6, fontSize: 13, fontFace: F.title, color: st[2], margin: 0, lineSpacingMultiple: 1.1 });
    s.addText(st[1], { x: x + 0.14, y: 2.5, w: 1.75, h: 0.6, fontSize: 10.5, fontFace: F.code, color: C.midGray, margin: 0, lineSpacingMultiple: 1.25 });
    if (i < 3) s.addText("→", { x: x + 2.0, y: 1.72, w: 0.18, h: 1.5, fontSize: 14, color: C.midGray, align: "center", valign: "middle", margin: 0 });
  });
  addCard(s, L.mx, 3.5, L.cw, 0.62, { bg: C.warmBg });
  s.addText("GitHub·VS Code·Confluence 모두에서 안 깨짐 — 같은 이미지를 강의·문서·발행에 재사용.", {
    x: L.mx + 0.2, y: 3.5, w: L.cw - 0.4, h: 0.62, fontSize: 12, fontFace: F.bold, color: C.warmText, valign: "middle", margin: 0 });
  addFooter(s, "파이프라인: assets/build/shoot.js (시안) · record-proto.js (데모 영상).");
}

// ─── SLIDE: 집중 역할 프롬프트 ───
{
  const s = lightSlide();
  addTitle(s, "집중 역할 — ‘시안·영상 임베드 PRD 작성가’");
  addSubtitle(s, "Claude Code에 그대로 붙여 쓰는 역할 정의 (플레이북 §6).");
  addCard(s, L.mx, 1.62, L.cw, 2.95, { bg: C.ink });
  s.addText([
    { text: "역할: ", options: { color: C.sky, fontFace: F.bold } },
    { text: "너는 ‘시안·영상 임베드 PRD 작성가’다.\n\n", options: { color: C.white } },
    { text: "· 두괄식: ", options: { color: C.sky } }, { text: "모든 섹션 결론 한 줄로 시작, 최상단 ‘결론부터’ 블록\n", options: { color: C.white } },
    { text: "· 중복 제거: ", options: { color: C.sky } }, { text: "같은 사실은 한 곳만, 다시 읽고 통합\n", options: { color: C.white } },
    { text: "· 표 우선: ", options: { color: C.sky } }, { text: "비교/정의/매핑은 표 (첫 열=기준, 끝 열=액션)\n", options: { color: C.white } },
    { text: "· Agent 범위: ", options: { color: C.sky } }, { text: "지면별 매트릭스 → 이탈 큰 1~2개 지면부터\n", options: { color: C.white } },
    { text: "· 시안·영상: ", options: { color: C.sky } }, { text: "코드 시안(토큰) → prd/assets/ 로컬 임베드 + 데모 MP4\n", options: { color: C.white } },
    { text: "· 지표: ", options: { color: C.sky } }, { text: "Baseline→Target→측정(로깅) 3종 세트\n", options: { color: C.white } },
    { text: "· 발행: ", options: { color: C.sky } }, { text: "MD=SSOT, Confluence는 Storage Format으로 변환", options: { color: C.white } },
  ], { x: L.mx + 0.25, y: 1.78, w: L.cw - 0.5, h: 2.7, fontSize: 11.5, fontFace: F.code, margin: 0, lineSpacingMultiple: 1.3, valign: "top" });
  addFooter(s, "전문: docs/guides/prd-authoring-playbook.md");
}

// ─── SLIDE 19: Wireframe ───
{
  const s = lightSlide();
  addTitle(s, "와이어프레임 — User Flow 계층 보드");
  addSubtitle(s, "PRD를 User Flow 단계별로 분리한 모바일 시안 (Figma 스타일).");
  s.addImage({ path: REF("sm-wireframes-board.png"), x: 0.7, y: 1.66, w: 1.46, h: 2.98 });
  s.addText("6 화면 · 4 단계", { x: 0.7, y: 4.66, w: 1.46, h: 0.22, fontSize: 9, fontFace: F.body, color: C.midGray, align: "center", italic: true, margin: 0 });
  const stages = [
    ["1 · 진입 & 의도", "Splash · 대화형 의도 입력 (F-01)"],
    ["2 · AI 후보 생성", "로딩 · 후보 3 + 결정 근거 (F-02·F-05)"],
    ["3 · 비교 & 결정", "차이 하이라이트 비교 → 선택 (F-03)"],
    ["4 · 상세 & 담기", "근거 저장 → 장바구니 (F-04·F-05)"],
  ];
  stages.forEach((st, i) => {
    const y = 1.66 + i * 0.72;
    addCard(s, 2.55, y, 6.05, 0.6, { bg: C.offWhite, leftAccent: C.accent });
    s.addText(st[0], { x: 2.75, y: y + 0.06, w: 5.7, h: 0.3, fontSize: 13, fontFace: F.title, color: C.ink, margin: 0 });
    s.addText(st[1], { x: 2.75, y: y + 0.34, w: 5.7, h: 0.22, fontSize: 10.5, fontFace: F.body, color: C.midGray, margin: 0 });
  });
  addFooter(s, "계층: Flow stage → Screen frame → Component(디자인 시스템) · workshop/shopping-mate/wireframes/");
}

// ─── SLIDE 20: Prototype + Demo video ───
{
  const s = lightSlide();
  addTitle(s, "프로토타입 & 데모 영상");
  addSubtitle(s, "동작 HTML → 클릭 흐름을 하이라이트 적용 MP4로 녹화.");
  s.addImage({ path: REF("sm-candidates.png"), x: 0.8, y: 1.55, w: 1.6, h: 3.06 });
  s.addMedia({ type: "video", path: PROTO("demo-shopping-mate.mp4"), cover: dataUri(REF("sm-compare.png")), x: 2.55, y: 1.55, w: 1.6, h: 3.06 });
  s.addText("▶ 클릭 데모 (MP4, 20초)", { x: 2.55, y: 4.63, w: 1.6, h: 0.22, fontSize: 9, fontFace: F.body, color: APPLE.blue, align: "center", margin: 0 });
  s.addText([
    { text: "동작 프로토타입\n", options: { fontSize: 13, fontFace: F.bold, color: C.ink } },
    { text: "단일 HTML · 디자인 토큰 적용 · 6화면 User Flow 상태기계\n\n", options: { fontSize: 11, color: C.midGray } },
    { text: "데모 영상 (하이라이트 적용)\n", options: { fontSize: 13, fontFace: F.bold, color: C.ink } },
    { text: "자동 커서가 의도→후보→비교→담기를 클릭으로 시연\n", options: { fontSize: 11, color: C.midGray } },
    { text: "Playwright 녹화 → ffmpeg H.264 MP4\n\n", options: { fontSize: 11, color: C.midGray } },
    { text: "재현 파이프라인\n", options: { fontSize: 12, fontFace: F.bold, color: APPLE.blue } },
    { text: "node record-proto.js <proto> <out.mp4>", options: { fontSize: 10, fontFace: F.code, color: C.darkGray } },
  ], { x: 4.55, y: 1.62, w: 4.05, h: 3.2, margin: 0, lineSpacingMultiple: 1.35, valign: "top" });
  addFooter(s, "파일: workshop/shopping-mate/prototype/index.html (?demo=1) · demo-shopping-mate.mp4");
}

// ─── SLIDE 21: 제작 워크플로우 정리 ───
{
  const s = lightSlide();
  addTitle(s, "정리 — 분석에서 데모까지 한 흐름");
  addSubtitle(s, "지표·Agent 분석으로 ‘왜·무엇을’을 정한 뒤, Claude Code로 끝까지 잇는다.");
  const flow = [
    ["분석", "지표·벤치마크\n코호트·퍼널", C.accent],
    ["PRD", "문제·솔루션\n지표·정책", APPLE.blue],
    ["Wireframe", "User Flow\n계층 보드", APPLE.sky],
    ["Prototype", "단계별 동작\nHTML", "1F883D"],
    ["Demo MP4", "클릭·하이라이트\n녹화", "8B5CF6"],
  ];
  const bw = (L.cw - 0.3 * 4) / 5;
  flow.forEach((f, i) => {
    const x = L.mx + i * (bw + 0.3);
    addCard(s, x, 1.85, bw, 1.95, { bg: C.offWhite, leftAccent: f[2] });
    s.addText(`${i + 1}`, { x: x + 0.12, y: 1.97, w: bw - 0.24, h: 0.4, fontSize: 18, fontFace: F.title, color: f[2], margin: 0 });
    s.addText(f[0], { x: x + 0.12, y: 2.45, w: bw - 0.24, h: 0.35, fontSize: 12.5, fontFace: F.title, color: C.ink, margin: 0 });
    s.addText(f[1], { x: x + 0.12, y: 2.85, w: bw - 0.24, h: 0.8, fontSize: 10, fontFace: F.body, color: C.midGray, margin: 0, lineSpacingMultiple: 1.25 });
    if (i < 4) s.addText("→", { x: x + bw - 0.05, y: 1.85, w: 0.3, h: 1.95, fontSize: 16, color: C.midGray, align: "center", valign: "middle", margin: 0 });
  });
  addAccentFooter(s, "도구는 Claude Desktop의 Claude Code 하나로 — PRD부터 데모 영상까지 한 자리에서.");
}

// ─── PART 5 ───
partDivider("PART 5", "정렬 — 한 PRD, 세 청중", "디자이너·개발자·리더십을 같은 문서, 다른 ‘렌즈’로 이해시킨다", null);

// ─── SLIDE: 청중별 질문 ───
{
  const s = lightSlide();
  addTitle(s, "같은 PRD, 다른 질문");
  addSubtitle(s, "청중은 자기 질문의 답이 첫 30초에 안 보이면 신뢰를 닫는다.");
  const who = [
    ["🎨 디자이너", "이걸로 화면을\n그릴 수 있나?", "시안·User Flow·예외상태·카피", C.accent],
    ["⚙️ 개발자/EM", "기간·리소스로\n만들 수 있나?", "명세·로깅·범위·NFR·가드레일", APPLE.blue],
    ["👔 리더십", "투자할 가치가\n있나?", "BLUF·데모·지표·차별점·리스크", "1F883D"],
  ];
  who.forEach((w, i) => {
    const x = L.mx + i * 2.95;
    addCard(s, x, 1.72, 2.75, 2.6, { bg: C.offWhite, leftAccent: w[3] });
    s.addText(w[0], { x: x + 0.16, y: 1.88, w: 2.45, h: 0.4, fontSize: 15, fontFace: F.title, color: w[3], margin: 0 });
    s.addText(w[1], { x: x + 0.16, y: 2.36, w: 2.45, h: 0.8, fontSize: 14, fontFace: F.title, color: C.ink, margin: 0, lineSpacingMultiple: 1.15 });
    s.addText([{ text: "보여줄 것\n", options: { fontFace: F.bold, color: C.midGray } }, { text: w[2], options: { color: C.ink } }], {
      x: x + 0.16, y: 3.3, w: 2.45, h: 0.9, fontSize: 11, fontFace: F.body, margin: 0, lineSpacingMultiple: 1.35, valign: "top" });
  });
  addAccentFooter(s, "정렬의 기술 = 하나의 SSOT(PRD)를 청중별 렌즈로 다르게 보여주는 것.");
}

// ─── SLIDE: 산출물 × 청중 매트릭스 ───
{
  const s = lightSlide();
  addTitle(s, "산출물 × 청중 — 무엇이 누구를 설득하나");
  addSubtitle(s, "같은 산출물도 청중마다 증명하는 게 다르다. ◎ = 가장 강한 무기.");
  const tbl = [
    [
      { text: "산출물", options: { fill: { color: C.ink }, color: C.white, bold: true, fontFace: F.bold } },
      { text: "디자이너", options: { fill: { color: C.ink }, color: C.white, bold: true, fontFace: F.bold } },
      { text: "개발자/EM", options: { fill: { color: C.ink }, color: C.white, bold: true, fontFace: F.bold } },
      { text: "리더십", options: { fill: { color: C.ink }, color: C.white, bold: true, fontFace: F.bold } },
    ],
    [{ text: "2-Pager / BLUF", options: { bold: true, fontFace: F.bold } }, "맥락", "범위 감", { text: "◎ 30초 결정", options: { color: C.accent, bold: true } }],
    [{ text: "PRD 본문", options: { bold: true, fontFace: F.bold } }, { text: "◎ 화면·플로우", options: { color: C.accent, bold: true } }, { text: "◎ 명세·NFR", options: { color: C.accent, bold: true } }, "핵심 지표"],
    [{ text: "코드 기반 시안", options: { bold: true, fontFace: F.bold } }, { text: "◎ 시안 착수", options: { color: C.accent, bold: true } }, "화면 수·상태", "완성도 신뢰"],
    [{ text: "동작 프로토타입", options: { bold: true, fontFace: F.bold } }, "UX 검증", { text: "◎ 살아있는 명세", options: { color: C.accent, bold: true } }, "‘된다’ 체감"],
    [{ text: "데모 영상(MP4)", options: { bold: true, fontFace: F.bold } }, "UX 흐름", "스코프 윤곽", { text: "◎ 감정적 확신", options: { color: C.accent, bold: true } }],
    [{ text: "코호트·퍼널", options: { bold: true, fontFace: F.bold } }, "—", { text: "◎ 로깅 설계", options: { color: C.accent, bold: true } }, { text: "◎ 임팩트 근거", options: { color: C.accent, bold: true } }],
  ];
  s.addTable(tbl, { x: 0.5, y: 1.62, w: 9.0, colW: [2.4, 2.2, 2.2, 2.2], fontSize: 11, fontFace: F.body,
    border: { pt: 0.5, color: C.hairline }, rowH: [0.42, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4], valign: "middle" });
  addFooter(s, "미팅 운영: 리더십(BLUF+데모 5분) → 디자이너(시안 비동기) → 개발자(프로토+로깅) → 3관점 평가로 Approved.");
}

// ─── SLIDE: 합의 게이트 ───
{
  const s = lightSlide();
  addTitle(s, "합의의 증거 — 3관점 평가 Approved");
  addSubtitle(s, "‘좋아요’가 아니라 각 관점 기준 통과로 합의를 객관화한다.");
  const gates = [
    ["디자이너", "질문 없이 시안 착수 가능", "화면 MECE · User Flow · 예외상태 · 카피 가이드", C.accent],
    ["개발자/EM", "T-사이징 + 릴리즈 게이트 합의", "범위(In/Out) · 측정 로깅 · NFR · 가드레일·폴백", APPLE.blue],
    ["리더십", "착수 승인 + 게이트 동의", "BLUF 30초 · 지표 Baseline→Target · 데모 · 리스크/롤백", "1F883D"],
  ];
  gates.forEach((g, i) => {
    const y = 1.72 + i * 0.86;
    addCard(s, L.mx, y, L.cw, 0.74, { bg: C.offWhite, leftAccent: g[3] });
    s.addText(g[0], { x: L.mx + 0.2, y, w: 1.7, h: 0.74, fontSize: 14, fontFace: F.title, color: g[3], valign: "middle", margin: 0 });
    s.addText([{ text: g[1] + "\n", options: { fontFace: F.bold, color: C.ink } }, { text: g[2], options: { color: C.midGray } }], {
      x: 2.5, y, w: 6.7, h: 0.74, fontSize: 11.5, fontFace: F.body, valign: "middle", margin: 0, lineSpacingMultiple: 1.3 });
  });
  addAccentFooter(s, "3관점 각 20점+ → Approved. 기준: docs/evaluation/ · 비동기 리뷰: AI Doc Feedback Loop.");
}

// ─── SLIDE 22: 트랙별 응용 ───
{
  const s = lightSlide();
  addTitle(s, "부록: 내 트랙에 옮기기");
  addSubtitle(s, "Shopping Mate에서 배운 분석→설계→구현을 자기 도메인으로.");
  const tracks = [
    ["마케팅/콘텐츠", "콘텐츠 추천 Agent · CTR·체류·전환 메트릭", C.accent],
    ["로컬커머스/O2O", "주변 매장 추천 Agent · 방문·재방문·객단가", APPLE.blue],
    ["문화/콘텐츠", "공연·전시 추천 Agent · 예매 전환·재구매", "8B5CF6"],
    ["에듀테크", "학습 코스 추천 Agent · 완주율·재수강·NPS", "1F883D"],
  ];
  tracks.forEach((t, i) => {
    const x = L.mx + (i % 2) * 4.45;
    const y = 1.72 + Math.floor(i / 2) * 1.35;
    addCard(s, x, y, 4.15, 1.18, { bg: C.offWhite, leftAccent: t[2] });
    s.addText(t[0], { x: x + 0.18, y: y + 0.14, w: 3.8, h: 0.35, fontSize: 14, fontFace: F.title, color: t[2], margin: 0 });
    s.addText(t[1], { x: x + 0.18, y: y + 0.54, w: 3.8, h: 0.55, fontSize: 12, fontFace: F.body, color: C.midGray, margin: 0, lineSpacingMultiple: 1.3 });
  });
  addFooter(s, "공통 골격은 같다: 의도 → 후보 압축 → 결정 근거 → 측정 가능한 지표.");
}

// ─── SLIDE 23: CLOSING ───
{
  const s = darkSlide();
  s.addText("오늘 함께 만든 것", { x: L.mx, y: 0.7, w: L.cw, h: 0.55, fontSize: L.titleSize, fontFace: F.title, color: C.white, charSpacing: -0.4, margin: 0 });
  const items = [
    ["📊", "지표·벤치마크 분석", "커머스 메트릭 → 유저 임팩트, Alexa·Clova 비교 정의"],
    ["🔎", "데이터 검증", "mock 코호트·퍼널로 이탈 구간·개선 우선순위 도출"],
    ["📐", "설계 → 구현", "PRD → 와이어프레임 → 프로토타입 → 데모 영상"],
    ["🤖", "Claude Code 워크플로우", "분석부터 데모까지 한 도구로 잇는 실무 흐름"],
  ];
  items.forEach((it, i) => {
    const y = 1.55 + i * 0.65;
    s.addText(it[0], { x: 1.2, y, w: 0.5, h: 0.5, fontSize: 20, align: "center", valign: "middle", margin: 0 });
    s.addText(it[1], { x: 1.9, y, w: 2.7, h: 0.5, fontSize: 15, fontFace: F.title, color: C.accent, valign: "middle", margin: 0 });
    s.addText(it[2], { x: 4.7, y, w: 4.6, h: 0.5, fontSize: 12, fontFace: F.body, color: C.midGray, valign: "middle", margin: 0 });
  });
  accentLine(s, 4.3);
  s.addText("내 산업의 지표로, AI와 함께 만드는 실무.", { x: L.mx, y: 4.45, w: 5.8, h: 0.35, fontSize: 13, fontFace: F.bold, color: C.white, margin: 0 });
  s.addText("차성재  |  FastCampus", { x: 6.3, y: 4.45, w: 3.0, h: 0.35, fontSize: 12, fontFace: F.body, color: C.midGray, align: "right", margin: 0 });
}

// ══════════════════════════════════════════════════════
// GENERATE
// ══════════════════════════════════════════════════════
const defaultOut = path.join(__dirname, "fastcampus-commerce-ai-v05-20260626.pptx");
const out = process.env.OUT || defaultOut;
pres.writeFile({ fileName: out })
  .then(() => console.log("Created: " + out + " (" + pres.slides.length + " slides)"))
  .catch(e => console.error(e));
