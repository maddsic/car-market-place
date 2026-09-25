import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useNavigate, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";

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
import { Car } from "~/interfaces";
import InventoryForm from "./InventoryForm";
import LoadingIndicator from "~/components/Loader/loadingIndicator";
import { Pagination } from "~/components/pagination/pagination";

const InventoryPage = () => {
  const { cars = [] } = useLoaderData<typeof loader>() || {};
  const [carsPerPage, setCarsPerPage] = useState<number>(6);
  const [startIndex, setStartIndex] = useState<number>(0);

  const navigation = useNavigation();
  const navigate = useNavigate();
  const loading = navigation.state === "loading";

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [startIndex])

  const handlePageSelect = (pageNumber: number) => {
    setStartIndex((pageNumber - 1) * carsPerPage)
  }

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

  // Helper for dynamic status badge styling
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
            <InventoryForm />
          </aside>

          {/*  CONTENT */}
          <div className="content sm:col-span-9">
            <Heading title="cars for sale" />
            <Divider classNames="h-[1px] mt-6" />

            <h2 className="mb-6 mt-6 text-xl font-semibold text-yellow">
              {cars.length} Found
            </h2>

            <Divider classNames="h-[1px]" />


            {/* Cars Grid */}
            <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-4 lg:grid-cols-3 items-start">
              {cars && cars.length > 0 ? (
                cars
                  .slice(startIndex, startIndex + carsPerPage)
                  .map((car: Car) => (
                    <div
                      className="group relative flex flex-col justify-between cursor-pointer overflow-hidden rounded-xl bg-white border border-gray-100 p-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                      key={car.carId}
                      onClick={() => handleNavigateToListings(car.carId!)}
                    >
                      {/* TOP SECTION: Image + Details */}
                      <div>
                        {/* IMAGE CONTAINER WITH STRICT LOCKED ASPECT RATIO */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-gray-100">
                          {/* STATUS BADGE */}
                          <div
                            className={`absolute right-3 top-3 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md ${getStatusStyles(
                              car.status
                            )}`}
                          >
                            {car.status || "Available"}
                          </div>

                          {/* IMAGE PINNED ABSOLUTELY */}
                          <Image
                            car={car}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>

                        {/* CARD DETAILS WRAPPER WITH PADDING */}
                        <div className="p-3">
                          <div className="flex items-center justify-between gap-2 transition-colors duration-300 group-hover:text-yellow">
                            <CarMakeAndModel car={car} />
                            <Price price={car.price} className="px-1 py-0 shrink-0" />
                          </div>

                          {/* Description Section */}
                          <div className="mt-2">
                            <CarDescription car={car} />
                          </div>
                        </div>
                      </div>

                      {/* BOTTOM SECTION: Divider */}
                      <hr className="mt-3 border-gray-300 transition-colors duration-300 group-hover:border-yellow" />
                    </div>
                  ))
              ) : (
                <h1 className="capitalize">No Record Found</h1>
              )}
            </div>

            {/* Inventory Page Content */}
            <Pagination
              totalItems={cars.length}
              itemsPerPage={carsPerPage}
              startIndex={startIndex}
              onNext={handleNext}
              onPrev={handlePrev}
              onPageSelect={handlePageSelect}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryPage;

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const API_VERSION = import.meta.env.VITE_API_VERSION || "/api/v1";

// LOADER - FETCHING CAR MAKES
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const section = url.searchParams.get("section");
  const value = url.searchParams.get("value");

  // For filters
  const condition = url.searchParams.get("condition");
  const carType = url.searchParams.get("carType");
  const make = url.searchParams.get("make");
  const model = url.searchParams.get("model");

  try {
    let cars;

    if (condition || carType || make || model) {
      const queryParams = new URLSearchParams();

      if (condition) queryParams.append("condition", condition);
      if (carType) queryParams.append("carType", carType);
      if (make) queryParams.append("make", make);
      if (model) queryParams.append("model", model);

      const results = await apiFetch(
        `${API_BASE_URL}${API_VERSION}/cars/search?${queryParams.toString()}`,
      );
      cars = results.data;
    } else {
      const result = await apiFetch(
        `${API_BASE_URL}${API_VERSION}/cars?section=${section}&value=${value}`,
      );
      cars = result.data;
    }

    return { cars };
  } catch (error) {
    console.error("Error in loader:", error);
    return new Response("Failed to load data", { status: 500 });
  }
};
