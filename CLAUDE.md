# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Repository Purpose

PM 조직의 PRD (Product Requirements Document, 제품 요구사항 정의서), 설계 문서(HLD/LLD), 아키텍처 결정 기록 등을 프로젝트 단위로 관리하는 문서 저장소.
소스 코드, 빌드 시스템, 테스트 인프라 없음 — 순수 마크다운 문서 레포.

문서는 **한국어를 기본**으로 하며, 산업 표준 용어는 영어를 병기한다 (예: "ROI (Return on Investment, 투자 대비 수익률)").

---

## Naming Governance

> **한 줄 요약**: 기본은 `kebab-case`, 제품 폴더는 `YYQ#_Title-Case`, SSOT 파일은 `UPPER.md`

### 4가지 패턴만 기억하면 된다

```
kebab-case                    → 폴더와 파일의 기본값 (대부분 여기 해당)
YYQ#_Title-Case               → 제품 폴더 (projects/ 바로 아래)
UPPER.md                      → 레이어당 하나의 기준 문서
kebab-case(Role,Role).md      → 역할 명시 파일 (독자가 명확히 구분되는 공유 문서)
```

### 프로젝트 폴더 네이밍 규칙

```
[YYQ#]_[Title-Case-Project-Name]
```

| 구성 요소 | 규칙 | 예시 |
|-----------|------|------|
| 시점 prefix | 2자리 연도 + `Q` + 분기 숫자 (실행 시점 기준) | `26Q3`, `26Q2`, `25Q4` |
| 구분자 | 언더스코어 `_` | — |
| 프로젝트명 | 단어마다 첫 글자 대문자, 단어 사이 `-` | `User-Onboarding`, `AI-Recommendation` |

> **현재 분기: `26Q3`** — 지금 새로 만드는 프로젝트 폴더는 모두 `26Q3_`으로 시작한다.

### 패턴 적용 기준

| 대상 | 패턴 | 예시 |
|------|------|------|
| 제품 폴더 (`projects/` 직하) | `YYQ#_Title-Case` | `26Q3_User-Onboarding/` |
| 모든 하위 폴더 (기본) | `kebab-case` | `prd/`, `specs/`, `wireframes/` |
| 일반 파일 | `kebab-case` | `2pager.md`, `output-strategy.md` |
| 레이어 기준 문서 (SSOT) | `UPPER.md` | `PRD.md`, `HLD.md`, `LLD.md` |
| 의사결정 기록 | `ADR-NNN-name.md` | `ADR-001-api-gateway-choice.md` |
| 메타/컨텍스트 파일 | `kebab-case` | `claude.md`, `agents.md`, `skills.md` |
| 역할 명시 파일 | `kebab-case(Role,Role).md` | `scenario-detail(PM,Design,QA).md` |
| 에셋 파일 (screens) | `IMG-NN-kebab-desc.ext` | `IMG-01-main-screen.png` |
| 에셋 파일 (wireframes) | `wf-kebab-desc.ext` | `wf-home-v1.png` |

### 제품 폴더 네이밍 원칙 (Flat 구조)

- Initiative / 프로젝트명을 **그대로 flat하게** `projects/` 직하에 배치한다
- 하위 분류 폴더를 만들지 않고, 이름이 길어지더라도 `-`로 연결하여 하나의 폴더명으로 표현한다

```
✅ projects/26Q3_User-Onboarding/
✅ projects/26Q3_AI-Recommendation/
❌ projects/ai/recommendation/         ← 중첩 금지
```

### 흔한 실수

```
❌ user-onboarding/             →  ✅ 26Q3_User-Onboarding/      (prefix 필수)
❌ 26q3_user-onboarding/        →  ✅ 26Q3_User-Onboarding/      (Q 대문자, 단어 capitalize)
❌ 26Q3-User-Onboarding/        →  ✅ 26Q3_User-Onboarding/      (구분자는 _ )
❌ prd.md (SSOT)                →  ✅ PRD.md                     (SSOT는 UPPER.md)
❌ hld.md                       →  ✅ HLD.md                     (레이어 기준 문서)
```

---

## Document Structure

```
ai-native-pm/
├── CLAUDE.md                  ← 네이밍·구조·권한·작성 표준
├── README.md                  ← 초기 설정 안내
├── GUIDE.md                   ← PM 빠른 시작 가이드
│
├── context/                   ← 도메인 지식·회사 정책 (AI 입력 자료)
│   ├── company-policies/      ← 전사 정책, 조직도, 의사결정 기준
│   ├── domain-knowledge/      ← 서비스별 도메인 지식
│   └── external-services/     ← 외부 API·서비스 연동 컨텍스트
│
├── docs/
│   ├── guides/                ← PRD 작성 가이드, 문서 계층 설명
│   ├── evaluation/            ← PRD 평가 기준 (리더십·디자이너·EM)
│   ├── references/            ← 참고 자료
│   ├── templates/             ← 문서 템플릿 (Master PRD, 2-Pager)
│   ├── planning/              ← 공통 기획 문서
│   └── decisions/             ← 팀 레벨 ADR
│
├── projects/                  ← 활성 프로젝트
│   └── [YYQ#_Product]/
│       ├── _index.md          ← Document Map (필수)
│       ├── claude.md          ← Claude 컨텍스트 (필수)
│       ├── assets/            ← 이미지·바이너리 에셋
│       │   ├── screens/       ← 제품 스크린샷
│       │   ├── wireframes/    ← 와이어프레임 이미지
│       │   ├── prd/           ← PRD 본문 첨부 이미지
│       │   └── references/    ← 참고 자료 이미지
│       ├── analysis/          ← 데이터 분석 (성공지표 가설·검증)
│       │   ├── notebooks/     ← .ipynb 분석 파일
│       │   └── outputs/       ← 분석 결과 이미지·차트
│       ├── prd/
│       │   ├── PRD.md         ← L1 SSOT
│       │   └── 2pager.md
│       ├── specs/             ← L2 UX·출력 명세
│       │   ├── wireframes/
│       │   └── flows/
│       ├── decisions/         ← L2 기술 결정
│       │   ├── hld/HLD.md
│       │   ├── lld/
│       │   └── adr/
│       └── ops/               ← L3 출시·운영
│
└── archive/                   ← 완료 프로젝트 (분기별)
```

### context/ 폴더 용도

`context/` 폴더는 Claude가 PRD 생성 시 참조하는 **도메인 지식을 저장하는 공간**이다. 프로젝트 문서(`projects/`)와 달리, 이 폴더의 내용은 팀이 생산하는 산출물이 아니라 **AI에게 제공하는 입력 자료**(input material)이다.

| 폴더 | 용도 | 예시 |
|------|------|------|
| `company-policies/` | 전사 정책, 조직도, 의사결정 기준, 브랜드 가이드 | `org-structure.md`, `brand-policy.md` |
| `domain-knowledge/` | 서비스별 비즈니스 규칙, 도메인 용어 사전, 워크플로우 | `user-journey.md`, `billing-rules.md` |
| `external-services/` | 외부 API 스펙, 연동 서비스 제약사항, 파트너 정책 | `notification-api-spec.md`, `oauth-integration.md` |

> 다른 부서의 정책이나 도메인 지식 문서를 여기에 축적하면, Claude가 PRD 작성 시 자동으로 관련 컨텍스트를 참조할 수 있다.

### 문서 계층 역할

| 계층 | 위치 | 역할 |
|------|------|------|
| 에셋 | `assets/` | 문서에서 참조하는 이미지·바이너리 파일 |
| 분석 | `analysis/` | 성공지표 가설·데이터 분석 노트북 및 결과 이미지 |
| L1 | `prd/` | 무엇을 왜 만드는가 — PRD.md가 SSOT |
| L2 | `specs/`, `decisions/` | 어떻게 만드는가 — UI명세·기술설계 |
| L3 | `ops/` | 어떻게 출시·운영하는가 |

### analysis/ 폴더 용도

`analysis/` 폴더는 PRD의 성공지표(KPI/OKR) 근거가 되는 **데이터 분석 산출물을 저장하는 공간**이다.

| 폴더 | 용도 | 예시 |
|------|------|------|
| `notebooks/` | 탐색적 분석, 가설 검증, A/B 테스트 결과 노트북 | `hypothesis-retention.ipynb`, `funnel-analysis.ipynb` |
| `outputs/` | 노트북에서 내보낸 차트·그래프·스크린샷 (PRD 지표 섹션에 첨부) | `IMG-01-retention-trend.png`, `IMG-02-funnel-drop.png` |

> `outputs/`의 이미지는 `IMG-NN-kebab-desc.ext` 네이밍 규칙을 따른다.
> PRD 지표 섹션에서 `![설명](../analysis/outputs/IMG-01-xxx.png)` 형태로 참조한다.

### Archive 정책

- 분기(YYQ) 단위로 `archive/` 하위에 폴더를 생성한다
- 완료·종료된 프로젝트를 `projects/`에서 `archive/[YYQ]/`로 이동한다
- 아카이브된 프로젝트의 폴더 구조와 네이밍은 원본 그대로 유지한다

### Side 문서 표준 헤더

L2/L3 파일 상단에 반드시 추가:

```markdown
> **Side Document** — `prd/PRD.md` 의 보조 문서
> 참조 원본: PRD §[섹션] [섹션명]
> 목적: [한 줄 설명]
```

---

## PRD Evaluation Policy (PRD 평가 정책)

PRD가 **Approved** 상태로 전환되려면, 3개 관점의 평가를 모두 통과해야 한다.

| 관점 | 평가 기준 문서 | 핵심 질문 |
|------|--------------|----------|
| 리더십/임원 | `docs/evaluation/eval-leadership.md` | "이 프로젝트에 투자할 가치가 있는가?" |
| 디자이너 | `docs/evaluation/eval-design.md` | "이 PRD만으로 와이어프레임을 그릴 수 있는가?" |
| Engineering Manager | `docs/evaluation/eval-engineering.md` | "이 범위를 주어진 기간과 리소스로 만들 수 있는가?" |

**통과 기준**: 각 관점 30점 만점 중 20점 이상 + 개별 항목 최소 점수 충족

평가 워크플로우:
1. PM이 PRD 초안 작성 (Status: Draft)
2. Claude 평가 프롬프트로 자가 점검 → 미달 항목 보완
3. Status를 `In Review`로 변경, 이해관계자 리뷰 요청
4. 3개 관점 모두 통과 시 `Approved`로 전환

---

## Permission Policy (Auto-Approve)

이 레포는 순수 마크다운 문서 저장소다. 소스 코드·빌드·서버가 없으므로 대부분의 파일·Git 작업을 자동 승인한다.

### 설정 파일 위치

| 파일 | 범위 | Git 추적 | 용도 |
|------|------|----------|------|
| `.claude/settings.json` | 이 레포 (팀 공유) | ✅ 커밋됨 | 팀 공통 allow/deny 정책 |
| `.claude/settings.local.json` | 이 레포 (개인) | ❌ gitignore | 개인 오버라이드 (선택) |
| `~/.claude/settings.json` | 전체 프로젝트 (개인) | N/A | 글로벌 기본값 |

우선순위: `settings.local.json` > `settings.json` > `~/.claude/settings.json`

### Allow (자동 승인)

```
Read, Edit, Write, Glob, Grep    ← 파일 읽기/쓰기 전체
Bash(git *)                      ← git 작업 전체 (push 포함)
Bash(ls / mkdir / cp / mv)       ← 파일시스템 탐색·조작
Bash(cat / head / tail / diff)   ← 파일 조회
Bash(sed / awk / sort / wc)      ← 텍스트 처리
```

### Deny (반드시 확인)

```
Bash(rm -rf *)                       ← 재귀 삭제
Bash(rm -r *)                        ← 재귀 삭제
Bash(git push --force origin main)   ← main 브랜치 강제 푸시
Bash(git push -f origin main)        ← main 브랜치 강제 푸시
Bash(git reset --hard *)             ← 하드 리셋
Bash(git clean -f *)                 ← 추적되지 않은 파일 삭제
Bash(sudo *)                         ← 권한 상승
```

---

## Document Authoring Standards

> **한 줄 요약**: 모든 문서는 메타 헤더 + 접이식 Change Log를 가지며, 작성자와 AI 도구 사용 여부를 명시한다.

### 문서 메타 헤더

모든 문서 상단에 아래 메타 정보를 포함한다.

```markdown
> Status: [Draft | In Review | Approved | Accepted | Deprecated]
> Document Type: [PRD | HLD | LLD | ADR | UX Spec | Ops | Guide | ...]
> Product: [제품명]
> Last Updated: [YYYY-MM-DD]
> Last Author: [역할 이름 (with AI 도구명)]
> Owner: [역할 이름]
```

### 작성자 표기 규칙 (Author Attribution)

문서 작성·수정 시 AI 도구 사용 여부를 반드시 명시한다.

| 상황 | 표기 형식 | 예시 |
|------|----------|------|
| AI 활용 작성 | `[역할] [이름] with [AI 도구 모델명]` | `PM 홍길동 with Claude Opus 4.6` |
| 본인 직접 작성 | `[역할] [이름] (직접 작성)` | `PM 홍길동 (직접 작성)` |
| 여러 명 공동 작성 | 쉼표로 구분 | `Design 김디자, PM 홍길동 with Claude Opus 4.6` |

**AI 도구명 표기 기준**: 제품명 + 모델명으로 작성한다 (예: `Claude Opus 4.6`, `Claude Sonnet 4.6`, `Codex GPT-5.4`).

### Change Log 표준

모든 문서에 접이식(collapsible) Change Log를 포함한다.

```markdown
<details>
<summary>Change Log</summary>

| 날짜 | 작성자 | 변경 내용 |
|------|--------|----------|
| 2026-04-16 | PM 홍길동 with Claude Opus 4.6 | 초안 작성 |

</details>
```

**Change Log 작성 규칙**:

1. **역순 정렬**: 최신 변경이 맨 위
2. **언어**: 변경 내용은 한글로 작성 (고유명사·기술 용어는 영어 허용)
3. **작성자 필수**: 매 변경마다 Author Attribution 규칙에 따라 작성자 기록
4. **구체적 서술**: "내용 업데이트" 금지 → 구체적으로 어떤 섹션의 무엇이 바뀌었는지 기술
5. **AI 변경 추적**: AI가 수정한 경우 어떤 AI 도구를 사용했는지 작성자 열에 반드시 포함

---

## Git Conventions

- 커밋 메시지: `type: description` (예: `docs: 사용자 온보딩 PRD 초안 추가`)
- **언어**: 한국어 기본, 기술 용어는 영어 허용
- **구조화 데이터**: 마크다운 테이블 사용, 명확한 컬럼 헤더 필수
