// Components
import { useNavigate } from "@remix-run/react";
import { links as loaderLinks } from "../Loader/loader";
import { LinksFunction } from "@remix-run/node";

import Heading from "../Heading/heading";
import Button from "../Button/button";
import Divider from "../Divider/divider";
import Special from "../Special/special";
import Price from "../Price/price";
import CarMakeAndModel from "../CarMakeAndModel/CarMakeAndModel";
import CarDescription from "../CarDescription/CarDescription";
import Image from "../Image/Image";

import { Car } from "~/interfaces";
import { useCarStore } from "~/store/carStore";

const PremiumCars = () => {
  const { premiumCars } = useCarStore();
  const navigate = useNavigate();

  const handleNavigate = (section: string, value: string) => {
    navigate(`/inventory?section=${section}&value=${value}`);
  };

  const handleNavigateToListings = (carId: string) => {
    navigate(`/listings/${carId}`);
  };

  // Helper to determine badge color
  const getStatusStyles = (status: string) => {
    switch (status?.toLowerCase()) {
      case "sold":
        return "bg-red-600 text-white";
      case "reserved":
        return "bg-blue-500 text-white";
      case "pending":
        return "bg-orange-500 text-white";
      default: // available
        return "bg-green-500 text-white";
    }
  };

  return (
    <div className="max__container relative">
      <Heading
        title="Latest Premium"
        colouredText="Cars"
        classNames="text-center"
      />

      <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {premiumCars.map((car: Car) => (
          <div
            className="group relative cursor-pointer overflow-clip rounded-lg border border-transparent hover:border-gray-200 transition-all duration-300"
            key={car.carId}
            onClick={() => handleNavigateToListings(car.carId)}
          >
            {/* --- STATUS BADGE --- */}
            <div className={`absolute right-3 top-3 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-lg ${getStatusStyles(car.status)}`}>
              {car.status || "Available"}
            </div>

            <div className="relative overflow-hidden">
              <Image car={car} />
              {/* Hover overlay effect */}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="mt-3 flex justify-between px-1">
              <CarMakeAndModel car={car} />
              <Price price={car.price} className="text-[14px]" />
            </div>

            <div className="px-1">
              <CarDescription car={car} />
              <Special />
            </div>

            <hr className="mt-3 border-gray-100" />
          </div>
        ))}
      </div>

      <div
        className="relative mt-5 flex w-full items-center justify-center shadow-sm lg:mt-10"
        onClick={() => handleNavigate("premium", "all")}
      >
        <Button
          title="show all premium cars"
          className="animate font-montserrat bg-yellow px-10 py-3 text-sm uppercase text-white shadow-md duration-1000 ease-in-out hover:bg-yellow/70 disabled:cursor-not-allowed disabled:bg-primary"
        />
      </div>

      <Divider classNames="md:mb-10 mt-8" />
    </div>
  );
};

export default PremiumCars;
export const links: LinksFunction = () => [...loaderLinks()];
