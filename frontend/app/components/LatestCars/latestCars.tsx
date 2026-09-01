import { FaGasPump, FaRoad } from "react-icons/fa";
import { SiTransmission } from "react-icons/si";
import { BsTelephone } from "react-icons/bs";
import { useNavigate } from "@remix-run/react";

import Heading from "../Heading/heading";
import Price from "../Price/price";
import Button from "../Button/button";
import { useCarStore } from "~/store/carStore";
import { LatestCar } from "~/store/carStoreInterfaces";

const LatestCars = () => {
  const { latestCars } = useCarStore();
  const navigate = useNavigate();

  const handleNavigate = (section: string, value: string) => {
    navigate(`/inventory?section=${section}&value=${value}`);
  };

  const getStatusStyles = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "sold":
        return "bg-red-500/90 text-white backdrop-blur-md";
      case "reserved":
        return "bg-amber-500/90 text-white backdrop-blur-md";
      default:
        return "bg-emerald-500/90 text-white backdrop-blur-md";
    }
  };

  return (
    <section className="max__container relative">
      <Heading title="latest for" colouredText="sale" classNames="text-center" />

      {/* CAR GRID */}
      <div className="mt-10 grid gap-8 grid-cols-1 xl:grid-cols-2">
        {(latestCars || []).map((car: LatestCar) => (
          <div
            key={car?.carId}
            onClick={() => navigate(`/listings/${car.carId}`)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow/30 hover:shadow-xl md:grid md:grid-cols-12 md:gap-6"
          >
            {/* IMAGE SECTION */}
            <div className="relative h-56 w-full overflow-hidden rounded-xl md:col-span-5 md:h-full min-h-[200px]">
              {/* STATUS BADGE */}
              <div
                className={`absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm ${getStatusStyles(
                  car?.status
                )}`}
              >
                {car?.status || "Available"}
              </div>

              {/* CAR IMAGE */}
              <img
                src={car?.imageUrl || "/placeholder-car.jpg"}
                alt={`${car?.make} ${car?.model}`}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* OVERLAY GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            {/* CONTENT SECTION */}
            <div className="mt-4 flex flex-col justify-between md:col-span-7 md:mt-0 md:py-1">
              <div>
                {/* HEADER & PRICE */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                      {car?.year} {car?.make}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow transition-colors">
                      {car?.model}
                    </h3>
                  </div>
                  <Price price={car?.price} className="scale-95 origin-top-right" />
                </div>

                {/* SPECIFICATIONS GRID */}
                <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl bg-gray-50/80 p-2.5 text-[11px]">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white shadow-xs text-yellow">
                      <FaRoad size={12} />
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-[9px] text-gray-400 uppercase font-medium">Mileage</span>
                      <span className="font-semibold text-gray-700 truncate">
                        {car?.mileage ? car.mileage.toLocaleString() : 0} km
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white shadow-xs text-yellow">
                      <FaGasPump size={12} />
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-[9px] text-gray-400 uppercase font-medium">Fuel</span>
                      <span className="font-semibold text-gray-700 truncate capitalize">
                        {car?.fuelType || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white shadow-xs text-yellow">
                      <SiTransmission size={12} />
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-[9px] text-gray-400 uppercase font-medium">Trans</span>
                      <span className="font-semibold text-gray-700 truncate capitalize">
                        {car?.transmission || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SELLER FOOTER */}
              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-3">
                <div className="flex items-center gap-2.5">
                  <img
                    src={car?.owner?.avatarUrl || "/profile.jpeg"}
                    alt={car?.owner?.first_name || "Seller"}
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-gray-100"
                  />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400">Listed by</span>
                    <span className="text-xs font-bold text-gray-800 capitalize">
                      {car?.owner?.first_name} {car?.owner?.last_name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${car?.owner?.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 rounded-lg bg-yellow/10 px-3 py-1.5 text-[11px] font-bold text-yellow hover:bg-yellow hover:text-white transition-all"
                  >
                    <BsTelephone size={11} />
                    <span>Call</span>
                  </a>
                  {car?.stockNumber && (
                    <span className="hidden sm:inline-block rounded-md bg-gray-100 px-2 py-1 text-[9px] font-semibold text-gray-500 uppercase">
                      Stk# {car.stockNumber}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW ALL BUTTON */}
      <div className="mt-12 flex justify-center">
        <Button
          onClick={() => handleNavigate("latest", "all")}
          title="show all latest cars"
          className="font-montserrat rounded-xl bg-yellow px-10 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-yellow/90 hover:shadow-lg active:scale-95"
        />
      </div>
    </section>
  );
};

export default LatestCars;
