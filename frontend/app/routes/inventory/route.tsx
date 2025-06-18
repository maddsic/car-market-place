import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useNavigate, useNavigation } from "@remix-run/react";
import { useState } from "react";

// Components
import Divider from "~/components/Divider/divider";
import Heading from "~/components/Heading/heading";
import NextButton from "~/components/PaginationRight/next";
import PrevButton from "~/components/PaginationLeft/prev";

// Icons
import { IoCarSportOutline } from "react-icons/io5";

import Special from "~/components/Special/special";
import { apiFetch } from "~/utils/apiFetch";
import Price from "~/components/Price/price";
import CarMakeAndModel from "~/components/CarMakeAndModel/CarMakeAndModel";
import CarDescription from "~/components/CarDescription/CarDescription";
import Image from "~/components/Image/Image";
import { Car, CarMake, CarModel } from "~/interfaces";
import InventoryForm from "./InventoryForm";
import LoadingIndicator from "~/components/Loader/loadingIndicator";

const API_BASE_URL = process.env.API_BASE_URL;

// LOADER - FETCHING CAR MAKES
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const section = url.searchParams.get("section");
  const value = url.searchParams.get("value");
  const token = request.headers.get("Cookie")?.split("refreshToken=")?.[1];

  try {
    const carData = await apiFetch(
      `${API_BASE_URL}/api/v1/cars?section=${section}&value=${value}`,
    );

    let carMakes = await apiFetch(`${API_BASE_URL}/api/v1/cars/carmakes`);

    return { carMakes: carMakes.data, cars: carData.data };
  } catch (error) {
    console.error("Error in loader:", error);
    return new Response("Failed to load data", { status: 500 });
  }
};

const InventoryPage = () => {
  const [carsPerPage, setCarsPerPage] = useState<number>(6);
  const { carMakes = [], cars = [] } = useLoaderData<typeof loader>() || {};
  const [models, setModels] = useState<CarModel[]>([]);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [selectedMake, setSelectedMake] = useState<CarMake | null>(null);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
  });
  const navigation = useNavigation();
  const navigate = useNavigate();

  const loading = navigation.state === "loading";

  const handleNavigateToListings = (carId: string) => {
    navigate(`/listings/${carId}`);
  };

  // PAGINATE RIGHT
  const handleNext = () => {
    if (startIndex + 1 < cars.length - carsPerPage + 1) {
      setStartIndex(startIndex + 6);
    }
  };

  // PAGINATE LEFT
  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 6);
    }
  };

  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const makeId = e.target.value;
    const foundMake = carMakes.find((make: any) => make.id === makeId);

    if (foundMake) {
      setSelectedMake(foundMake);
      setModels(foundMake.CarModels || []);
    }
  };

  return (
    <>
      <LoadingIndicator isLoading={loading} />

      <div className="max__container relative mb-20">
        <div className="mt-14 grid-cols-12 gap-5 sm:grid">
          {/* SIDEBAR */}
          <aside className="sidebar col-span-3 mb-10 max-h-[650px] bg-white shadow-md shadow-gray-500 lg:shadow-xl">
            <div className="max-auto flex w-full items-center justify-center gap-4 bg-gray-900 px-2 py-6 text-white">
              <IoCarSportOutline size={30} className="text-extrabold" />
              <span className="font-bold capitalize">search options</span>
            </div>

            {/* FORM */}
            <InventoryForm
              onChange={handleMakeChange}
              carMakes={carMakes}
              models={models}
            />
          </aside>

          {/*  CONTENT */}
          <div className="content sm:col-span-9">
            <Heading title="cars for sale" />
            <Divider classNames="h-[1px] mt-6" />

            <h2 className="mb-6 mt-6 text-xl font-semibold text-yellow">
              {cars.length} Found
            </h2>

            <Divider classNames="h-[1px]" />

            {/* Cars */}
            <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
              {cars && cars.length > 0 ? (
                cars
                  .slice(startIndex, startIndex + carsPerPage)
                  .map((car: Car) => (
                    <div
                      className="relative cursor-pointer overflow-clip"
                      key={car.carId}
                      onClick={() => handleNavigateToListings(car.carId!)}
                    >
                      {/* CAR IMAGE */}
                      <Image car={car} className="max-h-[70%] lg:h-full" />
                      {/*CAR TITLE */}
                      <div className="mt-3 flex justify-between">
                        <CarMakeAndModel car={car} />
                        {/* CAR PRICE */}
                        <Price price={car.price} className="text-[14px]" />
                      </div>
                      {/* CAR DESCRIPTION */}
                      <CarDescription car={car} />
                      <Special />
                      <hr className="mt-3 border-gray-300" />
                    </div>
                  ))
              ) : (
                <h1 className="capitalize">No Record Found </h1>
              )}
            </div>

            {/* TODO: PAGINATION */}
            {cars && cars.length > 0 && (
              <div className="mt-10 flex items-center justify-between">
                {/* PREV BUTTON */}
                <PrevButton startIndex={startIndex} handlePrev={handlePrev} />

                {/* PAGINATION PAGE NUMBERS */}
                <div className="flex items-center gap-2">
                  <span className="rounded bg-gray-200 px-4 py-1 text-white">
                    1
                  </span>
                  <span className="rounded bg-yellow px-4 py-1 text-white">
                    2
                  </span>
                  <span className="rounded bg-yellow px-4 py-1 text-white">
                    3
                  </span>
                </div>

                {/* NEXT BUTTON */}
                <NextButton
                  handleNext={handleNext}
                  startIndex={startIndex}
                  carsPerPage={carsPerPage}
                  carsLength={cars.length}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryPage;
