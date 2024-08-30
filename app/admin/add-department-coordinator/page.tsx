import React from "react";

export default function Page() {
  const updatedCompanyList = [
    { com_name: "Company A", com_id: 1 },
    { com_name: "Company B", com_id: 2 },
    { com_name: "Company C", com_id: 3 },
  ];

  const departmentList = [
    { dept_name: "Department X", dept_id: 1 },
    { dept_name: "Department Y", dept_id: 2 },
    { dept_name: "Department Z", dept_id: 3 },
  ];

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
        <form className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-11 space-y-2 sm:space-y-0">
            <label
              htmlFor="coordinatorName"
              className="text-lg font-bold text-black min-w-[150px]"
            >
              Coordinator Name
            </label>
            <input
              id="coordinatorName"
              type="text"
              className="w-full sm:flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Coordinator Name"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:space-x-11 space-y-2 sm:space-y-0">
            <label
              htmlFor="comName"
              className="text-lg font-bold text-black min-w-[150px]"
            >
              Coordinator Company
            </label>
            <select
              id="comName"
              className="w-full sm:flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">-- Select a Company --</option>
              {updatedCompanyList.map((company) => (
                <option key={company.com_id} value={company.com_name}>
                  {company.com_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:space-x-11 space-y-2 sm:space-y-0">
            <label
              htmlFor="departmentName"
              className="text-lg font-bold text-black min-w-[150px]"
            >
              Department Name
            </label>
            <select
              id="departmentName"
              className="w-full sm:flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">-- Select a Department --</option>
              {departmentList.map((department) => (
                <option key={department.dept_id} value={department.dept_name}>
                  {department.dept_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:space-x-11 space-y-2 sm:space-y-0">
            <label
              htmlFor="email"
              className="text-lg font-bold text-black min-w-[150px]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full sm:flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Email"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:space-x-11 space-y-2 sm:space-y-0">
            <label
              htmlFor="password"
              className="text-lg font-bold text-black min-w-[150px]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full sm:flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Password"
            />
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
}
