# 26Q2_AI-Doc-Feedback-Loop — Document Map

> Status: Draft
> Document Type: Index
> Product: AI Doc Feedback Loop (가칭)
> Last Updated: 2026-05-18
> Last Author: PM 차성재 with Claude Opus 4.7 (1M context)
> Owner: PM 차성재

## 프로젝트 개요

PM이 Claude Desktop / Codex Desktop으로 로컬에서 생성한 Markdown 문서(PRD, 2-Pager, Roadmap, Context, Policy)를
**웹에서 GitHub/Confluence처럼 보기 좋게 렌더링**하고, **문서 단위·문단 단위로 댓글 피드백**을 남기고,
그 피드백을 **AI(Claude/Codex CLI)가 카테고리별로 핵심 정리·개선안 3개씩 추천**하여
**원본 + 피드백 히스토리가 결합된 MD**와 **개선 요약 MD** 두 가지를 모두 산출하는 웹 협업 도구.

장기적으로는 누적된 피드백을 주간/월간 단위로 집계하여 "이 PRD가 피드백을 얼마나 잘 반영했는가"를 점수로 시각화하는,
**Living Document Operating System**을 지향한다.

> 본 프로젝트의 핵심 내용은 Fastcampus 강의 일부 페이지로 추가 업데이트될 예정이다 (`projects/26Q2_Fastcampus-Lecture/` 와 연계).

## 핵심 정보

| 항목 | 내용 |
|------|------|
| 서비스명 | AI Doc Feedback Loop (가칭, 출시명 미정) |
| 타겟 유저 | AI-Native PM, 함께 일하는 Designer / EM / Leadership |
| 핵심 문제 | MD 기반 SSOT 운영은 좋지만, 피드백 수집·반영·이력 추적이 GitHub/Confluence/Slack에 흩어져 있다 |
| AI 활용점 | (1) 피드백 → 카테고리 분류 (2) 핵심 정리 (3) 개선안 3개 추천 (4) 반영도 점수화 |
| 성공 기준 (MVP) | ① MD 웹 뷰 + 댓글 작동 ② 피드백 저장 시 "원본+이력 MD" 및 "개선 요약 MD" 두 파일 동시 생성 ③ Claude/Codex CLI에서 후속 수정이 막힘 없이 이어짐 |
| 확장 기준 (v2) | 주간/월간 피드백 반영도 점수, 문서별 스코어 시각화 |
| 플랫폼 | Web (Local-first, 향후 팀 단위 호스팅 고려) |
| 연관 프로젝트 | `26Q2_Fastcampus-Lecture` (강의 콘텐츠 일부 페이지 추가 반영) |

## 계층적 컨텍스트 분류 체계

웹에서 피드백을 받을 때, 모든 코멘트는 다음 **6개 카테고리 × 2계층**으로 자동 태깅된다.

| 계층 | 의미 | 적용 카테고리 |
|------|------|--------------|
| **High-Level Context** | 프로젝트·프로덕트의 세계관, 전략적 판단 | 정책 (Policy), 컨텍스트 (Context), 문제 (Problem) |
| **Low-Level Spec** | UX·코드 구현을 위한 상세 정책 | 해결점 (Solution), 기능 (Feature), 화면 (Screen) |

> AI가 개선안 3개를 추천할 때도 이 6개 카테고리 단위로 묶어 제시한다.

## 문서 맵

| 문서 | 경로 | 설명 |
|------|------|------|
| **PRD (Draft)** | `prd/PRD.md` | **L1 SSOT — 본 프로젝트의 제품 요구사항 정의서** |
| 2-Pager (Draft) | `prd/2pager.md` | 리더십 의사결정용 1-2페이지 요약 |
| **🚀 MVP 앱 (실행 가능)** | `app/` | **로컬 웹 앱 (Express + Vanilla JS). `cd app && npm install && npm start` → http://localhost:5174** |
| HLD (예정) | `decisions/hld/HLD.md` | 아키텍처 결정 — MD 렌더링 / 댓글 저장 / AI 호출 파이프라인 |
| 기능명세서 (예정) | `specs/feature-spec.md` | L2 — 6대 핵심 기능 상세 명세 |
| 와이어프레임 (예정) | `specs/wireframes/` | 문서 뷰, 댓글 패널, 피드백 저장 모달, 점수 대시보드 |

<details>
<summary>Change Log</summary>

| 날짜 | 작성자 | 변경 내용 |
|------|--------|----------|
| 2026-05-18 | PM 차성재 with Claude Opus 4.7 (1M context) | MVP 앱 추가 (`app/`) — Express 백엔드 + Vanilla JS 3패널 UI, Claude/Codex CLI 자동 연동, 피드백 저장 시 2종 MD 자동 생성 |
| 2026-05-18 | PM 차성재 with Claude Opus 4.7 (1M context) | 프로젝트 폴더 생성, _index.md / claude.md / PRD(Draft) / 2-Pager(Draft) 초안 작성 |

</details>
