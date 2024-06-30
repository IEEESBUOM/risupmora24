"use client";


import React, { useEffect } from "react";
import Image from "next/image";

import IFS from "../assets/img/ifs.png";
import YP from "../assets/img/ifs.png";
import SB from "../assets/img/ifs.png";
import ws02 from "../assets/img/wso2.png";
import pickMe from "../assets/img/pickme.png";
import unilever from "../assets/img/unilever.png";
import gtn from "../assets/img/gtn.png";
import zero_beta from "../assets/img/zerobeta.png";

// gsap
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Slideshow from "./ui/slideShow";
import Topic from "./ui/topic";

// registering gsap
gsap.registerPlugin(ScrollTrigger);

function Partners() {
  // from left
  useEffect(() => {
    gsap.from(".buttonContainer", {
      x: -200,
      opacity: 0,
      duration: 0.5,
      scrollTrigger: {
        trigger: ".buttonContainer",
        start: "top 100%",
        end: "bottom 50%",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="m-8">
      <div className="row mt-5">
        <div className="buttonContainer">
          <Topic topicText="Our Partners" />
        </div>
      </div>
      <Slideshow />
      <div className="container-fluid p-0 mt-8 flex flex-col items-center justify-center">
        <div className="row flex justify-center items-center mt-5">
          <div className="col-sm-4 flex flex-col items-center justify-center">
            <div className="text-center text-lg w-64">Platinum Partner</div>
            <div className="flex justify-center items-center w-36 h-36">
              <Image
                src={unilever}
                alt="Unilever"
                width={100}
                height={100}
                objectFit="contain"
              />
            </div>
          </div>

          <div className="col-sm-4 flex flex-col items-center justify-center h-44">
            <div className="text-center text-lg w-64">Gold Partner</div>
            <div className="flex justify-center items-center w-36 h-36">
              <Image
                src={ws02}
                alt="WSO2"
                width={150}
                height={150}
                objectFit="contain"
              />
            </div>
          </div>

          <div className="col-sm-4 flex flex-col items-center justify-center h-44">
            <div className="text-center text-lg w-64">Innovation Partner</div>
            <div className="flex justify-center items-center w-36 h-36">
              <Image
                src={IFS}
                alt="IFS"
                width={150}
                height={150}
                objectFit="contain"
              />
            </div>
          </div>
        </div>

        <div className="row flex justify-center items-center mt-5">
          <div className="col-sm-4 flex flex-col items-center justify-center">
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
          <div className="col-sm-4 flex flex-col items-center justify-center">
            <div className="text-center text-lg w-64">Silver Partner</div>
            <div className="flex justify-center items-center h-24">
              <Image
                src={pickMe}
                alt="PickMe"
                width={150}
                height={150}
                objectFit="contain"
              />
            </div>
          </div>
          <div className="col-sm-4 flex flex-col items-center justify-center">
            <div className="text-center text-lg w-64">Bronze Partner</div>
            <div className="flex justify-center items-center h-24">
              <Image
                src={zero_beta}
                alt="Zero Beta"
                width={150}
                height={150}
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Partners;
