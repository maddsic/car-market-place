// Components
import Heading from "../Heading/heading";
import Button from "../Button/button";
import Divider from "../Divider/divider";
import { useNavigate } from "@remix-run/react";
import Special from "../Special/special";
import { links as loaderLinks } from "../Loader/loader";
import { LinksFunction } from "@remix-run/node";
import Price from "../Price/price";
import CarMakeAndModel from "../CarMakeAndModel/CarMakeAndModel";
import CarDescription from "../CarDescription/CarDescription";
import Image from "../Image/Image";
import { Car } from "~/interfaces";

const PremiumCars = ({ premiumCars }: { premiumCars: [] }) => {
  const navigate = useNavigate();

  const handleNavigate = (section: string, value: string) => {
    navigate(`/inventory?section=${section}&value=${value}`);
  };

  const handleNavigateToListings = (carId: string) => {
    // Navigate to the listing page for the selected car
    navigate(`/listings/${carId}`);
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
        {premiumCars.map((car: Car, i: number) => (
          <div
            className="relative cursor-pointer overflow-clip"
            key={car.carId}
            onClick={() => handleNavigateToListings(car.carId)}
          >
            <Image car={car} />
            <div className="mt-3 flex justify-between">
              <CarMakeAndModel car={car} />
              <Price price={car.price} className="text-[14px]" />
            </div>
            <CarDescription car={car} />
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
