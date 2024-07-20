import prisma from "@/lib/prisma";
import { RegistrationFormDataSendType } from "@/Type";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      firstName,
      lastName,
      nameWithInitials,
      universityID,
      contactNo,
      degree,
      department,
      cvUrl,
      imgUrl,
      userId,
    }: RegistrationFormDataSendType = await req.json();

    const data = {
      firstName,
      lastName,
      nameWithInitials,
      universityID,
      contactNo: Number(contactNo),  // Convert contactNo to number
      degree,
      department,
      cvUrl,
      imgUrl,
      user: {
        connect: {
          id: userId,
        },
      },
    };

    const response = await prisma.candidate.create({
      data: data,
    });

    console.log(response);

    return NextResponse.json({ response });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "error of the server" },
      { status: 500 }
    );
  }
}
