# AI Builder 트랙 — 머니핏 시안·프로토타입·데모 영상 제작 키트

> Status: In Review
> Document Type: Planning
> Product: KMAC 기획자 과정 M5 「생성형 AI를 활용한 기획자 업무생산성 향상」
> Last Updated: 2026-09-18
> Last Author: PM 차성재 with Claude Fable 5.1
> Owner: PM 차성재

> **교육용 가상 사례입니다.** "머니핏(MoneyFit)"과 "핀트리(FinTree)"는 이 강의를 위해 만든 가상 서비스·가상 회사이며, 실제 기업·상품·인물·수치와 무관합니다. 화면 안의 모든 수치는 `[가정]`이고, 인증·동의 문구는 컴플라이언스 확인 전 초안입니다. 설계 문서는 [`planning/13-ai-builder-track.md`](../../planning/13-ai-builder-track.md), 붙여넣기용 프롬프트는 [`prompts.md`](prompts.md)입니다.

## 결론부터

- Figma 없이 **디자인 토큰 → 코드 시안(HTML) → 동작 프로토타입 → 데모 영상(MP4) → 퍼널 차트**까지 한 폴더에서 만들고 재생성할 수 있게 했다. 산출 에셋 9개는 모두 `assets/builder/`에 있고, 아래 명령으로 다시 만들 수 있다.
- 실습 범위가 아니라 **강사 시연 + 가져가기 플레이북**용 자산이다. 수강생은 무료 웹 계정에서 "단일 HTML 시안" 한 장만 미니 체험(선택)한다.
- 실패한 단계는 없다. 단, `shoot.js`가 URL 쿼리를 받지 못해 프로토타입 화면 캡처는 **한 줄 인라인 스크립트**로 대체했고(아래 §3-3), 그 사유를 그대로 기록했다.

## 1. 이 폴더의 구성

| 파일 | 역할 | 비고 |
|------|------|------|
| `surfaces.html` | 머니핏 모바일 **지면 시안 보드** 4화면(온보딩·계좌 연동 / 홈 대시보드 / 목표 설정 2단계 / AI 코칭 카드·첫 저축 넛지). 각 화면의 AI 적용 지점을 Action Blue(`#0066cc`) 박스+라벨로 강조, 화면 아래 캡션(지면·AI 활용점·측정 이벤트) | 단일 파일. `docs/design-system/tokens/tokens.css`의 필수 토큰을 `:root`에 **인라인**(외부 링크 없음). 폰트는 시스템 고딕(Apple SD Gothic Neo → NanumGothic 폴백) |
| `prototype/index.html` | **동작 프로토타입** 390×844 디바이스 프레임. 상태기계 6개(연동 → 연동 중 → 소비 요약 → 목표 설정[1·2단계] → 코칭 카드 → 첫 저축 완료) + 클릭 전환 애니메이션 + 측정 이벤트 표시(`link_account`·`set_goal`·`first_saving`) | `?demo=1` 자동 재생(약 27초) → 끝나면 `window.__DEMO_DONE__ = true` · `?screen=N`으로 상태 고정(캡처용, 아래 §3-3) |
| `prompts.md` | 5단계 파이프라인 프롬프트 전문(머니핏 완성본 + 내 서비스 빈칸) | 수강생 배포 가능(가상 사례) |
| `README.md` | 이 문서 — 산출물 목록·재생성 명령·알려진 제약 | 강사용 |

## 2. 산출 에셋 목록 (`assets/builder/`, 2026-09-18 생성)

| # | 파일 | 규격 | 크기 | 용도(장표 삽입) | 결과 |
|---|------|------|-----:|----------------|------|
| 1 | `moneyfit-surfaces.png` | 2,960×2,046 px (1,480 CSS px · 2x · fullPage) | 636 KB | 지면 시안 보드 한 장 — "AI 적용 지점 4곳" | 성공 |
| 2 | `moneyfit-proto-01-link.png` | 960×1,840 px (480×920 · 2x) | 208 KB | 프로토 화면 ① 온보딩·계좌 연동 | 성공 |
| 3 | `moneyfit-proto-02-summary.png` | 960×1,840 px | 199 KB | 프로토 화면 ② 홈 대시보드·소비 요약 | 성공 |
| 4 | `moneyfit-proto-03-goal.png` | 960×1,840 px | 206 KB | 프로토 화면 ③ 목표 설정 2단계(AI 시뮬레이션) | 성공 |
| 5 | `moneyfit-proto-04-coach.png` | 960×1,840 px | 207 KB | 프로토 화면 ④ AI 코칭 카드·첫 저축 넛지 | 성공 |
| 6 | `moneyfit-proto-05-done.png` | 960×1,840 px | 180 KB | 프로토 화면 ⑤ 첫 저축 완료 | 성공 |
| 7 | `moneyfit-demo.mp4` | 480×920 · 27.5초 · 30 fps · H.264(yuv420p, faststart) | 828 KB | 데모 영상 — 연동 → 요약 → 목표 → 코칭 → 첫 저축 | 성공(Playwright 녹화 → ffmpeg 변환) |
| 8 | `moneyfit-demo-poster.png` | 480×920 px (영상 1초 프레임) | 136 KB | 영상 재생 불가 환경의 대체 정지 이미지 | 성공 |
| 9 | `moneyfit-funnel.png` | 2,000×1,125 px (16:9 · 200 dpi) | 131 KB | 퍼널 차트 — 제목 "목표 설정 → 첫 저축 전환이 가장 낮다 (71.0%)" | 성공(matplotlib 3.7 · Apple SD Gothic Neo) |

퍼널 차트 수치는 `workshop/sample-data/moneyfit-events.csv`의 **event별 고유 `user_id` 수(원본 그대로, 이상치 미제거)** 만 사용했다: signup 500 → link_account 387(77.4%) → set_goal 279(72.1%) → first_saving 198(71.0%) → d30_active 150(75.8%). `sample-data/README.md` 정답표와 일치한다. 이상치 3행을 제거하면 link_account가 385로 바뀌는 것은 M9 시연 소재이므로 차트에는 반영하지 않았다.

## 3. 재생성 방법 (레포 루트 기준 상대경로)

빌드 스크립트는 직전 강의의 파이프라인(`projects/26Q2_Fastcampus-Lecture/assets/build/`)을 그대로 재사용한다. 시스템 Chrome을 Playwright `channel: 'chrome'`으로 쓰므로 Chromium 다운로드가 없다.

### 3-1. 설치 (최초 1회)

```bash
cd projects/26Q2_Fastcampus-Lecture/assets/build
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install playwright     # 2026-09-18 실행: playwright 1.63.0 설치됨
# 영상 녹화가 실패할 때만: npx playwright install ffmpeg      # 이번 제작에서는 필요하지 않았다
```

### 3-2. 지면 시안 보드 PNG

```bash
cd projects/26Q2_Fastcampus-Lecture/assets/build
node shoot.js ../../../26Q3_AI-Native-PM/workshop/builder/surfaces.html \
  ../../../26Q3_AI-Native-PM/assets/builder/moneyfit-surfaces.png 1480 fullPage
```

### 3-3. 프로토타입 화면 PNG 5장 (`?screen=N`)

`shoot.js`는 파일 경로를 `pathToFileURL`로 바꾸기 때문에 `index.html?screen=3`처럼 쿼리를 붙이면 `%3F`로 인코딩되어 **다른 파일명으로 열린다**. 그래서 `shoot.js`는 수정하지 않고, 같은 Playwright를 쓰는 한 줄 스크립트로 캡처했다(같은 폴더에서 실행 · 480×920 · 2x).

```bash
cd projects/26Q2_Fastcampus-Lecture/assets/build
shot() { node --input-type=module -e '
import { chromium } from "playwright"; import path from "path"; import { pathToFileURL } from "url";
const [html, out, q] = process.argv.slice(1);
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await b.newPage({ viewport: { width: 480, height: 920 }, deviceScaleFactor: 2 });
await p.goto(pathToFileURL(path.resolve(html)).href + "?" + q, { waitUntil: "networkidle" });
await p.waitForTimeout(1400); await p.screenshot({ path: path.resolve(out) }); await b.close(); console.log("shot →", out);
' -- "$@"; }
P=../../../26Q3_AI-Native-PM/workshop/builder/prototype/index.html
O=../../../26Q3_AI-Native-PM/assets/builder
shot $P $O/moneyfit-proto-01-link.png    "screen=1"
shot $P $O/moneyfit-proto-02-summary.png "screen=2"
shot $P $O/moneyfit-proto-03-goal.png    "screen=3&step=2"
shot $P $O/moneyfit-proto-04-coach.png   "screen=4"
shot $P $O/moneyfit-proto-05-done.png    "screen=5"
```

| 파라미터 | 화면 | 비고 |
|----------|------|------|
| `?screen=1` | 온보딩·계좌 연동 | 기본 화면과 동일 |
| `?screen=2` | 홈 대시보드·소비 요약 | 카테고리 막대 애니메이션 완료 상태 |
| `?screen=3` · `&step=1|2` | 목표 설정 1단계 / 2단계 | `step=2`는 비상금 300만 원·월 30만 원 선택 + AI 시뮬레이션 문구가 채워진 상태 |
| `?screen=4` | AI 코칭 카드·첫 저축 넛지 | |
| `?screen=5` | 첫 저축 완료 | 체크 애니메이션 완료 상태 |
| `?demo=1` | 자동 재생 | 가상 커서가 9번 클릭 · 약 27초 · 종료 시 `window.__DEMO_DONE__ = true` |

### 3-4. 데모 영상 MP4 + 포스터

```bash
cd projects/26Q2_Fastcampus-Lecture/assets/build
node record-proto.js ../../../26Q3_AI-Native-PM/workshop/builder/prototype/index.html \
  ../../../26Q3_AI-Native-PM/assets/builder/moneyfit-demo.mp4
# → moneyfit-demo.mp4 + moneyfit-demo-poster.png (스크립트가 함께 생성). 시스템 ffmpeg(/opt/homebrew/bin/ffmpeg) 사용
```

### 3-5. 퍼널 차트 PNG

Python 3 + matplotlib(3.7에서 확인)만 필요하다. 아래를 임시 파일(예: `funnel.py`)로 저장해 실행한다. 한글 폰트는 `Apple SD Gothic Neo → AppleGothic → NanumGothic` 순으로 있는 것을 쓴다.

```bash
python3 funnel.py projects/26Q3_AI-Native-PM/workshop/sample-data/moneyfit-events.csv \
  projects/26Q3_AI-Native-PM/assets/builder/moneyfit-funnel.png
```

```python
# funnel.py — event별 고유 user_id 수만 사용 (교육용 가상 데이터)
import csv, sys
from collections import defaultdict
import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch
from matplotlib import font_manager as fm

CSV, OUT = sys.argv[1], sys.argv[2]
avail = {f.name for f in fm.fontManager.ttflist}
plt.rcParams["font.family"] = [f for f in ["Apple SD Gothic Neo", "AppleGothic", "NanumGothic"] if f in avail] or ["sans-serif"]
plt.rcParams["axes.unicode_minus"] = False

users = defaultdict(set)
with open(CSV, newline="", encoding="utf-8") as f:
    for r in csv.DictReader(f): users[r["event"]].add(r["user_id"])
order = ["signup", "link_account", "set_goal", "first_saving", "d30_active"]
label = {"signup": "가입", "link_account": "계좌 연동", "set_goal": "목표 설정", "first_saving": "첫 저축", "d30_active": "30일 활성"}
n = [len(users[e]) for e in order]; base = n[0]
conv = [None] + [n[i] / n[i - 1] for i in range(1, len(n))]
weak = min(range(1, len(n)), key=lambda i: conv[i])          # 직전 대비 전환이 가장 낮은 구간

INK, MUTED, BLUE, GRAY = "#1d1d1f", "#7a7a7a", "#0066cc", "#c9c9ce"
fig = plt.figure(figsize=(10, 5.625), dpi=200, facecolor="white")
ax = fig.add_axes([0.20, 0.16, 0.56, 0.60]); ax.set_xticks([]); ax.set_yticks([])
for s in ax.spines.values(): s.set_visible(False)
ax.set_xlim(0, base * 1.02); ax.set_ylim(-0.6, len(n) - 0.4); ax.invert_yaxis()
H = 0.46
for i, (e, v) in enumerate(zip(order, n)):
    hi = i == weak
    ax.add_patch(FancyBboxPatch((0, i - H / 2), v, H, boxstyle="round,pad=0,rounding_size=0.12", linewidth=0,
                                facecolor=BLUE if hi else GRAY, mutation_aspect=1 / (base / 5.0) * 0.9))
    ax.text(-base * .015, i, label[e], ha="right", va="center", fontsize=12.5, color=INK, fontweight="bold" if hi else "normal")
    ax.text(-base * .015, i + .27, e, ha="right", va="center", fontsize=8.5, color=MUTED, family=["Menlo", "monospace"])
    ax.text(v + base * .012, i, f"{v:,}명  ·  {v / base * 100:.1f}%", ha="left", va="center", fontsize=11.5, color=INK, fontweight="bold" if hi else "normal")
    if i: ax.text(v + base * .012, i - .5, f"직전 대비 {conv[i] * 100:.1f}%" + ("  ← 가장 낮음" if hi else ""), ha="left", va="center",
                  fontsize=9.5, color=BLUE if hi else MUTED, fontweight="bold" if hi else "normal")
fig.text(.06, .915, f"{label[order[weak - 1]]} → {label[order[weak]]} 전환이 가장 낮다 ({conv[weak] * 100:.1f}%)", fontsize=19, fontweight="bold", color=INK)
fig.text(.06, .855, f"가입자 {base:,}명 중 첫 저축 도달 {n[3]:,}명({n[3] / base * 100:.1f}%) · 단계별 전환은 {min(c for c in conv if c) * 100:.1f}–{max(c for c in conv if c) * 100:.1f}%로 한 곳이 아니라 매 단계에서 빠진다", fontsize=11, color=MUTED)
fig.text(.06, .05, "교육용 가상 데이터 · workshop/sample-data/moneyfit-events.csv · 단계별 고유 user_id 수 · 원본 그대로(이상치 미제거) · 추출 기준일 2026-10-05 [가정] · 머니핏(MoneyFit) by 핀트리(FinTree)", fontsize=8.5, color=MUTED)
fig.text(.94, .915, "MoneyFit 퍼널", fontsize=10, color=MUTED, ha="right")
fig.savefig(OUT, dpi=200, facecolor="white"); print(dict(zip(order, n)), "→", OUT)
```

## 4. 제작 기록·알려진 제약 (정직하게)

| 항목 | 기록 |
|------|------|
| 실행 환경 | macOS · Node 25 · Playwright 1.63.0(`PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`, 시스템 Chrome) · 시스템 ffmpeg · Python 3 + matplotlib 3.7 |
| 영상 녹화 | 1회차 26.3초 성공 → 코칭 카드 화면이 3초 미만이어서 `demo()`의 대기를 1.4초 → 2.6초로 늘려 재녹화(27.5초). `npx playwright install ffmpeg`·Chrome 헤드리스 폴백은 **사용하지 않았다** |
| 화면 캡처 | `shoot.js`가 쿼리스트링을 지원하지 않아 §3-3 인라인 스크립트 사용. `shoot.js`·`record-proto.js`는 수정하지 않았다 |
| 첫 캡처 수정 | 카테고리 막대(`.fill`)가 인라인 `<span>`이라 폭이 0으로 그려졌다 → `display:block` 추가 후 보드·화면 ②를 재캡처 |
| 폰트 | 시스템 고딕을 쓰므로 Windows·Linux에서 렌더하면 글자 폭이 달라 줄바꿈이 바뀔 수 있다. 장표 삽입용 PNG는 이 폴더의 파일을 그대로 쓴다 |
| 수치 | 화면 안 숫자는 전부 `[가정]`(1,284,300원·18%·10개월 등). 퍼널 차트만 CSV 집계값 |
| 보안 | 실제 기관·상품·고객 정보 없음(은행 A·카드사 B·은행 C). 동의·인증 문구는 컴플라이언스 확인 전 초안이며 화면에 그렇게 표기했다 |
| 커밋 | 이 키트는 git 커밋·푸시하지 않았다(리뷰 후 결정). `node_modules/`는 26Q2 빌드 폴더의 `.gitignore`가 제외한다 |

<details>
<summary>Change Log</summary>

| 날짜 | 작성자 | 변경 내용 |
|------|--------|----------|
| 2026-09-18 | PM 차성재 with Claude Fable 5.1 | 초안 — 머니핏 지면 시안 보드(`surfaces.html`)·동작 프로토타입(`prototype/index.html`, `?demo=1`·`?screen=N`) 작성, 에셋 9개(보드 PNG·화면 PNG 5·MP4·poster·퍼널 PNG) 생성 기록, 재생성 명령(설치·보드·화면·영상·차트), 제작 기록·제약(shoot.js 쿼리 미지원 → 인라인 스크립트, 막대 `display:block` 수정, 재녹화 1회) |

</details>
