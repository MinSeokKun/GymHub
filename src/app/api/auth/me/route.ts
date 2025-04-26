import { NextRequest, NextResponse } from 'next/server';
import { prismaCore } from '@/lib/prisma-core';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/jwt';

export async function GET(request: NextRequest) {
  try {
    // Authorization 헤더에서 토큰 추출
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

    // 사용자 ID 추출 및 최신 사용자 정보 조회
    const userId = payload.userId as number || parseInt(payload.sub as string, 10);
    const user = await prismaCore.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        // 사용자 소유 헬스장 및 관리자로 등록된 헬스장 정보 가져오기
        gyms: {
          select: {
            id: true,
            name: true,
            dbName: true
          }
        },
        gymAdmin: {
          select: {
            gym: {
              select: {
                id: true,
                name: true,
                dbName: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 응답
    return NextResponse.json({ user });

  } catch (error) {
    console.error('사용자 정보 조회 오류:', error);
    return NextResponse.json(
      { error: '사용자 정보 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}