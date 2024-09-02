import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const candidateId = url.searchParams.get("candidateId");

  if (!candidateId) {
    return NextResponse.json(
      { error: "Invalid candidate ID" },
      { status: 400 }
    );
  }

  try {
    const allocations = await prisma.allocation.findMany({
      where: {
        candidate_id: candidateId,
      },
      select: {
        allocation_id: true,
        allocation_date: true,
        allocation_timeSlot: true,
        attendance: true,
        company: {
          select: {
            company_name: true,
          },
        },
        panelist: {
          select: {
            pannel_number: true,
          },
        },
      },
    });

    if (allocations.length === 0) {
      return NextResponse.json(
        { message: "No allocations found" },
        { status: 404 }
      );
    }

    return NextResponse.json(allocations, { status: 200 });
  } catch (error) {
    console.error("Error fetching allocations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

