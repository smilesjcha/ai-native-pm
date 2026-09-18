# PPT Design System — WORK-LIFE AX 워크숍

벤치마크: `seoul-ai-foundation/docs/09-ppt-design-system.md` (화이트+블랙+네이비)
+ KEDI 덱(20250418)의 네이비 풀블리드 섹션 디바이더·표지 구조.

## Design Direction

시각적으로 과하지 않은, 신뢰감 있는 전문 강의 자료.
흰색 배경, 검은색 본문, 남색(Deep Blue) 단일 강조.
청년 여성 대상 워크숍이지만 장식적 요소 대신 명확성과 절제로 고급감을 만든다.

## Color System

| Token | Hex | Role |
| --- | --- | --- |
| White | `#FFFFFF` | 전체 슬라이드 배경 |
| Black | `#111111` | 제목, 본문 |
| Deep Blue | `#123C7C` | 강조, 섹션, 핵심 키워드, 도형 |
| Blue 90 | `#0D2E61` | 네이비 풀블리드(표지·섹션 디바이더) 배경 |
| Blue 70 | `#2A5796` | 보조 강조 |
| Blue 10 | `#EAF1FB` | 박스 배경, 프롬프트 블록 배경 |
| Gray 80 | `#333333` | 보조 본문 |
| Gray 20 | `#E5E7EB` | 구분선, 표 라인 |
| Gray 5 | `#F7F8FA` | 약한 영역 구분, 코드 배경 |

규칙: 배경은 White(디바이더 제외), 강조는 Deep Blue 하나, 슬라이드당 파란 강조 3개 이하,
빨강·초록·노랑·보라 금지, 그라데이션·그림자 금지.

## Typography

- Primary: `Apple SD Gothic Neo` (Fallback `Pretendard`), Code: `Menlo`

| Style | Size | Weight |
| --- | ---: | ---: |
| Cover Title | 44pt | 700 |
| Divider Title | 40pt | 700 |
| Slide Title | 28pt | 700 |
| Lead | 22pt | 500–700 |
| Body | 17pt | 400 |
| Body Small | 15pt | 400 |
| Caption | 12pt | 400 |
| Code/Prompt | 13pt | 400 |

## Layout

- 16:9 (13.333 × 7.5 in), 안전 여백: 좌우 0.6in, 상하 0.5in
- 제목 아래 Deep Blue 짧은 라인(0.8in, 2.5pt) — 이 덱의 시그니처 모티프
- 러닝 푸터: 좌측 "AI 시대의 업무 경쟁력과 생산성 향상 · 2026 청년 여성 밸런스 워크숍", 우측 페이지 번호

## 레이아웃 아키타입

| 타입 | 용도 | 비고 |
| --- | --- | --- |
| cover | 표지 | KEDI 표지 구조(날짜·제목·부제·강사) 벤치마크 |
| navy_divider | 파트/세션 전환 | KEDI 네이비 풀블리드 + 흰색 중앙 타이틀 벤치마크 |
| toc | 목차 | 번호 리스트 |
| profile | 강사 소개 | KEDI S5-6 경력 구조 벤치마크 |
| concept / one_liner | 개념·핵심 문장 | |
| comparison | AS-IS/TO-BE, 좋은/나쁜 프롬프트 | 우측 열 accent |
| process | 단계 흐름 (발전 6단계, 실습 3단계) | 강조 단계만 Deep Blue |
| card_grid | 역량·도구 지도·보안 기준 | 2–3열 |
| code_demo | 프롬프트 예시 | Gray 5 배경 코드 블록 |
| document | 좌 설명 + 우 문서 박스 | 폴더 구조·템플릿 소개 |
| schedule / api_table | 시간표·표 | |
| review | 체크리스트 | 실습 환경 점검·보안 |
| wrap_up / closing | 마무리·감사 | |

## 품질 체크리스트 (슬라이드마다)

- [ ] 텍스트가 박스/슬라이드 경계 안에 있음 (예상 개행 수 × 줄 높이 < 박스 높이의 90%)
- [ ] 도형·텍스트 겹침 없음
- [ ] 동일 행 카드: 같은 top·height, 좌우 마진 대칭
- [ ] 간격 리듬 일관 (카드 gap 0.25in, 컬럼 gap 0.3–0.4in)
- [ ] 파란 강조 3개 이하, 토큰 외 색상 없음
