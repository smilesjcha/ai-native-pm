# how-to-work-better — Codex Harness Guide (AGENTS.md)

직장인 업무 생산성 향상 강의/워크숍 자료 레포입니다.
이 파일은 OpenAI Codex(및 AGENTS.md 규약을 따르는 에이전트) 전용 지침이며,
공통 규칙은 `docs/harness/common-guidelines.md`를 따릅니다.

## 레포 구조

- `lectures/<YYYYMMDD-강의명>/` — 강의별 독립 작업 공간. 모든 강의 관련 작업은 이 안에서만 수행.
  - `docs/` 강의 설계·커리큘럼·설문 분석
  - `design/` PPT 디자인 시스템·슬라이드 설계 문서
  - `build_pptx/` python-pptx 빌드 스크립트 (`build.py`가 진입점)
  - `materials/` 수강생 배포용 실습 자료 (ZIP 소스 디렉터리)
  - `dist/` 배포 ZIP, `output/` PPTX/PDF 산출물, `assets/` 이미지

## Codex 작업 규칙

1. 강의 폴더 밖의 파일을 수정하기 전에 반드시 사용자 확인을 받는다.
2. 문서는 한국어로 작성하고, 파일/폴더명은 ASCII만 사용한다.
3. PPT 수정 시 PPTX 바이너리를 직접 편집하지 말고 `build_pptx/slides_data.py`를 수정한 뒤
   `python3 build_pptx/build.py`로 재생성한다.
4. 디자인 값(색상·폰트·간격)은 `build_pptx/theme.py`와 `design/ppt-design-system.md`에서만 관리한다.
   슬라이드 코드에 하드코딩하지 않는다.
5. 빌드 후 QA: `soffice --headless --convert-to pdf` → `pdftoppm`으로 렌더링해
   텍스트 오버플로우·겹침·정렬 문제를 확인한 뒤 완료 보고한다.
6. 실습 데이터에 실제 개인정보/기업정보를 절대 포함하지 않는다.

## 검증 명령

```bash
python3 lectures/<lecture>/build_pptx/build.py          # 빌드 성공 여부
python3 -c "from pptx import Presentation; Presentation('lectures/<lecture>/output/<deck>.pptx')"  # 파일 무결성
```
