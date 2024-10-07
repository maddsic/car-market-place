import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import Divider from "./divider";
import Heading from "./heading";
import { cars } from "~/data/carmakes";

const BrowseBymake = () => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [carsPerPage, setCarsPerPage] = useState<number>(8);

  useEffect(() => {
    const handleWindowSizeChanged = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCarsPerPage(2);
      } else if (width >= 768 && width < 1024) {
        setCarsPerPage(4);
      } else {
        setCarsPerPage(8);
      }
    };

    // Call our function
    handleWindowSizeChanged();
    window.addEventListener("resize", handleWindowSizeChanged);

    // Clean up function
    return () => window.removeEventListener("resize", handleWindowSizeChanged);
  }, []);

  const handleNext = () => {
    if (startIndex + 1 < cars.length - carsPerPage + 1) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <main className="max__container p-6 md:block">
      <div className="flex items-center justify-between">
        <Heading title="Browse By" colouredText="make" />
        <div className="flex gap-4">
          <span
            className={`cursor-pointer rounded-lg bg-gray-200 px-5 py-3 duration-1000 hover:bg-yellow ${
              startIndex === 0 ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handlePrev}
          >
            <FaArrowLeft className="text-gray-400" />
          </span>
          <span
            className={`cursor-pointer rounded-lg bg-gray-200 px-5 py-3 duration-1000 hover:bg-yellow ${
              startIndex + carsPerPage >= cars.length
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            onClick={handleNext}
          >
            <FaArrowRight className="text-gray-400" />
          </span>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-6 md:grid-cols-4 lg:mt-10 lg:grid-cols-8">
        {cars.slice(startIndex, startIndex + carsPerPage).map((make) => (
          <div
            key={make.id}
            className="transformtransition flex cursor-pointer flex-col items-center justify-center p-4 duration-1000 ease-linear animate-out hover:border"
          >
            <img src={make.img} alt={make.name} className="mb-4 w-20" />
            <p className="text-lg font-medium text-gray-600">{make.name}</p>
          </div>
        ))}
      </div>
      <Divider />
    </main>
  );
};

export default BrowseBymake;
