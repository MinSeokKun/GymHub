# GymHub - 헬스장 관리 SaaS 플랫폼

GymHub은 여러 헬스장을 클라우드 기반으로 관리할 수 있는 SaaS(Software as a Service) 플랫폼입니다. 각 헬스장별로 독립된 데이터베이스를 제공하며, 중앙 관리 시스템을 통해 효율적인 운영이 가능합니다.

## 프로젝트 구조

이 프로젝트는 Next.js 15.3.1 기반으로 개발되었으며, 멀티 테넌시 구조를 채택하였습니다:

- **메타 DB(Core DB)**: 로그인, 헬스장 정보, 관리자 매핑 등 공통 데이터
- **테넌트 DB(각 헬스장 DB)**: 각 헬스장별 회원, 트레이너, 출석 등의 고유 데이터

## 기술 스택

- **프레임워크**: Next.js 15.3.1
- **언어**: TypeScript
- **데이터베이스**: MySQL 8.x
- **ORM**: Prisma 6.6.0
- **인증**: bcrypt (JWT 또는 세션 기반 예정)
- **기타 라이브러리**: zod, slugify, cors, dotenv 등

## 현재 개발 진행 상황

### 구현 완료된 기능
- ✅ 멀티 테넌시 아키텍처 설계
- ✅ Prisma 스키마 정의 (Core DB 및 Tenant DB)
- ✅ 테넌트 DB 자동 생성 기능 (헬스장 등록 시)
- ✅ 사용자 등록 API

### 진행 중인 기능
- 🔄 인증 시스템 (로그인/로그아웃)
- 🔄 헬스장 관리자 UI
- 🔄 회원 관리 기능

### 예정된 기능
- ⬜ 트레이너 관리
- ⬜ PT 수업 예약/관리
- ⬜ 출석 체크 시스템
- ⬜ 결제 관리
- ⬜ 대시보드 및 통계

## 시작하기

### 필수 조건
- Node.js 18 이상
- MySQL 8.x
- npm 또는 yarn

### 환경 설정
1. 저장소 클론:
```bash
git clone https://github.com/yourusername/GymHub.git
cd GymHub
```

2. 의존성 설치:
```bash
npm install
# 또는
yarn install

# Core DB Prisma 클라이언트 생성
npx prisma generate --schema=./prisma/schema.core.prisma
npx prisma generate --schema=./prisma/schema.tenant.prisma
```

3. 환경 변수 설정 (.env 파일 생성):
```
DATABASE_URL_CORE=mysql://username:password@localhost:3306/core_db
DB_TEMPLATE=mysql://username:password@localhost:3306
```

4. 데이터베이스 마이그레이션:
```bash
# Core DB 마이그레이션
npx prisma migrate deploy --schema=./prisma/schema.core.prisma
```

5. 개발 서버 실행:
```bash
npm run dev
# 또는
yarn dev
```

## API 엔드포인트

### 사용자 관리
- `POST /api/users` - 새 사용자 등록

### 헬스장 관리
- `POST /api/gyms` - 새 헬스장 등록 (테넌트 DB 자동 생성)

## 개발 로드맵

1. MVP 기능 완성 (현재 진행 중)
2. 관리자 UI 개발
3. 인증 및 권한 관리 강화
4. 확장 기능 개발 (모바일 앱 연동, 통계 대시보드 등)

