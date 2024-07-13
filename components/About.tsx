import React from "react";

const About = () => {
  return <>
  <div className="relative flex flex-col h-fit pt-0 pb-[2vh] border-t-[10px] border-t-custom-yellow bg-custom-black rounded-tl-[0%] rounded-tr-[40%] rounded-bl-[0%] rounded-br-[0%]" >
    <div className="relative top-0 left-0 z-10 pl-[15vh] pr-[15vh] pt-[5vh] pb-[2vh] mt-2 text-white"
    >
      <h1    className=" font-poppins ml-[-3.5%] mb-[2.5%]  border-b-[3px] border-b-[#FFB700] w-fit p-[3px]">
        What is Rise Up Mora?
      </h1>
      <p className=" font-poppins">
        Rise Up Mora is a transformative initiative by the IEEE Student Branch at the University of Moratuwa. Designed for self-driven undergraduates, it offers webinars, mock interviews, and workshops to enhance skills and interview performance. Renowned industry experts provide insights and personalized feedback, empowering participants for success in their industrial training and beyond.
      </p>
    </div>

  </div>
</>;
};

export default About;
