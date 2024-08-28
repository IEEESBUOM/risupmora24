import { useAlocateInterviewees } from "@/hooks/user/useAlocateInterviweers";
import { Candidate, Company } from "@/Type";
import toast from "react-hot-toast";

const CandidateData = (candidate: any) => {
  const { Allocation, isPending } = useAlocateInterviewees();
  const handlePanelChange1 = (e: any) => {
    console.log(e.target.value);
  };

  const handleCompanyChange1 = (e: any) => {
    console.log(e.target.value);
  };

  const handlePanelChange2 = (e: any) => {
    console.log(e.target.value);
  };

  const handleCompanyChange2 = (e: any) => {
    console.log(e.target.value);
  };

  const handlePanelChange3 = (e: any) => {
    console.log(e.target.value);
  };

  const handleCompanyChange3 = (e: any) => {
    console.log(e.target.value);
  };

  const handlePanelChange4 = (e: any) => {
    console.log(e.target.value);
  };

  const handleCompanyChange4 = (e: any) => {
    console.log(e.target.value);
  };

  const handleSubmit = () => {
    const panel1 = (document.getElementById("panel1") as HTMLSelectElement)
      .value;
    const company1 = (document.getElementById("company1") as HTMLSelectElement)
      .value;
    const time1 = (document.getElementById("time1") as HTMLInputElement).value;

    const panel2 = (document.getElementById("panel2") as HTMLSelectElement)
      .value;
    const company2 = (document.getElementById("company2") as HTMLSelectElement)
      .value;
    const time2 = (document.getElementById("time2") as HTMLInputElement).value;

    const panel3 = (document.getElementById("panel3") as HTMLSelectElement)
      .value;
    const company3 = (document.getElementById("company3") as HTMLSelectElement)
      .value;
    const time3 = (document.getElementById("time3") as HTMLInputElement).value;

    const panel4 = (document.getElementById("panel4") as HTMLSelectElement)
      .value;
    const company4 = (document.getElementById("company4") as HTMLSelectElement)
      .value;
    const time4 = (document.getElementById("time4") as HTMLInputElement).value;
    console.log(candidate.candidate_id);
    let pannel1Int = parseInt(panel1);
    const formData = {
      allocated_panel_number: pannel1Int,
      company_id: company1,
      allocation_timeSlot: time1,
      allocation_date: "2021-10-10",
      allocation_status: "pending",
      candidate_id: candidate.candidate_id,
      panelist_id: candidate.candidate_id,
      //   panel2,
      //   company2,
      //   time2,
      //   panel3,
      //   company3,
      //   time3,
      //   panel4,
      //   company4,
      //   time4,
    };

    console.log("Form Data:", formData);

    Allocation(
      { allocationData: formData },
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
  };

  return (
    <tr className="border-b border-gray-300">
      <td className="p-2 border-l border-gray-300">{candidate.candidate_id}</td>
      <td className="p-2 border-l border-gray-300">
        {candidate.firstName} {candidate.lastName}
      </td>
      <td className="p-2 border-l border-gray-300">
        {candidate.preference1}
        {" , "}
        {candidate.preference2}
        {" , "}
        {candidate.preference3}
        {" , "}
        {candidate.preference4}
        {" , "}
      </td>
      <td className="p-2 border-l border-gray-300">
        <select
          id="panel1"
          onChange={handlePanelChange1}
          className="p-2 border bg-blue-400 rounded shadow-sm hover:bg-blue-500 text-white"
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </td>
      <td className="p-2 border-l border-gray-300">
        <select
          id="company1"
          onChange={handleCompanyChange1}
          className="p-2 border bg-blue-400 rounded shadow-sm hover:bg-blue-500 text-white"
        >
          <option value="none">None</option>
          {candidate.company.map((company: Company) => (
            <option key={company.company_id} value={company.company_id}>
              {company.company_name}
            </option>
          ))}
        </select>
      </td>
      <td className="p-2 border-l border-gray-300">
        <input
          id="time1"
          type="time"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </td>
      <td className="p-2 border-l border-gray-300"></td>
      <td className="p-2 border-l border-gray-300">
        <select
          id="panel2"
          onChange={handlePanelChange2}
          className="p-2 border bg-blue-400 rounded shadow-sm hover:bg-blue-500 text-white"
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </td>
      <td className="p-2 border-l border-gray-300">
        <select
          id="company2"
          onChange={handleCompanyChange2}
          className="p-2 border bg-blue-400 rounded shadow-sm hover:bg-blue-500 text-white"
        >
          <option value="none">None</option>
          {candidate.company.map((company: Company) => (
            <option key={company.company_id} value={company.company_id}>
              {company.company_name}
            </option>
          ))}
        </select>
      </td>
      <td className="p-2 border-l border-gray-300">
        <input
          id="time2"
          type="time"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </td>
      <td className="p-2 border-l border-gray-300"></td>
      <td className="p-2 border-l border-gray-300">
        <select
          id="panel3"
          onChange={handlePanelChange3}
          className="p-2 border bg-blue-400 rounded shadow-sm hover:bg-blue-500 text-white"
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </td>
      <td className="p-2 border-l border-gray-300">
        <select
          id="company3"
          onChange={handleCompanyChange3}
          className="p-2 border bg-blue-400 rounded shadow-sm hover:bg-blue-500 text-white"
        >
          <option value="none">None</option>
          {candidate.company.map((company: Company) => (
            <option key={company.company_id} value={company.company_id}>
              {company.company_name}
            </option>
          ))}
        </select>
      </td>
      <td className="p-2 border-l border-gray-300">
        <input
          id="time3"
          type="time"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </td>
      <td className="p-2 border-l border-gray-300"></td>
      <td className="p-2 border-l border-gray-300">
        <select
          id="panel4"
          onChange={handlePanelChange4}
          className="p-2 border bg-blue-400 rounded shadow-sm hover:bg-blue-500 text-white"
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </td>
      <td className="p-2 border-l border-gray-300">
        <select
          id="company4"
          onChange={handleCompanyChange4}
          className="p-2 border bg-blue-400 rounded shadow-sm hover:bg-blue-500 text-white"
        >
          <option value="none">None</option>
          {candidate.company.map((company: Company) => (
            <option key={company.company_id} value={company.company_id}>
              {company.company_name}
            </option>
          ))}
        </select>
      </td>
      <td className="p-2 border-l border-gray-300">
        <input
          id="time4"
          type="time"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </td>
      <td className="p-2 border-l border-gray-300 "></td>
      <td className="p-2 border-l border-gray-300 "></td>
      <td className="p-2 border-l border-gray-300 "></td>
      <td className="p-2 border-l border-gray-300 ">
        <button className="border-2 p-2 border-blue-500 rounded text-blue-500">
          Edit
        </button>
      </td>
      <td className="p-2 border-l border-gray-300 ">
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Save
        </button>
      </td>
    </tr>
  );
};

export default CandidateData;
