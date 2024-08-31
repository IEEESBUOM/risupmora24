import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const companies = await prisma.company.findMany();
        console.log(companies);
        return NextResponse.json({ companies });
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { message: "error of the server" },
            { status: 500 }
        );
    }
}