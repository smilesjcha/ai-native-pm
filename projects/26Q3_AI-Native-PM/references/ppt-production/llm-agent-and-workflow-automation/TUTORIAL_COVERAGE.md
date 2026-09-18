# Day 1 Tutorial 화면·실행 커버리지

대상 deck: `slides/IPA_LLM_Agent_업무자동화_Day1_2026-08-23_PARTS_270p.pptx`

- 총 장표: 270장
- 구분: `1일차 1차시~8차시`
- 보안: API key, PAT, 실제 회사 데이터, 개인 식별 정보 없음
- 운영: 09:00-11:30 수업, 11:30-12:00 휴식, 12:00-13:40 수업, 13:40-14:00 휴식, 14:00-15:00 점심, 15:00-17:00 수업, 17:00-17:30 휴식, 17:30-18:00 Q&A
- 원칙: 공식 홈페이지는 개념 근거이고, 소프트웨어 실습 완료 증거는 실행 코드·test·결과 파일이다.

## 차시별 화면과 실행 증거

| 차시 | 장표 | 핵심 화면 | 직접 실행할 기능 | 완료 증거 |
|---|---:|---|---|---|
| 1일차 1차시 | 1-29 | 회의 음성·transcript·meeting result | 강사 STT Demo, 개인 Ideation | 입력·결과·금지 행동 |
| 1일차 2차시 | 30-64 | Tool schema·정상·차단 JSON | SafeToolExecutor·failure test | ToolResult·error code |
| 1일차 3차시 | 65-99 | 한국어 회의·expected JSON·Prompt | LCEL typed output·근거 확인 | evidence가 있는 JSON |
| 1일차 4차시 | 100-134 | Jupyter·Ollama 상태 JSON·좁은 test | 환경 진단·lane 선택·test | CLI·서버·모델 상태·4 passed |
| 1일차 5차시 | 135-168 | Ollama Tool Call·차단·fallback | planner·validator·executor·전체 test | 정상·POLICY_BLOCKED·25 passed |
| 1일차 6차시 | 169-202 | LCEL fixture/Ollama provider 비교 | 같은 notebook에서 provider 교체 | typed output·fallback_reason |
| 1일차 7차시 | 203-236 | LCEL·interrupt·reject·VS Code test | StateGraph·resume·세 결정 | approve/edit/reject JSON |
| 1일차 8차시 | 237-269 | STT flag·trace·release gate | workflow_service·평가 | trace.json·READY/HOLD |
| Q&A | 270 | 질문·실행 오류 복구·Exit Ticket | 미완료 checkpoint 복구 | 오늘의 핵심 세 문장 |

## 캡처와 장표 교체 규칙

1. 새 캡처는 `assets/screenshots/`에 저장하고 캡처 날짜·URL·개인정보 여부를 기록한다.
2. 실행 화면에는 파일, 명령, 성공 신호, 실패 시 대체 경로가 보여야 한다.
3. 로그인 화면은 비식별 계정을 사용하고 `.env`, API key, PAT는 노출하지 않는다.
4. UI가 바뀌어도 Python·JSON 계약이 수업의 기준이며, 웹 화면만으로 실습을 대체하지 않는다.
5. 교체 후 270장을 다시 렌더하고 overflow, 글꼴, 표, 코드, 캡처 crop을 확인한다.
