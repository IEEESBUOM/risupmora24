"use client"


import React,{useEffect,useState} from "react";
import { useForm, SubmitHandler, set } from "react-hook-form";
import toast from "react-hot-toast";

const Page = () => {
  const [errorMessage, setErrorMessage] = useState("");


  

  const [updatedCompanyList,setUpdatedCompanyList] = useState<{ company_id: number; company_name: string; }[]>([]);

  type Inputs = {
    panelistName: string;
    comId: string;
    panelNumber: string;
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
      
        
    const fetchCompanyData = async () => {
        const response = await fetch(`/api/v1/company/getAllCompany`);
        const responseData = await response.json();
        setUpdatedCompanyList(responseData.companies);

    };

    fetchCompanyData();
    
}, []);


  


  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("data");
    console.log(data);

    toast.promise(
      new Promise<void>((resolve, reject) => {

        fetch("/api/v1/admin/addPanelist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => {
            if (res.ok) {
              resolve();
              setErrorMessage("");
            } else {
              res.json().then((data) => {
                setErrorMessage(data.message);
                reject();
              });

            }
          })
          .catch((error) => {
            reject(error);
          });

      }),
      {
        loading: "Pending request...",
        success: "Panelist added successfully",
      error: "Failed to add Panelist",
      }
    )
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-0">
      <div className="absolute top-0 left-0 m-5 sm:m-10">
        <div className="relative">
          <div className="absolute bg-[#0c2735] text-white font rounded-[10px] border-none cursor-pointer z-10 py-2 px-4 sm:py-2 sm:px-5 top-4 left-4">
            <div className="font-poppins text-[20px] sm:text-[30px] md:text-[40px] line-height-1">
              Registration
            </div>
          </div>
          <div className="absolute top-1 left-0 mt-6 ml-1.5 sm:mt-8 sm:ml-3 bg-[#f1c232] text-[#f1c232] rounded-[10px] border-none py-2 cursor-pointer h-[40px] w-[150px] sm:w-[270px] sm:h-[70px]"></div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-5 sm:p-10 max-w-lg w-full sm:max-w-2xl">


        <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-11 space-y-2 sm:space-y-0">
            <label
              htmlFor="panelistName"
              className="text-lg font-bold text-black min-w-[150px]"
            >
              Panelist Name
            </label>
            <input
            {...register("panelistName", { required: {value:true,message:"panelist Name is required"} })}
              id="panelistName"
              type="text"
              className="w-full sm:flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Panelist Name"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:space-x-11 space-y-2 sm:space-y-0">
            <label
              htmlFor="comName"
              className="text-lg font-bold text-black min-w-[150px]"
            >
              Panelist Company
            </label>
            <select
            {...register("comId", { required: {value:true,message:"panelist company name is required"} })}
              id="comName"
              className="w-full sm:flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">-- Select a Company --</option>
              {updatedCompanyList.map((company) => (
                <option key={company.company_id} value={company.company_id}>
                  {company.company_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:space-x-11 space-y-2 sm:space-y-0">
            <label
              htmlFor="panelNumber"
              className="text-lg font-bold text-black min-w-[150px]"
            >
              Panel Number
            </label>
            <input
            {...register("panelNumber", { required: {value:true,message:"panel Number is required"} })}
              id="panelNumber"
              type="text"
              className="w-full sm:flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Panel Number"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col sm:flex-row items-center sm:space-x-11 space-y-2 sm:space-y-0">
            <label
              htmlFor="email"
              className="text-lg font-bold text-black min-w-[150px]"
            >
              Email
            </label>
            <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email",
              },
            })}
              id="email"
              type="email"
              className="w-full sm:flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Email"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col sm:flex-row items-center sm:space-x-11 space-y-2 sm:space-y-0">
            <label
              htmlFor="password"
              className="text-lg font-bold text-black min-w-[150px]"
            >
              Password
            </label>
            <input
            {...register("password", {
              required: true,
              minLength: {
                value: 6,
                message: "password must be atleast 6 characters ",
              },
              maxLength: 20,
            })}
              id="password"
              type="password"
              className="w-full sm:flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Password"
            />
          </div>

          <div className=" mb-4 text-red-500">
            <p>
              {errors.panelistName?.message || errors.comId?.message || errors.panelNumber?.message || errors.email?.message || errors.password?.message || errorMessage }
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="py-2 px-6 border border-transparent shadow-sm text-lg font-medium rounded-full text-white bg-[#0c2735] hover:bg-[#f1c232] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Page;
