"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

import IFS from "../assets/img/ifs.png";
import YP from "../assets/img/ifs.png";
import SB from "../assets/img/ifs.png";
import ws02 from "../assets/img/wso2.png";
import pickMe from "../assets/img/pickme.png";
import unilever from "../assets/img/unilever.png";
import gtn from "../assets/img/gtn.png";
import zero_beta from "../assets/img/zerobeta.png";
import mas from "../assets/img/mas.png";

// gsap
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Slideshow from "./ui/slideShow";
import Topic from "./ui/topic";

// Registering gsap
gsap.registerPlugin(ScrollTrigger);

function Partners() {
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
    <div className="m-8 partnersSection relative">
      <div
        className="absolute top-2 left-2 sm:top-4 sm:left-4 topicContainer opacity-0 mb -10"
        ref={topicRef}
      >
        <Topic text="Our Partners" />
      </div>
      <br />
      <div className="mt-16 sm:mt-20">
        <Slideshow />
      </div>
      <div className="container-fluid p-0 mt-8 flex flex-col items-center justify-center">
        <div className="row flex flex-wrap justify-center items-center mt-5">
          <div className="col-sm-4 flex flex-col items-center justify-center mb-8 sm:mb-0">
            <div className="text-center text-lg w-64">Platinum Partner</div>
            <div className="flex justify-center items-center w-36 h-36">
              {/* <Image
                src={unilever}
                alt="Unilever"
                width={100}
                height={100}
                objectFit="contain"
              /> */}
              <div className="text-center text-sm text-gray-300">
          Coming Soon
        </div>
            </div>
          </div>

          <div className="col-sm-4 flex flex-col items-center justify-center mb-8 sm:mb-0 h-44">
            <div className="text-center text-lg w-64">Gold Partner</div>
            <div className="flex justify-center items-center size-56">
              <Image
                src={mas}
                alt="mas"
                width={200}
                height={200}
                objectFit="contain"
              />
            </div>
          </div>

          <div className="col-sm-4 flex flex-col items-center justify-center mb-8 sm:mb-0 h-44">
            <div className="text-center text-lg w-64">Innovation Partner</div>
            <div className="flex justify-center items-center w-36 h-36">
              {/* <Image
                src={IFS}
                alt="IFS"
                width={150}
                height={150}
                objectFit="contain"
              /> */}
              <div className="text-center text-sm text-gray-300">
          Coming Soon
        </div>
            </div>
          </div>
        </div>

        <div className="row flex flex-wrap justify-center items-center mt-5">
          <div className="col-sm-4 flex flex-col items-center justify-center mb-8 sm:mb-0">
            <div className="text-center text-lg w-64">Silver Partner</div>
            <div className="flex justify-center items-center h-24">
              <Image
                src={gtn}
                alt="GTN"
                width={150}
                height={150}
                objectFit="contain"
              />
            </div>
          </div>
          <div className="col-sm-4 flex flex-col items-center justify-center mb-8 sm:mb-0">
            <div className="text-center text-lg w-64">Silver Partner</div>
            <div className="flex justify-center items-center h-24">
              {/* <Image
                src={pickMe}
                alt="PickMe"
                width={150}
                height={150}
                objectFit="contain"
              /> */}
              <div className="text-center text-sm text-gray-300">
          Coming Soon
        </div>
            </div>
          </div>
          <div className="col-sm-4 flex flex-col items-center justify-center mb-8 sm:mb-0">
            <div className="text-center text-lg w-64">Bronze Partner</div>
            <div className="flex justify-center items-center h-24">
              {/* <Image
                src={zero_beta}
                alt="Zero Beta"
                width={150}
                height={150}
                objectFit="contain"
              /> */}
              <div className="text-center text-sm text-gray-300">
          Coming Soon
        </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Partners;
