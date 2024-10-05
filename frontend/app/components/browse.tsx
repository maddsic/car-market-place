import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import acura from "/cars_logos/acura.png";
import bmw from "/cars_logos/bmw.png";
import chevy from "/cars_logos/chevy.png";
import ford from "/cars_logos/ford.png";
import honda from "/cars_logos/honda.png";
import hyundai from "/cars_logos/hyundai.png";
import kia from "/cars_logos/kia.png";
import lexus from "/cars_logos/lexus.png";
import mazda from "/cars_logos/mazda.png";
import mercedes from "/cars_logos/mercedes.png";
import nissan from "/cars_logos/nissan.png";
import toyota from "/cars_logos/toyota.png";
import Divider from "./divider";
import Heading from "./heading";

const cars = [
  { id: 1, name: "Acura", img: acura },
  { id: 2, name: "BMW", img: bmw },
  { id: 3, name: "Chevrolet", img: chevy },
  { id: 4, name: "Ford", img: ford },
  { id: 5, name: "Honda", img: honda },
  { id: 6, name: "Hyundai", img: hyundai },
  { id: 7, name: "Kia", img: kia },
  { id: 8, name: "Lexus", img: lexus },
  { id: 9, name: "Mazda", img: mazda },
  { id: 10, name: "Mercedes", img: mercedes },
  { id: 11, name: "Nissan", img: nissan },
  { id: 12, name: "Toyota", img: toyota },
];

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
