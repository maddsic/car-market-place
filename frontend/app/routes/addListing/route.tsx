import React, { useEffect } from "react";
import {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  json,
  Link,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useRouteError,
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
import { AlertTriangle, ArrowLeft, Home, PlusCircle, RefreshCw } from "lucide-react";
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

  try {
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
  } catch (error) {
    return {
      carMakes: [],
      carBodyTypes: [],
      editCar: null,
      error: "failed to load listing parameters"
    }
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

// ERROR BOUNDARY
export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = "An Unexpected Error Occurred";
  let message =
    "Something went wrong while processing your request. Please try again or return to safety.";
  let statusCode = 500;

  // Handle specific Remix HTTP route errors
  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    if (error.status === 404) {
      title = "Listing Resource Not Found";
      message = "We couldn't locate the car listing or resource you requested.";
    } else if (error.status === 401) {
      title = "Unauthorized Session";
      message = "Your authentication token expired. Please sign in again.";
    } else if (error.status === 403) {
      title = "Access Denied";
      message = "You don't have permission to perform this action.";
    } else {
      message = error.data?.message || error.statusText;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="flex min-h-[450px] w-full flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-2xl border border-red-100 bg-white p-8 shadow-2xl dark:border-red-900/30 dark:bg-slate-900">

        {/* Header Icon & Status Badge */}
        <div className="flex items-center justify-between pb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 dark:bg-red-950/40 dark:text-red-300">
            HTTP {statusCode}
          </span>
        </div>

        {/* Error Details */}
        <div className="mt-4 space-y-2">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {message}
          </p>
        </div>

        {/* Developer Stack Trace (Shown only in Development) */}
        {error instanceof Error && error.stack && (
          <details className="mt-4 rounded-xl bg-slate-100 p-3.5 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <summary className="cursor-pointer font-semibold text-slate-800 dark:text-slate-200">
              Developer Stack Trace
            </summary>
            <pre className="mt-2 max-h-40 overflow-x-auto whitespace-pre-wrap font-mono text-[11px] text-red-600 dark:text-red-400">
              {error.stack}
            </pre>
          </details>
        )}

        {/* Action Controls */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 sm:flex-1"
          >
            <RefreshCw className="h-4 w-4" /> Try Again
          </button>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:flex-1"
          >
            <ArrowLeft className="h-4 w-4" /> Go Back
          </button>
        </div>

        {/* Navigation Link */}
        <div className="mt-6 text-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <Home className="h-3.5 w-3.5" /> Return to Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}
