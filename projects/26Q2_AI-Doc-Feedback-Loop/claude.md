# Claude Context — 26Q2_AI-Doc-Feedback-Loop

## 프로젝트 목적
Claude Desktop / Codex Desktop으로 로컬에서 작성한 Markdown 문서를 웹에서 GitHub/Confluence처럼 렌더링하고,
문서/문단/라인 단위로 코멘트 피드백을 받은 뒤, AI가 카테고리별로 핵심 정리 + 개선안 3개를 추천하여
**원본+피드백 이력 MD**와 **개선 요약 MD** 두 가지를 산출하는 웹 협업 도구.

## 핵심 컨텍스트
- 타겟: AI-Native PM (1차) / Designer · EM · Leadership (피드백 제공자, 2차)
- 핵심 페인포인트:
  - SSOT를 MD로 관리하면 버전 관리는 좋지만, 피드백이 GitHub PR / Confluence 댓글 / Slack 쓰레드 / 회의 노트로 흩어진다
  - PM이 그 피드백을 다시 MD에 정리·반영하는 데 큰 수작업 비용이 든다
  - 누가 어떤 피드백을 언제 줬고, 그게 문서에 어떻게 반영됐는지 추적이 안 된다
- AI 모델: Claude (개선안 추천 메인) + Codex (코드성 명세 보강), CLI 기반 호출
- 플랫폼: Web (Local-first, MVP는 단일 사용자/소규모 팀)
- 사용자 역할: Author (PM), Reviewer (Designer/EM/Leadership)

## 성공 지표 (핵심 KPI)
- MVP 게이트:
  - MD 웹 렌더링 + 댓글 작동
  - "저장" 클릭 시 두 종류 MD 자동 생성 (원본+이력 / 개선 요약)
  - Claude CLI / Codex CLI에서 후속 작업이 끊김 없이 이어짐
- 운영 지표 (v2):
  - 피드백 반영 사이클 타임 (피드백 등록 → 문서 반영) 단축
  - 주간 피드백 반영률 70% 이상
  - PRD 자가 평가 점수(3관점) 향상

## 6대 카테고리 × 2계층 분류 체계
| 계층 | 카테고리 |
|------|---------|
| High-Level Context | 정책 (Policy) / 컨텍스트 (Context) / 문제 (Problem) |
| Low-Level Spec | 해결점 (Solution) / 기능 (Feature) / 화면 (Screen) |

피드백 등록 / AI 개선안 추천 / 점수 시각화 모두 이 분류 체계를 따른다.

## 6대 핵심 기능 (MVP 기준)
1. **MD 웹 뷰어** — GitHub Flavored Markdown 렌더링, 코드/표/이미지/체크박스 지원
2. **댓글 시스템** — 문서/섹션/라인 단위, 작성자·시각 기록, 6카테고리 태그
3. **피드백 저장 버튼** — 누적 댓글을 freeze하여 두 종류 MD로 저장 (원본+이력 / 개선 요약)
4. **AI 개선안 추천** — Claude/Codex CLI 호출, 카테고리별 3개 대안 자동 생성
5. **계층적 분류 자동 태깅** — AI가 코멘트 내용 기반으로 6카테고리 + 2계층 자동 분류
6. **점수 대시보드 (v2)** — 주간/월간 피드백 반영도 시각화, 문서별 스코어 (PRD/2pager/Roadmap)

## 제약 사항
- **Local-first**: MVP는 로컬 파일시스템 기반 (DB는 SQLite 또는 파일 + JSON 사이드카)
- **Claude/Codex CLI 의존**: 데스크톱 에이전트가 같은 머신에서 동작한다고 가정
- **MD 호환성 유지**: 저장된 MD는 GitHub/VS Code/일반 MD 뷰어에서도 깨지지 않게 표준 마크다운 + 주석 메타로 구성
- **개인정보**: 코멘트에 PII가 포함될 수 있으므로 로컬 저장이 기본, 외부 전송은 명시적 동의 시에만
- 언어: 한국어 기본, 기술 용어 영어 병기

## Fastcampus 강의 연동
- 본 프로젝트의 핵심 개념(피드백 루프, 6카테고리 × 2계층 분류, AI 개선안 3종 추천 패턴)은
  `projects/26Q2_Fastcampus-Lecture/` 강의 일부 페이지로 추가 업데이트될 예정
- 강의 컨텍스트로 활용 시 "AI-Native PM이 SSOT를 운영하는 실전 워크플로우"의 사례로 인용
