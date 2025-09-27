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
import CreateListingInfo from "./createListingInfo";
import UploadListingImage from "./createListingImage";
import CreateListingSellerNote from "./createListingSellerNode";

// helper functions
import { apiFetch } from "~/utils/apiFetch";

// Libraries
import "react-quill/dist/quill.snow.css";
import CreateListingPrice from "./crreateListingPrice";
import Button from "~/components/Button/button";
import { z } from "zod";
import SelectListingFeature from "./createListingFeature";
import Loader from "~/components/Loader/loader";
import { createListingValidateor } from "~/validations/validateForm";
import CreateListingSearchFilter from "~/components/listing/listingSearchFilter";
import { PlusCircle } from "lucide-react";

const AddListingPage = () => {
  const { carMakes, carBodyTypes } = useLoaderData<typeof loader>() || null;
  const actionData = useActionData<typeof loader>() || null;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  if (actionData) {
    console.log("FORM DATA ERROR FROM ADD LISTING PAGE");
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
            <CreateListingSearchFilter
              carMakes={carMakes}
              formData={actionData}
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
              className="mt-10 w-full border py-4 font-extrabold text-white shadow lg:w-1/4"
              icon={<PlusCircle />}
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
