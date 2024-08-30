"use client";
import React, { useState } from "react";

const Page = () => {

  const [companies, setCompanies] = useState([
    { id: "1", name: "Company A", logo: "https://via.placeholder.com/50" },
    { id: "2", name: "Company B", logo: "https://via.placeholder.com/50" },
    { id: "3", name: "Company C", logo: "https://via.placeholder.com/50" },
  ]);

  const [newCompany, setNewCompany] = useState({
    id: "",
    name: "",
    logo: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setNewCompany({
      ...newCompany,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (newCompany.id && newCompany.name && newCompany.logo) {
      setCompanies([...companies, newCompany]);
      setNewCompany({ id: "", name: "", logo: "" });
    }
  };
  return (
<div className="flex flex-col lg:flex-row h-screen">
  <div className="lg:w-1/2 p-4  order-2 lg:order-2">
    <h2 className="text-l lg:text-2xl font-poppins mb-4 flex justify-center">Company List</h2>
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="px-0 lg:px-6 py-2 lg:py-3 border-b-2 border-gray-300 text-left leading-4 text-[#0c2735] tracking-wider font-poppins">
            ID
          </th>
          <th className="px-0 lg:px-6 py-2 lg:py-3 border-b-2 border-gray-300 text-left leading-4 text-[#0c2735] tracking-wider font-poppins">
            Company Name
          </th>
          <th className="px-0 lg:px-6 py-2 lg:py-3 border-b-2 border-gray-300 text-left leading-4 text-[#0c2735] tracking-wider font-poppins">
            Logo
          </th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company, index) => (
          <tr key={index}>
            <td className="px-4 lg:px-6 py-2 lg:py-4 whitespace-no-wrap border-b border-gray-500 font-poppins">
              {company.id}
            </td>
            <td className="px-4 lg:px-6 py-2 lg:py-4 whitespace-no-wrap border-b border-gray-500 font-poppins">
              {company.name}
            </td>
            <td className="px-4 lg:px-6 py-2 lg:py-4 whitespace-no-wrap border-b border-gray-500 font-poppins">
              <img src={company.logo} alt={company.name} className="w-8 h-8 lg:w-10 lg:h-10" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className="lg:w-1/2 p-4 order-1 lg:order-1 px-14">
    <h2 className="text-xl lg:text-2xl font-poppins mb-4 flex justify-center">Add New Company</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm lg:text-base font-poppins text-gray-700">Company Name</label>
        <input
          type="text"
          name="name"
          value={newCompany.name}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 lg:py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter Company Name"
        />
      </div>
      <div>
        <label className="block text-sm lg:text-base font-poppins text-gray-700">Company ID</label>
        <input
          type="text"
          name="id"
          value={newCompany.id}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 lg:py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter Company ID"
        />
      </div>
      <div>
        <label className="block text-sm lg:text-base font-poppins text-gray-700">Company Logo URL</label>
        <input
          type="text"
          name="logo"
          value={newCompany.logo}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 lg:py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter Logo URL"
        />
      </div>
      <div className="flex justify-center">
      <button
        type="submit"
        className="w-100px px-4 py-2 lg:px-6 lg:py-3 bg-[#0c2735] hover:text-[#0c2735] text-white font-poppins rounded-lg shadow-sm hover:bg-[#f1c232]"
      >
        Submit
      </button>
      </div>
    </form>
  </div>
</div>

      );
};

export default Page;
