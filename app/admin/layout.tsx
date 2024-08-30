import Link from 'next/link'
import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import HamburgerButton from "@/components/ui/HamburgerButton";

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <div>
        <div className=" hidden md:flex gap-5 content-center justify-center text-lg py-6 text-zinc-700 font-poppins lg:font-medium bg-slate-100"> 
            <Link href="/admin/all-interviewees">All interviewees</Link>
            <Link href="/admin/add-company">Add Company</Link>
            <Link href="/admin/add-panelist">Add Panelist</Link>
            <Link href="/admin/add-company-coordinator">Add Company Coordinator</Link>
            <Link href="/admin/add-department-coordinator">Add Department Coordinator</Link>

        </div>



        <div className="md:hidden">
        <Sheet >
              <SheetTrigger asChild>
                <div className=" grid justify-start p-6">
                  <HamburgerButton />
                </div>
              </SheetTrigger>
              <SheetContent className="  grid content-start  bg-custom-black text-lg font-medium  text-white underline gap-5">

              <Link href="/admin/all-interviewees">All interviewees</Link>
            <Link href="/admin/add-company">Add Company</Link>
            <Link href="/admin/add-panelist">Add Panelist</Link>
            <Link href="/admin/add-company-coordinator">Add Company Coordinator</Link>
            <Link href="/admin/add-department-coordinator">Add Department Coordinator</Link>
                
              </SheetContent>
            </Sheet>
        </div>
        {children}

      
    </div>
  )
}
