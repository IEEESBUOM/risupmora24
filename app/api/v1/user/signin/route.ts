import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "email and password required" },
        { status: 500 }
      );
    }
    console.log(email, password);
    const data = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!data || !data.password) {
      return NextResponse.json(
        { message: "Invalid user name or password" },
        { status: 404 }
      );
    }

    const isMatch = await comparePassword(password, data.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid user name or password" },
        { status: 404 }
      );
    }

    if (!data.emailVerifyStatus) {
      return NextResponse.json(
        { message: "Please verify your email" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "error of the server" },
      { status: 500 }
    );
  }
}
