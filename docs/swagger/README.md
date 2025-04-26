# API 문서화 가이드

이 디렉토리에는 GymHub SaaS 플랫폼의 API 문서가 포함되어 있습니다. 문서는 OpenAPI(Swagger) 3.0 형식으로 작성되어 있습니다.

## 구조

```
docs/swagger/
├── index.js                # 메인 Swagger 설정 파일
├── schemas/                # 데이터 스키마 정의
│   ├── core.js             # Core DB 스키마 (User, Gym, GymAdmin)
│   ├── members.js          # 회원 스키마
│   └── ...                 # 기타 스키마
├── paths/                  # API 엔드포인트 경로 정의
│   ├── core-users.js       # 사용자 관리 API
│   ├── gyms.js             # 헬스장 관리 API
│   ├── members.js          # 회원 관리 API
│   └── ...                 # 기타 API
└── README.md               # 이 문서
```

## API 문서 확인 방법

API 문서는 두 가지 방법으로 확인할 수 있습니다:

1. 브라우저에서 `/api-docs` 경로 접속
   - 개발 서버가 실행 중일 때 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)에서 볼 수 있습니다.

2. API 문서 JSON 형식 확인
   - 개발 서버가 실행 중일 때 [http://localhost:3000/api/docs](http://localhost:3000/api/docs)에서 JSON 형식으로 볼 수 있습니다.

## 문서 수정 가이드

### 새 스키마 추가하기

1. `schemas/` 디렉토리에 새 파일 생성
2. 형식에 맞추어 스키마 정의
3. `index.js`에 스키마 추가

예시:
```javascript
// schemas/trainers.js
const trainerSchemas = {
  Trainer: {
    type: 'object',
    properties: {
      // 속성 정의
    }
  }
};

module.exports = trainerSchemas;

// index.js
const trainerSchemas = require('./schemas/trainers');

// components에 추가
components: {
  schemas: {
    ...coreSchemas,
    ...memberSchemas,
    ...trainerSchemas,
  },
}
```

### 새 API 엔드포인트 추가하기

1. `paths/` 디렉토리에 새 파일 생성 또는 기존 파일 수정
2. 형식에 맞추어 API 경로 정의
3. `index.js`에 경로 추가

예시:
```javascript
// paths/trainers.js
const trainerPaths = {
  '/tenant/trainers': {
    get: {
      // GET 메서드 정의
    },
    post: {
      // POST 메서드 정의
    }
  }
};

module.exports = trainerPaths;

// index.js
const trainerPaths = require('./paths/trainers');

// paths에 추가
paths: {
  ...coreUsersPaths,
  ...gymsPaths,
  ...memberPaths,
  ...trainerPaths,
},
```

## 주의사항

- OpenAPI 3.0 형식을 준수하세요.
- JSDoc 주석(`/** @openapi */`)을 사용하여 문서를 생성할 수도 있습니다.
- 스키마 참조는 `$ref: '#/components/schemas/[스키마명]'` 형식으로 사용하세요.
- 예제 값은 현실적이고 이해하기 쉽게 작성하세요.