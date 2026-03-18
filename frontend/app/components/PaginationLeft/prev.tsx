import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PrevButtonProps {
  handlePrev: () => void;
  startIndex: number;
}

const PrevButton: React.FC<PrevButtonProps> = ({ handlePrev, startIndex }) => {
  const isDisabled = startIndex === 0;

  return (
    <span
      className={`cursor-pointer rounded-lg bg-gray-200 px-5 py-3 duration-1000 hover:bg-yellow ${
        isDisabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={handlePrev}
    >
      <FaArrowLeft className="text-gray-400" />
    </span>
  );
};

export default PrevButton;
