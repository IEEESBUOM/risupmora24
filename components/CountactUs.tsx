"use client";
import React from "react";
import Image from "next/image";
interface ProfileProps {
  image: string;
  name: string;
  shortName: string;
  details: string;
  email: string;
  telephone: string;
}

// Main ContactUs component
export default function ContactUs() {
  return (
    <div className="h-auto w-auto pb-10">
      <div className="flex justify-start p-10">
        <div className="bg-[#0c2735] text-white font rounded-[10px] border-none cursor-pointer z-10 py-2 px-5 ml-1.5 mt-4  ">
          <span className="font-poppins sm:text-[40px] line-height-1 sm:ml-3 ml-3 text-[30px]">
            Contact Us
          </span>
        </div>
        <div className="absolute mt-8 mr-1 sm:mt-8 sm:mr-3 bg-[#f1c232] text-[#f1c232] rounded-[10px] border-none py-2.5 cursor-pointer sm:w-[290px] sm:h-[70px] w-[230px] h-[55px]"></div>
      </div>

      {/* Profiles section */}
      <div className="flex justify-center flex-wrap">
        {/* Profile components */}
        <Profile
          image="/images/pic 1.jpeg"
          name="Chasila Withanage"
          shortName="Chairman"
          details="IEEE Student Branch of University Of Moratuwa"
          email="chasilawithanage@ieee.org"
          telephone="0712618255"
        />
        <Profile
          image="/images/pic 1.jpeg"
          name="Hiruna Harankahadeniya"
          shortName="Vice Chairman"
          details="IEEE Student Branch of University Of Moratuwa"
          email="hirunaharankahadeniya@ieee.org"
          telephone="0762675516"
        />
        <Profile
          image="/images/pic 1.jpeg"
          name="Shehan Arampola"
          shortName="Web Master"
          details="IEEE Student Branch of University Of Moratuwa"
          email="shehanon1@gmail.com"
          telephone="0767098514"
        />
      </div>

      <div className="flex justify-center flex-wrap">
        <Profile
          image="/images/pic 1.jpeg"
          name="Supul Heshan"
          shortName="Event Co-Chairperson"
          details="Rise Up Mora 2023"
          email="supulheshan0926@gmail.com"
          telephone="0713344150"
        />
        <Profile
          image="/images/pic 1.jpeg"
          name="Sithum Siyambalapitiya"
          shortName="Event Co-Chairperson"
          details="Rise Up Mora 2023"
          email="sithumnimesh735@gmail.com"
          telephone="0778423916"
        />
      </div>

      <div className="flex justify-center flex-wrap">
        <Profile
          image="/images/pic 1.jpeg"
          name="Malithi Abayadeera"
          shortName="Event Co-Chairperson"
          details="Rise Up Mora 2023"
          email="Malithirumalka@gmail.com"
          telephone="0776536321"
        />
        <Profile
          image="/images/pic 1.jpeg"
          name="Kalhara Jasin Arachchi"
          shortName="Event Co-Chairperson"
          details="Rise Up Mora 2023"
          email="kalhara.ja@gmail.com"
          telephone="0711305808"
        />
        <Profile
          image="/images/pic 1.jpeg"
          name="Ama Weerasinghe"
          shortName="Event Co-Chairperson"
          details="Rise Up Mora 2023"
          email="amaweerasinghe99@gmail.com"
          telephone="0714077272"
        />
      </div>
    </div>
  );
}

// Profile component to display individual profiles
function Profile({
  image,
  name,
  shortName,
  details,
  email,
  telephone,
}: ProfileProps) {
  return (
    <div className="w-full lg:w-1/4 md:w-1/3 sm:w-1/2 p-4 h-auto my-12 mx-5">
      <div className="flex flex-col items-center text-center">
        <div className="relative overflow-hidden shine">
          <Image
            src={image}
            alt={shortName}
            width={230}
            height={230}
            className="w-[230px] h-[230px] mb-2 rounded-full border border-[rgba(250,199,175,0.966)] mx-auto"
          />
        </div>
        <div className="font-poppins font-normal text-2xl flex justify-center text-center">
          {name}
        </div>
        <div className="text-black text-center font-poppins text-xl font-thin leading-[1.4]">
          {shortName}
        </div>
        <div className="text-black text-center font-poppins text-xl font-thin leading-[1.4]">
          {details}
        </div>
        <div className="text-black text-center font-poppins text-xl font-thin leading-[1.4]">
          {email}
        </div>
        <div className="text-black text-center font-poppins text-xl font-thin leading-[1.4]">
          {telephone}
        </div>
      </div>
    </div>
  );
}
