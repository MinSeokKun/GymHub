import { NextResponse } from "next/server";
import { prismaCore } from "@/src/lib/prisma-core";  // 변경됨
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password, name, role = "admin" } = await req.json();  // role 기본값 추가

    if (!email || !password || !name) {
      return NextResponse.json({ error: "모든 필드를 입력해주세요." }, { status: 400 });
    }

    const existing = await prismaCore.user.findUnique({ where: { email } });  // prismaCore 사용
    if (existing) {
      return NextResponse.json({ error: "이미 존재하는 이메일입니다." }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prismaCore.user.create({  // prismaCore 사용
      data: {
        email,
        name,
        password: hashed,
        role,  // role 필드 추가 (스키마에서 필수 필드임)
      },
    });

    // 민감한 정보 제외
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({ user: userWithoutPassword }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}