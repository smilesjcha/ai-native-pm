# 실습 가이드 v05 — Claude Code로 직접 만들기 (실무 AI 적용 사례)

> Status: Draft
> Document Type: Workshop Guide
> Product: FastCampus "실무 AI 적용 사례" 특강 (Shopping Mate / 커머스 Agent)
> Last Updated: 2026-06-26
> Last Author: PM 차성재 with Claude Opus 4.8
> Owner: PM 차성재

## 결론부터 (이 실습으로 만드는 것)

> **내 도메인의 AI Agent 서비스를, 디자인 토큰 → 분석 → PRD → 시안 → 프로토타입 → 데모 영상 → 정렬까지 Claude Code 하나로 직접 만든다.**
> 데모 예시는 **Shopping Mate**(커머스). 각 Step은 **이미 준비된 스캐폴드(예시/스크립트)를 그대로 재사용**해 빠르게 따라 만들고, 내 트랙 주제로 바꾸기만 하면 된다.
> 표기: **✅ 준비됨**(레포에 있음, 그대로 사용) · **✍️ 직접 할 것**(내 주제로 작성) · **★Core**(라이브 시연 핵심) · **○Optional**(핸드아웃).

> **마지막 수업 큐레이션(중요)**: 다 다루지 않는다. **Core 스파인만 라이브**(Step 1 토큰 → 2 매트릭스 → 3 데이터 1회 → 4 PRD → 5 시안 → 6 프로토·데모 → 7 정렬), 벤치마크 심화·리서치 정량·Confluence 변환은 **덱/플레이북으로 가져가기**. 근거: [강의 설계 방향성](../planning/teaching-design-direction.md).

---

## 0. 개요

| 항목 | 내용 |
|------|------|
| 대상 | 10주 과정 수료 직전 수강생 (실무 적용 단계) |
| 시간 | 약 60분 (Step 0~7) |
| 핵심 도구 | **Claude Desktop의 Claude Code** |
| 작업 폴더 | 이 레포(`ai-native-pm/`) 또는 빈 폴더 + 디자인 시스템 복사 |
| 산출물 | 매트릭스·분석·PRD·시안·프로토타입·데모 MP4·정렬 1장 |

### 내가 쓸 재료 (레포 위치)
- 디자인 시스템 토큰 — `docs/design-system/` ✅
- PRD 작성 플레이북 — `docs/guides/prd-authoring-playbook.md` ✅
- 이해관계자 정렬 플레이북 — `docs/guides/stakeholder-alignment-playbook.md` ✅
- Shopping Mate 예시 — `projects/26Q2_Fastcampus-Lecture/{prd,workshop/shopping-mate,analysis}` ✅
- 캡처/녹화 스크립트 — `projects/26Q2_Fastcampus-Lecture/assets/build/{shoot.js,record-proto.js,render-md.js}` ✅
- mock 데이터·분석 — `.../analysis/{data/mock-events.csv, analyze-shopping-mate.py}` ✅

---

## 1. 환경 설정 (사전 / 운영팀 세팅)

> ⚠️ **이 부분이 안 되어 있으면 실습이 막힌다.** 사전 점검 필수.

| 점검 | 상태 | 비고 |
|------|------|------|
| Claude Desktop 설치 + 로그인 | ✍️ 수강생 | 이번 핵심 도구 |
| Claude Code 사용 가능 (터미널/Desktop 연동) | ✍️ 수강생 | 파일 읽기·쓰기·실행 권한 |
| Node.js 18+ (`node -v`) | ✍️ 수강생 | 시안 캡처·데모 녹화용 |
| Python 3 + pandas·matplotlib | ✍️ 선택 | 데이터 분석 Step (없으면 Claude Code가 설치 안내) |
| 작업 폴더 + 메모장 | ✍️ 수강생 | 결과 저장 |
| 트랙 + "개선하고 싶은 한 가지" 1줄 | ✍️ 수강생 | 모든 Step의 입력 |

> 운영팀 요청 시: 위 Node/Python/디자인시스템을 미리 세팅해 배포하면 60분 안에 끝난다.

---

## Step 0 — 환경 & 재료 확인 (5분)

**목표**: Claude Code가 레포의 재료(디자인 시스템·플레이북·예시)를 인식하는지 확인하고, 내 주제를 한 줄로 고정.

**Claude Code 예시 프롬프트**
```
이 레포의 docs/design-system, docs/guides/prd-authoring-playbook.md,
projects/26Q2_Fastcampus-Lecture/prd/PRD-shopping-mate.md 를 읽고 요약해줘.
나는 [내 트랙: 예) 에듀테크]에서 "[개선하고 싶은 한 가지: 예) 학습 코스 추천]"을 AI Agent로 만들고 싶어.
오늘 이걸 분석→PRD→시안→프로토타입→데모까지 만들 거야. 준비됐는지 확인해줘.
```
**기대 산출물**: 재료 요약 + 내 주제 확정.
✅ 준비됨: 디자인 시스템·플레이북·예시 · ✍️ 직접: 트랙 주제 1줄.

---

## Step 1 — 디자인 토큰 만들기 (웹 claude-design → 다운로드 → Claude Code)  ★Core(시연)

**목표**: 코딩 없이 **웹 기반 claude-design(getdesign.md)** 에서 원하는 디자인을 골라 **디자인 토큰 폴더(DESIGN.md + tokens)** 를 만들고, 그 **파일 구조를 직접 다운로드**해 작업 폴더에 넣은 뒤, **Claude Code로 토큰을 코드화·검증**한다. → 이게 이후 모든 시안의 ‘기반’이 된다.

**왜 먼저 하나**: 디자인 시스템(토큰)이 있어야 Step 5 시안·Step 6 프로토타입이 **일관**된다. "AI로 디자인 기반부터 확보"를 체감하는 출발점.

### 1) 웹에서 디자인 토큰 만들기 (브라우저)
1. **getdesign.md** 접속 → 원하는 디자인(예: `apple/design-md`) 선택
2. 미리보기 확인 → **`Download DESIGN.md`** (또는 토큰 폴더) 다운로드
   - 또는 터미널에서: `npx getdesign@latest add apple` (프로젝트 루트에서 실행)
3. 받은 **DESIGN.md / design 폴더**를 내 작업 폴더에 넣기

### 2) Claude Code로 토큰화·검증 (예시 프롬프트)
```
방금 받은 DESIGN.md(또는 design 폴더)를 읽고,
docs/design-system 구조처럼 tokens/{tokens.json, tokens.css, tokens.js} +
styles/{reset,base,components}.css 로 코드화해줘.
그리고 토큰을 한눈에 보는 style-guide.html을 만들어 shoot.js로 캡처해줘.
```
**기대 산출물**: `tokens.json/css/js` + `style-guide.html`(+PNG) — **내 디자인 시스템**.
✅ 준비됨: 완성 예시 `docs/design-system/` (Apple 토큰, 이대로 써도 됨) · ✍️ 직접: 내가 고른 디자인으로 다운로드·토큰화.
**막힐 때**: 다운로드가 막히면 **준비된 `docs/design-system/`을 그대로 복사**해 진행(시연은 ‘만드는 과정’만 보여주고 실습은 기성 토큰 재사용 OK).

> 시간이 빠듯하면: **시연만 라이브**(웹→다운→Claude Code 토큰화)로 보여주고, 실습은 준비된 `docs/design-system/`을 쓰게 한다.

---

## Step 2 — 지면별 Agent 매트릭스 (10분)

**목표**: 내 서비스의 지면(Home/검색/목록/상세/장바구니 등)별 Agent 활용 가능성을 표로 정의하고, **이탈·임팩트 큰 1~2개 지면**을 1차 범위로 선정.

**예시 프롬프트**
```
프롬프트: prd-authoring-playbook.md의 "지면별 Agent 매트릭스" 양식을 따라,
내 서비스([주제])의 지면별로 [Agent 활용 가능성 · 표현(UI/카피) · 핵심 메트릭 · 범위] 표를 만들어줘.
이탈/임팩트가 큰 1~2개 지면을 1차 범위로 골라 이유와 함께 표시해줘.
```
**기대 산출물**: 매트릭스 표(MD) + 1차 범위 선정.
✅ 준비됨: 플레이북 양식 + Shopping Mate 예시(§4A) · ✍️ 직접: 내 도메인 지면.
**막힐 때**: "지면이 뭐가 있는지 모르겠어" → "내 서비스의 사용자 여정을 지면 단위로 나눠줘"부터.

---

## Step 3 — mock 데이터로 코호트·퍼널 분석 (10분)

**목표**: 이벤트 로그(mock)로 재구매 코호트와 구매 퍼널 이탈을 분석하고, **최대 이탈 구간 + 개선 가설**을 도출.

**예시 프롬프트**
```
analysis/data/mock-events.csv (user_id, signup_week, event, ts, surface)를 읽어
(1) agent_open→checkout 구매 퍼널 단계별 잔존율과 최대 이탈 구간
(2) 가입 주차별 재구매 코호트 리텐션
을 분석하고 차트를 그려줘. 분석 후 "어디를 개선해야 하나" 가설 3개를 우선순위로 정리해줘.
참고: analysis/analyze-shopping-mate.py 가 이미 있어 — 실행하거나 내 데이터로 바꿔도 돼.
```
**기대 산출물**: 코호트·퍼널 차트(`analysis/outputs/`) + 개선 가설.
✅ 준비됨: `mock-events.csv`(28k행) + 검증된 `analyze-shopping-mate.py`(코호트/퍼널 PNG 생성) · ✍️ 직접: 해석·가설.
**참고 결과(이 데이터 기준)**: 퍼널 100→87→79→62→48→32%, 최대 이탈 후보→비교 구간; 코호트 W1 재구매 40→52%로 개선.

---

## Step 4 — PRD 작성 (플레이북 적용) (15분)

**목표**: Step 2·3 결과를 입력으로 **읽히는 PRD**를 작성. 두괄식·표·지면 매트릭스·지표(Baseline→Target→로깅).

**예시 프롬프트** (집중 역할 사용)
```
prd-authoring-playbook.md §6의 "시안·영상 임베드 PRD 작성가" 역할로 동작해줘.
입력: [Step2 매트릭스], [Step3 분석·가설].
내 서비스 PRD를 써줘 — 결론부터(BLUF) 블록, 문제/솔루션, 지면별 매트릭스(1차 범위),
기능 명세, 성공지표(Baseline→Target→이벤트 로깅), Agent 정책·가드레일.
PRD-shopping-mate.md를 형식 참고로, 내용은 내 주제로.
```
**기대 산출물**: `my-prd.md` (플레이북 기준 충족).
✅ 준비됨: 플레이북·집중역할·PRD 예시 · ✍️ 직접: 내 PRD 본문.

---

## Step 5 — 코드 기반 시안 (Figma 아님) (10분)

**목표**: 디자인 시스템 토큰으로 내 핵심 지면 1~2개의 모바일 시안을 HTML로 만들고, **Agent 적용 지점을 강조**해 PNG로 캡처.

**예시 프롬프트**
```
docs/design-system/tokens/tokens.css 를 사용해 내 핵심 지면([예: 검색결과·상세]) 모바일 시안을
단일 HTML로 만들어줘. Agent 적용 지점은 파란 박스로 강조.
참고: workshop/shopping-mate/wireframes/surfaces.html.
그리고 assets/build/shoot.js로 PNG 캡처해줘:  node shoot.js <my>.html <out>.png 1240 viewport 720
```
**기대 산출물**: `surfaces-my.html` + `*.png` (PRD에 임베드).
✅ 준비됨: 디자인 시스템 + `shoot.js` + `surfaces.html` 예시 · ✍️ 직접: 내 화면.

---

## Step 6 — 동작 프로토타입 + 데모 영상 (10분)

**목표**: 시안을 **단일 HTML 동작 프로토타입**(User Flow 단계 전환 + `?demo=1` 자동재생)으로 만들고, **데모 영상(MP4)** 녹화.

**예시 프롬프트**
```
위 시안을 단일 HTML 동작 프로토타입으로 만들어줘.
- 화면 상태기계 + 단계 전환 애니메이션
- ?demo=1 이면 자동 커서가 핵심 플로우를 클릭으로 시연하고, 끝나면 window.__DEMO_DONE__=true
참고: workshop/shopping-mate/prototype/index.html.
그 다음 데모 영상:  node assets/build/record-proto.js <my-proto>.html <out>.mp4
```
**기대 산출물**: `prototype.html` + `demo.mp4` (+ 포스터 PNG).
✅ 준비됨: 프로토타입 예시 + `record-proto.js`(검증됨) · ✍️ 직접: 내 플로우.
**막힐 때**: 녹화가 안 되면 `npx playwright install ffmpeg` 1회 실행.

---

## Step 7 — 정렬용 1장 패키징 (5분)

**목표**: 디자이너·개발자·리더십 **각각에게 보여줄 1장 요약**을 만들어 합의 준비.

**예시 프롬프트**
```
stakeholder-alignment-playbook.md의 "산출물×청중 매트릭스" 기준으로,
내 산출물(PRD·시안·프로토타입·데모·분석)을 디자이너/개발자/리더십 각각에게
어떻게 보여줄지 1장 요약을 만들어줘. 청중별 한 줄 멘트 포함.
```
**기대 산출물**: 청중별 정렬 요약 (발표용).
✅ 준비됨: 정렬 플레이북 · ✍️ 직접: 내 발표.

---

## 트랙별 응용 (같은 골격, 다른 도메인)

| 트랙 | Agent 예 | 핵심 지면 | 메트릭 |
|------|----------|-----------|--------|
| 마케팅/콘텐츠 | 콘텐츠 추천 Agent | 피드·상세 | CTR·체류·전환 |
| 로컬커머스/O2O | 주변 매장 추천 Agent | 지도·매장상세 | 방문·재방문·객단가 |
| 문화/콘텐츠 | 공연·전시 추천 Agent | 목록·상세·예매 | 예매 전환·재구매 |
| 에듀테크 | 학습 코스 추천 Agent | 홈·코스상세 | 완주율·재수강·NPS |

> 공통 골격: **의도 → 후보 압축 → 결정 근거 → 측정 가능한 지표.** Step 1~7은 동일.

---

## 준비 상태 한눈에 (Readiness)

| 항목 | 상태 | 위치 |
|------|------|------|
| 디자인 시스템 토큰·스타일 | ✅ 준비됨 | `docs/design-system/` |
| PRD 작성 플레이북 | ✅ 준비됨 | `docs/guides/prd-authoring-playbook.md` |
| 이해관계자 정렬 플레이북 | ✅ 준비됨 | `docs/guides/stakeholder-alignment-playbook.md` |
| Shopping Mate 예시 (PRD·시안·프로토·데모) | ✅ 준비됨 | `prd/`, `workshop/shopping-mate/` |
| 캡처/녹화/렌더 스크립트 | ✅ 준비됨 | `assets/build/{shoot,record-proto,render-md}.js` |
| **mock 데이터셋 (28k행)** | ✅ 준비됨 | `analysis/data/mock-events.csv` |
| **분석 스크립트 (검증됨)** | ✅ 준비됨 | `analysis/analyze-shopping-mate.py` |
| 3관점 평가 기준 | ✅ 준비됨 | `docs/evaluation/` |
| v05 강의 덱 (34장) | ✅ 준비됨 | `assets/pptx/fastcampus-commerce-ai-v05-20260626.pptx` |
| **학생 환경(Claude Desktop/Code·Node·Python)** | ⚠️ 미준비 | 운영팀 사전세팅 / 수강생 |
| **트랙별 시작 스캐폴드(빈 템플릿)** | ⚠️ 선택 | 필요 시 추가 제작 가능 |
| **구글 리서치 캡처 이미지** | ⚠️ 미준비 | 받으면 덱·PRD에 교체 |
| .ipynb 노트북 (스크립트는 있음) | ⚠️ 선택 | `analyze-shopping-mate.py`로 대체 가능 |

> **요약**: 강의·실습에 필요한 **콘텐츠·스크립트·데이터·예시는 모두 준비 완료**. 남은 건 **수강생 환경 사전세팅(운영팀)** 과 선택 항목(트랙 스캐폴드·리서치 이미지·노트북)뿐.

<details>
<summary>Change Log</summary>

| 날짜 | 작성자 | 변경 내용 |
|------|--------|----------|
| 2026-06-26 | PM 차성재 with Claude Opus 4.8 | 초안 — Claude Code 실습 Step 0~7(예시 프롬프트·기대 산출물·준비 상태), 환경 설정, 트랙별 응용, Readiness 표. mock 데이터·분석 스크립트 연계 |

</details>
