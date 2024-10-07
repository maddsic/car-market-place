import car from "/banner-img.jpg";
// import icons
import { FaGasPump, FaRoad } from "react-icons/fa";
import { SiTransmission } from "react-icons/si";

// import cars
import chevy from "/chevy.jpg";
import bmw from "/bmw.jpg";
import acura from "/acura.jpg";
import lambo from "/latest_cars/lambo.jpg";

// Components
import Button from "./button";
import Divider from "./divider";
import Heading from "./heading";

const cars = [
  {
    id: 1,
    make: "new chevrolet",
    img: chevy,
    model: "trailblazer",
    price: "12,500",
    transmission: "automatic",
    fuelType: "Gas",
    millage: 0,
  },
  {
    id: 2,
    make: "certified used bmw",
    model: "m5",
    price: "25,000",
    transmission: "manual",
    fuelType: "petrol",
    millage: 185000,
    img: bmw,
  },
  {
    id: 3,
    make: "certified used acura",
    model: "ilx",
    price: "13,500",
    transmission: "automatic",
    fuelType: "Gas",
    millage: 125000,
    img: acura,
  },
];

const PremiumCars = () => {
  return (
    <div className="max__container">
      {/* SECTION TITLE */}

      <Heading
        title="Latest Premium"
        colouredText="Cars"
        classNames="text-center"
      />

      <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {cars.map((car) => (
          <div className="relative overflow-clip">
            {/* IMAGE */}
            <img src={car.img} alt={car.model} className="max-h-[70%] w-full" />

            {/* TITLE */}
            <div className="mt-3 flex justify-between">
              <label className="labels flex flex-col">
                <p className="">{car.make}</p>
                <p className="font-semibold text-primary">{car.model}</p>
              </label>

              {/* PRICE */}
              <span className="clip-path font-montserrat relative flex items-center bg-yellow px-5 py-0 text-[14px] font-extrabold text-white">
                ${car.price}
              </span>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-4 flex items-center gap-4 text-xs md:flex">
              <span className="flex items-center gap-1 text-muted-foreground">
                <FaRoad />
                <span>{car.millage}</span>
                <span>mi</span>
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <FaGasPump />
                <span>{car.fuelType}</span>
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <SiTransmission />
                <span>{car.transmission}</span>
              </span>
            </div>

            <span className="rotate-diagonal z-999 font-montserrat absolute -left-5 top-4 bg-yellow px-12 py-2 text-xs font-semibold uppercase text-white">
              special
            </span>

            <hr className="mt-3 border-gray-300" />
          </div>
        ))}
      </div>

      {/* BUTTON */}
      <div className="relative mt-5 flex w-full items-center justify-center shadow-sm lg:mt-10">
        <Button
          title="show all premium cars"
          classNames="uppercase bg-yellow hover:bg-yellow/70 animate duration-1000 ease-in-out font-montserrat shadow-md text-white px-10 py-3 text-sm"
        />
      </div>

      <Divider classNames="md:mb-10 mt-8" />
    </div>
  );
};

export default PremiumCars;
