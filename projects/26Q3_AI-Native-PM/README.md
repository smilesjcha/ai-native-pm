# 생성형 AI를 활용한 기획자 업무생산성 향상

> 2026 핀테크 인력양성사업 · 기획자 과정 모듈5 — 한국핀테크지원센터 · KMAC
> **2026-09-19(토) 09:30–16:30 · KMAC 비즈니스 스쿨 M1 교육장** · 강사 차성재
> 모든 사례·데이터는 교육용 가상 자료(머니핏 MoneyFit / 핀트리 FinTree)이며, 강사 소속 회사의 공식 입장이 아닌 개인 견해입니다.

## 수강생 바로가기

| 무엇 | 어디 |
|------|------|
| **강의안 PDF (배포용, 255장)** | [`assets/pptx/kmac-m5-ai-pm-productivity-20260919-dist.pdf`](assets/pptx/kmac-m5-ai-pm-productivity-20260919-dist.pdf) |
| **실습 키트 안내** | [`workshop/README.md`](workshop/README.md) |
| 붙여넣기용 프롬프트(.txt 16개) | [`workshop/prompts-txt/`](workshop/prompts-txt/) |
| 프롬프트 카드 덱(전체 프롬프트 모음) | [`workshop/prompt-card-deck.md`](workshop/prompt-card-deck.md) |
| 금융 도메인 프롬프트 템플릿 | [`workshop/prompt-templates-fintech.md`](workshop/prompt-templates-fintech.md) |
| 교육용 가상 데이터(CSV·회의 메모) | [`workshop/sample-data/`](workshop/sample-data/) |
| **미니 프로젝트 제출 안내** | [`workshop/mini-project-submission.md`](workshop/mini-project-submission.md) |
| 나의 자동화 워크플로 1장(인쇄 시트) | [`workshop/lab-3-workflow-sheet.md`](workshop/lab-3-workflow-sheet.md) |
| 화면 예시·시안·데모 영상 모음 | [`assets/GALLERY.md`](assets/GALLERY.md) |

## 시간표

| 시각 | 구분 | 내용 | 산출물(= 미니 프로젝트 제출물) |
|------|------|------|-------------------------------|
| 09:30–11:10 | **Session 1** | 생성형 AI 도구 지도 · 프롬프트 설계(요청 6요소) · 환각 방지와 팩트체크 | ① 프롬프트 템플릿 카드 + 오류 초안 검수 결과 |
| 11:10–11:30 | 쉬는시간 | | |
| 11:30–12:30 | 점심 | | |
| 12:30–14:10 | **Session 2** | AI 리서치 · 경쟁 서비스 벤치마킹 · 기획서(PRD) 작성 · 3관점 AI 리뷰 · 2-Pager | ② PRD 초안 + 리뷰 결과 + 2-Pager |
| 14:10–14:30 | 쉬는시간 | | |
| 14:30–16:10 | **Session 3** | 데이터 분석·시각화 · 회의록·이메일 · 프레젠테이션 · AI Builder(시안·프로토타입·데모 영상) · 하네스 문서 구조 | ③ 분석·회의록·아웃라인 중 1개 + ④ 나의 자동화 워크플로 1장 |
| 16:10–16:30 | 쉬는시간 | 개별 Q&A · 설문 | |

## 준비물

- 개인 노트북 + 웹 브라우저(Chrome 권장). 설치 프로그램 없음.
- 생성형 AI **무료 계정 1개 이상**(ChatGPT · Claude · Gemini 중 택1) — 09:20까지 로그인.
- 회사 노트북에서 접속이 막히면 개인 기기(휴대폰 포함)로 진행.

## 안전 규칙 3줄

1. 실제 고객·거래·내부 데이터는 어디에도 입력하지 않는다.
2. 구조만 남기고 가상 값으로 치환한다(고객A · N건 · X억).
3. AI 결과는 초안이다 — 숫자·조항·기능은 원문과 대조한다.

## 실습 가이드

| Session | 가이드 | 실습 |
|---------|--------|------|
| 1 | [`workshop/lab-1-prompt-design.md`](workshop/lab-1-prompt-design.md) | 프롬프트 템플릿 카드 · 오류 초안 검수 |
| 2 | [`workshop/lab-2-prd-draft.md`](workshop/lab-2-prd-draft.md) | 벤치마킹 표 · PRD 초안 → 3관점 리뷰 → 2-Pager |
| 3 | [`workshop/lab-3-automation-workflow.md`](workshop/lab-3-automation-workflow.md) | 퍼널 분석 · 회의록·이메일 · 슬라이드 아웃라인 · 워크플로 1장 |

## 강의 제작 자료 (강사·제작자용)

- 문서 맵: [`_index.md`](_index.md) — 기획(`planning/`), 슬라이드 빌드(`assets/pptx/`), 벤치마크(`references/`)
- AI Builder 원본: [`workshop/builder/`](workshop/builder/README.md) — 코드 시안 보드·동작 프로토타입·제작 프롬프트
- 덱 재생성: `cd assets/pptx && npm install && ./release.sh` (PDF는 PowerPoint "PDF로 저장")
