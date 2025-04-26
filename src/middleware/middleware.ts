import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prismaCore } from '@/src/lib/prisma-core';

/**
 * 미들웨어 - 테넌트 정보 처리
 * 
 * 이 미들웨어는 API 요청에서 테넌트 정보를 추출하여
 * 요청 헤더에 저장합니다. 
 * 
 * 주요 역할:
 * 1. 헤더 또는 JWT에서 사용자 ID 가져오기
 * 2. 사용자의 헬스장 정보 찾기
 * 3. 테넌트 DB 이름을 헤더에 추가
 */
export async function middleware(request: NextRequest) {
  // API 라우트인 경우만 처리 (/api/tenant/로 시작하는 경로)
  if (!request.nextUrl.pathname.startsWith('/api/tenant/')) {
    return NextResponse.next();
  }

  try {
    // 인증 토큰이나 세션 쿠키에서 사용자 ID 추출
    // 아래는 예시 코드로, 실제 인증 방식에 맞게 수정 필요
    const authHeader = request.headers.get('authorization');
    const userId = getUserIdFromAuth(authHeader);
    
    if (!userId) {
      return NextResponse.json(
        { error: '인증 정보가 없습니다.' },
        { status: 401 }
      );
    }

    // 사용자가 관리하는 헬스장 중 선택된 헬스장 ID
    // 헤더에서 선택된 헬스장 ID를 추출하거나, 첫 번째 헬스장 사용
    const gymIdHeader = request.headers.get('x-gym-id');
    let gymId = gymIdHeader ? parseInt(gymIdHeader) : null;

    // 사용자의 헬스장 정보 조회
    let gym;
    if (gymId) {
      // 특정 헬스장 정보 조회 + 권한 확인
      gym = await prismaCore.gym.findFirst({
        where: {
          id: gymId,
          OR: [
            { ownerId: userId },
            { admins: { some: { userId } } }
          ]
        }
      });
    } else {
      // 첫 번째 헬스장 정보 조회
      gym = await prismaCore.gym.findFirst({
        where: {
          OR: [
            { ownerId: userId },
            { admins: { some: { userId } } }
          ]
        }
      });
    }

    if (!gym) {
      return NextResponse.json(
        { error: '접근 가능한 헬스장이 없습니다.' },
        { status: 403 }
      );
    }

    // 요청에 테넌트 DB 정보 추가
    const response = NextResponse.next();
    response.headers.set('x-tenant-db', gym.dbName);
    response.headers.set('x-gym-id', String(gym.id));
    
    return response;
  } catch (error) {
    console.error('테넌트 미들웨어 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * 인증 헤더에서 사용자 ID 추출 (예시 함수)
 * 실제 인증 방식에 맞게 구현 필요
 */
function getUserIdFromAuth(authHeader: string | null): number | null {
  // JWT 토큰이나 세션 데이터에서 사용자 ID를 추출하는 로직
  // 예시 코드로, 실제 인증 방식에 맞게 수정 필요
  if (!authHeader) return null;
  
  // Bearer 토큰에서 JWT 추출
  const token = authHeader.replace('Bearer ', '');
  
  try {
    // 여기서는 JWT 디코딩/검증 로직이 들어가야 함
    // 예시로 ID를 1로 하드코딩 (실제 코드에서는 제거)
    return 1; // 임시 ID
  } catch (error) {
    return null;
  }
}

// 미들웨어 설정 - 어떤 경로에 적용할지 설정
export const config = {
  matcher: '/api/tenant/:path*',
};