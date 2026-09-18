# 09. 슬라이드 플랜 (초안) — 약 96장

> Status: Deprecated — 장표 단위 SSOT는 [`14-slide-plan-v2.md`](14-slide-plan-v2.md)(3블록 × 72~78장). 이 문서는 v1 모듈별 장수 예산 기록으로만 보존
> Document Type: Planning
> Product: KMAC 기획자 과정 M5 「생성형 AI를 활용한 기획자 업무생산성 향상」
> Last Updated: 2026-09-18
> Last Author: PM 차성재 with Claude Fable 5.1
> Owner: PM 차성재
> ⚠️ 세션 상세(`04~06`) 리뷰 확정 후 장표 단위로 갱신한다. 지금은 **모듈별 장수·아키타입 예산**만 고정.

## 디자인·빌드 기준

- 디자인: [`docs/design-system/ppt-design-guide.md`](../../../docs/design-system/ppt-design-guide.md) — Apple 그래머 + 나눔고딕, 단일 Action Blue, 16:9 10×5.625in, 안전 여백 좌우 0.7in.
- 아키타입(가이드 §6): Cover · Section divider · Statement · Comparison(2-up) · Process · Data hero · Matrix/Table · Showcase(이미지) · Closing + 이 강의 추가: **Prompt block**(붙여넣기 프롬프트, Parchment 배경 코드 박스) · **Lab step**(입력→확인→한 번 수정 3단 카드) · **Checklist**.
- 빌더: `projects/26Q2_Fastcampus-Lecture/assets/pptx/generate-v05.js`의 빌더 함수(darkSlide·lightSlide·addTitle·addCard·partDivider·runningFooter) 재사용 → `assets/pptx/generate.js`.
- 러닝 푸터: "생성형 AI를 활용한 기획자 업무생산성 향상 · KMAC 핀테크 인력양성 기획자 과정" + 페이지 번호.
- 실습 장표 규칙: 프롬프트 전문을 장표에 그대로 싣는다(PDF만 보고 재현). 결과 예시는 캡처 + "결과가 달라도 정상" 캡션.

## 모듈별 장수·아키타입 예산

| 모듈 | 장수 | 주요 아키타입 |
|------|-----:|--------------|
| M0 오프닝 | 6 | Cover · 프로필 · Showcase(완성 산출물 미리보기) · Statement(오늘의 약속 3) · Table(시간표) · Checklist(안전 규칙 3) |
| M1 도구 지도 | 8 | Divider · Matrix(3사 비교) · Matrix(업무 유형별 추천) · Process(환경 3층) · Statement(규제 동향 1줄+출처) · Showcase(옵트아웃 설정 캡처) · Checklist(1분 체크) · Statement(정리) |
| M2 6요소·템플릿 | 14 | Divider · Comparison(4요소→6요소) · Comparison(나쁜/좋은 프롬프트) · Process(기법 4) · Cards(기법 +3) · Cards(실수 3) · Prompt block×3(템플릿 a/b/c) · Showcase(시연 결과) · Lab step(실습 ①) · Prompt block(재요청 10선) · Checklist(페어 체크) · Statement(프롬프트는 문서다) |
| M3 환각·검증 | 7 | Divider · Cards(위험한 4곳) · Process(3원칙+확장 4) · Prompt block(검증 프롬프트) · Lab step(실습 ②) · Table(정답 대조) · Statement(Session 1 회수) |
| M4 재시동 | 3 | Divider · Cards(5개 핵심 입력) · Statement(가상 사례 disclaimer) |
| M5 리서치 | 7 | Process(3단계) · Prompt block(리서치 브리프) · Table(5열 표 + 1차/2차 자료) · Showcase(Deep Research 결과) · Prompt block(벤치마킹 표) · Lab step(미니 실습) · Statement(노하우) — 시장 규모 장표는 삭제(05 검수) |
| M6 구조화 | 6 | Process(문서 계층) · Cards(5개 입력→PRD) · Cards(노하우 4, 하단 1줄: 기획서 vs 제안서) · Checklist(규제·리스크 질문) · Process(AI로 쓰고 AI로 평가) · Prompt block(3관점 리뷰) — 제안서 장표는 1줄로 흡수(E15) |
| M7 PRD 실습 | 8 (+3) | Divider · Lab step×4(입력/초안/리뷰/요약) · Prompt block×2(PRD 초안·2-Pager 요약) · Checklist(페어) — **부록 A1–A3**(PRD 초안·3관점 리뷰·2-Pager 프롬프트 전문, 2단, 14pt 미만 시 2장 분할, 발표 시 건너뜀) |
| M8 공유 | 2 | Statement(회수) · Table(산출물 ② 체크) |
| M9 데이터 | 8 | Divider · Process(4단계) · Checklist(업로드 전 규칙) · Table(데이터 딕셔너리) · Prompt block(분석 체인) · Showcase(차트) · Lab step(따라하기) · Statement(노하우) |
| M10 회의록·이메일 | 6 | Table(회의록 4열) · Prompt block(회의록) · Cards(이메일 3종) · Prompt block(이메일) · Lab step · Statement |
| M11 프레젠테이션 | 8 | Cards(스토리라인 3) · Process(임원 보고 10장) · Prompt block(아웃라인) · Matrix(생성 도구 지도) · Checklist(디자인 최소 규칙) · Showcase(생성 결과) · Lab step(미니 실습) · Statement |
| M12 워크플로 | 7 | Process(조각 연결도) · Cards(하네스 3요소) · Showcase(규칙 파일 예시) · Process(발전 6단계) · Showcase(시연 결과) · Lab step(실습 ④ 1장 템플릿) · Statement |
| M13 마무리 | 4 | Table(산출물 3+1) · Statement(세 문장) · Checklist(안전 원칙) · Closing(QR·설문·링크) |
| 합계 | **94 본편 + 부록 3** | S1 35 · S2 26(+3) · S3 33 |

## 라이트/다크 리듬

- 표지·세션 divider·마무리 = Ink 다크. 모듈 divider는 Parchment. 실습 장표는 White + Parchment 프롬프트 박스. 3장 연속 같은 실루엣 금지(llmops 게이트).

<details>
<summary>Change Log</summary>

| 날짜 | 작성자 | 변경 내용 |
|------|--------|----------|
| 2026-09-18 | PM 차성재 with Claude Fable 5.1 | Deprecated — 사용자 요청(블록당 70–80장)으로 14-slide-plan-v2가 대체 |
| 2026-09-18 | PM 차성재 with Claude Fable 5.1 | 교차 검수 반영(E1·E6) — M5 7장·M6 6장, M7 부록 A1–A3 추가, 합계 94(+3) |
| 2026-09-18 | PM 차성재 with Claude Fable 5.1 | 초안 — 디자인·빌드 기준, 모듈별 장수·아키타입 예산 96장 |

</details>
