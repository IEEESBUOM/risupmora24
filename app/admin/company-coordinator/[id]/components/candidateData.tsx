import React, { useState, useEffect } from "react";
import { useAlocateInterviewees } from "@/hooks/user/useAlocateInterviweers";
import { Company } from "@/Type";
import toast from "react-hot-toast";
import { useUpdateInterviewees } from "@/hooks/user/useUpdateInterviewees";
import { getPanelistByCompanyIdAndPanelNumber } from "@/service/getPanelistByCompanyIdAndPanelNumber";

// Define an interface for row data
interface RowData {
  panel1: string;
  company1: string;
  time1: string;
  panel2: string;
  company2: string;
  time2: string;
  panel3: string;
  company3: string;
  time3: string;
  panel4: string;
  company4: string;
  time4: string;
}

const CandidateData = (candidate: any) => {
  console.log(candidate.allPanelists);
  console.log(candidate.department);
  console.log(candidate.allocations);
  console.log(candidate.feedbacks);
  const { Allocation, isPending } = useUpdateInterviewees();

  // Initialize state with the RowData interface
  const [rowData, setRowData] = useState<RowData>({
    panel1: "",
    company1: "",
    time1: "",
    panel2: "",
    company2: "",
    time2: "",
    panel3: "",
    company3: "",
    time3: "",
    panel4: "",
    company4: "",
    time4: "",
  });
  const length = candidate.allPanelists.length;
  // Initialize edit state
  const [isEditing, setIsEditing] = useState(false);

  // Effect to map allocations to rowData based on candidate.candidate_id
  useEffect(() => {
    const newRowData: RowData = {
      panel1: "",
      company1: "",
      time1: "",
      panel2: "",
      company2: "",
      time2: "",
      panel3: "",
      company3: "",
      time3: "",
      panel4: "",
      company4: "",
      time4: "",
    };

    let panelIndex = 1;

    candidate.allocations.forEach((allocation: any) => {
      if (allocation.candidate_id === candidate.candidate_id) {
        const panelKey = `panel${panelIndex}` as keyof RowData;
        const companyKey = `company${panelIndex}` as keyof RowData;
        const timeKey = `time${panelIndex}` as keyof RowData;

        newRowData[panelKey] = allocation.allocated_panel_number.toString();
        newRowData[companyKey] = allocation.company_id;
        newRowData[timeKey] = allocation.allocation_timeSlot;

        panelIndex++;
      }
    });

    setRowData(newRowData);
  }, [candidate]);

  // Handle input changes and update state
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    setRowData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Handle submit button click
  const handleSubmit = async () => {
    const panels = [
      { panel: "panel1", company: "company1", time: "time1" },
      { panel: "panel2", company: "company2", time: "time2" },
      { panel: "panel3", company: "company3", time: "time3" },
      { panel: "panel4", company: "company4", time: "time4" },
    ];

    for (const panelInfo of panels) {
      const panelValue = rowData[panelInfo.panel as keyof RowData];
      const companyValue = rowData[panelInfo.company as keyof RowData];
      const timeValue = rowData[panelInfo.time as keyof RowData];

      // Skip if the company is empty
      if (!companyValue) continue;

      let panelistId: string | undefined;

      try {
        const panelistData = await getPanelistByCompanyIdAndPanelNumber(
          companyValue,
          parseInt(panelValue)
        );
        panelistId = panelistData?.data?.[0]?.panelist_id;
        console.log(panelistId); // For debugging purposes
      } catch (error) {
        console.error("Error fetching panelist data:", error);
      }

      const formData = {
        allocated_panel_number: parseInt(panelValue),
        company_id: companyValue,
        allocation_timeSlot: timeValue,
        allocation_date: "2021-10-10",
        allocation_status: "pending",
        candidate_id: candidate.candidate_id,
        panelist_id: panelistId,
      };

      console.log(formData);

      try {
        await Allocation(
          { Allocation: formData },
          {
            onSuccess: () => {
              toast.success("Allocation Success");
            },
            onError: (error) => {
              console.error("Allocation error:", error);
              toast.error("Allocation failed");
            },
          }
        );
      } catch (error) {
        console.error("Error submitting allocation:", error);
        toast.error("Allocation submission error");
      }
    }
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <tr className="border-b border-gray-300">
      <td className="p-2 border-l border-gray-300">{candidate.candidate_id}</td>
      <td className="p-2 border-l border-gray-300">
        {candidate.firstName} {candidate.lastName}
      </td>
      {/* <td className="p-2 border-l border-gray-300">
        {candidate.preference1}
        {" , "}
        {candidate.preference2}
        {" , "}
        {candidate.preference3}
        {" , "}
        {candidate.preference4}
        {" , "}
      </td> */}
      <td className="p-2 border-l border-gray-300">
        <select
          id="panel1"
          value={rowData.panel1}
          onChange={handleChange}
          disabled={!isEditing}
          className="p-2 border bg-blue-400 rounded shadow-sm hover:bg-blue-500 text-white"
        >
          {candidate.allPanelists.map((panelist: any) => (
            <option key={panelist.panelist_id} value={panelist.panelist_id}>
              {panelist.pannel_number}
            </option>
          ))}
        </select>
      </td>

      <td className="p-2 border-l border-gray-300">
        <input
          id="time1"
          type="time"
          value={rowData.time1}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </td>

      <td className="p-2 border-l border-gray-300">
        {isEditing ? (
          <>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
            <button
              onClick={toggleEdit}
              className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={toggleEdit}
            className="px-4 py-2  text-blue-500 rounded shadow hover:bg-blue-500 border-2 border-blue-500 hover:text-white"
          >
            Edit
          </button>
        )}
      </td>
    </tr>
  );
};

export default CandidateData;
