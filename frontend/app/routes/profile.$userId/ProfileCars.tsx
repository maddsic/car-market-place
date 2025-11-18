import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import CarDescription from "~/components/CarDescription/CarDescription";
import CarMakeAndModel from "~/components/CarMakeAndModel/CarMakeAndModel";
import Image from "~/components/Image/Image";
import PrevButton from "~/components/PaginationLeft/prev";
import NextButton from "~/components/PaginationRight/next";
import Price from "~/components/Price/price";
import { Car } from "~/interfaces";

export const ProfileCars = ({
  userCars,
  dealerFilteredCars,
}: {
  userCars: any;
  dealerFilteredCars: any;
}) => {
  const navigation = useNavigate();
  const [startIndex, setStartIndex] = useState<number>(0);
  const [carsPerPage, setCarsPerPage] = useState<number>(9);
  const isUserCarsAvailable = userCars && userCars.length > 0;
  const isDealerFilteredCarsAvailable =
    dealerFilteredCars && dealerFilteredCars.length > 0;

  // PAGINATE RIGHT
  const handleNext = () => {
    if (startIndex + 1 < userCars.length - carsPerPage + 1) {
      setStartIndex(startIndex + 9);
    }
  };

  // PAGINATE LEFT
  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 9);
    }
  };

  return (
    <>
      <div className="mt-2 grid gap-8 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-10">
        {isUserCarsAvailable
          ? userCars
              .slice(startIndex, startIndex + carsPerPage)
              .map((car: Car) => (
                <div
                  className="relative cursor-pointer overflow-clip overflow-y-hidden"
                  key={car.carId}
                  onClick={() => navigation(`/listings/${car.carId}`)}
                >
                  <Image
                    car={car}
                    className="max-h-[70%] w-full border border-gray-100 shadow-md md:h-full lg:border-none"
                  />
                  <div className="mt-3 flex justify-between">
                    <CarMakeAndModel car={car} />
                    <Price price={car.price} className="text-[14px]" />
                  </div>
                  <CarDescription car={car} />
                  {/* <Special /> */}
                  <hr className="mt-3 border-gray-300" />
                </div>
              ))
          : isDealerFilteredCarsAvailable
            ? dealerFilteredCars
                .slice(startIndex, startIndex + carsPerPage)
                .map((car: Car) => (
                  <div
                    className="relative cursor-pointer overflow-clip overflow-y-hidden"
                    key={car.carId}
                    onClick={() => navigation(`/listings/${car.carId}`)}
                  >
                    <Image
                      car={car}
                      className="max-h-[70%] w-full border border-gray-100 shadow-md md:h-full lg:border-none"
                    />
                    <div className="mt-3 flex justify-between">
                      <CarMakeAndModel car={car} />
                      <Price price={car.price} className="text-[14px]" />
                    </div>
                    <CarDescription car={car} />
                    {/* <Special /> */}
                    <hr className="mt-3 border-gray-300" />
                  </div>
                ))
            : null}
        <hr />
      </div>
      {isUserCarsAvailable && (
        <div className="mt-10 flex items-center justify-between">
          <PrevButton startIndex={startIndex} handlePrev={handlePrev} />
          {/* PAGINATION PAGE NUMBERS */}
          <div className="flex items-center gap-2">
            <span className="rounded bg-gray-200 px-4 py-1 text-white">1</span>
            <span className="rounded bg-yellow px-4 py-1 text-white">2</span>
            <span className="rounded bg-yellow px-4 py-1 text-white">3</span>
          </div>
          <NextButton
            handleNext={handleNext}
            startIndex={startIndex}
            carsPerPage={carsPerPage}
            carsLength={userCars.length}
          />
        </div>
      )}
    </>
  );
};
