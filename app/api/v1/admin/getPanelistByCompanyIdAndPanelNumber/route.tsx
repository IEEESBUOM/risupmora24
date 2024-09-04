import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const company_id = searchParams.get("company_id");
    const panel_number = searchParams.get("pannel_number");

    if (!company_id) {
      return NextResponse.json(
        { message: "company_id is required" },
        { status: 400 }
      );
    }

    const panelNumberParsed = panel_number
      ? parseInt(panel_number, 10)
      : undefined;

    const data = await prisma.panelist.findMany({
      where: {
        company_id: company_id,
        pannel_number: panelNumberParsed,
      },
    });

    return NextResponse.json({ data });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
