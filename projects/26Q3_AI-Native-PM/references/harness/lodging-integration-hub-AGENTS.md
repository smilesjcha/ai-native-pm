# AGENTS.md

이 문서는 저장소에서 작업하는 사람과 자동화 에이전트가 따라야 할 공통 규칙을 정의한다.

## 프로젝트 원칙

- 여러 외부 숙박 상품 공급사를 일관된 내부 모델로 통합하는 백엔드 시스템을 구축한다.
- 설계 문서의 결정은 실제 코드와 테스트에 반영한다.
- 요구 범위를 벗어난 기능보다 핵심 검색 흐름의 정확성, 견고성, 설명 가능성을 우선한다.
- 변경 전 현재 브랜치와 작업 트리 상태를 확인하고 기존 변경을 보존한다.

## 브랜치 전략

- `main`: 배포 가능한 안정 버전을 관리한다.
- `dev`: 개발 작업의 기준 브랜치다.
- 기능 개발은 항상 최신 `dev`에서 새 브랜치를 생성한다.
- 브랜치 이름은 `<type>/<kebab-case-purpose>` 형식을 사용한다.
- 하나의 브랜치는 하나의 목적만 가진다.
- PR의 기본 대상 브랜치는 `dev`다.
- 기본 병합 방식은 squash merge다.
- 모든 구현과 검증이 완료된 뒤 `dev`를 `main`으로 병합한다.
- 구조나 계약을 변경하면 README, API 문서, ADR 또는 Runbook을 함께 수정한다.

브랜치 이름 예시:

```text
feat/catalog-sync
feat/unified-search
fix/supplier-timeout
docs/architecture-decisions
```

## 커밋 규칙

커밋 제목은 다음 형식을 사용한다.

```text
<gitmoji> <type>: <명령형 요약>
```

허용하는 type:

- `feat`: 사용자 기능 또는 API 추가
- `fix`: 버그 수정
- `refactor`: 외부 동작을 바꾸지 않는 구조 개선
- `test`: 테스트 추가 또는 정리
- `docs`: 문서 변경
- `infra`: Docker, CI/CD, 배포 설정
- `chore`: 도구, 의존성, 단순 유지보수
- `perf`: 성능 개선
- `security`: 보안 개선

예시:

```text
✨ feat: 공급사 카탈로그 동기화 구현
🐛 fix: 공급사 응답 지연 시 부분 결과 반환
♻️ refactor: 공급사 응답 변환 책임 분리
✅ test: 공급사 실패 응답 계약 테스트 추가
📝 docs: 통합 요금 모델 결정 기록
🚀 infra: 로컬 실행 환경 구성
```

- 하나의 커밋에는 하나의 의도만 담는다.
- 의미 있는 작업 단위마다 커밋해 의사결정 흐름을 보존한다.
- 포매터 결과와 기능 변경은 가능한 한 분리한다.
- 생성물, IDE 개인 설정, 실제 환경 파일과 비밀정보를 커밋하지 않는다.
- 공개 저장소에 특정 조직명이나 전형 절차를 추정할 수 있는 표현을 넣지 않는다.

## 저장소 구조

- 프론트엔드와 백엔드는 하나의 저장소에서 관리하는 모노레포 구조를 사용한다.
- 백엔드는 하나의 Spring Boot 애플리케이션 안에서 도메인별로 분리한다.
- 각 도메인은 필요한 계층을 자신의 폴더 안에 둔다.
- `global`에는 공통 설정, 보안, 응답, 예외 처리만 둔다.
- 비즈니스 로직을 `global`로 옮기지 않는다.
- 도메인 간 Entity를 직접 공유하지 않는다.
- 도메인 간 연결은 Service, ID, 이벤트 또는 명시적인 인터페이스를 사용한다.
- 테스트 코드는 실제 도메인 경로와 유사하게 배치한다.

권장 구조:

```text
backend/src/main/java/<base-package>/<domain>/
├── controller/
├── service/
├── entity/
├── repository/
├── dto/
└── client/ 또는 event/
```

## 네이밍

- 클래스와 타입: `PascalCase`
- 메서드와 변수: `camelCase`
- 상수: `UPPER_SNAKE_CASE`
- 패키지: `lowercase`
- DB 테이블과 컬럼: `snake_case`
- API 경로: 복수 자원명과 `kebab-case`
- Boolean: `is`, `has`, `can`, `should` 접두어를 사용한다.
- DTO 이름에는 역할을 포함한다. 예: `SearchStayRequest`, `StayOfferResponse`, `SupplierFailureResponse`
- Request DTO와 Response DTO를 분리한다.
- Entity를 API 응답으로 직접 노출하지 않는다.
- 단순 불변 DTO는 Java `record`를 우선한다.
- 외부 이벤트에는 명시적인 버전을 사용한다.

## 기술 및 API 규칙

- Java 21 이상, Spring Boot 3.4 이상을 사용한다.
- 빌드는 Gradle을 사용하고 Kotlin DSL을 우선한다.
- 외부 Supplier 연동에는 Spring WebClient를 사용한다.
- 관계형 데이터베이스와 migration 도구를 사용한다.
- 기본 API prefix는 `/api/v1`이다.
- URL은 자원 중심으로 작성하고 행위는 HTTP Method로 표현한다.
- 조회는 `GET`, 생성과 명령은 `POST`, 부분 수정은 `PATCH`, 전체 교체는 `PUT`, 삭제는 `DELETE`를 사용한다.
- API 변경 시 OpenAPI와 계약 테스트를 같은 변경에 포함한다.
- Breaking Change에는 버전 변경, 호환 기간 또는 마이그레이션 계획을 남긴다.

성공 응답:

```json
{
  "data": {},
  "meta": null
}
```

실패 응답:

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "요청한 리소스를 찾을 수 없습니다.",
    "fieldErrors": []
  },
  "traceId": "..."
}
```

## Java, Spring 및 JPA

- 읽기 작업에는 `@Transactional(readOnly = true)`를 사용한다.
- 트랜잭션 안에서 외부 API 호출을 오래 유지하지 않는다.
- 연관관계는 단방향과 `LAZY`를 우선한다.
- 생명주기가 완전히 같을 때만 cascade와 orphan removal을 사용한다.
- Entity에 무분별한 setter와 Lombok `@Data`를 사용하지 않는다.
- JPA 기본 생성자는 `protected`로 선언한다.
- 운영 환경에서 스키마 자동 변경을 금지한다.
- `ddl-auto=validate`와 migration 도구를 사용한다.

## 외부 연동

- Supplier별 요청과 응답 DTO가 내부 도메인 계층으로 새지 않도록 어댑터 경계를 둔다.
- 외부 HTTP 상태와 본문 수준의 실패를 공통 실패 모델로 변환한다.
- 연결 및 응답 타임아웃을 명시하고 값의 근거를 문서화한다.
- 다수 Supplier 호출은 병렬화하되 동시성을 제한한다.
- 공급사별 요청 제한에 맞춰 입력을 분할하고 경계값을 테스트한다.
- 일부 Supplier가 실패해도 성공한 결과를 반환하며, 부분 실패 사실을 응답에 포함한다.
- 반복 동기화에서도 외부 코드와 내부 식별자의 매핑이 안정적으로 유지되어야 한다.
- 실시간 요금과 재고는 필요한 시점에 조회하며, 저장 또는 캐시한다면 일관성 허용 범위를 문서화한다.

## 보안 및 로깅

- `.env`, 비밀키, 토큰, 개인정보를 저장소에 커밋하지 않는다.
- `.env.example`에는 환경변수 이름과 설명만 기록한다.
- 로그에 비밀번호, 토큰, API Key 또는 개인정보를 남기지 않는다.
- 서비스 간 `traceId` 또는 Correlation ID를 전달한다.
- 로그 레벨은 `INFO`를 기본으로 사용한다.
- 외부에서 제공받은 비공개 원문, 첨부 문서 또는 원본 명세를 저장소에 포함하지 않는다.

## 테스트 및 품질

- 기능 추가에는 Unit 테스트와 Controller/Slice 테스트를 작성한다.
- DB, 캐시, 메시지 동작에는 Integration 테스트를 작성한다.
- 외부 HTTP와 이벤트에는 Contract 테스트를 작성한다.
- 인증, 권한, 동시성에는 실패 경로를 포함한다.
- 핵심 사용자 흐름에는 E2E 또는 Smoke 테스트를 작성한다.
- 정상 응답뿐 아니라 공급사 오류, 본문 오류, 응답 지연, 타임아웃, 부분 실패를 검증한다.

PR 전 다음 항목을 확인한다.

- test
- lint 및 formatter
- build
- secret scan
- 정적 분석과 커버리지
- 의존성 취약점 검사
- API 또는 이벤트 계약 검사

## 문서 및 과정 기록

- `README.md`에 빌드와 실행 방법, 핵심 설계 결정 및 근거를 기록한다.
- 상세 설계는 `docs/`에 아키텍처, 도메인 모델, API, 장애 대응 문서로 분리한다.
- 중요한 대안과 트레이드오프는 ADR 또는 `JOURNAL.md`에 남긴다.
- AI를 사용한 경우 질문의 목적과 제안을 수용, 수정 또는 거부한 이유를 기록한다.
- 이해하거나 설명할 수 없는 생성 코드를 저장소에 포함하지 않는다.
- 외부 자료를 그대로 복사하지 않고 프로젝트에 필요한 판단을 본인의 표현으로 작성한다.
