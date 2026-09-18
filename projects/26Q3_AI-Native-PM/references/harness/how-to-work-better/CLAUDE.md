# how-to-work-better — Claude Harness Guide

직장인 업무 생산성 향상 강의/워크숍 자료를 관리하는 레포입니다.
이 파일은 Claude Code 전용 지침이며, 공통 규칙은 `docs/harness/common-guidelines.md`를 따릅니다.

## 레포 구조

```
how-to-work-better/
├── CLAUDE.md                  # Claude Code 하네스 지침 (이 파일)
├── AGENTS.md                  # Codex 하네스 지침
├── docs/harness/              # 공통 엔지니어링 규칙 (양쪽 하네스가 공유)
└── lectures/
    └── 20260723-worklife-ax-workshop/   # 강의별 독립 작업 공간
        ├── CLAUDE.md          # 강의 전용 Claude 지침
        ├── AGENTS.md          # 강의 전용 Codex 지침
        ├── docs/              # 강의 설계·커리큘럼·설문 분석
        ├── design/            # PPT 디자인 시스템·슬라이드 설계
        ├── build_pptx/        # python-pptx 기반 PPT 빌드 시스템
        ├── materials/         # 수강생 배포용 실습 자료 (ZIP 소스)
        ├── dist/              # 배포 ZIP 산출물
        ├── output/            # PPTX/PDF 산출물
        └── assets/            # 스크린샷·이미지
```

## 작업 원칙 (Claude)

1. **강의별 작업은 해당 강의 폴더 안에서만** 진행한다. 루트를 오염시키지 않는다.
2. 새 강의를 시작할 때는 `lectures/YYYYMMDD-강의명/` 폴더를 만들고 위 구조를 복제한다.
3. 문서는 한국어, 파일/폴더명은 ASCII(kebab-case 또는 snake_case)를 사용한다.
4. PPT는 반드시 각 강의의 `design/ppt-design-system.md`를 따르고, `build_pptx/build.py`로 재현 가능하게 생성한다.
5. 산출물(`output/`, `dist/`)은 커밋 대상이다 — 강의 현장에서 clone만으로 바로 쓸 수 있어야 한다.
6. 개인정보·기업 내부정보는 어떤 파일에도 넣지 않는다. 실습 데이터는 전부 가상의 교육용 샘플로 작성한다.

## 자주 쓰는 명령

```bash
# PPT 빌드
python3 lectures/<lecture>/build_pptx/build.py

# PPT 시각 QA (렌더링)
cd lectures/<lecture>/output && soffice --headless --convert-to pdf <deck>.pptx && pdftoppm -jpeg -r 100 <deck>.pdf slide

# 수강생 배포 ZIP 패키징
cd lectures/<lecture>/materials && zip -r ../dist/<zip-name>.zip ai-work-competency-workshop -x "*.DS_Store"
```

## PPT 품질 기준 (필수 QA)

- 텍스트가 도형/슬라이드 경계를 넘지 않는다 (개행 수를 고려해 박스 높이에 여유를 둔다).
- 도형·텍스트 겹침 금지.
- 상하/좌우 정렬과 카드 간 간격이 일관적이어야 한다 (동일 행 카드들은 같은 y·같은 높이).
- 빌드 후 반드시 전 슬라이드를 이미지로 렌더링해 육안 검수한다.
