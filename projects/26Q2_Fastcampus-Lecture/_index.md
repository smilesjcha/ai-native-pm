# 26Q2_Fastcampus-Lecture — Document Map

> Status: Draft
> Document Type: Index
> Product: FastCampus AI Native PM 특강
> Last Updated: 2026-06-26
> Last Author: PM 차성재 with Claude Opus 4.8
> Owner: PM 차성재

## 프로젝트 개요

패스트캠퍼스 "AI NATIVE 시대, AI PM의 새로운 무기" 특강 자료 패키지.
강의 30분 + 실습 60분 구성의 오프라인 특강.

2026-06-26 강의분에 **Apple 디자인 시스템 → 토큰 → 와이어프레임 → 프로토타입 → 데모영상** 워크플로우를 추가하고(v03), 이어서 **덱 전체를 Apple 디자인 그래머 + 나눔고딕으로 프리미엄 리디자인**했다(v04). 표지에 강의 일시 **2026.06.26 (금) 17:00–19:00**를 표기.

### v05 — 실무 AI 적용 사례 (커머스 Shopping Mate)

대상이 **10주 과정 수료 직전 실참여 수강생**으로 바뀐 후속 특강용으로, 제목을 **"실무 AI 적용 사례"**로, 데모를 **Lunch Mate → Shopping Mate(독립 신규 Shopping Agent 앱)**로 재설계했다. 흐름: 커머스 지표 언어 → Agent 벤치마크(Alexa·Clova) 비교 → mock 데이터 코호트·퍼널 분석 → PRD·와이어프레임·프로토타입·데모영상. (v04는 예비 수강생용으로 그대로 보존)

| 문서 | 경로 |
|------|------|
| **강의 프레임 v2** | [`planning/lecture-frame-v2(실무-AI-적용-사례).md`](planning/lecture-frame-v2(실무-AI-적용-사례).md) — 모듈 흐름·산출물·준비물 체크리스트 |
| **강의 설계 방향성** | [`planning/teaching-design-direction.md`](planning/teaching-design-direction.md) — 마지막 수업 큐레이션(하나를 깊게)·Core/Optional·시간 배분·‘안 다룸’ 명시 |
| **Shopping Mate PRD** | `prd/PRD-shopping-mate.md` (두괄식·지면별 Agent 매트릭스·코드 시안/영상 임베드 적용) |
| **PRD 작성 플레이북** | [`docs/guides/prd-authoring-playbook.md`](../../docs/guides/prd-authoring-playbook.md) — 두괄식·중복제거·표양식·Confluence storage format·지면별 매트릭스·코드 시안/영상·집중역할 |
| **이해관계자 정렬 플레이북** | [`docs/guides/stakeholder-alignment-playbook.md`](../../docs/guides/stakeholder-alignment-playbook.md) — 디자이너·개발자·리더십 정렬 카드·산출물×청중 매트릭스·합의 게이트 (3관점 평가 연계) |
| **지면별 시안 (코드)** | `workshop/shopping-mate/wireframes/surfaces.html` (Home/SRP/PLP/PDP Agent 적용) · `prd/assets/` 로컬 이미지 |
| **와이어프레임** | `workshop/shopping-mate/wireframes/index.html` (6화면×4단계 User Flow) |
| **프로토타입 + 데모영상** | `workshop/shopping-mate/prototype/` (`index.html`, `demo-shopping-mate.mp4`) |
| **실습 가이드 v05** | [`workshop/workshop-guide-v05(실무-AI-적용-사례).md`](workshop/workshop-guide-v05(실무-AI-적용-사례).md) — Claude Code Step 0~7(디자인 토큰 부트스트랩 포함) + Core/Optional + 준비 상태 |
| **mock 데이터셋 + 분석** | `analysis/data/mock-events.csv` (28k행) · `analysis/analyze-shopping-mate.py` (검증됨, 코호트/퍼널) |
| **분석 차트(덱용)** | `analysis/charts.html` → `analysis/outputs/sm-cohort-funnel.png` |
| **PPT/PDF (v05)** | `assets/pptx/fastcampus-commerce-ai-v05-20260626.pptx` / `.pdf` (36장 — 디자인 토큰 부트스트랩·핵심 큐레이션·PRD노하우·지면 매트릭스·정렬 포함) |

## 문서 맵

| 문서 | 경로 | 설명 |
|------|------|------|
| PRD (데모 예시) | `prd/PRD.md` | "오늘의 점심 메이트" 서비스 PRD (v04 강의용) |
| 강의 스크립트 | `workshop/lecture-script.md` | 30분 강의 노트 |
| 실습 가이드 | `workshop/workshop-guide.md` | 60분 실습 Step-by-Step |
| 데모 프로토타입 (구) | `workshop/demo-prototype.html` | 단일 HTML 프로토타입 |
| 와이어프레임 (Figma 보드) | `workshop/wireframes/index.html` | 9화면 × 4단계 계층 시안 (디자인 시스템 적용) |
| 프로토타입 (v3) | `workshop/prototype/index.html` | 동작 HTML (`?demo=1` 자동재생) + Apple 토큰 |
| 데모 영상 | `workshop/prototype/demo-todays-lunch-mate.mp4` | 클릭 흐름 seamless MP4 (28초) |
| **PPT (v04, 2026-06-26)** | `assets/pptx/ai-native-pm-lecture-v04-20260626.pptx` | **프리미엄 리디자인 최신본 (44장, Apple+나눔고딕)** |
| **PDF (v04)** | `assets/pptx/ai-native-pm-lecture-v04-20260626.pdf` | **v04 PDF export (PowerPoint 고충실도)** |
| PPT (v03) | `assets/pptx/ai-native-pm-lecture-v03-20260626.pptx` | 콘텐츠 추가본 (리디자인 전, 44장) |
| PPT (v02) | `assets/pptx/ai-native-pm-lecture-v02-20260519.pptx` | 직전 버전 (37장) |
| 빌드 파이프라인 | `assets/build/` | PNG·캡처·영상·PDF 재현 스크립트 |
| 레퍼런스 캡처 | `assets/references/` | getdesign.md·스타일가이드·와이어프레임 PNG |

> 공용 디자인 시스템: [`docs/design-system/`](../../docs/design-system/) — Apple 토큰(JSON/CSS/JS)·아이콘·에셋·리빙 스타일 가이드.
> PPT 제작 기준: [`docs/design-system/ppt-design-guide.md`](../../docs/design-system/ppt-design-guide.md) — 컨설팅급 덱 그리드·타입·컬러·컴포넌트 가이드.

<details>
<summary>Change Log</summary>

| 날짜 | 작성자 | 변경 내용 |
|------|--------|----------|
| 2026-06-26 | PM 차성재 with Claude Opus 4.8 | v04 프리미엄 리디자인 — 덱 전체를 Apple 그래머+나눔고딕으로 재디자인(단일 Action Blue 액센트, 헤비 바 제거, 러닝 푸터·페이지번호, 라운드 카드, 표지 일시 표기). PPT 제작 가이드(`ppt-design-guide.md`) 신설. 슬라이드 겹침 일괄 보정 → v04 PPT/PDF(44장) |
| 2026-06-26 | PM 차성재 with Claude Opus 4.8 | v03 추가 — 디자인 시스템 인프라(`docs/design-system/`), getdesign.md 캡처, 와이어프레임(Figma 보드), 프로토타입+데모영상(MP4), PPT 7슬라이드 추가 → v03 PPT/PDF(44장) |
| 2026-04-16 | PM 차성재 with Claude Opus 4.6 | 초안 작성 |

</details>
