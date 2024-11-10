import React, { useEffect, useState } from "react";

import Heading from "../Heading/heading";
import Divider from "../Divider/divider";
import NextButton from "../PaginationRight/next";
import PrevButton from "../PaginationLeft/prev";
import { useNavigate } from "@remix-run/react";

const BrowseBymake = ({ carMakes }: { carMakes: any }) => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [carsPerPage, setCarsPerPage] = useState<number>(8);
  const navigate = useNavigate();

  // const handleSelection = (makeId: string) => {
  //   navigate(`/inventory?makeId=${makeId}`);
  // };

  const handleNavigate = (section: string, value: string) => {
    navigate(`/inventory?section=${section}&value=${value}`);
  };

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
    if (startIndex + 1 < carMakes.length - carsPerPage + 1) {
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
            carsLength={carMakes.length}
          />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-6 md:grid-cols-4 lg:mt-10 lg:grid-cols-8">
        {carMakes &&
          carMakes
            .slice(startIndex, startIndex + carsPerPage)
            .map((make: any) => (
              <div
                key={make.id}
                className="flex transform cursor-pointer flex-col items-center justify-center p-4 transition duration-1000 ease-linear animate-out hover:border"
                onClick={() => handleNavigate("make", make.name)}
              >
                <img
                  src={make?.imageUrl}
                  alt={make.name}
                  className="mb-4 w-20"
                />
                <p className="text-lg font-medium text-gray-600">{make.name}</p>
              </div>
            ))}
      </div>
      <Divider />
    </main>
  );
};

export default BrowseBymake;
