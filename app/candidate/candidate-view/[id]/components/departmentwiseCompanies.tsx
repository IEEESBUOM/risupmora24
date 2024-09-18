import Image from "next/image";

interface DepartmentCompaniesProps {
  department: string;
}

const DepartmentCompanies = ({ department }: DepartmentCompaniesProps) => {
  const departmentData: { [key: string]: { name: string; logo: string }[] } = {
    Electronic_and_Telecommunication_Engineering: [
      { name: "GTN", logo: "/companyImg/gtnlogo.png" },
      { name: "SB", logo: "/companyImg/SBlogo.png" },
    ],
    Electrical_Engineering: [
      { name: "YP", logo: "/companyImg/yplogo.png" },
      { name: "IFS", logo: "/companyImg/ifslogo.png" },
    ],
    Mechanical_Engineering: [
      { name: "PickMe", logo: "/companyImg/PickMe---_Silver.png" },
      { name: "ZeroBeta", logo: "/companyImg/ZeroBeta.png" },
    ],
    Civil_Engineering: [
      { name: "Unilever", logo: "/companyImg/Unilever1.png" },
      { name: "GTN", logo: "/companyImg/gtnlogo.png" },
      { name: "SB", logo: "/companyImg/SBlogo.png" },
      { name: "PickMe", logo: "/companyImg/PickMe---_Silver.png" },
      { name: "ZeroBeta", logo: "/companyImg/ZeroBeta.png" },
      { name: "Young Profetionals", logo: "/companyImg/yplogo.png" },
      { name: "IFS", logo: "/companyImg/ifslogo.png" },
    ],
    Material_Science_and_Engineering: [
      { name: "Unilever", logo: "/companyImg/Unilever1.png" },
      { name: "GTN", logo: "/companyImg/gtnlogo.png" },
      { name: "SB", logo: "/companyImg/SBlogo.png" },
      { name: "PickMe", logo: "/companyImg/PickMe---_Silver.png" },
      { name: "ZeroBeta", logo: "/companyImg/ZeroBeta.png" },
      { name: "Young Profetionals", logo: "/companyImg/yplogo.png" },
      { name: "IFS", logo: "/companyImg/ifslogo.png" },
    ],
    Chemical_and_Process_Engineering: [],
    Transport_Management_and_Logistics_Engineering: [],
    Textile_and_Apparel_Engineering: [],
    Earth_Resources_Engineering: [],
    Computer_Science_and_Engineering: [],
    Information_Technology: [],
    Interdisciplinary_Studies: [],
    Computational_Mathematics: [],
  };

  console.log(department);

  const selectedCompanies = departmentData[department];

  if (!selectedCompanies) {
    return <p>No companies found for {department}.</p>;
  }

  return (
    <div className="container mx-auto px-5">
      <CompanyLogos department={department} companies={selectedCompanies} />
    </div>
  );
};

export default DepartmentCompanies;

interface Company {
  name: string;
  logo: string;
}

interface CompanyLogosProps {
  department: string;
  companies: Company[];
}

const CompanyLogos = ({ department, companies }: CompanyLogosProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">
        Companies - {department.replace(/_/g, " ")} :
      </h2>
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-8 justify-center items-center">
        {companies.map((company, index) => (
          <div key={index} className="flex flex-col items-center space-y-4">
            <div className="w-20 h-24 relative">
              <Image
                src={company.logo}
                alt={`${company.name} Logo`}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <span className="text-center">{company.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
