import React, { useState } from "react";
import {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import {
  Form,
  json,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";

// components
import Divider from "~/components/Divider/divider";
import Heading from "~/components/Heading/heading";
import VinNumber from "~/components/Vin/vin";
import CreateListingDetails from "~/components/listing/listingDetails";
import CreateListingInfo from "./createListingInfo";
import CreateListingFeature from "./createListingFeature";
import UploadListingImage from "./createListingImage";
import CreateListingSellerNote from "./createListingSellerNode";

// helper functions
import { apiFetch } from "~/utils/apiFetch";

// Libraries
import "react-quill/dist/quill.snow.css";
import CreateListingPrice from "./crreateListingPrice";
import Button from "~/components/Button/button";
import { createListingValidateor } from "~/utils/validateForm";
import { z } from "zod";
import SelectListingFeature from "./createListingFeature";
import Loader from "~/components/Loader/loader";

interface CarModel {
  id: string;
  name: string;
}

interface CarMake {
  id: string;
  name: string;
  CarModels: CarModel[];
}

interface CarBodyTypes {
  typeId: string;
  typeName: string;
}

const AddListingPage = () => {
  const { carMakes, carBodyTypes } = useLoaderData<typeof loader>() || null;
  const actionData = useActionData<typeof loader>() || null;
  const [selectedMAke, setSelectedMake] = useState<CarMake | null>(null);
  const [models, setModels] = useState<CarModel[]>([]);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
  });

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const makeName = e.target.value;
    const make = e.target.name;

    if (e.target.name === make) {
      const foundMake = carMakes.find(
        (make: CarMake) => make.name === makeName,
      );
      if (foundMake) {
        setSelectedMake(foundMake);
        setModels(foundMake.CarModels || []);
      }
    }
  };

  if (actionData) {
    console.log("FORM DATA ERROR");
    console.log(actionData);
  }

  if (isSubmitting) {
    return <Loader />;
  }

  return (
    <div className="max__container relative">
      <div className="flex flex-col gap-5 p-5 py-10 lg:my-5 lg:gap-10">
        <div className="vin__number">
          <Divider />
          <VinNumber />
          <Divider />
        </div>

        {/* Listing Items Details */}
        <div className="listing__details">
          <Heading
            title="Listing item details"
            classNames="uppercase  mb-5 md:mb-10 lg:text-md"
          />
          {/* FORM */}
          <Form action="/addListing" method="post">
            <CreateListingDetails
              carMakes={carMakes}
              models={models}
              formData={actionData}
              onMakeChange={handleMakeChange}
            />
            {/* CAR DETAILS */}
            <CreateListingInfo
              carBodyTypes={carBodyTypes}
              formData={actionData}
            />

            {/* SEPARATOR */}
            <Divider classNames="mt-10" />

            {/* LISTING FEATURES */}
            <SelectListingFeature />

            {/* SEPARATOR */}
            <Divider classNames="mt-10" />

            {/* UPLOAD */}
            <UploadListingImage />

            {/* SEPARATOR */}
            <Divider classNames="mt-10" />

            {/* SELLERS NOTES */}
            <CreateListingSellerNote />

            <Divider classNames="mt-20" />

            {/* ASKING PRICE */}
            <CreateListingPrice />

            {/* SEPARATOR */}
            <Divider classNames="mt-10" />

            <Button
              type="submit"
              disabled={isSubmitting}
              title={isSubmitting ? <Loader /> : "Add Listing"}
              classNames="mt-10 w-full py-4 font-extrabold lg:w-1/4 border text-white shadow"
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddListingPage;

// STYLES
export const lisks: LinksFunction = () => [
  { rel: "stylesheet", href: "react-quill/dist/quill.snow.css" },
];

// BASE URL
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080";

// LOADER -GETTING LOADER DATA
export const loader: LoaderFunction = async () => {
  const endPoints = [
    { key: "carMakes", url: `${API_BASE_URL}/api/v1/cars/carmakes` },
    { key: "carBodyTypes", url: `${API_BASE_URL}/api/v1/cars/bodyType` },
  ];

  const result = await Promise.all(endPoints.map(({ url }) => apiFetch(url)));

  return Object.fromEntries(
    result.map((result, index) => [endPoints[index].key, result.data]),
  );
};

// ACTION - HANDLING FORM SUBMISSION
export async function action({ request }: ActionFunctionArgs) {
  let form = await request.formData();
  let formData = Object.fromEntries(form);

  try {
    let validatedForm = createListingValidateor.parse(formData);
    console.log("Validated Data");
    console.info(validatedForm);

    const validatedFormData = {
      ...validatedForm,
      userId: "53389659-64c4-45eb-9490-bf4a3aaca599",
      year: "2023",
    };

    const response = await fetch(`${API_BASE_URL}/api/v1/cars`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFormData),
    });

    if (!response.ok) {
      let formError = await response.json();
      return json(
        {
          error: true,
          message:
            formError.message || `Failed to create car: ${response.statusText}`,
        },
        {
          status: response.status,
        },
      );
    }

    // Getting the response data
    const responseData = await response.json();

    // Return data.
    return json({ message: "success", data: responseData });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.flatten().fieldErrors;
      return json({ errors, values: formData }, { status: 400 });
    }
    console.error("Unexpected error occured", error);
    return json({ error: "Whoops...something went wrong" }, { status: 500 });
  }
}
