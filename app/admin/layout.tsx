import Link from 'next/link'
import React from 'react'

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <div>
        <div className=" flex gap-5 content-center justify-center text-lg py-6 text-zinc-700 font-poppins font-medium bg-slate-100"> 
            <Link href="/admin/all-interviewees">All interviewees</Link>
            <Link href="/admin/add-company">Add Company</Link>
            <Link href="/admin/add-panelist">Add Panelist</Link>
            <Link href="/admin/add-company-coordinator">Add Company Coordinator</Link>
            <Link href="/admin/add-department-coordinator">Add Department Coordinator</Link>

        </div>
        {children}

      
    </div>
  )
}
