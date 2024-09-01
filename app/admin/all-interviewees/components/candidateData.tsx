import React, { useState, useEffect } from "react";
import { useAlocateInterviewees } from "@/hooks/user/useAlocateInterviweers";
import { Company, Panelist } from "@/Type";
import toast from "react-hot-toast";
import { getPannels } from "@/service/getPanelsReleventToCompany";

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
  console.log(candidate.department);
  console.log(candidate.allocations);
  console.log(candidate.feedbacks);
  const { Allocation, isPending } = useAlocateInterviewees();

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

  // Initialize state for panels
  const [panelsForCompany1, setPanelsForCompany1] = useState<{
    [key: string]: string;
  }>({});
  const [panelsForCompany2, setPanelsForCompany2] = useState<{
    [key: string]: string;
  }>({});
  const [panelsForCompany3, setPanelsForCompany3] = useState<{
    [key: string]: string;
  }>({});
  const [panelsForCompany4, setPanelsForCompany4] = useState<{
    [key: string]: string;
  }>({});

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

  // Fetch panels relevant to the selected company
  const fetchPanels = async (
    companyId: string,
    setPanels: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
  ) => {
    const panels = await getPannels(companyId);
    if (panels) {
      const panelsMap: { [key: string]: string } = {};
      panels.data.forEach((panel: Panelist) => {
        panelsMap[panel.pannel_number.toString()] = panel.panelist_id;
      });
      setPanels(panelsMap);
    } else {
      setPanels({});
    }
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    setRowData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    if (id.startsWith("company")) {
      const companyIndex = id.replace("company", "");
      try {
        switch (companyIndex) {
          case "1":
            await fetchPanels(value, setPanelsForCompany1);
            break;
          case "2":
            await fetchPanels(value, setPanelsForCompany2);
            break;
          case "3":
            await fetchPanels(value, setPanelsForCompany3);
            break;
          case "4":
            await fetchPanels(value, setPanelsForCompany4);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error("Error fetching panels:", error);
      }
    }
  };

  const handleSubmit = (rowData: RowData) => {
    const panels = [
      {
        panel: "panel1",
        company: "company1",
        time: "time1",
        panelsMap: panelsForCompany1,
      },
      {
        panel: "panel2",
        company: "company2",
        time: "time2",
        panelsMap: panelsForCompany2,
      },
      {
        panel: "panel3",
        company: "company3",
        time: "time3",
        panelsMap: panelsForCompany3,
      },
      {
        panel: "panel4",
        company: "company4",
        time: "time4",
        panelsMap: panelsForCompany4,
      },
    ];

    console.log("Submitting:", rowData);

    panels.forEach((panelInfo) => {
      const panelValue = rowData[panelInfo.panel as keyof typeof rowData];
      const companyValue = rowData[panelInfo.company as keyof typeof rowData];
      const timeValue = rowData[panelInfo.time as keyof typeof rowData];
      const panelistId = panelInfo.panelsMap[panelValue];

      console.log("Panel Value:", panelValue);
      console.log("Company Value:", companyValue);
      console.log("Panelist ID:", panelistId);
      console.log("Panels Map:", panelInfo.panelsMap);

      // Skip if either company or panelist ID is empty
      if (!companyValue || !panelistId) return;

      const formData = {
        allocated_panel_number: parseInt(panelValue),
        company_id: companyValue,
        allocation_timeSlot: timeValue,
        allocation_date: "2021-10-10",
        allocation_status: "pending",
        candidate_id: candidate.candidate_id,
        panelist_id: panelistId,
      };

      console.log("Form Data:", formData);

      // Submit the form data
      Allocation(
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
    });
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const [isAttended, setIsAttended] = useState(false);

  return (
    <tr>
      <td className="p-2 border-l border-gray-300">{candidate.candidate_id}</td>
      <td className="p-2 border-l border-gray-300">
        {candidate.firstName} {candidate.lastName}
      </td>
      <td className="p-2 border-l border-gray-300">
        {candidate.preference1}, {candidate.preference2},{" "}
        {candidate.preference3}, {candidate.preference4}
      </td>
      <td className="p-2 border-l border-gray-300">
        <select
          id="company1"
          value={rowData.company1}
          onChange={handleChange}
          disabled={!isEditing}
          className="p-2 border bg-blue-400 rounded shadow-sm hover:bg-blue-500 text-white"
        >
          <option value="">None</option>
          {candidate.company.map((company: any) => (
            <option key={company.company_id} value={company.company_id}>
              {company.company_name}
            </option>
          ))}
        </select>
      </td>
      <td className="p-2 border-l border-gray-300">
        <select
          id="panel1"
          value={rowData.panel1}
          onChange={handleChange}
          disabled={!isEditing || !rowData.company1}
          className={`p-2 border ${
            !rowData.company1
              ? "bg-blue-400 text-white hover:text-white"
              : "bg-blue-400 text-white"
          } rounded shadow-sm hover:bg-blue-500`}
        >
          <option value="">
            {rowData.company1 ? rowData.panel1 : "Select Company 1 first"}
          </option>
          {Object.keys(panelsForCompany1).map((panel) => (
            <option key={panel} value={panel}>
              {panel}
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
        <input
          type="checkbox"
          checked={isAttended}
          onChange={() => setIsAttended(!isAttended)}
          disabled={!isEditing}
          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
      </td>
      <td className="p-2 border-l border-gray-300">
        <select
          id="company2"
          value={rowData.company2}
          onChange={handleChange}
          disabled={!isEditing}
          className="p-2 border bg-blue-400 rounded shadow-sm hover:bg-blue-500 text-white"
        >
          <option value="">None</option>
          {candidate.company.map((company: any) => (
            <option key={company.company_id} value={company.company_id}>
              {company.company_name}
            </option>
          ))}
        </select>
      </td>
      <td className="p-2 border-l border-gray-300">
        <select
          id="panel2"
          value={rowData.panel2}
          onChange={handleChange}
          disabled={!isEditing || !rowData.company2}
          className={`p-2 border ${
            !rowData.company2
              ? "bg-blue-400 text-white hover:text-white"
              : "bg-blue-400 text-white"
          } rounded shadow-sm hover:bg-blue-500`}
        >
          <option value="">
            {rowData.company2 ? rowData.panel2 : "Select Company 2 first"}
          </option>
          {Object.keys(panelsForCompany2).map((panel) => (
            <option key={panel} value={panel}>
              {panel}
            </option>
          ))}
        </select>
      </td>
      <td className="p-2 border-l border-gray-300">
        <input
          id="time2"
          type="time"
          value={rowData.time2}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </td>
      <td className="p-2 border-l border-gray-300">
        <input
          type="checkbox"
          checked={isAttended}
          onChange={() => setIsAttended(!isAttended)}
          disabled={!isEditing}
          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
      </td>
      <td className="p-2 border-l border-gray-300">
        <select
          id="company3"
          value={rowData.company3}
          onChange={handleChange}
          disabled={!isEditing}
          className="p-2 border bg-blue-400 rounded shadow-sm hover:bg-blue-500 text-white"
        >
          <option value="">None</option>
          {candidate.company.map((company: any) => (
            <option key={company.company_id} value={company.company_id}>
              {company.company_name}
            </option>
          ))}
        </select>
      </td>
      <td className="p-2 border-l border-gray-300">
        <select
          id="panel3"
          value={rowData.panel3}
          onChange={handleChange}
          disabled={!isEditing || !rowData.company3}
          className={`p-2 border ${
            !rowData.company3
              ? "bg-blue-400 text-white hover:text-white"
              : "bg-blue-400 text-white"
          } rounded shadow-sm hover:bg-blue-500`}
        >
          <option value="">
            {rowData.company3 ? rowData.panel3 : "Select Company 3 first"}
          </option>
          {Object.keys(panelsForCompany3).map((panel) => (
            <option key={panel} value={panel}>
              {panel}
            </option>
          ))}
        </select>
      </td>
      <td className="p-2 border-l border-gray-300">
        <input
          id="time3"
          type="time"
          value={rowData.time3}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </td>
      <td className="p-2 border-l border-gray-300">
        <input
          type="checkbox"
          checked={isAttended}
          onChange={() => setIsAttended(!isAttended)}
          disabled={!isEditing}
          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
      </td>
      <td className="p-2 border-l border-gray-300">
        <select
          id="company4"
          value={rowData.company4}
          onChange={handleChange}
          disabled={!isEditing}
          className="p-2 border bg-blue-400 rounded shadow-sm hover:bg-blue-500 text-white"
        >
          <option value="">None</option>
          {candidate.company.map((company: any) => (
            <option key={company.company_id} value={company.company_id}>
              {company.company_name}
            </option>
          ))}
        </select>
      </td>
      <td className="p-2 border-l border-gray-300">
        <select
          id="panel4"
          value={rowData.panel4}
          onChange={handleChange}
          disabled={!isEditing || !rowData.company4}
          className={`p-2 border ${
            !rowData.company4
              ? "bg-blue-400 text-white hover:text-white"
              : "bg-blue-400 text-white"
          } rounded shadow-sm hover:bg-blue-500`}
        >
          <option value="">
            {rowData.company4 ? rowData.panel4 : "Select Company 4 first"}
          </option>
          {Object.keys(panelsForCompany4).map((panel) => (
            <option key={panel} value={panel}>
              {panel}
            </option>
          ))}
        </select>
      </td>
      <td className="p-2 border-l border-gray-300">
        <input
          id="time4"
          type="time"
          value={rowData.time4}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </td>
      <td className="p-2 border-l border-gray-300">
        <input
          type="checkbox"
          checked={isAttended}
          onChange={() => setIsAttended(!isAttended)}
          disabled={!isEditing}
          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
      </td>
      <td className="p-2 border-l border-gray-300">
        {isEditing ? (
          <div className="flex space-x-2">
            <button
              onClick={() => handleSubmit(rowData)} // Pass the rowData to handleSubmit
              className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save"}
            </button>
            <button
              onClick={toggleEdit}
              className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={toggleEdit}
            className="px-4 py-2 text-blue-500 rounded shadow hover:bg-blue-500 border-2 border-blue-500 hover:text-white"
          >
            Edit
          </button>
        )}
      </td>
    </tr>
  );
};

export default CandidateData;
