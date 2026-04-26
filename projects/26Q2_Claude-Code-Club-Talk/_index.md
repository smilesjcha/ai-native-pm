# 26Q2_Claude-Code-Club-Talk — Document Map

> Status: Draft
> Document Type: Index
> Product: Claude Code Club 2026-04-27 연사 발표
> Last Updated: 2026-04-27
> Last Author: PM 차성재 with Claude Opus 4.7 (1M context)
> Owner: PM 차성재

## 프로젝트 개요

`claude-code-club` 2026-04-27 연사 발표 자료 패키지.

- 발표 주제: **AI Native PM으로의 전환 — Agentic AI 서비스 기획과 실행 (Why · What · How)**
- 분량: 13–15분 (목표 13:50)
- 형태: PPT 슬라이드 20장 + 발표 스크립트 (라이브 데모 없음)
- 대상: 개발자/디자이너/PM 등 AI Native 워크플로우에 관심 있는 청중

## 문서 맵

| 문서 | 경로 | 설명 |
|------|------|------|
| 발표 스크립트 | `script/lecture-script.md` | 슬라이드 1~20 발표 스크립트 + 페이스 체크리스트 |
| PPT 빌드 스크립트 | `assets/pptx/generate.js` | pptxgenjs 기반 슬라이드 빌드 (Node.js) |
| PPT 출력 | `assets/pptx/claude-code-club-talk.pptx` | `node generate.js` 결과물 (20장) |
| PDF 출력 | `assets/pptx/claude-code-club-talk.pdf` | PowerPoint에서 수동 export (선택) |
| 패키지 메타 | `assets/pptx/package.json` | pptxgenjs ^4.0.1 의존성 |

## 디자인 결정 요약

- **컬러 팔레트**: Black / White / Blue 계열만 사용 (주황 사용 금지). primary `#2563EB`, deepNavy `#0E2A47`, slate `#475569`.
- **위아래 검은 바**: 슬라이드 1(타이틀)은 0.7" 두꺼운 바, 슬라이드 2 이후는 0.4" 얇은 바.
- **폰트**: NanumGothic ExtraBold/Bold/Regular + Consolas (코드).
- **무신사 disclaimer**: 슬라이드 1 우하단 박스 + 슬라이드 19 작은 글씨 — 이중 노출.
- **외부 인용**: gstack(Garry Tan, Y Combinator) — 슬라이드 10·12. 자기 오픈소스 ai-native-pm — 슬라이드 15·16·20.

<details>
<summary>Change Log</summary>

| 날짜 | 작성자 | 변경 내용 |
|------|--------|----------|
| 2026-04-27 | PM 차성재 with Claude Opus 4.7 (1M context) | 초안 작성 — 프로젝트 골격 + 슬라이드 outline + 발표 스크립트 + PPT 빌드 |

</details>
