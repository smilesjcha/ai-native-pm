# 2026 청년 여성 밸런스 워크숍 (WORK-LIFE.zip)

## 「AI 시대의 업무 경쟁력과 생산성 향상」

> AX 시대의 일하는 방식·문서 생산성·커리어 성장 워크숍
> 2026-07-23(목) 13:00–17:00 · 온라인(Zoom) · 강사 차성재

## 폴더 안내

| 폴더 | 내용 |
| --- | --- |
| [docs/](docs/) | 강의 설계 원칙, 커리큘럼, 무료/유료 범위, 사전 설문 분석, 안내문, 강사 체크리스트 |
| [design/](design/) | PPT 디자인 시스템, 슬라이드별 설계(slide-plan), KEDI 덱 벤치마크 노트 |
| [build_pptx/](build_pptx/) | python-pptx 기반 PPT 빌드 시스템 (`python3 build_pptx/build.py`) |
| [materials/](materials/) | 수강생 배포용 실습 자료 원본 (ZIP 구조 그대로) |
| [dist/](dist/) | 수강생 배포용 ZIP |
| [output/](output/) | 강의 PPTX / PDF |
| [assets/](assets/) | 스크린샷·이미지 (`screenshots/NEEDED.md` = 캡처 요청 목록) |

## 빠른 시작

```bash
# 1) PPT 빌드
python3 build_pptx/build.py

# 2) 배포 ZIP 재패키징
cd materials && zip -r ../dist/WORK-LIFE-practice-kit.zip ai-work-competency-workshop -x "*.DS_Store"
```

## 강의 운영 요약

- 1부(13:00–14:50): AX 시대 업무 변화 → AI 도구 지도 → 프롬프트/업무 방식 → 실습 환경·보안
- 2부(15:00–17:00): 실습①(회의록) → 실습②(보고서·이메일) → 유료·확장 시연 → 개인 적용 시나리오 → 마무리
- 참여자 실습: Claude 무료 계정, 복사/붙여넣기만으로 수행
- 강사 시연: Claude for Excel/PowerPoint/Word, MCP/Skills, rhwp(HWP)
