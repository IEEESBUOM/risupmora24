import React from "react";

function RegisterCandidate() {
  return (
    <div className="p-5">
      <div className="flex justify-end gap-4 mb-5">
        <div className="input-group w-full max-w-md mb-3 flex">
          <input
            className="form-input w-full p-2 border border-gray-300 rounded-l-md"
            type="search"
            placeholder="Search By Index"
          />
          <button className="btn btn-success p-2 bg-green-500 text-white rounded-r-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="bg-white shadow-md p-4 rounded-lg" style={{ margin: '0 2%' }}>
        <div className="text-blue-500 mb-4 border-b pb-2 flex justify-between items-center">
          <span className="text-lg">Number of candidates - 32</span>
          <select className="form-select text-blue-500 p-2 border border-gray-300 rounded-md">
            <option value="sort-by">Sort By Department</option>
            <option value="Bio Medical Engineering">Bio Medical Engineering</option>
            <option value="Electronic and Telecommunication Engineering">Electronic and Telecommunication Engineering</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Material Science Engineering">Material Science Engineering</option>
            <option value="Chemical and Process Engineering">Chemical and Process Engineering</option>
            <option value="Transport Management and Logistics Engineering">Transport Management and Logistics Engineering</option>
            <option value="Textile and Apparel Engineering">Textile and Apparel Engineering</option>
            <option value="Earth Resource Engineering">Earth Resource Engineering</option>
            <option value="Computer Science & Engineering">Computer Science & Engineering</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Interdisciplinary Study">Interdisciplinary Study</option>
            <option value="Computational Mathematics">Computational Mathematics</option>
          </select>
        </div>
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
          No data found!
        </div>
        <table className="table-auto w-full text-gray-700">
          <thead>
            <tr className="text-sm border-b">
              <th className="p-2">Index</th>
              <th className="p-2">Name</th>
              <th className="p-2">Department</th>
              <th className="p-2">Email</th>
              <th className="p-2">Contact No</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">200336M</td>
              <td className="p-2">T.S.Lakshan</td>
              <td className="p-2">Computer Science & Engineering</td>
              <td className="p-2">shanukalakshan9817@gmail.com</td>
              <td className="p-2">0766723788</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">200543U</td>
              <td className="p-2">K.Y.K. Rovin</td>
              <td className="p-2">Computer Science & Engineering</td>
              <td className="p-2">kykrovin@gmail.com</td>
              <td className="p-2">0769407796</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">200708G</td>
              <td className="p-2">R. Y. Wickramage</td>
              <td className="p-2">Computer Science & Engineering</td>
              <td className="p-2">ravinduya-siska@gmail.com</td>
              <td className="p-2">0769462759</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">200229M</td>
              <td className="p-2">M Z F Ifra</td>
              <td className="p-2">Mechanical Engineering</td>
              <td className="p-2">ifrazaheer288@gmail.com</td>
              <td className="p-2">0713836698</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">200231L</td>
              <td className="p-2">I N N Imaduwa</td>
              <td className="p-2">Mechanical Engineering</td>
              <td className="p-2">nimeshnelanga@gmail.com</td>
              <td className="p-2">0769200211</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">200408L</td>
              <td className="p-2">H.K.Rukshan Nadeera</td>
              <td className="p-2">Mechanical Engineering</td>
              <td className="p-2">hewakandambi99@gmail.com</td>
              <td className="p-2">0703172437</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">200214M</td>
              <td className="p-2">H.M.S.G.Herath</td>
              <td className="p-2">Mechanical Engineering</td>
              <td className="p-2">samitha-herath98@gmail.com</td>
              <td className="p-2">0769982455</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">200364V</td>
              <td className="p-2">W.A.L. Madhushan</td>
              <td className="p-2">Mechanical Engineering</td>
              <td className="p-2">lahirumadhu501@gmail.com</td>
              <td className="p-2">0713168162</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">210654U</td>
              <td className="p-2">L.D.Kisali Thumara</td>
              <td className="p-2">Mechanical Engineering</td>
              <td className="p-2">kisali-thumara2002@gmail.com</td>
              <td className="p-2">0714426647</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RegisterCandidate;
