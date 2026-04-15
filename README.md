# AI Native PM

AI Native PM을 위한 PRD → 프로토타입 워크플로우 문서 저장소.
Claude를 활용해 PRD 작성·평가·설계 문서·프로토타입까지 전 과정을 지원한다.

---

## 대상

AI를 업무에 적극 활용하는 PM 조직 (Product Manager, Designer, Engineering Manager, QA)

---

## 시작하기

### 1. 저장소 클론

```bash
git clone [이 저장소 URL]
cd ai-native-pm
```

### 2. Claude Code 설치 (아직 없다면)

```bash
npm install -g @anthropic-ai/claude-code
```

### 3. 프로젝트 디렉토리에서 Claude 시작

```bash
cd ai-native-pm
claude
```

> Claude Code가 `CLAUDE.md`를 자동으로 읽어 네이밍 규칙, 문서 표준, 권한 정책을 따른다.

---

## 핵심 문서

| 문서 | 역할 |
|------|------|
| [CLAUDE.md](CLAUDE.md) | 네이밍·구조·권한·작성 표준 (Claude가 읽는 설정) |
| [GUIDE.md](GUIDE.md) | PM 빠른 시작 가이드 |
| [PRD 작성 가이드](docs/guides/prd-writing-guide.md) | Why/What/How 프레임워크 기반 PRD 작성법 |
| [문서 계층 가이드](docs/guides/document-hierarchy.md) | 2-Pager → PRD → Spec → HLD 진행 흐름 |
| [리더십 평가 기준](docs/evaluation/eval-leadership.md) | 리더십/임원 관점 PRD 평가 루브릭 |
| [디자이너 평가 기준](docs/evaluation/eval-design.md) | 디자이너 관점 PRD 평가 루브릭 |
| [EM 평가 기준](docs/evaluation/eval-engineering.md) | EM 관점 PRD 평가 루브릭 + ROI/공수 가이드 |

---

## 폴더 구조 요약

```
ai-native-pm/
├── context/              ← 도메인 지식·회사 정책 (AI 입력 자료)
├── docs/
│   ├── guides/           ← PRD 작성·문서 계층 가이드
│   ├── evaluation/       ← 3관점 PRD 평가 기준
│   ├── templates/        ← Master PRD, 2-Pager 템플릿
│   └── references/       ← 참고 자료
├── projects/
│   └── [YYQ#_Product]/
│       ├── assets/       ← 이미지 에셋 (screens / wireframes / prd / references)
│       ├── analysis/     ← 데이터 분석 (notebooks/ + outputs/)
│       ├── prd/          ← PRD.md, 2pager.md
│       ├── specs/        ← UX 명세
│       ├── decisions/    ← HLD / LLD / ADR
│       └── ops/          ← 출시·운영
└── archive/              ← 완료 프로젝트
```

자세한 구조는 [CLAUDE.md](CLAUDE.md)의 Document Structure 섹션을 참조한다.
