"use client";

import React, { useEffect, useRef } from "react";

// gsap
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import TimelineCard from "./ui/timelinecard";
import Topic from "./ui/topic";

// Registering gsap
gsap.registerPlugin(ScrollTrigger);
const Timeline = () => {
  const topicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topicRef.current) {
      gsap.fromTo(
        topicRef.current,
        { transform: "translate3d(-100px, 0, 0)", opacity: 0.5 },
        {
          transform: "translate3d(0, 0, 0)",

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
    <div className="sm:m-8 partnersSection relative overflow-hidden">
      <div
        className="absolute top-2 left-2 sm:top-4 sm:left-4 topicContainer opacity-0"
        ref={topicRef}
      >
        <Topic text="Timeline" />
      </div>

      <br />

      <div className="flex flex-row justify-center items-center pt-[50px]">
        <div className="flex flex-col">
          <TimelineCard
            topic="Session 01 BY MASS"
            subtopic="linked in profile creation and maintenance. "
            description="- 3.00 - PM August 27th, 2024 (Via Zoom) -"
          />
          <TimelineCard
            topic="Session 02 BY IFS"
            subtopic="Excelling in Cv writing."
            description="- 6.00 PM - September 3rd, 2024 (Via Zoom) -"
          />
          <TimelineCard
            topic="Session 03 BY IFS"
            subtopic="How to face in Interview."
            description="- 6.00 PM - September 10th, 2024 (Via Zoom)-"
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
