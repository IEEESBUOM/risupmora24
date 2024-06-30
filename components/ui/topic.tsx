import React, { FC } from "react";

interface TopicProps {
  topicText: string;
}

const Topic: FC<TopicProps> = ({ topicText }) => {
  return (
    <div className="relative flex justify-start items-start ml-4">
      <div className="relative z-10 bg-[#0c2735] text-white rounded-lg w-fit px-8 py-2 cursor-pointer font-poppins">
        <span>{topicText}</span>
      </div>
      <div
        className="absolute top-0 left-0 z-0 bg-[#f1c232] rounded-lg w-fit px-8 py-2.5 translate-x-[-0.0625rem] translate-y-[0.125rem]"
        style={{ transform: "translate(-2px, 2px)" }}
      >
        <span className="opacity-0">{topicText}</span>
      </div>
    </div>
  );
};

export default Topic;
