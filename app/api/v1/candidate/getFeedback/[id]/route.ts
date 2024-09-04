import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Extract the ID from the URL using the pathname
    const { pathname } = new URL(req.url);
    const candidateId = pathname.split("/").pop();

    if (!candidateId) {
      return NextResponse.json(
        { message: "Candidate ID is required" },
        { status: 400 }
      );
    }

    // Log for debugging purposes

    // Query the database using Prisma
    const data = await prisma.feedback.findMany({
      where: {
        candidate_id: candidateId,
      },
    });

    if (!data) {
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json(
      { message: "Error of the server" },
      { status: 500 }
    );
  }
}
