import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const {
      allocation_date,
      allocation_timeSlot,
      allocated_panel_number,
      candidate_id,
      company_id,
      panelist_id,
      allocation_status,
    } = await req.json();

    // Log the received data for debugging purposes
    console.log(
      allocation_date,
      allocation_timeSlot,
      allocated_panel_number,
      candidate_id,
      company_id,
      panelist_id,
      allocation_status
    );

    // Validate the required fields
    if (
      !allocation_timeSlot ||
      !allocated_panel_number ||
      !candidate_id ||
      !company_id ||
      !panelist_id
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // console.log(company_id, panelist_id, candidate_id);

    // Create the allocation record
    await prisma.allocation.create({
      data: {
        allocation_date: allocation_date, // Using the date provided by the user
        allocation_timeSlot: allocation_timeSlot,
        allocated_panel_number: allocated_panel_number,
        attendance: false,
        candidate: {
          connect: { candidate_id: candidate_id }, // Assuming 'id' is the primary key field for the Candidate model
        },
        company: {
          connect: { company_id: company_id }, // Assuming 'id' is the primary key field for the Company model
        },
        panelist: {
          connect: { panelist_id: panelist_id }, // Assuming 'id' is the primary key field for the Panelist model
        },
        allocation_status: allocation_status, // Adjust this field as needed
      },
    });

    // Return a success response
    return NextResponse.json(
      { message: "Allocation created successfully" },
      { status: 201 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Server error occurred" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { candidate_id } = await req.json();

    if (!candidate_id) {
      return NextResponse.json(
        { message: "Candidate ID is required" },
        { status: 400 }
      );
    }

    await prisma.allocation.deleteMany({
      where: { candidate_id: candidate_id },
    });

    return NextResponse.json(
      { message: "Allocations deleted successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Server error occurred" },
      { status: 500 }
    );
  }
}
