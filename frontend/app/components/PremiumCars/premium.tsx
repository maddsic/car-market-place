import { useNavigate } from "@remix-run/react";
import { links as loaderLinks } from "../Loader/loader";
import { LinksFunction } from "@remix-run/node";

import Heading from "../Heading/heading";
import Button from "../Button/button";
import Divider from "../Divider/divider";
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

  // Helper to determine status badge style
  const getStatusStyles = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "sold":
        return "bg-red-500/90 text-white backdrop-blur-md";
      case "reserved":
        return "bg-amber-500/90 text-white backdrop-blur-md";
      case "pending":
        return "bg-orange-500/90 text-white backdrop-blur-md";
      default: // available
        return "bg-emerald-500/90 text-white backdrop-blur-md";
    }
  };

  return (
    <section className="max__container relative">
      <Heading
        title="Latest Premium"
        colouredText="Cars"
        classNames="text-center"
      />

      {/* CAR GRID */}
      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {(premiumCars || []).map((car) => (
          <div
            key={car.carId}
            onClick={() => handleNavigateToListings(car.carId)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-yellow/30 hover:shadow-xl flex flex-col justify-between"
          >
            <div>
              {/* IMAGE & BADGE CONTAINER */}
              <div className="relative overflow-hidden rounded-xl">
                {/* STATUS BADGE */}
                <div
                  className={`absolute right-3 top-3 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md ${getStatusStyles(
                    car.status
                  )}`}
                >
                  {car.status || "Available"}
                </div>

                {/* CAR IMAGE */}
                <div className="transition-transform duration-700 ease-out group-hover:scale-105">
                  <Image car={car as Car} />
                </div>

                {/* HOVER OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* MAKE, MODEL & PRICE */}
              <div className="mt-4 flex items-start justify-between px-1 gap-2">
                <div className="transition-colors group-hover:text-yellow">
                  <CarMakeAndModel car={car as Car} />
                </div>
                <Price price={car.price} className="scale-95 origin-top-right font-bold" />
              </div>

              {/* DESCRIPTION & SPECS */}
              <div className="mt-2 px-1 text-xs text-gray-500">
                <CarDescription car={car as Car} />
              </div>
            </div>

            {/* CARD BOTTOM DIVIDER */}
            <hr className="mt-4 border-gray-100" />
          </div>
        ))}
      </div>

      {/* VIEW ALL BUTTON */}
      <div className="mt-10 flex w-full items-center justify-center">
        <Button
          onClick={() => handleNavigate("premium", "all")}
          title="show all premium cars"
          className="font-montserrat rounded-xl bg-yellow px-10 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-yellow/90 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:bg-primary"
        />
      </div>

      <Divider classNames="md:mb-10 mt-12" />
    </section>
  );
};

export default PremiumCars;

export const links: LinksFunction = () => [...loaderLinks()];
