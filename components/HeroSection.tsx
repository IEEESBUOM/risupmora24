import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
const HeroSection = () => {
  const animate = () => {
    gsap.to(".custom-animation", { y: -80, duration: 0.5 });
  };

  const reverseAnimate = () => {
    gsap.to(".custom-animation", { y: 0, duration: 0.5 });
  };
  return (
    <div className="sm:h-screen grid justify-center content-between">
      <Image
        className="mt-36 px-20 sm:px-16 md:px-0 mb-20"
        src="/images/navbar-logo-large.png"
        width={500}
        height={500}
        alt="riseUpMoraLogo"
      />

      <div className=" grid justify-center">
        
        <button
          onMouseEnter={animate}
          onMouseLeave={reverseAnimate}
          className="  w-[140px] h-[50px] bg-custom-black font-quicksand text-white rounded-full border-none outline-none cursor-pointer  shadow-[0_15px_30px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <Link href={"/auth/register"} className=" grid  justify-center items-center gap-16 py-4 text-xs font-medium tracking-wider">
            <div className="flex gap-3  custom-animation">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-door-open-fill"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
              </svg>
              SIGN IN
            </div>
            <div className="custom-animation text-custom-yellow">WELCOME</div>
          </Link>
        </button>
      
      </div>

      {/* animated arrows */}
      <div className="grid gap-3 justify-center mb-16">
        <span className="w-[30px] h-[30px] block border-r-[5px] border-b-[5px] border-custom-yellow transform rotate-45 -m-[10px] animate-animate"></span>
        <span
          className="w-[30px] h-[30px] block border-r-[5px] border-b-[5px] border-custom-yellow transform rotate-45 -m-[10px] animate-animate"
          style={{ animationDelay: "-0.2s" }}
        ></span>
        <span
          className="w-[30px] h-[30px] block border-r-[5px] border-b-[5px] border-custom-yellow transform rotate-45 -m-[10px] animate-animate"
          style={{ animationDelay: "-0.4s" }}
        ></span>
      </div>
    </div>
  );
};

export default HeroSection;
