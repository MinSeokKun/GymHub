import { prismaCore } from '@/src/lib/prisma-core';
import { getTenantClient, disconnectTenantClients } from './getClient';
import { createTenantDB } from './createTenant';
import { NextRequest } from 'next/server';

/**
 * 현재 요청의 테넌트 정보를 추출하여 프리즈마 클라이언트를 반환
 * API 핸들러 내에서 사용
 */
export async function getCurrentTenantClient(request: NextRequest) {
  const tenantDB = request.headers.get('x-tenant-db');
  
  if (!tenantDB) {
    throw new Error('테넌트 DB 정보가 없습니다. 미들웨어가 올바르게 설정되었는지 확인하세요.');
  }
  
  return getTenantClient(tenantDB);
}

/**
 * 현재 요청의 헬스장 ID 반환
 */
export function getCurrentGymId(request: NextRequest): number | null {
  const gymId = request.headers.get('x-gym-id');
  return gymId ? parseInt(gymId) : null;
}

/**
 * 특정 사용자가 접근 가능한 모든 헬스장 목록 조회
 */
export async function getUserGyms(userId: number) {
  return prismaCore.gym.findMany({
    where: {
      OR: [
        { ownerId: userId },
        { admins: { some: { userId } } }
      ]
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
}

/**
 * 사용자가 특정 헬스장에 접근 권한이 있는지 확인
 */
export async function hasGymAccess(userId: number, gymId: number): Promise<boolean> {
  const gym = await prismaCore.gym.findFirst({
    where: {
      id: gymId,
      OR: [
        { ownerId: userId },
        { admins: { some: { userId } } }
      ]
    }
  });
  
  return !!gym;
}

/**
 * 테넌트 DB 이름으로 해당 헬스장 정보 조회
 */
export async function getGymByDbName(dbName: string) {
  return prismaCore.gym.findFirst({
    where: { dbName },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
}

/**
 * 모든 테넌트 DB 연결 해제 (서버 종료 시 호출)
 */
export async function cleanupTenantConnections() {
  await disconnectTenantClients();
}