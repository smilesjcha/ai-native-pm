# Codex / AGENTS 작업 지침 — 26Q3_AI-Native-PM

> `claude.md`와 동일한 프로젝트 컨텍스트를 AGENTS.md 규약을 따르는 에이전트(OpenAI Codex 등)용으로 정리한 파일. 충돌 시 레포 루트 `CLAUDE.md` → 이 폴더 `claude.md` → 이 파일 순으로 우선한다.
> 벤치마크: `references/harness/how-to-work-better/AGENTS.md`(파일 소유권 매핑형), `references/harness/llm-agent-and-workflow-automation/AGENTS.md`(리뷰 규칙형), `references/harness/how-to-work-better-samcheok-codex-demo/AGENTS.md`(시연 범위 제한형).

## 범위

- 이 폴더(`projects/26Q3_AI-Native-PM/`) 안에서만 파일을 만들고 수정한다. 폴더 밖(공용 `docs/`, 다른 프로젝트)을 바꾸기 전에는 사용자 확인을 받는다.
- 실제 개인정보·고객정보·기업 내부정보·로그인 정보·외부 전송은 금지한다. 샘플은 교육용 가상 사례로만 만들고 문서마다 표시한다.

## 파일 소유권 (바꾸고 싶은 것 → 수정할 파일)

| 바꾸고 싶은 것 | 수정할 파일 |
|---|---|
| 강의 시간표·쉬는시간 | `planning/02-timetable.md` (→ `03-curriculum-outline.md`의 시각 동기화) |
| 모듈 구성·순서·분 배분 | `planning/03-curriculum-outline.md` → 해당 `planning/0N-session-*-detail.md` |
| 장표 단위 메시지·노하우·시연·예상 질문 | `planning/04-session-1-detail.md` / `05-session-2-detail.md` / `06-session-3-detail.md` |
| 실습 프롬프트·가상 데이터·수강생 가이드 | `workshop/*.md`, `workshop/sample-data/` |
| 강사 소개 문구 | `planning/07-instructor-profile.md` |
| 열린 결정·리뷰 항목 | `planning/00-review-checklist.md` |
| 슬라이드 구성·아키타입 | `planning/09-slide-plan-draft.md` → `assets/pptx/generate.js` |
| 색상·폰트·간격 | `docs/design-system/ppt-design-guide.md`(공용, 확인 후) — 슬라이드 코드에 하드코딩 금지 |

## 작성 규칙

- 한국어 본문, 파일·폴더명은 kebab-case ASCII(레포 루트 `CLAUDE.md` 네이밍 규칙). 모든 문서에 메타 헤더 + 접이식 Change Log, 작성자는 `PM 차성재 with <AI 도구 모델명>`.
- 숫자는 제공된 원본(`source/`)에 있는 값만 사실로 쓴다. 목표 수치는 `[가정]`, 확인 전 내용은 `[확인 필요]`, 도구 기능·요금은 `[강의 전 확인]`.
- 실습 장표와 가이드는 "입력 → 결과 확인 → 한 번 수정" 3단계로 고정한다. 결과가 달라도 정상임을 명시한다.
- PPTX 바이너리를 직접 편집하지 않는다. `assets/pptx/generate.js`를 수정한 뒤 재생성한다.

## 빌드·검증

```bash
cd assets/pptx && node generate.js                         # PPTX 생성
soffice --headless --convert-to pdf --outdir . *.pptx       # PDF (PowerPoint AppleScript가 더 충실)
pdftoppm -png -r 110 <deck>.pdf /tmp/kmac-m5/page           # 전 장 렌더
python3 -c "from pptx import Presentation; p=Presentation('<deck>.pptx'); print(len(p.slides))"
```

완료 보고에는 장표 번호·변경 이유·검증 결과(잘림·겹침·안전 여백·PPTX/PDF 장수 일치)를 짧게 포함한다. 자동 검사 통과를 육안 검수 통과로 표현하지 않는다.
