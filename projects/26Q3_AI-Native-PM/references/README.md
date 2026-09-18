# 벤치마크 자료 인덱스 — 하네스 · PPT 제작 · 강의 문서

> Status: Active
> Document Type: Reference
> Product: 26Q3_AI-Native-PM
> Last Updated: 2026-09-18
> Last Author: PM 차성재 with Claude Fable 5.1
> Owner: PM 차성재

형제 레포(`~/sungjae-cha/*`)에서 **복사**해 온 참고 자료. 이 강의 제작 시 "무엇을 어디서 가져올지" 빠르게 찾기 위한 벤치마크 세트다. 원본이 갱신되어도 여기는 자동 반영되지 않는다(스냅샷 2026-09-18). 복사 시 개인 경로(`/Users/...`)와 이메일은 `<HOME>`·`<redacted>`로 치환했다. 연락처가 포함된 강사프로필 PDF와 참여자 설문·명단류는 복사하지 않았다.

같은 레포(`ai-native-pm`) 안의 자료는 복사하지 않고 링크로 참조한다: [`docs/design-system/ppt-design-guide.md`](../../../docs/design-system/ppt-design-guide.md) · [`docs/guides/`](../../../docs/guides/) · [`docs/evaluation/`](../../../docs/evaluation/) · [`projects/26Q2_Fastcampus-Lecture/`](../../26Q2_Fastcampus-Lecture/) · [`projects/26Q2_Claude-Code-Club-Talk/`](../../26Q2_Claude-Code-Club-Talk/).

## 1. `harness/` — claude.md · AGENTS.md · 규칙 파일 벤치마크

| 파일 | 원본 | 배울 점 (이 프로젝트에 적용) |
|------|------|------------------------------|
| `how-to-work-better/CLAUDE.md` | `how-to-work-better/` 루트 | 레포 구조 도식 + 작업 원칙 6 + 자주 쓰는 명령 + PPT 품질 기준. **강의별 독립 폴더** 원칙 |
| `how-to-work-better/AGENTS.md` | 〃 | 같은 레포를 Codex용으로 다시 쓴 예. Claude/Codex **공통 규칙은 별도 문서**(`common-guidelines.md`)로 분리 |
| `how-to-work-better/common-guidelines.md` | `docs/harness/` | 디렉터리 규약 표, 콘텐츠 규칙(가상 회사·무료 계정 기준), PPT 품질 게이트, Git 계정 전환 규약 |
| `how-to-work-better/claude-settings.json` | `.claude/settings.json` | python/soffice/pdftoppm/zip 허용 목록 — 이 레포 `.claude/settings.json`(문서 레포용)과 비교 |
| `how-to-work-better-worklife-ax-workshop/CLAUDE.md` | 강의 폴더 | **작업 순서 강제**(docs → slide-plan → slides_data → build → QA → ZIP), 핵심 제약(디자인 단일 강조·실습 2개 고정·가상 데이터), 스크린샷 요청 절차 |
| `how-to-work-better-worklife-ax-workshop/AGENTS.md` | 〃 | **파일 소유권 매핑표**("바꾸고 싶은 것 → 수정할 파일"), 캡처·삽입 워크플로, 금지 사항 → 이 프로젝트 `agents.md`가 채택 |
| `how-to-work-better-worklife-ax-workshop/README.md` | 〃 | 강의 폴더 README 표준(폴더 안내·빠른 시작·운영 요약) |
| `how-to-work-better-samcheok-codex-demo/AGENTS.md` 등 | 삼척 강의 시연 폴더 | **시연 범위 제한형** 규칙 파일 + `completion-criteria.md`(완료 기준을 파일로) — M12 "팀 규칙 파일" 예시로 슬라이드에 인용 가능 |
| `llm-agent-and-workflow-automation/AGENTS.md` | 40시간 과정 레포 | 영문 코드 리뷰 규칙형(안전 경계·테스트 증거·클린 코드·리뷰 출력) |
| `llm-agent-and-workflow-automation/CONTENT_HARNESS.md` | `design-system/ppt/.../content-harness/` | **콘텐츠 하네스**: 커뮤니케이션 한 문장, 메시지 우선순위(Level 0/1/2), 반복 정책, 차시 안 진행 순서(질문→개념→근거 화면→코드→활동→Gate) |
| `llm-agent-and-workflow-automation/COURSE_QUALITY_VALIDATION.md` | 〃 | 과정 품질 검증 게이트(중복·성립 조건·검증 절차) |
| `lodging-integration-hub-AGENTS.md` | 채용 과제 백엔드 프로젝트 | 한국어 AGENTS.md 예 — 브랜치 전략·PR 규약 서술 방식 |

## 2. `ppt-production/` — PPT 제작 방식 벤치마크

| 파일 | 원본 | 배울 점 |
|------|------|--------|
| `goorm/ppt-production-qa-playbook.md` | `goorm/` | **렌더링 QA 절차**(PPTX→PDF→PNG contact sheet→inspect 로그 검색), 개선 패턴(카드 2줄 이하·중앙감·제목 폭), 최종 납품 기준 |
| `goorm/component-guide.md` · `design-tokens.json` · `DESIGN-apple.md` | 〃 | Apple 토큰을 발표용 컴포넌트로 재구성한 예(Deep Navy 변주) |
| `decks/ai-campus-prism-agentic-ai-lecture.pdf/.pptx` | `goorm/outputs/` | 2026-07 최신 완성 덱(43장, 60분). RUN OF SHOW·ROLE LENS·CURRICULUM BRIDGE·PRE-Q 아키타입 참고 |
| `llmops-16week/PPT_PRODUCTION_GUIDELINE.md` | `llmops-16week/week01/lecture/` | 콘텐츠 우선순위(장수 늘리기 금지·제목만 읽어도 논리 전진), 명사형 제목, **14pt 최소**, 의미 기반 파랑, 24개 QA 게이트 |
| `llmops-16week/DESIGN_SYSTEM.md` | 〃 | Black/White/Navy/Blue 에디토리얼 시스템 + 주차 로드맵 모듈 규칙 |
| `how-to-work-better-worklife-ax-workshop/ppt-design-system.md` · `slide-plan.md` · `kedi-benchmark-notes.md` | 워크숍 `design/` | 화이트+딥블루 시스템, **80장 slide-plan 표(# · 타입 · 제목)** 양식, 아키타입 13종 |
| `how-to-work-better-worklife-ax-workshop/build_pptx/*.py` | 〃 | **python-pptx 빌드 분리 구조**: `theme.py`(토큰) / `layouts.py`(레이아웃) / `shapes.py` / `slides_data.py`(내용) / `build.py`(진입점). pptxgenjs 대안 |
| `how-to-work-better-samcheok-ai-docs/ppt-design-system.md` · `slide-plan.md` · `05-qa-report.md` · `07-production-record.md` | 삼척 강의 | 68장 3시간 실습 덱의 설계·**QA 리포트·제작 기록** 양식 |
| `llm-agent-and-workflow-automation/USAGE.txt` · `design-tokens.json` · `TUTORIAL_COVERAGE.md` · `components-README.md` | `design-system/ppt/cha-sungjae-lecture/` | 템플릿 PPTX 기반 제작 방식과 컴포넌트 매니페스트 |

**이 프로젝트의 선택**: 디자인은 레포 공용 [`ppt-design-guide.md`](../../../docs/design-system/ppt-design-guide.md)(Apple + 나눔고딕), 빌더는 [`generate-v05.js`](../../26Q2_Fastcampus-Lecture/assets/pptx/generate-v05.js)(pptxgenjs) 재사용, QA는 goorm 플레이북 + llmops 게이트를 합쳐 적용한다.

## 3. `lecture-docs/` — PM·업무생산성 강의 문서 벤치마크

| 파일 | 원본 | 배울 점 (M5 적용 모듈) |
|------|------|------------------------|
| `how-to-work-better-worklife-ax-workshop/01-lecture-plan.md` | 2026-07-23 워크숍 | 설계 원칙 표, AS-IS/TO-BE, **AI 업무 생산성 발전 6단계**(M12) |
| `.../02-curriculum.md` | 〃 | 시간표에 **핵심 메시지 열**을 두는 양식(M0–M13 목차에 적용) |
| `.../03-claude-free-paid-scope.md` | 〃 | 무료/유료 범위 구분 표, 기능별 "직접 실습/강사 시연" 지정(M1·M12) |
| `.../05-pre-class-announcement.md` · `pre_class_checklist.md` | 〃 | 수강생 사전 안내 메일·체크리스트(운영기관 전달용) |
| `.../06-instructor-checklist.md` · `07-demo-plan.md` | 〃 | D-1 체크리스트·**시연 폴백표**, 시연별 메시지·입력·내용·수강생 메시지 표(M5·M9·M11·M12 시연) |
| `.../ai_usage_dos_and_donts.md` · `confidential_data_checklist.md` | 배포 키트 | **입력 금지 5종, 환각 3원칙, 입력 전 30초 체크리스트, 치환 예시**(M0·M3) |
| `.../workshop_guide.md` | 〃 | 수강생용 실습 키트 안내 양식(`workshop/README.md`) |
| `how-to-work-better-samcheok-ai-docs/README.md` · `01-lecture-runbook.md` | 2026-10-13 강의 | 180분 진행표(시간·분·운영·산출물), **진행 원칙 4**, 구간별 장표 |
| `.../06-slide-instructor-notes.md` | 〃 | **장표별 강사 가이드 양식**(운영 시각·권장 시간·해설·질문·예상 오답·운영) → 세션 상세 문서 양식 |
| `.../02-facilitator-answer-key.md` | 〃 | 강사용 정답(오류 초안 검수 실습) → M3 실습 ② |
| `.../reusable-prompt-templates.md` · `report-prompt.md` · `plan-prompt.md` · `review-prompt.md` · `review-checklist.md` | 〃 | **요청 6요소 기반 그대로 붙여넣는 프롬프트**·부서장 관점 검수표 → `workshop/prompt-templates-fintech.md` 원형 |
| `.../start-guide.md` | 〃 | 수강생 시작 가이드(파일 열기·복사 순서·실패 시 대체 동선) |
| `llm-agent-and-workflow-automation/INSTRUCTOR_GUIDE.md` | 40시간 과정 | 강사용 자료 색인·README 관리 원칙 |
| `.../2026_Day2_강의직전_체크리스트.md` | 〃 | 강의 직전 체크리스트 양식 |
| `.../IPA_40H_상세_커리큘럼_및_무료실습_설계.md` | 〃 | 무료 실습 설계 원칙(유료 없어도 계약을 학습) |
| `llmops-16week/01_week1_강의안.md` · `00_운영_커리큘럼.md` | 대학원 LLMOps | **상세 강의안 양식**(강의 정의·운영자 소개·180분/100분 운영표·용어 표기 원칙·학습성과) |
| `sookmyung-agentic-ai/agentic_ai_curriculum_detailed_v1.md` | 숙명여대 교과 설계 | 산출물 체계표(Roadmap·2-Pager·PRD·HLD·LLD·ADR: 핵심 질문·주 독자·최소 포함·완료 시점) → M6 문서 계층 |

## 4. 복사하지 않은 것 (이유)

| 자료 | 이유 |
|------|------|
| `goorm/output/pdf/차성재_강사프로필_*.pdf`, `ax-lecture/output/pdf/*` | 전화번호 포함. 내용은 `planning/07-instructor-profile.md`에 연락처 제외 반영 |
| `how-to-work-better/.../04-survey-analysis.md`, `ai-native-and-job-preparation/week01/internal/*` | 참여자 설문·명단 등 제3자 정보 |
| `aizen-global/*` | 고객사 비공개 스냅샷 |
| `test/`, `test2/` | 실험 폴더(중복) |
| `ax-lecture/output/pdf/삼척새일센터_강의계획서_*.pdf` | 담당자 실명 포함. 구조는 삼척 `01-lecture-runbook.md`로 대체 |

<details>
<summary>Change Log</summary>

| 날짜 | 작성자 | 변경 내용 |
|------|--------|----------|
| 2026-09-18 | PM 차성재 with Claude Fable 5.1 | 초안 — 하네스 12·PPT 제작 11·강의 문서 18개 파일 인덱스, 배울 점·적용 모듈, 미복사 사유 |

</details>
