# 강사용 자료·저장소 관리

학생의 시작 화면은 루트 README에서 관리합니다. 이 문서는 강의 진행·교안 제작·검증 자료의 색인입니다.

## 자료 기준

- 1·2주차는 배포본, 3주차는 `CODEX_CLI` 개편본을 사용합니다.
- 3주차 최신 코드·교안은 `codex/day3-review-intelligence` 브랜치에 있습니다. README만 main에서 확인했다고 실습 코드까지 동일한 버전인 것은 아닙니다.
- 4·5주차의 기존 `DRAFT` 교안과 Notebook은 초안입니다. [최신 운영안](https://github.com/smilesjcha/llm-agent-and-workflow-automation/blob/codex/day3-review-intelligence/materials/day3/4·5주차_운영안_및_미니프로젝트.md)을 우선합니다.
- 학생 ZIP에는 전체 교안이 들어 있지 않습니다. README의 자료 링크는 ZIP에서도 열 수 있도록 GitHub 절대 URL을 사용합니다.

## 주차별 운영 문서

| 주차 | 강의 진행 | 준비·검증 |
|---|---|---|
| 1주차 | [핵심교안](https://github.com/smilesjcha/llm-agent-and-workflow-automation/blob/codex/day3-review-intelligence/materials/day1/2026-08-23_Day1_강사용_핵심교안.md) | [실행 파일 맵](https://github.com/smilesjcha/llm-agent-and-workflow-automation/blob/codex/day3-review-intelligence/materials/day1/실행파일_차시별_맵.md) · [데모환경·준비 점검](https://github.com/smilesjcha/llm-agent-and-workflow-automation/blob/codex/day3-review-intelligence/materials/day1/강의준비_갭분석_및_데모환경.md) |
| 2주차 | [상세교안](https://github.com/smilesjcha/llm-agent-and-workflow-automation/blob/codex/day3-review-intelligence/materials/day2/2026_Day2_강사용_상세교안.md) | [강의 직전 체크리스트](https://github.com/smilesjcha/llm-agent-and-workflow-automation/blob/codex/day3-review-intelligence/materials/day2/2026_Day2_강의직전_체크리스트.md) |
| 3주차 | [상세교안](https://github.com/smilesjcha/llm-agent-and-workflow-automation/blob/codex/day3-review-intelligence/materials/day3/2026_Day3_강사용_상세교안.md) · [페이지별 진행](https://github.com/smilesjcha/llm-agent-and-workflow-automation/blob/codex/day3-review-intelligence/materials/day3/페이지별_강의_진행.md) · [심화 4개 차시 운영](https://github.com/smilesjcha/llm-agent-and-workflow-automation/blob/codex/day3-review-intelligence/materials/day3/심화_4개차시_강사운영안.md) | [체크리스트](https://github.com/smilesjcha/llm-agent-and-workflow-automation/blob/codex/day3-review-intelligence/materials/day3/2026_Day3_강의직전_체크리스트.md) · [개편 검증결과](https://github.com/smilesjcha/llm-agent-and-workflow-automation/blob/codex/day3-review-intelligence/materials/day3/2026_Day3_개편_검증결과.md) |
| 4·5주차 | [운영안·미니 프로젝트](https://github.com/smilesjcha/llm-agent-and-workflow-automation/blob/codex/day3-review-intelligence/materials/day3/4·5주차_운영안_및_미니프로젝트.md) | 개편 후 코드·교안 일치 여부 재검증 |

추가 자료:

- [3주차 아키텍처](https://github.com/smilesjcha/llm-agent-and-workflow-automation/blob/codex/day3-review-intelligence/materials/day3/코드리뷰_Agent_아키텍처.md) · [GitHub PR 런북](https://github.com/smilesjcha/llm-agent-and-workflow-automation/blob/codex/day3-review-intelligence/materials/day3/GitHub_PR_자동화_런북.md)
- [글로벌 사례 해설](https://github.com/smilesjcha/llm-agent-and-workflow-automation/blob/codex/day3-review-intelligence/materials/day3/글로벌_사례_해설.md) · [공식 출처 목록](https://github.com/smilesjcha/llm-agent-and-workflow-automation/blob/codex/day3-review-intelligence/materials/day3/day3_global_references.json)
- [40시간 실습 지도](https://github.com/smilesjcha/llm-agent-and-workflow-automation/blob/codex/day3-review-intelligence/materials/40시간_실습_정의와_차시별_실행지도.md) — 전체 과정의 참고 지도. 최신 차시별 개편본과 충돌하면 개편본 우선
- [콘텐츠 품질 기준](https://github.com/smilesjcha/llm-agent-and-workflow-automation/blob/codex/day3-review-intelligence/design-system/ppt/cha-sungjae-lecture/content-harness/COURSE_QUALITY_VALIDATION.md) · [코드 리뷰 기준](https://github.com/smilesjcha/llm-agent-and-workflow-automation/blob/codex/day3-review-intelligence/AGENTS.md)

## 코드·배포 검증

3주차 개편 브랜치의 Python 환경에서 실행합니다.

```bash
python -m pip install -r requirements-day3.txt

# 코드 ZIP에 필요한 파일·실행 검사
python scripts/run_day3_preflight.py --code-only

# PPT·PDF를 포함한 강사용 전체 준비 검사
python scripts/run_day3_preflight.py

# README·Notebook·코드 변경 뒤 학생 ZIP 재생성
python scripts/build_day3_student_bundle.py

# 배포·사전 검사 테스트
python -m pytest -q tests/test_day3_student_bundle.py tests/test_day3_preflight.py

# Day 1 회귀 테스트
python -m pytest -q tests/test_day1_agent.py tests/test_langchain_langgraph_lab.py tests/test_meeting_agent_workflow.py tests/test_openai_provider.py tests/test_ollama_tool_agent.py
```

ZIP은 명시된 파일 목록만 포함합니다. 재배포 전 `.env`, 토큰, 개인 실습 결과가 섞이지 않았는지 확인합니다. README가 ZIP에 포함되므로 README 수정 후에는 3주차 ZIP도 다시 생성합니다. 다른 주차 ZIP은 해당 주차를 새로 배포할 때 별도로 갱신합니다.

Codex 실제 호출은 로그인·계정 한도와 명시적 실행 선택을 확인한 뒤 수행합니다. 배포 검사나 예제 실행 결과를 실제 모델 검증으로 표현하지 않습니다.

## PPT 제작

슬라이드 제작 의존성이 준비된 환경에서 사용합니다. 명령만 실행했다고 배포가 완료되는 것은 아닙니다.

```bash
node scripts/slides/build_day1_detail.mjs
node scripts/slides/build_day2_student_ready.mjs

# 기존 정본과 다른 파일명으로 생성 후 검수
DAY3_FINAL_PATH="$PWD/slides/Day3_CODEX_CLI_next.pptx" node scripts/slides/build_day3_codex_cli.mjs

# 4·5주차 기존 초안 생성기
node scripts/slides/build_days2_5_drafts.mjs --day 4
node scripts/slides/build_days2_5_drafts.mjs --day 5
```

변경 후에는 PDF 변환, 전체 페이지 렌더, 글자 크기·줄바꿈·잘림 확인이 필요합니다. 교안에 노출하는 명령·파일·결과가 Notebook 및 학생 가이드와 일치하는지도 검사합니다.

## README 관리 원칙

1. 학생이 선택할 자료와 최초 실행 순서만 앞에 배치합니다.
2. 강사 발화·제작 명령·검증 로그·내부 변경 이력은 학생 안내와 분리합니다.
3. 배포본과 초안을 구분하고, 현재 수업의 브랜치·다운로드 경로를 함께 갱신합니다.
4. 코드를 내려받는 방법, 예제 실행, 실제 모델 호출, 직접 수정 단계를 구분합니다.
5. 링크 대상의 존재와 Git 추적 여부를 확인한 뒤 공개합니다.
