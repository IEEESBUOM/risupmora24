import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface ProfileProps {
  image: string;
  name: string;
  shortName: string;
  details: string;
  email: string;
  telephone: string;
}

// Main ContactUs component remains unchanged
export default function ContactUs() {
  const topicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topicRef.current) {
      gsap.fromTo(
        topicRef.current,
        { transform: "translate3d(-100px, 0, 0)", opacity: 0.5 }, // Start off-screen to the left
        {
          transform: "translate3d(0, 0, 0)", // End at its final position
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: topicRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
            // Remove 'once: true' to allow re-triggering of the animation
          },
        }
      );
    }
  }, []);

  return (
    <div className="h-auto w-auto pb-10">
      <div className="flex justify-start p-10" ref={topicRef}>
        <div className="bg-[#0c2735] text-white font rounded-[10px] border-none cursor-pointer z-10 py-1 px-5 ml-1.5 mt-4">
          <span className="font-poppins sm:text-[30px] line-height-1 sm:ml-3 ml-3 text-[30px]">
            Contact Us
          </span>
        </div>
        <div className="absolute mt-8 mr-1 sm:mt-6 sm:mr-3 bg-[#f1c232] text-[#f1c232] rounded-[10px] border-none py-4 cursor-pointer sm:w-[200px] sm:h-[50px] h-[30px]"></div>
      </div>

      {/* Profiles section */}
      <div className="flex justify-center flex-wrap">
        {/* Profile components */}
        <Profile
          image="/contactUsImages/SenelEphraims.jpg"
          name="Senel Perera "
          shortName="Chairman"
          details="IEEE Student Branch of University Of Moratuwa"
          email="senel.ephraims@ieee.org"
          telephone="0770410762"
        />
        <Profile
          image="/contactUsImages/YasithSenarath.jpg"
          name="Yasith Senarath"
          shortName="Vice Chairman"
          details="IEEE Student Branch of University Of Moratuwa"
          email="yasithsenarath@ieee.org"
          telephone="0715960336"
        />
        <Profile
          image="/contactUsImages/Malithi.jpeg"
          name="Malithi Rumalka"
          shortName="Assistant Secretary"
          details="IEEE Student Branch of University Of Moratuwa"
          email="malithirumalka@gmail.com"
          telephone="0776536321"
        />
      </div>

      <div className="flex justify-center flex-wrap">
        <Profile
          image="/contactUsImages/ruchith.jpg"
          name="Ruchith Nusara"
          shortName="Event Co-Chairperson"
          details="Rise Up Mora 2024"
          email="ruchithsamarawickrama.sg@gmail.com"
          telephone="0701118330"
        />
        <Profile
          image="/contactUsImages/PavanEpa.jpeg"
          name="Pavan Epa"
          shortName="Event Co-Chairperson"
          details="Rise Up Mora 2024"
          email="pavantanusha@gmail.com"
          telephone="0714332002"
        />
      </div>

      <div className="flex justify-center flex-wrap">
        <Profile
          image="/contactUsImages/Thrishal Shavinda.jpg"
          name="Thrishal Shavinda"
          shortName="Event Co-Chairperson"
          details="Rise Up Mora 2024"
          email="thrishalshavinda5@gmail.com"
          telephone="0769042770"
        />
        <Profile
          image="/contactUsImages/Anupama Jayasekara.jpg"
          name=" Anupama Jayasekara"
          shortName="Event Co-Chairperson"
          details="Rise Up Mora 2024"
          email="anujayofficial@gmail.com"
          telephone="0712324024"
        />
        <Profile
          image="/contactUsImages/duthikaAruni.jpg"
          name="Duthika Fernando"
          shortName="Event Co-Chairperson"
          details="Rise Up Mora 2024"
          email="menushafernando1123@gmail.com"
          telephone="0774299887"
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
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shineEffect = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLDivElement;
      gsap.fromTo(
        target,
        {
          background: `linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%)`,
          backgroundPosition: "100% 100%",
        },
        {
          backgroundPosition: "-100% -100%",
          duration: 1,
          ease: "power2.out",
        }
      );
    };

    const shineReset = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLDivElement;
      gsap.to(target, {
        backgroundPosition: "100% 100%",
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const imageElement = imageRef.current;
    if (imageElement) {
      imageElement.addEventListener("mouseenter", shineEffect);
      imageElement.addEventListener("mouseleave", shineReset);
    }

    return () => {
      if (imageElement) {
        imageElement.removeEventListener("mouseenter", shineEffect);
        imageElement.removeEventListener("mouseleave", shineReset);
      }
    };
  }, []);

  return (
    <div className="w-full lg:w-1/4 md:w-1/3 sm:w-1/2 p-4 h-auto my-12 mx-5">
      <div className="flex flex-col items-center text-center">
        <div
          ref={imageRef}
          className="relative overflow-hidden shine bg-white transition-all duration-300 ease-in-out"
        >
          <Image
            src={image}
            alt={shortName}
            width={500}
            height={500}
            className="w-[230px] h-[230px] mb-2 rounded-full border border-[rgba(250,199,175,0.966)] mx-auto"
          />
        </div>
        <div className="font-poppins font-normal text-2xl flex justify-center text-center">
          {name}
        </div>
        <div className="text-black text-center font-poppins text-lg font-lighter leading-[1.4]">
          {shortName}
        </div>
        <div className="text-black text-center font-poppins text-lg font-lighter leading-[1.4]">
          {details}
        </div>
        <div className="text-black text-center font-poppins text-lg font-lighter leading-[2.0]">
          {email}
        </div>
        <div className="text-black text-center font-poppins text-lg font-lighter leading-[1.4]">
          {telephone}
        </div>
      </div>
    </div>
  );
}
