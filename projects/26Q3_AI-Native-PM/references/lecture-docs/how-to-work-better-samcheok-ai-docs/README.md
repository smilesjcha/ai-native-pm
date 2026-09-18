# 생성형 AI로 완성하는 실무 기획서·보고서

삼척새일센터 · 2026년 10월 13일(화) 14:00–17:00 · 180분

기업 재직자·생성형 AI 입문자를 위한 실습 강의입니다. 핵심 실습은 무료 ChatGPT 웹 계정과 복사·붙여넣기로 진행합니다. 장소와 대면·온라인 여부는 협의 중입니다. 예시 문서와 데이터는 교육용 가상 사례이며 실제 무료 계정의 실행 기록이나 기업 성과가 아닙니다.

## 먼저 열 파일

- 발표: `output/samcheok-ai-docs-workshop.pptx` (68장).
- 같은 페이지 읽기용 발표 자료: `output/samcheok-ai-docs-workshop.pdf`.
- 수강생 시작: `materials/00-start-guide/start-guide.md` 또는 같은 이름의 PDF.
- 강사 진행표: `docs/01-lecture-runbook.md`.
- 강사용 정답: `docs/02-facilitator-answer-key.md`.
- 장표별 시간·해설·질문·예상 오답: `docs/06-slide-instructor-notes.md`.
- 근거·사진 라이선스: `docs/04-sources.md`.
- 최종 검수 결과: `docs/05-qa-report.md` 또는 같은 이름의 PDF.

읽기용 PDF는 대응하는 Markdown 원본과 같은 위치에 생성됩니다. Markdown의 `.md` 파일은 메모장이나 텍스트 편집기에서 열어 복사할 수 있습니다. 보고서·기획서의 완성 예시는 실제 A4 1페이지 PDF여야 합니다.

## 자료 구성

| 폴더 | 내용 |
| --- | --- |
| `materials/00-start-guide` | 파일 열기·복사 순서·실패 시 대체 동선 |
| `materials/01-report` | 원문, CSV/XLSX, 원샷 프롬프트, 1페이지 보고서 예시 |
| `materials/02-plan` | 원문, CSV/XLSX, 프롬프트, 담당·4주 일정·측정법이 있는 기획서 |
| `materials/03-review` | 의도적 오류 초안, 원샷 검수 프롬프트, 정답 검수표, 600자 이내 수정본 |
| `materials/04-templates` | 재사용 요청·보고서·기획서·검수 템플릿 |
| `materials/05-codex-demo` | 강사 확장 시연용 자료·AGENTS.md·프롬프트·완료 기준 |
| `materials/outputs` | 수강생 결과 저장 안내 |
| `build_pptx` | 재현 가능한 PPT 빌드 소스 |
| `design` | 디자인 시스템과 슬라이드 설계 |
| `assets` | 제공 프로필 사진, 라이선스 기록된 실무 사진, 도식과 문서 미리보기 |

## 배포 ZIP

- `dist/learner-practice.zip`: 수강생 실습 자료. 풀면 `samcheok-ai-docs-practice/` 아래에 00–05 실습 폴더와 outputs가 있습니다. 제작 스크립트는 제외합니다.
- `dist/complete-kit.zip`: 발표 PPTX/PDF, 실습 자료, 강사용 문서, 디자인·빌드 소스와 사용 자산을 포함합니다. 압축을 풀면 이 README가 있는 강의 폴더 구조가 유지됩니다.

완전판도 메일 요약 `docs/00-source-brief.*`와 `docs/sources/` 원본 프로필·첨부는 제외합니다. 원본 프로필에는 연락처가 있을 수 있으므로 이 제외 규칙을 유지합니다. `tmp/`, `dist/`, 캐시와 후보 사진은 ZIP에 포함하지 않습니다. ZIP은 로컬에서만 생성하며 외부 업로드나 메일 발송은 수행하지 않습니다.

## 재빌드 환경

작성 환경에서 확인한 버전은 Python 3.12.14, python-pptx 1.0.2, ReportLab 4.4.9, pypdf 6.10.0, LibreOffice 26.2.2.2, Poppler 26.02.0입니다. XLSX를 CSV에서 다시 만들 때는 Node.js 24.19.0과 `@oai/artifact-tool` 2.8.59를 사용합니다. 도구가 같아도 운영체제·폰트에 따라 줄바꿈이 달라지므로 PDF 렌더 검수는 다시 수행합니다.

일반 Python 환경의 필수 패키지는 다음과 같이 준비할 수 있습니다.

```bash
python3 -m pip install python-pptx==1.0.2 reportlab==4.4.9 pypdf==6.10.0 pdfplumber==0.11.9
```

`soffice`와 `pdftoppm` 명령은 PATH에서 실행 가능해야 합니다. PPT는 `build_pptx/theme.py`의 Apple SD Gothic Neo를 사용합니다. 현재 자료 PDF 변환기는 NanumGothic TTF 또는 설정된 한국어 TTF를 사용하므로, 실행 환경에 해당 글꼴을 준비하세요. 파일 생성 후 PDF 글꼴과 한글 표시를 확인합니다.

이 작업 환경에서는 기본 시스템 `python3`에 ReportLab이 없으므로, 아래 번들 Python을 사용합니다.

```bash
<HOME>/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 --version
```

Codex 번들 경로는 다른 컴퓨터에서 달라집니다. 그 환경의 Python·Node 실행 파일과 Node 패키지 경로로 바꾸어 실행하세요.

## 전체 재생성 순서

아래 명령은 강의 폴더를 현재 디렉터리로 한 예시입니다. 본 작업의 폴더는 `<HOME>/.codex/worktrees/a768/how-to-work-better/lectures/20261013-samcheok-ai-docs`입니다. 스크립트 자체는 실행 위치와 관계없이 자기 강의 폴더 안에서만 작업합니다.

```bash
python3 build_pptx/build_release.py --build-only
```

실행 순서는 실습 Markdown→PDF, 보고서·기획서 PDF 첫 페이지→미리보기 PNG, PPTX 재빌드, LibreOffice PDF 변환, 전체 장표 PNG 렌더, 강사용 문서 PDF 생성, 자동 검증입니다. 문서 미리보기를 PPT보다 먼저 만들어 최신 배포 예시와 장표를 맞춥니다.

XLSX도 재생성하려면 `@oai/artifact-tool`이 Node에서 import 가능하거나, `CODEX_RUNTIME_NODE_MODULES`에 번들 패키지 디렉터리를 지정해야 합니다. 수강생에게 이 환경을 설치하도록 요구하지 않습니다.

```bash
CODEX_RUNTIME_NODE_MODULES=<HOME>/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules \
<HOME>/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 \
build_pptx/build_release.py --build-only --rebuild-xlsx \
--node <HOME>/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node
```

`--rebuild-xlsx`를 생략해도 기존 XLSX와 CSV의 모든 셀 값을 비교합니다. 내용이 다르면 검증을 통과하지 못합니다. XLSX 생성 자체는 `materials/scripts/build_workbooks.mjs`에서 담당합니다.

시각 검수 후 기존 결과를 다시 검증하고 ZIP을 만들려면 다음 명령을 실행합니다.

```bash
python3 build_pptx/build_release.py --package-only
```

옵션 없이 실행하면 빌드·렌더·자동 검증·ZIP 생성까지 연속 수행합니다. 자동 검증은 전 페이지의 눈으로 보는 검수를 대신하지 않습니다. 생성되는 `output/release-validation.json`은 자동 검사 범위와 파일 해시를 기록합니다.

## 수정 위치와 검수

장표 내용은 `build_pptx/slides_data.py`, 색·폰트·간격은 `build_pptx/theme.py`와 `design/ppt-design-system.md`, 배치는 `build_pptx/layouts.py`에서 관리합니다. PPTX 바이너리를 직접 수정하면 다음 빌드에서 사라집니다. 실습 내용은 `materials/`의 Markdown·CSV를 수정한 뒤 다시 생성합니다. Mermaid는 `.mmd` 원본을 수정하고 PNG를 재렌더한 뒤 PPT를 빌드합니다.

Mermaid CLI를 별도 사용할 수 있는 환경에서는 다음처럼 도식을 재렌더합니다. 현재 PNG는 함께 제공되므로 일반적인 장표·문서 재빌드에는 Mermaid 설치가 필수가 아닙니다.

```bash
mmdc --input assets/flows/document-cycle.mmd \
--output assets/flows/document-cycle.png --scale 3 --backgroundColor transparent
```

자동 검증은 68장·180분, 구간별 15/25/40/10/35/30/15/10분, 14:00–17:00 연속 시간표, PPTX/PDF 페이지 일치, 모든 실습 MD의 PDF 동반, 1페이지 결과 예시, 600자 이내 수정본, CSV–XLSX 셀 일치를 검사합니다. 검사 성공을 시각 검수 성공으로 해석하지 않습니다.

도형 내부 텍스트 경계는 PDF 생성 후 `python3 build_pptx/qa_deck.py`로 추가 검사합니다. PDF의 실제 글자 좌표를 PPTX 텍스트 상자·표 셀과 대조하며, 결과는 `tmp/qa-text-bounds.json`에 기록됩니다. PDF 렌더링 차이를 고려한 허용 오차는 2pt입니다. 이 검사도 이미지 안의 글자나 시각적 겹침을 모두 판정하지는 않습니다.

`tmp/final-render/slide-01.png`부터 마지막 장표까지 개별 확대해 제목·표·본문·오른쪽 도형의 마지막 줄, 도형 내부 여백, 겹침·잘림을 확인합니다. 실습 PDF도 모든 페이지를 확인하며 표 제목과 문단의 페이지 경계, 표 헤더 대비, XLSX 행 높이와 열 너비를 점검합니다. 결과와 남은 제약을 `docs/05-qa-report.md`에 기록합니다.

강의 전에는 장소·운영 방식 협의 결과, 무료 ChatGPT 로그인, 공식 제품 문서와 실제 계정 한도, Codex 시연 계정의 `gpt-5.6-terra` / `high` 선택 가능 여부를 확인합니다. 제품 메뉴가 달라지거나 시연이 지연되면 배포된 교육용 모범 파일을 열어 파일 검토 과정을 진행합니다.
