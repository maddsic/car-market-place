import React, { useEffect } from "react";
import {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import {
  Form,
  json,
  redirect,
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
import CreateListingConditionMakeModelPrice from "~/components/listing/createListingMakeModelPrice";
import CreateListingPrice from "./crreateListingPrice";
import Button from "~/components/Button/button";
import SelectListingFeature from "./createListingFeature";
import Loader from "~/components/Loader/loader";

// helper functions
import { apiFetch } from "~/utils/apiFetch";
import { apiEndpoints } from "~/store/apiEndpoints";
import { getAuthToken } from "~/utils/authHelpers";
import { verifyJwtToken } from "~/utils/jwt";

// Libraries
import "react-quill/dist/quill.snow.css";
import { z } from "zod";
import { PlusCircle } from "lucide-react";
import { toast } from "react-toastify";
import { createListingValidateor } from "~/validations/validateForm";


const AddListingPage = () => {
  const { carMakes, carBodyTypes, editCar } = useLoaderData<typeof loader>() || null;
  const actionData = useActionData<typeof loader>() || null;
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";

  console.log("EDIT CARS", editCar)

  if (actionData) {
    console.log("FORM DATA ERROR FROM ADD LISTING PAGE");
    console.log(actionData);
  }

  useEffect(() => {
    if (actionData?.success) {
      toast.success(
        "Successful! Redirecting to inventory...",
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
            <CreateListingConditionMakeModelPrice
              carMakes={carMakes}
              formData={actionData}
              initialData={editCar}
            />
            {/* CAR DETAILS */}
            <CreateListingInfo
              carBodyTypes={carBodyTypes}
              formData={actionData}
              initialData={editCar}

            />

            {/* SEPARATOR */}
            <Divider classNames="mt-10" />

            {/* LISTING FEATURES */}
            <SelectListingFeature
              initialData={editCar}

            />

            {/* SEPARATOR */}
            <Divider classNames="mt-10"
            />

            {/* UPLOAD */}
            <UploadListingImage
              initialImages={editCar?.images}

            />

            {/* SEPARATOR */}
            <Divider classNames="mt-10" />

            {/* SELLERS NOTES */}
            <CreateListingSellerNote
              initialData={editCar}
            />

            <Divider classNames="mt-20" />

            {/* ASKING PRICE */}
            <CreateListingPrice
              initialData={editCar}

            />

            {/* SEPARATOR */}
            <Divider classNames="mt-10" />

            <Button
              type="submit"
              disabled={isSubmitting}
              title={editCar ? "Update Listing" : "Add Listing"}
              className="mt-10 w-full border py-4 font-extrabold text-white shadow lg:w-1/4"
              icon={<PlusCircle />}
            />

            {editCar && (
              <input type="hidden" value={editCar?.carId} name="carId" />
            )}
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
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const carId = url.searchParams.get("carId")

  // Check the authToken to determine if the user is loggedIn or not
  const token = getAuthToken(request);
  const payload = token ? verifyJwtToken(token) : null;
  if (!token || !payload) {
    throw redirect("/auth/login?message=Please log in to continue")
  }

  console.log("Submit Mode:", carId ? "UPDATE" : "CREATE", "ID:", carId);

  const [makeResponse, bodyTypeResponse, editCarsResponse] = await Promise.all([
    apiFetch(apiEndpoints.carMakes),
    apiFetch(apiEndpoints.carBodyTypes),
    carId ? apiFetch(`${apiEndpoints.getCarById}/${carId}`) : Promise.resolve(null),
  ]);

  return {
    carMakes: makeResponse?.data || [],
    carBodyTypes: bodyTypeResponse?.data || [],
    editCar: editCarsResponse?.data || null,
    isUserLoggedIn: true
  }
};






// ACTION - HANDLING FORM SUBMISSION
export async function action({ request, params }: ActionFunctionArgs) {
  let formData = await request.formData();
  const carId = formData.get("carId") as string;

  console.log("carID FROM ADDLISTING ACTION HANDLER:-", carId)

  const formDataCarImages = formData.getAll("imageUrl") as File[];

  // Removing images from form data for validation
  const formDataWithOutImages = Object.fromEntries(
    [...formData].filter(([key, value]) => typeof value === "string" || typeof value === "number"),
  );

  try {
    const token = getAuthToken(request);
    if (!token) return json({ success: false, message: "Unauthorized" }, { status: 401 });

    const payload = verifyJwtToken(token);
    if (!payload) {
      return json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 },
      );
    }

    // Get User ID from payload
    const userId = payload.userId;

    // Pass form for validation
    let validatedForm = createListingValidateor.parse({
      ...formDataWithOutImages,
      userId: userId,
      imageUrl: formDataCarImages,
    });

    const newValidatedFormData = new FormData();
    // Append non-file fields
    for (const [key, value] of Object.entries(validatedForm)) {
      if (key !== "imageUrl") {
        newValidatedFormData.append(key, value as string);
      }
    }

    console.log("NEW VALIDATED FORM DATA FROM ADDLISTING ACTION HANDLER BEFORE ADDING THE IMAGES:-", newValidatedFormData)

    // Re-append files
    validatedForm.imageUrl.forEach((file: File) => {
      newValidatedFormData.append("imageUrl", file);
    });

    console.log("NEW VALIDATED FORM DATA FROM ADDLISTING ACTION HANDLER AFTER APPENDING THE IMAGE URL:-", newValidatedFormData)

    // DECISION LOGIC: UPDATE OR CREATE
    const url = carId ? `${apiEndpoints.updateCar}/${carId}`
      : `${apiEndpoints.createCar}`;

    const method = carId ? "PUT" : "POST";

    console.log(`SENDING ${method} TO: ${url}`);

    // Post the validated data to the API
    const response = await fetch(`${url}`, {
      method: method,
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
    // return redirect("/dashboard/inventory");

  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.flatten().fieldErrors;
      return json({ errors, values: formData }, { status: 400 });
    }
    console.error("Unexpected error occured", error);
    return json({ error: "Whoops...something went wrong" }, { status: 500 });
  }
}


// export async function action({ request, params }: ActionFunctionArgs) {
//   const { carId } = params;
//   const formData = await request.formData();
//   const token = getAuthToken(request);

//   if (!token) return json({ error: "Unauthorized" }, { status: 401 });

//   // 1. Extract images first
//   const images = formData.getAll("imageUrl") as File[];

//   // 2. Convert FormData to plain object for Zod
//   const rawData = Object.fromEntries(formData);

//   try {
//     const payload = verifyJwtToken(token);

//     // 3. Validate with Zod
//     const validated = createListingValidateor.parse({
//       ...rawData,
//       userId: payload?.userId,
//       imageUrl: images, // Ensure images go into Zod for min(1) check
//     });

//     // 4. Rebuild FormData for the Backend Fetch (Multipart)
//     const apiData = new FormData();
//     for (const [key, value] of Object.entries(validated)) {
//       if (key !== "imageUrl") {
//         apiData.append(key, String(value));
//       }
//     }
//     // Append images
//     images.forEach((file) => apiData.append("imageUrl", file));

//     const url = carId ? `${apiEndpoints.update}/${carId}` : apiEndpoints.createCar;
//     const method = carId ? "PUT" : "POST";

//     const response = await fetch(url, {
//       method,
//       headers: { Authorization: `Bearer ${token}` },
//       body: apiData, // Sending as Multipart
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       return json({ error: errorData.message || "Server Error" }, { status: response.status });
//     }

//     return redirect("/dashboard/inventory");
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return json({ errors: error.flatten().fieldErrors }, { status: 400 });
//     }
//     return json({ error: "Something went wrong" }, { status: 500 });
//   }
// }
