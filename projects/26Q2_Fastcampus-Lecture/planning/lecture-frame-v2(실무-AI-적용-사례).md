# 강의 프레임 v2 — 실무 AI 적용 사례 (Shopping Mate / 쿠팡 커머스 Agent)

> Status: Draft (제안)
> Document Type: Planning
> Product: FastCampus 특강 — 실무 AI 적용 사례
> Last Updated: 2026-06-26
> Last Author: PM 차성재 with Claude Opus 4.8
> Owner: PM 차성재

## 0. 무엇이 바뀌나 (v1 → v2)

| 항목 | v1 (이전 특강) | v2 (이번 특강) |
|------|---------------|---------------|
| **제목** | AI NATIVE 시대, AI PM의 새로운 무기 | **실무 AI 적용 사례** |
| **대상** | 과정 참여 전 예비 수강생 | **10주 과정을 거의 다 소화한 실참여 수강생** (실무 적용 단계) |
| **데모 주제** | 오늘의 점심 메이트 (B2C 추천) | **Shopping Mate** — 커머스 **Shopping Agent** (쿠팡 모바일 앱 맥락) |
| **관점** | "AI로 빠르게 만들기" | **"실무 커머스 지표·Agent 관점에서 분석→설계→검증"** |
| **핵심 추가** | — | 커머스 메트릭 용어 학습 · Agent 벤치마크 비교(Alexa/Clova) · 리서치 기반 메트릭 · mock 데이터 코호트/퍼널 분석 |
| **실습 도구** | Manyfast.io + Claude Code | **Claude Desktop의 Claude Code** 중심 (PRD→Wireframe→Prototype→데모영상 일괄) |

> 대상이 "실무 적용 직전 수강생"으로 올라갔으므로, 강의 톤을 **"개념 소개"에서 "실무 워크플로우 시연 + 직접 따라 만들기"**로 전환한다.

---

## 1. 강의 한 줄 정의

> **"내 산업(커머스)의 지표와 Agent 관점으로, AI와 함께 신규/개선 서비스를 분석→설계→프로토타입→데모까지 직접 만들어보는 실무 적용 워크숍."**

데모 제품: **Shopping Mate** — 쿠팡 모바일 앱 위에서 동작하는 AI Shopping Agent (가정).

---

## 2. 학습 목표 (수강생이 가져갈 것)

1. **커머스 메트릭 언어** — GMV·전환율(CVR)·AOV·재구매율·리텐션·CAC/LTV·장바구니 이탈률 등 실무 지표를 "유저 임팩트" 관점으로 해석한다.
2. **Agent 벤치마크 분석법** — Amazon Alexa(Shopping)·Naver Clova Store의 Shopping Agent를 기능/메트릭 관점으로 분해하고 표로 비교 정의한다.
3. **리서치 기반 메트릭 설정** — 최신 리서치(구글 Deep Research 등)를 근거로 "Agent 서비스가 바라봐야 할 메트릭"을 가설로 세운다.
4. **AI와 데이터 분석** — mock 거래/이벤트 데이터로 코호트·퍼널·인사이트 분석을 AI와 수행하고, 메트릭 측정용 로깅 설계를 남긴다.
5. **End-to-end 제작** — PRD → Wireframe → User Flow별 Prototype → 하이라이트 적용 데모 영상까지 Claude Code로 직접 만든다.

---

## 3. 강의 흐름 (모듈 구성)

> 총 흐름: **이해(지표·Agent) → 분석(벤치마크·리서치·데이터) → 설계(PRD·와이어프레임) → 구현(프로토타입·데모영상)**

### Part 1. 커머스 실무의 언어 — 지표와 유저 임팩트 (이해)
- M1. 왜 "지표"인가 — 실무에서 PM/마케터가 매일 보는 커머스 핵심 지표 지도
- M2. 지표 → 유저 임팩트 번역 — 숫자를 "유저가 느끼는 가치"로 바꾸는 노하우 키워드
- M3. 이번 사례의 무대: 쿠팡 모바일 앱 + Shopping Agent라는 관점

### Part 2. Agent 벤치마크 분석 (분석 ①)
- M4. **Amazon Alexa for Shopping** — 기능/인터랙션/대화형 구매 흐름 분해
- M5. **Naver Clova Store Shopping Agent** — 기능/추천/한국 커머스 맥락 분해
- M6. **벤치마크 비교표** — 기능 × 메트릭 매트릭스로 명확히 정의 (Do/Don't)
- M7. **리서치 기반 메트릭 가설** — 최신 리서치(구글 Deep Research) 근거로 "Agent가 바라볼 메트릭" 정의 *(리서치 캡처 이미지 삽입 지점)*

### Part 3. 데이터로 검증 (분석 ②)
- M8. mock 데이터 설계 — 가짜 거래/이벤트 샘플로 분석 환경 만들기
- M9. **코호트 분석** — 신규/재구매 코호트로 리텐션 보기 (AI와 함께)
- M10. **퍼널 분석** — 탐색→상세→장바구니→결제 이탈 구간 찾기
- M11. **인사이트 분석 + 로깅 설계** — 무엇을, 어디에, 어떻게 기록할지 (메트릭 측정 준비)

### Part 4. 설계 → 구현 (with Claude Code)
- M12. **방향성 결정** — 신규 서비스 론치 vs 운영 서비스 개선 (쿠팡 앱 어디를 개선?)
- M13. **PRD** — Shopping Mate PRD (문제·솔루션·지표·Agent 정책)
- M14. **Wireframe** — Figma 스타일 계층 보드 (User Flow 분리)
- M15. **Prototype** — User Flow 단계별 실행 가능한 동작 프로토타입
- M16. **데모 영상** — 마우스 클릭·화면 전환·변화부 하이라이트 적용 MP4
- M17. 마무리 — 실무 적용 체크리스트 (내 트랙에 어떻게 옮길까)

### 부록. 트랙별 응용 가이드
수강생 트랙(① 마케팅/콘텐츠 ② 로컬 커머스/O2O ③ 문화/콘텐츠 ④ 에듀테크)별로
"Shopping Mate에서 배운 분석→설계→구현"을 자기 도메인에 옮기는 1장짜리 가이드.

---

## 4. 핵심 산출물 (이번 강의에서 함께 만드는 것)

| 산출물 | 설명 | 도구 |
|--------|------|------|
| 벤치마크 비교표 | Alexa vs Clova vs (목표) Shopping Mate — 기능×메트릭 | Claude (리서치 정리) |
| 메트릭 정의서 | 커머스 + Agent 메트릭 + 측정 로깅 | Claude |
| mock 데이터셋 | 거래/이벤트 샘플 (CSV) | Claude Code |
| 코호트·퍼널 분석 결과 | 차트 이미지 (analysis/outputs) | Claude Code (노트북) |
| **Shopping Mate PRD** | 데모 제품 PRD | Claude Desktop |
| **Wireframe 보드** | User Flow 분리 모바일 시안 | Claude Code |
| **Prototype** | 단계별 동작 HTML | Claude Code |
| **데모 영상(MP4)** | 클릭·하이라이트 적용 | Claude Code + ffmpeg |

---

## 5. 사전 준비물 — "더 준비/변경이 필요한 것" (유림 매니저님 세팅 요청용)

### 강사(차성재) 준비
- [ ] **구글 Deep Research 결과 캡처 이미지** — Alexa/Clova Shopping Agent, 커머스 Agent 메트릭 리서치 (PPT 예시 이미지로 삽입) → `assets/research/`에 넣어주시면 슬라이드에 반영
- [ ] 쿠팡 모바일 앱 **개선 대상 화면 캡처** (검색/추천/장바구니/결제 중 택1~2)
- [ ] mock 데이터셋 + 코호트/퍼널 분석 노트북 (analysis/)
- [ ] Shopping Mate PRD → Wireframe → Prototype → 데모영상 (사전 제작본, 라이브 시연 백업)

### 수강생 사전 세팅 (운영팀 요청 항목)
- [ ] **Claude Desktop 설치 + Claude Code 사용 가능** 상태 (이번 핵심 도구)
- [ ] 각자 트랙(①마케팅/콘텐츠 ②로컬커머스/O2O ③문화/콘텐츠 ④에듀테크) 1개 선택 + 자기 도메인 "개선하고 싶은 한 가지"
- [ ] 메모장(Notion/Apple Notes) + 작업 폴더
- [ ] (선택) 분석 실습용 mock 데이터 미리 배포 — 운영팀 세팅 시 동일 파일로 진행

### 강의 운영 관점 변경
- [ ] 대상이 "수료 직전 실참여자"이므로 개념 설명 비중↓, **실습·시연 비중↑**
- [ ] 트랙이 4개로 갈리므로, 데모는 커머스(쿠팡)로 통일하되 **부록의 트랙별 응용 가이드**로 각자 도메인 연결

---

## 6. 열린 결정 사항 (확인 필요)

1. **데모 프레이밍**: Shopping Mate를 (a) 쿠팡 앱에 얹는 신규 AI Agent (b) 쿠팡 기존 기능 개선 (c) 독립 신규 앱 — 중 무엇으로?
2. **강의 자산 위치**: 기존 `26Q2_Fastcampus-Lecture`에 v05로 추가(디자인시스템·파이프라인 재사용, v04 보존) vs 새 폴더 분리?
3. **구글 리서치 이미지**: 지금은 placeholder로 만들고 이미지 받으면 교체 vs 이미지 먼저 받고 진행?

<details>
<summary>Change Log</summary>

| 날짜 | 작성자 | 변경 내용 |
|------|--------|----------|
| 2026-06-26 | PM 차성재 with Claude Opus 4.8 | 초안 — 실무 AI 적용 사례(Shopping Mate/쿠팡) 프레임 재설계, 모듈 흐름·산출물·준비물·열린결정 정리 |

</details>
