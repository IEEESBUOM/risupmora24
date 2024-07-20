import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePassword } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: any) {
  try {
    const userId = params.id;
    console.log(userId);
    const candidate = await prisma.candidate.findFirst({
      where: {
        User: {
          id: userId, // Match the user ID with the id in the User table
        },
      },
      include: {
        User: true, // Optionally include user details if needed
      },
    });
    console.log(candidate);

    if (!candidate) {
      return NextResponse.json(
        { message: "Candidate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(candidate, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "error of the server" },
      { status: 500 }
    );
  }
}
