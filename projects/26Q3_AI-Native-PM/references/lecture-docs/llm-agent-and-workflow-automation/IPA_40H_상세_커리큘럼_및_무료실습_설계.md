# LLM Agent & 업무 자동화 40H 상세 커리큘럼 및 무료 실습 설계

> 원본: `IPA_교육과정 커리큘럼_LLM Agent & 업무자동화_40H.hwp`  
> 재설계 기준일: 2026-08-22  
> 1일차: 2026-08-23(일) 09:00–18:00, 점심 14:00–15:00  
> 2–5일차: 09:00–18:00, 점심 12:00–13:00  
> 대상: 재직자·구직자, Python 기초를 알고 있는 전공자 중심

## 0. 한눈에 보는 설계 결론

이 과정은 “LLM 도구를 많이 소개하는 수업”이 아니라, 40시간 동안 하나의 실제 업무 제품을 완성하는 Project Based Learning(PBL) 과정으로 운영한다.

학습자가 만드는 최종 제품은 **K-Work Copilot**이다.

1. 한국어 회의 음성을 로컬 STT로 텍스트화한다.
2. LLM으로 회의 요약, 결정사항, Action Item을 구조화한다.
3. LangChain으로 모델·프롬프트·도구를 조합한다.
4. LangGraph로 재시도, 분기, 체크포인트, 휴먼 승인 단계를 구현한다.
5. 승인된 결과만 Markdown 보고서나 GitHub Issue/PR 코멘트로 반영한다.
6. LangSmith에서 입력·출력·지연시간·오류·사람의 평가를 추적한다.
7. 동일한 패턴을 Git diff 기반 코드 리뷰 Agent로 확장한다.

무료 운영의 기본 원칙은 다음과 같다.

- 학생 실행 환경은 **Python + VS Code + Git + Jupyter + Ollama + Qwen3 4B + faster-whisper**를 기본으로 한다.
- RAM이나 설치 권한이 부족하면 **Google Colab 무료 런타임 + 사전 준비 텍스트**로 전환한다.
- Codex 또는 Claude Code는 강사가 실시간으로 요구사항을 코드·테스트·문서로 바꾸는 **Harness Engineering 데모 도구**로 사용한다.
- Codex/Claude의 유료 사용 가능성을 숨기지 않는다. 학생 필수 경로는 로컬 무료 LLM으로 완주 가능하게 만든다.
- LangSmith는 개인별 Developer 계정의 무료 포함량 안에서 사용한다. 현재 공식 가격표는 Developer 플랜에 1석과 월 5,000 base traces가 포함된다고 설명한다. 무료 포함량 초과분은 과금될 수 있으므로 반드시 사용량을 확인한다.
- 실제 회사 회의, 고객정보, 비공개 저장소는 교육 계정으로 올리지 않는다. 공개·비식별·합성 데이터만 사용한다.

---

## 1. HWP 원본 상세 독해

### 1.1 과정 개요

| 항목 | 원본 내용 |
|---|---|
| 교과목명 | LLM Agent & 업무 자동화 – 코드 리뷰·회의록·업무 문서화 |
| 난이도 | 응용 |
| 교육분야 | 인공지능(AI) |
| 교육대상 | 재직자, 구직자 / 전공자 |
| 총 교육시간 | 40H |
| 수료기준 | 총 출석률 70% 이상 |
| 운영방식 | 오프라인 또는 실시간 원격 화상 선택형 |
| 원본의 미확정 항목 | 교육일정, 일별 시간, 수강 인원은 2025년 placeholder로 남아 있음 |

### 1.2 원본 학습목표

- LLM Agent와 Tool-Calling 기반 워크플로우의 개념을 이해한다.
- 코드 리뷰, 회의록 작성, 업무 문서화처럼 개발 조직에서 반복되는 업무를 자동화하는 Agent를 설계하고 구현한다.
- STT와 LLM을 연결하여 회의 기록 → 요약 → Action Item 구조화를 수행한다.
- LangChain/LangGraph 기반 Multi-step 흐름에 예외 처리와 휴먼 검증 단계를 포함한다.

### 1.3 원본 핵심역량과 SW 융합 요소

| 영역 | 원본에서 요구한 역량 |
|---|---|
| 생성형 AI | OpenAI API, Tool Calling, Prompt Engineering |
| 모델 개발·운영 | 모델 호출, 응답 파싱, 튜닝, 오류 대응 |
| Agent 개발 | 함수 호출 스키마, 기능 분리, 다단계 워크플로우 |
| 버전 관리·연동 | GitHub API, PR diff, 자동 코멘트 |
| 문서 자동화 | 전처리, 요약, Action Item, 템플릿 매핑 |
| 보안·거버넌스 | PAT/GitHub 인증, 예외 처리, 재시도, 검증 |
| 프로젝트 | 실제 업무 기반 Mini Project와 발표 |

### 1.4 원본의 6개 모듈과 시간 배분

| 모듈 | 주제 | 원본 세부 구분 | 시간 |
|---:|---|---|---:|
| 1 | Agent 개념·환경 세팅 | Agent 개념 이해 3H + 개발 환경 구축 3H | 6H |
| 2 | Tool-Calling 핵심 설계·실습 | 스키마·분리 설계 3H + 기본 실습 3H | 6H |
| 3 | 코드 리뷰 Agent | 리뷰 설계 4H + 구현·튜닝 4H | 8H |
| 4 | GitHub 연동 자동 리뷰 | API 연동 3H + 자동 코멘트·예외 처리 3H | 6H |
| 5 | 회의록 & 문서 자동화 통합 Agent | 회의록 자동화 4H + 문서·리포트 자동화 4H | 8H |
| 6 | 워크플로우 통합·운영·프로젝트 | 통합·운영 3H + Mini Project 3H | 6H |
|  | 합계 |  | **40H** |

### 1.5 재설계 시 보강해야 할 원본의 공백

원본은 과정의 방향은 명확하지만 다음 실행 정보가 부족하다.

- STT가 목표에는 있으나 세부 40시간 표에서 독립 실습 시간이 명확하지 않다.
- LangChain, LangGraph, LangSmith의 역할 구분과 설치·실습 순서가 없다.
- 무료 모델·로컬 실행·저사양 PC·설치 불가 상황의 대체 경로가 없다.
- Human-in-the-loop이 목표에 있으나 어떤 행동을 어느 시점에 승인할지 정의되지 않았다.
- 예외 처리가 한 줄 수준이며 오류 분류, 재시도 여부, 중단 기준이 없다.
- LangSmith에서 무엇을 trace, feedback, dataset, evaluation으로 볼지 설계가 없다.
- 재직자와 구직자의 최종 산출물과 평가 방식이 구분되지 않았다.
- PPT, ipynb, VS Code, Git/GitHub를 하나의 따라하기 흐름으로 묶는 운영 가이드가 없다.

본 재설계는 원본의 6개 모듈과 40시간 총량을 보존하면서 이 공백을 채운다.

---

## 2. PBL 프로젝트 정의

### 2.1 프로젝트 이름과 문제 정의

**K-Work Copilot: 한국어 회의와 코드 변경을 검토 가능한 업무 기록으로 바꾸는 Agent**

실무 문제는 다음과 같이 정의한다.

> 회의 음성과 코드 변경 정보가 흩어져 있어 결정사항, 담당자, 마감일, 위험이 누락된다. 자동화가 결과를 바로 외부 시스템에 쓰면 오류가 확산된다. 따라서 AI가 초안을 만들되, 위험한 행동은 사람이 확인하고, 전 과정은 관측 가능해야 한다.

### 2.2 최종 사용자 시나리오

1. 사용자가 한국어 회의 음성 또는 이미 전사된 텍스트를 넣는다.
2. 시스템이 파일 형식·크기·언어를 확인한다.
3. faster-whisper가 타임스탬프가 있는 한국어 전사를 생성한다.
4. 품질 검사에서 무음, 반복, 지나치게 낮은 신뢰도, 개인정보 후보를 표시한다.
5. LLM이 정해진 JSON schema로 요약, 결정사항, Action Item, 미해결 질문을 만든다.
6. LangGraph가 `human_review` node에서 멈춘다.
7. 사람이 승인·수정·거절한다.
8. 승인된 결과만 Markdown 보고서와 선택적 GitHub Issue에 반영한다.
9. LangSmith에서 각 node의 trace, latency, error, feedback을 확인한다.
10. Git diff 입력이 들어오면 코드 리뷰 branch가 실행되고, 역시 승인 후에만 PR 코멘트를 게시한다.

### 2.3 재직자와 구직자의 산출물 차이

| 구분 | 재직자 트랙 | 구직자 트랙 |
|---|---|---|
| 문제 선정 | 본인 업무를 공개 가능한 형태로 추상화 | 공개 데이터 기반 가상 조직 문제 선택 |
| 데이터 | 비식별·합성 회의 샘플, 공개 저장소 | 국회 발언, 서울시 회의정보, 국립국어원 말뭉치, 제공 샘플 repo |
| 가치 증명 | 업무시간 절감 가설, 통제점, 사내 도입 체크리스트 | README, 아키텍처, 데모 GIF/화면, 테스트, 포트폴리오 서술 |
| 평가 강조 | 보안, 권한, 감사추적, 기존 프로세스 접점 | 재현성, 코드 품질, 문제정의, 발표, Git history |
| 최종 발표 | “현업 PoC 승인 요청” 형식 | “채용 포트폴리오 기술 발표” 형식 |

### 2.4 완료 정의(Definition of Done)

- 한 번의 명령 또는 notebook 실행으로 sample input이 처리된다.
- STT 실제 실행 또는 STT 대체 텍스트 경로가 모두 동작한다.
- 요약 결과가 Pydantic/JSON schema 검증을 통과한다.
- Action Item에는 `task`, `owner`, `due_date`, `evidence`, `confidence`가 있다.
- 외부 쓰기 전에 Human Approval이 반드시 발생한다.
- 실패 node, retry 횟수, 최종 status가 기록된다.
- 최소 8개 정상/예외 테스트가 있다.
- LangSmith trace 한 건을 열어 전체 node 흐름을 설명할 수 있다.
- README에 설치, 실행, 제한, 개인정보 주의, 무료/유료 경계를 기록한다.
- Git commit이 의미 있는 단위로 8개 이상 남아 있다.

---

## 3. 무료 기반 표준 기술 스택

### 3.1 기본 스택

| 층 | 기본 선택 | 무료 사용 방식 | 수업에서의 역할 | 대체안 |
|---|---|---|---|---|
| OS | Windows/macOS/Linux | 보유 PC | 공통 실습 | 설치 불가 시 Colab |
| IDE | VS Code | 무료 | `.py`, `.ipynb`, Git, Debug | JupyterLab, Colab |
| Python | 3.11 또는 3.12 | 무료 | 전체 앱 | Colab 사전 설치 Python |
| 환경 | `venv` + `pip` | 무료 | 재현 가능한 패키지 | `uv` 선택 데모 |
| Git | Git | 무료 | checkpoint·diff·branch | zip 백업은 비상용 |
| 원격 저장소 | GitHub Free | 공개/비공개 repo | PR·Issue·API | GitLab Free, 로컬 bare repo |
| 로컬 LLM 런타임 | Ollama | 로컬 추론 무료 | OpenAI 호환 호출·Tool Calling | LM Studio, Jan |
| 기본 모델 | Qwen3 4B 양자화 | 모델 라이선스 확인 후 로컬 | 한국어·도구 호출 균형 | Gemma 3 4B, 더 작은 1–3B |
| STT | faster-whisper | 오픈소스·로컬 | 한국어 전사 | whisper.cpp, 사전 전사본 |
| Agent | LangChain | 오픈소스 | prompt/model/tool 조합 | 순수 Python부터 비교 |
| Workflow | LangGraph | 오픈소스 | state, branch, checkpoint, interrupt | 순수 Python state machine |
| 관측 | LangSmith Developer | 개인 무료 포함량 | trace·feedback·dataset·eval | JSONL + Langfuse/Phoenix 소개 |
| 문서 | Markdown | 무료 | 보고서·README | HTML, Google Docs 선택 |
| Notebook | Jupyter | 무료 | 단계형 실습 | Colab |

### 3.2 PC 사양별 실행 경로

| 학습자 환경 | 권장 경로 | 수업 중 선택 |
|---|---|---|
| RAM 16GB 이상, Apple Silicon 또는 보통 GPU | Ollama + Qwen3 4B, faster-whisper `small`/`turbo` | 모든 로컬 실습 |
| RAM 8GB | Qwen3 1.7B/4B Q4, Whisper `base` 또는 `small` CPU int8 | 짧은 입력·작은 chunk |
| GPU 없음 | CPU int8 faster-whisper + 1–4B LLM | 처리시간 동안 강의 설명 진행 |
| 저장공간 부족 | 모델 1개만 사전 다운로드, 오디오 2–3분 | 모델 선택 실습은 화면 데모 |
| 관리자 권한 없음 | Portable Python이 가능하면 로컬, 아니면 Colab | GitHub repo는 브라우저 사용 |
| 모델 다운로드 차단 | 사전 배포 transcript + mock LLM adapter | 프레임워크·워크플로우는 동일 |
| 회사 보안 PC | 공개 데이터만, localhost만 사용, LangSmith off | JSONL trace로 수업 후 개인 PC에서 확인 |

### 3.3 외부 무료 LLM 프로그램을 여러 개 설치해 비교하는 선택 실습

#### Ollama 트랙 — CLI 중심

- 강점: 설치 후 `ollama run qwen3:4b`처럼 단순하고 API·Tool Calling 실습과 잘 연결된다.
- 적합: Python, LangChain, LangGraph 실습을 이어갈 학습자.
- 확인: `ollama list`, `ollama ps`, `curl http://localhost:11434/api/tags`.
- 흔한 오류: model not found, 서버 미실행, 메모리 부족, 포트 충돌.

#### LM Studio 트랙 — GUI 중심

- 강점: 모델 검색·다운로드·메모리 예상·서버 시작을 화면으로 보여주기 쉽다.
- 공식 문서는 Developer 탭에서 로컬 API 서버를 시작하고 OpenAI-compatible endpoint를 제공한다고 설명한다.
- 적합: 터미널이 익숙하지 않은 학습자와 Windows 혼합 강의.

#### Jan 트랙 — 오픈소스·로컬 우선

- 강점: GUI와 로컬 OpenAI-compatible API를 제공하며, 기본 주소 예시는 `127.0.0.1:1337`이다.
- 적합: 로컬 프라이버시와 provider 교체를 강조하는 실습.
- 주의: 세 프로그램을 동시에 실행하면 RAM과 포트 문제가 생긴다. **수업에서는 하나만 주 실행**, 나머지는 비교·대체 경로로 사용한다.

### 3.4 proprietary harness의 비용 경계

- Claude 웹 Free는 무료 채팅을 제공하지만, 공식 가격표상 터미널의 Claude Code 접근은 Pro에 포함된다. 따라서 Claude Code를 학생 필수 무료 경로로 설계하지 않는다.
- Codex CLI는 공식 문서의 설치·로그인 절차로 데모할 수 있으나, 실제 사용 가능량과 플랜은 계정에 따라 달라질 수 있다. 학생 필수 산출물은 Codex 없이도 완성되게 한다.
- “무료 과정”의 의미는 학생이 API 종량 비용을 지불하지 않아도 필수 실습을 완주할 수 있다는 뜻이다. 강사의 Codex/Claude 계정은 생산성 데모와 자료 제작에만 사용한다.

---

## 4. Harness Engineering을 수업에 넣는 방법

Harness Engineering은 모델에게 한 번 질문해 코드를 복사하는 방식이 아니라, 모델이 안전하게 일할 수 있도록 **문맥, 규칙, 도구, 테스트, 승인, 관측, 복구 경로를 함께 설계하는 일**로 정의한다.

### 4.1 강사 라이브 데모의 공통 루프

1. `README.md` 또는 요구사항 문서에 완료 조건을 쓴다.
2. Codex/Claude에게 “구현”보다 먼저 repo 구조와 위험을 설명하게 한다.
3. 작은 변경 단위와 검증 명령을 합의한다.
4. Git checkpoint를 만든다.
5. Agent가 파일을 읽고 수정하고 테스트를 실행하게 한다.
6. 강사는 diff를 읽고, 테스트 증거가 없으면 완료로 인정하지 않는다.
7. 실패 원인을 prompt가 아니라 harness의 부족으로도 본다.
8. 반복 가능한 지시는 `AGENTS.md`, `CLAUDE.md`, skill, script, test로 승격한다.

### 4.2 수업에서 비교할 세 가지 개발 방식

| 방식 | 장점 | 위험 | 강의 포인트 |
|---|---|---|---|
| 손코딩 | 원리 이해가 높음 | 속도가 느림 | 최소 구현을 직접 만든다 |
| Chat copy/paste | 시작이 빠름 | repo 문맥·검증·수정 이력이 약함 | 왜 재현성이 부족한지 체험한다 |
| Agent harness | 파일·명령·테스트까지 연결 | 권한이 넓으면 위험 | 규칙·승인·검증이 핵심임을 학습한다 |

### 4.3 학생이 따라 할 수 있는 프롬프트 구조

```text
역할: 당신은 이 저장소의 구현 보조자다.
목표: [한 번에 하나의 구체적 결과]
현재 상태: [관련 파일, 실행 결과, 오류]
제약: [무료 로컬 모델, Python 버전, 금지 행동]
완료 조건: [테스트, 출력 schema, 파일]
작업 방식:
1) 먼저 관련 파일을 읽고 가정을 적는다.
2) 최소 변경을 한다.
3) 검증 명령을 실행한다.
4) 변경 파일과 남은 위험을 요약한다.
외부 쓰기·삭제·비밀정보 사용은 승인 없이 하지 않는다.
```

### 4.4 강사가 속도를 조절하는 방법

- 빠른 반: Agent가 boilerplate를 만들고 학습자는 schema, branch, test를 검토한다.
- 보통 반: 강사 코드를 5–10분 단위로 따라 치고, Agent는 오류 해설에만 쓴다.
- 느린 반: 완성 notebook을 제공하고 `TODO` cell만 실행·수정한다.
- 공통: 한 시간마다 “작동하는 checkpoint”를 제공하여 다음 시간에 복구할 수 있게 한다.

---

## 5. 5일 40시간 전체 구성

### 5.1 일자별 큰 흐름

| 일차 | 시간 | 원본 모듈 대응 | PBL 누적 산출물 |
|---:|---:|---|---|
| 1일차 | 8H | 모듈 1 + 모듈 2 일부 | 환경 진단, Git repo, 첫 Tool Calling loop, 로컬 LLM adapter |
| 2일차 | 8H | 모듈 2 + 모듈 5 일부 | 한국어 STT, 구조화 회의록, LangChain chain |
| 3일차 | 8H | 모듈 3 | diff parser, 코드 리뷰 Agent, 품질 튜닝·평가 |
| 4일차 | 8H | 모듈 4 + 모듈 6 일부 | GitHub API, LangGraph, retry, HITL, 안전한 외부 쓰기 |
| 5일차 | 8H | 모듈 5 + 모듈 6 | 통합 Agent, LangSmith, 테스트, 데모, 발표 |

### 5.2 공통 1시간 운영 포맷

2-5일차의 각 60분 차시는 기본적으로 다음 리듬을 사용한다.

- 00–10분: 왜 필요한지, 이전 결과와 연결
- 10–25분: 개념과 강사 live demo
- 25–45분: 장표·notebook을 보며 그대로 따라하기
- 45–53분: 변형 과제 또는 예외 주입
- 53–58분: 체크포인트·화면 캡처·Git commit
- 58–60분: 다음 차시의 입력 확인

1일차는 `1일차 1차시~8차시`로 안내하되 매시 정각마다 쉬지 않는다. `09:00-11:30` 수업 뒤 30분, `12:00-13:40` 수업 뒤 20분, `15:00-17:00` 수업 뒤 30분을 묶어서 쉰다. 마지막 30분은 Q&A·실행 오류 복구·Exit Ticket에 고정한다. 점심이 평소보다 늦은 이유와 불편에 대한 사과를 시작 장표에 넣는다.

---

## 6. 40개 1시간 block 상세 설계

### Day 1 - 8/23(일), 09:00-14:00 / 15:00-18:00

> 첫날은 강사 외부 일정으로 일반적인 12:00-13:00 점심을 제공하지 못한다. 시작 시 “불편을 드려 죄송합니다”라고 먼저 안내하고, 점심은 14:00-15:00에 운영한다.

| 시간 | 차시 | 전달 내용 | 개인 활동 | 완료 증거 |
|---|---:|---|---|---|
| 09:00-09:50 | 1일차 1차시 | Agent와 문제 정의 | 개인 Ideation | 입력·결과·금지 행동 한 문장 |
| 09:50-10:40 | 1일차 2차시 | Tool Calling과 실행 권한 | Schema 설계·Tool 코드 실행 | 허용·차단 ToolResult |
| 10:40-11:30 | 1일차 3차시 | 한국어 데이터와 Prompt 기본기 | 자료 수집·typed JSON 실행 | 근거가 있는 결과 JSON |
| 11:30-12:00 | 쉬는 시간 | 빠른 점심 또는 간식 권장 | - | - |
| 12:00-12:50 | 1일차 4차시 | Python·VS Code·Jupyter·Ollama 환경 | 개발환경 세팅 실습 | 상태 JSON·4 passed |
| 12:50-13:40 | 1일차 5차시 | Ollama Tool Calling·안전 실행 루프 | 실제/fixture Tool Call·실패 test | 정상·차단·fallback·25 passed |
| 13:40-14:00 | 쉬는 시간 | 점심 전 실행 상태 저장 | - | checkpoint |
| 14:00-15:00 | 점심시간 | 14:55까지 복귀 | - | - |
| 15:00-15:40 | 1일차 6차시 | LangChain LCEL·무료 로컬 LLM Adapter | 같은 notebook에서 provider 교체 | typed output·provider 비교 |
| 15:40-16:20 | 1일차 7차시 | LangChain LCEL·LangGraph 승인 | StateGraph 구현 실습 | approve·edit·reject JSON |
| 16:20-17:00 | 1일차 8차시 | STT·trace·LangSmith·Release Gate | 품질·관측·평가 실행 | trace.json·READY/HOLD |
| 17:00-17:30 | 쉬는 시간 | 질문 정리 | - | 질문 목록 |
| 17:30-18:00 | Q&A | 질문·실행 오류 복구·Exit Ticket | 미완료 checkpoint 복구 | 핵심 세 문장 |

#### 1일차 1차시 — 과정의 끝을 먼저 보여준다

- 강사 소개와 서비스 경험은 “AI가 실제 사용자 경험으로 연결되는 지점”에 초점을 둔다.
- 완성 데모는 3분을 넘기지 않는다. 음성 업로드 → 초안 → 승인 대기 → 보고서 생성 → trace 열기 순서만 보여준다.
- 학생이 매일 만들 artifact를 보여준다: `transcript.json`, `meeting_minutes.json`, `report.md`, `review.json`, LangSmith trace.
- 진단 질문: Python 실행 경험, Git commit 경험, GPU/RAM, GitHub 계정, 설치 권한.
- 실패 대비: 설문 도구가 없으면 notebook의 Markdown checklist로 대체한다.

#### 1일차 2차시 — Tool Calling의 제안과 실행 권한을 분리한다

- token과 context를 한국어 형태소와 동일하다고 오해하지 않게 설명한다.
- temperature는 정확성 스위치가 아니라 sampling parameter임을 강조한다.
- 자유문장 요약과 JSON schema 출력의 차이를 비교한다.
- 잘못된 담당자·마감일을 일부러 생성하여 근거(`evidence`) 필드가 필요한 이유를 만든다.
- 빠른 반 확장: 회의록 schema에 `unknown`과 `not_mentioned`를 구분한다.

#### 1일차 3차시 — 한국어 업무 데이터에 Prompt·Schema·근거를 연결한다

- 모델은 tool name과 arguments를 제안하고, 실제 실행은 application이 통제한다.
- `description`, required fields, enum, type, validation이 호출 품질에 미치는 영향을 비교한다.
- 작은 도구 예: `calculate_sum`, `normalize_korean_text`, `save_draft`.
- `save_draft`는 실제 파일 쓰기 전에 승인해야 하는 위험 도구로 분류한다.
- 예외: unknown tool, missing arg, wrong type, tool runtime error, duplicate call.

#### 1일차 4차시 — 환경 구축도 학습 목표다

- `python --version`, interpreter 경로, virtual environment의 목적을 확인한다.
- VS Code Python/Jupyter extension과 kernel 선택 화면을 캡처 기준으로 안내한다.
- `materials/day1/04_ollama_agent_workflow.ipynb`를 열고 `probe_ollama()`로 CLI·서버·모델을 따로 확인한다.
- notebook cell의 실행 순서가 상태를 만든다는 점을 설명하고 `Run All`이 되는 상태를 기준으로 삼는다.
- 현재 강사 PC에는 Ollama 0.32.15, local server, `qwen3:4b` 2.5GB model이 준비되어 있다. 실제 Tool Call은 Qwen으로 성공했고, LangChain structured output은 schema 파싱 실패 시 fixture로 복구되는 것을 확인했다.
- 설치 실패 시 같은 notebook이 `recommended_lane=fixture`를 선택하고 `4 passed`까지 계속되어야 한다.
- Codex·GitHub PR은 필수 notebook 경로를 끝낸 수강생의 선택 확장으로 둔다.

#### 1일차 5차시 — Ollama의 제안과 코드의 실행 권한을 분리한다

- 4차시에서 연 같은 notebook을 계속 사용한다.
- fixture와 Ollama Planner가 같은 `tool_name/arguments` 계약으로 도구 사용을 제안하게 한다.
- 실제 실행 전 `SafeToolExecutor`가 allowlist·argument·workspace 경계를 다시 검사한다.
- 정상 파일 읽기, `../../private.txt` 경로 차단, Ollama 모델 없음 fallback을 직접 실행한다.
- 결과에 `provider_requested`, `provider_used`, `fallback_reason`, `error_code`, `automatic_email=false`를 남긴다.
- 점심 전 전체 test를 실행해 `25 passed`를 확인한다.

#### 1일차 6차시 — LangChain은 provider가 바뀌어도 결과 계약을 유지한다

- 같은 notebook의 회의 transcript와 Pydantic schema를 유지한다.
- `Prompt → fixture/Ollama → Pydantic Parser → Policy Validator` LCEL을 실행한다.
- Ollama의 model server와 model weight, `localhost`와 외부 cloud의 차이를 실행 결과와 함께 설명한다.
- health check 실패 시 fixture adapter로 즉시 전환하고 `fallback_reason`을 숨기지 않는다.
- fixture와 Ollama 요청의 `provider_used`, typed output, policy checks를 나란히 비교한다.
- 7차시에는 이 결과를 `07_langchain_langgraph_workflow.ipynb`의 StateGraph 입력으로 넘긴다.

#### 1일차 7차시 — LangChain 결과를 LangGraph의 사람 승인으로 연결한다

- application이 tool allowlist를 가진다.
- arguments는 실행 전에 검증한다.
- 읽기 전용 도구와 쓰기 도구의 policy를 분리한다.
- 같은 `request_id`의 쓰기 작업은 중복 실행하지 않는 idempotency를 소개한다.
- 오류를 “재시도 가능 / 입력 수정 필요 / 사람 판단 필요 / 즉시 중단”으로 분류한다.

#### 1일차 8차시 — STT·관측·평가를 READY/HOLD 결정으로 연결한다

- Codex 또는 Claude에게 repo를 설명하게 한 뒤 학생이 사실 여부를 검증한다.
- Agent가 제시한 작업 계획 중 범위를 벗어난 항목을 사람이 제거한다.
- 테스트 실패를 보여주고 원인 수정 후 다시 실행한다.
- 최종 diff와 Git log를 확인한다.
- 다음 날 입력인 2–3분 한국어 audio와 대체 transcript를 안내한다.

### Day 2 — 일반 운영 09:00–12:00 / 13:00–18:00

| 시각 | Block | 전달 내용 | 따라하기 실습 | 산출물 |
|---|---:|---|---|---|
| 09:00–10:00 | 9 | 음성 신호, sample rate, channel, codec, VAD, chunk | 오디오 metadata 검사 | `audio_manifest.json` |
| 10:00–11:00 | 10 | Whisper 계열과 faster-whisper, CPU/GPU/int8 | 1분 한국어 음성 전사 | raw transcript |
| 11:00–12:00 | 11 | timestamp, no-speech, 반복·환각, hotwords | 낮은 품질 구간 표시 | QC transcript |
| 12:00–13:00 |  | 점심 |  |  |
| 13:00–14:00 | 12 | 회의록 정보모델과 Pydantic schema | 요약/결정/Action Item schema | `models.py` |
| 14:00–15:00 | 13 | chunking·map-reduce·refine, context 한계 | 긴 transcript 분할 요약 | chunk summaries |
| 15:00–16:00 | 14 | LangChain runnable, prompt, parser | local LLM chain 연결 | meeting chain |
| 16:00–17:00 | 15 | 근거 기반 생성, 미상값, 날짜 해석 | evidence span 연결 | validated JSON |
| 17:00–18:00 | 16 | 재직자/구직자 변형 실습 | 도메인 prompt와 평가 case 작성 | Day 2 commit/tag |

#### Day 2 핵심 예외 실습

- 오디오가 없거나 경로가 틀림 → `FileNotFoundError`, 사용자 안내, 재시도하지 않음.
- 지원하지 않는 codec → 변환 안내 또는 PyAV 경로 사용.
- GPU OOM → CPU int8 또는 작은 model로 fallback.
- 무음·잡음 → no-speech threshold, VAD, “전사 불가” status.
- Whisper 반복 환각 → previous text condition, VAD, chunk 경계, human spot check.
- 발화자 분리가 없음 → 이름을 임의 생성하지 않고 `speaker_unknown` 사용.
- 회의에서 마감일을 말하지 않음 → 오늘 날짜를 추측하지 않고 `null`.

### Day 3 — 코드 리뷰 Agent 8시간

| 시각 | 차시 | 전달 내용 | 따라하기 실습 | 산출물 |
|---|---:|---|---|---|
| 09:00–09:50 | 1차시 | Review Contract, severity, 근거, false positive | Pydantic Finding과 오류 코드 | `01_review_contract.json` |
| 09:50–10:40 | 2차시 | Unified Diff, hunk, 변경 후 line mapping | 안전한 diff parser | `02_parsed_diff.json` |
| 10:40–11:30 | 3차시 | 최소 context와 data boundary | allowlist·workspace·byte limit | `03_context_pack.json` |
| 11:30–13:00 |  | 쉬는 시간·점심시간 | 오전 결과 저장 | 1~3차시 결과 |
| 13:00–13:50 | 4차시 | LangChain Provider Adapter | fixture·Ollama·OpenAI provenance | `04_candidate_review.json` |
| 13:50–14:40 | 5차시 | 정적 rule·실제 test·선택 LLM 결합 | line-grounded hybrid review | `05_hybrid_review.json` |
| 14:40–15:00 |  | 쉬는 시간 | Notebook 저장 | 실행 상태 보존 |
| 15:00–15:50 | 6차시 | LangGraph Human Review | interrupt·approve/edit/reject·resume | `06_human_review.json` |
| 15:50–16:40 | 7차시 | Precision·Recall·F1, golden set | 8개 diff case 평가 | `07_evaluation.json` |
| 16:40–17:30 | 8차시 | Localhost·Codex·GitHub Delivery | 작은 변경·Draft PR·CI·선택 AI Review | `08_release_evidence.json` |
| 17:30–18:00 |  | 쉬는 시간·Q&A·실습 복구 | Merge 판단과 Exit Check | `run_manifest.json` |

#### 코드 리뷰 finding 필수 필드

```json
{
  "path": "src/example.py",
  "line": 21,
  "severity": "P1",
  "title": "중복 실행으로 외부 쓰기가 두 번 발생할 수 있음",
  "impact": "재시도 시 동일 요청이 다시 실행됩니다.",
  "evidence": "retry loop에서 request_id를 기록하지 않음",
  "correction": "idempotency key 저장 후 성공 상태를 재사용",
  "rule_id": "idempotency-key-missing",
  "confidence": 0.86
}
```

#### 리뷰 품질 규칙

- 실제 변경 라인에 관한 finding만 생성한다.
- 스타일 취향은 linter에 맡기고, LLM은 correctness, security, data loss, contract break에 집중한다.
- 존재하지 않는 함수·테스트 결과를 근거로 말하지 않는다.
- 확신이 낮으면 질문 또는 “검토 필요”로 표현한다.
- 한 finding에는 한 문제만 담는다.

### Day 4 — GitHub + LangGraph + 안전한 외부 쓰기 8시간

| 시각 | Block | 전달 내용 | 따라하기 실습 | 산출물 |
|---|---:|---|---|---|
| 09:00–10:00 | 25 | GitHub PR·commit·diff·review comment | fixture PR 읽기 | PR data model |
| 10:00–11:00 | 26 | 인증, fine-grained PAT, 최소 권한, secret | `.env`와 mock API | secure config |
| 11:00–12:00 | 27 | REST API, pagination, rate limit, status code | PR diff read-only 호출 | API client |
| 12:00–13:00 |  | 점심 |  |  |
| 13:00–14:00 | 28 | LangGraph state, node, edge, conditional edge | meeting graph skeleton | compiled graph |
| 14:00–15:00 | 29 | retry policy, fallback, checkpoint | 실패 node 재개 | resilient graph |
| 15:00–16:00 | 30 | interrupt와 approve/edit/reject | human review node | paused run |
| 16:00–17:00 | 31 | 외부 쓰기, idempotency, dry run | 승인 후 mock comment | audit record |
| 17:00–18:00 | 32 | 실제 GitHub 선택 실습 | 본인 sandbox repo에 1개 comment | Day 4 tag |

#### GitHub 실습의 안전 순서

1. 정적 fixture JSON으로 request/response 형식을 익힌다.
2. public repo의 읽기 전용 endpoint를 사용한다.
3. 본인이 만든 sandbox repo만 쓴다.
4. `DRY_RUN=true`로 comment payload를 파일에 저장한다.
5. 사람이 payload와 대상 repo/PR을 확인한다.
6. 승인 후 한 건만 게시한다.
7. 응답 ID와 URL을 audit log에 기록한다.

#### 대표 GitHub 오류 처리

| 오류 | 의미 | 처리 |
|---|---|---|
| 401 | token 없음·만료 | 즉시 중단, token 재입력 안내 |
| 403 | 권한 부족·secondary rate limit | 권한/헤더 확인, backoff, 무한 재시도 금지 |
| 404 | repo/PR 없음 또는 권한 때문에 숨겨짐 | 대상 URL과 권한을 사람이 확인 |
| 422 | line/position이 stale하거나 payload 부적합 | 최신 diff 재조회 후 payload 재생성 |
| 429 | rate limit | `Retry-After` 준수, 요청 수 축소 |
| network timeout | 일시 장애 | exponential backoff + 최대 횟수 |

### Day 5 — 통합·LangSmith·평가·발표 8시간

| 시각 | Block | 전달 내용 | 따라하기 실습 | 산출물 |
|---|---:|---|---|---|
| 09:00–10:00 | 33 | 두 workflow 통합, adapter·config | meeting/code-review router | unified app |
| 10:00–11:00 | 34 | LangSmith project/trace/run/thread | tracing 환경 설정 | 첫 trace |
| 11:00–12:00 | 35 | tags, metadata, error, latency, token/cost | trace 비교·filter | monitoring view |
| 12:00–13:00 |  | 점심 |  |  |
| 13:00–14:00 | 36 | dataset, offline eval, code evaluator | golden dataset 8건 | experiment |
| 14:00–15:00 | 37 | human feedback와 annotation queue | 승인 결과에 feedback | labeled runs |
| 15:00–16:00 | 38 | PII redaction, retention, 운영 checklist | trace scrubber, incident drill | ops checklist |
| 16:00–17:00 | 39 | 프로젝트 마감·리허설 | 테스트, README, 3분 demo | release candidate |
| 17:00–18:00 | 40 | 발표·동료평가·회고 | 3분 demo + 2분 질문 | final tag·평가표 |

---

## 7. STT를 현대적으로 가르치는 방법

### 7.1 “직접 구현”과 “이미 제품에 있는 기능”을 동시에 보여준다

수업에서는 STT를 완전히 생략하면 안 된다. 모델과 pipeline을 알아야 오류·비용·개인정보를 판단할 수 있기 때문이다. 다만 현업에서 항상 자체 STT를 만들 필요도 없다.

두 경로를 비교한다.

| 경로 | 언제 사용 | 학습 목적 |
|---|---|---|
| 로컬 STT 실습 | 오프라인, 개인정보 민감, 제품 통합, 세부 제어 | audio → segment → transcript pipeline 이해 |
| Google Meet 등 제품 기능 | 이미 Workspace를 쓰고 있고 빠른 회의 기록이 목적 | build vs buy 판단, export 후 downstream 자동화 |

Google의 공식 도움말 기준, Meet transcript는 한국어를 지원하지만 지정된 Workspace edition이 필요하다. “Take notes for me”도 한국어를 지원하되 eligible Workspace edition 또는 Google AI plan이 필요하다. 그러므로 무료 baseline으로 표현하지 않고 **유료 편의 경로**로 분리한다.

### 7.2 로컬 STT 권장 설정

```python
from faster_whisper import WhisperModel

model = WhisperModel("small", device="cpu", compute_type="int8")
segments, info = model.transcribe(
    "data/meeting_ko.wav",
    language="ko",
    vad_filter=True,
    beam_size=5,
    word_timestamps=True,
)
segments = list(segments)
```

faster-whisper의 `segments`는 generator이므로 실제 전사는 순회하거나 `list()`로 만들 때 진행된다는 점을 반드시 보여준다.

### 7.3 STT 검증 checklist

- 파일을 열 수 있는가?
- 예상 언어가 한국어인가?
- 무음 비율이 지나치게 높지 않은가?
- 30초 이상 동일 문장이 반복되지 않는가?
- 고유명사·제품명·인명 후보를 사람이 확인했는가?
- 타임스탬프가 audio 길이 범위 안에 있는가?
- 원문에 없는 담당자·마감일을 후처리 LLM이 만들지 않았는가?
- 외부 observability에 raw audio나 개인정보를 보내지 않았는가?

### 7.4 교육용 짧은 audio 준비법

- 2–3분, 2명, 하나의 안건, 결정 2개, Action Item 3개를 포함한다.
- 한 항목은 담당자를 말하지 않고, 한 항목은 마감일을 말하지 않아 `null` 처리를 확인한다.
- 제품명 2개와 숫자 2개를 넣어 STT 오류를 찾는다.
- 참여자에게 녹음·교육 사용 동의를 받는다.
- 원본 공개가 어려우면 강사 1인이 두 역할을 읽은 합성 회의로 만든다.
- 정답 transcript와 허용 가능한 변형을 별도로 보관한다.

---

## 8. LangChain과 LangGraph를 모두 쓰는 이유

### 8.1 역할 구분

| 도구 | 맡길 책임 | 맡기지 않을 책임 |
|---|---|---|
| LangChain | model adapter, prompt, parser, tool wrapper, runnable 조합 | 복잡한 장기 상태와 승인 정책 전체 |
| LangGraph | state, node, conditional branch, checkpoint, interrupt, resume | prompt 문구의 품질 자체 |
| LangSmith | trace, run, metadata, feedback, dataset, evaluation | application의 실제 예외 복구를 대신함 |

### 8.2 권장 graph state

```python
class WorkflowState(TypedDict, total=False):
    request_id: str
    input_kind: Literal["audio", "transcript", "diff"]
    source_path: str
    transcript: list[dict]
    qc_flags: list[str]
    draft: dict
    validation_errors: list[str]
    human_decision: Literal["approve", "edit", "reject"]
    approved_output: dict
    external_result: dict
    retry_count: dict[str, int]
    status: str
```

### 8.3 회의록 graph

```text
START
  → validate_input
  → [audio?] transcribe / load_transcript
  → transcript_qc
  → redact_sensitive_data
  → summarize_chunks
  → merge_and_structure
  → validate_schema
  → [valid?] human_review / repair_once
  → [approve] render_report
  → [external write requested] confirm_target
  → publish_or_dry_run
  → END
```

### 8.4 코드 리뷰 graph

```text
START
  → validate_pr_input
  → fetch_or_load_diff
  → parse_hunks
  → select_context
  → run_static_checks
  → generate_findings
  → validate_line_mapping
  → deduplicate_and_rank
  → human_review
  → dry_run_payload
  → publish_if_approved
  → END
```

### 8.5 interrupt 구현 원칙

LangGraph 공식 문서는 interrupt가 graph state를 checkpoint에 저장하고 같은 `thread_id`로 resume할 수 있다고 설명한다. 실습에서는 다음을 지킨다.

- `interrupt()` payload는 JSON serializable이어야 한다.
- resume할 때 같은 `thread_id`를 사용한다.
- interrupt 이전 side effect는 node가 재시작되어도 안전하도록 idempotent하게 만든다.
- interrupt를 일반 예외처럼 `try/except`로 삼키지 않는다.
- notebook 실습은 `InMemorySaver`, 프로젝트는 `SqliteSaver`를 사용한다.
- 운영 설명에서는 persistent database checkpointer가 필요함을 언급한다.

---

## 9. 예외 처리와 휴먼 검증 설계

### 9.1 오류 분류

| 분류 | 예 | 기본 행동 |
|---|---|---|
| 입력 오류 | 파일 없음, 잘못된 PR 번호 | 재시도하지 않고 사용자 수정 요청 |
| 일시 장애 | timeout, 429, 일시적 model server 오류 | 제한된 exponential backoff |
| 자원 부족 | GPU OOM, RAM 부족 | 작은 모델·CPU·chunk fallback |
| 출력 계약 위반 | JSON parse 실패, schema 누락 | 1회 repair 후 human review |
| 품질 불확실 | 낮은 STT 신뢰도, 근거 없는 Action Item | 자동 확정 금지, 사람에게 표시 |
| 권한·보안 | 401, 403, secret 노출 | 즉시 중단, 기록 후 자격증명 교체 |
| 외부 부작용 | Issue/PR comment/file write | dry run + 명시적 승인 + idempotency |
| 프로그램 결함 | 예상 못한 exception | trace와 stack을 남기고 안전 종료 |

### 9.2 재시도 정책 예시

```python
RETRY_POLICY = {
    "network_timeout": {"max_attempts": 3, "backoff": [1, 2, 4]},
    "rate_limit": {"max_attempts": 2, "respect_retry_after": True},
    "schema_error": {"max_attempts": 1, "strategy": "repair_prompt"},
    "auth_error": {"max_attempts": 0},
    "file_not_found": {"max_attempts": 0},
}
```

### 9.3 반드시 사람이 확인할 gate

| Gate | 확인 질문 | 허용 결정 |
|---|---|---|
| Transcript QC | 고유명사·숫자·결정문이 audio와 맞는가? | approve / edit / reject |
| Action Item | 실제로 지시된 일인가? 담당자·기한 근거가 있는가? | approve / edit / reject |
| Code Finding | 변경 라인과 관련 있고 재현 가능한가? | keep / edit / drop |
| 외부 대상 | 올바른 repo, PR, Issue인가? | confirm / cancel |
| 외부 payload | 개인정보·비밀·공격적 표현이 없는가? | confirm / edit / cancel |
| 최종 보고서 | AI 초안임을 알리고 사람이 책임질 수 있는가? | publish / archive draft |

### 9.4 자동화 금지 또는 강한 승인 대상

- 실제 인사평가·채용 합격 판단
- 법률·의료·재무 결론
- 비공개 회의의 cloud trace 업로드
- production database 쓰기
- 본인 소유가 아닌 저장소에 comment 게시
- secret rotation, 권한 변경, destructive command

---

## 10. LangSmith 관측·평가·시간 관리

### 10.1 수업용 project 구조

학생은 자신의 계정에 다음 project를 만든다.

```text
ipa-llm-agent-<이니셜>
```

각 trace에 다음 metadata를 붙인다.

```python
metadata = {
    "course": "IPA-LLM-Agent-40H",
    "day": 5,
    "workflow": "meeting_minutes",
    "student_id": "비식별-ID",
    "app_version": "0.5.0",
    "model_provider": "ollama",
    "model_name": "qwen3:4b",
    "data_class": "public_or_synthetic",
}
tags = ["pbl", "ko", "hitl", "local-llm"]
```

### 10.2 node naming convention

- `input.validate`
- `stt.transcribe`
- `stt.qc`
- `privacy.redact`
- `llm.summarize_chunk`
- `llm.merge_minutes`
- `schema.validate`
- `human.review`
- `output.render_markdown`
- `github.publish_comment`

이름만 보아도 실패 지점을 찾을 수 있게 한다.

### 10.3 무엇을 monitor하는가

| 지표 | 질문 | 실습에서 보는 방법 |
|---|---|---|
| success rate | 끝까지 완료된 run 비율은? | status metadata filter |
| node error rate | 어느 node가 가장 많이 실패하는가? | run error 비교 |
| latency | STT와 LLM 중 병목은 어디인가? | node duration |
| retry count | 같은 실패를 반복하는가? | retry metadata |
| schema pass rate | 첫 생성에서 계약을 지켰는가? | validation feedback |
| human edit rate | 사람이 얼마나 자주 고치는가? | approve/edit/reject feedback |
| unsupported claim | 근거 없는 결정·담당자가 있는가? | code evaluator + human label |
| publication safety | 승인 없는 외부 쓰기가 0건인가? | audit event와 graph path |

### 10.4 feedback key

```text
transcript_correctness: 0.0–1.0
summary_faithfulness: 0.0–1.0
action_item_completeness: 0.0–1.0
schema_valid: 0/1
pii_leak: 0/1
human_decision: approve/edit/reject
review_actionable: 0/1
```

### 10.5 무료 trace 예산

LangSmith 공식 가격표의 Developer 플랜은 월 5,000 base traces 포함으로 표시된다. 수업에서는 무료 한도를 다음처럼 관리한다.

- 개인당 목표 trace: 80–120건.
- 정상 case 8개 × 3회 = 24건.
- 예외 case 8개 × 3회 = 24건.
- prompt/model 비교 3조건 × 8개 = 24건.
- 남는 예산은 debug와 발표 데모에 사용한다.
- 무한 loop와 자동 재실행을 금지한다.
- trace 생성 전 `LANGSMITH_TRACING` on/off를 확인한다.
- 장시간·민감 데이터는 local JSONL로 관찰하고 대표 case만 LangSmith에 보낸다.

### 10.6 5일 관측 학습의 누적 방식

| 일차 | 관측 수준 |
|---:|---|
| 1 | Python logger와 `run_log.jsonl` |
| 2 | STT 구간별 시간·QC flag |
| 3 | prompt version별 코드 리뷰 품질 표 |
| 4 | graph node, retry, interrupt, audit log |
| 5 | LangSmith trace, feedback, dataset, experiment |

LangSmith를 마지막 날 갑자기 켜는 것처럼 보이지만, 앞선 4일 동안 필요한 관측 개념과 naming을 local log로 미리 학습한다.

---

## 11. 한글 기반 실제 데이터와 PBL 사례

### 사례 A — 국립국어원 일상 대화 음성·협력적 대화 요약 말뭉치

- 국립국어원 “모두의 말뭉치”에는 2025 일상 대화 음성 말뭉치, 협력적 대화 요약 말뭉치, 협력적 대화 요약 평가 말뭉치 등이 표시되어 있다.
- 활용: STT 정확성, 대화 요약, Action Item schema의 평가 데이터 설계.
- 수업 준비: 다운로드·신청 조건과 이용약관을 강사가 사전에 확인하고, 대용량 전체가 아니라 허용된 소량 샘플만 배포한다.
- 빠른 대체: 학생 가입이 필요하면 강사 제작 2분 회의 audio와 정답 transcript를 사용한다.

### 사례 B — 국회도서관 발언 빅데이터

- 국회도서관의 발언 빅데이터 서비스는 발언자·회의·키워드 기반으로 한국어 회의 발언을 탐색하는 실제 공공 사례다.
- 활용: 길고 논쟁적인 한국어 발언에서 안건, 주장, 결정 여부, 미해결 쟁점을 구조화한다.
- 주의: 정치적 입장을 평가하는 프로젝트가 아니라 **요약의 근거성·중립성**을 평가한다.
- PBL 과제: 같은 발언을 찬반 결론으로 과장하지 않고, 발언·결정·미결을 분리한다.

### 사례 C — 서울시 정보소통광장 위원회 회의정보

- 회의일시, 장소, 참석대상, 안건, 설치근거처럼 업무 문서 schema에 좋은 실제 필드가 공개된다.
- 활용: 회의 metadata + 회의록 초안 + 결정사항을 Markdown 템플릿에 매핑한다.
- PBL 과제: 공개된 회의 정보와 강사 제작 transcript를 결합해 결과 문서를 만든다.
- 주의: 공개 페이지라도 첨부파일의 공개·비공개 상태와 이용 조건을 확인한다.

### 사례 D — 공개 GitHub 저장소가 아니라 강사 제공 “의도적 버그 repo”

- 실제 open source에 교육용 AI comment를 게시하면 민폐가 될 수 있다.
- 강사가 작은 Python 업무 자동화 repo를 제공하고 8개의 의도적 버그 PR을 만든다.
- bug 유형: timezone, duplicate side effect, missing validation, secret logging, stale cache, swallowed exception, wrong line mapping, missing test.
- 마지막 선택 실습만 본인 sandbox repository에 comment한다.

### 사례 E — 재직자용 비식별 업무 변환

학습자는 실제 회사 데이터를 가져오는 대신 아래 template로 문제를 추상화한다.

```text
조직명: A사
사람 이름: 역할1, 역할2
제품명: Product-X
실제 고객/금액/계약번호: 제거 또는 범주값
회의 내용: 동일한 업무 관계를 유지한 합성 대화
```

---

## 12. PPT·화면 캡처·Tutorial 제작 가이드

### 12.1 1일차 장표 분량 권장

강사의 실제 진행 속도와 “장표만으로도 Tutorial을 재현”해야 한다는 요구를 반영해 1일차 상세판은 **총 270장**으로 운영한다. 8개 구간은 `29·35·35·35·34·34·34·34장`이며, 장표의 시간 표기는 `1일차 1차시~8차시`로 통일한다. 270장을 같은 속도로 읽지 않고 강의·강사 코드 시연·개인 소프트웨어 실습·실행 확인의 리듬으로 사용한다. 느린 반은 fixture와 executed notebook으로 복구하고, 빠른 반은 실패 주입과 provider 교체까지 이어간다.

| 장표 유형 | 권장 수 | 목적 |
|---|---:|---|
| 초보자 용어 풀이 | 32 | 시간당 4개 용어를 한 줄 뜻·필요성·수업 예시로 설명 |
| 개념·비교 | 80–90 | Agent, LLM, Tool Calling, local LLM, Git을 한 장 한 주장으로 설명 |
| Tutorial Map·실제 화면 | 36–44 | 차시별 Map과 실제 실행 화면 |
| 코드·소프트웨어 실습 단계 | 85–100 | 명령·기대 결과·오류 복구·완료 증거를 화면 단위로 분리 |
| 실패·복구·checkpoint | 32–42 | 설치 실패, schema 오류, timeout, 권한, 중복 실행과 이해 확인 |

차시별 29–35장의 기본 리듬은 다음과 같다.

1. 구간 표지·시간 지도 2장
2. 초보자 용어 풀이 4장
3. 핵심 개념과 업무 사례 9–10장
4. Tutorial Map 1장 + 실제 화면 4–5장
5. 강사 live demo와 코드 해설 4–5장
6. 학습자 따라하기 5장
7. 실패 주입과 복구 3장
8. 재직자·구직자 확장 2장
9. checkpoint·정리 1장

### 12.2 모든 Tutorial 장표가 답해야 할 질문

1. 지금 어느 화면인가?
2. 무엇을 클릭하거나 입력하는가?
3. 성공하면 무엇이 보여야 하는가?
4. 실패하면 가장 흔한 원인은 무엇인가?
5. 해결하지 못하면 어떤 대체 경로로 넘어가는가?
6. 어떤 파일 또는 commit이 남아야 하는가?

### 12.3 실제 캡처 checklist

- VS Code 설치 페이지와 Python/Jupyter extension 검색 화면
- VS Code `Python: Select Interpreter`
- notebook kernel 선택과 cell 성공 출력
- Terminal의 `python --version`, `git --version`
- `git status` before/after, `git diff`, `git log --oneline`
- Ollama download와 `ollama list`
- local API health check와 첫 response
- Codex CLI 또는 Claude Code 공식 설치 문서와 실제 repo demo
- 국립국어원 말뭉치, 국회 발언 데이터 등 한국어 사례 화면
- LangSmith trace tutorial 또는 실제 개인 trace 화면

### 12.4 캡처 보안 규칙

- API key, PAT, email, 개인 repo 이름을 가린다.
- `.env` 내용은 절대 캡처하지 않는다.
- 화면 오른쪽 위 계정 avatar와 browser bookmark를 가능한 한 crop한다.
- 서비스 버전과 캡처 날짜를 speaker notes에 적는다.
- 서비스 UI가 바뀔 수 있으므로 “메뉴 이름 + 검색어”를 함께 적는다.
- 로그인 필수 화면은 별도의 강사 계정으로 미리 캡처하고, 학생 자료에는 비식별 이미지만 넣는다.

### 12.5 2–5일차 deck 분리 제안

- Day 2: STT·회의록·LangChain, 240–300장 상세판 + 60장 축약판
- Day 3: diff·코드 리뷰·평가, 240–300장 상세판 + 60장 축약판
- Day 4: GitHub·LangGraph·HITL·예외, 240–300장 상세판 + 70장 축약판
- Day 5: LangSmith·통합·평가·발표, 240–300장 상세판 + 60장 축약판

빠른 반을 위해 appendix에 심화 장표를 충분히 넣고, 느린 반은 appendix를 생략해도 핵심 흐름이 유지되게 만든다.

### 12.6 프로젝트 전용 PPT 디자인 시스템

PPT 제작 규칙은 `design-system/ppt/cha-sungjae-lecture/`에 고정한다. 컬러는 black·white·neutral gray를 주색으로, navy·blue만 기능성 보조색으로 사용한다. 본문 UI는 flat·sharp·compact 원칙을 따르고, 장식성 gradient·glow·큰 round card·무관한 색상은 사용하지 않는다. 실제 서비스 캡처만 원본 UI 색을 유지한다.

- `design-tokens.json`: 컬러·타이포그래피·간격·모서리·금지 규칙
- `design-system.mjs`: 16:9 slide size와 공통 palette를 제공하는 구현 모듈
- `IPA_LECTURE_TEMPLATE.pptx`: 12개 핵심 layout 예시
- `USAGE.txt`: 새 deck 제작·검수 절차
- `TUTORIAL_COVERAGE.md`: 시간대별 실제 화면과 장표 번호 대응표
- `components/`: Lucide·Simple Icons·글로벌 개발자 발표·HITL 참고 이미지를 재사용하는 자산 폴더

---

## 13. 강사 소개 장표 문안

### 표지 표기

**차성재 | 무신사 Agentic AI Side PM · 서울시립대/아주대 AI 겸임교수**

표지는 이름과 현재 역할만 남기고, 세부 서비스·경력은 뒤의 2–4장 소개에서 전개한다.

### 현재 역할

**무신사 Agentic AI Side PM**

- Agent AID Chat: 쇼핑 탐색·상품 상세정보 Agent
- Voice Agent
- AI 해설
- SEO/GEO
- 모두의AI

**서울시립대학교·아주대학교 AI 부문 겸임교수**

- Data Analysis
- Machine Learning
- MLOps
- LLMOps

### 산업 경력 — 금융/ML → 의료/DL → 교육/LLM → 이커머스/Agent

| 산업·회사 | 역할과 문제 | 핵심 성과·노하우 |
|---|---|---|
| 금융 · 에이젠글로벌 | ML Team Leader / AI Engineer · AutoML·MLOps | 자체 AutoML 솔루션 `ABACUS` 기반 은행·카드·보험 프로젝트 참여, 개인대출 시장 서비스 기반 제작 |
| 의료 · 아이넥스코퍼레이션 | AI Engineer · Data/CVOps | 실시간 대장내시경 영상의 용종 탐지·진단 서비스 제작과 운영 총괄 |
| 교육 · 크레버스 | AI Engineer + AI PM · LLMOps/AICC | 청담·에이프릴 약 7만 명 영어 말하기·글쓰기 평가를 원어민 수작업 3–5일에서 약 10초 내외로 단축하는 시스템 총괄 개발·운영, 상담 전·중·후 생산성을 높이는 AICC 서비스 총괄 |
| 이커머스 · 무신사 | Agentic AI Side PM | 쇼핑 탐색·상품정보·Voice·AI 해설·SEO/GEO 등 고객 접점 Agent 제품의 문제정의와 운영 통제 |

소개 슬라이드의 핵심 서사는 회사명 나열이 아니라 **모델 종류가 바뀌어도 실제 서비스에는 데이터·평가·운영·휴먼 통제가 함께 필요했다**는 점이다.

### 강의 이력

- 서울시립대학교·아주대학교 대학원 AI 부문 겸임교수
- KT, Kakao 등 기업 대상 AX 교육 — Agent, Prompt Engineering
- 대학·연구 조직 대상 연구 AX 교육
- 재직자·취업준비생 대상 AI Native 교육·멘토링
- 문제 출제위원·심사위원 등 참여

### 소개 시 전달할 메시지

“오늘의 목표는 도구 이름을 외우는 것이 아니라, 실제 서비스와 업무에 AI를 넣을 때 필요한 문제정의·검증·운영의 전체 흐름을 직접 만드는 것입니다.”

---

## 14. 평가 설계

### 14.1 과정 평가

| 평가요소 | 비중 | 관찰 증거 |
|---|---:|---|
| 문제정의·사용자 가치 | 15 | README, 발표 |
| STT·LLM·LangChain 구현 | 20 | 실행 결과, schema |
| LangGraph·예외·HITL | 20 | graph, failure test, approval log |
| 코드 리뷰·GitHub 연동 | 15 | finding, dry-run payload, sandbox demo |
| LangSmith 관측·평가 | 15 | trace, feedback, experiment |
| 재현성·Git·문서 | 10 | clean run, commit history |
| 발표·동료 피드백 | 5 | 3분 demo, 질문 답변 |

### 14.2 매시간 formative assessment

- 초록: 혼자 재실행 가능
- 노랑: 장표를 보면 가능
- 빨강: checkpoint에서 복구 필요

강사는 빨강 학습자에게 개별 디버깅을 오래 붙잡기보다, 정상 checkpoint로 이동시킨 뒤 오류를 수업 전체의 exception 사례로 회수한다.

### 14.3 최종 발표 5분 구조

1. 문제와 사용자 — 30초
2. input부터 approval까지 live demo — 2분
3. 실패·복구·LangSmith trace — 1분
4. 재직자 도입 효과 또는 구직자 포트폴리오 포인트 — 30초
5. 질문 — 1분

---

## 15. 강사 사전 준비와 운영 checklist

### D-7

- Windows/macOS 각각 설치 캡처 확보
- 4B/1–2B 모델 다운로드 링크와 디스크 용량 확인
- 2–3분 한국어 audio, 정답 transcript, STT 대체본 준비
- 의도적 bug repo와 8개 diff fixture 준비
- 학생 계정 필요 목록 공지: GitHub, 선택 LangSmith

### D-1

- 모든 notebook을 kernel restart 후 Run All
- clean clone에서 README 절차 재실행
- Ollama model tag가 실제 존재하는지 확인
- 네트워크 차단용 model response fixture 준비
- LangSmith tracing on/off 두 경로 확인
- 화면 캡처의 key·email·개인정보 검수
- 첫날 점심 변경 사유와 사과 문구를 시작 장표·12시 재공지 장표에 반영
- 11:30-12:00, 13:40-14:00, 17:00-17:30 쉬는 시간과 17:30-18:00 Q&A 표기를 확인

### 강의 시작 30분 전

- projector 해상도와 한글 font 확인
- instructor repo와 student starter repo를 분리
- terminal font 18pt 이상
- audio output과 microphone 확인
- model server health check
- checkpoint zip 또는 release 확인
- 강사용 API/PAT는 학생 화면과 분리

### 네트워크 장애 시

- Day 1: mock LLM adapter와 로컬 fixture로 진행
- Day 2: transcript 제공 후 LLM pipeline부터 진행
- Day 3: diff fixture 사용
- Day 4: GitHub API fixture와 dry run만 수행
- Day 5: local JSONL trace와 사전 캡처로 LangSmith 개념 진행

---

## 16. 자료 폴더 구조 제안

```text
llm-agent-and-workflow-automation/
├── IPA_40H_상세_커리큘럼_및_무료실습_설계.md
├── slides/
│   ├── Day1_2026-08-23.pptx
│   ├── Day2_STT_LangChain.pptx
│   ├── Day3_CodeReview_Agent.pptx
│   ├── Day4_GitHub_LangGraph_HITL.pptx
│   └── Day5_LangSmith_Project.pptx
├── materials/
│   ├── day1/
│   ├── day2/
│   ├── day3/
│   ├── day4/
│   └── day5/
├── data/
│   ├── meeting_sample_ko.txt
│   ├── meeting_sample_ko.wav
│   └── diffs/
├── src/
├── tests/
├── assets/screenshots/
├── .env.example
├── .gitignore
└── README.md
```

---

## 17. 참고한 공식·원자료 링크

아래 링크의 가격, 제품 UI, 지원 edition, 모델 tag는 변경될 수 있으므로 강의 직전에 다시 확인한다.

### Agent harness와 개발 환경

- [OpenAI Codex CLI 공식 문서](https://learn.chatgpt.com/docs/codex/cli)
- [Claude Code 초보자용 Terminal Guide](https://code.claude.com/docs/en/terminal-guide)
- [Claude 제품 가격표](https://www.anthropic.com/pricing?subjects=claude&type=product)
- [VS Code Python·Jupyter 공식 문서](https://code.visualstudio.com/docs/languages/python)
- [Pro Git — 저장소 시작하기](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository)

### 무료 로컬 LLM

- [Ollama 다운로드](https://ollama.com/download)
- [Ollama Tool Calling](https://docs.ollama.com/capabilities/tool-calling)
- [Qwen3-4B 공식 model card](https://huggingface.co/Qwen/Qwen3-4B)
- [Gemma 3 공식 model card](https://ai.google.dev/gemma/docs/core/model_card_3)
- [LM Studio local API server](https://beta.lmstudio.ai/docs/developer/core/server)
- [Jan local API server](https://www.jan.ai/docs/desktop/api-server)

### STT와 대체 실행 환경

- [faster-whisper 공식 GitHub README](https://github.com/SYSTRAN/faster-whisper)
- [whisper.cpp 공식 GitHub](https://github.com/ggml-org/whisper.cpp)
- [Google Colab FAQ — 무료이지만 자원·한도는 변동](https://research.google.com/colaboratory/faq.html)
- [Google Meet transcript 지원 edition·한국어](https://support.google.com/meet/answer/12849897?hl=en-GB)
- [Google Meet “Take notes for me”](https://support.google.com/meet/answer/14754931?hl=en)

### LangChain, LangGraph, LangSmith

- [LangGraph Persistence](https://docs.langchain.com/oss/python/langgraph/persistence)
- [LangGraph Interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts)
- [LangSmith Observability Concepts](https://docs.langchain.com/langsmith/observability-concepts)
- [LangSmith Evaluation Concepts](https://docs.langchain.com/langsmith/evaluation-concepts)
- [LangSmith 가격표](https://www.langchain.com/pricing)

### GitHub 보안과 API

- [GitHub Personal Access Token 관리](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- [GitHub REST API rate limit](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)
- [Pull Request review comment API](https://docs.github.com/en/rest/pulls/comments)

### 한국어 공개 사례

- [국립국어원 모두의 말뭉치](https://kli.korean.go.kr/m/main/requestMain.do)
- [국회도서관 발언 빅데이터](https://dataset.nanet.go.kr/)
- [서울시 정보소통광장 위원회 회의정보 예시](https://opengov.seoul.go.kr/proceeding/31070400)

---

## 18. 최종 운영 판단

이 과정에서 가장 중요한 성공 조건은 모든 학생이 같은 유료 API를 쓰는 것이 아니다. **같은 interface와 검증 절차를 쓰는 것**이다. 모델 provider는 로컬 Ollama, LM Studio, Jan, Codex/Claude 보조로 달라도 되지만 다음은 동일해야 한다.

- 입력 계약
- 출력 schema
- tool allowlist
- 예외 분류
- retry 상한
- human approval
- audit log
- test case
- Git checkpoint
- LangSmith 또는 local trace

이 공통 harness가 있으면 수업 중 모델과 서비스가 바뀌어도 40시간 과정의 학습가치는 유지된다.

---

## 19. PPT·콘텐츠 품질을 유지하는 하네스

Day 1 장표와 이후 5일 자료는 아래 파일을 단일 검수 기준으로 사용한다.

- `design-system/ppt/cha-sungjae-lecture/content-harness/CONTENT_HARNESS.md`: 메시지 계층, 반복 정책, 장표 역할, 사람 검수 체크리스트
- `design-system/ppt/cha-sungjae-lecture/content-harness/DAY1_MESSAGE_MAP.json`: 8개 블록의 소유 메시지·예고 범위·산출물
- `design-system/ppt/cha-sungjae-lecture/content-harness/audit_deck_content.mjs`: 제목 중복, 반복 narrative line, 중간 요약을 찾는 자동 검사기
- `design-system/ppt/cha-sungjae-lecture/content-harness/DAY1_AUDIT_LOG.md`: 버전별 변경 전/후 수치와 판단 기록

운영 원칙은 간단하다. 새 장표를 추가하기 전에 메시지 소유 블록을 먼저 정하고, 기존 설명을 다른 말로 반복하는 장표라면 반례·실제 화면·판단 Gate로 바꾼다. 하루 전체의 회수는 마지막 Q&A·Exit Ticket에서만 짧게 진행한다.
