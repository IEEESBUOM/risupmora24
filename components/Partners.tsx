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
  useEffect(() => {
    // Animation for the Topic component
    gsap.fromTo(
      ".topicContainer",
      { x: -200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        // scrollTrigger: {
        //   trigger: ".partnersSection",
        //   start: "top 80%",
        //   end: "bottom 20%",
        //   scrub: true,
        //   onEnter: () =>
        //     gsap.to(".topicContainer", { x: 0, opacity: 1, duration: 0.5 }),
        //   onLeave: () =>
        //     gsap.to(".topicContainer", { x: -200, opacity: 0, duration: 0.5 }),
        //   onEnterBack: () =>
        //     gsap.to(".topicContainer", { x: 0, opacity: 1, duration: 0.5 }),
        //   onLeaveBack: () =>
        //     gsap.to(".topicContainer", { x: -200, opacity: 0, duration: 0.5 }),
        // },
      }
    );

    // Animation for images
    gsap.utils.toArray<HTMLElement>(".imgFromLeft").forEach((img) => {
      gsap.fromTo(
        img,
        { x: -200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: img,
            start: "top 90%",
            end: "bottom 10%",
            scrub: true,
            onEnter: () => gsap.to(img, { x: 0, opacity: 1, duration: 0.5 }),
            onLeave: () => gsap.to(img, { x: 200, opacity: 0, duration: 0.5 }),
            onEnterBack: () =>
              gsap.to(img, { x: 0, opacity: 1, duration: 0.5 }),
            onLeaveBack: () =>
              gsap.to(img, { x: -200, opacity: 0, duration: 0.5 }),
          },
        }
      );
    });

    // Animation for the Topic component
    gsap.fromTo(
      ".topicContainer",
      { x: -200, opacity: 0 },
      {
        x: 0,
        opacity: 5,
        duration: 0.5,
        scrollTrigger: {
          trigger: ".partnersSection",
          start: "top 100%",
          end: "bottom 80%",
          scrub: true,
          once: true, // Trigger animation only once
          onEnter: () =>
            gsap.to(".topicContainer", { x: 0, opacity: 1, duration: 0.05 }),
        },
      }
    );
  }, []);

  return (
    <div className="m-8 partnersSection relative">
      <div className="topicContainer absolute top-2 left-2 opacity-0">
        <Topic text="Our Partners" />
      </div>
      <Slideshow />
      <div className="container-fluid p-0 mt-8 flex flex-col items-center justify-center">
        <div className="row flex flex-wrap justify-center items-center mt-5">
          <div className="col-sm-4 flex flex-col items-center justify-center mb-8 sm:mb-0">
            <div className="text-center text-lg w-64">Platinum Partner</div>
            <div className="flex justify-center items-center w-36 h-36 imgFromLeft">
              <Image
                src={unilever}
                alt="Unilever"
                width={100}
                height={100}
                objectFit="contain"
              />
            </div>
          </div>

          <div className="col-sm-4 flex flex-col items-center justify-center mb-8 sm:mb-0 h-44">
            <div className="text-center text-lg w-64">Gold Partner</div>
            <div className="flex justify-center items-center w-36 h-36 imgFromLeft">
              <Image
                src={ws02}
                alt="WSO2"
                width={150}
                height={150}
                objectFit="contain"
              />
            </div>
          </div>

          <div className="col-sm-4 flex flex-col items-center justify-center mb-8 sm:mb-0 h-44">
            <div className="text-center text-lg w-64">Innovation Partner</div>
            <div className="flex justify-center items-center w-36 h-36 imgFromLeft">
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

        <div className="row flex flex-wrap justify-center items-center mt-5">
          <div className="col-sm-4 flex flex-col items-center justify-center mb-8 sm:mb-0">
            <div className="text-center text-lg w-64">Silver Partner</div>
            <div className="flex justify-center items-center h-24 imgFromLeft">
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
            <div className="flex justify-center items-center h-24 imgFromLeft">
              <Image
                src={pickMe}
                alt="PickMe"
                width={150}
                height={150}
                objectFit="contain"
              />
            </div>
          </div>
          <div className="col-sm-4 flex flex-col items-center justify-center mb-8 sm:mb-0">
            <div className="text-center text-lg w-64">Bronze Partner</div>
            <div className="flex justify-center items-center h-24 imgFromLeft">
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
