# Claude Context — 26Q2_Claude-Code-Club-Talk

## 프로젝트 목적

`claude-code-club` 2026-04-27 연사 발표 자료 제작. 13–15분 단독 강연 + Q&A.

## 핵심 컨텍스트

- 발표자: 차성재 (smilesjcha) — AI Engineer(Backend) → AI Service PM → 무신사 Agentic AI side PM, 시립대/아주대 AI 부문 겸임교수
- 발표 주제: **AI Native PM으로의 전환 — Agentic AI 서비스 기획과 실행 (Why · What · How)**
- 청중: 개발자·디자이너·PM 등 AI 워크플로우에 관심 있는 다양한 직군
- 언어: 한국어 기본, 산업/기술 용어는 영어 병기
- 톤: 인사이트 공유 + 약간의 자기 노출. 격식과 캐주얼의 중간.

## 제약 사항

- **무신사 disclaimer 필수**: 본 발표는 무신사의 공식 입장이 아닌 발표자 개인의 견해. 슬라이드 1 우하단 박스 + 슬라이드 19에서 한 번 더 자연 언급.
- **컬러**: Black / White / Blue 계열만. 주황(#FF6B35) 사용 금지.
- **라이브 데모 없음**: 모든 시각 자료는 정적 placeholder/스크린샷.
- **분량**: 슬라이드 20장 / 약 13:50 발화 시간 (Q&A 별도).

## 외부 인용 정책

- **gstack** (Garry Tan, Y Combinator) — 슬라이드 10에서 7-step 워크플로우 인용, 슬라이드 12에서 "harness engineering" 한 줄 재인용.
- **ai-native-pm** (smilesjcha 본인 오픈소스) — 슬라이드 15에서 repo 트리 도식, 슬라이드 16에서 3관점 평가 시스템 캡션, 슬라이드 20에서 repo URL.
- 원칙: 외부 인용을 자기 인용보다 먼저 배치 (자기 자랑 톤 회피).

## 빌드

```bash
cd assets/pptx
npm install              # 최초 1회
node generate.js         # 매 변경 후 실행 → claude-code-club-talk.pptx 갱신
```

PDF는 PowerPoint/Keynote에서 "다른 이름으로 저장 → PDF" 수동 export.
