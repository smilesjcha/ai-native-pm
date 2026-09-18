# Claude Context — 26Q3_AI-Native-PM

## 프로젝트 목적

KMAC 2026 핀테크 인력양성사업 · 기획자 과정 3회차(M5) **「생성형 AI를 활용한 기획자 업무생산성 향상」** 강의 자료 제작.
2026-09-19(토) 09:30–16:30 오프라인 · 7시간 편성(실강 300분) · 3세션.

## 핵심 컨텍스트

- **대상**: 원 기획안은 핀테크 서비스 기획자·PM·금융 실무자·비개발 직군이지만, 운영기관 확정(9/18)은 **30명 내외 "직장인·일반인 등"** — 핀테크·PM 용어를 전제하지 않고 병기·한 줄 설명한다. 선행 회차 M3(8/22)·M4(9/5)를 들었을 수 있음(조건형으로만 언급).
- **운영 요건(9/18 메일)**: 장소 KMAC 비즈니스 스쿨 M1 교육장(마포구), 주관 한국핀테크지원센터·운영 KMAC. 강의안은 센터 **사전확인** 대상이며 **온라인 배포**될 수 있다(배포용은 강사 노트·정답표 제외). 수업 중 산출물이 **미니 프로젝트 제출물 → 수료 조건**이다(`workshop/mini-project-submission.md`). 상세: `planning/15-organizer-constraints.md`, 회신 초안 `ops/organizer-reply-draft.md`.
- **원 요구사항(SSOT)**: `source/kmac-m5-brief.md` — 학습목표·수강대상·기대효과·세션별 세부내용은 이 문서를 기준으로 하고 임의로 삭제하지 않는다. 재배열·심화는 허용.
- **설계 SSOT**: `planning/01-lecture-design.md`(원칙) → `planning/03-curriculum-outline.md`(목차) → `planning/04~06-session-*-detail.md`(상세). 상위 문서가 바뀌면 하위를 갱신한다.
- **러닝 케이스**: 교육용 **가상** 핀테크 사례 "머니핏(MoneyFit) — 마이데이터 기반 2030 자산관리 코칭 서비스, 가상 회사 핀트리(FinTree)". 실제 기업·상품·수치를 사실처럼 쓰지 않는다. 모든 수치는 `[가정]`, 확인 전 정보는 `[확인 필요]`로 표기.
- **실습 기준**: 수강생은 본인 보유 무료 계정(ChatGPT·Claude·Gemini 중 택1) + 복사·붙여넣기. 코딩·설치·계정 연동 금지. 유료·확장 기능(Claude Desktop Cowork·Skills·커넥터, Claude Code, Claude for PowerPoint, Deep Research 등)은 **강사 시연**으로만 다룬다.
- **언어**: 한국어 기본, 산업 표준 용어는 영어 병기. 약어 첫 등장은 `한글 용어(English full term, 약어)`.

## 제약 사항 (반드시)

1. **금융권 보안·개인정보**: 실제 고객·거래·내부 데이터, 실명, 연락처, API 키를 어떤 파일에도 넣지 않는다. 샘플 데이터는 전부 가상이며 파일 상단에 "교육용 가상 데이터" 표기.
2. **규제·수치 사실성**: 금융 규제(신용정보법·개인정보보호법·전자금융거래법·금융소비자보호법·망분리 가이드 등)와 시장 수치는 출처·기준일을 함께 쓰고, 확실하지 않으면 `[확인 필요]`로 남긴다. 법률 판단은 "컴플라이언스 확인 필요"로 표기하고 단정하지 않는다.
3. **도구 기능 주장**: ChatGPT·Claude·Gemini의 기능·요금·한도는 2026-09 기준 강사가 강의 전 확인하도록 `[강의 전 확인]` 표기. 존재하지 않는 기능을 만들지 않는다.
4. **강사 표기**: `planning/07-instructor-profile.md`의 확정 표기를 따른다. 연락처(전화)는 어떤 자료에도 넣지 않는다. 회사 공식 입장이 아니라는 disclaimer를 표지 또는 소개 장표에 둔다.
5. **문서 표준**: 레포 루트 `CLAUDE.md`의 메타 헤더·Change Log·작성자 표기(`PM 차성재 with Claude Fable 5.1`)를 모든 문서에 적용한다.

## 작업 순서 (반드시 이 순서)

1. 내용 변경 → `planning/03-curriculum-outline.md` + 해당 `planning/0N-session-*-detail.md` 수정
2. 실습 변경 → `workshop/` 수정 (프롬프트·가상 데이터·가이드)
3. 슬라이드 구성 변경 → `planning/14-slide-plan-v2.md`(장표 단위 SSOT, 09는 모듈별 예산 초안) 갱신
4. PPT 반영 → `assets/pptx/slides-block1~3.js`(내용) · `lib.js`(아키타입·디자인 토큰) 수정 → `node generate.js` → `soffice --headless --convert-to pdf` → `pdftoppm`으로 전 장 렌더 → 육안 QA → `assets/pptx/QA-REPORT.md` 갱신
5. 열린 결정은 `planning/00-review-checklist.md`에 추가하고 사용자와 확정

## PPT 제작 기준

- 디자인: [`docs/design-system/ppt-design-guide.md`](../../docs/design-system/ppt-design-guide.md) (Apple 그래머 + 나눔고딕, 단일 Action Blue `#0066CC`, 16:9 10×5.625in). 빌더는 `projects/26Q2_Fastcampus-Lecture/assets/pptx/generate-v05.js`를 기반으로 재사용.
- 콘텐츠 규칙(2026-09-19 강사 피드백 반영): **제목·부제·카드 제목은 명사형·개조식**(10~26자, 1줄 원칙) — 문장형 종결어미·"A가 아니라 B" 수사·"— 부연" 꼬리·메타/사고 과정 표현 금지. **금융은 전제**이므로 "금융의 차이는…" 식 차별화 수사를 쓰지 않는다. 한 장 한 메시지, 약어 병기, 출처·기준일 표기, 실습 장표는 "입력 → 결과 확인 → 한 번 수정" 3단계 고정.
- 시각 규칙: **마지막·단일 항목만 강조 금지** — 카드·단계·스텝은 전부 같은 색감(lib가 강제). 자동 줄바꿈이 의미 단위를 깨면 텍스트에 `\n`을 직접 넣는다. 시안·프로토·영상 장표는 `dark: true` 풀블리드.
- 캡처 장표는 placeholder로 두지 않는다 — `assets/screenshots/_gen/`의 코드 생성 예시 화면(중립 UI, 실습 원본과 수치 일치)을 쓰고, 실캡처가 생기면 같은 파일명으로 교체한다.
- QA 게이트: `references/ppt-production/goorm/ppt-production-qa-playbook.md` + `llmops-16week/PPT_PRODUCTION_GUIDELINE.md` §9 체크리스트를 적용(잘림·겹침·안전 여백·14pt 미만 텍스트·금지 표현 0건). PPTX와 PDF 장수 일치.

## 빌드

```bash
cd assets/pptx && npm install            # pptxgenjs (최초 1회)
node generate.js                         # lib.js + slides-block1~3.js → kmac-m5-ai-pm-productivity-20260919.pptx
./export-pdf.sh kmac-m5-ai-pm-productivity-20260919.pptx     # 최종 PDF는 PowerPoint "PDF로 저장"만 사용(LibreOffice 변환 금지)
pdftoppm -png -r 80 kmac-m5-ai-pm-productivity-20260919.pdf /tmp/kmac-m5-render/p   # 전 장 렌더 QA
```

배포용 PDF(강사 노트 제외)는 PowerPoint에서 "노트 없이" 내보내거나 PPTX의 notes를 제거한 사본으로 만든다. 시안·프로토·데모 영상 에셋은 `workshop/builder/README.md`의 재생성 명령을 따른다.
