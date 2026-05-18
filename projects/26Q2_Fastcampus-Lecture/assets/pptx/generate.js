const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "차성재";
pres.title = "AI NATIVE 시대, AI PM의 새로운 무기";

// ══════════════════════════════════════════════════════
// DESIGN SYSTEM
// ══════════════════════════════════════════════════════
const C = {
  black: "111111",
  darkGray: "2A2A2A",
  midGray: "6B7280",
  lightGray: "E5E7EB",
  offWhite: "F5F5F5",
  white: "FFFFFF",
  accent: "FF6B35",
  warmBg: "FEF3C7",
  warmText: "92400E",
};

const SW = 10;
const SH = 5.625;
const BAR = 0.5;

// ── Layout Constants ──
const L = {
  mx: 0.7,               // margin x (left/right)
  cw: 8.6,               // content width (SW - 2*mx)
  titleY: BAR + 0.12,    // title Y position
  titleH: 0.55,          // title height
  subY: BAR + 0.7,       // subtitle Y
  subH: 0.35,            // subtitle height
  topY: 1.25,            // content area top
  botY: SH - BAR - 0.4,  // content area bottom (for footer text)
  titleSize: 26,
  subSize: 12,
  bodySize: 14,
  smallSize: 11,
  captionSize: 10,
};

// ── Font System: 나눔고딕 ──
const F = {
  title: "NanumGothic ExtraBold",
  bold: "NanumGothic Bold",
  body: "NanumGothic",
  code: "Consolas",
};

// ══════════════════════════════════════════════════════
// REUSABLE BUILDERS
// ══════════════════════════════════════════════════════

function darkSlide() {
  const s = pres.addSlide();
  s.background = { color: C.black };
  return s;
}

function lightSlide() {
  const s = pres.addSlide();
  s.background = { color: C.white };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: SW, h: BAR, fill: { color: C.black } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: SH - BAR, w: SW, h: BAR, fill: { color: C.black } });
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
  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: opts.bg || C.offWhite },
  });
  if (opts.leftAccent) {
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.04, h,
      fill: { color: opts.leftAccent },
    });
  }
}

// ══════════════════════════════════════════════════════
//  PART 1: LECTURE SLIDES
// ══════════════════════════════════════════════════════

// ─── SLIDE 1: TITLE (Dark) ───
{
  const s = darkSlide();
  accentLine(s, 1.4);
  s.addText("AI NATIVE 시대,\nAI PM의 새로운 무기", {
    x: L.mx, y: 1.55, w: L.cw, h: 1.6,
    fontSize: 38, fontFace: F.title,
    color: C.white, margin: 0, lineSpacingMultiple: 1.25,
  });
  s.addText("글로벌 PM 트렌드  ·  기획 문서 계층  ·  AI 도구 협업  ·  프로토타입 데모", {
    x: L.mx, y: 3.3, w: L.cw, h: 0.35,
    fontSize: 14, fontFace: F.body, color: C.midGray, margin: 0,
  });
  s.addText("FastCampus  |  2026.04.16  |  차성재", {
    x: L.mx, y: 4.5, w: L.cw, h: 0.35,
    fontSize: 13, fontFace: F.body, color: C.accent, margin: 0,
  });
}

// ─── SLIDE 2: AGENDA ───
{
  const s = lightSlide();
  addTitle(s, "오늘의 여정");

  // Left card: 강의
  addCard(s, L.mx, L.topY, 4.1, 2.8);
  s.addText("🎤  강의  30분", {
    x: L.mx + 0.2, y: L.topY + 0.1, w: 3.7, h: 0.4,
    fontSize: 15, fontFace: F.title, color: C.black, margin: 0,
  });
  s.addText([
    { text: "PM의 본질과 고유 역할", options: { bullet: true, breakLine: true } },
    { text: "3가지 시대: Feature → Product-Led → AI Native", options: { bullet: true, breakLine: true } },
    { text: "기획 문서 계층과 Why→What→How", options: { bullet: true, breakLine: true } },
    { text: "AI 도구 협업 마스터 플랜", options: { bullet: true, breakLine: true } },
    { text: "라이브 데모: PRD + 프로토타입", options: { bullet: true } },
  ], {
    x: L.mx + 0.2, y: L.topY + 0.55, w: 3.7, h: 2.1,
    fontSize: 12, fontFace: F.body, color: C.darkGray, margin: 0, lineSpacingMultiple: 1.45,
  });

  // Right card: 실습
  addCard(s, 5.1, L.topY, 4.1, 2.8, { leftAccent: C.accent });
  s.addText("💻  실습  60분", {
    x: 5.35, y: L.topY + 0.1, w: 3.7, h: 0.4,
    fontSize: 15, fontFace: F.title, color: C.accent, margin: 0,
  });
  s.addText([
    { text: "아이디어 → PRD 재료 (5개 항목)", options: { bullet: true, breakLine: true } },
    { text: "Manyfast.io로 PRD 초안 생성", options: { bullet: true, breakLine: true } },
    { text: "Claude Code로 HTML 프로토타입", options: { bullet: true, breakLine: true } },
    { text: "배포까지 (Replit / Lovable / Vercel)", options: { bullet: true } },
  ], {
    x: 5.35, y: L.topY + 0.55, w: 3.7, h: 2.1,
    fontSize: 12, fontFace: F.body, color: C.darkGray, margin: 0, lineSpacingMultiple: 1.45,
  });

  addFooter(s, "오늘의 목표:  PRD + 동작하는 프로토타입을 직접 만들어 가기");
}

// ─── SLIDE 3: OPENING QUESTION ───
{
  const s = lightSlide();
  s.addText("PM 채용 공고에서\n가장 많이 추가된\n키워드는?", {
    x: L.mx, y: 0.9, w: L.cw, h: 2.5,
    fontSize: 36, fontFace: F.title,
    color: C.black, align: "center", valign: "middle", margin: 0,
    lineSpacingMultiple: 1.35,
  });
  s.addText("2024  vs  2026", {
    x: L.mx, y: 3.5, w: L.cw, h: 0.4,
    fontSize: 16, fontFace: F.bold, color: C.accent, align: "center", margin: 0,
  });
  addFooter(s, "💡 손 들기 유도:  \"AI?  프로토타이핑?  데이터?\"");
}

// ─── SLIDE 4: AI TREND DATA ───
{
  const s = lightSlide();
  addTitle(s, "AI, PM 채용의 뉴노멀");
  addSubtitle(s, "ProductBoard PM Hiring Report 기반 분석");

  const tbl = [
    [
      { text: "", options: { fill: { color: C.black }, color: C.white } },
      { text: "AI 언급", options: { fill: { color: C.black }, color: C.white, bold: true, fontFace: F.bold } },
      { text: "프로토타이핑 우대", options: { fill: { color: C.black }, color: C.white, bold: true, fontFace: F.bold } },
      { text: "프롬프트 역량", options: { fill: { color: C.black }, color: C.white, bold: true, fontFace: F.bold } },
    ],
    [
      { text: "2024", options: { bold: true, fontFace: F.bold } },
      "23%", "15%", "5%",
    ],
    [
      { text: "2026", options: { bold: true, fontFace: F.bold } },
      { text: "67%", options: { bold: true, color: C.accent, fontFace: F.bold } },
      { text: "52%", options: { bold: true, color: C.accent, fontFace: F.bold } },
      { text: "38%", options: { bold: true, color: C.accent, fontFace: F.bold } },
    ],
  ];
  s.addTable(tbl, {
    x: 1.2, y: 1.2, w: 7.6, colW: [1.3, 2.1, 2.1, 2.1],
    fontSize: 15, fontFace: F.body,
    border: { pt: 0.5, color: C.lightGray },
    rowH: [0.45, 0.55, 0.55], align: "center", valign: "middle",
  });

  s.addText("약 3배 증가", {
    x: L.mx, y: 2.8, w: L.cw, h: 0.5,
    fontSize: 28, fontFace: F.title, color: C.accent, align: "center", margin: 0,
  });

  addFooter(s, "출처: PM 채용 트렌드 리포트 2024-2026, 글로벌 채용 플랫폼 데이터 종합");
}

// ─── SLIDE 5: CORE MESSAGE (Dark) ───
{
  const s = darkSlide();
  s.addText("AI가 PM을\n대체하는 게 아닙니다.", {
    x: L.mx, y: 0.9, w: L.cw, h: 1.6,
    fontSize: 34, fontFace: F.title,
    color: C.white, align: "center", valign: "middle", margin: 0,
    lineSpacingMultiple: 1.3,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.2, y: 2.75, w: 7.6, h: 0.75,
    fill: { color: C.accent },
  });
  s.addText("AI를 쓰는 PM이, 안 쓰는 PM을 대체합니다.", {
    x: 1.2, y: 2.75, w: 7.6, h: 0.75,
    fontSize: 20, fontFace: F.title,
    color: C.white, align: "center", valign: "middle", margin: 0,
  });
  s.addText("그렇다면, PM만의 고유한 역할은 무엇인가?", {
    x: L.mx, y: 3.9, w: L.cw, h: 0.4,
    fontSize: 14, fontFace: F.body, color: C.midGray, align: "center", margin: 0,
  });
}

// ─── SLIDE 6: PM'S IRREPLACEABLE ROLE ───
{
  const s = lightSlide();
  addTitle(s, "PM만이 할 수 있는 고유한 역할");
  addSubtitle(s, "개발자도 PRD를 쓸 수 있고, AI가 코드도 만들어주는 시대 — PM의 본질이 더 중요해졌다");

  const roles = [
    {
      num: "01", t: "도메인 이해",
      d: "실제 산업 현장의 맥락을 파악하고, 현재 상태에서\n유의미한 방향성을 정의하는 능력",
    },
    {
      num: "02", t: "비즈니스 판단",
      d: "수익성 · 신규 고객 확장력 · 대표/이사회/투자자\n기대치를 종합하여 제품 방향을 결정",
    },
    {
      num: "03", t: "제약 조건 내 최적화",
      d: "주어진 예산 · 기간 · 개발 인력 안에서\n최대 아웃풋을 내는 현실적 스코프 설계",
    },
    {
      num: "04", t: "기능 수준의 우선순위",
      d: "기능 하나하나에 P0/P1/P2를 매기고,\n무엇을 먼저 만들지 결정하는 판단력",
    },
  ];

  roles.forEach((r, i) => {
    const y = 1.15 + i * 0.72;
    // Number badge
    s.addShape(pres.shapes.RECTANGLE, {
      x: L.mx, y, w: 0.5, h: 0.55,
      fill: { color: C.black },
    });
    s.addText(r.num, {
      x: L.mx, y, w: 0.5, h: 0.55,
      fontSize: 14, fontFace: F.title, color: C.white,
      align: "center", valign: "middle", margin: 0,
    });
    // Title
    s.addText(r.t, {
      x: 1.4, y, w: 2.2, h: 0.55,
      fontSize: 15, fontFace: F.title, color: C.black,
      valign: "middle", margin: 0,
    });
    // Description
    s.addText(r.d, {
      x: 3.7, y, w: 5.6, h: 0.55,
      fontSize: 12, fontFace: F.body, color: C.midGray,
      valign: "middle", margin: 0, lineSpacingMultiple: 1.25,
    });
    // Divider
    if (i < roles.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 1.4, y: y + 0.6, w: 7.9, h: 0.01,
        fill: { color: C.lightGray },
      });
    }
  });

  addAccentFooter(s, "AI는 실행 속도를 높여주지만, 무엇을 실행할지 결정하는 것은 PM이다.");
}

// ─── SLIDE 7: PM = CONTEXT ARCHITECT ───
{
  const s = lightSlide();
  addTitle(s, "AI 시대, PM의 본질 = 맥락 설계자");

  // Left card: AI
  addCard(s, L.mx, L.topY, 4.1, 3.0);
  s.addText("AI가 잘하는 것", {
    x: L.mx + 0.2, y: L.topY + 0.1, w: 3.7, h: 0.38,
    fontSize: 14, fontFace: F.title, color: C.midGray, margin: 0,
  });
  s.addText([
    { text: "시장 데이터 수집 · 경쟁사 분석", options: { bullet: true, breakLine: true } },
    { text: "PRD 구조화 · 기능 명세 초안 작성", options: { bullet: true, breakLine: true } },
    { text: "프로토타입 코드 생성 (HTML/React)", options: { bullet: true, breakLine: true } },
    { text: "KPI 프레임워크 제안 · 지표 설계", options: { bullet: true, breakLine: true } },
    { text: "사용자 시나리오 · 엣지 케이스 도출", options: { bullet: true } },
  ], {
    x: L.mx + 0.2, y: L.topY + 0.55, w: 3.7, h: 2.3,
    fontSize: 12, fontFace: F.body, color: C.midGray, margin: 0, lineSpacingMultiple: 1.5,
  });

  // Right card: PM (dark)
  addCard(s, 5.1, L.topY, 4.1, 3.0, { bg: C.black });
  s.addText("PM만이 해야 하는 것", {
    x: 5.3, y: L.topY + 0.1, w: 3.7, h: 0.38,
    fontSize: 14, fontFace: F.title, color: C.accent, margin: 0,
  });
  s.addText([
    { text: "\"이것을 왜 지금 해야 하는가\" 판단", options: { bullet: true, breakLine: true, color: C.white } },
    { text: "트레이드오프 결정 (범위 vs 일정 vs 품질)", options: { bullet: true, breakLine: true, color: C.white } },
    { text: "이해관계자 합의와 우선순위 조율", options: { bullet: true, breakLine: true, color: C.white } },
    { text: "자사 데이터 해석과 비즈니스 판단", options: { bullet: true, breakLine: true, color: C.white } },
    { text: "Go / No-Go 의사결정과 리스크 관리", options: { bullet: true, color: C.white } },
  ], {
    x: 5.3, y: L.topY + 0.55, w: 3.7, h: 2.3,
    fontSize: 12, fontFace: F.body, color: C.white, margin: 0, lineSpacingMultiple: 1.5,
  });

  addAccentFooter(s, "AI는 최고의 부사수. 하지만 방향을 정하는 건 PM이다.");
}

// ─── SLIDE 8: THREE ERAS OVERVIEW ───
{
  const s = lightSlide();
  addTitle(s, "PM의 3가지 시대");

  const eras = [
    { era: "Era 1", name: "Feature PM", period: "~2019", role: "기능 정의자", tool: "Jira · Word · PPT", speed: "분기 단위", bg: C.offWhite, tc: C.black },
    { era: "Era 2", name: "Product-Led PM", period: "2020~24", role: "성장 설계자", tool: "Notion · Figma · A/B", speed: "2주 스프린트", bg: C.offWhite, tc: C.black },
    { era: "Era 3", name: "AI Native PM", period: "2025~", role: "맥락 설계자", tool: "Claude · Cursor · Manyfast", speed: "시간~일 단위", bg: C.black, tc: C.white },
  ];

  eras.forEach((e, i) => {
    const x = L.mx + i * 3.0;
    addCard(s, x, L.topY, 2.75, 3.0, { bg: e.bg });
    // Era label
    s.addText(e.era, {
      x: x + 0.15, y: L.topY + 0.12, w: 2.45, h: 0.25,
      fontSize: L.smallSize, fontFace: F.body, color: i === 2 ? C.accent : C.midGray, bold: true, margin: 0,
    });
    // Name
    s.addText(e.name, {
      x: x + 0.15, y: L.topY + 0.4, w: 2.45, h: 0.4,
      fontSize: 16, fontFace: F.title, color: e.tc, margin: 0,
    });
    // Period
    s.addText(e.period, {
      x: x + 0.15, y: L.topY + 0.82, w: 2.45, h: 0.25,
      fontSize: L.captionSize, fontFace: F.body, color: C.midGray, margin: 0,
    });
    // Divider
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.15, y: L.topY + 1.15, w: 2.45, h: 0.02,
      fill: { color: i === 2 ? C.accent : C.lightGray },
    });
    // Role
    s.addText(e.role, {
      x: x + 0.15, y: L.topY + 1.25, w: 2.45, h: 0.3,
      fontSize: 13, fontFace: F.bold, color: e.tc, margin: 0,
    });
    // Tool
    s.addText(e.tool, {
      x: x + 0.15, y: L.topY + 1.6, w: 2.45, h: 0.25,
      fontSize: L.captionSize, fontFace: F.body, color: C.midGray, margin: 0,
    });
    // Speed
    s.addText("⏱ " + e.speed, {
      x: x + 0.15, y: L.topY + 1.9, w: 2.45, h: 0.25,
      fontSize: L.captionSize, fontFace: F.body, color: i === 2 ? C.accent : C.midGray, margin: 0,
    });
  });

  addFooter(s, "Dennis Yang (Chime PM): Claude Code로 20분 만에 프로토타입 → 팀 미팅에서 실제 동작 시연");
}

// ─── SLIDE 9: ERA DETAILS — TELL → SHOW ───
{
  const s = lightSlide();
  addTitle(s, "\"Tell\"에서 \"Show\"로");
  addSubtitle(s, "PM의 역할 변화: 문서로 설명하던 시대에서, 만들어서 보여주는 시대로");

  const rows = [
    { label: "Feature PM", tell: "PRD 문서로 설명 → 개발팀에 전달\n→ 분기 후 결과 확인", show: "" },
    { label: "Product-Led PM", tell: "Figma 프로토타입 의뢰 →\nA/B 테스트 설계 → 2주 스프린트", show: "" },
    { label: "AI Native PM", tell: "", show: "프롬프트 → PRD → 프로토타입\n직접 생성 → 시간 단위 검증" },
  ];

  const tbl = [
    [
      { text: "시대", options: { fill: { color: C.black }, color: C.white, bold: true, fontFace: F.bold } },
      { text: "기존 방식 (Tell)", options: { fill: { color: C.black }, color: C.white, bold: true, fontFace: F.bold } },
      { text: "새로운 방식 (Show)", options: { fill: { color: C.black }, color: C.white, bold: true, fontFace: F.bold } },
    ],
    [
      { text: "Feature PM", options: { bold: true, fontFace: F.bold } },
      "PRD 문서로 설명 → 개발팀에 전달 → 분기 후 결과 확인",
      { text: "—", options: { color: C.lightGray, align: "center" } },
    ],
    [
      { text: "Product-Led", options: { bold: true, fontFace: F.bold } },
      "Figma 프로토타입 의뢰 → A/B 테스트 → 2주 스프린트",
      { text: "—", options: { color: C.lightGray, align: "center" } },
    ],
    [
      { text: "AI Native", options: { bold: true, fontFace: F.bold, color: C.accent } },
      { text: "—", options: { color: C.lightGray, align: "center" } },
      { text: "프롬프트 → PRD → 프로토타입 직접 생성 → 시간 단위 검증", options: { color: C.accent, bold: true, fontFace: F.bold } },
    ],
  ];
  s.addTable(tbl, {
    x: 0.5, y: 1.15, w: 9.0, colW: [1.5, 3.75, 3.75],
    fontSize: 12, fontFace: F.body,
    border: { pt: 0.5, color: C.lightGray },
    rowH: [0.4, 0.55, 0.55, 0.55], valign: "middle",
  });

  addCard(s, L.mx, 3.5, L.cw, 0.55, { leftAccent: C.accent });
  s.addText("바이브 프로토타이핑 (Vibe Prototyping) — 텍스트 프롬프트만으로 기능적 소프트웨어를 생성하는 새로운 패러다임  (Forbes, 2026)", {
    x: L.mx + 0.2, y: 3.5, w: L.cw - 0.3, h: 0.55,
    fontSize: L.smallSize, fontFace: F.body, color: C.darkGray, valign: "middle", margin: 0,
  });
}

// ─── SLIDE 10: WHAT CHANGED ───
{
  const s = lightSlide();
  addTitle(s, "무엇이 바뀌었나");

  const tbl = [
    [
      { text: "구분", options: { fill: { color: C.black }, color: C.white, bold: true, fontFace: F.bold } },
      { text: "Before", options: { fill: { color: C.black }, color: C.white, bold: true, fontFace: F.bold } },
      { text: "", options: { fill: { color: C.black } } },
      { text: "After (AI Native)", options: { fill: { color: C.black }, color: C.white, bold: true, fontFace: F.bold } },
    ],
    [{ text: "문서", options: { bold: true, fontFace: F.bold } }, "Word → Notion, 수동 작성", "→", { text: "AI가 PRD 초안 생성", options: { color: C.accent, bold: true } }],
    [{ text: "프로토타입", options: { bold: true, fontFace: F.bold } }, "디자이너/개발자에게 의뢰", "→", { text: "PM이 직접 AI로 생성", options: { color: C.accent, bold: true } }],
    [{ text: "검증 속도", options: { bold: true, fontFace: F.bold } }, "수 주 (기획→개발→출시)", "→", { text: "수 시간 (즉시 확인)", options: { color: C.accent, bold: true } }],
    [{ text: "PM 역할", options: { bold: true, fontFace: F.bold } }, "기능 전달자 (Tell)", "→", { text: "맥락 설계자 (Show)", options: { color: C.accent, bold: true } }],
    [{ text: "검증 주기", options: { bold: true, fontFace: F.bold } }, "분기 1회", "→", { text: "주 단위 반복", options: { color: C.accent, bold: true } }],
  ];
  s.addTable(tbl, {
    x: 0.4, y: 1.15, w: 9.2, colW: [1.3, 2.9, 0.3, 4.7],
    fontSize: 13, fontFace: F.body,
    border: { pt: 0.5, color: C.lightGray },
    rowH: [0.4, 0.44, 0.44, 0.44, 0.44, 0.44], valign: "middle",
  });
}

// ─── SLIDE 11: NEW PM SKILLS ───
{
  const s = lightSlide();
  addTitle(s, "AI Native PM의 3가지 무기");

  const skills = [
    { icon: "🎯", t: "프롬프팅", d: "코딩이 아니라, AI에게 의도를 정확히 전달하는 능력.\n맥락(Context)을 잘 구조화하는 것이 핵심." },
    { icon: "🧩", t: "AI 활용점 정의", d: "\"이 제품에서 AI가 어디서 가치를 만드는가?\"를 설계.\nAI가 대체할 수 있는 작업 vs PM이 판단할 작업을 구분." },
    { icon: "⚡", t: "빠른 검증", d: "\"만들어서 확인하기\"를 일상화하는 습관.\nPRD → 프로토타입 → 피드백을 시간 단위로 반복." },
  ];

  skills.forEach((sk, i) => {
    const y = 1.2 + i * 0.85;
    addCard(s, L.mx, y, L.cw, 0.7);
    s.addText(sk.icon, {
      x: L.mx + 0.1, y, w: 0.5, h: 0.7,
      fontSize: 22, align: "center", valign: "middle", margin: 0,
    });
    s.addText(sk.t, {
      x: 1.5, y, w: 2.0, h: 0.7,
      fontSize: 15, fontFace: F.title, color: C.black, valign: "middle", margin: 0,
    });
    s.addText(sk.d, {
      x: 3.6, y, w: 5.5, h: 0.7,
      fontSize: L.smallSize, fontFace: F.body, color: C.midGray, valign: "middle", margin: 0, lineSpacingMultiple: 1.3,
    });
  });

  addAccentFooter(s, "코드를 쓸 줄 몰라도 됩니다. AI에게 무엇을 시킬지 알면 됩니다.");
}

// ─── SLIDE 12: DOCUMENT HIERARCHY ───
{
  const s = lightSlide();
  addTitle(s, "기획 문서의 계층 구조");
  addSubtitle(s, "아래 → 위 참조, 위 → 아래 링크  |  PRD가 SSOT (Single Source of Truth)");

  const docs = [
    { text: "2-Pager", sub: "왜 이걸 하는가?  (리더십 승인용)", accent: C.midGray, level: "L0" },
    { text: "PRD  (SSOT)", sub: "무엇을, 왜, 누구를 위해 만드는가?", accent: C.accent, level: "L1" },
    { text: "Specs · HLD · LLD · ADR", sub: "어떻게 보이고, 어떻게 구현하고, 왜 그렇게 결정했는가?", accent: C.midGray, level: "L2" },
    { text: "Ops", sub: "어떻게 출시 · 운영 · 모니터링하는가?", accent: C.midGray, level: "L3" },
  ];

  docs.forEach((d, i) => {
    const y = 1.15 + i * 0.72;
    // Level badge
    s.addShape(pres.shapes.RECTANGLE, {
      x: L.mx, y: y + 0.05, w: 0.45, h: 0.42,
      fill: { color: d.accent === C.accent ? C.accent : C.lightGray },
    });
    s.addText(d.level, {
      x: L.mx, y: y + 0.05, w: 0.45, h: 0.42,
      fontSize: 9, fontFace: F.bold, color: d.accent === C.accent ? C.white : C.midGray,
      align: "center", valign: "middle", margin: 0,
    });
    // Row bg
    addCard(s, 1.3, y, 8.0, 0.52, { bg: d.accent === C.accent ? "FFF7ED" : C.offWhite, leftAccent: d.accent });
    // Doc name
    s.addText(d.text, {
      x: 1.5, y, w: 3.0, h: 0.52,
      fontSize: 14, fontFace: F.title, color: C.black, valign: "middle", margin: 0,
    });
    // Description
    s.addText(d.sub, {
      x: 4.5, y, w: 4.7, h: 0.52,
      fontSize: L.smallSize, fontFace: F.body, color: C.midGray, valign: "middle", margin: 0,
    });
    // Arrow
    if (i < docs.length - 1) {
      s.addText("↓", {
        x: 1.3, y: y + 0.52, w: 0.5, h: 0.2,
        fontSize: 11, color: C.midGray, align: "center", margin: 0,
      });
    }
  });

  addFooter(s, "참고: Specs = 와이어프레임/UX 흐름  |  HLD = 상위 설계  |  LLD = 상세 설계  |  ADR = 의사결정 기록");
}

// ─── SLIDE 13: WHY → WHAT → HOW ───
{
  const s = lightSlide();
  addTitle(s, "PRD의 핵심: Why → What → How");

  const boxes = [
    { label: "Why", q: "왜 이 문제를 풀어야 하는가?", detail: "§3 문제 정의 · 비즈니스 근거 · 데이터 증거 · 사용자 VOC", color: C.accent },
    { label: "What", q: "무엇을 만드는가?", detail: "§4-§6 솔루션 · 페르소나 · 범위(In/Out) · 기능 명세", color: C.black },
    { label: "How", q: "어떻게 성공을 측정하는가?", detail: "§11 KPI · 실험 설계 · 롤아웃 전략 · Release Gate", color: C.darkGray },
  ];

  boxes.forEach((b, i) => {
    const y = 1.15 + i * 0.9;
    // Label box
    s.addShape(pres.shapes.RECTANGLE, { x: L.mx, y, w: 0.9, h: 0.65, fill: { color: b.color } });
    s.addText(b.label, {
      x: L.mx, y, w: 0.9, h: 0.65,
      fontSize: 16, fontFace: F.title, color: C.white,
      align: "center", valign: "middle", margin: 0,
    });
    // Content row
    addCard(s, 1.75, y, 7.55, 0.65, { bg: C.offWhite });
    s.addText(b.q, {
      x: 1.95, y, w: 3.2, h: 0.65,
      fontSize: 14, fontFace: F.bold, color: C.black, valign: "middle", margin: 0,
    });
    s.addText(b.detail, {
      x: 5.2, y, w: 4.0, h: 0.65,
      fontSize: L.smallSize, fontFace: F.body, color: C.midGray, valign: "middle", margin: 0,
    });
  });

  addAccentFooter(s, "Why가 흔들리면, What과 How는 의미가 없다. 항상 Why부터.");
}

// ─── SLIDE 14: PRD EVALUATION — 3 PERSPECTIVES ───
{
  const s = lightSlide();
  addTitle(s, "PRD 품질 검증: 3가지 관점");
  addSubtitle(s, "Approved 상태 전환을 위한 3-관점 평가 프레임워크  |  각 관점 최소 기준 통과 필수");

  const perspectives = [
    {
      icon: "👔", role: "리더십", q: "이 프로젝트에 투자할 가치가 있는가?",
      checks: "전략 정합성 · 문제 정의 명확성 · ROI 합리성 · 시장 적합성 · 우선순위 정당성",
    },
    {
      icon: "🎨", role: "디자이너", q: "이 PRD만으로 와이어프레임을 그릴 수 있는가?",
      checks: "시나리오 완전성 · UI/UX 플로우 · 가드레일/예외 · 컴포넌트 명세 · P0/P1 기능 정의",
    },
    {
      icon: "⚙️", role: "EM", q: "이 범위를 주어진 기간/리소스로 만들 수 있는가?",
      checks: "성공 지표 측정 가능성 · 비용 추정 · 공수 산정(MD/MM) · 스코프 실현성 · NFR",
    },
  ];

  perspectives.forEach((p, i) => {
    const y = 1.15 + i * 0.9;
    addCard(s, L.mx, y, L.cw, 0.75);
    s.addText(p.icon, {
      x: L.mx + 0.1, y, w: 0.45, h: 0.75,
      fontSize: 20, align: "center", valign: "middle", margin: 0,
    });
    s.addText(p.role, {
      x: 1.35, y, w: 1.1, h: 0.38,
      fontSize: 14, fontFace: F.title, color: C.black, valign: "middle", margin: 0,
    });
    s.addText(p.q, {
      x: 1.35, y: y + 0.35, w: 3.5, h: 0.35,
      fontSize: L.smallSize, fontFace: F.body, color: C.accent, valign: "middle", margin: 0,
    });
    s.addText(p.checks, {
      x: 5.0, y, w: 4.2, h: 0.75,
      fontSize: L.captionSize, fontFace: F.body, color: C.midGray, valign: "middle", margin: 0, lineSpacingMultiple: 1.3,
    });
  });

  addFooter(s, "각 관점 35점 만점, 23점 이상 통과  |  상세 기준: docs/evaluation/ 참조");
}

// ─── SLIDE 15: AI ACCELERATES EACH STEP ───
{
  const s = lightSlide();
  addTitle(s, "AI가 각 단계를 어떻게 바꾸는가");

  const tbl = [
    [
      { text: "단계", options: { fill: { color: C.black }, color: C.white, bold: true, fontFace: F.bold } },
      { text: "기존 소요", options: { fill: { color: C.black }, color: C.white, bold: true, fontFace: F.bold } },
      { text: "AI Native", options: { fill: { color: C.black }, color: C.white, bold: true, fontFace: F.bold } },
      { text: "주요 도구", options: { fill: { color: C.black }, color: C.white, bold: true, fontFace: F.bold } },
    ],
    ["2-Pager", "수일", { text: "수분", options: { bold: true, color: C.accent } }, "Claude, Gemini Deep Research"],
    ["PRD", "1~2주", { text: "수시간", options: { bold: true, color: C.accent } }, "Manyfast, Claude"],
    ["Wireframe", "수일", { text: "수분", options: { bold: true, color: C.accent } }, "Figma AI (Make), v0"],
    ["Prototype", "수주", { text: "수십분", options: { bold: true, color: C.accent } }, "Claude Code, Cursor, Replit"],
    ["배포", "수일", { text: "수분", options: { bold: true, color: C.accent } }, "Vercel, Replit, Lovable"],
  ];
  s.addTable(tbl, {
    x: 0.5, y: 1.15, w: 9.0, colW: [1.2, 1.5, 1.5, 4.8],
    fontSize: 12, fontFace: F.body,
    border: { pt: 0.5, color: C.lightGray },
    rowH: [0.4, 0.44, 0.44, 0.44, 0.44, 0.44], valign: "middle",
  });

  addAccentFooter(s, "전체 흐름: 아이디어 → PRD → 와이어프레임 → 프로토타입 → 배포까지 하루 안에 가능");
}

// ─── SLIDE 16: 5 MAGIC INPUTS ───
{
  const s = lightSlide();
  addTitle(s, "5개 핵심 입력 — PRD의 씨앗");
  addSubtitle(s, "PRD 전체를 쓸 필요 없습니다. 이 5가지만 명확하면 AI가 나머지를 채워줍니다.");

  const inputs = [
    { n: "1", l: "서비스명", q: "뭐라고 부를까?", tip: "직관적이고 기억하기 쉬운 이름" },
    { n: "2", l: "타겟 유저", q: "누구를 위한 건가?", tip: "행동 패턴까지 구체적으로" },
    { n: "3", l: "핵심 문제", q: "어떤 문제를 해결하나?", tip: "정량 수치가 있으면 강력" },
    { n: "4", l: "AI 활용점", q: "AI가 어디서 가치를 만드나?", tip: "AI가 대체할 구체적 작업" },
    { n: "5", l: "성공 기준", q: "어떻게 성공을 아나?", tip: "측정 가능한 숫자로" },
  ];

  inputs.forEach((inp, i) => {
    const y = 1.1 + i * 0.52;
    // Number circle
    s.addShape(pres.shapes.OVAL, { x: L.mx, y: y + 0.04, w: 0.38, h: 0.38, fill: { color: C.black } });
    s.addText(inp.n, {
      x: L.mx, y: y + 0.04, w: 0.38, h: 0.38,
      fontSize: 13, fontFace: F.title, color: C.white,
      align: "center", valign: "middle", margin: 0,
    });
    // Label
    s.addText(inp.l, {
      x: 1.3, y, w: 1.7, h: 0.45,
      fontSize: 14, fontFace: F.title, color: C.black, valign: "middle", margin: 0,
    });
    // Question
    s.addText(inp.q, {
      x: 3.1, y, w: 3.2, h: 0.45,
      fontSize: 13, fontFace: F.body, color: C.darkGray, valign: "middle", margin: 0,
    });
    // Tip
    s.addText(inp.tip, {
      x: 6.4, y, w: 2.9, h: 0.45,
      fontSize: L.captionSize, fontFace: F.body, color: C.midGray, italic: true, valign: "middle", margin: 0,
    });
  });

  // Bottom highlight bar
  addCard(s, L.mx, 3.8, L.cw, 0.45, { bg: C.offWhite });
  s.addText("이 5개만 명확하면 AI가 나머지를 채워줍니다  →  실습 Step 1에서 직접 작성!", {
    x: L.mx, y: 3.8, w: L.cw, h: 0.45,
    fontSize: 12, fontFace: F.bold, color: C.accent,
    align: "center", valign: "middle", margin: 0,
  });
}

// ─── SLIDE 17: TOOL COLLABORATION — MASTER PLAN ───
{
  const s = lightSlide();
  addTitle(s, "AI 도구 협업: 마스터 플랜");
  addSubtitle(s, "하나의 도구가 아닌, 여러 AI 도구를 조합하여 PM 워크플로우를 가속화");

  const workflows = [
    { name: "리서치 → PRD", tools: "Claude + Gemini Deep Research", desc: "시장/경쟁 분석 → 구조화된 PRD 초안" },
    { name: "PRD → 와이어프레임", tools: "Claude + Figma AI (Make)", desc: "PRD 기반 자동 UI 레이아웃 생성" },
    { name: "PRD → 프로토타입", tools: "Claude Code + Cursor", desc: "PRD에서 동작하는 HTML/React 앱 생성" },
    { name: "디자인 → 코드", tools: "Figma + Google Stitch", desc: "Figma 디자인을 코드로 변환" },
    { name: "프로토타입 → 배포", tools: "Replit / Lovable / Vercel", desc: "1-click 배포로 외부 공유 가능" },
  ];

  workflows.forEach((wf, i) => {
    const y = 1.15 + i * 0.52;
    const isOdd = i % 2 === 0;
    addCard(s, L.mx, y, L.cw, 0.42, { bg: isOdd ? C.offWhite : C.white });
    // Stage name
    s.addText(wf.name, {
      x: L.mx + 0.15, y, w: 2.1, h: 0.42,
      fontSize: 12, fontFace: F.title, color: C.black, valign: "middle", margin: 0,
    });
    // Tools
    s.addText(wf.tools, {
      x: 3.0, y, w: 3.0, h: 0.42,
      fontSize: L.smallSize, fontFace: F.bold, color: C.accent, valign: "middle", margin: 0,
    });
    // Description
    s.addText(wf.desc, {
      x: 6.1, y, w: 3.1, h: 0.42,
      fontSize: L.captionSize, fontFace: F.body, color: C.midGray, valign: "middle", margin: 0,
    });
  });

  addAccentFooter(s, "핵심: 어떤 도구를 쓰느냐가 아니라, PM이 '무엇을' 지시할지를 아는 것이 경쟁력");
}

// ─── SLIDE 18: TOOL WORKFLOWS — VISUAL ───
{
  const s = lightSlide();
  addTitle(s, "실전 도구 조합 예시");

  // Workflow 1
  addCard(s, L.mx, 1.15, L.cw, 1.2);
  s.addText("Workflow A:  기획 → 프로토타입 → 배포 (오늘 실습)", {
    x: L.mx + 0.15, y: 1.2, w: 8.0, h: 0.35,
    fontSize: 13, fontFace: F.title, color: C.accent, margin: 0,
  });
  s.addText("Claude (리서치)  →  Manyfast (PRD)  →  Claude Code (프로토타입)  →  Vercel / Replit (배포)", {
    x: L.mx + 0.15, y: 1.6, w: 8.0, h: 0.3,
    fontSize: 12, fontFace: F.body, color: C.black, margin: 0,
  });
  s.addText("5개 입력 → PRD 초안(~5분) → HTML 생성(~15분) → 배포(~2분)  =  총 30분 이내", {
    x: L.mx + 0.15, y: 1.95, w: 8.0, h: 0.3,
    fontSize: L.captionSize, fontFace: F.body, color: C.midGray, margin: 0,
  });

  // Workflow 2
  addCard(s, L.mx, 2.55, L.cw, 1.2);
  s.addText("Workflow B:  디자인 중심 (Figma 활용)", {
    x: L.mx + 0.15, y: 2.6, w: 8.0, h: 0.35,
    fontSize: 13, fontFace: F.title, color: C.black, margin: 0,
  });
  s.addText("Claude (PRD)  →  Figma AI / Make (와이어프레임)  →  Google Stitch (코드 변환)  →  Lovable (배포)", {
    x: L.mx + 0.15, y: 3.0, w: 8.0, h: 0.3,
    fontSize: 12, fontFace: F.body, color: C.black, margin: 0,
  });
  s.addText("디자인 시스템이 중요한 B2C 서비스에 적합  |  Figma → 코드 자동 변환으로 개발 공수 절감", {
    x: L.mx + 0.15, y: 3.35, w: 8.0, h: 0.3,
    fontSize: L.captionSize, fontFace: F.body, color: C.midGray, margin: 0,
  });

  addFooter(s, "💡 Google AI Studio: Gemini 기반 프롬프트 테스트 · 멀티모달 분석에 활용 가능");
}

// ─── SLIDE 19: DEMO PRD ───
{
  const s = lightSlide();
  addTitle(s, "데모: 오늘의 점심 메이트 — PRD");

  // Left content
  const items = [
    { icon: "🎯", label: "문제", text: "직장인 12분 × 250일 = 연 50시간\n'뭐 먹지?' 고민" },
    { icon: "💡", label: "솔루션", text: "기분 + 예산 + 위치 →\nAI 맞춤 메뉴 3개 추천" },
    { icon: "📊", label: "KPI", text: "추천 수락률 60%\n재사용률 주 3회, NPS 40+" },
    { icon: "🤖", label: "AI 모델", text: "Claude Haiku — 월 $15\np95 응답 < 2초" },
  ];

  items.forEach((it, i) => {
    const y = 1.15 + i * 0.68;
    addCard(s, L.mx, y, 5.2, 0.55, { bg: i % 2 === 0 ? C.offWhite : C.white });
    s.addText(it.icon + "  " + it.label, {
      x: L.mx + 0.1, y, w: 1.5, h: 0.55,
      fontSize: 12, fontFace: F.title, color: C.black, valign: "middle", margin: 0,
    });
    s.addText(it.text, {
      x: 2.4, y, w: 3.4, h: 0.55,
      fontSize: L.smallSize, fontFace: F.body, color: C.darkGray, valign: "middle", margin: 0, lineSpacingMultiple: 1.2,
    });
  });

  // Right placeholder
  addPlaceholder(s, 6.2, 1.15, 3.1, 2.55, "PRD.md 화면 캡처\n(§3 문제 정의 + §11 KPI)");

  addFooter(s, "📋  화면 공유: PRD.md 라이브 시연");
}

// ─── SLIDE 20: DEMO PROTOTYPE ───
{
  const s = lightSlide();
  addTitle(s, "데모: 프로토타입 — 15분 만에 완성");

  // Left content
  addBody(s, [
    { text: "단일 HTML 파일, 외부 API 없음", options: { bullet: true, breakLine: true, bold: true } },
    { text: "기분 선택 → 예산 선택 → AI 추천 결과 3개", options: { bullet: true, breakLine: true } },
    { text: "모바일 반응형, 실제 버튼 동작 포함", options: { bullet: true, breakLine: true } },
    { text: "6가지 기분 × 3가지 예산 = 54개 메뉴 데이터", options: { bullet: true, breakLine: true } },
    { text: "수락/거절 피드백 UI 포함", options: { bullet: true } },
  ], { w: 5.0, fs: 13 });

  // Right placeholder
  addPlaceholder(s, 6.0, 1.15, 3.3, 2.8, "프로토타입 모바일 화면 캡처\n(기분 선택 + 추천 결과 화면)");

  addFooter(s, "📱  화면 공유: 프로토타입 라이브 시연  |  demo-prototype.html");
}

// ─── SLIDE 21: TRANSITION (Dark) ───
{
  const s = darkSlide();
  s.addText("이제 여러분 차례입니다", {
    x: L.mx, y: 1.1, w: L.cw, h: 0.7,
    fontSize: 34, fontFace: F.title, color: C.white, align: "center", margin: 0,
  });
  accentLine(s, 2.0);
  s.addText("아이디어  →  PRD  →  프로토타입  →  배포", {
    x: L.mx, y: 2.2, w: L.cw, h: 0.5,
    fontSize: 18, fontFace: F.bold, color: C.accent, align: "center", margin: 0,
  });
  s.addText("60분 안에 직접 체험합니다", {
    x: L.mx, y: 2.9, w: L.cw, h: 0.4,
    fontSize: 15, fontFace: F.body, color: C.midGray, align: "center", margin: 0,
  });
  s.addText("완성도가 아닙니다.\n과정을 경험하는 것이 목적입니다.", {
    x: 2.0, y: 3.6, w: 6.0, h: 0.8,
    fontSize: 14, fontFace: F.body, color: C.white, align: "center", margin: 0,
    lineSpacingMultiple: 1.5,
  });
  s.addText("🕐  잠시 쉬고, 19:20에 실습 시작!", {
    x: L.mx, y: 4.6, w: L.cw, h: 0.3,
    fontSize: 12, fontFace: F.body, color: C.midGray, align: "center", margin: 0,
  });
}

// ══════════════════════════════════════════════════════
//  PART 2: WORKSHOP SLIDES
// ══════════════════════════════════════════════════════

// ─── SLIDE 22: WORKSHOP TITLE (Dark) ───
{
  const s = darkSlide();
  accentLine(s, 1.7);
  s.addText("WORKSHOP", {
    x: L.mx, y: 1.85, w: L.cw, h: 0.9,
    fontSize: 42, fontFace: F.title, color: C.white, margin: 0,
  });
  s.addText("내 아이디어를 60분 만에 프로토타입으로", {
    x: L.mx, y: 2.9, w: L.cw, h: 0.4,
    fontSize: 16, fontFace: F.body, color: C.midGray, margin: 0,
  });
  s.addText("19:20 ~ 20:20", {
    x: L.mx, y: 3.4, w: L.cw, h: 0.35,
    fontSize: 13, fontFace: F.bold, color: C.accent, margin: 0,
  });
}

// ─── SLIDE 23: WORKSHOP FLOW ───
{
  const s = lightSlide();
  addTitle(s, "실습 흐름");

  const steps = [
    { l: "Step 0", t: "10분", d: "환경 세팅 + 트랙 선택", detail: "Manyfast · Claude · 메모장 준비" },
    { l: "Step 1", t: "15분", d: "아이디어 → PRD 재료 (5개 항목)", detail: "서비스명/타겟/문제/AI활용/성공기준" },
    { l: "Step 2", t: "15분", d: "Manyfast.io → PRD 초안", detail: "PRD 생성 + 검수 포인트 확인" },
    { l: "Step 3", t: "15분", d: "Claude → HTML 프로토타입", detail: "프롬프트 → 생성 → 확인 → 배포" },
    { l: "Buffer", t: "5분", d: "저장 + 발표 준비", detail: "결과물 저장, 엘리베이터 피치" },
  ];

  steps.forEach((st, i) => {
    const y = 1.15 + i * 0.58;
    const isLast = i === steps.length - 1;
    // Badge
    s.addShape(pres.shapes.RECTANGLE, {
      x: L.mx, y: y + 0.02, w: 1.1, h: 0.42,
      fill: { color: isLast ? C.lightGray : C.black },
    });
    s.addText(st.l, {
      x: L.mx, y: y + 0.02, w: 1.1, h: 0.42,
      fontSize: L.smallSize, fontFace: F.title, color: isLast ? C.black : C.white,
      align: "center", valign: "middle", margin: 0,
    });
    // Time
    s.addText(st.t, {
      x: 2.0, y, w: 0.8, h: 0.46,
      fontSize: 12, fontFace: F.bold, color: C.midGray, valign: "middle", margin: 0,
    });
    // Description
    s.addText(st.d, {
      x: 2.9, y, w: 3.5, h: 0.46,
      fontSize: 13, fontFace: F.bold, color: C.black, valign: "middle", margin: 0,
    });
    // Detail
    s.addText(st.detail, {
      x: 6.5, y, w: 2.8, h: 0.46,
      fontSize: L.captionSize, fontFace: F.body, color: C.midGray, valign: "middle", margin: 0,
    });
  });
}

// ─── SLIDE 24: STEP 0 — SETUP + TRACK ───
{
  const s = lightSlide();
  addTitle(s, "Step 0: 환경 세팅 + 트랙 선택");

  // Checklist
  const checks = [
    "Manyfast.io 로그인 완료",
    "Claude.ai 또는 Claude Code 접속 완료",
    "메모장 (Notion / Apple Notes / 메모장) 준비",
    "작업 폴더 생성 (선택사항)",
  ];
  checks.forEach((c, i) => {
    s.addText("☐  " + c, {
      x: L.mx, y: 1.15 + i * 0.4, w: 4.2, h: 0.35,
      fontSize: 13, fontFace: F.body, color: C.black, margin: 0,
    });
  });

  // Track cards
  addCard(s, 5.2, 1.15, 4.1, 1.15, { bg: C.offWhite });
  s.addText("🟢  공통 트랙", {
    x: 5.4, y: 1.2, w: 3.7, h: 0.3,
    fontSize: 13, fontFace: F.title, color: C.black, margin: 0,
  });
  s.addText("강사 주제 따라가기 (오늘의 점심 메이트)\n처음 해보는 분 추천!", {
    x: 5.4, y: 1.55, w: 3.7, h: 0.65,
    fontSize: L.smallSize, fontFace: F.body, color: C.darkGray, margin: 0, lineSpacingMultiple: 1.4,
  });

  addCard(s, 5.2, 2.5, 4.1, 1.15, { bg: C.offWhite, leftAccent: C.accent });
  s.addText("🔵  자유 트랙", {
    x: 5.45, y: 2.55, w: 3.7, h: 0.3,
    fontSize: 13, fontFace: F.title, color: C.accent, margin: 0,
  });
  s.addText("본인 아이디어로 자율 진행\n핵심 기능 1개로 좁히기!", {
    x: 5.45, y: 2.9, w: 3.7, h: 0.65,
    fontSize: L.smallSize, fontFace: F.body, color: C.darkGray, margin: 0, lineSpacingMultiple: 1.4,
  });

  // Placeholder
  addPlaceholder(s, L.mx, 3.85, 4.2, 0.55, "Manyfast.io 로그인 화면 캡처");
}

// ─── SLIDE 25: STEP 1 — TEMPLATE ───
{
  const s = lightSlide();
  addTitle(s, "Step 1: 5개 항목 채우기");

  addCard(s, 0.9, 1.1, 8.2, 2.8, { bg: C.offWhite });

  const fields = [
    "1.  서비스명:  ___________________________________",
    "2.  타겟 유저:  ___________________________________",
    "3.  핵심 문제:  ___________________________________",
    "4.  AI 활용점:  ___________________________________",
    "5.  성공 기준:  ___________________________________",
  ];
  fields.forEach((f, i) => {
    s.addText(f, {
      x: 1.2, y: 1.3 + i * 0.45, w: 7.6, h: 0.4,
      fontSize: 15, fontFace: F.body, color: C.black, margin: 0,
    });
  });

  s.addText("⏱  10분 안에 채워주세요!", {
    x: L.mx, y: 4.15, w: L.cw, h: 0.3,
    fontSize: 13, fontFace: F.bold, color: C.accent, align: "center", margin: 0,
  });
}

// ─── SLIDE 26: STEP 1 — EXAMPLE ───
{
  const s = lightSlide();
  addTitle(s, "Step 1: 예시 — 오늘의 점심 메이트");

  addCard(s, 0.9, 1.1, 8.2, 2.8, { bg: C.offWhite, leftAccent: C.accent });

  const filled = [
    { l: "1.  서비스명:", v: "  오늘의 점심 메이트" },
    { l: "2.  타겟 유저:", v: "  점심 메뉴 고민이 많은 직장인 (강남/판교 오피스)" },
    { l: "3.  핵심 문제:", v: "  매일 '뭐 먹지?' 고민에 12분 낭비, 65% 같은 메뉴 반복" },
    { l: "4.  AI 활용점:", v: "  기분/예산 기반 맞춤 메뉴 3개 추천 (Claude Haiku)" },
    { l: "5.  성공 기준:", v: "  추천 수락률 60%, 주간 재사용 3회 이상" },
  ];
  filled.forEach((f, i) => {
    s.addText([
      { text: f.l, options: { bold: true, fontFace: F.bold } },
      { text: f.v, options: { color: C.accent } },
    ], {
      x: 1.2, y: 1.3 + i * 0.45, w: 7.6, h: 0.4,
      fontSize: 14, fontFace: F.body, color: C.black, margin: 0,
    });
  });
}

// ─── SLIDE 27: STEP 1 — PEER REVIEW ───
{
  const s = lightSlide();
  addTitle(s, "Step 1: 짝꿍 피드백");

  s.addText("옆 사람에게 보여주세요", {
    x: L.mx, y: 1.3, w: L.cw, h: 0.6,
    fontSize: 28, fontFace: F.title, color: C.black, align: "center", valign: "middle", margin: 0,
  });

  addCard(s, 2.0, 2.2, 6.0, 1.2, { bg: C.offWhite });
  s.addText("\"이 서비스를 당장 쓸 것 같나요?\"", {
    x: 2.2, y: 2.3, w: 5.6, h: 0.4,
    fontSize: 16, fontFace: F.bold, color: C.accent, align: "center", margin: 0,
  });
  s.addText("네 → 좋은 신호! 🎯    |    글쎄 → 핵심 문제 다시 점검 🔍", {
    x: 2.2, y: 2.85, w: 5.6, h: 0.35,
    fontSize: 13, fontFace: F.body, color: C.darkGray, align: "center", margin: 0,
  });

  addFooter(s, "💡  짝꿍의 첫 반응이 냉담하면, 문제 정의를 더 날카롭게 다듬어보세요");
}

// ─── SLIDE 28: STEP 2 — MANYFAST ───
{
  const s = lightSlide();
  addTitle(s, "Step 2: Manyfast.io → PRD 초안 생성");

  addBody(s, [
    { text: "1.  새 프로젝트 생성 (프로젝트명 입력)", options: { breakLine: true, bold: true } },
    { text: "2.  5개 항목을 프로젝트 설명에 붙여넣기", options: { breakLine: true } },
    { text: "3.  PRD 생성 실행 (~1분 소요)", options: { breakLine: true } },
    { text: "4.  핵심 기능 부분만 복사 → 메모장 저장", options: { breakLine: true, bold: true } },
  ], { w: 5.0, fs: 14 });

  // Placeholder for Manyfast screenshot
  addPlaceholder(s, 6.0, 1.15, 3.3, 2.0, "Manyfast.io PRD 생성 화면 캡처\n(입력 → 결과)");

  // Warning
  addCard(s, L.mx, 3.6, L.cw, 0.55, { bg: C.warmBg });
  s.addText("⚠️  PRD 전체 복사 금지 — 핵심 기능 3줄 요약만 저장 (토큰 절감)", {
    x: L.mx + 0.15, y: 3.6, w: L.cw - 0.3, h: 0.55,
    fontSize: 12, fontFace: F.bold, color: C.warmText, valign: "middle", margin: 0,
  });
}

// ─── SLIDE 29: STEP 2 — PRD CHECKPOINT ───
{
  const s = lightSlide();
  addTitle(s, "Step 2: PRD 검수 포인트");
  addSubtitle(s, "AI가 생성한 PRD를 그대로 쓰지 마세요. PM의 검증이 반드시 필요합니다.");

  const checks = [
    { check: "문제 정의에 구체적 수치가 있는가?", bad: "사용자들이 불편해한다", good: "직장인 82%가 매일 12분 소비" },
    { check: "In Scope / Out of Scope가 구분되어 있는가?", bad: "추천 기능 구현", good: "In: 개인 추천 / Out: 그룹, 예약, 결제" },
    { check: "성공 지표에 측정 가능한 숫자가 있는가?", bad: "사용자 만족도 향상", good: "수락률 60%, NPS 40+, WAU 1000" },
  ];

  checks.forEach((c, i) => {
    const y = 1.15 + i * 0.85;
    addCard(s, L.mx, y, L.cw, 0.7, { bg: C.offWhite });
    s.addText("✅  " + c.check, {
      x: L.mx + 0.1, y, w: L.cw - 0.2, h: 0.3,
      fontSize: 13, fontFace: F.bold, color: C.black, margin: 0,
    });
    s.addText([
      { text: "✗ ", options: { color: "DC2626", bold: true } },
      { text: c.bad, options: { color: "DC2626" } },
      { text: "   →   ", options: { color: C.midGray } },
      { text: "✓ ", options: { color: "16A34A", bold: true } },
      { text: c.good, options: { color: "16A34A" } },
    ], {
      x: L.mx + 0.3, y: y + 0.32, w: L.cw - 0.5, h: 0.3,
      fontSize: L.smallSize, fontFace: F.body, margin: 0,
    });
  });

  addAccentFooter(s, "원칙: 구체적 > 추상적  |  숫자 > 형용사  |  링크 > 복사  (PRD 작성 5대 원칙)");
}

// ─── SLIDE 30: STEP 3 — PROMPT ───
{
  const s = lightSlide();
  addTitle(s, "Step 3: Claude → 프로토타입 생성");

  // Code block
  s.addShape(pres.shapes.RECTANGLE, { x: L.mx, y: 1.1, w: L.cw, h: 2.6, fill: { color: C.darkGray } });
  s.addText([
    { text: "아래 PRD를 기반으로 모바일 웹 UI 프로토타입을\nHTML 단일 파일로 만들어줘.\n\n", options: { color: C.white } },
    { text: "[서비스명]: ", options: { color: C.midGray } },
    { text: "오늘의 점심 메이트\n", options: { color: C.accent } },
    { text: "[핵심 기능]: ", options: { color: C.midGray } },
    { text: "기분 선택 → 예산 선택 → 메뉴 3개 추천\n", options: { color: C.accent } },
    { text: "[조건]: ", options: { color: C.midGray } },
    { text: "단일 HTML / 모바일 반응형 / 한국어 UI\n", options: { color: C.accent } },
    { text: "[디자인]: ", options: { color: C.midGray } },
    { text: "모던 카드형 UI, 따뜻한 컬러 톤", options: { color: C.accent } },
  ], {
    x: L.mx + 0.3, y: 1.3, w: L.cw - 0.6, h: 2.2,
    fontSize: 12, fontFace: F.code, margin: 0, lineSpacingMultiple: 1.35,
  });

  s.addText("💡 프롬프트를 복사해서 Claude.ai 또는 Claude Code에 붙여넣기  |  필요시 수정 프롬프트 추가", {
    x: L.mx, y: 3.9, w: L.cw, h: 0.3,
    fontSize: L.smallSize, fontFace: F.body, color: C.accent, align: "center", margin: 0,
  });
}

// ─── SLIDE 31: STEP 3 — TROUBLESHOOTING ───
{
  const s = lightSlide();
  addTitle(s, "Step 3: 트러블슈팅");

  const tbl = [
    [
      { text: "문제", options: { fill: { color: C.black }, color: C.white, bold: true, fontFace: F.bold } },
      { text: "해결 방법", options: { fill: { color: C.black }, color: C.white, bold: true, fontFace: F.bold } },
    ],
    ["HTML 파일이 안 열림", "확장자가 .html인지 확인, 브라우저로 드래그 앤 드롭"],
    ["화면이 하얗게만 나옴", "Claude에게 '콘솔 오류 확인해줘' 재요청"],
    ["디자인이 깨져 보임", "'모바일 375px에 맞게 CSS 수정해줘' 재요청"],
    ["응답이 중간에 끊김", "'이어서 작성해줘' 또는 '남은 부분 완성해줘' 입력"],
    ["기능이 동작하지 않음", "'버튼 클릭 이벤트가 작동하도록 JS 수정해줘' 재요청"],
  ];
  s.addTable(tbl, {
    x: 0.5, y: 1.15, w: 9.0, colW: [2.5, 6.5],
    fontSize: 12, fontFace: F.body,
    border: { pt: 0.5, color: C.lightGray },
    rowH: [0.38, 0.4, 0.4, 0.4, 0.4, 0.4], valign: "middle",
  });

  addFooter(s, "💡 AI 응답이 마음에 안 들면? → 더 구체적인 지시를 추가하면 됩니다 (\"~처럼 바꿔줘\")");
}

// ─── SLIDE 32: DEPLOYMENT OPTIONS ───
{
  const s = lightSlide();
  addTitle(s, "보너스: 프로토타입 배포하기");
  addSubtitle(s, "만든 프로토타입을 외부에 공유하고 싶다면? 1-click 배포 서비스를 활용하세요.");

  const deploys = [
    { name: "Replit", desc: "HTML 파일 업로드 → 즉시 배포\n무료 플랜으로 충분", use: "빠른 테스트 공유", bg: C.offWhite },
    { name: "Lovable", desc: "프롬프트 기반 앱 생성 + 자동 배포\nAI가 디자인까지 담당", use: "비개발자 친화적", bg: C.offWhite },
    { name: "Vercel", desc: "Git 연동 자동 배포\n프로덕션 수준 호스팅", use: "개발팀 협업 시", bg: C.offWhite },
  ];

  deploys.forEach((d, i) => {
    const x = L.mx + i * 3.0;
    addCard(s, x, 1.15, 2.75, 2.6, { bg: d.bg });
    s.addText(d.name, {
      x: x + 0.15, y: 1.25, w: 2.45, h: 0.35,
      fontSize: 16, fontFace: F.title, color: C.accent, margin: 0,
    });
    s.addText(d.desc, {
      x: x + 0.15, y: 1.7, w: 2.45, h: 0.8,
      fontSize: L.smallSize, fontFace: F.body, color: C.darkGray, margin: 0, lineSpacingMultiple: 1.3,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.15, y: 2.6, w: 2.45, h: 0.02, fill: { color: C.lightGray },
    });
    s.addText("추천: " + d.use, {
      x: x + 0.15, y: 2.7, w: 2.45, h: 0.3,
      fontSize: L.captionSize, fontFace: F.bold, color: C.midGray, margin: 0,
    });
  });

  addFooter(s, "오늘 실습에서는 로컬 HTML 파일로 충분합니다. 배포는 선택사항!");
}

// ─── SLIDE 33: AI 자동화 성장 로드맵 ───
{
  const s = lightSlide();
  addTitle(s, "Next Level: AI 자동화로 생산성 높이기");
  addSubtitle(s, "Claude는 요청하면 다 해주지만, 자주 하는 작업을 자동화하면 속도가 달라집니다");

  // 피라미드 구조: 아래부터 위로
  const levels = [
    {
      label: "지금 여기", badge: "Lv.1", bg: C.offWhite, badgeBg: C.lightGray, badgeColor: C.black,
      title: "대화형 사용",
      desc: "Claude에게 하나씩 요청  →  PRD 생성, 프로토타입 제작",
    },
    {
      label: "", badge: "Lv.2", bg: C.offWhite, badgeBg: C.darkGray, badgeColor: C.white,
      title: "MCP + Skill 세팅",
      desc: "MCP: Jira·Slack 등 외부 서비스 연결  |  Skill: PM별 자주 쓰는 명령 미리 등록",
    },
    {
      label: "", badge: "Lv.3", bg: C.offWhite, badgeBg: C.darkGray, badgeColor: C.white,
      title: "Agent + Plugin 구성",
      desc: "Agent: 복잡한 작업을 자동 수행하는 AI 비서  |  Plugin: MCP+Skill을 묶어 원클릭 실행",
    },
    {
      label: "", badge: "Lv.4", bg: C.black, badgeBg: C.accent, badgeColor: C.white,
      title: "PM 조직 통합 자동화",
      desc: "팀 공통 Skill·Agent·Plugin을 표준화  →  온보딩 1일 내 세팅 완료",
    },
  ];

  levels.forEach((lv, i) => {
    const y = 1.1 + i * 0.7;
    // Card
    addCard(s, L.mx, y, L.cw, 0.58, { bg: lv.bg });
    // Badge
    s.addShape(pres.shapes.RECTANGLE, {
      x: L.mx + 0.08, y: y + 0.08, w: 0.5, h: 0.42,
      fill: { color: lv.badgeBg },
    });
    s.addText(lv.badge, {
      x: L.mx + 0.08, y: y + 0.08, w: 0.5, h: 0.42,
      fontSize: 10, fontFace: F.title, color: lv.badgeColor,
      align: "center", valign: "middle", margin: 0,
    });
    // Title
    s.addText(lv.title, {
      x: 1.5, y, w: 2.3, h: 0.58,
      fontSize: 13, fontFace: F.title, color: lv.bg === C.black ? C.white : C.black,
      valign: "middle", margin: 0,
    });
    // Description
    s.addText(lv.desc, {
      x: 3.9, y, w: 5.3, h: 0.58,
      fontSize: L.captionSize, fontFace: F.body,
      color: lv.bg === C.black ? C.midGray : C.midGray,
      valign: "middle", margin: 0, lineSpacingMultiple: 1.25,
    });
    // "지금 여기" label
    if (lv.label) {
      s.addText("← " + lv.label, {
        x: L.mx + L.cw - 1.2, y: y + 0.05, w: 1.1, h: 0.25,
        fontSize: 9, fontFace: F.bold, color: C.accent, align: "right", margin: 0,
      });
    }
  });

  addAccentFooter(s, "자동화는 한 번에 하는 게 아닙니다. 반복되는 작업부터 하나씩 — 그게 PM의 생산성입니다.");
}

// ══════════════════════════════════════════════════════
// CASE STUDY: AI DOC FEEDBACK LOOP (v02 additions, 2026-05-19)
// 기존 페이지(SLIDE 1~33)는 건드리지 않고, Closing 앞에 3슬라이드 추가.
// 컨텍스트: SLIDE 33 Lv.4 "PM 조직 통합 자동화"의 실제 사례
// ══════════════════════════════════════════════════════

// ─── SLIDE 34: CASE — AI DOC FEEDBACK LOOP (Why) ───
{
  const s = lightSlide();
  addTitle(s, "Case: AI Doc Feedback Loop");
  addSubtitle(s, "Lv.4 \"PM 조직 통합 자동화\"의 실사례 — AI가 빠르게 쓰는 만큼, 사람 피드백도 같은 속도로 다시 AI에게.");

  const colW = 4.1, colY = 1.3, colH = 3.0;

  // AS-IS
  addCard(s, L.mx, colY, colW, colH, { bg: C.offWhite });
  s.addText("AS-IS", {
    x: L.mx + 0.15, y: colY + 0.1, w: colW - 0.3, h: 0.3,
    fontSize: 11, fontFace: F.bold, color: C.midGray, margin: 0,
  });
  s.addText("피드백이 4채널에 분산", {
    x: L.mx + 0.15, y: colY + 0.4, w: colW - 0.3, h: 0.4,
    fontSize: 16, fontFace: F.title, color: C.black, margin: 0,
  });
  s.addText([
    { text: "· Confluence 인라인 댓글\n", options: {} },
    { text: "· GitHub PR Review\n", options: {} },
    { text: "· Slack DM / 쓰레드\n", options: {} },
    { text: "· 회의 노트\n\n", options: {} },
    { text: "PM이 통합 정리에 ", options: { color: C.midGray } },
    { text: "주 5~10시간", options: { color: C.accent, bold: true } },
    { text: " 소요\n동일 피드백 ", options: { color: C.midGray } },
    { text: "재발생률 30%+", options: { color: C.accent, bold: true } },
  ], {
    x: L.mx + 0.15, y: colY + 0.9, w: colW - 0.3, h: colH - 1.0,
    fontSize: 12, fontFace: F.body, color: C.darkGray,
    margin: 0, lineSpacingMultiple: 1.45, valign: "top",
  });

  // TO-BE
  const tox = L.mx + colW + 0.4;
  addCard(s, tox, colY, colW, colH, { bg: C.warmBg, leftAccent: C.accent });
  s.addText("TO-BE", {
    x: tox + 0.15, y: colY + 0.1, w: colW - 0.3, h: 0.3,
    fontSize: 11, fontFace: F.bold, color: C.warmText, margin: 0,
  });
  s.addText("웹 한 화면 + 저장 한 번", {
    x: tox + 0.15, y: colY + 0.4, w: colW - 0.3, h: 0.4,
    fontSize: 16, fontFace: F.title, color: C.black, margin: 0,
  });
  s.addText([
    { text: "· 좌·중·우 3패널 (트리 / MD / 코멘트)\n", options: {} },
    { text: "· 6카테고리 × 2계층 자동 태깅\n", options: {} },
    { text: "· '피드백 저장' 클릭 한 번에\n", options: {} },
    { text: "    → 원본+이력 MD\n", options: { color: C.accent } },
    { text: "    → AI 개선 요약 MD (카테고리별 3개)\n\n", options: { color: C.accent } },
    { text: "사이클 타임 ", options: { color: C.warmText } },
    { text: "1~2일 → 1~2시간", options: { color: C.accent, bold: true } },
  ], {
    x: tox + 0.15, y: colY + 0.9, w: colW - 0.3, h: colH - 1.0,
    fontSize: 12, fontFace: F.body, color: C.darkGray,
    margin: 0, lineSpacingMultiple: 1.45, valign: "top",
  });

  addAccentFooter(s, "AI가 빠르게 쓰는 만큼, 사람 피드백도 같은 속도로 다시 AI에게 흘려보내는 \"루프\"가 필요합니다.");
}

// ─── SLIDE 35: 6 CATEGORY × 2 LEVEL TAXONOMY ───
{
  const s = lightSlide();
  addTitle(s, "분류 체계: 6카테고리 × 2계층");
  addSubtitle(s, "모든 피드백·AI 개선안·점수 시각화가 이 분류 체계를 공유합니다.");

  const catColor = {
    "정책": "8B5CF6", "컨텍스트": "3B82F6", "문제": "EF4444",
    "해결점": "10B981", "기능": "F97316", "화면": "06B6D4",
  };
  const catEn = {
    "정책": "Policy", "컨텍스트": "Context", "문제": "Problem",
    "해결점": "Solution", "기능": "Feature", "화면": "Screen",
  };

  const rows = [
    { label: "High-Level Context", sub: "프로젝트·프로덕트 세계관 · 전략 판단", cats: ["정책", "컨텍스트", "문제"], y: 1.3 },
    { label: "Low-Level Spec",     sub: "UX · 코드 구현을 위한 상세 정책",      cats: ["해결점", "기능", "화면"],   y: 2.6 },
  ];

  rows.forEach(row => {
    s.addText(row.label, {
      x: L.mx, y: row.y, w: 2.5, h: 0.4,
      fontSize: 13, fontFace: F.title, color: C.black, margin: 0,
    });
    s.addText(row.sub, {
      x: L.mx, y: row.y + 0.42, w: 2.5, h: 0.5,
      fontSize: L.captionSize, fontFace: F.body, color: C.midGray,
      margin: 0, lineSpacingMultiple: 1.3,
    });
    row.cats.forEach((cat, i) => {
      const cx = 3.0 + i * 2.1, cy = row.y, cw = 2.0, ch = 1.05;
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx, y: cy, w: cw, h: ch, fill: { color: catColor[cat] },
      });
      s.addText(cat, {
        x: cx, y: cy + 0.18, w: cw, h: 0.4,
        fontSize: 18, fontFace: F.title, color: C.white,
        align: "center", margin: 0,
      });
      s.addText(catEn[cat], {
        x: cx, y: cy + 0.62, w: cw, h: 0.3,
        fontSize: L.captionSize, fontFace: F.body, color: C.white,
        align: "center", margin: 0,
      });
    });
  });

  // Bottom: 산출되는 두 종류 MD
  const oy = 3.95;
  s.addText("📄  피드백 저장 시 산출되는 두 종류 MD", {
    x: L.mx, y: oy, w: L.cw, h: 0.35,
    fontSize: 13, fontFace: F.title, color: C.black, margin: 0,
  });
  addCard(s, L.mx, oy + 0.4, 4.3, 0.62, { bg: C.offWhite, leftAccent: "1F883D" });
  s.addText([
    { text: "원본 + 피드백 이력 MD\n", options: { fontSize: 12, bold: true, color: C.black, fontFace: F.bold } },
    { text: "카테고리별 시각·작성자·본문 누적 테이블", options: { fontSize: L.captionSize, color: C.midGray } },
  ], {
    x: L.mx + 0.18, y: oy + 0.42, w: 4.0, h: 0.58,
    fontFace: F.body, margin: 0, lineSpacingMultiple: 1.25, valign: "middle",
  });
  addCard(s, L.mx + 4.45, oy + 0.4, 4.15, 0.62, { bg: C.warmBg, leftAccent: C.accent });
  s.addText([
    { text: "AI 개선 요약 MD\n", options: { fontSize: 12, bold: true, color: C.warmText, fontFace: F.bold } },
    { text: "카테고리별 핵심 정리 1줄 + 개선안 3개", options: { fontSize: L.captionSize, color: C.warmText } },
  ], {
    x: L.mx + 4.63, y: oy + 0.42, w: 3.9, h: 0.58,
    fontFace: F.body, margin: 0, lineSpacingMultiple: 1.25, valign: "middle",
  });

  addFooter(s, "AI 추천 원칙: 카테고리별 3개 (피드백이 있으면 그대로 정리, 없으면 AI 아이디어 3개)");
}

// ─── SLIDE 36: LOCAL-FIRST WEB APP DEMO ───
{
  const s = lightSlide();
  addTitle(s, "데모: Local-first 웹 앱");
  addSubtitle(s, "Express + Vanilla JS · Claude/Codex CLI 자동 연동 · MD 호환 (GitHub/VS Code에서도 깨짐 없음)");

  const py = 1.3, ph = 2.35;

  // Left — Tree
  addCard(s, L.mx, py, 1.6, ph, { bg: C.offWhite });
  s.addText("문서 트리", {
    x: L.mx + 0.1, y: py + 0.08, w: 1.4, h: 0.28,
    fontSize: 10, fontFace: F.bold, color: C.midGray, margin: 0,
  });
  s.addText("📁 projects\n  📁 26Q2_AI-Doc-...\n    📁 prd\n      📄 PRD.md\n      📄 2pager.md\n    📁 specs\n  📁 26Q2_Fastcampus\n📁 docs", {
    x: L.mx + 0.1, y: py + 0.4, w: 1.45, h: 1.9,
    fontSize: 8, fontFace: F.code, color: C.darkGray, margin: 0, lineSpacingMultiple: 1.45,
  });

  // Center — MD render
  const cx = L.mx + 1.7;
  s.addShape(pres.shapes.RECTANGLE, {
    x: cx, y: py, w: 4.6, h: ph, fill: { color: C.white },
    line: { color: C.lightGray, width: 1 },
  });
  s.addText("# AI Doc Feedback Loop PRD", {
    x: cx + 0.15, y: py + 0.12, w: 4.3, h: 0.32,
    fontSize: 13, fontFace: F.title, color: C.black, margin: 0,
  });
  s.addText("## §3. Problem Definition  💬 2", {
    x: cx + 0.15, y: py + 0.55, w: 4.3, h: 0.28,
    fontSize: 11, fontFace: F.bold, color: C.black, margin: 0,
  });
  s.addText("피드백 4채널 분산 → PM 주 5~10h 수작업. AI 초안 30분 vs 반영본 3시간+ ...", {
    x: cx + 0.15, y: py + 0.88, w: 4.3, h: 0.5,
    fontSize: 9, fontFace: F.body, color: C.midGray, margin: 0, lineSpacingMultiple: 1.35,
  });
  s.addText("## §4. Solution Proposed  💬 4", {
    x: cx + 0.15, y: py + 1.45, w: 4.3, h: 0.28,
    fontSize: 11, fontFace: F.bold, color: C.black, margin: 0,
  });
  s.addText("저장 한 번에 (원본+이력) + (AI 개선안 3개) 두 MD 자동 산출 ...", {
    x: cx + 0.15, y: py + 1.78, w: 4.3, h: 0.5,
    fontSize: 9, fontFace: F.body, color: C.midGray, margin: 0, lineSpacingMultiple: 1.35,
  });

  // Right — Comments
  const rx = cx + 4.7;
  addCard(s, rx, py, 2.3, ph, { bg: C.offWhite });
  s.addText("피드백 (4)", {
    x: rx + 0.1, y: py + 0.08, w: 2.1, h: 0.28,
    fontSize: 10, fontFace: F.bold, color: C.midGray, margin: 0,
  });
  const mini = [
    { cat: "정책", color: "8B5CF6", who: "Designer", body: "PII 처리 정책 명시 필요" },
    { cat: "문제", color: "EF4444", who: "EM",       body: "P2 영향 수치 근거는?" },
    { cat: "기능", color: "F97316", who: "PM",       body: "F-04 자동/수동 토글" },
    { cat: "화면", color: "06B6D4", who: "Designer", body: "우측 패널 폭 340 → 380?" },
  ];
  mini.forEach((m, i) => {
    const my = py + 0.42 + i * 0.46;
    s.addShape(pres.shapes.RECTANGLE, {
      x: rx + 0.1, y: my, w: 2.1, h: 0.4,
      fill: { color: C.white }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: rx + 0.1, y: my, w: 0.06, h: 0.4, fill: { color: m.color },
    });
    s.addText(m.cat, {
      x: rx + 0.22, y: my + 0.03, w: 0.55, h: 0.18,
      fontSize: 8, fontFace: F.bold, color: m.color, margin: 0,
    });
    s.addText(m.who, {
      x: rx + 0.8, y: my + 0.03, w: 1.3, h: 0.18,
      fontSize: 8, fontFace: F.body, color: C.midGray, align: "right", margin: 0,
    });
    s.addText(m.body, {
      x: rx + 0.22, y: my + 0.2, w: 1.95, h: 0.18,
      fontSize: 8, fontFace: F.body, color: C.darkGray, margin: 0,
    });
  });

  // Workflow strip
  const wy = py + ph + 0.2;
  const steps = [
    { icon: "①", text: "코멘트\n(6카테고리)" },
    { icon: "②", text: "[피드백 저장]\n클릭" },
    { icon: "③", text: "Claude/Codex CLI\n자동 호출" },
    { icon: "④", text: "2종 MD 생성\n(원본+이력 / 개선안 3개)" },
    { icon: "⑤", text: "Claude Desktop에서\n다음 리비전" },
  ];
  const sw = L.cw / steps.length;
  steps.forEach((st, i) => {
    const sx = L.mx + i * sw;
    s.addText(st.icon, {
      x: sx, y: wy, w: sw, h: 0.3,
      fontSize: 14, fontFace: F.title, color: C.accent, align: "center", margin: 0,
    });
    s.addText(st.text, {
      x: sx, y: wy + 0.32, w: sw, h: 0.55,
      fontSize: 9, fontFace: F.body, color: C.darkGray, align: "center", margin: 0, lineSpacingMultiple: 1.3,
    });
  });

  addFooter(s, "Code: projects/26Q2_AI-Doc-Feedback-Loop/app  ·  cd app && npm install && npm start  ·  http://localhost:5174");
}

// ─── SLIDE 37: CLOSING (Dark) ───
{
  const s = darkSlide();
  s.addText("오늘 여러분이 만든 것", {
    x: L.mx, y: 0.7, w: L.cw, h: 0.55,
    fontSize: L.titleSize, fontFace: F.title, color: C.white, margin: 0,
  });

  const items = [
    { icon: "📋", l: "PRD", d: "AI가 구조화한 제품 기획서 — Why/What/How 프레임워크" },
    { icon: "📱", l: "Prototype", d: "15분 만에 만든 동작하는 모바일 웹 데모" },
    { icon: "🔄", l: "Workflow", d: "아이디어 → PRD → 프로토타입 → 배포 반복 프로세스" },
    { icon: "🧠", l: "PM의 역할", d: "AI 시대에도 변하지 않는 PM의 4가지 고유 역량" },
  ];
  items.forEach((it, i) => {
    const y = 1.5 + i * 0.65;
    s.addText(it.icon, {
      x: 1.2, y, w: 0.5, h: 0.5,
      fontSize: 20, align: "center", valign: "middle", margin: 0,
    });
    s.addText(it.l, {
      x: 1.9, y, w: 1.8, h: 0.5,
      fontSize: 16, fontFace: F.title, color: C.accent, valign: "middle", margin: 0,
    });
    s.addText(it.d, {
      x: 3.8, y, w: 5.5, h: 0.5,
      fontSize: 13, fontFace: F.body, color: C.midGray, valign: "middle", margin: 0,
    });
  });

  accentLine(s, 4.15);
  s.addText("AI NATIVE 시대, 여러분은 이미 준비되었습니다.", {
    x: L.mx, y: 4.3, w: 5.5, h: 0.35,
    fontSize: 13, fontFace: F.bold, color: C.white, margin: 0,
  });
  s.addText("차성재  |  FastCampus", {
    x: 6.3, y: 4.3, w: 3.0, h: 0.35,
    fontSize: 12, fontFace: F.body, color: C.midGray, align: "right", margin: 0,
  });
  s.addText("Q&A  ·  피드백  ·  네트워킹", {
    x: L.mx, y: 4.7, w: L.cw, h: 0.3,
    fontSize: L.smallSize, fontFace: F.body, color: C.midGray, margin: 0,
  });
}

// ══════════════════════════════════════════════════════
// GENERATE
// ══════════════════════════════════════════════════════
const path = require("path");
const defaultOut = path.join(__dirname, "ai-native-pm-lecture.pptx");
const out = process.env.OUT || defaultOut;
pres.writeFile({ fileName: out })
  .then(() => console.log("Created: " + out + " (" + pres.slides.length + " slides)"))
  .catch(e => console.error(e));
