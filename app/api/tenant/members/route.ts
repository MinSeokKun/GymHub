import { NextRequest, NextResponse } from 'next/server';
import { getTenantClient } from '@/lib/tenants/getClient';

/**
 * 회원 목록 조회 API
 */
export async function GET(request: NextRequest) {
  try {
    // 미들웨어에서 추가한 테넌트 DB 이름 가져오기
    const tenantDB = request.headers.get('x-tenant-db');
    
    if (!tenantDB) {
      return NextResponse.json(
        { error: '테넌트 DB 정보가 없습니다.' }, 
        { status: 400 }
      );
    }
    
    // 테넌트 DB에 연결하기
    const prisma = await getTenantClient(tenantDB);
    
    // URL 쿼리 파라미터 처리
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // 회원 검색 조건
    const where = search 
      ? {
          OR: [
            { name: { contains: search } },
            { phone: { contains: search } },
            { email: { contains: search } }
          ]
        }
      : {};
    
    // 회원 목록 조회
    const [members, total] = await Promise.all([
      prisma.member.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
          birth: true,
          memo: true,
          createdAt: true,
          // 필요한 필드만 선택
        }
      }),
      prisma.member.count({ where })
    ]);
    
    // 페이지네이션 정보 계산
    const totalPages = Math.ceil(total / limit);
    
    return NextResponse.json({
      members,
      pagination: {
        total,
        page,
        limit,
        totalPages
      }
    });
  } catch (error) {
    console.error('회원 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '회원 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * 회원 등록 API
 */
export async function POST(request: NextRequest) {
  try {
    // 테넌트 DB 이름 가져오기
    const tenantDB = request.headers.get('x-tenant-db');
    
    if (!tenantDB) {
      return NextResponse.json(
        { error: '테넌트 DB 정보가 없습니다.' }, 
        { status: 400 }
      );
    }
    
    // 요청 본문 가져오기
    const body = await request.json();
    
    // 필수 필드 검증
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: '이름과 연락처는 필수 입력 사항입니다.' },
        { status: 400 }
      );
    }
    
    // 테넌트 DB에 연결
    const prisma = await getTenantClient(tenantDB);
    
    // 이메일 중복 확인 (이메일이 제공된 경우)
    if (body.email) {
      const existing = await prisma.member.findUnique({
        where: { email: body.email }
      });
      
      if (existing) {
        return NextResponse.json(
          { error: '이미 등록된 이메일입니다.' },
          { status: 409 }
        );
      }
    }
    
    // 회원 생성
    const newMember = await prisma.member.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email || null,
        birth: body.birth ? new Date(body.birth) : null,
        memo: body.memo || null
      }
    });
    
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error('회원 등록 오류:', error);
    return NextResponse.json(
      { error: '회원 등록 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}