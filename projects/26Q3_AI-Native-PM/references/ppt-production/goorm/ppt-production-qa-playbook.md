# Goorm PPT Production QA Playbook

이 문서는 Goorm 발표 자료를 만들 때 반복해서 적용할 제작, 유효성 체크, 품질 개선 기준을 정리한 작업 노하우입니다.

## 기본 원칙

- 최종 산출물은 Goorm 맥락만 남긴다. 타사 교육 브랜드명, 임시 벤치마크 출처명, 내부 작업 경로는 발표 장표와 appendix에 남기지 않는다.
- PPTX만 확인하지 않고 항상 PDF로 변환한 뒤 PNG로 렌더링해서 실제 발표 화면 기준으로 본다.
- 텍스트가 깨질 때는 폰트를 무리하게 줄이기보다 문장을 줄이고, 카드 폭과 줄바꿈을 의도적으로 다시 설계한다.
- 디자인 토큰은 `designs/design-tokens.json`, 컴포넌트 규칙은 `designs/component-guide.md`에 맞춘다.
- footer, 페이지 번호, 섹션 eyebrow, 제목 계층은 전체 장표에서 같은 위치와 톤을 유지한다.

## 제작 전 체크

- 발표 대상, 시간, Q&A 비중, 필수 문구, 금지 문구를 먼저 분리한다.
- 강의 목차는 45-50분 본 강의와 10-15분 Q&A 흐름으로 나눈다.
- 외부 웹사이트 캡처나 기술 레퍼런스는 출처를 남기되, 최종 장표에는 발표에 필요한 링크만 남긴다.
- Goorm 회사 자료에서는 appendix도 외부 작업명 대신 공식 사이트, 로컬 디자인 토큰, 커리큘럼 파일 중심으로 정리한다.

## 디자인 QA 체크리스트

- 표지: 제목, 일시, 연사 정보, 과정명, 핵심 메시지가 서로 겹치지 않는지 확인한다.
- 컬러: Navy, near-black, white, parchment 계열이 의도한 대비를 유지하는지 PDF에서 본다.
- 타이포그래피: 제목은 한 줄 의도면 절대 두 줄로 내려가지 않게 폭을 확보한다.
- 카드: 카드 안 텍스트는 상하 중앙감과 좌우 여백이 안정적인지 확인한다.
- 루프/프로세스: 단계 카드의 설명 텍스트가 카드 밖으로 밀리지 않도록 높이, 줄 수, line-height를 고정한다.
- 연결선: 점, 선, 화살표는 중심축이 맞고 중간에 끊겨 보이지 않아야 한다.
- 긴 영문: `SECURITY`, `Design System`, URL, 도구명은 한 글자만 다음 줄로 떨어지는지 확인한다.
- 마지막 문장: 한국어 문장이 `입니 / 다`처럼 어색하게 분리되면 직접 줄바꿈을 넣거나 문장을 줄인다.

## 렌더링 QA 절차

1. PPTX를 생성한다.
2. LibreOffice 또는 PowerPoint로 PDF 변환을 수행한다.
3. `pdftoppm`으로 PDF 전체 페이지를 PNG로 렌더링한다.
4. 전체 contact sheet를 만들어 큰 흐름, 깨진 글자, 여백 붕괴를 한 번에 훑는다.
5. 수정이 있었던 장표는 full-size PNG로 다시 확인한다.
6. PPTX inspect 로그에서 오류, overflow, missing, failed 같은 단어를 검색한다.
7. 발표용 금지 표현이 남아 있지 않은지 PPTX inspect 로그와 소스 파일을 함께 검색한다.

## 자주 쓰는 확인 명령

```bash
/opt/homebrew/bin/soffice --headless --convert-to pdf --outdir outputs outputs/ai-campus-prism-agentic-ai-lecture.pptx
pdftoppm -png -r 120 outputs/ai-campus-prism-agentic-ai-lecture.pdf /tmp/ppt-render/page
pdfinfo outputs/ai-campus-prism-agentic-ai-lecture.pdf | rg 'Pages|Page size|File size|PDF version'
rg -n 'ERROR|WARN|overflow|clip|missing|failed|NaN' outputs/*.inspect.ndjson
```

## 개선 패턴

- 긴 메타 정보는 한 텍스트 박스에 넣지 않고 의미 단위로 분리한다.
- 카드 내부의 본문은 2줄 이하로 설계하고, 3줄이 필요하면 카드 높이를 먼저 늘린다.
- 도형 안 텍스트는 `verticalAlign: "middle"` 또는 충분한 상하 여백으로 중앙감을 맞춘다.
- 제목이 길면 title width를 넓히거나 제목 자체를 줄인다.
- 설명 문장은 `한 장표에 좋은 한 문장`을 우선하고, 부연은 speaker notes로 옮긴다.
- 레퍼런스 장표는 링크 수보다 신뢰성과 발표 후 재방문 가능성을 우선한다.
- 수정 후에는 해당 장표만 보지 말고 앞뒤 장표와 섹션 흐름까지 다시 본다.

## 최종 납품 기준

- PPTX와 PDF가 같은 장수로 생성되어야 한다.
- footer 문구와 페이지 번호가 모든 장표에서 일관되어야 한다.
- contact sheet 기준으로 눈에 띄는 텍스트 잘림, 겹침, 어색한 줄바꿈이 없어야 한다.
- 최종 파일과 appendix에는 Goorm 발표 맥락에 맞는 출처만 남아야 한다.
- 수정한 내용은 최종 답변에서 장표 번호, 변경 이유, 검증 결과 중심으로 짧게 공유한다.
