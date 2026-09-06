import { json, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate, useNavigation } from "@remix-run/react";
import { useState } from "react";

// Components
import Divider from "~/components/Divider/divider";
import Heading from "~/components/Heading/heading";
import NextButton from "~/components/PaginationRight/next";
import PrevButton from "~/components/PaginationLeft/prev";
import Price from "~/components/Price/price";
import CarMakeAndModel from "~/components/CarMakeAndModel/CarMakeAndModel";
import CarDescription from "~/components/CarDescription/CarDescription";
import Image from "~/components/Image/Image";
import LoadingIndicator from "~/components/Loader/loadingIndicator";
// import InventoryForm from "./InventoryForm";

// Icons
import { IoCarSportOutline } from "react-icons/io5";

// Helpers & Interfaces
import { apiFetch } from "~/utils/apiFetch";
import { apiEndpoints } from "~/store/apiEndpoints";
import { Car } from "~/interfaces";
import InventoryForm from "../inventory/InventoryForm";

const RentalsPage = () => {
  const { cars = [] } = useLoaderData<typeof loader>() || {};
  const [carsPerPage] = useState<number>(6);
  const [startIndex, setStartIndex] = useState<number>(0);

  const navigation = useNavigation();
  const navigate = useNavigate();
  const loading = navigation.state === "loading";

  const handleNavigateToListings = (carId: string) => {
    navigate(`/listings/${carId}`);
  };

  // Status badge style helper
  const getStatusStyles = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "sold":
        return "bg-red-500/90 text-white backdrop-blur-md";
      case "reserved":
        return "bg-amber-500/90 text-white backdrop-blur-md";
      case "pending":
        return "bg-orange-500/90 text-white backdrop-blur-md";
      default:
        return "bg-emerald-500/90 text-white backdrop-blur-md";
    }
  };

  // Pagination handlers
  const handleNext = () => {
    if (startIndex + carsPerPage < cars.length) {
      setStartIndex((prev) => prev + carsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => Math.max(0, prev - carsPerPage));
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
              <span className="font-bold capitalize">rental options</span>
            </div>

            {/* SEARCH FORM */}
            <InventoryForm />
          </aside>

          {/* CONTENT */}
          <div className="content sm:col-span-9">
            <Heading title="cars for rent" />
            <Divider classNames="h-[1px] mt-6" />

            <h2 className="mb-6 mt-6 text-xl font-semibold text-yellow">
              {cars.length} Found
            </h2>

            <Divider classNames="h-[1px]" />

            {/* CARS GRID */}
            <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
              {cars && cars.length > 0 ? (
                cars
                  .slice(startIndex, startIndex + carsPerPage)
                  .map((car: Car & { pricePerDay?: number | string }) => (
                    <div
                      className="group relative cursor-pointer overflow-clip rounded-xl p-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                      key={car.carId}
                      onClick={() => handleNavigateToListings(car.carId!)}
                    >
                      {/* IMAGE CONTAINER WITH STATUS & RENTAL BADGE */}
                      <div className="relative overflow-hidden rounded-lg">
                        {/* FOR RENT BADGE */}
                        <div className="absolute left-3 top-3 z-10 rounded-full bg-red-600 px-3 py-1 text-[10px] font-bold uppercase text-white shadow-md">
                          For Rent
                        </div>

                        {/* STATUS BADGE */}
                        <div
                          className={`absolute right-3 top-3 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md ${getStatusStyles(
                            car.status
                          )}`}
                        >
                          {car.status || "Available"}
                        </div>

                        <Image
                          car={car}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>

                      {/* CARD DETAILS */}
                      <div className="mt-3 flex items-center justify-between transition-colors duration-300 group-hover:text-yellow">
                        <CarMakeAndModel car={car} />

                        {/* RENTAL PRICE DISPLAY */}
                        <div className="flex items-baseline gap-1">
                          <Price
                            price={car.pricePerDay || car.price}
                            className=""
                          />
                          <span className="text-xs font-semibold text-gray-500">/day</span>
                        </div>
                      </div>

                      <CarDescription car={car} />
                      <hr className="mt-3 border-gray-300 transition-colors duration-300 group-hover:border-yellow" />
                    </div>
                  ))
              ) : (
                <h1 className="capitalize">No Record Found</h1>
              )}
            </div>

            {/* PAGINATION */}
            {cars && cars.length > 0 && (
              <div className="mt-10 flex items-center justify-between">
                {/* PREV BUTTON */}
                <PrevButton startIndex={startIndex} handlePrev={handlePrev} />

                {/* PAGINATION INDICATOR */}
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                  Page {Math.floor(startIndex / carsPerPage) + 1} of{" "}
                  {Math.ceil(cars.length / carsPerPage)}
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

export default RentalsPage;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION || "/api/v1";


export const loader: LoaderFunction = async () => {
  try {
    const response = await apiFetch(`${API_BASE_URL}${API_VERSION}/cars/rental-cars`);
    return { cars: response?.data || [] };
  } catch (error) {
    console.error("Error loading rental cars:", error);
    return { cars: [] };
  }
};
