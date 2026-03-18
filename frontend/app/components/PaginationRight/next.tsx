import React from "react";
import { FaArrowRight } from "react-icons/fa";

interface NextButtonProps {
  handleNext: () => void;
  startIndex: number;
  carsPerPage: number;
  carsLength: number;
}

const NextButton: React.FC<NextButtonProps> = ({
  handleNext,
  startIndex,
  carsPerPage,
  carsLength,
}) => {
  const isDisabled = startIndex + carsPerPage >= carsLength;

  return (
    <span
      className={`cursor-pointer rounded-lg bg-gray-200 px-5 py-3 duration-1000 hover:bg-yellow ${
        isDisabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={!isDisabled ? handleNext : undefined}
    >
      <FaArrowRight className="text-gray-400" />
    </span>
  );
};

export default NextButton;
