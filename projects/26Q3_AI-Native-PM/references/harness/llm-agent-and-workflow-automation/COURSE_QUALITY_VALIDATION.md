# 강의 준비 Quality Validation

## 2026-09-12 · 4주차 PR 리뷰와 문서 자동화 개편

이번 항목은 아래의 기존 Day4 초안 편성과 고정 240장 기준보다 우선한다.

- 4주차는 PR 자동 리뷰 1~3차시, Excel WBS 4차시, 채점·Google Sheets 5차시, Word 경력 문서 6차시, PPT 생성 7차시, 결과 통합·5주차 프로젝트 안내 8차시로 편성한다. 원안의 GitHub 6H를 그대로 수행했다고 표현하지 않는다. 고급 API·원격 게시 운영은 선택 확장 및 5주차 보강으로 구분한다.
- 09:00~11:30 수업(11:30~12:00 휴식), 12:00~13:00 점심, 13:00~14:40 수업(14:40~15:00 휴식), 15:00~17:30 수업(17:30~18:00 휴식·Q&A). 실제 학습 400분, 휴식·Q&A 80분이다.
- 실습은 입력·함수·수식·문서 구조 중 하나를 직접 바꾸고 저장한 뒤 변경 결과를 검사하는 활동이다. 웹사이트 열람은 참고 또는 강사 시연으로만 표시한다.
- WBS는 날짜·기간·진척도 변경으로 Gantt 조건부서식과 지연 판단이 바뀌어야 한다. 정적 색칠을 조건부서식이라고 부르지 않는다. 기준일과 프로젝트 일정은 수업용 가정을 표시한다.
- 시험 예제는 합성 식별자·답안만 사용한다. 원본의 실명·성적·파일 링크·캡처를 공개 저장소나 장표에 넣지 않는다. 빈 답안, 결시, 0점, 잘못된 입력, 정답 미등록을 구분한다. 정답률 분모와 동점 순위를 설명하고 정답 변경 후 재계산을 검증한다.
- 원본 참조는 Google Sheets에서 열리는 Excel 문서임을 확인했다. 네이티브 Sheets API로 읽거나 수정할 수 있다고 주장하지 않는다. 원본은 그대로 두고 별도 합성 예제를 사용한다. 원본 수식·조건부서식 내부를 확인하지 못한 경우 그 범위를 강사 문서에 기록한다.
- Word는 사용자 제공 경력을 근거로 예시를 구성한다. 새 성과 수치·직함·재직 기간·연락처를 만들지 않는다. 수정 전후에 사실 보존, 숫자·단위, 문단 스타일, 페이지 구성을 검사한다.
- PPT는 데이터·내용·템플릿을 분리하고 편집 가능한 표와 텍스트를 유지한다. 제목은 구체적인 명사형, 본문은 짧은 설명, 제목과 부제의 동일 내용 반복을 줄인다. 최소 글자 크기를 줄여 페이지 수를 맞추지 않는다.
- 수강생 배포 코드에는 공개 설치 가능한 의존성과 완성 template를 제공한다. 교안 제작 전용 내부 runtime만으로 실행 가능한 예제를 학생의 기본 경로로 제시하지 않는다.
- 실제 캡처, 파일 렌더, 작성한 대화 예시를 구분한다. ChatGPT·Claude에서 실제 실행하지 않은 대화를 실제 사용 화면으로 꾸미지 않는다. 실제 자료 화면은 합성 산출물을 대상으로 촬영한다.
- 5주차 마지막 3시간은 제작·테스트·개선·정리 150분과 마지막 휴식·Q&A 30분이다. 개인 발표는 선택이다. 4주차에 WBS·채점·경력 문서·PPT·PR 중 하나를 선택하고 입력/기능/검증을 미리 정한다.
- 차시별 페이지 배정, 이론·시연·코드 실습·확인 시간, 파일과 명령, 강사 발화, 빠른/느린 진행 대안을 MD로 관리한다. PPT·PDF·실행 Notebook·최종 산출물의 버전을 맞춘다.

## 2026-09-06 · 3·5·6·7차시 심화 보강

- 최종 교안은 200장 이상으로 구성하되 동일 역할의 설명은 합친다. 장표 수를 수업 시간의 근거로 사용하지 않는다.
- 차시별 50분 중 직접 코드 실습은 3·6·7차시 25분, 5차시 30분을 확보한다. 선택 참고 장표는 노트에서 0분으로 구분하며 기본 시간에 더하지 않는다.
- Context 비교는 최종 payload의 실제 필드 차이를 검증한다. 자동으로 정책을 넣는 `review_exercise`를 코드-only 실험에 재사용하지 않는다.
- 5차시 단계는 쿠폰 상한+영수증 → 배송비 → 입력 검사. 동일 9개 Test의 실패 7→5→4→0. 쿠폰 계산 한 줄만 고치면 7→6이므로 두 위치를 명시한다.
- Notebook 기본 Run All의 자동 단계 재생과 `APPLY_LEARNER_FIX=False` 직접 수정 실습을 구분한다. 재생 완료만으로 학생 구현 완료라고 하지 않는다.
- 6차시는 학생이 State·Node·Edge·조건 분기·compile 코드를 직접 실행한다. 기존 완성 Graph import만으로 구현 실습을 대체하지 않는다.
- 코드 장표의 변수·Node명·경로는 Notebook과 일치시킨다. 축약 예제는 전체 구현을 덮어쓰지 않는 이름을 쓰고, 저장 파일·실행 위치·명령을 함께 설명한다.
- 사람 판정으로 4개 알려진 결함에 지적을 매핑한다. 중복 지적으로 Recall을 올리지 않고 미판정·추가 유효 후보를 자동 FP 처리하지 않는다.
- 공식 사례는 원문 확인 범위와 한계를 함께 기록한다. 벤더 사례를 독립 성능 검증으로 표현하지 않으며 성과 수치를 임의로 옮기지 않는다.
- 출처의 그림도 재배포 권한이 확인되지 않으면 삽입하지 않는다. 독자적인 편집 가능 도식·표와 원문 링크를 사용한다.
- 최종 PPT와 PDF의 페이지 수, 전체 렌더, 표·코드 가독성, 학생 ZIP 실행을 확인한다. 자동 레이아웃 검사와 눈으로 보는 검수는 별개다.

## 2026-09-06 · 3주차 개편 우선 기준

아래 기준은 이 문서의 기존 Day3~5 초안 표보다 우선한다. 최신 차시별 원본은 `materials/day3/day3_redesign_curriculum.json`이다.

- 3주차는 코드 리뷰 Agent 8H. 4주차는 GitHub 자동 리뷰 6H+회의·리뷰 문서 연동 2H. 5주차는 문서 통합 2H+운영·프로젝트 6H.
- 실습은 코드 구현→실제 프로세스 실행→실패 재현→수정→같은 Test 재실행→서비스 화면 확인. JSON 저장이나 웹 열람만으로 완료하지 않는다.
- 주 모델 경로는 로그인한 로컬 Codex CLI. 로컬 클라이언트와 클라우드 추론을 구분한다. Ollama는 3주차 주 경로가 아니다.
- 대화형 Codex의 코드 탐색·수정·도구 사용과, 제공된 Context만 읽는 제한된 리뷰 Adapter를 구분한다.
- 원본 시간은 6+6+8+6+8+6=40H를 보존한다. 1·2주차의 재배치는 주제 배정 계획이며 이미 진행한 수업의 실측 기록으로 주장하지 않는다.
- 교육용 쿠폰 초과 사례: 상품 잔액 0원, 배송비 포함 결제 3,000원. 숫자와 단위를 혼동하지 않는다.
- 강의 400분, 휴식·Q&A 80분, 점심60분. 5주차 프로젝트 3시간은 제작150분+마지막 휴식·Q&A30분.
- 제목은 명사형. 본문22.5pt, 표19.5pt, 코드18pt를 기본값으로 삼고 글자를 줄여 Overflow를 숨기지 않는다.
- 실제 캡처는 입력·실행 출처·결과를 포함한다. Fixture를 live 결과로 표현하지 않는다.
- 강사용 검증 기준은 학생 슬라이드에 노출하지 않는다. 발표·짝 활동·결과 공개는 필수가 아니다.
- 최종 PPT/PDF의 모든 페이지를 렌더링해 확인하고, 정확한 Test 명령과 결과를 릴리스 기록에 남긴다.

## 1. 문서 목적

이 문서는 Day 2~5의 PPT·Notebook·Python·Demo 영상·Codex/Claude Code 진행 사례가 실제 8시간 교육으로 성립하는지 검증하는 제작자용 기준이다. 수강생에게 보여줄 강의 내용이 아니며, PPT 화면에 `Quality Gate`, `장표 수`, `중복률`, `제작 기준` 같은 내부 메타 표현을 노출하지 않는다.

검증의 핵심은 장표 수가 아니라 다음 질문이다.

> 앞 차시 결과를 입력으로 받아, 새 개념 하나를 이해하고, 실제 코드를 바꾸고, 정상·실패를 실행한 뒤, 다음 차시가 사용할 증거를 남기는가?

## 2. 8시간 강의 성립 조건

### 2.1 하루의 시간 구조

| 시간 | 구간 | 학습 기능 |
|---|---|---|
| 09:00~11:30 | 1~3차시 | 입력·문제·품질 경계 구현 |
| 11:30~13:00 | 쉬는 시간·점심시간 | 1~3차시 이후 휴식과 점심을 연속 운영 |
| 13:00~14:40 | 4~5차시 | Schema·State·Contract 확장 |
| 14:40~15:00 | 쉬는 시간 | 2개 차시 연강 뒤 20분 |
| 15:00~17:30 | 6~8차시 | Provider·Workflow·평가·운영 통합 |
| 17:30~18:00 | 쉬는 시간·Q&A | 질문·미완료 실행 복구 포함 |

### 2.2 한 차시 50분의 역할

| 구간 | 시간 | 권장 장표 | 장표의 역할 |
|---|---:|---:|---|
| 개념 강의 | 12분 | 7~8장 | 문제·용어·판단 기준·반례 |
| 강사 시연 | 10분 | 5~6장 | 실제 입력·코드·명령·정상·실패 화면 |
| 소프트웨어 제작 | 23분 | 12~14장 | Notebook·Codex·Claude Code 단계 안내와 실행 대기 화면 |
| 실행 확인 | 5분 | 2~4장 | test·diff·artifact·다음 입력 확인 |

30장은 모두 1~2분씩 설명하는 강의 장표가 아니다. 코드 셀·명령·diff·결과 화면은 수강생이 실행하는 동안 계속 띄워 두는 Tutorial 장표다. 개념 설명용 7~8장과 실행용 22~23장이 서로 다른 기능을 가질 때만 30장 구성이 성립한다.

### 2.3 8시간을 채우는 방식

- 같은 정의를 길게 반복하지 않는다.
- 정상 경로만 여러 번 보여주지 않는다.
- 실제 코드 작성, 설치·Kernel 복구, test 실패 분석, diff 검토, 사람 판단에 시간을 사용한다.
- 빠른 수강생에게는 새 장표가 아니라 boundary test·Codex 개선 요청·Claude Code 대안 리뷰를 제공한다.
- 느린 수강생은 fixture·executed Notebook·dry-run으로 같은 결과 계약을 따라간다.
- 강사는 결과가 빨리 나오면 실제 현업 반례와 운영 판단을 확장하고, 설치 문제로 시간을 소비하지 않는다.

## 3. 하루의 두괄식 Narrative

각 날짜의 첫 5분은 그날 마지막에 완성할 결과를 45~75초 영상으로 보여준다. 영상 뒤에는 결과 화면의 세 가지 상태만 짚고, 구현 원리는 설명하지 않는다.

```text
완성 결과 영상
→ 오늘의 사용자 문제
→ 여덟 차시 제작 경로
→ 차시별 입력·구현·실패·증거
→ 마지막 통합 실행
→ READY/HOLD와 다음 개선 결정
```

오프닝 영상은 예고다. STT·LangGraph·LangSmith·Idempotency의 정의를 미리 완결하지 않는다. 각 개념은 소유 차시에서 처음 상세히 설명한다.

## 4. Day 2~5 메시지 소유권

### Day 2 · Meeting Intelligence Service

| 차시 | 소유 질문 | 새로 만드는 것 | 다음 차시 입력 |
|---|---|---|---|
| 1차시 | 이 요청은 LLM·Workflow·Agent 중 무엇인가 | Request Router·외부 저장·발송 차단 | `01_architecture.json` |
| 2차시 | Meet TXT·ClovaNote TXT·Audio를 어떻게 합칠까 | 세 Input Adapter·`TranscriptEnvelope` | `02_inputs.json` |
| 3차시 | 어떤 업무 맥락을 어디까지 읽을까 | Domain Context·Read-only MCP Plan | `03_domain_context.json` |
| 4차시 | 요약·관점·할 일의 공통 결과 형식은 무엇인가 | `MeetingRecord` Schema·Evidence Validator | `04_meeting_record_contract.json` |
| 5차시 | Coding Agent에 어떤 작업 계약을 줄까 | Goal·Allowed·Test·Do not·Diff Review | `05_workflow_runs.json` |
| 6차시 | Provider가 바뀌어도 결과를 어떻게 유지할까 | Fixture·Ollama·OpenAI Adapter·Cost Guardrail | `06_provider_diagnostics.json` |
| 7차시 | 사람의 결정 전후를 실제로 어떻게 중단·재개할까 | LangGraph Interrupt·Checkpoint·Approve/Edit/Reject | `07_human_review.json` |
| 8차시 | 비개발자가 같은 기능을 어떻게 실행할까 | Local GUI·Docker·Draft Export | `08_export_drafts.json` |

### Day 3 · Review Intelligence Service

| 차시 | 소유 질문 | 새로 만드는 것 | 다음 차시 입력 |
|---|---|---|---|
| 1차시 | 좋은 finding은 무엇인가 | severity·review rubric | review policy |
| 2차시 | 변경된 줄을 정확히 어떻게 찾는가 | Unified Diff parser | added lines |
| 3차시 | 모델에 어떤 context만 줄 것인가 | context pack | bounded context |
| 4차시 | 리뷰 결과가 어떤 계약을 지켜야 하는가 | `ReviewFinding` schema | validated report |
| 5차시 | LLM 전 비교 기준은 무엇인가 | deterministic baseline | baseline findings |
| 6차시 | 규칙·test·LLM을 어떻게 결합하는가 | hybrid reviewer | candidate findings |
| 7차시 | 더 좋아졌다는 것을 어떻게 증명하는가 | precision·recall·F1 | evaluation result |
| 8차시 | 실패를 어떻게 회귀 test로 남기는가 | Codex Harness·regression gate | Day 3 report |

### Day 4 · PR Review Automation

| 차시 | 소유 질문 | 새로 만드는 것 | 다음 차시 입력 |
|---|---|---|---|
| 1차시 | 어느 PR을 검토하는가 | target fixture·head SHA | fixed target |
| 2차시 | 어떤 권한만 허용할 것인가 | secret·permission boundary | read-only session |
| 3차시 | API 실패마다 무엇이 달라지는가 | status contract·recovery | normalized read result |
| 4차시 | 어떤 상태와 분기가 필요한가 | LangGraph nodes·edges | compiled graph |
| 5차시 | 재시작이 왜 중복 게시가 되지 않는가 | checkpoint·idempotency | reusable request key |
| 6차시 | 사람은 무엇을 보고 결정해야 하는가 | interrupt payload | approve·edit·reject event |
| 7차시 | 실제 게시 전에 무엇을 검토할까 | API-equivalent dry-run | comment plan |
| 8차시 | 외부 쓰기를 어디까지 허용할까 | sandbox publish·audit | Day 4 audit record |

### Day 5 · Agent Operations Console

| 차시 | 소유 질문 | 새로 만드는 것 | 다음 차시 입력 |
|---|---|---|---|
| 1차시 | 어떤 service를 실행할 것인가 | explicit router | unified result |
| 2차시 | 어느 node에서 무엇이 일어났는가 | local/LangSmith trace | trace spans |
| 3차시 | 운영자는 어떤 신호를 봐야 하는가 | monitoring metadata | monitoring view |
| 4차시 | 새 버전을 내보내도 되는가 | dataset experiment | release gate |
| 5차시 | 사람 수정에서 무엇을 배울 것인가 | feedback schema | annotation candidates |
| 6차시 | 데이터와 장애를 어떻게 통제할까 | PII·retention·incident policy | ops checklist |
| 7차시 | 코드·문서·Demo가 같은 버전인가 | release candidate·local web build | reproducible demo |
| 8차시 | 제품 가치를 어떤 증거로 말할까 | 정상/HOLD Demo·scorecard | final portfolio package |

## 5. 장표 중복 Validation

### 5.1 자동 Gate

| 항목 | 통과 기준 |
|---|---|
| Exact headline | 허용된 시간표·footer 외 중복 0건 |
| Near headline | 유사도 0.80 이상 문구를 전수 검토하고 역할 중복 0건 |
| Repeated narrative line | 파일·명령·시간표·acceptance contract를 제외한 본문 문장 반복 0건 |
| Summary slide | 하루 전체 요약은 마지막 차시만 허용 |
| Ownership | 소유 차시 밖 상세 구현 설명 0건 |
| Generic title | `문제와 필요성`, `차시 목표`, `완료 기준` 같은 범용 제목의 반복 0건 |
| Production meta | `KEY POINT`, `장표 리듬`, `Quality Validation` 등 내부 표현 0건 |

### 5.2 사람이 제목만 읽는 Gate

1. 1쪽부터 마지막 장까지 제목만 읽어도 질문이 앞으로 전진하는가?
2. 앞 장의 결론을 표현만 바꿔 다시 말하지 않는가?
3. 개념→근거→코드→실패→복구→실행→test 순서가 보이는가?
4. 같은 표·목록·카드 구조가 세 장 이상 이어지지 않는가?
5. 차시 마지막은 요약이 아니라 다음 차시가 사용할 artifact를 확인하는가?
6. 마지막 차시에서만 하루 전체의 결과와 판단을 회수하는가?

Expected Output·Boundary Test는 `결과 형식 → Codex Task → 실행 → Test`의 네 위치에서 같은 Interface로 추적할 수 있다. 이는 요약 반복이 아니라 동일 계약의 추적성이다. 네 위치를 넘거나 설명 문장까지 같으면 중복으로 판단한다.

### 5.3 학생 언어·가독성 Gate

| 항목 | 통과 기준 |
|---|---|
| 제목 | 2~8단어 명사형, 차시명·파일명·본문 결론의 기계적 반복 없음 |
| 용어 | `정상·경계·외부 쓰기·기록·책임` 단독 Label 0건 |
| 일반 제목 | 실제 PowerPoint 34pt 이상 |
| 본문 | 실제 PowerPoint 18pt 이상 |
| 표 Cell | 실제 PowerPoint 17pt 이상, 의미 단위 개행 |
| Code | 실제 PowerPoint 15pt 이상, 실행 명령 생략 없음 |
| Screenshot | 클릭 위치·입력·결과 중 최소 하나를 투사 화면에서 판독 가능 |
| Auto fit | `shrinkText`로 Overflow를 숨긴 장표 0건 |

`Role`, `Expected Output`, `Boundary Test`, `External Action`, `Execution Log`, `Audit Log`, `Human Review`, `Result Schema`는 영어가 더 정확한 경우 사용한다. 첫 등장에서는 한글 설명을 함께 둔다.

### 5.4 PPT 단독 재실행 Gate

각 차시에서 다음 정보를 학생용 화면만으로 찾을 수 있어야 한다.

| 역할 | 필수 내용 |
|---|---|
| 준비 | Program·선택 Lane·정확한 File Path |
| 입력 | 비식별 Sample·입력 형식·출처 |
| 실행 | 완전한 Terminal 명령 또는 Notebook Section |
| Codex | Goal·Allowed·Test·Do not이 포함된 Copy-ready Task |
| 결과 | Result File·확인 Field·Expected Output |
| 오류 | 대표 Error Code·복구 순서·계속 진행 조건 |
| 안전 | Secret 비노출·External Action 기본 차단·Human Review 위치 |

강사 Notes를 읽어야만 실행할 수 있거나, Website 열람만으로 소프트웨어 실습이 끝나면 실패다. 수강생은 발표·짝 활동 없이 개인 PC에서 같은 결과를 재현할 수 있어야 한다.

### 5.3 장표 수를 유지할 때의 대체 원칙

중복 장표를 삭제한 자리는 다른 말의 요약으로 채우지 않는다. 다음 중 하나로 전환한다.

- 실제 코드의 한 함수
- 실제 Notebook 셀과 실행 결과
- 정상·경계 test 비교
- 의도적 실패와 복구 로그
- Codex/Claude Code 작업 요청과 실제 diff
- 재직자 운영 반례
- 구직자 README·commit·portfolio 증거
- 새로운 상황을 판단하는 Application Gate

## 6. 오프닝 Demo 영상 Validation

| 기준 | 요구 사항 |
|---|---|
| 길이 | 45~75초 |
| 화면 | 16:9, 최소 1280×720 |
| 구성 | 입력 10초 → 실행·상태 25~40초 → 결과·READY/HOLD 15~20초 |
| 데이터 | 합성·공개·비식별 자료만 사용 |
| 진실성 | 실제 현재 코드가 생성한 JSON·test·UI만 촬영 |
| 보안 | token·`.env`·개인 경로·회사 데이터 노출 없음 |
| 소리 | 무음이어도 이해 가능한 자막, 선택적으로 강사 음성 |
| 수업 연결 | 영상의 각 장면이 여덟 차시 중 하나와 매핑 |

Day 2 영상은 audio→transcript→evidence→READY, Day 3은 diff→three findings→evaluation, Day 4는 dry-run→approve/reject→idempotent publish, Day 5는 router→trace→experiment→release scorecard를 보여준다.

## 7. Notebook Validation

각 Day Notebook은 8개 차시를 같은 입력과 결과 계약으로 연결한다.

- 상단에 현재 Python·workspace·필수 library 확인 셀이 있다.
- 필요 library 설치 셀은 없는 패키지만 설치하거나 명확한 requirements 파일을 사용한다.
- 1~8차시 heading이 모두 존재한다.
- 각 차시에 최소 한 개의 실행 가능한 code cell이 있다.
- 정상 case와 가장 중요한 boundary case를 모두 실행한다.
- 결과는 `output/dayN-*` 아래 JSON·JSONL·MD로 저장한다.
- `RUN_*_LIVE=False`가 기본이며 fixture만으로 Run All이 성공한다.
- live provider를 선택하면 실제 provider와 fallback reason을 숨기지 않는다.
- `.env`와 token 값을 출력하지 않는다.
- 마지막 셀에서 focused test와 artifact 존재를 확인한다.
- `.executed.ipynb`는 현재 코드로 처음부터 끝까지 다시 실행한 결과다.

### 7.1 Day 2 공개 회의 음성

- 실제 회의 음성은 원본 URL·저작자·license·가공 구간·SHA256을 함께 기록한다.
- 상업적 이용 금지 또는 재배포 금지 자료는 저장소에 포함하지 않고 강사용 선택 링크로만 둔다.
- Notebook `Run All`이 네트워크 다운로드를 자동 실행하지 않는다. 강사가 사전에 내려받은 CC 허용 자료가 없으면 합성 fixture로 같은 계약을 실행한다.
- 공개 원본과 합성 fixture의 결과를 섞지 않는다. 결과 JSON에 `source_mode`, `source_id`, `fallback_reason`을 남긴다.
- 실명·정치·민감 주제가 있는 공개회의는 STT 성능 실험에만 사용하며, 인물·입장 평가를 수업 과제로 만들지 않는다.

### 7.2 Day 2 로컬 앱

- Docker 앱은 macOS·Windows에서 동일한 API와 결과 schema를 반환한다.
- 로그인 연동은 공식 `codex login` 또는 Claude Code 로그인 상태를 사용하는 localhost CLI bridge로 한정한다.
- ChatGPT·Claude 웹 쿠키, 브라우저 profile, credential 저장 파일을 읽거나 container에 mount하지 않는다.
- CLI가 없거나 로그인되지 않은 컴퓨터는 Ollama 또는 deterministic fixture로 완주한다.
- Windows launcher와 macOS package는 설치 파일 생성, SHA256, fixture smoke test를 각각 남긴다.
- code signing·notarization이 없는 교육용 package는 unsigned 상태와 OS 경고를 README에 명시한다.

### 7.3 Day 2 일반인 제품 시나리오

- 1차시에서 `LLM 한 번 호출`, `고정 Workflow`, `상황별 경로를 고르는 Agent`를 일반인 용어로 구분한다.
- Google Meet 전사, ClovaNote TXT, 녹음 파일은 서로 다른 입력 경로를 쓰되 하나의 `TranscriptEnvelope`로 합류한다.
- 이미 텍스트가 있으면 STT를 다시 실행하지 않는다. 녹음만 있을 때만 로컬 STT를 선택한다.
- 도메인 맥락과 기존 사내 자료는 사용자가 조회 범위·기간·출처를 먼저 정한 뒤 읽기 계획만 생성한다.
- MCP는 외부 서비스를 자동으로 많이 읽는 기능이 아니라, 필요한 정보만 출처와 함께 가져오는 정책 경계로 가르친다.
- MeetingRecord는 목적·이전 맥락·요약·참석자 관점·To Do·단중장기 통찰·미해결을 포함하되, 개인 성향·감정·의도를 진단하지 않는다.
- 담당자·기한·결정·통찰은 evidence ID를 요구하고, 확실하지 않으면 `null`·`CONFIRM_REQUIRED`로 남긴다.
- Notion·Confluence·사내 이메일은 본일 실습에서 직접 쓰지 않고, 사람 검토 후 실행할 `integration_plan`과 draft만 만든다.
- `READY_FOR_REVIEW`는 사람 승인이 아니다. approve·edit·reject 결과와 `external_write=false`를 각각 검증한다.

### 7.4 Day 2 Codex·Claude 대화 증거

- 대화 예시는 `상황 → 한 번에 한 책임 → 정상·경계 test → diff 리뷰 → 사람 merge`를 보여준다.
- 상위 모델을 쓰더라도 모델 가용성·비용·호출 횟수를 명시하고, 모델명을 성공 증거로 쓰지 않는다.
- OpenAI API는 사용자가 opt-in했을 때만 env의 key를 읽고, Notebook·PPT·로그·Git에 key를 표시하지 않는다.
- `gpt-5.6-luna`·`5.6 Sol ultra`는 요청 모델로 기록하되 실제 계정의 가용성을 진단하고, 미지원은 `MODEL_NOT_AVAILABLE`로 분리한다.
- Codex·Claude Code는 공식 CLI 로그인으로만 연결하고 웹 쿠키·credential 파일을 앱이 읽지 않는다.

## 8. Codex·Claude Code Harness

### 8.1 공통 작업 계약

```text
목표
현재 동작과 사용자 영향
변경 허용 경로
변경 금지 경로
정상 완료 조건
가장 중요한 실패 조건
실행할 focused test
diff에서 사람이 확인할 항목
```

두 도구에 같은 모호한 “잘 만들어줘” 요청을 주지 않는다. 같은 계약을 주고, 결과의 범위·test·diff·복구 품질을 사람이 비교한다.

### 8.2 ChatGPT Desktop·Codex 진행

1. repository root와 `AGENTS.md`를 읽게 한다.
2. 관련 파일·test·data만 먼저 찾게 한다.
3. 한 책임만 가진 작업 명세를 전달한다.
4. 최소 patch와 focused test를 요청한다.
5. test 실행 결과와 변경 diff를 함께 검토한다.
6. 정상만 통과하면 boundary test를 추가한다.
7. 사람이 승인한 작은 commit으로 남긴다.

OpenAI 공식 자료가 설명하는 Codex의 코드베이스 이해, 기능 구현, test, diff review, 배포 준비 흐름을 수업의 공통 Harness로 사용한다.

### 8.3 Claude Desktop·Claude Code 진행

1. Code tab에서 Local·project folder·permission mode를 명시한다.
2. 별도 session 또는 Git-isolated worktree에서 같은 작업 계약을 사용한다.
3. integrated terminal에서 focused test를 실행한다.
4. visual diff review로 의도하지 않은 파일 변경을 확인한다.
5. Browser preview가 있는 Day 5는 local Demo를 직접 확인한다.
6. Codex와 같은 working tree를 동시에 수정하게 하지 않는다.
7. 두 결과 중 하나를 자동 채택하지 않고 사람이 작은 patch를 선택한다.

Claude Code Desktop의 parallel session, Git isolation, integrated terminal, visual diff, app preview는 구현 대안과 리뷰 실습에 사용한다. 유료 구독이 필요한 경로는 필수 실습으로 두지 않고 강사 시연·선택 확장으로 둔다.

### 8.4 역할 분리 예시

| 단계 | Codex | Claude Code | 사람 |
|---|---|---|---|
| 탐색 | 관련 코드·test·규칙 찾기 | 별도 session에서 누락 경계 찾기 | 입력·목표 확정 |
| 구현 | 최소 patch와 test | 대안 patch 또는 reviewer 역할 | scope·trade-off 판단 |
| 검증 | focused/full test·diff 요약 | visual diff·app preview | 실제 결과·보안 확인 |
| 반영 | commit 초안 | PR 설명 초안 | commit·merge·배포 승인 |

## 9. 실제 소프트웨어 결과 Validation

각 날짜가 끝날 때 최소 다음 결과가 있어야 한다.

| 일자 | 코드 결과 | 실행 결과 | 사람 판단 |
|---|---|---|---|
| Day 2 | STT adapter·chunk·schema·evidence validator | transcript·MeetingBrief·quality report | READY/HOLD |
| Day 3 | diff parser·reviewer·evaluation | findings·precision·recall·F1 | READY_FOR_HUMAN_REVIEW |
| Day 4 | PR target·graph·dry-run·idempotency | comment plan·approve/reject·audit | PUBLISH/BLOCK |
| Day 5 | router·trace·experiment·web Demo | scorecard·local build·release report | RELEASE/HOLD |

## 10. Release Gate

다음 항목이 모두 통과해야 강의안을 배포한다.

1. PPT 240장·speaker notes 240개
2. PPT overflow 0건
3. PDF 240쪽·깨진 한글 glyph 0건, 본문 고딕체 embed 확인
   - 번들 LibreOffice에서 `NanumGothic`이 다른 언어 글꼴로 대체되는지 샘플 페이지를 먼저 렌더링한다.
   - 현재 강사 Mac에서는 `AppleGothic` embed와 전 페이지 contact sheet를 확인한 뒤 배포한다.
4. Exact headline duplicate 0건
5. Repeated narrative line 0건
6. Notebook 8개 차시 heading·Run All 성공
7. focused test와 전체 test 통과
8. Demo 영상 4개가 현재 결과 JSON과 일치
9. 실제 외부 쓰기 기본값 false
10. 사람 검수 기록과 commit 분리

## 참고 출처

### 2026-09-13 · 4주차 200장 개정 기준

이 개정은 위의 과거 240장 공통 기준보다 4주차에 우선한다.

- PPT·PDF 각각 200페이지, 발표자 노트 200개. 8차시 각 50분, 기본 학습 총 400분.
- 27개 선택 참고 페이지는 기본 시간과 분리. 36개 프로젝트는 선택 예시이며 의무 과제·완성 서비스 목록 아님.
- 추가 장표는 파일 위치 → 입력 수정 → 실행 → 정상·오류 확인 → 복구 중 빠진 단계를 보충. 같은 요약·제목 반복 금지.
- 준비된 코드·응용·새 구현을 구분. 계획 대화를 실제 서비스 실행 증거로 제시하지 않음.
- 코드 조각은 선행 Notebook 변수·커널·실행 위치 표시. 기존 결과 덮어쓰기 대신 새 버전 파일명 안내.
- 정상 수치뿐 아니라 보고 문장도 입력 변경에 따라 갱신. W04 완료 후 마지막 장에 W04 지연을 남기지 않음.
- 제목 명사형, 본문 자연스러운 한국어. 4단계 작업도 글씨 축소 없이 배치하고 전 페이지 실제 렌더 확인.
- 이론·시연·코드·파일 작업·Ideation 구분. Google 계정 확장은 로컬 필수 실행과 구분하며 원격 미검증 명시.
- NanumGothic·Menlo 기반 한글 PDF 렌더 및 폰트 포함 확인. PDF는 같은 PPT의 직접 변환본.
- 날짜·반영 commit·테스트·미검증 범위를 최신 검증 문서로 남기고 과거 검증 기록은 당시 버전의 기록으로 보존.

- OpenAI Codex use cases: https://learn.chatgpt.com/use-cases
- OpenAI Codex documentation: https://developers.openai.com/codex/
- Claude Code Desktop: https://code.claude.com/docs/en/desktop
- Claude Code Desktop quickstart: https://code.claude.com/docs/en/desktop-quickstart
