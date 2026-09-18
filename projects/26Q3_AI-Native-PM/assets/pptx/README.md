# assets/pptx — 교안 PPT 빌드

> 내용 확정(`planning/00-review-checklist.md` D 게이트) 후 `generate.js`를 작성한다. 빌더 함수는 `projects/26Q2_Fastcampus-Lecture/assets/pptx/generate-v05.js`를 기반으로 재사용하고, 디자인 규칙은 `docs/design-system/ppt-design-guide.md`를 따른다.

```bash
npm install          # 최초 1회 (node_modules는 커밋하지 않음)
npm run build        # → kmac-m5-ai-pm-productivity-20260919.pptx
```

PDF 내보내기와 렌더 QA 절차는 `../../claude.md` §PPT 제작 기준 참고.
