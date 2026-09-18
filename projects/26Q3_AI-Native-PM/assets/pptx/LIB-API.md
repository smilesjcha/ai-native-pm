# LIB-API.md — `lib.js` 아키타입 라이브러리 사용법

> Status: Draft
> Document Type: Guide
> Product: KMAC 기획자 과정 M5 「생성형 AI를 활용한 기획자 업무생산성 향상」
> Last Updated: 2026-09-18
> Last Author: PM 차성재 with Claude Fable 5.1
> Owner: PM 차성재

`lib.js`는 [`docs/design-system/ppt-design-guide.md`](../../../../docs/design-system/ppt-design-guide.md)의 그리드·타입·컬러·컴포넌트를 pptxgenjs 함수로 고정한 라이브러리다. `slides-block1~3.js`는 이 함수들만 호출해 장표를 만들고, `generate.js`가 세 블록을 이어 붙여 `kmac-m5-ai-pm-productivity-20260919.pptx`를 쓴다.

```js
// slides-block1.js
module.exports = async function (deck) {
  deck.cover({ title: "…", meta1: "…" });
  deck.bullets({ title: "…", items: ["…"], kind: "강의", notes: "발화 …" });
};
```

```bash
npm install                 # 최초 1회
node generate.js            # → kmac-m5-ai-pm-productivity-20260919.pptx (총 장수·경고 수 출력)
node generate.js --no-kind  # 유형 pill 숨김(배포용)
soffice --headless --convert-to pdf --outdir . kmac-m5-ai-pm-productivity-20260919.pptx
pdftoppm -png -r 80 kmac-m5-ai-pm-productivity-20260919.pdf /tmp/kmac-m5-render/p
```

---

## 1. createDeck(cfg) → deck

| 옵션 | 기본값 | 설명 |
|------|--------|------|
| `title` | `""` | 문서 제목(pptx 메타) |
| `footerText` | `title` | 러닝 푸터 좌측 문구. 우측 페이지 번호는 자동(`01`, `02` …) |
| `author` | `"차성재"` | pptx 메타 |
| `baseDir` | 프로젝트 루트(`assets/pptx/../..`) | 상대 이미지 경로의 기준 폴더 |
| `showKind` | `true` | `kind` pill 표시 여부(배포용은 `false`) |
| `fontNames` | `"ko"` | `"ko"` = `나눔고딕`·`나눔고딕 ExtraBold`·`나눔고딕 Light` / `"en"` = `NanumGothic …`. **macOS LibreOffice PDF 변환은 한글 로컬라이즈명만 인식**한다(영문명은 다른 폰트로 대체됨) — 기본값을 유지한다 |
| `captureCaption` | `"계정·이메일·프로필·사이드바 잘라냄 · 캡처 기준일 2026-09-1x"` | Capture 장표 캡션에 자동 덧붙이는 공통 문구. `""`/`null`이면 끔 |
| `autoVirtualFootnote` | `true` | 장표 텍스트에 `머니핏`·`핀트리`·`moneyfit-`이 있으면 각주 "교육용 가상 사례 · 수치 [가정]" 자동 삽입 |

반환 `deck`: `pres`(pptxgenjs 인스턴스) · `C`(컬러) · `F`(폰트) · `L`(레이아웃 상수) · 아키타입 함수 17개 · `blank()` · `helpers` · `save(path)` · `count()` · `report()` · `warnings[]`.

### 디자인 상수(그대로 쓰기)

- 캔버스 16:9 `10 × 5.625in`, 안전 여백 좌우 `0.7` 상 `0.5` 하 `0.45`, 콘텐츠 폭 `L.cw = 8.6`
- 존: 제목 `y 0.62~` → 부제 → 콘텐츠(`L.contentTop 1.65` ~ `L.contentBottom 4.75`) → 각주 `4.78` → 푸터 rule `5.02` / 푸터 `5.08`
- 컬러: `C.accent 0066CC`(유일 액센트) · `C.ink 1D1D1F` · `C.gray 86868B` · `C.parchment F5F5F7` · `C.tint EAF2FB` · `C.hairline E8E8ED` · 다크 표면용 `C.sky 2997FF` · `C.darkCard 2C2C2E`
- 폰트: `F.title`(ExtraBold) · `F.bold`(패밀리+bold 센티널 — `tx()`가 typeface+`b=1`로 변환) · `F.body` · `F.light`
- 타입 스케일: 제목 26→22→20pt(2줄까지) · 부제 15→13.5→12.5 · 본문 13.5→12→11→10 · 카드 본문 12→11→10 · 프롬프트 13→…→9 · 캡션 10 · 각주·푸터 9.5

---

## 2. 공통 옵션(모든 아키타입)

| 옵션 | 설명 |
|------|------|
| `notes` | 발표자 노트(강사 발화·`노트:` 항목). 배포용 덱은 `strip-notes.py`로 제거 |
| `kind` | 우상단 유형 pill: `'강의' \| '시연' \| '실습단계' \| '캡처' \| '참고'`. `labStep`은 기본 `실습단계`, `capture`는 `캡처`, `video`는 `시연`. 그 외 미지정 시 표시 안 함 |
| `footnote` | 하단 9.5pt 각주 1줄(4.78in). 지정 시 콘텐츠 하단이 0.05in 위로 올라간다 |
| `title` | 결론형 한 문장. **공백 제외 45자 초과 → `[title-length]` 경고**. `subtitle` 미지정이고 제목에 ` — `가 있으면 뒤를 부제로 자동 분리(`splitDash:false`로 끔) |
| `subtitle` | 1~2줄. 2줄 초과 경고 |
| `timer` | `bullets`·`checklist`·`labStep` 등 `header()`를 쓰는 함수 공통. `"3:00"` → 우상단 Ink pill `⏱ 3:00` |

### 텍스트 안전장치(자동)

- 모든 텍스트는 박스 폭 기준 예상 줄 수를 계산해 폰트를 단계적으로 줄인다(제목 26→22→20 · 본문 13.5→12→11→10 · 최소 10pt, 프롬프트 최소 9pt).
- 줄 수 추정: 나눔고딕 실측 폭(한글 0.94em · 영소문자 0.53 · 영대문자 0.66 · 숫자 0.61 · 공백 0.28). 공백·`→`·`·`·`—`·`/`·닫는 괄호 뒤에서 줄바꿈. 줄 높이 = 글자 크기 × em 배수(본문 1.45 · 제목 1.15)이며 쓰기 시점에 PPT `lineSpacingMultiple`(÷1.33)로 변환한다.
- 박스를 넘으면 `console.warn('[overflow] slide N (archetype) …')`. 표는 행 높이 가변 계산 후 총 높이 초과 시 경고. 카드 본문 3줄 초과 `[card-lines]`, LabStep 본문 5줄 초과, Process 6단 이상·표 9행 이상·카드 9장 이상 `[count]`, 프롬프트 11pt 미만 `[small-font]`, 이미지 없음 `[missing-image]`.
- `deck.report()` → `{ slides, warnings, byTag }`. 경고는 빌드를 멈추지 않는다 — 문장을 줄이거나 장표를 나눠서 0건을 목표로 한다.

---

## 3. 아키타입 17종

권장 글자 수는 **공백 포함 한글 기준**이며, 넘어도 자동 축소되지만 경고 없이 보기 좋게 들어가는 한도다.

### cover — Ink 풀블리드 표지 (푸터 없음)

```js
deck.cover({
  kicker: "2026 핀테크 인력양성사업 · 기획자 과정 모듈5",   // 선택, ≤40자
  title: "생성형 AI를 활용한 기획자 업무생산성 향상",         // 필수, 40→34→30pt, 2줄 이내(≤30자)
  subtitle: "오늘은 월요일에 내 업무 하나를 다르게 하는 연습이다", // 선택, ≤60자
  meta1: "한국핀테크지원센터 · KMAC · 2026.09.19(토) 09:30–16:30 · KMAC 비즈니스 스쿨 M1 교육장", // 선택, 흰색 Bold, ≤2줄
  meta2: "차성재 — 무신사 Core AI PM · 아주대학교 AI대학원 겸임교수", // 선택, 회색
  disclaimer: "소속 회사의 공식 입장이 아닌 강사 개인의 견해 · 모든 사례·데이터는 교육용 가상 자료", // 선택, 9.5pt
  notes: "…",
});
```

### sectionDivider — Ink 풀블리드 + PART kicker (+ 미니 파이프라인, 푸터 없음)

```js
deck.sectionDivider({ kicker: "BLOCK 1 · 09:40", title: "생성형 AI 도구 지도", // title ≤22자(30pt 1줄), 2줄 허용
  subtitle: "회사가 허용한 도구 안에서 … — 25분", steps: ["내 환경 확인", "오늘 실습 도구 1개", "두 번째 도구", "회사로 가져가기"] }); // steps 3~5개, 각 ≤10자, 마지막이 Action Blue
```

### statement — 큰 한 문장 (+ 보조 본문). `dark:true` 가능

```js
deck.statement({ title: "규제는 '금지'가 아니라 …의 조건이다", // 30→26→22→20pt, 3줄 이내(≤50자)
  body: "줄1\n줄2\n줄3", // 선택, 14→11pt, 5줄 내외
  kicker: "…", dark: false, footnote: "본 강의는 법률 자문이 아니며 …" });
```

### bullets — 불릿 목록 (1단 / `twoCol:true` 2단)

```js
deck.bullets({ title: "…", subtitle: "…", kind: "강의",
  items: ["문장", { text: "본 항목", sub: "보조 줄(회색·작게)", bold: true, color: "0066CC" }], // 1단 4~6항목(항목 ≤45자·sub ≤50자), 2단 8~10항목
  twoCol: false, numbered: false });
```

### cards — 2~4열 카드(5장 이상은 행으로 감쌈, 마지막 행 가운데 정렬)

```js
deck.cards({ title: "…", cols: 3, accentIndex: 0, // accentIndex: 숫자 또는 배열 → Tint 배경 + 좌측 accent
  cards: [{ tag: "문서", title: "PRD", body: "제품 요구사항 정의서 — …" }] }); // 카드 제목 ≤12자, 본문 ≤2줄(3열 기준 ≤40자, 4열 ≤28자); 3줄 초과 경고, 8장 초과는 Table 권장
```

### comparison — 좌/우 2-up (우측 Tint + accent 강조)

```js
deck.comparison({ title: "…",
  left:  { label: "커리큘럼 4요소", items: ["역할", "맥락"] },      // label ≤14자, items 4~6개(≤30자) 또는 body 문자열
  right: { label: "오늘의 6요소", title: "선택 소제목", items: [{ text: "검증", bold: true, color: "0066CC", sub: "…" }] },
  emphasize: "right" }); // 'right'(기본) | 'left' | 'none' · arrow:false 로 화살표 제거
```

### process — 3~5단 가로 카드 + → 커넥터

```js
deck.process({ title: "…", accentLast: true, // 마지막 단계만 accent(개별 step.accent도 가능)
  steps: [{ label: "1층 · 개인 계정", body: "넣을 수 있는 것: …\n없는 것: …", minutes: 3 }] }); // label ≤14자, body ≤4줄(5단이면 ≤3줄·≤30자); 6단 이상 경고 → Table/2행 Cards
```

### table — 헤더 Ink, 행 높이 가변, 폰트 12→10pt 자동

```js
deck.table({ title: "…", header: ["기준", "ChatGPT", "Claude", "Gemini", "왜 중요한가"],
  rows: [["무료 플랜", "있음", "있음", "있음", "오늘 실습은 무료 웹으로"]], // 8행 이내(9행 이상 경고), 셀 ≤2줄
  colW: [1.8, 1.3, 1.3, 1.3, 2.9],      // 선택. in 또는 비율(합이 8.6이 아니면 정규화)
  fontSize: 11,                          // 선택. 지정하면 고정
  accentCol: 4, emphRows: [1, 2], zebra: false, boldFirstCol: true,
  note: "2026-09 기준 [강의 전 확인]" }); // 표 아래 1줄
// 셀은 문자열 또는 { text, options:{ color, bold, fill:{color}, align } }
```

### checklist — □ 체크 항목 + (옵션) 하단 콜아웃·타이머

```js
deck.checklist({ title: "…", timer: "0:30",
  items: [{ text: "실제 고객·거래·내부 데이터는 …", sub: "고객A · N건 · X억", done: false }], // 3~6항목, text ≤45자
  note: "지금 ChatGPT·Claude·Gemini 중 하나에 로그인 → …" }); // ≤2줄(≤110자)
```

### promptBlock — 붙여넣기 프롬프트 Parchment 박스(좌 accent), 최소 9pt, 2단 자동

```js
deck.promptBlock({ title: "템플릿 (a) …", kicker: "붙여넣기 프롬프트 · lab-1 §1.3", kind: "실습단계",
  text: fs.readFileSync(path.join(__dirname, "..", "..", "workshop", "prompts-txt", "lab-1-01-template-a.txt"), "utf8"),
  twoCol: "auto",           // true 강제 2단 · false 1단 고정 · 기본 auto(1단 11pt에 안 들어가면 2단)
  note: "전문 = workshop/… · 시연에서 그대로 실행" });
// 한도: 1단 13pt ≈ 350자 · 11pt ≈ 500자 · 2단 9pt ≈ 900자(제목 1줄·부제 없음 기준). 그 이상은 (1/2)(2/2)로 나눈다 — 넘으면 [overflow] 경고
```

### labStep — 입력 → 확인 → 한 번 수정 3단 카드 (+ 분 pill·타이머·안전 규칙)

```js
deck.labStep({ title: "실습 ① 15분 — …", timer: "15:00", // kind 기본 '실습단계'
  steps: [
    { label: "입력", minutes: 3, body: "§1.3 완성본을 새 대화에 실행\n…" },   // label ≤10자, body ≤5줄(≤80자)
    { label: "확인", minutes: 4, body: "① … ② … ③ …" },
    { label: "한 번 수정", minutes: 5, body: "…", accent: true },          // step: "저장" 처럼 뱃지 문구 변경 가능
  ],
  accentLast: false,
  safetyLine: "안전 규칙: 실데이터 금지 · 가상 값 치환 · 결과는 초안" }); // ≤2줄
```

### capture — 캡처 이미지(없으면 dashed placeholder) + 캡션 + (옵션) 요점

```js
deck.capture({ title: "…", // kind 기본 '캡처'
  imagePath: "assets/screenshots/cap-01-m1-chatgpt-data-controls.png", // 없으면 placeholder + [missing-image] 경고
  placeholderLabel: "cap-01 …",       // 선택(기본 파일명)
  caption: "메뉴 명칭은 화면 기준 [강의 전 확인]", // 공통 캡션이 " · "로 자동 덧붙음(commonCaption:false 로 끔)
  side: "full",                       // 'full' | 'left'(이미지 좌) | 'right'(이미지 우); bullets가 있으면 기본 'right'
  imageW: 5.3, bullets: ["…", { text: "…", sub: "…" }] });
```

### video — MP4 삽입(poster 커버) · 파일 없거나 실패 시 poster만 + 파일명 텍스트

```js
deck.video({ title: "데모 영상 — …", posterPath: "assets/builder/moneyfit-demo-poster.png",
  mp4Path: "assets/builder/moneyfit-demo.mp4", caption: "머니핏 프로토타입 데모", link: "https://…" }); // link 선택(캡션에 하이퍼링크)
// PDF에서는 poster 정지 이미지로 보인다(캡션에 자동 표기)
```

### profile — 연사 소개: 이름·현직 + 키/값 행 + (옵션) 우측 경력 사다리 + disclaimer

```js
deck.profile({ name: "차성재", role: "무신사 Core AI PM · 아주대학교 AI대학원 겸임교수",
  rows: [["출발점", "은행·카드·보험사 AI 모델 4년 — …"], ["학력", "…"]],   // 3~5행, 값 ≤2줄(≤60자)
  right: { title: "경력 사다리", items: [{ text: "금융 AI", sub: "…" }, { text: "커머스", sub: "…" }] }, // 선택, 3~5개, 마지막 accent
  disclaimer: "소속 회사의 공식 입장이 아닌 강사 개인의 견해 · …" });
```

### timetable — [시각, 블록명, 설명, tag?] 행 카드

```js
deck.timetable({ title: "100분 블록 3개 — …",
  rows: [["09:30–11:10", "오전 · 도구·프롬프트·검증", "도구 지도 → 6요소 카드 → 검수"], ["11:10–11:30", "쉬는시간 20분", ""], ["12:30–14:10", "오후 1부", "…", "accent"]],
  // 3~7행. tag: 'accent'(Tint 강조) | 'break'(흰 배경). 라벨에 '쉬는'·'점심'이 있으면 자동 break 스타일
  timeW: 1.5, labelW: 3.3, note: "오늘 안 다루는 것: …" });
```

### dataHero — 큰 Stat + 한 줄 해석 + 출처. `dark:true` 가능

```js
deck.dataHero({ title: "연동 → 목표 설정 전환이 가장 큰 이탈 구간이다", stat: "−41%", // 72→36pt
  caption: "가입 → 계좌 연동 → 목표 설정 퍼널에서 … [가정]", source: "출처: 머니핏 mock 데이터(교육용 가상)" }); // caption ≤2줄
```

### closing — Ink. 요약 항목(4개 권장, 5개 이상 2열) + 연사·기관 (푸터 없음)

```js
deck.closing({ kicker: "정리", title: "월요일 아침, 내 업무 하나를 AI와 다르게 시작한다", // ≤2줄
  items: ["6요소 카드 하나를 저장했다 — …", "…", "…", "…"],   // 항목 ≤45자
  footer: "차성재 · 한국핀테크지원센터 · KMAC 기획자 과정 모듈5 · 2026.09.19" });
```

---

## 4. 저수준 API(아키타입에 없는 장표)

```js
const { s, top, bottom, finish, ctx } = deck.blank({ title: "…", subtitle: "…", kind: "참고", notes: "…" });
const { tx, card, pill, image, placeholder, bodyBox, bulletRuns, warn } = deck.helpers;
card(ctx, deck.L.mx, top, 4.1, 2.0, { bg: deck.C.tint, leftAccent: deck.C.accent });
bodyBox(ctx, "긴 본문 …", deck.L.mx + 0.25, top + 0.2, 3.6, 1.6, { label: "좌 카드" }); // 자동 축소 + overflow 경고
finish(); // 각주·푸터·노트 마무리(반드시 호출)
```

- `tx(ctx, text, opts)`: `addText` 래퍼. 폰트 기본 `F.body`, `margin 0`, em 줄 높이 → PPT 배수 변환, 가상 표기 감지용 텍스트 수집.
- `image(ctx, path, x, y, w, h, label)`: 파일 있으면 `contain` 배치, 없으면 placeholder + 경고.
- 불릿 텍스트 박스는 `align: "left"`를 반드시 준다(`bulletRuns` 주석 참조).

---

## 5. 이미지·영상 경로 규칙

- **절대경로** 그대로, **상대경로**는 `createDeck({ baseDir })` 기준 — 기본 baseDir은 프로젝트 루트(`projects/26Q3_AI-Native-PM/`)이므로 슬라이드 플랜의 에셋 열 표기(`assets/builder/moneyfit-surfaces.png`, `assets/screenshots/cap-01-….png`)를 그대로 쓴다.
- 코드에 홈 경로를 하드코딩하지 않는다. 다른 위치의 파일은 `path.join(__dirname, "..", "..", "workshop", …)`처럼 `__dirname` 기준으로 만든다.
- 이미지는 항상 프레임 카드 안에 비율 유지(`contain`)로 들어간다. 캡처는 계정·이메일·프로필을 잘라낸 파일만 사용한다.
- 영상은 `assets/builder/*.mp4` — PPTX에 임베드되고 PDF에는 poster로 남는다.

## 6. notes(발표자 노트) 규칙

- 슬라이드 플랜 '발화 · 강사 노트' 열의 문장을 그대로 `notes`에 넣는다. 화면 요점에는 넣지 않는다.
- `노트:` 접두 항목(시연 단계·시간 배분·4분 규칙·선실행 값)도 `notes`에만 쓴다.
- 배포용 덱: `python3 strip-notes.py kmac-m5-ai-pm-productivity-20260919.pptx` → `-dist.pptx`(노트 제거). `--no-kind`로 유형 pill도 숨길 수 있다.

## 7. 렌더 QA 메모 (2026-09-18 스모크)

- LibreOffice(macOS) PDF 변환은 폰트를 **한글 로컬라이즈명**으로만 찾는다 — `fontNames:"ko"` 기본값에서 NanumGothic / Bold / ExtraBold가 PDF에 임베드됨을 `pdffonts`로 확인했다. `✓ □ ▶ ⏱` 같은 기호만 Helvetica/OpenSymbol로 대체된다.
- LibreOffice의 나눔고딕 자연 행간은 ≈1.33em(PowerPoint ≈1.2em)이라 `lib.js`는 1.33을 기준으로 줄 높이를 계산한다 — PowerPoint에서는 같은 배수가 조금 더 촘촘하게 보인다.
- PowerPoint(mac)에서 한글 폰트명 매칭은 `[강의 전 확인]` — 문제가 있으면 `createDeck({ fontNames: "en" })`으로 빌드한 사본을 PowerPoint 내보내기용으로 쓴다.


## 최종 PDF 내보내기 규칙 (2026-09-18 확정 · 사용자 지시)

- **최종 PDF는 LibreOffice 변환이 아니라 PowerPoint "PDF로 저장"으로 만든다**: `./export-pdf.sh kmac-m5-ai-pm-productivity-20260919.pptx` (AppleScript, 나눔고딕 Regular·Bold·ExtraBold 임베드 확인 완료 — `_smoke-ppt.pdf`). soffice PDF는 렌더 QA용 프록시로만 쓰고 공유하지 않는다.
- 폰트 세트는 기본 `ko`(나눔고딕 로컬라이즈명) 유지 — soffice·PowerPoint 모두 임베드 확인됨. **폰트 패밀리를 다른 폰트로 바꾸지 않는다.**
- 배포용(수강생 온라인 배포): `node generate.js --no-kind --out kmac-m5-ai-pm-productivity-20260919-dist.pptx` → `python3 strip-notes.py …-dist.pptx …-dist.pptx` → `./export-pdf.sh …-dist.pptx`. 강사 노트·유형 pill 제거.
- 표지 제목처럼 단어 중간에서 줄이 꺾이면(`업무생산\n성 향상`) 자동 줄바꿈에 맡기지 말고 텍스트에 `\n`을 넣어 의미 단위로 끊는다(예: `생성형 AI를 활용한 기획자\n업무생산성 향상`).

<details>
<summary>Change Log</summary>

| 날짜 | 작성자 | 변경 내용 |
|------|--------|----------|
| 2026-09-18 | PM 차성재 with Claude Fable 5.1 | 렌더 QA 반영(QA-REPORT.md) — `table()` 행 높이 추정 em `TABLE_LH=1.22`(1.12는 2줄 셀 과소 추정으로 note 겹침), `checklist()` 행 높이 하한 제거·0.30in 미만 `[overflow]` 경고·항목 폰트 최소값 통일, `header()` kicker 1줄 축소(11→10→9.5pt)·2줄 시 `[kicker-lines]` 경고, `promptBlock()` kicker는 박스 안에만 표시, `image()` altText=파일명(절대경로 유출 차단) |
| 2026-09-18 | PM 차성재 with Claude Fable 5.1 | 최종 PDF 내보내기 규칙 추가 — PowerPoint 저장(export-pdf.sh), soffice는 QA 프록시, 배포용 빌드 명령, 제목 수동 줄바꿈 |
| 2026-09-18 | PM 차성재 with Claude Fable 5.1 | 초안 — createDeck 옵션, 공통 옵션(notes·kind·footnote·timer), 텍스트 안전장치, 아키타입 17종 시그니처·권장 글자 수·예시, 저수준 API, 이미지·notes 규칙, 스모크 QA 메모(폰트 로컬라이즈명·행간) |

</details>
