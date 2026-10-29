import React, { useRef } from "react";
import { useNavigate } from "@remix-run/react";
import Heading from "../Heading/heading";
import Divider from "../Divider/divider";
import NextButton from "../PaginationRight/next";
import PrevButton from "../PaginationLeft/prev";
import { useCarStore } from "~/store/carStore";

const BrowseByMake = () => {
  const carMakes = useCarStore((state) => state.carMakes) || [];
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleNavigate = (makeName: string) => {
    navigate(`/inventory?section=make&value=${makeName.toLowerCase()}`);
  };

  // Smooth scroll handler for buttons
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="max__container px-4 py-8 sm:px-6">
      {/* HEADER & ARROWS */}
      <div className="flex items-center justify-between">
        <Heading title="Browse By" colouredText="make" />
        <div className="flex gap-2">
          <PrevButton handlePrev={() => scroll("left")} startIndex={1} />
          <NextButton handleNext={() => scroll("right")} startIndex={0} carsPerPage={1} carsLength={2} />
        </div>
      </div>

      {/* HORIZONTAL SMOOTH SLIDER (Mobile) & GRID (Desktop) */}
      <div
        ref={scrollRef}
        className="mt-6 flex gap-4 overflow-x-auto pb-4 pt-2 scroll-smooth snap-x snap-mandatory no-scrollbar sm:grid sm:grid-cols-4 lg:grid-cols-8 sm:overflow-visible sm:pb-0"
      >
        {carMakes.map((make: any) => (
          <div
            key={make.id || make.name}
            onClick={() => handleNavigate(make.name)}
            className="flex min-w-[120px] shrink-0 snap-start cursor-pointer flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-yellow/40 hover:shadow-md active:scale-95 sm:min-w-0"
          >
            <div className="flex h-14 w-16 items-center justify-center">
              <img
                src={make?.imageUrl}
                alt={make.name}
                loading="lazy"
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span className="mt-3 text-xs font-bold capitalize tracking-wide text-gray-700">
              {make.name}
            </span>
          </div>
        ))}
      </div>

      <Divider classNames="mt-10" />
    </section>
  );
};

export default BrowseByMake;
