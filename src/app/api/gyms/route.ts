import { NextRequest, NextResponse } from "next/server";
import { prismaCore } from "@/lib/prisma-core";
import { createTenantDB } from "@/lib/tenants/createTenant";

export async function POST(req: Request) {
  const { name, ownerId } = await req.json();

  const dbName = await createTenantDB(name);

  const newGym = await prismaCore.gym.create({
    data: {
      name,
      dbName,
      ownerId
    },
  });

  return Response.json(newGym);
}

// GET 메서드 추가: 사용자의 헬스장 목록 조회
export async function GET(request: NextRequest) {
  try {
    // 미들웨어에서 추가한 사용자 ID 가져오기
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json(
        { error: '인증된 사용자 정보를 찾을 수 없습니다.' },
        { status: 401 }
      );
    }

    // 문자열 ID를 숫자로 변환
    const userIdNum = parseInt(userId, 10);
    
    // 사용자 소유 또는 관리자로 등록된 헬스장 목록 조회
    const gyms = await prismaCore.gym.findMany({
      where: {
        OR: [
          { ownerId: userIdNum },
          { admins: { some: { userId: userIdNum } } }
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

    return NextResponse.json({ gyms });
  } catch (error) {
    console.error('헬스장 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '헬스장 목록을 조회하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}