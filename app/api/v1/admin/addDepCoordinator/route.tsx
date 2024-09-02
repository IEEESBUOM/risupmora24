import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Department } from "@prisma/client";

type Request = {
    coordinatorName: string;
    departmentName: string;
    email: string;
    password: string;
};

export async function POST(req: NextRequest) {
    try{
        const {coordinatorName, departmentName, email, password}: Request = await req.json();

        console.log(coordinatorName);
        console.log(departmentName);
        console.log(email);
        console.log(password);

        const hashedPassword = await bcrypt.hash(password, 10);

        
        

        const excistUser = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if(excistUser){
            return NextResponse.json({message: "A user already exists with this email"}, {status: 400});
        }

        const user = await prisma.user.create({
            data: {
                name: coordinatorName,
                email,
                emailVerifyStatus: true,
                password: hashedPassword,
                role: "departmentCoordinator"
            }
        });

        if(!user){
            return NextResponse.json({message: "Error adding department coordinator"}, {status: 500});
        }
        const depEnum = departmentName as Department;
        const departmentCoordinator = await prisma.departmentCordinator.create({
            data: {
                department: depEnum,
                cordinator_id: user.id
            }
        });

        if(!departmentCoordinator){
            return NextResponse.json({message: "Error adding department coordinator"}, {status: 500});
        }

        return NextResponse.json({message: "Department coordinator added successfully"});

    }catch(error){
        console.log(error);
        return NextResponse.json({message: "Error adding company coordinator"}, {status: 500});
    }
}