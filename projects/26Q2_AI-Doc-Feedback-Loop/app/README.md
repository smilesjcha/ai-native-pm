# AI Doc Feedback Loop — Local Web App

> **요약**: 로컬 .md 문서를 웹에서 GitHub처럼 렌더링 + 6카테고리×2계층 댓글 + "피드백 저장" 한 번에 두 종류 MD 자동 생성 (원본+이력 / AI 개선 요약)

## Quick Start

```bash
cd projects/26Q2_AI-Doc-Feedback-Loop/app
npm install
npm start
# → http://localhost:5174
```

## 환경 변수 (선택)

| 변수 | 기본값 | 설명 |
|------|--------|------|
| `BASE_DIR` | 레포 루트 (`../../..`) | 웹에서 보여줄 .md 파일들의 루트 디렉토리 (절대경로 권장) |
| `PORT` | `5174` | 서버 포트 |
| `AI` | `auto` | `claude` / `codex` / `off` / `auto`. auto는 `claude` 우선 |

예시 — 특정 프로젝트만 보고 싶을 때:

```bash
BASE_DIR=/Users/musinsa/smilechacha/ai-native-pm/projects/26Q2_AI-Doc-Feedback-Loop npm start
```

## 디렉토리

```
app/
├── package.json
├── server.js          ← Express 백엔드 (파일 IO, AI CLI 호출)
├── public/
│   ├── index.html     ← 3패널 UI
│   ├── app.js         ← 프론트엔드 로직 (vanilla JS)
│   └── styles.css
└── data/
    └── comments.json  ← 코멘트 영구 저장 (파일 경로 키)
```

## 동작 시나리오

1. 좌측 트리에서 `.md` 파일 선택 → 중앙에 GitHub Flavored Markdown 렌더링
2. 헤딩 호버 시 💬 마커 → 클릭하면 **새 코멘트** 탭으로 해당 섹션 anchor 자동 지정
3. **새 코멘트** 탭에서 6카테고리 중 하나 선택 (계층 High/Low 자동 매핑) → 작성자/본문 입력 → 추가
4. 상단 **피드백 저장** 클릭 → 두 파일 동시 생성:
   - `[파일명]-feedback-YYYYMMDD-HHmm.md` — 원본 + 카테고리별 피드백 이력 테이블
   - `[파일명]-improve-YYYYMMDD-HHmm.md` — AI가 카테고리별 핵심 정리 1줄 + 개선안 3개
5. Claude Desktop / Codex Desktop으로 가서 두 파일을 다음 리비전 컨텍스트로 사용

## AI 통합

- 서버 시작 시 `claude` 또는 `codex` 바이너리를 자동 탐지
- 저장 시 코멘트가 1건 이상 + AI CLI 사용 가능하면 호출 (90초 타임아웃)
- 호출 실패 또는 AI 미연결 시 **Fallback** 출력 (카테고리별 구조화 + "수기 작성 필요" 자리 표시자)

## 카테고리 × 계층 매핑 (고정)

| 카테고리 | 계층 |
|----------|------|
| 정책 / 컨텍스트 / 문제 | **High-Level Context** |
| 해결점 / 기능 / 화면 | **Low-Level Spec** |

## 데이터 저장

- 코멘트: `app/data/comments.json` (단일 파일, 경로 키)
- 생성된 MD: 원본과 **같은 디렉토리**에 저장 (원본은 절대 덮어쓰지 않음)

## 한계 (MVP)

- 단일 사용자 / 권한 없음 (로컬 신뢰 전제)
- 실시간 동시 편집 미지원
- 라인 단위 코멘트 미지원 (문서/섹션 단위만)
- 점수 대시보드(주간·월간 반영도)는 v2 예정 — PRD §6 / §11 참고
