"use client";

import React, { useEffect } from "react";

// gsap
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import TimelineCard from "./ui/timelinecard";
import Topic from "./ui/topic";

// registering gsap
gsap.registerPlugin(ScrollTrigger);


const Timeline = () => {

  useEffect(() => {
    gsap.fromTo(
      ".topicContainer",
      { x: -200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: ".partnersSection",
          start: "top 100%",
          end: "bottom 80%",
          scrub: true,
          once: true,
          onEnter: () =>
            gsap.to(".topicContainer", { x: 0, opacity: 1, duration: 0.05 }),
        },
      }
    );
  }, []);

  return (
    <div className="m-8 partnersSection relative">

    <div className="absolute top-2 left-2 sm:top-4 sm:left-4 topicContainer opacity-0">
      <Topic text="Timeline" />
    </div>

    <br />

    <div className="flex flex-row justify-center items-center pt-[50px]">
      <div className="flex flex-col">
        <TimelineCard 
          topic="Session 01 BY IFS" 
          subtopic="Mastering CV & LinkedIn Strategies." 
          description="- 7.00 P.M - August 15th, 2023 (Via Zoom) -"
        />
        <TimelineCard 
          topic="Session 02 BY WSO2" 
          subtopic="Excelling in Interviews." 
          description="- 7.00 P.M - August 18th, 2023 (Via Zoom) -"
        />
        <TimelineCard 
          topic="Session 03 BY 99X" 
          subtopic="How to face in Interview." 
          description="- 7.00 P.M - August 20th, 2024 (Via Zoom)-"
        />
      </div>
    </div>

  </div>
  );
};

export default Timeline;
