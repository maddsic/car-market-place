import { FaGasPump, FaRoad } from "react-icons/fa";
import { SiTransmission } from "react-icons/si";

import { BsTelephone } from "react-icons/bs";
import { cars } from "~/data/latestcars";
import Heading from "../Header/heading";
import Price from "../Price/price";
import Button from "../Button/button";
import { useNavigate } from "@remix-run/react";

const LatestCars = () => {
  const navigate = useNavigate();

  const handleNavigate = (section: string, value: string) => {
    navigate(`/inventory?section=${section}&value=${value}`);
  };
  return (
    <div className="max__container">
      <div className="mt-10">
        <Heading
          title="latest for"
          colouredText="sale"
          classNames="text-center"
        />
        <div className="mt-10 grid gap-10 xl:grid-cols-2">
          {cars.map((car, i) => (
            <div
              className="box-border grid max-w-full gap-3 overflow-hidden md:grid-cols-12"
              key={i}
            >
              <img
                src={car.img}
                alt={car.model}
                className="col-span-1 h-auto max-w-full md:col-span-5"
              />
              <div className="ccol-span-1 flex flex-col justify-between gap-2 md:col-span-7">
                <div className="flex justify-between">
                  <label className="latest_car_labels flex flex-col gap-1 lg:gap-0">
                    <p className="">{car.make}</p>
                    <p className="font-semibold text-primary">{car.model}</p>
                  </label>
                  {/* PRICE */}
                  <Price price={car.price} />
                </div>

                {/* DESCRIPTION */}
                <div className="mt-4 grid grid-cols-3 gap-4 text-xs capitalize">
                  <span className="flex gap-2 border-r-2">
                    <FaRoad />
                    <div className="flex flex-col">
                      <span className="uppercase text-muted-foreground">
                        Mileage
                      </span>
                      <div className="flex gap-1 text-xs text-black">
                        <span className="font-extrabold">{car.millage}</span>
                        <span>mi</span>
                      </div>
                    </div>
                  </span>
                  <span className="flex gap-2 border-r-2">
                    <FaGasPump />
                    <div className="flex flex-col">
                      <span className="uppercase text-muted-foreground">
                        fueltype
                      </span>
                      <span className="font-extrabold">{car.fuelType}</span>
                    </div>
                  </span>

                  <span className="flex gap-2">
                    <SiTransmission />
                    <div className="flex flex-col">
                      <span className="uppercase text-muted-foreground">
                        transmission
                      </span>
                      <span className="font-extrabold capitalize">
                        {car.transmission}
                      </span>
                    </div>
                  </span>
                </div>

                {/* personal info */}
                <div className="wrapper flex items-center gap-2">
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <img
                      src="/profile.jpeg"
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="w-full text-sm">
                    <span className="text-gray-500">Personal Seller:</span>
                    <span className="text-sm text-yellow">Shabri Alexis</span>
                    <span className="flex w-full items-center justify-between gap-4">
                      <div className="flex gap-1 text-xs md:gap-2">
                        <span className="font-bold text-yellow">
                          <BsTelephone />
                        </span>
                        <a
                          href="tel:+1 1234567890 "
                          className="text-xs text-btn"
                        >
                          (512) 999-9999
                        </a>
                      </div>
                      <div className="flex gap-1 rounded-sm bg-muted-foreground p-1 text-xs text-white">
                        <span className="text-[10px] capitalize md:text-xs">
                          stock#
                        </span>
                        <span className="text-[10px] md:text-xs">2274HG76</span>
                      </div>
                    </span>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <div
          className="relative mt-5 flex w-full items-center justify-center shadow-sm lg:mt-10"
          onClick={() => handleNavigate("latest", "all")}
        >
          <Button
            title="show all latest cars"
            classNames="uppercase bg-yellow hover:bg-yellow/70 animate duration-1000 ease-in-out font-montserrat shadow-md text-white px-10 py-3 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default LatestCars;
