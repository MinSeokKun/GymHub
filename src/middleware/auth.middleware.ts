import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/jwt';

/**
 * JWT 인증 미들웨어
 * 
 * 이 미들웨어는 API 요청에서 JWT 토큰을 검증하고
 * 사용자 ID를 헤더에 추가합니다.
 */
export async function authMiddleware(request: NextRequest) {
  // 인증이 필요한 경로 패턴 (API 라우트)
  const authRequiredPaths = [
    '/api/tenant/',
    '/api/gyms',
    '/api/auth/me'
  ];

  // 현재 경로가 인증이 필요한지 확인
  const requiresAuth = authRequiredPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  // 인증이 필요없는 경로는 그냥 통과
  if (!requiresAuth) {
    return NextResponse.next();
  }

  try {
    // 헤더에서 토큰 추출
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
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

    // 사용자 ID 추출 - jose 라이브러리에서는 달라진 페이로드 구조 사용
    // userId 필드 또는 sub 필드에서 ID 가져오기
    const userId = payload.userId as number || parseInt(payload.sub as string, 10);
    
    if (!userId) {
      return NextResponse.json(
        { error: '토큰에 사용자 ID 정보가 없습니다.' },
        { status: 401 }
      );
    }
    
    // 요청에 사용자 ID 추가
    const response = NextResponse.next();
    response.headers.set('x-user-id', String(userId));
    
    return response;
  } catch (error) {
    console.error('인증 미들웨어 오류:', error);
    return NextResponse.json(
      { error: '인증 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 미들웨어 설정 - 어떤 경로에 적용할지 설정
export const config = {
  matcher: [
    '/api/tenant/:path*',
    '/api/gyms/:path*',
    '/api/auth/me'
  ],
};