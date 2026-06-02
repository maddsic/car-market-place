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
  // console.log("Latest cars", latestCars)
  const navigate = useNavigate();

  const avatarUrl = `http://localhost:3000/image_uploads/profiles/${latestCars?.[0]?.owner?.avatarUrl}`

  const handleNavigate = (section: string, value: string) => {
    navigate(`/inventory?section=${section}&value=${value}`);
  };

  const getStatusStyles = (status: string) => {
    switch (status?.toLowerCase()) {
      case "sold": return "bg-red-600 text-white";
      case "reserved": return "bg-blue-500 text-white";
      default: return "bg-green-500 text-white";
    }
  };

  return (
    <div className="max__container relative">
      <div className="mt-10">
        <Heading title="latest for" colouredText="sale" classNames="text-center" />

        <div className="mt-10 grid gap-10 xl:grid-cols-2">
          {latestCars.map((car: LatestCar) => (
            <div
              className="group box-border grid max-w-full cursor-pointer gap-4 overflow-hidden rounded-xl border border-transparent hover:border-gray-100 md:grid-cols-12"
              key={car?.carId}
              onClick={() => navigate(`/listings/${car.carId}`)}
            >
              {/* IMAGE SECTION */}
              <div className="relative col-span-1 md:col-span-5 h-56 md:h-full overflow-hidden rounded-lg">
                <div className={`absolute right-2 top-2 z-10 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider shadow-md ${getStatusStyles(car?.status)}`}>
                  {car.status || "Available"}
                </div>
                <img
                  src={car?.image}
                  alt={`${car?.make} ${car?.model}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* CONTENT SECTION */}
              <div className="col-span-1 flex flex-col justify-between py-1 md:col-span-7">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <p className="text-xs uppercase text-gray-400">{car?.make}</p>
                    <p className="text-lg font-bold text-primary leading-tight">{car?.model}</p>
                  </div>
                  <Price price={car?.price} className="scale-90 origin-top-right" />
                </div>

                {/* SPECIFICATIONS */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-[10px] capitalize">
                  <div className="flex items-center gap-2 border-r border-gray-200 pr-2">
                    <FaRoad className="text-yellow" />
                    <div className="flex flex-col">
                      <span className="text-gray-400">Mil</span>
                      <span className="font-bold">{car?.mileage} km</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 border-r border-gray-200 pr-2">
                    <FaGasPump className="text-yellow" />
                    <div className="flex flex-col">
                      <span className="text-gray-400">Fuel</span>
                      <span className="font-bold">{car?.fuelType}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <SiTransmission className="text-yellow" />
                    <div className="flex flex-col">
                      <span className="text-gray-400">Transmission</span>
                      <span className="font-bold">{car?.transmission}</span>
                    </div>
                  </div>
                </div>

                {/* SELLER INFO */}
                <div className="mt-4 flex items-center gap-3 rounded-lg bg-gray-50 p-2">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm">
                    <img
                      src={avatarUrl || "/profile.jpeg"}
                      alt={car.owner?.first_name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-xs">
                    <p className="text-gray-500 font-medium capitalize">
                      Seller: <span className="text-primary font-bold">{car.owner?.first_name} {car.owner?.last_name}</span>
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <a
                        href={`tel:${car.owner?.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-primary shadow-sm transition-transform hover:scale-105"
                      >
                        <BsTelephone size={12} className="text-yellow" />
                        <span>Contact</span>
                      </a>
                      <div className="rounded bg-gray-200 px-1.5 py-0.5 text-[9px] font-bold text-gray-600 uppercase">
                        Stk# {car.stockNumber}
                      </div>
                    </div>
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
            className="font-montserrat bg-yellow px-10 py-3 text-sm uppercase text-white shadow-lg transition-all hover:bg-yellow/80 hover:shadow-yellow/20"
          />
        </div>
      </div>
    </div>
  );
};

export default LatestCars;
