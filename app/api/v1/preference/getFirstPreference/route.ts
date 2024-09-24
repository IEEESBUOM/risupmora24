import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Fetch the allocation counts for all companies along with their names
    const allocationCounts = await prisma.allocation.groupBy({
      by: ['company_id'],
      _count: {
        company_id: true,
      },
      // Include company data (name) by joining with Company table
      include: {
        company: true,
      },
    });

    // Map the result to an array of objects containing company name and allocation count
    const allocationCountObject = allocationCounts.map((item) => ({
      companyName: item.company.company_name,  // Accessing the company name
      allocationCount: item._count.company_id, // Count of allocations
    }));

    console.log(allocationCountObject);

    return NextResponse.json(allocationCountObject, { status: 200 });
  } catch (error) {
    console.error("Error getting allocation counts with company names", error);
    return NextResponse.json(
      { error: "Error getting allocation counts with company names" },
      { status: 500 }
    );
  }
}
