# 26Q3_AI-Native-PM — Document Map

> Status: Draft
> Document Type: Index
> Product: KMAC 2026 핀테크 인력양성사업 · 기획자 과정 M5 「생성형 AI를 활용한 기획자 업무생산성 향상」
> Last Updated: 2026-09-18
> Last Author: PM 차성재 with Claude Fable 5.1
> Owner: PM 차성재

## 프로젝트 개요

2026-09-19(토) 09:30–16:30, 핀테크 서비스 기획자·PM·금융 실무자(비개발 직군) 대상 7시간 편성(실강 5시간) 오프라인 강의.
원 교육과정 기획안(`source/`)의 3세션 구성(도구·프롬프트 → 기획 문서·리서치 → 데이터·프레젠테이션)을 유지하되, 강사의 이전 강의 노하우(요청 6요소, 환각 3원칙, 두괄식 PRD, 3관점 AI 리뷰, 산출물 중심 실습)를 결합해 **"퇴근할 때 손에 들고 가는 산출물 3개"** 를 만드는 실습형 강의로 설계한다.

**진행 순서**: ① 목차·시간표·설계 리뷰(이 폴더의 `planning/`) → ② 세션별 상세 내용 확정 → ③ 교안 PPT 제작(`assets/pptx/`) → ④ 실습 키트 배포(`workshop/`).
**현재 상태(2026-09-18 16:00)**: ①·② 완료(자동 검수 2렌즈 + 교차 검수) → v2 확장(3블록 × 70–80장) → ③ **덱 초안 252장 완성**(PowerPoint PDF 2종, `QA-REPORT.md`) → **강사 리뷰·캡처 확보·센터 사전확인 송부 대기**(`planning/00-review-checklist.md` §G·§F·A1–A8·E5).

## 지금 바로 읽을 순서 (리뷰용)

| 순서 | 문서 | 왜 먼저 보나 |
|------|------|-------------|
| 1 | [`planning/00-review-checklist.md`](planning/00-review-checklist.md) | **함께 결정해야 할 항목**과 권장안. 이것부터 답하면 나머지가 확정된다 |
| 2 | [`planning/02-timetable.md`](planning/02-timetable.md) | 09:30–16:30 시간표(점심 11:30–12:30, 쉬는시간 11:10/14:10/16:10) |
| 3 | [`planning/03-curriculum-outline.md`](planning/03-curriculum-outline.md) | **목차** — 13개 모듈, 분 단위 배분, 핵심 메시지·노하우·실습·산출물·슬라이드 예산 |
| 4 | [`planning/01-lecture-design.md`](planning/01-lecture-design.md) | 설계 원칙, 대상 분석, 러닝 케이스(가상 사례), Core/Optional, 안 다루는 것 |
| 5 | [`planning/04-session-1-detail.md`](planning/04-session-1-detail.md) · [`05-session-2-detail.md`](planning/05-session-2-detail.md) · [`06-session-3-detail.md`](planning/06-session-3-detail.md) | 세션별 상세 강의 내용(장표 단위 메시지·노하우·시연·실습·예상 질문) |
| 6 | [`planning/07-instructor-profile.md`](planning/07-instructor-profile.md) | 이 강의용으로 최적화한 강사 소개(1장 버전·30초 멘트) |
| 7 | [`planning/08-prep-checklist.md`](planning/08-prep-checklist.md) | D-1·당일 준비물, 시연 폴백, 수강생 안내 |

## 문서 맵

| 구분 | 문서 | 설명 |
|------|------|------|
| 원본 | `source/kmac_핀테크인력양성_교육과정기획안_260609_v2.pdf` | KMAC 교육과정 기획안 원본(M1–M8 + 온라인 10과정) |
| 원본 | `source/kmac-curriculum-full-text.txt` | PDF 텍스트 추출본(검색용) |
| 원본 | [`source/kmac-m5-brief.md`](source/kmac-m5-brief.md) | M5 요구사항 정리 + M3·M4(선행 회차)와의 연결 포인트 |
| 기획 | `planning/00–08` | 위 표 참조 |
| 기획 | [`planning/09-slide-plan-draft.md`](planning/09-slide-plan-draft.md) | (Deprecated) 모듈별 장수 예산 초안 — 14로 대체 |
| 기획 v2 | [`planning/10-tool-strategy-map.md`](planning/10-tool-strategy-map.md) | ChatGPT·Claude·Gemini(+Deep Research·Desktop·Code) 상태 × 커리큘럼 용도 × 금융권 환경 3층, 4단계 사용 로드맵, 제약 대응·전환 시나리오 |
| 기획 v2 | [`planning/11-fintech-service-lens.md`](planning/11-fintech-service-lens.md) | 핀테크 서비스 유형 7종 렌즈(지표·규제 질문·AI 활용점·프롬프트 세 칸 변형), 문서 안정화 원칙, 프롬프트 사다리 L1→L6, 적용 예시 3 |
| 기획 v2 | [`planning/12-harness-doc-structure.md`](planning/12-harness-doc-structure.md) | 하네스 문서 구조(규칙 파일·context·templates·프로젝트 트리), 핀트리 규칙 파일 예시, 안정화 메커니즘, 도입 로드맵 0→5 |
| 기획 v2 | [`planning/13-ai-builder-track.md`](planning/13-ai-builder-track.md) | Figma 대신 Claude — 토큰→코드 시안→프로토타입→데모 영상→PRD 임베드 5단계, Lv1~Lv3 전략, 실제 머니핏 에셋 갤러리 |
| 기획 v2 | [`planning/14-slide-plan-v2.md`](planning/14-slide-plan-v2.md) | **장표 단위 SSOT** — 3블록 × 72~78장, 유형 5종(강의·시연·실습단계·캡처·참고)·시간 검산·에셋·출처 |
| 기획 v2 | [`planning/15-organizer-constraints.md`](planning/15-organizer-constraints.md) | 운영기관 메일(9/18) 조건 → 설계 변경(30명 직장인·일반인, 미니 프로젝트 제출, 사전확인·배포, 장소) + 추가 장표 4장 |
| 운영 | [`ops/organizer-reply-draft.md`](ops/organizer-reply-draft.md) | 운영기관 회신 초안(강의안·배포·준비사항·노트북·미니 프로젝트) — 강사가 발송 |
| 실습 | [`workshop/prompt-templates-fintech.md`](workshop/prompt-templates-fintech.md) | 금융 도메인 프롬프트 템플릿(요청 6요소 기반) |
| 실습 | [`workshop/README.md`](workshop/README.md) | 수강생 실습 키트 안내(배포 ZIP 최상위 README) |
| 실습 | `workshop/lab-1-prompt-design.md` · `lab-2-prd-draft.md` · `lab-3-automation-workflow.md` | 세션별 실습 가이드(수강생 배포용, **프롬프트 전문의 단일 원본**) |
| 실습 | [`workshop/prompt-card-deck.md`](workshop/prompt-card-deck.md) | 하루 동안 쓰는 모든 프롬프트 전문을 실행 순서대로 모은 카드 덱(인쇄·배포용) |
| 실습 | [`workshop/lab-3-workflow-sheet.md`](workshop/lab-3-workflow-sheet.md) | 실습 ④ "나의 자동화 워크플로 1장" A4 인쇄 시트 |
| 실습 | [`workshop/mini-project-submission.md`](workshop/mini-project-submission.md) | **미니 프로젝트 제출 안내** — 제출물 4개·개인화 기준·형식·체크리스트(채널·기한은 센터 회신 반영) |
| AI Builder | [`workshop/builder/`](workshop/builder/README.md) | 머니핏 코드 시안 보드 `surfaces.html`, 동작 프로토타입 `prototype/index.html`(?demo=1 자동재생), 제작 프롬프트 `prompts.md`, 재생성 명령 |
| 에셋 | `assets/builder/` | 시안 보드 PNG · 프로토타입 화면 PNG 5장 · 데모 영상 `moneyfit-demo.mp4`(+poster) · 퍼널 차트 PNG — 덱 삽입용 |
| 에셋 | [`assets/screenshots/NEEDED.md`](assets/screenshots/NEEDED.md) | 도구 화면 캡처 요청 목록(파일명·장표·요소·계정·주의) — 강사가 별도 브라우저 프로필에서 캡처 |
| 실습(강사 전용) | `workshop/lab-1-answer-key(Instructor).md` | 실습 ② 정답표·빈칸 발화 — 수강생 배포 ZIP 제외 |
| 실습 | `workshop/prompts-txt/` | 붙여넣기 전용 .txt 16개(lab-1 3 · lab-2 6 · lab-3 7) — MD가 원본, `generate-prompts-txt.py`로 재생성 |
| 실습 | `workshop/sample-data/` | 교육용 가상 데이터 — `moneyfit-events.csv`(1,517행, 퍼널 5단계) · `moneyfit-transactions.csv`(603행) · `moneyfit-kickoff-meeting-notes.md` · `generate-sample-data.py`(seed 고정 재생성) · README(데이터 딕셔너리) |
| 벤치마크 | [`references/README.md`](references/README.md) | 형제 레포에서 복사한 하네스(claude.md/AGENTS.md)·PPT 제작·강의 문서 인덱스 |
| 컨텍스트 | [`claude.md`](claude.md) · [`agents.md`](agents.md) | Claude Code / Codex 작업 지침 |
| 산출물 | `assets/pptx/` | `lib.js`(아키타입 17종) + `slides-block1~3.js` + `generate.js` → **`kmac-m5-ai-pm-productivity-20260919.pptx/.pdf`(강사용 252장, 노트 포함)** · **`…-dist.pptx/.pdf`(배포용, 노트·유형 pill 제거)** · `export-pdf.sh`(PowerPoint PDF 저장) · `strip-notes.py` · [`QA-REPORT.md`](assets/pptx/QA-REPORT.md) · `render-samples/` |

## 관련 레포 문서 (링크로 참조, 복사하지 않음)

- PPT 제작 기준: [`docs/design-system/ppt-design-guide.md`](../../docs/design-system/ppt-design-guide.md) — Apple 그래머 + 나눔고딕, 컨설팅급 덱 규칙
- 디자인 시스템: [`docs/design-system/`](../../docs/design-system/)
- PRD 작성 플레이북: [`docs/guides/prd-authoring-playbook.md`](../../docs/guides/prd-authoring-playbook.md)
- 이해관계자 정렬 플레이북: [`docs/guides/stakeholder-alignment-playbook.md`](../../docs/guides/stakeholder-alignment-playbook.md)
- 3관점 평가 기준: [`docs/evaluation/`](../../docs/evaluation/)
- 직전 강의 자산: [`projects/26Q2_Fastcampus-Lecture/`](../26Q2_Fastcampus-Lecture/) (강의 프레임·설계 방향성·실습 가이드·`assets/pptx/generate-v05.js`) · [`projects/26Q2_Claude-Code-Club-Talk/`](../26Q2_Claude-Code-Club-Talk/) (스크립트·`generate.js`)

<details>
<summary>Change Log</summary>

| 날짜 | 작성자 | 변경 내용 |
|------|--------|----------|
| 2026-09-18 | PM 차성재 with Claude Fable 5.1 | v2 확장 — 기획 10~15(도구 전략·서비스 렌즈·하네스 구조·AI Builder·슬라이드 플랜 v2·운영기관 조건), ops 회신 초안, 미니 프로젝트 제출 안내, builder 시안·프로토·영상 에셋, 캡처 요청 목록, pptx 빌드 구조 |
| 2026-09-18 | PM 차성재 with Claude Fable 5.1 | 세션 상세 04~06·실습 키트(README·lab 1~3·템플릿 덱·카드 덱·워크플로 시트·.txt 16·가상 데이터) 추가, 자동 검수 반영 상태 표기, 문서 맵 갱신 |
| 2026-09-18 | PM 차성재 with Claude Fable 5.1 | 프로젝트 신설 — 폴더 구조, 원본 PDF 이동, 벤치마크 자료 복사, 기획 문서(설계·시간표·목차·리뷰 체크리스트·강사 소개·준비물) 초안 |

</details>
