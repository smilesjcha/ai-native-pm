# Context 폴더 사용 가이드

이 폴더는 Claude가 PRD 생성·평가 시 참조하는 **도메인 지식을 저장하는 공간**이다.

`projects/` 폴더의 문서가 **팀이 생산하는 산출물**이라면, `context/` 폴더의 문서는 **AI에게 제공하는 입력 자료**(input material)이다.

---

## 하위 폴더 용도

### `company-policies/` — 전사 정책

회사 전체에 적용되는 정책, 조직 구조, 의사결정 기준을 저장한다.

**예시 파일**:
- `org-structure.md` — 조직도, 부서별 역할
- `brand-policy.md` — 브랜드 가이드라인, 톤앤매너
- `data-governance.md` — 데이터 수집·활용 정책
- `security-policy.md` — 보안 정책, 인증 기준

---

### `domain-knowledge/` — 서비스별 도메인 지식

특정 서비스나 도메인의 비즈니스 규칙, 용어, 워크플로우를 저장한다.

**예시 파일**:
- `search-domain.md` — 검색 서비스 도메인 용어, 비즈니스 규칙
- `payment-rules.md` — 결제·정산 프로세스, 정책
- `logistics-workflow.md` — 물류 입출고 프로세스
- `glossary.md` — 도메인 용어 사전

---

### `external-services/` — 외부 연동 컨텍스트

외부 API, 파트너 서비스, 서드파티 연동에 관한 제약사항과 스펙을 저장한다.

**예시 파일**:
- `shipping-api-spec.md` — 배송 API 스펙, 제약사항
- `pg-integration.md` — PG사 연동 정책, 한도
- `partner-policy.md` — 파트너사 연동 규칙

---

## 사용 팁

1. **파일명은 kebab-case**: `payment-rules.md` (O), `PaymentRules.md` (X)
2. **최신 상태 유지**: 정책이 변경되면 여기도 업데이트한다
3. **원본 링크 포함**: 가능하면 원본 문서(Confluence, Notion 등) 링크를 파일 상단에 명시한다
4. **Claude에게 자연스럽게**: PRD 생성 시 "context 폴더의 도메인 지식을 참고해줘"라고 요청하면 된다
