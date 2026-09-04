import Heading from "~/components/Heading/heading";
import { useLoaderData } from "@remix-run/react";
import { apiFetch } from "~/utils/apiFetch";
import { LoaderFunction } from "@remix-run/node";
import DealersSearchFilter from "./dealersSearchFilter";
import SubHeading from "~/components/Heading/subheading";
import DisplayDealerInfo from "./displayDealerInfo";
import Divider from "~/components/Divider/divider";
import PrevButton from "~/components/PaginationLeft/prev";
import NextButton from "~/components/PaginationRight/next";
import { useState } from "react";
import { apiEndpoints } from "~/store/apiEndpoints";

interface DealerData {
  userId: string;
  username: string;
  address: string;
  phone: string;
  carsCount: number;
}

const Dealers = () => {
  // Add fallback defaults (= []) so dropdowns never break on refresh
  const { carMakes = [], carBodyTypes = [], dealers = [], query = {}, hasFilters = false } =
    useLoaderData<typeof loader>() || {};

  console.log("dealers", dealers);

  const [carsPerPage, setCarsPerPage] = useState<number>(6);
  const [startIndex, setStartIndex] = useState<number>(0);

  // PAGINATE RIGHT
  const handleNext = () => {
    if (startIndex + 1 < dealers.length - carsPerPage + 1) {
      setStartIndex((prev) => prev + 6);
    }
  };

  // PAGINATE LEFT
  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 6);
    }
  };

  return (
    <div className="max__container h-calc(100vh-80px) relative my-10">
      <div className="flex flex-col gap-5 lg:gap-10">
        <Heading
          title="Find Local Dealers"
          classNames="text-primary font-extrabold mb-5 md:mb-0"
        />
        <DealersSearchFilter carMakes={carMakes} />

        <SubHeading
          title={hasFilters ? "Search Results" : "Displaying local car dealerships"}
          className="text-lg capitalize text-primary md:text-xl"
        />
        <Divider />

        {/* DEALERS LIST */}
        <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 flex flex-col gap-5 overflow-y-auto lg:h-[350px]">
          {dealers && dealers.length > 0 ? (
            dealers.map((dealer: DealerData, index: number) => (
              <DisplayDealerInfo key={dealer.userId || index} {...dealer} query={query} />
            ))
          ) : (
            /* Clear feedback when a search returns 0 results */
            <p className="py-8 text-center text-gray-500">
              No dealers found with cars matching your search criteria.
            </p>
          )}
        </div>

        {/* PAGINATION */}
        {dealers && dealers.length > 0 && (
          <div className="mt-10 flex items-center justify-between">
            <PrevButton startIndex={startIndex} handlePrev={handlePrev} />

            <div className="flex items-center gap-2">
              <span className="rounded bg-gray-200 px-4 py-1 text-white">1</span>
              <span className="rounded bg-yellow px-4 py-1 text-white">2</span>
              <span className="rounded bg-yellow px-4 py-1 text-white">3</span>
            </div>

            <NextButton
              handleNext={handleNext}
              startIndex={startIndex}
              carsPerPage={carsPerPage}
              carsLength={dealers.length}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dealers;

// BASE URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const API_VERSION = import.meta.env.VITE_API_VERSION || "/api/v1";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  // 1. Extract query params and trim whitespace
  const condition = url.searchParams.get("condition")?.trim() || "";
  const make = url.searchParams.get("make")?.trim() || "";
  const model = url.searchParams.get("model")?.trim() || "";

  const hasFilters = Boolean(condition || make || model);

  // 2. Always fetch static dropdown metadata first
  const endPoints = [
    { key: "carMakes", url: `${apiEndpoints.carMakes}` },
    { key: "carBodyTypes", url: `${apiEndpoints.carBodyTypes}` },
  ];

  try {
    const result = await Promise.all(endPoints.map(({ url }) => apiFetch(url)));
    const staticData = Object.fromEntries(
      result.map((res, index) => [endPoints[index].key, res.data])
    );

    let dealers: DealerData[] = [];

    // 3. Conditionally fetch filtered or default dealers
    if (hasFilters) {
      const searchParams = new URLSearchParams();
      if (condition) searchParams.append("condition", condition);
      if (make) searchParams.append("make", make);
      if (model) searchParams.append("model", model);

      const dealersResult = await apiFetch(
        `${API_BASE_URL}${API_VERSION}/dealers?${searchParams.toString()}`
      );
      dealers = dealersResult.data || [];
    } else {
      const dealersResult = await apiFetch(`${apiEndpoints.allDealers}`);
      dealers = dealersResult.data || [];
    }

    // 4. Return both static dropdown data and dealers
    return {
      carMakes: staticData.carMakes || [],
      carBodyTypes: staticData.carBodyTypes || [],
      dealers,
      hasFilters,
      query: { condition, make, model },
    };
  } catch (error) {
    console.error("Error in dealers loader:", error);

    // EVEN ON ERROR: Always return empty arrays for dropdowns so React doesn't break
    return {
      carMakes: [],
      carBodyTypes: [],
      dealers: [],
      hasFilters: false,
      query: { condition, make, model },
    };
  }
};
