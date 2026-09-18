# QA-REPORT — KMAC M5 교안 덱 빌드·렌더 QA (2026-09-18)

> Status: In Review
> Document Type: QA Report
> Product: KMAC 기획자 과정 M5 「생성형 AI를 활용한 기획자 업무생산성 향상」
> Last Updated: 2026-09-18
> Last Author: PM 차성재 with Claude Fable 5.1
> Owner: PM 차성재
> 대상 파일: `kmac-m5-ai-pm-productivity-20260919.pptx` · `kmac-m5-ai-pm-productivity-20260919.pdf`(soffice 렌더 QA 프록시) · 렌더 샘플 `render-samples/p-NNN.png`
> 기준 문서: [`LIB-API.md`](LIB-API.md) · [`../../../../docs/design-system/ppt-design-guide.md`](../../../../docs/design-system/ppt-design-guide.md) §8 · [`../../references/ppt-production/goorm/ppt-production-qa-playbook.md`](../../references/ppt-production/goorm/ppt-production-qa-playbook.md) · [`../../references/ppt-production/llmops-16week/PPT_PRODUCTION_GUIDELINE.md`](../../references/ppt-production/llmops-16week/PPT_PRODUCTION_GUIDELINE.md) §9 · [`../../planning/14-slide-plan-v2.md`](../../planning/14-slide-plan-v2.md)

## 결론부터

- **PPTX 252장 = PDF 252페이지**(python-pptx · pdfinfo 일치). 블록별 78 / 83 / 91장. 슬라이드 플랜 v2 기대 장수 232(78 / 76 / 78)보다 **+20장** — 전부 프롬프트 전문 장표의 (1/2)(2/2)(3/3) 분할과 보조 박스(B2-68 하단 박스 · B3-71 (2/2))에서 나온 것이며, **모듈 순서·장표 ID·플랜 대응은 바꾸지 않았다.**
- 빌드 경고 **최종 40건 = `[missing-image]` 33건(캡처 placeholder, 예정된 상태) + `[small-font]` 7건(프롬프트 전문 2단 10pt)**. **`[overflow]` 0건**, `[title-length]`·`[title-lines]`·`[subtitle-lines]`·`[kicker-lines]`·`[count]` 0건.
- 육안 검수: 전 252장을 12장 단위 contact sheet 21장으로 1차 전수 스캔 + 원본 크기(80dpi) 개별 확인 **110장 이상**. 1차 렌더에서 발견한 **겹침·잘림 5건과 표기 유출 1건을 lib.js 5곳·slides-block 3곳에서 수정**하고 3회 재빌드·재렌더로 재확인했다.
- 금지 표현 검사: `010-XXXX-XXXX` · `/Users/` · `@gmail` **0건**(1차 빌드에서 이미지 `descr` 속성에 절대경로 11건이 들어가던 것을 lib.js `altText`로 차단).
- 폰트: PDF 임베드 = NanumGothic · NanumGothicBold · NanumGothicExtraBold만(기호용 OpenSymbol · AppleSymbols · STIXTwoMath는 `✓ □ ▶ ⏱` 등 심볼에만 대체). 본문 폰트 대체 없음.

## 1. 장수·유형 분포

| 블록 | 장수 | 강의 | 시연 | 실습단계 | 캡처 | 참고 | 표 장표 | 실제 이미지 | 캡처 placeholder |
|------|-----:|-----:|-----:|--------:|-----:|-----:|-------:|----------:|---------------:|
| 블록 1 (슬라이드 1–78) | 78 | 35 (+표지 1) | 2 | 15 | 10 | 15 | 18 | 2 | 16 |
| 블록 2 (79–161) | 83 | 27 | 1 | 22 | 8 | 25 | 16 | 2 | 8 |
| 블록 3 (162–252) | 91 | 31 | 5 | 23 | 8 | 24 | 17 | 7 | 9 |
| **합계** | **252** | **93** (+표지) | **8** | **60** | **26** | **64** | 51 | 11 | 33 |

- 플랜 v2 유형 분포(강의 94 · 시연 8 · 실습단계 54 · 캡처 26 · 참고 50) 대비: 실습단계 +6 · 참고 +14는 프롬프트 전문 분할(예: B2-15·16 → 3장, B3-67·68 → 8장), 강의 −1은 표지(pill 없음)를 제외한 집계 차이.
- 시연 8장 중 영상 장표(B3-51, 슬라이드 216)는 MP4 임베드 + poster — PDF에서는 poster 정지 이미지로 보이며 캡션에 자동 표기됨.
- 발표자 노트: 252 / 252장 모두 존재.

## 2. 자동 검사 결과(빌드 로그 · 최종 4차)

| 태그 | 1차 빌드 | 최종 | 비고 |
|------|--------:|-----:|------|
| `[overflow]` | 0 → (2차 lib 보정 후 7) | **0** | 1차는 표·체크리스트 추정치가 낮아 겹침을 놓친 상태(§3). TABLE_LH 1.22 보정 후 7장 경고 → 셀 문장 축약으로 0 |
| `[missing-image]` | 33 | 33 | cap-01~31 중 27종 파일 미확보 → placeholder(§5) |
| `[small-font]` | 9 | 7 | 프롬프트 전문 2단 10pt(슬라이드 43 · 58 · 125 · 147 · 150 · 184 · 234). 전문 글자 수정 금지 규칙상 분할 외 대안 없음 — 육안으로 판독 가능 확인 |
| `[title-length]` · `[title-lines]` · `[subtitle-lines]` · `[kicker-lines]` · `[count]` | 0 | 0 | |
| 금지 표현(`010-` · `/Users/` · `@gmail`) | 11 (`/Users/`, 이미지 descr) | **0** | lib.js `image()` altText = 파일명 |

## 3. 육안 확인 장표와 결과

### 3.1 방법

1. `node generate.js` → `soffice --headless --convert-to pdf` → `pdftoppm -png -r 80` 전 장 렌더(4회 반복).
2. 12장 × 21매 contact sheet로 **전 252장 1차 스캔**(겹침·잘림·여백 붕괴·빈 placeholder·폰트 대체).
3. 표지·divider 3장·프롬프트 장표 전부(31장)·표 장표 전부(51장 중 contact sheet 확인 + 원본 크기 24장)·카드 4열·5열 장표·캡처 장표·마무리를 **원본 크기로 개별 확인**(아래 목록).
4. 수정한 장표는 재빌드 후 원본 크기로 재확인.

### 3.2 원본 크기 확인 목록(슬라이드 번호)

- 표지·소개·오프닝: 1, 2, 3, 4, 5, 6, 7, 8, 9
- Divider 4장: 10(블록1 M1), 25(M2), 52(M3), 79(블록2), 162(블록3), 120(실습③), 231(마무리 closing)
- 프롬프트 장표(promptBlock·전문): 31, 43, 44, 46, 47, 58, 59, 61, 93, 99, 125, 147, 150, 166, 172, 184, 185, 232, 236 + contact sheet로 94·95·100·101·123·124·129·130·134·139·146·148·149·151·152·153·154·173·174·175·177·188·189·202·204·233·234·235·237·238·239·240·241·242·243·245
- 표 장표: 5, 11, 12, 13, 16, 33, 63, 65, 68, 102, 107, 110, 112, 116, 155, 156, 165, 179, 194, 196, 210, 220, 244, 248, 250, 252
- 카드·프로세스(4열·5열 포함): 14, 23, 26, 28, 55, 81, 104, 106, 113, 121, 163, 181, 206, 212, 213, 249
- 체크리스트: 8, 21, 60, 96, 105, 111, 141, 142, 228, 230
- 캡처·이미지: 9, 17, 18, 22, 37, 38, 62, 89, 108, 131, 167, 170(실제 퍼널 차트), 198, 214, 215, 216(영상 poster), 217, 218, 219(AI Builder cap-23)
- Statement·기타: 15, 35, 51, 56, 64, 80, 83, 178, 192, 205, 226, 229

### 3.3 발견 → 수정 (1차 렌더 기준)

| # | 슬라이드 | 증상 | 원인 | 수정 위치 | 재확인 |
|---|---------|------|------|----------|--------|
| 1 | 12 (B1-12 표) | 표 마지막 행이 하단 note 문장을 덮음 | `table()` 행 높이 추정 em 1.12 — LibreOffice 나눔고딕 자연 행간(≈1.33)보다 낮아 2줄 셀을 과소 추정, 경고 없이 넘침 | `lib.js` `TABLE_LH = 1.22` 도입(1.33은 정상 표도 경고하는 과대 → 실측 절충) + B1-12는 자동 폰트 축소로 해소 | ✔ 4차 렌더 |
| 2 | 228 (B3-63 체크리스트) | 6번째 항목이 2줄 note 박스와 겹침 | `checklist()` 행 높이 하한 0.36in 고정 → 가용 높이를 넘어도 경고 없음 | `lib.js`: 하한 제거·가용 높이 기준 계산, 0.30in 미만이면 `[overflow]` 경고 · 항목 폰트 전체 최소값으로 통일(105장 들쭉날쭉 해소); `slides-block3.js` B3-63 note 1줄로 축약 | ✔ |
| 3 | 46 (B1-46 promptBlock) | 헤더 kicker 2줄이 제목과 겹침 | `header()` kicker 박스 0.26in 고정, 줄 수 미검사 | `lib.js` `header()`: kicker 11→10→9.5pt 축소 + 2줄이면 `[kicker-lines]` 경고 | ✔ |
| 4 | 31 · 166 · 172 · 184 · 185 · 186 · 188 · 189 등 47장 | promptBlock kicker가 헤더와 박스 안에 **두 번** 표시 | `promptBlock()`이 `header(o)`에 kicker를 넘기고 박스 안에도 그림 | `lib.js` `promptBlock()`: 헤더에는 kicker 제외(박스 라벨만) | ✔ |
| 5 | 116 (B2-36 표) | 2차 보정 후 표가 note에 닿음 · 13 · 68 표 `[overflow]` 경고 | 2줄 셀 다수 | `slides-block2.js` B2-36 '왜' 열 문장 축약 + colW 조정 · `slides-block1.js` B1-13 부제 1줄로 축약 + 셀 5개 축약 · B1-68 셀 3개 축약 + colW | ✔ |
| 6 | 3 · 108 · 170 · 214 · 215 · 217 · 218 | PPTX XML `descr` 속성에 `/Users/…` 절대경로 | pptxgenjs가 altText 미지정 시 경로를 넣음 | `lib.js` `image()`: `altText: path.basename(full)` | ✔ 0건 |
| 7 | 102 (B2-22 9열 표) | 좁은 셀에서 `[가 정]` 등 단어 중간 줄바꿈 | 9열 × 8.6in | colW 재배분 + "파악 40분→5분" → "40분→5분" | ✔ (참고 장표 · 밀도 높음, §5) |
| 8 | 3 (B1-03) | 부제 2줄 끝 한 단어 고아 줄바꿈 | 부제 길이 | 부제 축약(1줄) | ✔ |

### 3.4 확인 결과 요약

- 잘림·겹침: 최종 렌더 기준 **발견 0건**(전수 contact sheet + 개별 확인).
- 안전 여백: 모든 장표 콘텐츠가 좌우 0.7in · 상 0.5in · 하 푸터 rule(5.02in) 안쪽. 표지·divider·closing은 풀블리드 배경(의도).
- 폰트 대체: 본문·제목 모두 나눔고딕 3종 임베드. 심볼(`✓ □ ▶ ⏱ →`)만 OpenSymbol/AppleSymbols/STIXTwoMath로 대체 — LIB-API §7 기록과 동일, 시각적 문제 없음.
- placeholder 라벨: `[ 캡처 자리 ]` + 파일명 + 내용 설명이 33개 전부 표시됨. 라벨 누락 0건.
- 러닝 푸터·페이지 번호: 콘텐츠 장표 전부 동일 위치(표지·divider·closing 제외, 의도).

## 4. 재생성 명령

```bash
cd projects/26Q3_AI-Native-PM/assets/pptx
node generate.js                                   # → kmac-m5-ai-pm-productivity-20260919.pptx (252장 · 경고 40건 기대)
soffice --headless --convert-to pdf --outdir . kmac-m5-ai-pm-productivity-20260919.pptx   # 렌더 QA 프록시 PDF
pdfinfo kmac-m5-ai-pm-productivity-20260919.pdf | grep Pages                                 # 252
mkdir -p /tmp/kmac-m5-render && pdftoppm -png -r 80 kmac-m5-ai-pm-productivity-20260919.pdf /tmp/kmac-m5-render/p
unzip -p kmac-m5-ai-pm-productivity-20260919.pptx 'ppt/slides/*.xml' | grep -o -E "010-[0-9]{3,4}-[0-9]{4}|/Users/|@gmail" | wc -l   # 0
# 최종 공유 PDF는 PowerPoint 저장: ./export-pdf.sh kmac-m5-ai-pm-productivity-20260919.pptx (LIB-API §최종 PDF 규칙)
# 배포용: node generate.js --no-kind --out …-dist.pptx → python3 strip-notes.py … → ./export-pdf.sh …-dist.pptx
```

## 5. 남은 제약(자동 검사 통과 ≠ 육안 검수 통과 — 아래는 육안으로도 확인된 미해결 항목)

1. **캡처 placeholder 33개 / 27개 파일** — `assets/screenshots/`에 없음: cap-01 · 02 · 03 · 04 · 05 · 06 · 07 · 08 · 09 · 10 · 11 · 12 · 13 · 14 · 15 · 16 · 18 · 19 · 20 · 21 · 23 · 25 · 26 · 28 · 29 · 30 · 31 (cap-29·30·31은 NEEDED.md 추가 필요). 파일이 놓이면 재빌드만으로 교체된다(경로·라벨 변경 불필요). 실제 이미지가 들어간 장표 11장(builder 에셋·퍼널 차트·poster)만 현재 이미지 렌더 확인됨 — **캡처 삽입 후 해당 장표 재렌더 검수 필요**(잘라내기 여백·계정 정보 노출).
2. **영상 장표(216, B3-51)** — PPTX에 MP4 임베드, PDF는 poster + "PDF에서는 poster" 캡션. PowerPoint(mac)에서 재생 여부 `[강의 전 확인]`; 운영기관 강사용 PC에는 PDF 백업본이 들어가므로 영상은 개인 노트북에서만 재생.
3. **14pt 미만 텍스트** — 디자인 가이드 타입 스케일(본문 13.5→10 · 카드 12→10 · 프롬프트 최소 9 · 캡션 10 · 각주·푸터 9.5) 자체가 14pt 미만을 허용하므로 LLMOps 가이드 §9-4("14pt 미만 0건")는 **이 덱의 기준이 아니다**. 실측: 14pt 미만 run 2,464개(푸터·pill·각주 포함, 252장 전부) · 10~13.5pt 본문급 run 1,462개(224장). 가장 작은 본문은 프롬프트 전문 2단 10pt 7장과 9열 표(102) 10pt — 80dpi 렌더에서 판독 가능하나 **강의장 프로젝터에서 뒷줄 판독은 미확인**. 프롬프트 전문은 글자 수정 금지 규칙 때문에 (1/2)(2/2) 분할 외 대안이 없다.
4. **2줄 제목** — 제목 폰트가 26→22/20pt로 축소된 장표 42장(3 · 5 · 11 · 17 · 18 · 19 · 22 · 27 · 32 · 33 · 34 · 37 · 49 · 59 · 108 · 119 · 123 · 124 · 125 · 155 · 157 · 163 · 166 · 168 · 172 · 173 · 174 · 175 · 177 · 185 · 186 · 188 · 189 · 196 · 204 · 206 · 207 · 216 · 224 · 240 · 241 · 247) — 대부분 1줄 22pt이며 실제 2줄 제목은 캡처 장표(18 · 19 · 20 · 38 · 39 · 41 · 169 · 191 · 200 · 219) · Step 장표(137 · 143 · 172~175 · 185~189) · statement 계열 등 약 30장. 모두 2줄 이내(`[title-lines]` 0건)이나 결론형 긴 제목의 축약은 내용 결정 사항이라 이번 QA에서 손대지 않았다.
5. **9열 표(102, B2-22 참고)** — 셀 폭 0.62~1.2in에 10pt. 판독은 되지만 발표용 밀도가 아니다(참고 유형 · 발표 시 건너뜀). 배포 PDF 확대 열람 전제.
6. **장수 252 vs 플랜 232** — 플랜 문서(14 §결론부터·검산표)와 장수가 다르다. 장표 ID 대응은 유지되므로 플랜 갱신(분할 장표 표기) 또는 검산표 주석이 후속.
7. **soffice PDF는 QA 프록시** — 최종 공유·사전확인 회신용 PDF는 PowerPoint 저장(`export-pdf.sh`)으로 다시 만들고, PowerPoint 렌더(행간 ≈1.2em으로 더 촘촘)에서 표·프롬프트 박스 하단 여백을 한 번 더 확인해야 한다. 한글 폰트명 매칭 `[강의 전 확인]`.

## 6. 다음 액션

| 순서 | 액션 | 담당 | 조건 |
|------|------|------|------|
| 1 | 캡처 27개 파일 확보 → `assets/screenshots/` 배치 → `node generate.js` 재빌드 → 캡처 장표 33장 재렌더 육안 검수 | PM | NEEDED.md에 cap-29 · 30 · 31 추가 |
| 2 | `./export-pdf.sh kmac-m5-ai-pm-productivity-20260919.pptx`로 PowerPoint PDF 생성 → 표·프롬프트 하단 여백 재확인 → 한국핀테크지원센터 사전확인 회신(9/17 마감 지남 — 즉시) | PM | PowerPoint(mac) 나눔고딕 매칭 확인 |
| 3 | 배포용 빌드(`--no-kind` + `strip-notes.py` + export-pdf) — 온라인 배포 가능 여부 회신에 첨부 | PM | QR 대상 배포 전용 폴더 확정 |
| 4 | 플랜 v2 장수(232→252) 주석 또는 분할 장표 표기 갱신 | PM | 내용 변경 없음 |
| 5 | LIB-API.md에 lib 변경 반영(TABLE_LH · checklist 행 높이·폰트 통일 · kicker 1줄 규칙 · altText) | PM | 본 리포트와 함께 |

<details>
<summary>Change Log</summary>

| 날짜 | 작성자 | 변경 내용 |
|------|--------|----------|
| 2026-09-19 | PM 차성재 with Claude Fable 5.1 | 최종본 — 제목 227개 명사형 교체·단일 강조 제거·캡처 자리 29장 실제 이미지·시안 다크 풀블리드·Session 표기, 3사 비교표를 2026-09 공개 자료 추산치로 채워 2장 분할, 이미지 원본 비율 유지·가운데 정렬(lib image()), Q&A·마무리 장표 추가 → 255장, 경고 small-font 7건만 |
| 2026-09-18 | PM 차성재 with Claude Fable 5.1 | 최종 내보내기 — 표지 제목 수동 줄바꿈 후 재빌드, PowerPoint "PDF로 저장"(export-pdf.sh)으로 강사용 `….pdf`·배포용 `…-dist.pdf`(노트·유형 pill 제거, strip-notes.py) 생성, 나눔고딕 3종 임베드 확인. draft-v0 파일 삭제 |
| 2026-09-18 | PM 차성재 with Claude Fable 5.1 | 초안 — 4차 빌드 기준 장수(252/252)·블록별 유형 분포·경고 40건(overflow 0)·육안 확인 목록 110장+·발견→수정 8건(lib.js 표 행 높이 em·체크리스트 행 높이/폰트 통일·kicker 1줄·promptBlock kicker 중복·이미지 altText, block1/2/3 문장 축약)·금지 표현 0건·남은 제약 7항·재생성 명령·다음 액션 |

</details>
