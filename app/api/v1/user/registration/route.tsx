import prisma from "@/lib/prisma";
import { RegistrationFormDataSendType } from "@/Type";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
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

    console.log(userId);
    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    console.log(userExists);

    if (!userExists) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const data = {
      candidate_id: userId, // Match the candidate_id with the user's id
      firstName,
      lastName,
      nameWithInitials,
      universityID,
      contactNo,
      degree,
      department,
      cvUrl,
      imgUrl,
    };

    const response = await prisma.candidate.create({
      data: data,
    });

    console.log(response);

    return NextResponse.json({ response });
  } catch (e) {
    // if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
    //   console.log("Error: User not found.");
    //   return NextResponse.json(
    //     {
    //       message:
    //         "This universityId has been used before. Please enter new ID.",
    //     },
    //     { status: 400 }
    //   );
    // }

    console.log(e);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
