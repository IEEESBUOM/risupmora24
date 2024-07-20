import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Request = {
  id: string;
  firstName: string;
  lastName: string;
  nameWithInitials: string;
  universityID: string;
  contactNo: number;
  degree: string;
  department: string;
  cv: FileList;
  photo: FileList;
  email: string;
};

export async function POST(req: NextRequest) {
  try {
    const {
      id,
      firstName,
      lastName,
      nameWithInitials,
      universityID,
      contactNo,
      degree,
      department,
      cv,
      photo,
      email,
    }: Request = await req.json();

    const data = {
      id,
      firstName,
      lastName,
      nameWithInitials,
      universityID,
      contactNo: contactNo.toString(),  // Ensure contactNo is a string
      degree,
      department,
      cv,
      photo,
      email,
    };
    console.log(data);

    // const data = await prisma.user.findMany();

    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json(
      { message: "error of the server" },
      { status: 500 }
    );
  }
}
