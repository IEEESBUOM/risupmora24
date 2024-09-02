"use client"
import Link from 'next/link'
import React from 'react'
import { signOut, useSession } from 'next-auth/react';
import { useGetUserData } from "@/hooks/user/useGetUserData";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import HamburgerButton from "@/components/ui/HamburgerButton";
import PageLoader from '@/components/PageLoader';
import PrimaryButtonSmall from '@/components/ui/PrimaryButtonSmall';

export default function Layout({children}: {children: React.ReactNode}) {
  
 
 

  const { data: session, status } = useSession();
  console.log(session);
  const userEmail = session?.user?.email;
  const userData = useGetUserData({ userEmail: userEmail || "" });
  const role = userData.user?.role;

  const path = window.location.pathname;
  console.log(path);

  const logoutHandler = async () => {
    
    await signOut();
    window.location.href = "/";
    
  }

  if(status === "loading" || userData.isPending){
    return <PageLoader />
  }
  return (
    <div>
        <div className=" hidden md:flex gap-5 content-center justify-center text-lg py-6 text-zinc-700 font-poppins lg:font-medium bg-slate-100"> 
            {(role == 'companyCoordinator' ) && <Link href={`/admin/company-coordinator/${userData.user.id}`}>Dashboard</Link>}
            {(role == 'departmentCoordinator' ) && <Link href={`/admin/department-coordinator/${userData.user.id}`}>Dashboard</Link>}
            {role == "admin" && <Link href={`/admin/add-company/`}>Add Company</Link>}
            {role == "admin" && <Link href={`/admin/add-panelist/`}>Add Panelist</Link>}
            {role == "admin" && <Link href={`/admin/add-company-coordinator/`}>Add Company Coordinator</Link>}
            {role == "admin" && <Link href={`/admin/add-department-coordinator/`}>Add Department Coordinator</Link>}

            

          <Link href={`/`}>
          <PrimaryButtonSmall text="Home"  />
          </Link>
          <div onClick={logoutHandler} >
          <PrimaryButtonSmall text="Sign out"  />
          </div>

        </div>



        <div className="md:hidden">
        <Sheet >
              <SheetTrigger asChild>
                <div className=" grid justify-start p-6">
                  <HamburgerButton />
                </div>
              </SheetTrigger>
              <SheetContent className="  grid content-start  bg-custom-black text-lg font-medium  text-white underline gap-5">

              {(role == 'companyCoordinator' ) && <Link href={`/admin/company-coordinator/${userData.user.id}`}>Dashboard</Link>}
            {(role == 'departmentCoordinator' ) && <Link href={`/admin/department-coordinator/${userData.user.id}`}>Dashboard</Link>}
            {role == "admin" && <Link href={`/admin/add-company/`}>Add Company</Link>}
            {role == "admin" && <Link href={`/admin/add-panelist/`}>Add Panelist</Link>}
            {role == "admin" && <Link href={`/admin/add-company-coordinator/`}>Add Company Coordinator</Link>}
            {role == "admin" && <Link href={`/admin/add-department-coordinator/`}>Add Department Coordinator</Link>}
            

          <Link href={`/`}>
          <PrimaryButtonSmall text="Home"  />
          </Link>

          <div onClick={logoutHandler} >
          <PrimaryButtonSmall text="Sign out"  />
          </div>
                
              </SheetContent>
            </Sheet>
        </div>
        {children}

      
    </div>
  )
}
