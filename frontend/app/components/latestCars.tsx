import car from "/banner-img.jpg";
import { FaGasPump, FaRoad } from "react-icons/fa";
import { SiTransmission } from "react-icons/si";

import lambo from "/latest_cars/lambo.jpg";
import bently from "/latest_cars/bently.jpg";
import x7 from "/latest_cars/x7.jpg";
import chevy from "/chevy.jpg";
import bmw from "/bmw.jpg";
import acura from "/acura.jpg";

import Divider from "./divider";
import Price from "./price";
import Heading from "./heading";
import { BsTelephone } from "react-icons/bs";

const cars = [
  {
    id: 1,
    make: "new lamborghini",
    img: lambo,
    model: "urus",
    price: "12,500",
    transmission: "automatic",
    engine: "6,2l V8",
    fuelType: "Gas",
    millage: 0,
  },
  {
    id: 2,
    make: "new Bently",
    img: bently,
    model: "flying spur",
    price: "12,500",
    transmission: "automatic",
    engine: "6,2l V8",
    fuelType: "Gas",
    millage: 0,
  },
  {
    id: 3,
    make: "new bmw",
    img: x7,
    model: "X7",
    price: "12,500",
    transmission: "automatic",
    engine: "6,2l V8",
    fuelType: "Gas",
    millage: 0,
  },
  {
    id: 4,
    make: "new chevrolet",
    img: chevy,
    model: "trailblazer",
    price: "12,500",
    transmission: "automatic",
    engine: "6,2l V8",
    fuelType: "Gas",
    millage: 0,
  },
  {
    id: 5,
    make: "certified used bmw",
    model: "m5",
    price: "25,000",
    transmission: "manual",
    engine: "6,2l V8",
    fuelType: "petrol",
    millage: 185000,
    img: bmw,
  },
  {
    id: 6,
    make: "certified used acura",
    model: "ilx",
    price: "13,500",
    transmission: "automatic",
    engine: "6,2l V8",
    fuelType: "Gas",
    millage: 125000,
    img: acura,
  },
  {
    id: 7,
    make: "new chevrolet",
    img: chevy,
    model: "trailblazer",
    price: "12,500",
    transmission: "automatic",
    engine: "6,2l V8",
    fuelType: "Gas",
    millage: 0,
  },
  {
    id: 8,
    make: "certified used bmw",
    model: "m5",
    price: "25,000",
    transmission: "manual",
    engine: "6,2l V8",
    fuelType: "petrol",
    millage: 185000,
    img: bmw,
  },
  // {
  //   id: 9,
  //   make: "certified used acura",
  //   model: "ilx",
  //   price: "13,500",
  //   transmission: "automatic",
  //   engine: "6,2l V8",
  //   fuelType: "Gas",
  //   millage: 125000,
  //   img: acura,
  // },
  // {
  //   id: 10,
  //   make: "new chevrolet",
  //   img: chevy,
  //   model: "trailblazer",
  //   price: "12,500",
  //   transmission: "automatic",
  //   engine: "6,2l V8",
  //   fuelType: "Gas",
  //   millage: 0,
  // },
  // {
  //   id: 11,
  //   make: "certified used bmw",
  //   model: "m5",
  //   price: "25,000",
  //   transmission: "manual",
  //   engine: "6,2l V8",
  //   fuelType: "petrol",
  //   millage: 185000,
  //   img: bmw,
  // },
];

const LatestCars = () => {
  return (
    <div className="max__container">
      <div className="mt-10">
        <Heading
          title="latest for"
          colouredText="sales"
          classNames="text-[24px] text-center"
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
                className="col-span-12 h-full max-w-full md:col-span-5"
              />
              <div className="col-span-12 flex flex-col justify-between gap-2 md:col-span-7">
                <div className="flex justify-between">
                  <label className="latest_car_labels flex flex-col gap-1 text-[28px] lg:gap-0">
                    <p className="">{car.make}</p>
                    <p className="font-semibold text-primary">{car.model}</p>
                  </label>
                  {/* PRICE */}
                  <Price price={car.price} />
                </div>

                {/* DESCRIPTION */}
                <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
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
      </div>
    </div>
  );
};

export default LatestCars;
