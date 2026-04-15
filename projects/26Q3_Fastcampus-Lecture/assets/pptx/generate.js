const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "차성재";
pres.title = "AI NATIVE 시대, AI PM의 새로운 무기";

// ── B&W Design System ──
const C = {
  black: "111111",
  darkGray: "2A2A2A",
  midGray: "6B7280",
  lightGray: "E5E7EB",
  offWhite: "F5F5F5",
  white: "FFFFFF",
  accent: "FF6B35", // orange accent sparingly
};

const BAR = 0.5;
const SW = 10;
const SH = 5.625;

// ── Reusable slide builders ──
function darkSlide() {
  const s = pres.addSlide();
  s.background = { color: C.black };
  return s;
}

function lightSlide() {
  const s = pres.addSlide();
  s.background = { color: C.white };
  // Top bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: SW, h: BAR, fill: { color: C.black } });
  // Bottom bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: SH - BAR, w: SW, h: BAR, fill: { color: C.black } });
  return s;
}

function title(s, text, opts = {}) {
  const dark = opts.dark || false;
  s.addText(text, {
    x: 0.8, y: opts.y || (BAR + 0.15),
    w: 8.4, h: 0.55,
    fontSize: 26, fontFace: "Arial Black",
    color: dark ? C.white : C.black,
    bold: true, margin: 0,
  });
}

function subtitle(s, text, opts = {}) {
  s.addText(text, {
    x: 0.8, y: opts.y || (BAR + 0.75),
    w: 8.4, h: 0.35,
    fontSize: 13, fontFace: "Calibri",
    color: C.midGray, margin: 0,
  });
}

function body(s, arr, opts = {}) {
  s.addText(arr, {
    x: opts.x || 0.8, y: opts.y || 1.5,
    w: opts.w || 8.4, h: opts.h || 3.0,
    fontSize: opts.fs || 15, fontFace: "Calibri",
    color: C.black, valign: "top", margin: 0,
    lineSpacingMultiple: 1.35,
  });
}

function accentLine(s, y) {
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y, w: 1.0, h: 0.04,
    fill: { color: C.accent },
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 1 — TITLE (Dark)
// ═══════════════════════════════════════════════════
{
  const s = darkSlide();
  accentLine(s, 1.5);
  s.addText("AI NATIVE 시대,\nAI PM의 새로운 무기", {
    x: 0.8, y: 1.65, w: 8.4, h: 1.6,
    fontSize: 38, fontFace: "Arial Black",
    color: C.white, margin: 0, lineSpacingMultiple: 1.2,
  });
  s.addText("글로벌 트렌드  ·  기획 문서 계층  ·  프로토타입 데모", {
    x: 0.8, y: 3.4, w: 8.4, h: 0.4,
    fontSize: 15, fontFace: "Calibri", color: C.midGray, margin: 0,
  });
  s.addText("FastCampus  |  2026.04.16  |  차성재", {
    x: 0.8, y: 4.6, w: 8.4, h: 0.35,
    fontSize: 13, fontFace: "Calibri", color: C.accent, margin: 0,
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 2 — AGENDA
// ═══════════════════════════════════════════════════
{
  const s = lightSlide();
  title(s, "오늘의 여정");

  // Left
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.3, w: 4.0, h: 2.6, fill: { color: C.offWhite } });
  s.addText("강의  30분", {
    x: 1.0, y: 1.4, w: 3.6, h: 0.4,
    fontSize: 15, fontFace: "Arial Black", color: C.black, margin: 0,
  });
  s.addText([
    { text: "PM의 고유 역할과 AI 시대 변화", options: { bullet: true, breakLine: true } },
    { text: "기획 문서 계층 (Why → What → How)", options: { bullet: true, breakLine: true } },
    { text: "AI 서비스 라이브 데모", options: { bullet: true } },
  ], { x: 1.0, y: 1.9, w: 3.6, h: 1.8, fontSize: 13, fontFace: "Calibri", color: C.black, margin: 0 });

  // Right
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.3, w: 4.0, h: 2.6, fill: { color: C.offWhite } });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.3, w: 0.05, h: 2.6, fill: { color: C.accent } });
  s.addText("실습  60분", {
    x: 5.45, y: 1.4, w: 3.6, h: 0.4,
    fontSize: 15, fontFace: "Arial Black", color: C.accent, margin: 0,
  });
  s.addText([
    { text: "아이디어 → PRD 재료 (5개 항목)", options: { bullet: true, breakLine: true } },
    { text: "Manyfast.io로 PRD 초안 생성", options: { bullet: true, breakLine: true } },
    { text: "Claude Code로 HTML 프로토타입", options: { bullet: true } },
  ], { x: 5.45, y: 1.9, w: 3.6, h: 1.8, fontSize: 13, fontFace: "Calibri", color: C.black, margin: 0 });

  s.addText("목표: PRD + 동작하는 프로토타입을 직접 만들어 가기", {
    x: 0.8, y: 4.2, w: 8.4, h: 0.3,
    fontSize: 12, fontFace: "Calibri", color: C.midGray, italic: true, margin: 0,
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 3 — QUESTION
// ═══════════════════════════════════════════════════
{
  const s = lightSlide();
  s.addText("PM 채용 공고에서\n가장 많이 추가된\n키워드는?", {
    x: 0.8, y: 1.0, w: 8.4, h: 2.5,
    fontSize: 36, fontFace: "Arial Black",
    color: C.black, align: "center", valign: "middle", margin: 0,
    lineSpacingMultiple: 1.3,
  });
  s.addText("2024  vs  2026", {
    x: 0.8, y: 3.6, w: 8.4, h: 0.4,
    fontSize: 16, fontFace: "Calibri", color: C.accent, align: "center", margin: 0,
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 4 — AI TREND DATA
// ═══════════════════════════════════════════════════
{
  const s = lightSlide();
  title(s, "AI, PM 채용의 뉴노멀");

  const tbl = [
    [
      { text: "", options: { fill: { color: C.black }, color: C.white } },
      { text: "AI 언급", options: { fill: { color: C.black }, color: C.white, bold: true } },
      { text: "Prototyping 우대", options: { fill: { color: C.black }, color: C.white, bold: true } },
    ],
    [{ text: "2024", options: { bold: true } }, "23%", "15%"],
    [{ text: "2026", options: { bold: true } }, { text: "67%", options: { bold: true, color: C.accent } }, { text: "52%", options: { bold: true, color: C.accent } }],
  ];
  s.addTable(tbl, {
    x: 1.5, y: 1.5, w: 7.0, colW: [1.5, 2.75, 2.75],
    fontSize: 16, fontFace: "Calibri",
    border: { pt: 0.5, color: C.lightGray },
    rowH: [0.45, 0.5, 0.5], align: "center", valign: "middle",
  });
  s.addText("약 3배 증가", {
    x: 0.8, y: 3.2, w: 8.4, h: 0.5,
    fontSize: 24, fontFace: "Arial Black", color: C.accent, align: "center", margin: 0,
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 5 — CORE MESSAGE
// ═══════════════════════════════════════════════════
{
  const s = darkSlide();
  s.addText("AI가 PM을\n대체하는 게 아닙니다.", {
    x: 0.8, y: 1.0, w: 8.4, h: 1.6,
    fontSize: 34, fontFace: "Arial Black",
    color: C.white, align: "center", valign: "middle", margin: 0,
    lineSpacingMultiple: 1.3,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.5, y: 2.9, w: 7.0, h: 0.7,
    fill: { color: C.accent },
  });
  s.addText("AI를 쓰는 PM이, 안 쓰는 PM을 대체합니다.", {
    x: 1.5, y: 2.9, w: 7.0, h: 0.7,
    fontSize: 20, fontFace: "Arial Black",
    color: C.white, align: "center", valign: "middle", margin: 0,
  });
  s.addText("그렇다면 PM만의 고유한 역할은 무엇인가?", {
    x: 0.8, y: 4.0, w: 8.4, h: 0.4,
    fontSize: 14, fontFace: "Calibri", color: C.midGray, align: "center", margin: 0,
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 6 — PM'S IRREPLACEABLE ROLE (NEW KEY SLIDE)
// ═══════════════════════════════════════════════════
{
  const s = lightSlide();
  title(s, "PM만이 할 수 있는 고유한 역할");
  subtitle(s, "개발자도 PRD를 쓸 수 있고, PM도 코드를 짤 수 있는 시대. 그래서 PM의 본질이 더 중요해졌다.");

  const roles = [
    { num: "01", t: "도메인 이해", d: "산업과 시장의 맥락을 깊이 이해하고, 현재 상태에서 유의미한 방향을 정의" },
    { num: "02", t: "비즈니스 판단", d: "수익성, 신규 고객 확장력, 투자자/이사회 기대치를 종합한 제품 결정" },
    { num: "03", t: "제약 조건 내 최적화", d: "주어진 예산 · 기간 · 개발 인력 안에서 최대 아웃풋을 설계" },
    { num: "04", t: "기능 수준의 우선순위", d: "기능 하나하나에 P0/P1/P2를 부여할 수 있는 판단력" },
  ];

  roles.forEach((r, i) => {
    const y = 1.35 + i * 0.7;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y, w: 0.5, h: 0.5,
      fill: { color: C.black },
    });
    s.addText(r.num, {
      x: 0.8, y, w: 0.5, h: 0.5,
      fontSize: 14, fontFace: "Arial Black", color: C.white,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(r.t, {
      x: 1.5, y, w: 2.2, h: 0.5,
      fontSize: 15, fontFace: "Arial Black", color: C.black,
      valign: "middle", margin: 0,
    });
    s.addText(r.d, {
      x: 3.8, y, w: 5.4, h: 0.5,
      fontSize: 13, fontFace: "Calibri", color: C.midGray,
      valign: "middle", margin: 0,
    });
  });

  s.addText("AI는 실행 속도를 높여주지만, 무엇을 실행할지 결정하는 것은 PM이다.", {
    x: 0.8, y: 4.2, w: 8.4, h: 0.35,
    fontSize: 12, fontFace: "Calibri", color: C.accent, bold: true, margin: 0,
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 7 — PM = CONTEXT ARCHITECT (elaboration)
// ═══════════════════════════════════════════════════
{
  const s = lightSlide();
  title(s, "AI 시대, PM의 본질 = 맥락 설계자");

  // Left: AI가 잘하는 것
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.3, w: 4.0, h: 2.8, fill: { color: C.offWhite } });
  s.addText("AI가 잘하는 것", {
    x: 1.0, y: 1.4, w: 3.6, h: 0.4,
    fontSize: 14, fontFace: "Arial Black", color: C.midGray, margin: 0,
  });
  s.addText([
    { text: "경쟁사 분석, 시장 데이터 정리", options: { bullet: true, breakLine: true } },
    { text: "PRD 구조화, 기능 명세 초안", options: { bullet: true, breakLine: true } },
    { text: "프로토타입 코드 생성", options: { bullet: true, breakLine: true } },
    { text: "KPI 프레임워크 제안", options: { bullet: true } },
  ], { x: 1.0, y: 1.9, w: 3.6, h: 2.0, fontSize: 13, fontFace: "Calibri", color: C.midGray, margin: 0 });

  // Right: PM이 해야 하는 것
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.3, w: 4.0, h: 2.8, fill: { color: C.black } });
  s.addText("PM만이 해야 하는 것", {
    x: 5.4, y: 1.4, w: 3.6, h: 0.4,
    fontSize: 14, fontFace: "Arial Black", color: C.accent, margin: 0,
  });
  s.addText([
    { text: "\"이것을 왜 지금 해야 하는가\" 판단", options: { bullet: true, breakLine: true, color: C.white } },
    { text: "트레이드오프 결정 (범위 vs 일정 vs 품질)", options: { bullet: true, breakLine: true, color: C.white } },
    { text: "이해관계자 합의와 우선순위 조율", options: { bullet: true, breakLine: true, color: C.white } },
    { text: "자사 데이터 해석과 비즈니스 판단", options: { bullet: true, color: C.white } },
  ], { x: 5.4, y: 1.9, w: 3.6, h: 2.0, fontSize: 13, fontFace: "Calibri", color: C.white, margin: 0 });
}

// ═══════════════════════════════════════════════════
// SLIDE 8 — THREE ERAS
// ═══════════════════════════════════════════════════
{
  const s = lightSlide();
  title(s, "PM의 3가지 시대");

  const eras = [
    { era: "Era 1", name: "Feature PM", period: "~2019", role: "기능 정의자", bg: C.offWhite, tc: C.black },
    { era: "Era 2", name: "Product-Led PM", period: "2020~24", role: "성장 설계자", bg: C.offWhite, tc: C.black },
    { era: "Era 3", name: "AI Native PM", period: "2025~", role: "맥락 설계자", bg: C.black, tc: C.white },
  ];

  eras.forEach((e, i) => {
    const x = 0.8 + i * 3.1;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.3, w: 2.8, h: 2.8, fill: { color: e.bg } });
    s.addText(e.era, {
      x: x + 0.15, y: 1.45, w: 2.5, h: 0.3,
      fontSize: 11, fontFace: "Calibri", color: i === 2 ? C.accent : C.midGray, bold: true, margin: 0,
    });
    s.addText(e.name, {
      x: x + 0.15, y: 1.8, w: 2.5, h: 0.4,
      fontSize: 16, fontFace: "Arial Black", color: e.tc, margin: 0,
    });
    s.addText(e.period, {
      x: x + 0.15, y: 2.2, w: 2.5, h: 0.3,
      fontSize: 11, fontFace: "Calibri", color: C.midGray, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.15, y: 2.6, w: 2.5, h: 0.03, fill: { color: i === 2 ? C.accent : C.lightGray } });
    s.addText(e.role, {
      x: x + 0.15, y: 2.75, w: 2.5, h: 0.3,
      fontSize: 13, fontFace: "Calibri", color: e.tc, bold: true, margin: 0,
    });
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 9 — WHAT CHANGED (Before / After)
// ═══════════════════════════════════════════════════
{
  const s = lightSlide();
  title(s, "무엇이 바뀌었나");

  const tbl = [
    [
      { text: "", options: { fill: { color: C.black }, color: C.white } },
      { text: "Before", options: { fill: { color: C.black }, color: C.white, bold: true } },
      { text: "", options: { fill: { color: C.black } } },
      { text: "After (AI Native)", options: { fill: { color: C.black }, color: C.white, bold: true } },
    ],
    [{ text: "문서", options: { bold: true } }, "Word → Notion, 수동 작성", "→", { text: "AI가 PRD 초안 생성", options: { color: C.accent, bold: true } }],
    [{ text: "프로토타입", options: { bold: true } }, "디자이너/개발자에게 의뢰", "→", { text: "PM이 직접 AI로 생성", options: { color: C.accent, bold: true } }],
    [{ text: "검증 속도", options: { bold: true } }, "수 주 (기획→개발→출시)", "→", { text: "수 시간 (즉시 확인)", options: { color: C.accent, bold: true } }],
    [{ text: "PM 역할", options: { bold: true } }, "기능 전달자", "→", { text: "맥락 설계자 + 판단자", options: { color: C.accent, bold: true } }],
  ];
  s.addTable(tbl, {
    x: 0.5, y: 1.4, w: 9.0, colW: [1.4, 2.8, 0.3, 4.5],
    fontSize: 13, fontFace: "Calibri",
    border: { pt: 0.5, color: C.lightGray },
    rowH: [0.4, 0.48, 0.48, 0.48, 0.48], valign: "middle",
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 10 — DOCUMENT HIERARCHY
// ═══════════════════════════════════════════════════
{
  const s = lightSlide();
  title(s, "기획 문서의 계층 구조");

  const rows = [
    { text: "2-Pager", sub: "왜 이걸 하는가?", accent: C.lightGray },
    { text: "PRD  (SSOT)", sub: "무엇을, 왜, 누구를 위해", accent: C.accent },
    { text: "Specs · HLD · ADR", sub: "어떻게 만들고 왜 그렇게 결정했는가", accent: C.lightGray },
    { text: "Ops", sub: "어떻게 출시·운영하는가", accent: C.lightGray },
  ];

  rows.forEach((r, i) => {
    const y = 1.25 + i * 0.75;
    s.addShape(pres.shapes.RECTANGLE, { x: 1.5, y, w: 7.0, h: 0.55, fill: { color: C.offWhite } });
    s.addShape(pres.shapes.RECTANGLE, { x: 1.5, y, w: 0.05, h: 0.55, fill: { color: r.accent } });
    s.addText(r.text, {
      x: 1.75, y, w: 3.0, h: 0.55,
      fontSize: 14, fontFace: "Arial Black", color: C.black, valign: "middle", margin: 0,
    });
    s.addText(r.sub, {
      x: 4.8, y, w: 3.5, h: 0.55,
      fontSize: 12, fontFace: "Calibri", color: C.midGray, valign: "middle", margin: 0,
    });
    if (i < rows.length - 1) {
      s.addText("↓", {
        x: 4.7, y: y + 0.55, w: 0.6, h: 0.2,
        fontSize: 12, color: C.midGray, align: "center", margin: 0,
      });
    }
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 11 — WHY → WHAT → HOW
// ═══════════════════════════════════════════════════
{
  const s = lightSlide();
  title(s, "PRD의 핵심: Why → What → How");

  const boxes = [
    { label: "Why", q: "왜 이 문제를 풀어야 하는가?", detail: "문제 정의 · 비즈니스 근거 · 데이터 증거" },
    { label: "What", q: "무엇을 만드는가?", detail: "솔루션 · 사용자 · 범위 · 기능 명세" },
    { label: "How", q: "어떻게 성공을 측정하는가?", detail: "KPI · 실험 설계 · 롤아웃 전략" },
  ];

  boxes.forEach((b, i) => {
    const y = 1.3 + i * 0.85;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y, w: 1.0, h: 0.6, fill: { color: C.black } });
    s.addText(b.label, {
      x: 0.8, y, w: 1.0, h: 0.6,
      fontSize: 16, fontFace: "Arial Black", color: C.white,
      align: "center", valign: "middle", margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, { x: 1.9, y, w: 7.3, h: 0.6, fill: { color: C.offWhite } });
    s.addText(b.q, {
      x: 2.1, y, w: 3.5, h: 0.6,
      fontSize: 14, fontFace: "Calibri", color: C.black, bold: true, valign: "middle", margin: 0,
    });
    s.addText(b.detail, {
      x: 5.6, y, w: 3.5, h: 0.6,
      fontSize: 12, fontFace: "Calibri", color: C.midGray, valign: "middle", margin: 0,
    });
  });

  s.addText("Why가 흔들리면, What과 How는 의미가 없다", {
    x: 0.8, y: 4.15, w: 8.4, h: 0.3,
    fontSize: 12, fontFace: "Calibri", color: C.accent, bold: true, margin: 0,
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 12 — AI ACCELERATES EACH STEP
// ═══════════════════════════════════════════════════
{
  const s = lightSlide();
  title(s, "AI가 각 단계를 어떻게 바꾸는가");

  const tbl = [
    [
      { text: "단계", options: { fill: { color: C.black }, color: C.white, bold: true } },
      { text: "기존", options: { fill: { color: C.black }, color: C.white, bold: true } },
      { text: "AI Native", options: { fill: { color: C.black }, color: C.white, bold: true } },
    ],
    ["2-Pager", "수일", { text: "수분", options: { bold: true, color: C.accent } }],
    ["PRD", "1~2주", { text: "수시간", options: { bold: true, color: C.accent } }],
    ["Wireframe", "수일 (디자이너 의뢰)", { text: "수분 (AI 자동 생성)", options: { bold: true, color: C.accent } }],
    ["Prototype", "수주 (개발 의뢰)", { text: "수십분 (AI 코드 생성)", options: { bold: true, color: C.accent } }],
  ];
  s.addTable(tbl, {
    x: 1.0, y: 1.4, w: 8.0, colW: [1.5, 3.0, 3.5],
    fontSize: 14, fontFace: "Calibri",
    border: { pt: 0.5, color: C.lightGray },
    rowH: [0.42, 0.5, 0.5, 0.5, 0.5], valign: "middle",
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 13 — 5 MAGIC INPUTS
// ═══════════════════════════════════════════════════
{
  const s = lightSlide();
  title(s, "5개 핵심 입력 — PRD의 씨앗");

  const inputs = [
    { n: "1", l: "서비스명", q: "뭐라고 부를까?" },
    { n: "2", l: "타겟 유저", q: "누구를 위한 건가?" },
    { n: "3", l: "핵심 문제", q: "어떤 문제를 해결하나?" },
    { n: "4", l: "AI 활용점", q: "AI가 어디서 가치를 만드나?" },
    { n: "5", l: "성공 기준", q: "어떻게 성공을 아나?" },
  ];

  inputs.forEach((inp, i) => {
    const y = 1.3 + i * 0.5;
    s.addShape(pres.shapes.OVAL, { x: 0.8, y, w: 0.38, h: 0.38, fill: { color: C.black } });
    s.addText(inp.n, {
      x: 0.8, y, w: 0.38, h: 0.38,
      fontSize: 13, fontFace: "Arial Black", color: C.white,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(inp.l, {
      x: 1.4, y, w: 2.0, h: 0.38,
      fontSize: 15, fontFace: "Arial Black", color: C.black, valign: "middle", margin: 0,
    });
    s.addText(inp.q, {
      x: 3.5, y, w: 5.5, h: 0.38,
      fontSize: 13, fontFace: "Calibri", color: C.midGray, valign: "middle", margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 4.1, w: 8.4, h: 0.4, fill: { color: C.offWhite } });
  s.addText("이 5개만 명확하면 AI가 나머지를 채워줍니다", {
    x: 0.8, y: 4.1, w: 8.4, h: 0.4,
    fontSize: 13, fontFace: "Calibri", color: C.accent, bold: true,
    align: "center", valign: "middle", margin: 0,
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 14 — DEMO: PRD
// ═══════════════════════════════════════════════════
{
  const s = lightSlide();
  title(s, "데모: 오늘의 점심 메이트 — PRD");

  const items = [
    { icon: "🎯", label: "문제", text: "직장인 12분 × 250일 = 연 50시간 '뭐 먹지?' 고민" },
    { icon: "💡", label: "솔루션", text: "기분 + 예산 + 위치 → AI 맞춤 메뉴 3개 추천" },
    { icon: "📊", label: "KPI", text: "추천 수락률 60%, 재사용률 주 3회" },
    { icon: "🤖", label: "AI 모델", text: "Claude Haiku — 월 $15" },
  ];

  items.forEach((it, i) => {
    const y = 1.4 + i * 0.65;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y, w: 8.4, h: 0.5, fill: { color: i % 2 === 0 ? C.offWhite : C.white } });
    s.addText(it.icon + "  " + it.label, {
      x: 1.0, y, w: 1.6, h: 0.5,
      fontSize: 13, fontFace: "Arial Black", color: C.black, valign: "middle", margin: 0,
    });
    s.addText(it.text, {
      x: 2.7, y, w: 6.3, h: 0.5,
      fontSize: 13, fontFace: "Calibri", color: C.black, valign: "middle", margin: 0,
    });
  });

  s.addText("화면 공유: PRD.md 라이브 시연", {
    x: 0.8, y: 4.2, w: 8.4, h: 0.25,
    fontSize: 11, fontFace: "Calibri", color: C.midGray, italic: true, margin: 0,
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 15 — DEMO: PROTOTYPE
// ═══════════════════════════════════════════════════
{
  const s = lightSlide();
  title(s, "데모: 프로토타입 — 15분 만에 완성");

  body(s, [
    { text: "단일 HTML 파일, 외부 API 없음", options: { bullet: true, breakLine: true, bold: true } },
    { text: "기분 선택 → 예산 선택 → AI 추천 결과", options: { bullet: true, breakLine: true } },
    { text: "모바일 반응형, 실제 버튼 동작 포함", options: { bullet: true } },
  ], { fs: 16 });

  s.addText("화면 공유: 프로토타입 라이브 시연", {
    x: 0.8, y: 4.2, w: 8.4, h: 0.25,
    fontSize: 11, fontFace: "Calibri", color: C.midGray, italic: true, margin: 0,
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 16 — TRANSITION
// ═══════════════════════════════════════════════════
{
  const s = darkSlide();
  s.addText("이제 여러분 차례입니다", {
    x: 0.8, y: 1.2, w: 8.4, h: 0.7,
    fontSize: 32, fontFace: "Arial Black", color: C.white, align: "center", margin: 0,
  });
  s.addText("아이디어 → PRD → 프로토타입", {
    x: 0.8, y: 2.2, w: 8.4, h: 0.5,
    fontSize: 18, fontFace: "Calibri", color: C.accent, bold: true, align: "center", margin: 0,
  });
  s.addText("60분 안에 직접 체험합니다", {
    x: 0.8, y: 2.8, w: 8.4, h: 0.4,
    fontSize: 15, fontFace: "Calibri", color: C.midGray, align: "center", margin: 0,
  });
  s.addText("완성도가 아닙니다.\n과정을 경험하는 것이 목적입니다.", {
    x: 2.0, y: 3.5, w: 6.0, h: 0.8,
    fontSize: 14, fontFace: "Calibri", color: C.white, align: "center", margin: 0,
    lineSpacingMultiple: 1.4,
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 17 — WORKSHOP TITLE (Dark)
// ═══════════════════════════════════════════════════
{
  const s = darkSlide();
  accentLine(s, 1.8);
  s.addText("WORKSHOP", {
    x: 0.8, y: 1.95, w: 8.4, h: 0.9,
    fontSize: 42, fontFace: "Arial Black", color: C.white, margin: 0,
  });
  s.addText("내 아이디어를 60분 만에 프로토타입으로", {
    x: 0.8, y: 3.0, w: 8.4, h: 0.4,
    fontSize: 16, fontFace: "Calibri", color: C.midGray, margin: 0,
  });
  s.addText("19:20 ~ 20:20", {
    x: 0.8, y: 3.5, w: 8.4, h: 0.35,
    fontSize: 13, fontFace: "Calibri", color: C.accent, margin: 0,
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 18 — WORKSHOP FLOW
// ═══════════════════════════════════════════════════
{
  const s = lightSlide();
  title(s, "실습 흐름");

  const steps = [
    { l: "Step 0", t: "10분", d: "환경 세팅 + 트랙 선택" },
    { l: "Step 1", t: "15분", d: "아이디어 → PRD 재료 (5개 항목)" },
    { l: "Step 2", t: "15분", d: "Manyfast.io → PRD 초안" },
    { l: "Step 3", t: "15분", d: "Claude → HTML 프로토타입" },
    { l: "Buffer", t: "5분", d: "저장 + 발표 준비" },
  ];

  steps.forEach((st, i) => {
    const y = 1.3 + i * 0.56;
    const last = i === steps.length - 1;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y, w: 1.1, h: 0.4,
      fill: { color: last ? C.lightGray : C.black },
    });
    s.addText(st.l, {
      x: 0.8, y, w: 1.1, h: 0.4,
      fontSize: 11, fontFace: "Arial Black", color: last ? C.black : C.white,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(st.t, {
      x: 2.1, y, w: 0.8, h: 0.4,
      fontSize: 12, fontFace: "Calibri", color: C.midGray, bold: true, valign: "middle", margin: 0,
    });
    s.addText(st.d, {
      x: 3.0, y, w: 6.0, h: 0.4,
      fontSize: 14, fontFace: "Calibri", color: C.black, valign: "middle", margin: 0,
    });
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 19 — SETUP + TRACK
// ═══════════════════════════════════════════════════
{
  const s = lightSlide();
  title(s, "Step 0: 환경 세팅 + 트랙 선택");

  const checks = ["Manyfast.io 로그인", "Claude.ai 또는 Claude Code 접속", "메모장 준비"];
  checks.forEach((c, i) => {
    s.addText("☐  " + c, {
      x: 0.8, y: 1.3 + i * 0.45, w: 4.0, h: 0.4,
      fontSize: 14, fontFace: "Calibri", color: C.black, margin: 0,
    });
  });

  // Tracks
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.3, w: 4.0, h: 1.2, fill: { color: C.offWhite } });
  s.addText("🟢 공통 트랙: 강사 주제 따라가기\n(오늘의 점심 메이트)", {
    x: 5.4, y: 1.35, w: 3.6, h: 1.1,
    fontSize: 12, fontFace: "Calibri", color: C.black, margin: 0, lineSpacingMultiple: 1.4,
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 2.65, w: 4.0, h: 1.2, fill: { color: C.offWhite } });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 2.65, w: 0.05, h: 1.2, fill: { color: C.accent } });
  s.addText("🔵 자유 트랙: 본인 아이디어 진행\n핵심 기능 1개로 좁히기!", {
    x: 5.45, y: 2.7, w: 3.6, h: 1.1,
    fontSize: 12, fontFace: "Calibri", color: C.black, margin: 0, lineSpacingMultiple: 1.4,
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 20 — STEP 1: TEMPLATE
// ═══════════════════════════════════════════════════
{
  const s = lightSlide();
  title(s, "Step 1: 5개 항목 채우기");

  s.addShape(pres.shapes.RECTANGLE, { x: 1.0, y: 1.3, w: 8.0, h: 2.8, fill: { color: C.offWhite } });

  const fields = [
    "1. 서비스명: ___________________________",
    "2. 타겟 유저: ___________________________",
    "3. 핵심 문제: ___________________________",
    "4. AI 활용점: ___________________________",
    "5. 성공 기준: ___________________________",
  ];
  fields.forEach((f, i) => {
    s.addText(f, {
      x: 1.3, y: 1.5 + i * 0.45, w: 7.4, h: 0.38,
      fontSize: 15, fontFace: "Calibri", color: C.black, margin: 0,
    });
  });

  s.addText("⏱  10분 안에 채워주세요!", {
    x: 0.8, y: 4.3, w: 8.4, h: 0.3,
    fontSize: 13, fontFace: "Calibri", color: C.accent, bold: true, align: "center", margin: 0,
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 21 — STEP 1: EXAMPLE
// ═══════════════════════════════════════════════════
{
  const s = lightSlide();
  title(s, "Step 1: 예시 — 오늘의 점심 메이트");

  s.addShape(pres.shapes.RECTANGLE, { x: 1.0, y: 1.3, w: 8.0, h: 2.8, fill: { color: C.offWhite } });
  s.addShape(pres.shapes.RECTANGLE, { x: 1.0, y: 1.3, w: 0.05, h: 2.8, fill: { color: C.accent } });

  const filled = [
    { l: "1. 서비스명:", v: "오늘의 점심 메이트" },
    { l: "2. 타겟 유저:", v: "점심 메뉴 고민이 많은 직장인" },
    { l: "3. 핵심 문제:", v: "매일 '뭐 먹지?' 고민에 12분 낭비" },
    { l: "4. AI 활용점:", v: "기분/예산 기반 맞춤 메뉴 추천" },
    { l: "5. 성공 기준:", v: "추천 수락률 60%" },
  ];
  filled.forEach((f, i) => {
    s.addText([
      { text: f.l + " ", options: { bold: true } },
      { text: f.v, options: { color: C.accent } },
    ], {
      x: 1.3, y: 1.5 + i * 0.45, w: 7.4, h: 0.38,
      fontSize: 15, fontFace: "Calibri", color: C.black, margin: 0,
    });
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 22 — STEP 2: MANYFAST
// ═══════════════════════════════════════════════════
{
  const s = lightSlide();
  title(s, "Step 2: Manyfast.io → PRD 초안 생성");

  body(s, [
    { text: "1.  새 프로젝트 생성", options: { breakLine: true, bold: true } },
    { text: "2.  5개 항목 입력", options: { breakLine: true } },
    { text: "3.  PRD 생성 실행 (~1분)", options: { breakLine: true } },
    { text: "4.  핵심 기능 부분만 복사 → 메모장 저장", options: { breakLine: true, bold: true } },
  ], { fs: 15 });

  // Warning
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 3.8, w: 8.4, h: 0.5, fill: { color: "FEF3C7" } });
  s.addText("⚠️  PRD 전체 복사 금지 — 3줄 요약만 저장 (토큰 절감)", {
    x: 1.0, y: 3.8, w: 8.0, h: 0.5,
    fontSize: 13, fontFace: "Calibri", color: "92400E", bold: true, valign: "middle", margin: 0,
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 23 — STEP 2: CHECKPOINT
// ═══════════════════════════════════════════════════
{
  const s = lightSlide();
  title(s, "Step 2: PRD 검수 포인트");

  const checks = [
    "문제 정의에 구체적 수치가 있는가?",
    "In Scope / Out of Scope가 구분되어 있는가?",
    "성공 지표에 측정 가능한 숫자가 있는가?",
  ];
  checks.forEach((c, i) => {
    const y = 1.4 + i * 0.7;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y, w: 8.4, h: 0.55, fill: { color: C.offWhite } });
    s.addText("✅  " + c, {
      x: 1.0, y, w: 8.0, h: 0.55,
      fontSize: 15, fontFace: "Calibri", color: C.black, valign: "middle", margin: 0,
    });
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 24 — STEP 3: PROMPT
// ═══════════════════════════════════════════════════
{
  const s = lightSlide();
  title(s, "Step 3: Claude → 프로토타입 생성");

  // Code block
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.3, w: 8.4, h: 2.6, fill: { color: C.darkGray } });
  s.addText([
    { text: "아래 PRD를 기반으로 모바일 웹 UI 프로토타입을\nHTML 단일 파일로 만들어줘.\n\n", options: { color: C.white, breakLine: true } },
    { text: "[서비스명]: ", options: { color: C.midGray } },
    { text: "오늘의 점심 메이트\n", options: { color: C.accent, breakLine: true } },
    { text: "[핵심 기능]: ", options: { color: C.midGray } },
    { text: "기분 선택 → 예산 선택 → 메뉴 3개 추천\n", options: { color: C.accent, breakLine: true } },
    { text: "[조건]: ", options: { color: C.midGray } },
    { text: "단일 HTML / 모바일 반응형 / 한국어 UI", options: { color: C.accent } },
  ], {
    x: 1.1, y: 1.5, w: 7.8, h: 2.2,
    fontSize: 13, fontFace: "Consolas", margin: 0, lineSpacingMultiple: 1.3,
  });

  s.addText("프롬프트를 복사해서 바로 사용하세요", {
    x: 0.8, y: 4.2, w: 8.4, h: 0.25,
    fontSize: 12, fontFace: "Calibri", color: C.accent, bold: true, align: "center", margin: 0,
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 25 — TROUBLESHOOTING
// ═══════════════════════════════════════════════════
{
  const s = lightSlide();
  title(s, "Step 3: 트러블슈팅");

  const tbl = [
    [
      { text: "문제", options: { fill: { color: C.black }, color: C.white, bold: true } },
      { text: "해결", options: { fill: { color: C.black }, color: C.white, bold: true } },
    ],
    ["HTML 안 열림", "확장자 .html 확인"],
    ["화면이 하양", "'콘솔 오류 확인해줘' 재요청"],
    ["디자인 깨짐", "'모바일에 맞게 CSS 수정해줘'"],
    ["응답 끊김", "'이어서 작성해줘' 입력"],
  ];
  s.addTable(tbl, {
    x: 0.8, y: 1.4, w: 8.4, colW: [2.8, 5.6],
    fontSize: 14, fontFace: "Calibri",
    border: { pt: 0.5, color: C.lightGray },
    rowH: [0.4, 0.48, 0.48, 0.48, 0.48], valign: "middle",
  });
}

// ═══════════════════════════════════════════════════
// SLIDE 26 — CLOSING (Dark)
// ═══════════════════════════════════════════════════
{
  const s = darkSlide();
  s.addText("오늘 여러분이 만든 것", {
    x: 0.8, y: 0.8, w: 8.4, h: 0.6,
    fontSize: 26, fontFace: "Arial Black", color: C.white, margin: 0,
  });

  const items = [
    { icon: "📋", l: "PRD", d: "AI가 구조화한 제품 기획서" },
    { icon: "📱", l: "Prototype", d: "15분 만에 만든 동작하는 데모" },
    { icon: "🔄", l: "Workflow", d: "내일부터 반복할 수 있는 프로세스" },
  ];
  items.forEach((it, i) => {
    const y = 1.8 + i * 0.7;
    s.addText(it.icon, {
      x: 1.5, y, w: 0.5, h: 0.5,
      fontSize: 22, align: "center", valign: "middle", margin: 0,
    });
    s.addText(it.l, {
      x: 2.2, y, w: 2.0, h: 0.5,
      fontSize: 17, fontFace: "Arial Black", color: C.accent, valign: "middle", margin: 0,
    });
    s.addText(it.d, {
      x: 4.2, y, w: 4.5, h: 0.5,
      fontSize: 14, fontFace: "Calibri", color: C.midGray, valign: "middle", margin: 0,
    });
  });

  accentLine(s, 4.1);
  s.addText("AI NATIVE 시대, 여러분은 이미 준비되었습니다.", {
    x: 0.8, y: 4.25, w: 5.5, h: 0.35,
    fontSize: 13, fontFace: "Calibri", color: C.white, bold: true, margin: 0,
  });
  s.addText("차성재  |  FastCampus", {
    x: 6.3, y: 4.25, w: 2.9, h: 0.35,
    fontSize: 12, fontFace: "Calibri", color: C.midGray, align: "right", margin: 0,
  });
}

// ── Generate ──
const out = "/Users/sungjae-cha/Downloads/ai-native-pm/projects/26Q3_Fastcampus-Lecture/assets/pptx/ai-native-pm-lecture.pptx";
pres.writeFile({ fileName: out }).then(() => console.log("Created: " + out)).catch(e => console.error(e));
