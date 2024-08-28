"use client";
import React, { useState, useEffect } from "react";
import CandidateData from "./candidateData";
import { Candidate, Company, Feedback } from "@/Type";
interface Props {
  initialCandidates: Candidate[];
  feedbacks: Feedback[];
  company: Company[];
}

const AllIntervieweesData: React.FC<Props> = ({
  initialCandidates,
  feedbacks,
  company,
}) => {
  interface RowData {
    id: number;
    name: string;
    pref_1: string;
    // Add other properties as needed
  }
  console.log(company);
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [editBtnId, setEditBtnId] = useState<string | undefined>();
  const [searchField, setSearchField] = useState<string | undefined>();
  const [numCandidate, setNumCandidate] = useState<number | undefined>(501); // Set your initial candidate count
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredCandidates, setFilteredCandidates] =
    useState<Candidate[]>(initialCandidates);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowData.length) : 0;

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    // Assume getData() is a function that fetches data
    // getData();
  }, []);

  const [AllCandidateData, setAllCandidateData] =
    useState<Candidate[]>(initialCandidates);

  function handleEditButton(check: boolean, id: string) {
    if (check) setEditBtnId(id);
    else setEditBtnId("");
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchField(e.target.value);
  }

  function handleSearchClick() {
    // Handle search click logic
  }

  function handleSortBy(e: React.ChangeEvent<HTMLSelectElement>) {
    // Handle sort logic
  }

  return (
    <div className="px-5 py-4 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center my-3">
        <div className="flex items-center gap-2 w-full md:w-1/4">
          <input
            className="form-control form-control-sm w-full p-2 border border-gray-300 rounded shadow-sm"
            type="search"
            placeholder="Search By Index"
            aria-label="Search"
            onChange={handleSearch}
          />
          <button
            className="btn btn-sm bg-blue-500 text-white p-2 rounded shadow hover:bg-blue-600"
            type="submit"
            onClick={handleSearchClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
        <div className="w-full md:w-1/4">
          <select
            onChange={handleSortBy}
            className="form-select p-2 border border-gray-300 rounded shadow-sm"
            aria-label="Default select example"
          >
            <option value="sort-by">Sort By Department</option>
            <option value="Bio Medical Engineering">
              Bio Medical Engineering
            </option>
            <option value="Electronic and Telecommunication Engineering">
              Electronic and Telecommunication Engineering{" "}
            </option>
            <option value="Electrical Engineering ">
              Electrical Engineering{" "}
            </option>
            <option value="Mechanical Engineering ">
              Mechanical Engineering{" "}
            </option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Material Science Engineering">
              Material Science Engineering
            </option>
            <option value="Chemical and Process Engineering ">
              Chemical and Process Engineering{" "}
            </option>
            <option value="Transport Management and Logistics Engineering">
              Transport Management and Logistics Engineering
            </option>
            <option value="Textile and Apparel Engineering ">
              Textile and Apparel Engineering{" "}
            </option>
            <option value="Earth Resource Engineering">
              Earth Resource Engineering
            </option>
            <option value="Computer Science & Engneering">
              Computer Science & Engneering
            </option>
            <option value="Information Technology">
              Information Technology
            </option>
            <option value="Interdisciplinary Study">
              Interdisciplinary Study
            </option>
            <option value="Computational mathematics">
              Computational Mathematics
            </option>
          </select>
        </div>
        <div className="text-gray-700 font-semibold">
          Number of candidates - {numCandidate}
        </div>
      </div>

      {rowData.length != 0 ? (
        <div className="w-full p-4 text-center text-red-500 bg-red-100 rounded">
          No data found!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border border-gray-300 text-left">ID</th>
                <th className="p-2 border border-gray-300 text-left">Name</th>
                <th className="p-2 border border-gray-300 text-left">
                  Preferences
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Pannel List 1
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Allocated Company 1
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Time Slot 1
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Feedback 1
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Pannel List 2
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Allocated Company 2
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Time Slot 2
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Feedback 2
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Pannel List 3
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Allocated Company 3
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Time Slot 3
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Feedback 3
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Pannel List 4
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Allocated Company 4
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Time Slot 4
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Feedback 4
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  attended
                </th>
                <th className="p-2 border border-gray-300 text-left">
                  Allocation Status
                </th>
                <th className="p-2 border border-gray-300 text-left"></th>
                <th className="p-2 border border-gray-300 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {rowData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="p-2 border border-gray-300">{doc.id}</td>
                    <td className="p-2 border border-gray-300">{doc.name}</td>
                    <td className="p-2 border border-gray-300">{doc.pref_1}</td>
                    {/* Add other table columns as needed */}
                  </tr>
                ))}
              {emptyRows > 0 && (
                <tr style={{ height: 34 * emptyRows }}>
                  <td colSpan={3} aria-hidden />
                </tr>
              )}
            </tbody>
            <tfoot>
              {filteredCandidates.map((candidate: Candidate) => (
                <CandidateData
                  key={candidate.candidate_id}
                  candidate_id={candidate.candidate_id}
                  firstName={candidate.firstName}
                  lastName={candidate.lastName}
                  preference1={candidate.prefCompany1}
                  preference2={candidate.prefCompany2}
                  preference3={candidate.prefCompany3}
                  preference4={candidate.prefCompany4}
                  company={company}
                />
              ))}
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllIntervieweesData;
