// import icons
import { FaGasPump, FaRoad } from "react-icons/fa";
import { SiTransmission } from "react-icons/si";

// Components
import Heading from "../Heading/heading";
import Button from "../Button/button";
import Divider from "../Divider/divider";
import { useNavigate } from "@remix-run/react";
import Special from "../Special/special";
import Loader, { links as loaderLinks } from "../Loader/loader";
import { LinksFunction } from "@remix-run/node";
import Price from "../Price/price";
import { handleNavigateToListings } from "~/utils/handleNavigate";

const PremiumCars = ({ premiumCars }) => {
  const navigate = useNavigate();

  const handleNavigate = (section: string, value: string) => {
    navigate(`/inventory?section=${section}&value=${value}`);
  };

  return (
    <div className="max__container relative">
      {/* SECTION TITLE */}

      <Heading
        title="Latest Premium"
        colouredText="Cars"
        classNames="text-center"
      />

      <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {premiumCars.map((car: any, i: number) => (
          <div
            className="relative cursor-pointer overflow-clip"
            key={car.carId}
            onClick={() => handleNavigateToListings(car.carId)}
          >
            {/* IMAGE */}
            <img
              src={car.imageUrl}
              alt={car.model}
              className="max-h-[70%] w-full"
            />

            {/* TITLE */}
            <div className="mt-3 flex justify-between">
              <label className="labels flex flex-col">
                <p className="">{car.make}</p>
                <p className="font-semibold text-primary">{car.model}</p>
              </label>

              {/* PRICE */}
              <Price price={car.price} className="text-[14px]" />
            </div>

            {/* DESCRIPTION */}
            <div className="mt-4 flex items-center gap-4 text-xs md:flex">
              <span className="flex items-center gap-1 text-muted-foreground">
                <FaRoad />
                <span>{car.millage}</span>
                <span>{car.mileage}</span>
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

            <Special />

            <hr className="mt-3 border-gray-300" />
          </div>
        ))}
      </div>

      {/* BUTTON */}
      <div
        className="relative mt-5 flex w-full items-center justify-center shadow-sm lg:mt-10"
        onClick={() => handleNavigate("premium", "all")}
      >
        <Button
          title="show all premium cars"
          classNames="disabled:cursor-not-allowed disabled:bg-primary uppercase bg-yellow hover:bg-yellow/70 animate duration-1000 ease-in-out font-montserrat shadow-md text-white px-10 py-3 text-sm"
        />
      </div>

      <Divider classNames="md:mb-10 mt-8" />
    </div>
  );
};

export default PremiumCars;

export const links: LinksFunction = () => [...loaderLinks()];
