import { NextRequest, NextResponse } from 'next/server';
import { prismaCore } from '@/lib/prisma-core';
import bcrypt from 'bcrypt';
import { generateToken } from '@/lib/auth/jwt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 기본 유효성 검사
    if (!email || !password) {
      return NextResponse.json(
        { error: '이메일과 비밀번호를 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    // 사용자 조회
    const user = await prismaCore.user.findUnique({
      where: { email }
    });

    // 사용자가 존재하지 않거나 비밀번호가 일치하지 않음
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { error: '이메일 또는 비밀번호가 일치하지 않습니다.' },
        { status: 401 }
      );
    }

    // 비밀번호 제외한 사용자 정보
    const { password: _, ...userWithoutPassword } = user;

    // JWT 토큰 생성
    const token = generateToken(userWithoutPassword);

    // 응답
    return NextResponse.json({
      message: '로그인 성공',
      user: userWithoutPassword,
      token
    });

  } catch (error) {
    console.error('로그인 오류:', error);
    return NextResponse.json(
      { error: '로그인 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}