import React, { useEffect, useState } from "react";
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
  useNavigate,
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
import { apiEndpoints } from "~/store/apiEndpoints";
import { getAuthToken } from "~/utils/authHelpers";
import { verifyJwtToken } from "~/utils/jwt";
import { toast } from "react-toastify";

const AddListingPage = () => {
  const { carMakes, carBodyTypes } = useLoaderData<typeof loader>() || null;
  const actionData = useActionData<typeof loader>() || null;
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";

  if (actionData) {
    console.log("FORM DATA ERROR FROM ADD LISTING PAGE");
    console.log(actionData);
  }

  useEffect(() => {
    if (actionData?.success) {
      toast.success(
        "Listing created successfully! Redirecting to inventory...",
      );
      setTimeout(() => {
        navigate("/inventory");
      }, 2000);
    }
  }, [actionData, navigate]);

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
          <Form
            action="/addListing"
            method="post"
            encType="multipart/form-data"
          >
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
              title={"Add Listing"}
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

// LOADER -GETTING LOADER DATA
export const loader: LoaderFunction = async () => {
  const endPoints = [
    {
      key: "carMakes",
      url: `${apiEndpoints.carMakes}`,
    },
    {
      key: "carBodyTypes",
      url: `${apiEndpoints.carBodyTypes}`,
    },
  ];

  const result = await Promise.all(endPoints.map(({ url }) => apiFetch(url)));

  return Object.fromEntries(
    result.map((result, index) => [endPoints[index].key, result.data]),
  );
};

// ACTION - HANDLING FORM SUBMISSION
export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();

  const formDataCarImages = formData.getAll("imageUrl") as File[];
  console.log("Form Data Car Images", formDataCarImages);

  // Removing images from form data for validation
  const formDataWithOutImages = Object.fromEntries(
    [...formData].filter(([key, value]) => typeof value === "string"),
  );

  try {
    // Authenticate User
    const token = getAuthToken(request);
    if (!token) {
      return json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // Verify JWT Token
    const payload = verifyJwtToken(token);
    if (!payload) {
      return json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 },
      );
    }

    // Get User ID from payload
    const userId = payload.userId;
    console.log("User ID from AddListing Action", userId);

    // Pass form for validation
    let validatedForm = createListingValidateor.parse({
      ...formDataWithOutImages,
      userId: userId,
      year: "2023",
      imageUrl: formDataCarImages,
    });
    console.log("Validated Data");
    console.info(validatedForm);

    const newValidatedFormData = new FormData();
    // Append non-file fields
    for (const [key, value] of Object.entries(validatedForm)) {
      if (key !== "imageUrl") {
        newValidatedFormData.append(key, value as string);
      }
    }

    // Re-append files
    validatedForm.imageUrl.forEach((file: File) => {
      newValidatedFormData.append("imageUrl", file);
    });

    // Post the validated data to the API
    const response = await fetch(`${apiEndpoints.createCar}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: newValidatedFormData,
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
    return json({ success: true, data: responseData });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.flatten().fieldErrors;
      return json({ errors, values: formData }, { status: 400 });
    }
    console.error("Unexpected error occured", error);
    return json({ error: "Whoops...something went wrong" }, { status: 500 });
  }
}
