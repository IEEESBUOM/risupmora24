import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const feedback = await prisma.feedback.findMany();
    console.log(feedback);
    return NextResponse.json(feedback, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "error of the server" },
      { status: 500 }
    );
  }
}
