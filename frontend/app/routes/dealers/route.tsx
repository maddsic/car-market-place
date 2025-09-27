import Heading from "~/components/Heading/heading";
import { useActionData, useLoaderData } from "@remix-run/react";
import { apiFetch } from "~/utils/apiFetch";
import { LoaderFunction } from "@remix-run/node";
import DealersSearchFilter from "./dealersSearchFilter";
import SubHeading from "~/components/Heading/subheading";
import DisplayDealerInfo from "./displayDealerInfo";
import Divider from "~/components/Divider/divider";

const Dealers = () => {
  const { carMakes, carBodyTypes } = useLoaderData<typeof loader>() || null;
  const actionData = useActionData<typeof loader>() || null;

  if (actionData) {
    console.log("FORM DATA ERROR FROM DEALERS PAGE");
    console.log(actionData);
  }

  return (
    <div className="max__container h-calc(100vh-80px) relative my-10">
      <div className="flex flex-col gap-5 lg:gap-10">
        <Heading
          title="Find Local Dealers"
          classNames="text-primary font-extrabold mb-5 md:mb-0 lg:text-32"
        />

        <DealersSearchFilter carMakes={carMakes} formData={actionData} />

        <SubHeading
          title="Displaying local car dealerships"
          className="text-lg capitalize"
        />

        <Divider />

        <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 flex flex-col gap-5 overflow-y-auto lg:h-[600px]">
          {/* TODO: MAP THROUGH DEALERS API DATA AND RENDER ACCORDINGLY */}
          <DisplayDealerInfo />
          <DisplayDealerInfo />
          <DisplayDealerInfo />
          {/* <DisplayDealerInfo />
          <DisplayDealerInfo /> */}

          {/* TODO: PAGINATION */}
        </div>
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
export const loader: LoaderFunction = async () => {
  const endPoints = [
    {
      key: "carMakes",
      url: `${API_BASE_URL}${API_VERSION}/cars/carmakes`,
    },
    {
      key: "carBodyTypes",
      url: `${API_BASE_URL}${API_VERSION}/cars/bodyType`,
    },
  ];

  const result = await Promise.all(endPoints.map(({ url }) => apiFetch(url)));

  return Object.fromEntries(
    result.map((result, index) => [endPoints[index].key, result.data]),
  );
};
