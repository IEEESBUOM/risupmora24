"use client";
import React, { useState } from "react";
import StudentFooter from "@/components/StudentFooter";
import StudentNavbar from "@/components/StudentNavbar";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useCandidate } from "@/hooks/user/useCandidate";
import { useQuery } from "@tanstack/react-query";
import { FaFilePdf } from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useUploadCV } from "@/hooks/user/useUploadCV";
import { CV } from "@/Type";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import CompanyPreference from "./CompanyPreference";
import CloudinaryUpload from "@/components/cloudinaryWidget";
import CvUpload from "@/components/CvUpload";

const StudentView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CV>();
  const params = useParams();
  const userId = params.id as string;
  const { data: session } = useSession();
  const { uploadCV, isUploading } = useUploadCV();
  const { candidate: data, isPending } = useCandidate({ userId });
  console.log(data);
  const [cvUrl, setCvUrl] = useState<string>("");

  const formatTime = (dateTimeString: string) => {
    const parts = dateTimeString.split("T");
    const timePart = parts[1];
    const [hour, minute] = timePart.split(":").map(Number);

    const meridiem = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedTime = `${formattedHour}:${minute
      .toString()
      .padStart(2, "0")} ${meridiem}`;

    return `${formattedTime}`;
  };

  const handleUploadCV = handleSubmit(async (data: CV) => {
    console.log(data);
    // const formData = new FormData();
    // formData.append("cv", data.cv[0]);
    console.log(cvUrl);

    try {
      await uploadCV({ cvUrl });
      toast.success("CV uploaded successfully");
    } catch (error) {
      toast.error("CV upload failed");
    }
  });

  return (
    <div className="w-full block 2xl:flex 2xl:justify-center 2xl:items-center  px-5 md:px-12 lg:px-28 h-100 mb-10">
      <div className="w-full ">
        <div className="w-full">
          <StudentNavbar />
          {data ? (
            <>
              <div className="w-full justify-center flex items-center">
                <Image
                  src={data?.imgUrl || "/images/profile.png"}
                  alt="profile pic"
                  width={180}
                  height={50}
                  className="rounded-full"
                />
              </div>
              <div className="container w-full md:w-11/12 lg:w-10/12 xl:w-7/12 px-5 md:px-20 pt-16 pb-4 mx-auto mt-3.5 mb-10 bg-[#f4f4f4] shadow-custom rounded-3xl">
                <div className="space-y-6">
                  <div className=" md:text-md font-poppins flex gap-3">
                    <b>Name with Initials: </b>
                    <span>{data?.nameWithInitials}</span>
                  </div>
                  <div className=" md:text-md font-poppins flex gap-3">
                    <b>Index No: </b>
                    <span>{data?.universityID}</span>
                  </div>
                  <div className="md:text-md font-poppins flex gap-3">
                    <b>Contact No: </b>
                    <span>{data?.contactNo}</span>
                  </div>
                  <div className="md:text-md font-poppins flex gap-3">
                    <b>Email: </b>
                    <span>{data?.user.email}</span>
                  </div>
                  <div className="md:text-md font-poppins flex gap-3">
                    <b>Degree: </b>
                    <span>{data?.degree}</span>
                  </div>
                  <div className="md:text-md font-poppins flex gap-3">
                    <b>WhatsApp Group: </b>
                    <span>
                      <a
                        href="https://chat.whatsapp.com/LnlgYtDoGDE4huMAqXckRg"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Click Here to Join
                      </a>
                    </span>
                  </div>
                </div>
                <div className="border-t-2 border-custom-black  h-0.5 w-full my-6"></div>
                
                <div className="mt-8 font-semibold text-center font-poppins text-lg  underline">
                  Company Allocation
                </div>
                <div className="overflow-x-auto border-2 border-stv-blue rounded-lg mt-2.5">
                  {data?.allocatedCompany &&
                  data.allocatedCompany.length > 0 ? (
                    <table className="border-collapse w-full">
                      <thead>
                        <tr>
                          <th className="py-2.5 font-poppins px-3 text-lg md:text-xl text-left">
                            Company
                          </th>
                          <th className="py-2.5 font-poppins px-3 text-lg md:text-xl text-left">
                            Panel
                          </th>
                          <th className="py-2.5 font-poppins px-3 text-lg md:text-xl text-left">
                            Time
                          </th>
                        </tr>
                      </thead>
                      {/* <tbody>
                    {data.allocatedCompany.map((company, index) => {
                      const panel = data.allocatedPanelNew[index] || "";
                      const time = data.allocatedTime[index];

                      if (
                        company &&
                        company.toLowerCase() !== "none" &&
                        company !== "-"
                      ) {
                        return (
                          <tr
                            key={index}
                            className="hover:bg-gray-400 transition-colors duration-300"
                          >
                            <td className="py-2.5 font-poppins px-3">
                              {company}
                            </td>
                            <td className="py-2.5 font-poppins px-3">
                              {panel}
                            </td>
                            <td className="py-2.5 font-poppins px-3">
                              {formatTime(time)}
                            </td>
                          </tr>
                        );
                      }
                      return null;
                    })}
                  </tbody> */}
                    </table>
                  ) : (
                    <div className="text-gray-400 my-2.5  text-center">
                      No allocated company information available.
                    </div>
                  )}
                </div>

                <div className="border-t-2 border-custom-black  h-0.5 w-full my-6"></div>

                <div className="flex ">
                  <form className="  ">
                    <div>
                      <div className="flex gap-3 items-center">
                        <FaFilePdf size={22} />
                        <Link target="_blank" href={`${data?.cvUrl}`} passHref>
                          {data?.nameWithInitials}.cv.pdf
                        </Link>
                      </div>
                    </div>
                    <div className="flex mt-3 md:flex-row flex-col md:gap-0 gap-4">
                      <div className="fileInput">
                        {/* <Input
                          id="picture"
                          type="file"
                          {...register("cv", {
                            required: "CV is required",
                            validate: {
                              fileType: (value) =>
                                value[0]?.type === "application/pdf" ||
                                "Only PDF files are allowed",
                            },
                          })}
                        /> */}
                        <CvUpload setImgUrl={setCvUrl} />
                      </div>
                      <div className="md:ml-4 md:block flex md:justify-center">
                    <button
                      className="bg-stv-dark-blue text-white py-2 px-5 rounded-lg cursor-pointer transition-colors duration-300"
                      onClick={() => handleUploadCV()}
                      disabled={isUploading}
                    >
                      {isUploading ? "Saving..." : "Save"}
                      {/* Upload CV */}
                    </button>
                  </div>
                    </div>
                  </form>
                  
                  
                </div>

                <div className="border-t-2 border-custom-black  h-0.5 w-full my-6"></div>
                <CompanyPreference userEmail={data?.user.email} />

                <div className="border-t-2 border-custom-black  h-0.5 w-full my-6"></div>

                <div className="mt-8  md:text-xl">
                  <b>Feedback:</b>
                  <div className="w-105 h-auto mt-2.5">
                {data?.feedback && data.feedback.length > 0 ? (
                  data.feedback.map(( index:any) => (
                    <div key={index} className="mb-2.5">
                      {data.allocatedCompany[index] &&
                        data.allocatedCompany[index].toLowerCase() !== "none" &&
                        data.allocatedCompany[index] !== "-" && (
                          <span className="font-bold text-stv-blue">
                            {data.allocatedCompany[index]}:{" "}
                            {data.feedback[index]}
                          </span>
                        )}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400 py-2.5 text-base  text-center border-2 border-stv-blue rounded-lg">
                    No feedback available.
                  </div>
                )}
              </div>
                </div>
              </div>
            </>
          ) : (
            <div className=" flex justify-center">
              <Image
                src={"/spinner/Spinner@1x-1.0s-200px-200px.svg"}
                alt="profile pic"
                width={150}
                height={50}
                className="rounded-full"
              />
            </div>
          )}
        </div>
        <StudentFooter />
      </div>
    </div>
  );
};

export default StudentView;
