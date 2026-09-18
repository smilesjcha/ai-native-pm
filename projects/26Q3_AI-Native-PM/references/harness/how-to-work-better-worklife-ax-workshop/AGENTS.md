# 2026 청년 여성 밸런스 워크숍 — Codex 작업 지침 (AGENTS.md)

- 강의: 「AI 시대의 업무 경쟁력과 생산성 향상」 / 2026-07-23(목) 13:00–17:00 온라인
- 레포 공통 규칙: `../../docs/harness/common-guidelines.md` 우선 적용

## 파일 소유권 (수정 대상 매핑)

| 바꾸고 싶은 것 | 수정할 파일 |
| --- | --- |
| 강의 내용·시간표 | `docs/02-curriculum.md` |
| 슬라이드 구성·순서 | `design/slide-plan.md` → `build_pptx/slides_data.py` |
| 색상·폰트·간격 | `build_pptx/theme.py` (+ `design/ppt-design-system.md` 동기화) |
| 레이아웃 종류 | `build_pptx/layouts.py` |
| 실습 자료 | `materials/ai-work-competency-workshop/` |

## 빌드·검증

```bash
python3 build_pptx/build.py                     # PPT 생성 → output/
cd output && soffice --headless --convert-to pdf *.pptx && pdftoppm -jpeg -r 100 *.pdf slide
cd materials && zip -r ../dist/WORK-LIFE-practice-kit.zip ai-work-competency-workshop -x "*.DS_Store"
```

## 스크린샷 캡처·삽입 워크플로우 (Codex 전용 작업)

브라우저(강사 무료 Claude 계정)에서 캡처해 PPT에 삽입하는 작업 절차:

1. 캡처 대상·파일명·포함 요소는 `docs/08-capture-guide.md`가 유일한 기준이다.
2. 실습 결과 캡처(free_03, free_05)는 반드시 `materials/ai-work-competency-workshop/`의
   실습 프롬프트와 샘플 데이터를 **그대로** 사용해 생성한 결과 화면이어야 한다 (수강생 결과와 일치 목적).
3. 캡처 파일은 `assets/screenshots/<지정 파일명>.png`로 저장한다. 파일명 변경 금지 —
   슬라이드가 파일명으로 이미지를 찾는다.
4. 저장 후 `python3 build_pptx/build.py` 실행 → 자동 삽입된다. slides_data.py 수정 불필요.
5. 검증: `cd output && soffice --headless --convert-to pdf worklife-ax-workshop.pptx &&
   pdftoppm -jpeg -r 80 worklife-ax-workshop.pdf slide` 후 shot 슬라이드
   (번호는 `design/slide-plan.md`의 shot 행 참조)를 열어 잘림·저해상도·개인정보 노출이 없는지 확인한다.
6. 캡처에 이메일 주소·프로필 사진이 노출되면 잘라내고 다시 캡처한다.
7. 완료 후 `assets/screenshots/NEEDED.md`의 체크박스를 갱신한다.

## 금지 사항

- PPTX 파일 직접 편집(항상 코드에서 재생성)
- 디자인 토큰 외 색상 사용, 참여자 실습 개수 확대, 실제 개인정보 포함
- `output/`·`dist/` 산출물을 빌드 없이 수동 수정
