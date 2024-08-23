import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Value } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function CompanyPreference({
  userEmail,pref1,pref2,pref3,pref4
}: {
  userEmail: string;
  pref1:string;
  pref2:string;
  pref3:string;
  pref4:string;
}) {
    useEffect(() => {
      console.log(pref1)
        
        const fetchCompanyData = async () => {
            const response = await fetch(`/api/v1/company/getAllCompany`);
            console.log(response);
        };

        fetchCompanyData();
    }, []);
  const updateCompanyPreference = async  () => {
    
    if (!prefCompany1 || !prefCompany2 || !prefCompany3 || !prefCompany4) {
      toast.error("Please select all preferences");
      return;  
    }

    const data = {
      email: userEmail,
      prefCompany1,
      prefCompany2,
      prefCompany3,
      prefCompany4,
    };

    
      const response = await fetch("/api/v1/candidate/updateCompanyPreference", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      toast.success(responseData.message);
   
    
    

    
  }
  const [prefCompany1, setPrefCompany1] = useState(pref1 || "");
  const [prefCompany2, setPrefCompany2] = useState(pref2 || "");
  const [prefCompany3, setPrefCompany3] = useState(pref3 || "");
  const [prefCompany4, setPrefCompany4] = useState(pref4 || "");
  const [companyData,setCompanyData] = useState([])
  const updatedCompanyList = [
    { com_name: "Company A", com_id: 1 },
    { com_name: "Company B", com_id: 2 },
    { com_name: "Company C", com_id: 3 },
  ];
  return (
    <div className="my-5">
      <div className=" text-lg mb-5 font-semibold">
        choose your company preference from here{" "}
      </div>
      <div className=" grid gap-4">
        <div className="flex items-center space-x-4">
          <div className="">Preference 1</div>
          <Select
            value={prefCompany1}
            onValueChange={(value) => setPrefCompany1(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a company" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup className="bg-white">
                <SelectLabel>Company</SelectLabel>
                {updatedCompanyList.map((company) => (
                  <SelectItem key={company.com_id} value={company.com_name}>
                    {company.com_name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-4">
          <div className="">Preference 2</div>
          <Select
            value={prefCompany2}
            onValueChange={(value) => setPrefCompany2(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a company" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup className="bg-white">
                <SelectLabel>Company</SelectLabel>
                {updatedCompanyList.map((company) => (
                  <SelectItem key={company.com_id} value={company.com_name}>
                    {company.com_name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-4">
          <div className="">Preference 3</div>
          <Select
            value={prefCompany3}
            onValueChange={(value) => setPrefCompany3(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a company" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup className="bg-white">
                <SelectLabel>Company</SelectLabel>
                {updatedCompanyList.map((company) => (
                  <SelectItem key={company.com_id} value={company.com_name}>
                    {company.com_name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-4">
          <div className="">Preference 4</div>
          <Select
            value={prefCompany4}
            onValueChange={(value) => setPrefCompany4(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a company" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup className="bg-white">
                <SelectLabel>Company</SelectLabel>
                {updatedCompanyList.map((company) => (
                  <SelectItem key={company.com_id} value={company.com_name}>
                    {company.com_name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <button className="my-4 bg-[#0c2735] text-white font rounded-[10px] border-none  cursor-pointer z-20 py-2.5 px-7" onClick={updateCompanyPreference} >Update preference</button>
    </div>
  );
}
