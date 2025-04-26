import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prismaCore } from '@/lib/prisma-core';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/jwt';

/**
 * 미들웨어 - 인증 및 테넌트 정보 처리
 */
export async function middleware(request: NextRequest) {
  // 1. 인증 처리
  // 인증이 필요한 경로 패턴 (API 라우트)
  const authRequiredPaths = [
    '/api/tenant/',
    '/api/gyms',
    '/api/auth/me'
  ];

  const loginPath = '/api/auth/login';

  // 현재 경로가 인증이 필요한지 확인
  const requiresAuth = authRequiredPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  // 로그인 경로는 인증 검사 제외
  if (request.nextUrl.pathname === loginPath) {
    return NextResponse.next();
  }

  // 인증이 필요한 경로에 대해 JWT 검증
  if (requiresAuth) {
    // 헤더에서 토큰 추출
    const authHeader = request.headers.get('authorization');
    console.log('Authorization 헤더 전체 내용:', authHeader); // 실제 토큰 값을 로그에 출력

    const token = extractTokenFromHeader(authHeader);
    if (!token) {
      console.log('토큰이 없음 - 401 반환');
      return NextResponse.json(
        { error: '인증 토큰이 필요합니다.' },
        { status: 401 }
      );
    }

    // 토큰 검증 (비동기 함수)
    const payload = await verifyToken(token);
    if (!payload || typeof payload !== 'object') {
      return NextResponse.json(
        { error: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }

    // 사용자 ID 추출
    const userId = payload.userId as number || parseInt(payload.sub as string, 10);
    
    // 요청에 사용자 ID 추가
    const response = NextResponse.next();
    // console.log('Setting headers:', { userId: String(userId) });
    response.headers.set('x-user-id', String(userId));
    
    // 2. 테넌트 정보 처리 (테넌트 API인 경우만)
    if (request.nextUrl.pathname.startsWith('/api/tenant/')) {
      try {
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
        response.headers.set('x-tenant-db', gym.dbName);
        response.headers.set('x-gym-id', String(gym.id));
      } catch (error) {
        console.error('테넌트 미들웨어 오류:', error);
        return NextResponse.json(
          { error: '서버 오류가 발생했습니다.' },
          { status: 500 }
        );
      }
    }
    
    return response;
  }

  // 인증이 필요 없는 경로는 그냥 통과
  return NextResponse.next();
}

// 미들웨어 설정 - 어떤 경로에 적용할지 설정
export const config = {
  matcher: [
    '/api/tenant/:path*',
    '/api/gyms/:path*',
    '/api/auth/:path*'
  ],
};