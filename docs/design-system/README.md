# AI-Native PM Design System

> Status: Active
> Document Type: Design System
> Based on: [getdesign.md](https://getdesign.md/apple/design-md) — Apple `design-md` 분석
> Last Updated: 2026-06-26
> Last Author: PM 차성재 with Claude Opus 4.8
> Owner: PM 차성재

레포 전역에서 공유하는 **Apple 영감 디자인 시스템 + 디자인 토큰 인프라**. getdesign.md에서 내려받은 [`DESIGN.md`](./DESIGN.md)를 SSOT 분석 자료로 삼아, 토큰을 JSON → CSS → JS 세 포맷으로 코드화했다. 앱 개발(웹/모바일 웹)에서 바로 import 가능하다.

---

## 한 줄 철학

> **단일 Action Blue 액센트 · 사진 우선 · near-invisible UI.** 색 변화가 곧 구분선이고, 드롭섀도는 제품 이미지에만 단 하나 쓴다.

---

## 파일 구조

```
docs/design-system/
├── README.md              ← 이 문서 (개요 + 사용법)
├── DESIGN.md              ← getdesign.md에서 받은 Apple 분석 (SSOT 원본)
├── style-guide.html       ← 리빙 스타일 가이드 (토큰·컴포넌트 렌더링)
│
├── tokens/                ← 디자인 토큰 (3포맷, 단일 출처)
│   ├── tokens.json        ← W3C Design Tokens 포맷 — 진짜 SSOT
│   ├── tokens.css         ← CSS Custom Properties (:root 변수)
│   └── tokens.js          ← ESM export (앱에서 import)
│
├── styles/                ← 토큰 기반 스타일 레이어
│   ├── reset.css          ← 최소 reset
│   ├── base.css           ← 타이포그래피·표면 유틸리티
│   └── components.css     ← 컴포넌트 클래스 (.ds-btn, .ds-card, .ds-tile …)
│
├── icons/                 ← 아이콘 세트 (24×24 stroke, currentColor)
│   ├── index.json         ← 아이콘 매니페스트
│   ├── *.svg              ← 14종 (기분 5 + 입력/상태/액션)
│   └── png/*.png          ← PNG 래스터 (48px)
│
└── assets/                ← 브랜드 바이너리
    ├── app-icon.svg + app-icon-{1024,512,192,180}.png
    ├── logo.svg + logo.png
    └── og-image.png       ← 1200×630 소셜 카드
```

---

## 사용법

### 1. 웹에서 (CSS)

```html
<link rel="stylesheet" href="/docs/design-system/tokens/tokens.css" />
<link rel="stylesheet" href="/docs/design-system/styles/reset.css" />
<link rel="stylesheet" href="/docs/design-system/styles/base.css" />
<link rel="stylesheet" href="/docs/design-system/styles/components.css" />

<button class="ds-btn ds-btn--primary">메뉴 추천받기</button>
<div class="ds-card">…</div>
```

### 2. 앱 개발에서 (JS/TS import)

```js
import { color, typography, spacing, radius } from "@/design-system/tokens/tokens.js";

el.style.background = color.surface.parchment;   // #f5f5f7
el.style.borderRadius = radius.pill;             // 9999px
```

### 3. 디자이너/빌드 파이프라인에서 (JSON)

`tokens/tokens.json`은 W3C Design Tokens 포맷이라 Style Dictionary, Tokens Studio(Figma) 등으로 바로 변환 가능하다. **JSON만 수정하면 CSS·JS를 재생성**하는 것이 원칙.

---

## 토큰 요약

| 카테고리 | 핵심 값 |
|----------|---------|
| **Color** | Action Blue `#0066cc` (유일 액센트), ink `#1d1d1f`, parchment `#f5f5f7`, tile `#272729` |
| **Type** | display = SF Pro Display 600 (음수 트래킹), body = SF Pro Text 400 / **17px** / lh 1.47 |
| **Weight** | 사다리 300 / 400 / 600 / 700 — **500은 의도적 부재** |
| **Radius** | sm 8 · md 11 · lg 18 · **pill 9999** (시그니처 CTA) |
| **Spacing** | base 8px — 4/8/12/17/24/32/48/80(section) |
| **Shadow** | `3px 5px 30px rgba(0,0,0,.22)` — **제품 이미지 전용, 시스템 유일** |

---

## 적용 원칙 (Do / Don't)

**Do** — 모든 인터랙션은 Action Blue 하나로. 헤드라인은 음수 트래킹. 본문 17px. 라이트↔다크 타일 교차로 리듬. pill은 액션 신호.

**Don't** — 두 번째 액센트 색 금지. 카드·버튼·텍스트에 그림자 금지(그림자는 제품 이미지에만). 장식용 그라디언트 금지. weight 500 금지.

> 상세 근거는 [`DESIGN.md`](./DESIGN.md) §Do's and Don'ts 참고.

---

## 적용 사례

- **오늘의 점심 메이트** 와이어프레임 / 프로토타입 — `projects/26Q2_Fastcampus-Lecture/workshop/`
- Fastcampus 강의 — 디자인 시스템 인프라 + 화면 설계 워크플로우 사례로 인용

<details>
<summary>Change Log</summary>

| 날짜 | 작성자 | 변경 내용 |
|------|--------|----------|
| 2026-06-26 | PM 차성재 with Claude Opus 4.8 | 디자인 시스템 인프라 신규 구축 — DESIGN.md 배치, tokens(JSON/CSS/JS), styles, icons(SVG+PNG), assets, style-guide |

</details>
