import Heading from "~/components/Heading/heading";
import { Link, useLoaderData, useNavigation } from "@remix-run/react";
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
import Loader from "~/components/Loader/loader";

interface DealerData {
  username: string;
  address: string;
  phone: string;
  carsCount: number;
  userId: string;
}

const Dealers = () => {
  const { carMakes, dealers, allDealers, query } =
    useLoaderData<typeof loader>() || null;
  const [carsPerPage, setCarsPerPage] = useState<number>(6);
  const [startIndex, setStartIndex] = useState<number>(0);

  // PAGINATE RIGHT
  const handleNext = () => {
    if (startIndex + 1 < dealers.length - carsPerPage + 1) {
      setStartIndex(startIndex + 6);
    }
  };

  // PAGINATE LEFT
  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 6);
    }
  };

  return (
    <div className="max__container h-calc(100vh-80px) relative my-10">
      <div className="flex flex-col gap-5 lg:gap-10">
        <Heading
          title="Find Local Dealers"
          classNames="text-primary font-extrabold mb-5 md:mb-0 lg:text-32"
        />

        <DealersSearchFilter carMakes={carMakes} />

        <SubHeading
          title="Displaying local car dealerships"
          className="text-lg capitalize"
        />

        <Divider />

        <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 flex flex-col gap-5 overflow-y-auto lg:h-[350px]">
          {/* TODO: MAP THROUGH DEALERS API DATA AND RENDER ACCORDINGLY */}
          {dealers && dealers.length > 0
            ? dealers.map((dealer: DealerData, index: number) => (
                <Link
                  to={`/profile/${dealer.userId}?condition=${query.condition || ""}&make=${query.make || ""}&model=${query.model || ""}`}
                >
                  <DisplayDealerInfo key={index} {...dealer} />
                </Link>
              ))
            : null}
          {/* DISPLAY ALL DEALERS IF NO FILTER IS PASSED */}
          {dealers.length === 0 && allDealers && allDealers.length > 0
            ? allDealers.map((dealer: DealerData, index: number) => (
                <Link
                  to={`/profile/${dealer.userId}?condition=${query.condition || ""}&make=${query.make || ""}&model=${query.model || ""}`}
                >
                  <DisplayDealerInfo key={index} {...dealer} />
                </Link>
              ))
            : null}
        </div>

        {/* TODO: PAGINATION */}
        {(dealers && dealers.length > 0) ||
          (allDealers && allDealers.length > 0 && (
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
                carsLength={dealers.length}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dealers;

// BASE URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const API_VERSION = import.meta.env.VITE_API_VERSION || "/api/v1";

// LOADER -GETTING LOADER DATA
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  // GET QUERY PARAMS
  const condition = url.searchParams.get("condition");
  const make = url.searchParams.get("make");
  const model = url.searchParams.get("model");

  // Fetch these data on page load.
  const endPoints = [
    {
      key: "carMakes",
      url: `${apiEndpoints.carMakes}`,
    },
    {
      key: "carBodyTypes",
      url: `${apiEndpoints.carBodyTypes}`,
    },
    {
      key: "allDealers",
      url: `${API_BASE_URL}${API_VERSION}/dealers`,
    },
  ];

  const result = await Promise.all(endPoints.map(({ url }) => apiFetch(url)));
  const make_model_data = Object.fromEntries(
    result.map((result, index) => [endPoints[index].key, result.data]),
  );

  // ONLY FETCH DEALERS IF ANY OF THE FILTERS ARE APPLIED
  try {
    let dealers: DealerData[] = [];

    if (condition || make || model) {
      const searchParams = new URLSearchParams();

      if (condition) searchParams.append("condition", condition);
      if (make) searchParams.append("make", make);
      if (model) searchParams.append("model", model);

      const dealersResult = await apiFetch(
        `${API_BASE_URL}${API_VERSION}/dealers/search-dealers?${searchParams.toString()}`,
      );
      dealers = dealersResult.data || [];
    }

    return {
      ...make_model_data,
      dealers,
      query: { condition, make, model },
    };
  } catch (error) {
    console.error("Error fetching dealers:", error);
    // return an empty dealers array in case of error
    console.error("Error fetching dealers:", error);
    return {
      ...make_model_data,
      dealers: [],
      query: { condition, make, model },
    };
  }
};
