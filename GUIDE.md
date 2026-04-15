# PM AI Playbook 사용 가이드

> 이 가이드는 PM, Designer, EM이 함께 쓰는 AI 기반 문서 협업 가이드입니다.
> 초기 설치가 아직 안 되었다면 먼저 [README.md](README.md)를 완료하세요.

---

## 목차

1. [Playbook이란?](#1-playbook이란)
2. [역할별 빠른 시작](#2-역할별-빠른-시작)
3. [PRD 작성 워크플로우](#3-prd-작성-워크플로우)
4. [PRD 평가 워크플로우](#4-prd-평가-워크플로우)
5. [GitHub으로 문서 관리하기](#5-github으로-문서-관리하기)
6. [문서 구조 & 네이밍 규칙](#6-문서-구조--네이밍-규칙)
7. [자주 묻는 질문](#7-자주-묻는-질문)

---

## 1. Playbook이란?

PM 조직의 모든 기획·설계·운영 문서를 **Markdown + GitHub**으로 단일 관리하는 시스템입니다.

| 기존 방식 | Playbook 방식 |
|-----------|--------------|
| Notion·Confluence에 분산 저장 | GitHub 한 곳에서 버전 관리 |
| 문서 소유자 불명확 | 커밋 기록으로 작성자·변경 이력 자동 추적 |
| 수동 리뷰·피드백 | Claude 평가 프롬프트로 자가 점검 가능 |
| 도메인 지식 개인화 | `context/` 폴더에 팀 공유 도메인 지식 축적 |

---

## 2. 역할별 빠른 시작

### PM이라면

```
새 프로젝트 PRD 만들어줘. 제품명은 "검색 랭킹 개선", 목표는 검색 CTR 향상이야.
```

Claude가 `projects/26Q3_Search-Ranking/prd/PRD.md`와 `2pager.md`를 자동 생성합니다.

작성 후 자가 평가:

```
이 PRD를 리더십 관점에서 평가해줘. docs/evaluation/eval-leadership.md의 기준을 사용해.
```

---

### Designer라면

```
이 PRD의 시나리오와 UI/UX 플로우가 와이어프레임을 그리기에 충분한지 평가해줘.
docs/evaluation/eval-design.md 기준으로.
```

부족한 부분이 있으면 PM에게 구체적으로 요청할 수 있습니다.

---

### EM이라면

```
이 PRD의 공수 산정과 비용 추정이 현실적인지 평가해줘.
docs/evaluation/eval-engineering.md 기준으로.
```

P0 스코프 조정이 필요하면 PM과 협의합니다.

---

## 3. PRD 작성 워크플로우

### Step 1: 준비물 확인

[PRD 생성 준비물 가이드](docs/references/prd-generation-prerequisites.md)의 체크리스트를 확인합니다.

필수 준비물:
- 비즈니스 목표 / OKR (Objectives and Key Results, 목표 및 핵심 결과)
- 해결할 사용자 문제 (데이터 근거 포함)
- 성공 지표 (KPI) 정의
- 일정·예산 제약
- 팀 구성

### Step 2: 도메인 컨텍스트 준비

관련 도메인 지식이 `context/` 폴더에 있는지 확인합니다. 없으면 유관 부서에서 수집하여 저장합니다.

### Step 3: Claude에게 PRD 생성 요청

```
새 프로젝트를 만들어줘.
- 제품명: [제품명]
- 문제: [해결할 문제 한 줄]
- 목표: [성공 시 기대하는 지표 변화]
- 대상: [핵심 사용자]
- 일정: [출시 목표]
- context/ 폴더의 [관련 파일]을 참고해줘
```

### Step 4: 리뷰·보완

Claude가 생성한 초안을 리뷰하고:
1. **숫자 검증**: Baseline/Target 값이 현실적인가?
2. **우선순위 조정**: P0/P1 분류가 맞는가?
3. **전략적 판단 보강**: AI가 못하는 Trade-off 결정 추가

### Step 5: 자가 평가 (3관점)

```
이 PRD를 3관점(리더십/디자이너/EM)으로 평가해줘.
docs/evaluation/ 폴더의 평가 기준을 사용해.
```

### Step 6: 미달 항목 보완 → 리뷰 요청

점수가 낮은 항목을 집중 보완한 후, Status를 `In Review`로 변경합니다.

---

## 4. PRD 평가 워크플로우

### 자가 평가 (PRD 작성자)

PRD를 처음 공유하기 전에, 3개 관점의 Claude 평가 프롬프트를 실행합니다:

1. **리더십 관점**: [eval-leadership.md](docs/evaluation/eval-leadership.md)
2. **디자이너 관점**: [eval-design.md](docs/evaluation/eval-design.md)
3. **EM 관점**: [eval-engineering.md](docs/evaluation/eval-engineering.md)

각 평가 문서 하단의 **Claude 평가 프롬프트** 블록을 복사하여 사용합니다.

### 통과 기준

| 관점 | 만점 | 통과 점수 |
|------|------|----------|
| 리더십 | 35점 (가중) | 23점 이상 + 개별 최소 충족 |
| 디자이너 | 35점 (가중) | 23점 이상 + 개별 최소 충족 |
| EM | 35점 (가중) | 23점 이상 + 개별 최소 충족 |

3개 관점 모두 통과해야 PRD Status가 `Approved`로 전환됩니다.

---

## 5. GitHub으로 문서 관리하기

### 문서 저장 (커밋)

```
/github-publish
```

또는 직접:

```bash
git add .
git commit -m "docs: 검색 랭킹 PRD 초안 추가"
git push
```

### 커밋 메시지 규칙

`type: description` 형식. 한국어 기본.

| type | 용도 | 예시 |
|------|------|------|
| `docs` | 문서 추가·수정 | `docs: 검색 랭킹 PRD 초안 추가` |
| `fix` | 오류 수정 | `fix: KPI 지표 현재값 수정` |
| `refactor` | 구조 변경 | `refactor: 와이어프레임 폴더 구조 재정리` |

---

## 6. 문서 구조 & 네이밍 규칙

자세한 내용은 [CLAUDE.md](CLAUDE.md)를 참조하세요.

**핵심만 기억하세요**:

```
kebab-case       → 기본 (파일·폴더)
YYQ#_Title-Case  → 프로젝트 폴더 (예: 26Q3_Search-Ranking/)
UPPER.md         → SSOT 문서 (PRD.md, HLD.md)
```

---

## 7. 자주 묻는 질문

### "PRD를 Confluence에도 올려야 하나요?"

GitHub이 SSOT입니다. 필요한 경우 `/publish-wiki` 명령으로 Confluence에 발행할 수 있지만, 원본은 항상 GitHub에 유지합니다.

### "AI가 쓴 PRD를 그대로 써도 되나요?"

아닙니다. AI 초안은 **시작점**이지 최종본이 아닙니다. 숫자 검증, 우선순위 판단, 전략적 결정은 PM이 직접 해야 합니다.

### "3관점 평가를 꼭 다 해야 하나요?"

`Approved` 상태로 전환하려면 3관점 모두 통과가 필요합니다. 자가 평가로 먼저 점검하고, 미달 항목을 보완한 후 이해관계자 리뷰를 요청하세요.

### "도메인 지식은 어디에 저장하나요?"

`context/` 폴더를 사용합니다. [Context 폴더 사용 가이드](context/README.md)를 참조하세요.

### "기존 프로젝트를 여기로 옮길 수 있나요?"

네. `projects/` 하위에 네이밍 규칙에 맞게 폴더를 만들고, Master PRD 템플릿에 맞춰 기존 문서를 정리하면 됩니다.
