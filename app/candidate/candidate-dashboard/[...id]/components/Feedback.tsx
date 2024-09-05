"use client";
// import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useState } from "react";

const Feedback = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-2xl font-bold  font-poppins flex gap-3">
        Feedback
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <div>Communication Skill</div>
          <div>
            <ProgressBarWrapper />
            {/* <ProgressBar
            
              bgColor={"#29A7E1"}
              height="12px"
              labelSize={"10px"}
              animateOnRender={true}
              completed={10}
            /> */}
          </div>
        </div>
        <div>
          <div>Experience And Project</div>
          <div></div>
        </div>
        <div>
          <div>ProblemSolving Skill</div>
          <div></div>
        </div>
        <div>
          <div>Technical Skill</div>
          <div></div>
        </div>
        <div>
          <div>Feedback</div>
          <div></div>
        </div>
        <div>
          <button
            // onSubmit={onSubmit}
            // type="submit"
            className={`w-4/5 md:w-1/3 lg:w-1/4 p-1 bg-[#0c2735] text-white font-bold rounded-full `}
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProgressBarProps {
  value: number;
  onChange: (newValue: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, onChange }) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<number | null>(null);

  const handleClick = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const midPoint = rect.width / 2;

    // Increase or decrease progress by 10% based on click position
    let newValue;
    if (clickX > midPoint) {
      newValue = Math.min(value + 10, 100); // Increase by 10% but max at 100%
    } else {
      newValue = Math.max(value - 10, 0); // Decrease by 10% but min at 0%
    }

    onChange(newValue);
  };

  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const hoverX = e.clientX - rect.left;
    const newHoverValue = Math.round((hoverX / rect.width) * 100);

    // Ensure the tooltip stays within the progress bar bounds
    const tooltipX = Math.min(Math.max(hoverX, 0), rect.width);

    setHoverValue(newHoverValue);
    setTooltipPosition(tooltipX);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
    setTooltipPosition(null);
  };

  return (
    <div
      className="relative w-full bg-gray-200 rounded-full h-4 cursor-pointer"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="bg-blue-500 h-4 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      />
      {hoverValue !== null && tooltipPosition !== null && (
        <div
          className="absolute text-xs text-white bg-black px-1 py-0.5 rounded"
          style={{
            top: "-24px",
            left: `${tooltipPosition}px`,
            transform: "translateX(-50%)",
          }}
        >
          {hoverValue}%
        </div>
      )}
    </div>
  );
};

const ProgressBarWrapper: React.FC = () => {
  const [progress, setProgress] = useState<number>(10);

  const handleProgressChange = (newValue: number) => {
    setProgress(newValue);
    // console.log(`Progress changed to: ${newValue}%`);
  };

  return (
    <div className="p-4">
      <ProgressBar value={progress} onChange={handleProgressChange} />
    </div>
  );
};
export default Feedback;
