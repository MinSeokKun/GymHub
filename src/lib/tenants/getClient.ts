import { PrismaClient } from '../../../prisma/generated/tenant';
import * as dotenv from 'dotenv';

dotenv.config();

// 테넌트 클라이언트 캐시 (성능 향상을 위함)
const tenantClients: Record<string, PrismaClient> = {};

/**
 * 테넌트 DB 이름으로 Prisma 클라이언트를 가져오는 함수
 * @param dbName 테넌트 DB 이름 (gym_xxxx 형식)
 * @returns 테넌트용 Prisma 클라이언트 인스턴스
 */
export async function getTenantClient(dbName: string): Promise<PrismaClient> {
  // 이미 생성된 클라이언트가 있으면 재사용
  if (tenantClients[dbName]) {
    return tenantClients[dbName];
  }

  // DB 연결 문자열 구성 (기본 URL에서 데이터베이스 이름만 변경)
  const baseUrl = process.env.DATABASE_URL_TENANT_BASE || process.env.DB_TEMPLATE;
  if (!baseUrl) {
    throw new Error('DATABASE_URL_TENANT_BASE 또는 DB_TEMPLATE 환경 변수가 설정되어 있지 않습니다.');
  }

  // URL에서 데이터베이스 부분을 교체 (mysql://user:pass@host:port/DATABASE)
  const connectionUrl = baseUrl.replace(/\/[^\/]*$/, `/${dbName}`);

  // 새 Prisma 클라이언트 생성 및 연결
  const client = new PrismaClient({
    datasources: {
      db: {
        url: connectionUrl,
      },
    },
  });

  // 캐시에 저장
  tenantClients[dbName] = client;
  
  return client;
}

/**
 * 테넌트 클라이언트를 해제하는 함수 (서버 종료 시 또는 필요할 때 호출)
 * @param dbName 특정 DB만 해제하려면 이름 지정, 없으면 전체 해제
 */
export async function disconnectTenantClients(dbName?: string): Promise<void> {
  if (dbName && tenantClients[dbName]) {
    await tenantClients[dbName].$disconnect();
    delete tenantClients[dbName];
    return;
  }

  // 모든 클라이언트 연결 해제
  for (const db in tenantClients) {
    await tenantClients[db].$disconnect();
    delete tenantClients[db];
  }
}