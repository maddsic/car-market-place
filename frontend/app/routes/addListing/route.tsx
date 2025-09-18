import React, { useState } from "react";
import {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import { Form, json, useActionData, useNavigation } from "@remix-run/react";

// components
import Divider from "~/components/Divider/divider";
import Heading from "~/components/Heading/heading";
import VinNumber from "~/components/Vin/vin";
import CreateListingDetails from "~/components/listing/listingDetails";
import CreateListingInfo from "./createListingInfo";
import UploadListingImage from "./createListingImage";
import CreateListingSellerNote from "./createListingSellerNode";

// helper functions
import { apiFetch } from "~/utils/apiFetch";

// Libraries
import "react-quill/dist/quill.snow.css";
import CreateListingPrice from "./crreateListingPrice";
import Button from "~/components/Button/button";
import { createListingValidateor } from "~/validations/validateForm";
import { z } from "zod";
import SelectListingFeature from "./createListingFeature";
import Loader from "~/components/Loader/loader";
import { useCarStore } from "~/store/carStore";

interface CarModel {
  id: string;
  name: string;
}

interface CarMake {
  id: string;
  name: string;
  CarModels: CarModel[];
}

const AddListingPage = () => {
  const { carMakes, carBodyTypes } = useCarStore();
  const actionData = useActionData<typeof loader>() || null;
  const [selectedMake, setSelectedMake] = useState<CarMake | null>(null);
  const [models, setModels] = useState<CarModel[]>([]);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // Change model options based on selected make
  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const makeName = e.target.value;
    const make = e.target.name;

    // Check if the changed field is 'make'
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

  // Check if the form is submitting
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
            <CreateListingInfo formData={actionData} />

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
              className="mt-10 w-full border py-4 font-extrabold text-white shadow lg:w-1/4"
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

// LOADER -GETTING LOADER DATA
export const loader: LoaderFunction = async () => {
  const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080";

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
    // Pass form for validation
    let validatedForm = createListingValidateor.parse(formData);
    console.log("Validated Data");
    console.info(validatedForm);

    // Append additional data to the validated form data
    const validatedFormData = {
      ...validatedForm,
      userId: "53389659-64c4-45eb-9490-bf4a3aaca599",
      year: "2023",
    };

    // Post the validated data to the API
    const response = await fetch(`${API_BASE_URL}/api/v1/cars`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFormData),
    });

    // Handle non-2xx responses
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
