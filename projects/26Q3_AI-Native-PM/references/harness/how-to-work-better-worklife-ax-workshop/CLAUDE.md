# 2026 청년 여성 밸런스 워크숍 — Claude 작업 지침

- 강의: 「AI 시대의 업무 경쟁력과 생산성 향상」 (AX 시대의 일하는 방식·문서 생산성·커리어 성장 워크숍)
- 일시: 2026-07-23(목) 13:00–17:00, 온라인(Zoom)
- 대상: 청년 여성 8명 (사전 설문 기반 — `docs/04-survey-analysis.md`)
- 실습 기준: **Claude 무료 계정** / 유료·확장 기능은 강사 시연

## 작업 순서 (반드시 이 순서)

1. 내용 변경 → `docs/`(커리큘럼·설계) 수정
2. 슬라이드 구성 변경 → `design/slide-plan.md` 수정
3. PPT 반영 → `build_pptx/slides_data.py` 수정 → `python3 build_pptx/build.py`
4. QA → `output/`에서 렌더링 후 전 슬라이드 육안 검수 (루트 CLAUDE.md의 품질 기준)
5. 실습 자료 변경 → `materials/` 수정 후 ZIP 재패키징(`dist/`)

## 핵심 제약

- 디자인: 화이트 배경 + 블랙 텍스트 + Deep Blue(#123C7C) 단일 강조. `design/ppt-design-system.md`가 유일한 기준.
- 참여자 실습은 2개(회의록 정리, 보고서·이메일)로 고정. 늘리지 않는다.
- 메시지 프레임: "AI 도구 교육"이 아니라 "AX 시대의 업무 경쟁력과 성장 방식". 유료 기능은 "발전 단계" 서사로만 소개.
- 샘플 데이터는 가상 회사 기준. 실제 정보 금지.

## 스크린샷 필요 시

- Claude 무료 계정 화면 캡처는 **사용자가 직접** 별도 Chrome 프로필에서 수행한다.
  필요 목록을 `assets/screenshots/NEEDED.md`에 기록하고 사용자에게 요청할 것.
- 캡처 파일은 `assets/screenshots/`에 저장하고 슬라이드에서 상대 경로로 참조.
