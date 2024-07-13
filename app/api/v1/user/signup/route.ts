import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

import { sendVerificationEmail } from "@/lib/nodemailer";



export async function POST(req: NextRequest) {
  try {
    const { username, password, email } = await req.json();
    console.log(username, password, email);

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
console.log(hashedPassword);
const verificationToken = await bcrypt.hash(email.toString(), 10);
console.log(verificationToken);


    const user = await prisma.user.create({
      data: {
        name: username,
        password:hashedPassword,
        email,
        verificationToken,
        
      },
    });

    console.log(user);
    if (!user) {
      return NextResponse.json(
        { message: "error of the server" },
        { status: 500 }
      );
    }
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "error of the server" },
      { status: 500 }
    );
  }
}
