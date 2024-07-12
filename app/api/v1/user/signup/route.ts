import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";



export async function POST(req: NextRequest) {
  try {
    const { username, password, email } = await req.json();

    if (!username || !password || !email) {
      return NextResponse.json(
        { message: "username, password and email are required" },
        { status: 400 }
      );
    }
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      return NextResponse.json(
        { message: "user already exists" },
        { status: 400 }
      );
    }

const hashedPassword = await bcrypt.hash(password, 10);


    const user = await prisma.user.create({
      data: {
        name: username,
        password:hashedPassword,
        email,
        
      },
    });
    if (!user) {
      return NextResponse.json(
        { message: "error of the server" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "error of the server" },
      { status: 500 }
    );
  }
}
