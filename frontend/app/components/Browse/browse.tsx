import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { cars } from "~/data/carmakes";
import Heading from "../Header/heading";
import Divider from "../Divider/divider";
import NextButton from "../PaginationRight/next";
import PrevButton from "../PaginationLeft/prev";

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

  // Next button
  const handleNext = () => {
    if (startIndex + 1 < cars.length - carsPerPage + 1) {
      setStartIndex(startIndex + 1);
    }
  };

  // Prev button
  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <main className="max__container p-6 md:block">
      <div className="flex items-center justify-between">
        <Heading title="Browse By" colouredText="make" />
        {/* PAGINATION */}
        <div className="flex gap-4">
          <PrevButton startIndex={startIndex} handlePrev={handlePrev} />

          <NextButton
            handleNext={handleNext}
            startIndex={startIndex}
            carsPerPage={carsPerPage}
            carsLength={cars.length}
          />
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
