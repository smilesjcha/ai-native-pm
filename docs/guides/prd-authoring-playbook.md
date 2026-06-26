# PRD 작성 플레이북 — 실무 노하우 + AI 활용

> Status: Active
> Document Type: Guide
> Last Updated: 2026-06-26
> Last Author: PM 차성재 with Claude Opus 4.8
> Owner: PM 차성재

## 결론부터 (이 문서의 두괄식)

좋은 PRD는 **(1) 두괄식 + (2) 중복 0 + (3) 구조화된 표 + (4) 검증 가능한 시안·데이터**다.
AI(Claude Code)로 PRD를 쓸 때는 **① 지면별 Agent 매트릭스로 범위를 잡고 → ② 코드 기반 시안 이미지·데모 영상을 로컬에 두고 본문에 임베드 → ③ Confluence storage format 양식으로 발행**하면 "읽히고·검증되고·재사용되는" 문서가 된다. 이 문서는 그 노하우와 바로 쓰는 프롬프트(집중 역할)를 정리한다.

---

## 1. 작성 원칙 (글쓰기 노하우)

### 1.1 두괄식 (BLUF, Bottom Line Up Front)
- **모든 섹션은 결론 한 줄로 시작**한다. 근거·과정은 그 뒤에.
- 문서 최상단에 **"결론부터"** 블록 1개 (3~5문장): 무엇을·왜·핵심지표·요청.
- 표·리스트도 "그래서 무엇" 열/항목을 **맨 앞 또는 맨 위**에.
- 나쁜 예: "여러 분석 끝에 …했고 그래서 결국 X" → 좋은 예: "**X 하자.** 이유는 …".

### 1.2 중복 제거 (Dedup)
- 같은 사실은 **한 곳(SSOT)에만** 쓰고 나머지는 링크/참조.
- 배경↔문제↔솔루션에서 같은 문장이 반복되면 **상위 섹션으로 올리고 하위는 삭제**.
- 표와 본문이 같은 내용을 말하면 **표를 남기고 본문은 해석만**.
- 작성 후 **"다시 읽기 패스"**: 같은 단어/수치가 3회 이상 반복되면 통합 후보.

### 1.3 구조화 (한 섹션 한 메시지)
- 섹션 제목은 **결론형 문장**으로 (예: "§3 문제: 결정 근거 부족이 이탈을 만든다").
- 긴 산문 대신 **표·체크리스트·다이어그램**으로.
- 수치는 항상 **Baseline → Target → 측정 방법** 3종 세트.

---

## 2. 표 양식 표준 (구조화된 표)

> 표는 "비교/정의/매핑"에 쓴다. 한 표 = 한 목적. 첫 열은 **키(기준)**, 마지막 열은 **그래서 무엇(액션/근거)**.

| 용도 | 권장 컬럼 |
|------|-----------|
| 문제 정의 | 문제ID · 문제 · 영향(정량) · 근거 · 해결 방향 |
| 지표 | 계층 · 지표 · Baseline · Target · 측정(로깅) |
| 기능 명세 | ID · 기능 · 화면 · 우선순위 · 기대 결과 |
| 비교/벤치마크 | 관점 · A · B · **우리(목표, 강조)** |
| 지면별 적용 | 지면 · Agent 가능성 · 표현(UI/카피) · 메트릭 |

규칙: ① 헤더는 굵게 ② 우선순위/목표 열은 색·굵기로 강조 ③ 셀은 한 줄 요지 ④ 빈 셀 금지(— 표기) ⑤ 6열·8행 넘으면 분할.

---

## 3. Confluence Storage Format 양식

> Confluence에 발행할 PRD는 **Storage Format(XHTML 기반)** 으로 작성하면 매크로·패널·표가 깨지지 않는다. 로컬 MD로 쓰되, 발행 시 아래 매핑을 따른다.

### 3.1 핵심 매핑 (MD → Storage Format)

| MD | Confluence Storage Format |
|----|---------------------------|
| 제목 `#`~`###` | `<h1>`~`<h3>` |
| 표 | `<table><tbody><tr><th>…</th><td>…</td></tr></tbody></table>` |
| 결론/주의 박스 | `<ac:structured-macro ac:name="info|note|warning">` |
| 접이식 | `<ac:structured-macro ac:name="expand">` |
| 상태 뱃지 | `<ac:structured-macro ac:name="status">` (예: Draft) |
| 코드 | `<ac:structured-macro ac:name="code">` |
| 이미지(첨부) | `<ac:image><ri:attachment ri:filename="surfaces.png"/></ac:image>` |
| 목차 | `<ac:structured-macro ac:name="toc"/>` |

### 3.2 두괄식 결론 패널 (예시 스니펫)

```xml
<ac:structured-macro ac:name="info">
  <ac:rich-text-body>
    <p><strong>결론:</strong> Shopping Mate(독립 신규 Shopping Agent)로 상세→장바구니 CVR 22→30%, 결정 시간 6.5→2분을 목표한다.</p>
  </ac:rich-text-body>
</ac:structured-macro>
```

### 3.3 발행 워크플로우
1. 로컬 MD로 작성(SSOT) → 2. 이미지/영상을 **페이지에 첨부** → 3. Storage Format으로 변환(`<ac:image>`로 첨부 참조) → 4. Confluence API/에디터로 발행. 본 레포는 `/publish-wiki` 스킬로 발행 가능.

> 원본은 항상 GitHub MD가 SSOT. Confluence는 발행본.

---

## 4. 지면별 Agent 활용 매트릭스 (커머스)

> 신규 Agent 기획 시 "어느 지면에서 무엇을 할지"를 먼저 표로 정의하면 스코프·우선순위가 잡힌다.

| 지면 | Agent 활용 가능성 | 표현 (UI/카피) | 핵심 메트릭 |
|------|-------------------|----------------|-------------|
| **Home** | 맥락(지난 탐색·가격변동) 기반 **선제 제안**, "오늘 뭐 살까" 진입 | 상단 Agent 카드 "어제 본 X, 5%↓" | 홈→탐색 전환·재방문·알림 CTR |
| **SRP** (검색결과) | **모호 질의 의도 보정**, 조건 제안, "왜 이 순위인지" 근거 | 결과 상단 의도 확인 + 조건 칩 | 검색→클릭(CTR)·0건 검색률·재검색률 |
| **PLP** (목록) | 후보 **N→3 압축**, 나란히 비교, 차이 하이라이트 | "조건 맞는 3개만" + 비교 버튼 | 목록→상세·비교 사용률·필터 이탈 |
| **PDP** (상세) | **리뷰 요약**, 조건 적합 이유, Q&A, 대안 제시 | 리뷰 요약 카드 + "당신 조건에 맞는 이유" | 상세→장바구니 CVR·체류·이탈 |
| **Cart** (장바구니) | 결정 재확인, 번들/업셀, **이탈 복구** | "함께 사면" + 근거 리마인드 | 장바구니→결제·이탈률·AOV |
| **Checkout** (결제) | 막바지 안심(배송·반품), 마찰 제거 | 도착 보장·간편결제 안내 | 결제 완료율·결제 이탈 |
| **Post** (구매후) | **재구매 리마인드**, CS 자동응대 | "지난번 그거 + 더 나은 대안" | 재구매율·CS 자동해결률 |

> 적용 시: 모든 지면에 다 넣지 말고 **이탈/임팩트가 큰 1~2개 지면부터**(데이터로 선정). Shopping Mate는 SRP·PLP·PDP를 1차 범위로.

---

## 5. 시안·영상 첨부 (코드 기반, Figma 아님)

> "이미지"가 아니라 **디자인 시스템 토큰 기반 코드 시안**을 만들어 캡처해 첨부한다. Figma 없이 Claude Code로 일관된 시안을 빠르게 생성·갱신할 수 있다.

### 5.1 산출물 종류
| 종류 | 만드는 법 | PRD 임베드 |
|------|-----------|-----------|
| **지면 시안 이미지** | HTML(디자인 시스템 토큰) → Playwright 캡처 PNG | `![지면 시안](assets/surfaces-agent-mockup.png)` |
| **와이어프레임 보드** | 화면 frame + User Flow 화살표 → 캡처 | 본문/부록 |
| **프로토타입 화면** | 동작 HTML → 프레임 캡처 | 핵심 화면 1~3장 |
| **데모 영상(MP4)** | 프로토타입 `?demo=1` → Playwright 녹화 → ffmpeg | 링크/임베드 (Confluence는 `<ac:structured-macro ac:name="multimedia">`) |

### 5.2 로컬 세팅 규칙
- 이미지는 **PRD와 같은 레포에 로컬 저장**(`prd/assets/`), 상대경로로 참조 → GitHub/VS Code/Confluence 모두 안전.
- 파일명: `kebab-desc.png` (예: `surfaces-agent-mockup.png`).
- 캡처는 2x(deviceScaleFactor 2)로 또렷하게. 영상은 H.264 mp4 + faststart.

### 5.3 재현 파이프라인 (이 레포)
```
docs/design-system/          ← 토큰(JSON/CSS/JS) — 시안의 기준
assets/build/shoot.js        ← HTML → PNG 캡처
assets/build/record-proto.js ← 프로토타입 → 데모 MP4
```

---

## 6. 집중 역할 — "시안·영상 임베드 PRD 작성가" (프롬프트 템플릿)

> Claude Code에 그대로 붙여 쓰는 역할 정의. PRD를 "읽히고 검증되는" 문서로 만드는 데 집중한다.

```
역할: 너는 "시안·영상 임베드 PRD 작성가"다. 아래 원칙으로 PRD를 작성/개선한다.

[글쓰기]
- 두괄식: 모든 섹션을 결론 한 줄로 시작. 문서 최상단 "결론부터" 블록 필수.
- 중복 제거: 같은 사실은 한 곳만. 다시 읽고 반복 통합.
- 표 우선: 비교/정의/매핑은 표로. 첫 열=기준, 끝 열=액션/근거. 빈 셀 금지.

[Agent 범위]
- 지면별(Home/SRP/PLP/PDP/Cart/Checkout/Post) Agent 활용 매트릭스를 먼저 만들고,
  이탈·임팩트 큰 1~2개 지면을 1차 범위로 선정(데이터 근거).

[시안·영상]
- Figma 대신 디자인 시스템 토큰 기반 코드 시안(HTML→PNG)을 만들어 prd/assets/에 로컬 저장 후 상대경로로 임베드.
- 핵심 User Flow는 동작 프로토타입 + 데모 영상(MP4)을 만들어 링크/임베드.

[지표]
- 모든 지표는 Baseline→Target→측정(로깅 이벤트) 3종 세트.

[발행]
- 로컬 MD가 SSOT. Confluence 발행 시 Storage Format(XHTML, ac:structured-macro)로 변환,
  이미지는 첨부(<ac:image><ri:attachment/>).

출력: 위 원칙을 만족하는 PRD. 모호하면 가정을 명시하고 진행.
```

---

## 7. 작성 후 셀프 체크리스트

- [ ] 최상단 "결론부터" 블록이 있고, 각 섹션이 결론형으로 시작하는가
- [ ] 같은 사실/수치 반복이 없는가 (다시 읽기 패스 완료)
- [ ] 표는 한 목적·키 열·액션 열·빈 셀 없음 기준을 지키는가
- [ ] 지면별 Agent 매트릭스로 범위가 정의됐는가
- [ ] 코드 기반 시안 이미지가 로컬(`prd/assets/`)에 있고 상대경로로 임베드됐는가
- [ ] 핵심 플로우에 프로토타입/데모 영상이 연결됐는가
- [ ] 지표가 Baseline→Target→측정 3종 세트인가
- [ ] Confluence 발행 시 Storage Format 매핑이 가능한 구조인가

<details>
<summary>Change Log</summary>

| 날짜 | 작성자 | 변경 내용 |
|------|--------|----------|
| 2026-06-26 | PM 차성재 with Claude Opus 4.8 | 초안 — 두괄식·중복제거·표양식·Confluence storage format·지면별 Agent 매트릭스·코드기반 시안/영상 첨부·집중역할 프롬프트 |

</details>
