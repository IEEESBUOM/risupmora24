import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  console.log("GET");
  try {
    const { searchParams } = new URL(req.url);
    const company_id = searchParams.get("company_id");

    console.log(company_id);

    if (!company_id) {
      return NextResponse.json(
        { message: "company_id is required" },
        { status: 400 }
      );
    }
    const data = await prisma.panelist.findMany({
      where: {
        company_id: company_id,
      },
    });
    console.log(data);
    return NextResponse.json({ data });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
