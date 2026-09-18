# 숙명여대 Agentic AI 실습 프로젝트 — 상세 커리큘럼 v1

- 작성일: 2026-08-09
- 교과목명(권장): **Agentic AI Product Studio: LLM 파인튜닝·AI 에이전트 기반 서비스 기획과 개발**
- 교과목명(행정용 간결안): **LLM 파인튜닝과 AI 에이전트를 활용한 서비스 기획·개발**
- 운영: 3학점, BL(VOD 선행학습 + 오프라인 실습)
- 대상: 머신러닝·딥러닝·클라우드·LLM 관련 과목을 이수한 4학년 전공생
- 구성: 1~7주·9~14주 VOD 30분 × 2편 + 오프라인 실습 120분, 8·15주 프로젝트 평가

## 1. 교과목 설계 의도

이 교과목은 특정 모델이나 프레임워크 사용법만 익히는 수업이 아니다. 학생이 산업 현장의 **Agentic AI Product/Technical PM** 관점에서 문제를 발견하고, 의사결정 문서를 만들고, 적절한 AI 기술을 선택하고, 로컬에서 실행 가능한 최소기능제품(MVP)을 구현한 뒤, 평가·운영·안전성까지 검증하는 전 과정을 경험하도록 설계한다.

프로젝트의 모델 영역은 ML, DL, CV, LLM, Agent 중 자유롭게 선택할 수 있다. 다만 모든 프로젝트는 다음 공통 질문에 답해야 한다.

1. 누구의 어떤 문제를 해결하는가?
2. 왜 AI가 필요한가? 규칙 기반·검색·기존 소프트웨어보다 나은 지점은 무엇인가?
3. Prompt, RAG, Fine-tuning, Tool, Agent 중 무엇을 왜 선택했는가?
4. 성공 여부를 어떤 데이터와 지표로 검증할 것인가?
5. 실패·비용·보안·개인정보 위험을 어떻게 통제할 것인가?
6. 다른 사람이 로컬에서 결과를 재현할 수 있는가?

산업 프로젝트 사례는 단순 소개가 아니라 매주 `의사결정 상황 → 선택지 → 판단 기준 → 산출물`의 형태로 익명화·재구성하여 활용한다.

## 2. 교육목적 및 학습목표

### 교육목적

학생이 Agentic AI 제품의 문제 정의부터 기획, 아키텍처, 구현, 평가, 운영 개선까지 전 주기를 수행하고, 그 과정을 소프트웨어 포트폴리오로 설명할 수 있도록 한다.

### 학습목표

수강생은 수업 종료 시 다음을 수행할 수 있다.

1. Prompt, RAG, Fine-tuning, Workflow, Agent의 적용 조건과 한계를 비교하여 기술 전략을 선택한다.
2. Roadmap, 2-Pager, PRD를 작성하여 제품의 방향, 투자 필요성, 요구사항과 성공 기준을 설득력 있게 정의한다.
3. HLD, LLD, ADR을 작성하여 제품 요구사항을 구현 가능한 시스템과 기술 의사결정으로 전환한다.
4. 소형 오픈 모델 또는 개인 API를 사용해 로컬에서 실행 가능한 AI 서비스의 핵심 흐름을 구현한다.
5. 정답성뿐 아니라 task success, groundedness, latency, token/cost, reliability, safety를 평가하고 trace를 통해 실패 원인을 분석한다.
6. 임원 관점의 가치 제안과 엔지니어 관점의 재현 가능성을 함께 갖춘 프로젝트 발표를 수행한다.

## 3. 중간·기말평가의 합리적 표현

### 8주차 — 중간 프로젝트 정의 심사(Project Definition Review)

8주차에는 지필형 중간고사와 정규 VOD·오프라인 실습을 실시하지 않는다. 학생은 자기주도 프로젝트 설계 스프린트를 수행하고 **Roadmap, 2-Pager, PRD v1.0, 평가 계획, 최소 기술 검증 증거**를 제출한다.

평가는 구현량보다 다음에 초점을 둔다.

- 해결할 문제와 대상 사용자가 구체적인가?
- 제안 가치와 범위가 한 학기 프로젝트로 현실적인가?
- 요구사항, 제외 범위, 사용자 시나리오, 수용 기준이 서로 일관적인가?
- 성공 지표와 평가 데이터가 실제로 측정 가능한가?
- 주요 기술·데이터·비용·안전성 위험과 대응 계획이 정의되어 있는가?

즉, 8주차는 “시험을 보지 않는 주차”가 아니라 **개발 착수 여부를 판단하는 제품 정의 품질 게이트**이다.

### 15주차 — 기말 MVP 검증 및 포트폴리오 발표(Final MVP Review)

15주차에는 정규 VOD·오프라인 실습을 운영하지 않고 프로젝트 결과 평가만 진행한다. 별도 평가 시간에 발표·시연을 진행하거나, 운영 여건에 따라 녹화 발표와 결과물을 제출한다.

평가 대상은 **로컬에서 실행 가능한 MVP, 평가 결과, HLD·LLD·ADR, 재현 가능한 저장소와 README, 발표 자료**이다. 외형이 화려한 데모나 많은 기능보다 핵심 사용자 시나리오의 완결성, 평가 증거, 기술적 설명력, 재현 가능성을 우선한다.

## 4. 프로젝트 산출물 체계

| 산출물 | 핵심 질문 | 주 독자 | 최소 포함 내용 | 권장 완료 시점 |
|---|---|---|---|---|
| Roadmap | 왜, 어떤 순서로 가치를 만들 것인가? | 임원·이해관계자 | 제품 비전, outcome/theme, Now-Next-Later, KPI, 의존성 | 1주차 초안, 7주차 확정 |
| 2-Pager | 이 아이디어에 투자·착수해야 하는가? | 임원·제품/개발 리더 | 문제와 근거, 대상 사용자, 제안 솔루션, 기대 가치, 성공 지표, 위험, 의사결정 요청 | 2주차 초안, 7주차 확정 |
| PRD | 무엇을, 왜, 어느 수준까지 만들 것인가? | PM·디자이너·개발자 | 사용자 여정, 요구사항, 사용자 스토리, 범위/제외 범위, 수용 기준, NFR, 데이터·평가 계획 | 3~7주차, 중간평가 |
| HLD | 시스템은 어떤 구성요소로 동작하는가? | 아키텍트·개발 리드 | 시스템 컨텍스트, 컴포넌트, 데이터 흐름, 모델·도구, 저장소, 신뢰 경계, 확장·장애 전략 | 9주차 |
| LLD | 핵심 기능을 코드 수준에서 어떻게 구현하는가? | 개발자 | API/함수 계약, 상태·시퀀스, 데이터 스키마, 오류·재시도·멱등성, 테스트 포인트 | 10~11주차 |
| ADR | 왜 이 기술 결정을 내렸는가? | 현재·미래 개발자 | Context, Options, Decision, Consequences, Status | 11~14주차 누적 |

`2-Pager`는 One-Pager와 혼용하지 않고 **2페이지 이내의 임원 의사결정 메모**로 통일한다. PRD에는 상세 구현 코드를 넣지 않고 검증 가능한 요구사항을 넣으며, HLD와 LLD는 각각 시스템 수준과 핵심 로직 수준의 `어떻게`를 담당한다. ADR은 거대한 통합 문서가 아니라 중요한 결정마다 한 건씩 짧게 축적한다.

## 5. 수업 운영 원칙

### 주차별 학습 시간

- VOD 1(30분): 핵심 개념과 기술 원리
- VOD 2(30분): 산업 사례, 제품 판단, 실패 패턴
- 오프라인 실습(120분): `10분 체크인 + 45분 필수 코드 + 10분 휴식 + 45분 자유 프로젝트 미션 + 10분 리뷰·커밋`
- 8·15주차: 정규 VOD와 실습 없이 프로젝트 평가

### 공통 실습 스택

- Python, 가상환경(venv 또는 uv), Git, Jupyter/VS Code
- Pydantic 또는 JSON Schema, pytest, FastAPI(로컬 실행)
- Hugging Face Transformers/Datasets/PEFT/TRL 또는 Apple Silicon용 MLX-LM
- 로컬 검색: sentence-transformers + FAISS/Chroma 또는 경량 lexical retrieval 대안
- 저장소: SQLite/로컬 파일
- 관측성: 구조화 JSON trace를 기본으로 하고, MLflow 또는 OpenTelemetry는 선택 확장
- UI: CLI/Notebook을 기본 인정하며 Streamlit/Gradio는 선택

프레임워크 종속성을 낮추기 위해 먼저 순수 Python 함수와 명시적 상태로 핵심 루프를 구현한 뒤, 필요할 때 Agent SDK·MCP SDK·오케스트레이션 프레임워크를 연결한다.

### 서버·하드웨어 제약

- 외부 서버 배포는 요구하지 않는다. 최종 결과물은 `localhost` 또는 Notebook/CLI에서 실행되면 된다.
- 파인튜닝은 대형 모델 성능 경쟁이 아니라 **데이터 형식, 학습 설정, adapter 저장·로딩, baseline 비교를 이해하는 동작 검증 수준**으로 운영한다.
- 소형 오픈 모델과 축소 데이터, 적은 step을 사용한다. 장비가 부족한 학생은 데이터 검증·학습 설정·짧은 sanity run과 제공 adapter의 추론·평가까지 수행할 수 있다.
- Apple Silicon은 MLX-LM, CUDA 환경은 PEFT/TRL 경로를 제공한다. 모든 학생의 평가 기준은 동일한 성능 수치가 아니라 실험 설계와 비교 증거이다.

### API 및 비용 정책 문구

> 일부 최신 상용 모델·검색·멀티모달 API 활용 예시는 강사가 시연할 수 있다. 수강생이 동일 기능을 재현하거나 프로젝트에 적용할 경우 본인의 API Key와 개인 결제 계정을 사용하며, 사용량에 따라 비용이 발생할 수 있다. 특정 유료 API 사용 여부는 성적에 영향을 주지 않으며, 로컬 모델·Mock·기록된 응답을 이용한 대체 경로를 제공한다. API Key는 `.env`로 관리하고 저장소·과제·화면 녹화에 포함하지 않는다.

## 6. 15주 상세 커리큘럼

### 1주차 — Agentic AI Product Studio 오리엔테이션

- **VOD 1: AI 서비스에서 Agentic AI 제품으로**
  - 모델, LLM 애플리케이션, workflow, agent의 차이
  - Agentic AI 제품 라이프사이클: Discover → Define → Build → Evaluate → Operate
  - 자율성 수준과 human-in-the-loop의 필요성
- **VOD 2: 기술보다 먼저 결정할 제품 문제**
  - AI가 필요한 문제와 불필요한 문제 구분
  - Prompt/RAG/Fine-tuning/Tool/Agent 선택 지도
  - 산업 프로젝트의 PoC, MVP, Production 차이와 포트폴리오 기준
- **필수 코드 실습**
  - 공통 저장소·가상환경·환경변수·테스트 구조 생성
  - 로컬 모델 또는 Mock/API provider를 동일 인터페이스로 호출
  - 구조화 출력 1건과 smoke test 작성
- **자유 프로젝트 미션**
  - 해결 후보 3개를 작성하고 사용자·업무·현재 대안·불편·AI 필요성을 비교
  - 한 개를 선택해 1문장 Product Thesis와 Now-Next-Later Roadmap v0.1 작성
- **주차 산출물**: 프로젝트 후보 비교표, Product Thesis, Roadmap v0.1, 실행 가능한 저장소

### 2주차 — Context Engineering, Structured Output와 2-Pager

- **VOD 1: PromptOps에서 Context Engineering으로**
  - instruction, example, retrieved context, memory, tool schema의 역할
  - context pollution, token budget, 상태와 지식의 분리
  - prompt/version/config를 코드와 함께 관리하는 방법
- **VOD 2: 임원 의사결정을 만드는 2-Pager**
  - 문제 근거, 대상 사용자, 제안 가치, 성공 지표, 위험, 요청 사항
  - 기능 목록보다 outcome과 business/operational value를 설명하는 방법
  - 좋은 제안과 기술 데모 중심 제안의 차이
- **필수 코드 실습**
  - Pydantic/JSON Schema 기반 구조화 출력
  - prompt v1/v2 저장, 입력·출력·모델·latency 기록
  - 잘못된 형식에 대한 validation과 retry 1회 구현
- **자유 프로젝트 미션**
  - Roadmap v0.2와 2-Pager v0.1 작성
  - 프로젝트 성공 지표 1개, guardrail 지표 2개, 착수 조건 정의
- **주차 산출물**: Roadmap v0.2, 2-Pager v0.1, prompt/config 로그

### 3주차 — PRD I: 사용자·범위·평가 우선 설계

- **VOD 1: 검증 가능한 PRD 작성법**
  - 사용자·JTBD·사용자 여정·핵심 시나리오
  - 범위와 제외 범위, user story, acceptance criteria, NFR
  - 기능 요구와 모델 행동 요구를 구분하는 방법
- **VOD 2: Eval-Driven Product Development**
  - task, trial, grader, trace, outcome의 구분
  - 정확도만으로 부족한 이유와 제품 outcome 중심 평가
  - code-based, rubric/model-based, human 평가의 조합
- **필수 코드 실습**
  - 프로젝트별 golden task 5~10개를 JSONL로 작성
  - exact/regex/schema/상태 검증 중 2개 이상의 deterministic grader 구현
  - baseline 결과표 생성
- **자유 프로젝트 미션**
  - PRD v0.1 작성: 사용자 여정, 핵심 시나리오 1개, 범위/제외 범위, user story, acceptance criteria
  - 프로젝트 유형에 맞는 성공 지표와 평가 데이터 초안 정의
- **주차 산출물**: PRD v0.1, golden set v0.1, baseline 평가표

### 4주차 — RAG, 검색 품질, Memory와 데이터 요구사항

- **VOD 1: RAG 기본에서 고급 검색까지**
  - ingest, chunk, embed, retrieve, rerank, generate 파이프라인
  - lexical/vector/hybrid search와 reranking 선택 기준
  - citation, freshness, access control, retrieval failure
- **VOD 2: Agent Memory와 Context 설계**
  - session state, short-term memory, long-term memory, knowledge base의 차이
  - 모든 대화를 저장하면 안 되는 이유
  - 데이터 수명, 개인정보, 삭제와 최신성 요구사항
- **필수 코드 실습**
  - 작은 문서 집합을 이용한 로컬 RAG 구현
  - source id/citation을 포함한 응답 스키마 작성
  - 5개 질의로 retrieval hit와 answer groundedness 수동 점검
- **자유 프로젝트 미션**
  - PRD에 데이터 출처, 권리·개인정보, 갱신 주기, 실패 시 fallback 추가
  - RAG/Memory가 불필요한 프로젝트는 그 이유와 대체 데이터 흐름 정의
- **주차 산출물**: PRD Data & Context 섹션, retrieval/데이터 실험 결과

### 5주차 — Fine-tuning I: SFT, LoRA/QLoRA와 로컬 실험

- **VOD 1: 파인튜닝 라이프사이클과 데이터 품질**
  - base/instruct 모델, SFT, PEFT, LoRA/QLoRA의 관계
  - chat/completion 데이터 형식, train/validation/test 분리
  - 작은 데이터에서의 과적합·오염·암기 위험
- **VOD 2: Fine-tuning vs RAG vs Prompt의 제품 의사결정**
  - 지식 추가, 형식·스타일, 행동 학습의 구분
  - 성능, 비용, 업데이트 주기, 개인정보, 라이선스 비교
  - Apple Silicon MLX-LM과 CUDA PEFT/TRL의 로컬 경로
- **필수 코드 실습**
  - JSONL 데이터 validator, 중복·길이·누락 필드 검사
  - 소형 모델 baseline 추론과 token/latency 측정
  - 축소 데이터·저스텝 LoRA sanity run, adapter 저장·로딩
- **자유 프로젝트 미션**
  - PRD Model Strategy 부록 작성
  - 선택지별 기대 효과·비용·위험을 비교하고 한 학기 실험 범위를 확정
- **주차 산출물**: 학습 데이터 카드, baseline/adaptor 실행 로그, Model Strategy

### 6주차 — Fine-tuning II: DPO·합성 데이터와 평가 설계

- **VOD 1: Preference Optimization과 합성 데이터**
  - chosen/rejected pair와 DPO의 목적
  - 합성 데이터 생성·필터링·다양성·오염 관리
  - SFT 이후 DPO가 필요한 경우와 필요하지 않은 경우
- **VOD 2: 모델·RAG·Agent 평가의 다층 구조**
  - capability와 regression eval, 단일 출력과 multi-turn 평가
  - quality, task success, latency, token/cost, consistency, safety
  - LLM-as-a-judge의 편향과 human calibration
- **필수 코드 실습**
  - preference pair validator와 소규모 pair 데이터 생성
  - 공통 평가셋으로 baseline과 adapter 비교
  - 가속 장비 보유자는 짧은 DPO run, 그 외는 제공 결과/adapter로 평가 수행
- **자유 프로젝트 미션**
  - PRD Success Metrics & Evaluation Plan 완성
  - acceptance criterion마다 최소 1개의 평가 task를 연결
- **주차 산출물**: 비교 리포트, golden set v0.2, PRD 평가 계획

### 7주차 — Agent Architecture Patterns와 PRD Quality Gate

- **VOD 1: Workflow와 Agent 설계 패턴**
  - prompt chain, router, parallelization, orchestrator-worker, evaluator-optimizer
  - plan-execute-reflect, tool use, handoff, human approval
  - 단일 agent가 multi-agent보다 나은 경우
- **VOD 2: 개발 착수 가능한 PRD의 기준**
  - 문제-기능-지표-평가 task의 추적성
  - scope creep, 숨은 운영 요구사항, dependency와 risk
  - 임원·개발·평가자 관점의 문서 리뷰
- **필수 코드 실습**
  - 읽기 전용 도구 2개를 가진 명시적 agent loop 구현
  - max step, timeout, 실패 fallback, 구조화 trace 추가
  - 정상/도구 실패/루프 위험 3개 테스트
- **자유 프로젝트 미션**
  - 동료 PRD 리뷰와 수정
  - Roadmap v1.0, 2-Pager v1.0, PRD v1.0, 중간평가 제출 패키지 완성
- **주차 산출물**: 중간평가 후보본, peer review 기록, 기술 검증 spike

### 8주차 — 중간 프로젝트 정의 심사

- **VOD**: 없음
- **오프라인 실습**: 없음
- **평가 방식**: 자기주도 설계 스프린트 및 비동기 결과물 심사
- **필수 제출물**: Roadmap v1.0, 2-Pager v1.0, PRD v1.0, golden set·평가 계획, 최소 기술 검증 증거
- **평가 초점**: 문제 정의, 제품 가치, 범위 현실성, 요구사항 일관성, 평가 가능성, 위험 관리
- **피드백 결과**: `Go / Conditional Go / Re-scope` 중 하나와 수정 요구사항 제공

### 9주차 — HLD와 로컬 서비스화

- **VOD 1: High-Level Design**
  - system context, component, data flow, sequence, trust boundary
  - model gateway, data store, tool, UI/API, evaluation/trace 구성요소
  - build vs buy, local vs API, 장애·fallback·확장성
- **VOD 2: 로컬 추론과 서비스 인터페이스**
  - Notebook prototype을 서비스 경계로 전환하는 방법
  - FastAPI, health check, config/secrets, provider abstraction
  - 외부 배포 없이도 검증 가능한 로컬 서비스 기준
- **필수 코드 실습**
  - 핵심 AI 함수 또는 agent를 FastAPI local endpoint로 감싸기
  - request/response schema, health endpoint, timeout/error response 구현
  - pytest 또는 API smoke test 작성
- **자유 프로젝트 미션**
  - HLD v0.1 작성: context/component/data-flow diagram과 NFR
  - PRD 요구사항을 HLD 구성요소에 매핑
- **주차 산출물**: HLD v0.1, 로컬 API, smoke test

### 10주차 — LLD, Tool Contract와 MCP

- **VOD 1: Low-Level Design**
  - API/함수 계약, 상태 머신, sequence, 데이터 스키마
  - 오류 분류, retry, timeout, idempotency, cache와 테스트 포인트
  - critical path만 상세화하는 실용적 LLD
- **VOD 2: MCP 기반 도구 연결**
  - MCP client/server, tools/resources/prompts의 역할
  - JSON Schema, capability discovery, authorization와 human approval
  - MCP가 필요한 경우와 일반 함수/API가 더 단순한 경우
- **필수 코드 실습**
  - 핵심 도구 1개를 명시적 schema와 검증 로직으로 구현
  - 동일 기능을 로컬 MCP server 또는 제공 scaffold에 노출
  - 정상·잘못된 인자·권한 거부 테스트
- **자유 프로젝트 미션**
  - 가장 중요한 사용자 흐름의 LLD v0.1 작성
  - tool/API 계약, 상태, 오류·재시도·테스트 조건 확정
- **주차 산출물**: LLD v0.1, tool contract, MCP/함수 도구 테스트

### 11주차 — Multi-Agent Orchestration, Handoff와 A2A

- **VOD 1: Multi-Agent를 쓰기 전 확인할 것**
  - supervisor, router, specialist, handoff, delegation
  - 공유 memory와 격리 memory, 병렬성, 중복 작업, 실패 전파
  - 단일 agent baseline과 비교해야 하는 이유
- **VOD 2: Agent-to-Agent 상호운용성**
  - A2A의 Agent Card, task, message, artifact 개념
  - MCP의 agent-to-tool과 A2A의 agent-to-agent 역할 구분
  - 프로토콜 도입에 따른 복잡도·보안·버전 관리
- **필수 코드 실습**
  - router/handoff를 이용한 2-role workflow 구현
  - 또는 로컬 Agent Card와 task/artifact 교환을 모사
  - 단일 agent와 task success·step·latency 비교
- **자유 프로젝트 미션**
  - 필요한 경우에만 multi-agent를 채택하고 HLD/LLD 갱신
  - 첫 ADR 작성: 단일 vs 다중 agent 또는 MCP/A2A 채택 결정
- **주차 산출물**: 통합 workflow, 비교표, ADR-001

### 12주차 — LLMOps·AgentOps와 Observability

- **VOD 1: LLMOps에서 AgentOps로**
  - code, prompt, data, model/adapter, eval set의 versioning
  - 실험 추적, CI evaluation, release gate, rollback
  - model output뿐 아니라 trajectory와 environment state를 관리하는 이유
- **VOD 2: Trace, Metric, Feedback Loop**
  - agent run → model call → tool call의 span 구조
  - latency, token, cost, retry, tool error, task success
  - 민감한 prompt/tool argument를 관측 데이터에 남길 때의 위험
- **필수 코드 실습**
  - 구조화 trace 또는 MLflow/OpenTelemetry local tracing 추가
  - eval runner로 golden set을 재실행하고 결과 저장
  - 실패 1건을 trace에서 찾아 원인·수정·회귀 테스트 기록
- **자유 프로젝트 미션**
  - 프로젝트 Evaluation Report v0.1과 운영 지표 정의
  - 성능/관측성 관련 ADR 작성 또는 기존 ADR 갱신
- **주차 산출물**: trace 샘플, 평가 리포트, 회귀 테스트, ADR

### 13주차 — Agent Security, Safety와 Governance

- **VOD 1: Agentic AI의 공격면**
  - direct/indirect prompt injection, data leakage, excessive agency
  - tool poisoning, insecure output handling, secret exposure, supply-chain risk
  - multi-agent 환경의 권한·신뢰 경계
- **VOD 2: 안전한 제품 정책과 통제**
  - least privilege, allowlist, sandbox, human approval, output validation
  - 개인정보·저작권·로그 보존, red-team task, incident 대응
  - NIST AI RMF와 OWASP 관점의 최소 위험 관리
- **필수 코드 실습**
  - 악성/비정상 입력 5개 이상의 red-team set 작성
  - tool allowlist, side-effect approval, secret masking, output validator 중 2개 이상 구현
  - 보안 테스트를 regression suite에 편입
- **자유 프로젝트 미션**
  - threat model/risk register와 안전성 acceptance criteria 작성
  - 보안 의사결정 ADR 추가
- **주차 산출물**: threat model, red-team 결과, guardrail, Security ADR

### 14주차 — 성능·비용 최적화와 Release Readiness

- **VOD 1: 품질을 유지하며 빠르고 저렴하게**
  - context budget, caching, batching, model routing
  - timeout, retry, circuit breaker, fallback, rate limit
  - API 비용과 로컬 자원 비용을 함께 설명하는 방법
- **VOD 2: 임원과 엔지니어 모두에게 통하는 최종 발표**
  - 문제→가치→데모→평가 증거→아키텍처→한계→다음 Roadmap
  - README, runbook, sample data, known issues, license
  - 기능 추가보다 release blocker를 제거하는 우선순위
- **필수 코드 실습**
  - baseline latency/token/cost/메모리 중 가능한 항목 측정
  - 병목 하나를 최적화하고 전후 비교
  - clean environment smoke test와 재현 실행 명령 검증
- **자유 프로젝트 미션**
  - MVP feature freeze, 문서·평가 결과·발표 자료 완성
  - 7분 발표 + 3분 질의응답 리허설과 동료 피드백
- **주차 산출물**: Release Candidate, 최적화 비교표, README/runbook, 최종 발표본

### 15주차 — 기말 MVP 검증 및 포트폴리오 발표

- **VOD**: 없음
- **오프라인 실습**: 없음
- **평가 방식**: 프로젝트 결과 발표·시연 및 결과물 검증
- **필수 제출물**
  - 로컬 실행 가능한 MVP와 소스 저장소
  - Roadmap·2-Pager·PRD 최종본
  - HLD·LLD·ADR 묶음
  - golden/eval set, 평가 결과와 trace, 알려진 한계
  - README, 환경 설정 예시, 실행·테스트 방법
  - 발표 자료 또는 녹화본
- **발표 권장 구성**: 7분 발표·시연 + 3분 질의응답

## 7. 평가 체계 권장안

### 전체 성적 비중

| 항목 | 비중 | 평가 대상 |
|---|---:|---|
| 주차별 프로젝트 미션 | 20% | 1~7주·9~14주 산출물의 지속성, 피드백 반영 |
| 중간 프로젝트 정의 심사 | 30% | Roadmap, 2-Pager, PRD, 평가 계획, feasibility spike |
| 기말 MVP 검증·발표 | 40% | 실행 가능한 소프트웨어, 품질 증거, 아키텍처 문서, 재현성, 발표 |
| 출석·실습 참여·동료 리뷰 | 10% | 실습 참여, 리뷰의 구체성, 개선 기여 |

### 중간 프로젝트 정의 심사 루브릭

| 기준 | 배점 |
|---|---:|
| 문제·사용자·제품 가치의 명확성 | 20 |
| Roadmap과 2-Pager의 의사결정 품질 | 15 |
| PRD 요구사항·범위·수용 기준의 완성도와 일관성 | 35 |
| 성공 지표·golden set·평가 계획의 검증 가능성 | 20 |
| 기술 검증 spike와 주요 위험·대응 계획 | 10 |

중간평가에서는 동작하는 기능의 개수나 UI 완성도를 평가하지 않는다. 기술 spike는 “선택한 방향이 불가능하지 않음”을 보이는 최소 증거로만 사용한다.

### 기말 MVP 검증·발표 루브릭

| 기준 | 배점 |
|---|---:|
| 핵심 사용자 시나리오의 end-to-end 동작 | 30 |
| baseline 대비 품질·task success·신뢰성 평가 증거 | 20 |
| HLD·LLD·ADR의 정확성과 구현 일치성 | 15 |
| 안전성·관측성·비용·실패 대응 | 10 |
| 저장소 구조, README, 실행·테스트 재현성 | 10 |
| 제품 가치 설명, 데모, 한계와 다음 Roadmap | 15 |

프로젝트 분야에 따라 핵심 성능 지표는 달라질 수 있다. ML/CV는 F1, AUROC, RMSE, mAP 등 과업 지표를, LLM/RAG는 correctness·groundedness·retrieval quality를, Agent는 task success·tool accuracy·step/latency/cost·safety를 중심으로 선택한다. 단, 모든 프로젝트는 최소 한 개의 baseline과 개선 후 결과를 비교해야 한다.

## 8. 기말 프로젝트 최소 완료 기준(Definition of Done)

1. 핵심 사용자 시나리오 한 개가 로컬에서 end-to-end로 동작한다.
2. 설치부터 실행까지 README의 명령으로 재현할 수 있다.
3. 최소 10개의 평가 task 또는 과업에 적합한 검증 데이터가 있다.
4. baseline과 개선 버전의 비교 결과가 있다.
5. 실패 사례 한 건 이상을 trace/log로 분석하고 회귀 테스트로 남겼다.
6. HLD, 핵심 흐름 LLD, 주요 의사결정 ADR 2건 이상이 구현과 일치한다.
7. API Key, 개인정보, 저작권 문제가 있는 데이터가 저장소나 발표물에 노출되지 않는다.
8. 알려진 한계와 다음 Roadmap이 명시되어 있다.

웹 배포, 상용 API 사용, 화려한 UI, 대형 모델 파인튜닝은 가산 요소가 될 수 있으나 필수 기준이 아니며, 금전 지출 규모가 평가에 영향을 주지 않는다.

## 9. 최신 주제 반영 근거

- Agent 개발에서 prompt만이 아니라 instruction·retrieval·memory·tool·state 전체를 관리하는 **context engineering**을 반영한다: [Anthropic — Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- Agent 평가는 최종 응답뿐 아니라 task, grader, trace/trajectory, outcome을 함께 본다: [Anthropic — Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- MCP는 tool/resource/prompt 연결, authorization, human-in-the-loop를 포함하는 최신 상호운용 주제로 다룬다: [Model Context Protocol specification](https://modelcontextprotocol.io/specification)
- Agent 간 위임과 상호운용은 A2A의 Agent Card, task, message, artifact 개념으로 소개한다: [A2A Protocol specification](https://github.com/a2aproject/A2A/blob/main/docs/specification.md)
- AgentOps는 agent/model/tool 호출의 trace, latency, token과 민감 데이터 취급을 포함한다: [OpenTelemetry — GenAI observability](https://opentelemetry.io/blog/2026/genai-observability/)
- 로컬 파인튜닝은 PEFT/TRL과 Apple Silicon용 MLX-LM 경로를 사용한다: [Hugging Face TRL](https://huggingface.co/docs/trl/index), [MLX-LM](https://github.com/ml-explore/mlx-lm)
- 보안은 prompt injection과 excessive agency를 중심으로 최소 권한·승인·검증을 다룬다: [OWASP — Agentic AI threats and mitigations](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/), [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework)

## 10. Google Sheet 이관 메모

공유 양식의 `커리큘럼` 탭은 A~F열 기준으로 `구분 / 시간 / 교육주제 / 주요내용(실습 및 과제 포함) / 형태` 구조이며, 각 주차가 `VOD 1행 + 오프라인 실습 1행`으로 구성되어 있다. 다음 단계에서는 다음과 같이 압축하여 입력한다.

- VOD 행 교육주제: 해당 주차 제목
- VOD 행 주요내용: `1차시`와 `2차시` 핵심 내용(차시별 시간 표기 생략)
- 오프라인 실습 행 교육주제: 필수 코드 실습 + 프로젝트 스튜디오
- 오프라인 실습 행 주요내용: 필수 코드, 자유 프로젝트 미션, 주차 산출물
- 8·15주차 두 행: VOD/실습 없음과 프로젝트 평가 방식·제출물을 명시

공유 시트의 `평가-차후` 탭은 현재 비어 있으므로, 다음 단계에서 평가 비중과 중간·기말 루브릭을 별도 표로 구성할 수 있다.
