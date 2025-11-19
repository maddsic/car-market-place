import { LoaderFunctionArgs } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { createReview } from "~/utils/user";
import { Form, useLoaderData } from "@remix-run/react";
import { apiFetch } from "~/utils/apiFetch";
import { ListingSellerImage } from "../listings.$carId/listingSeller";
import Divider from "~/components/Divider/divider";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { ReactNode } from "react";
import { HiOutlineMailOpen } from "react-icons/hi";

import { Input } from "~/components/ui/input";
import Button from "~/components/Button/button";
import ProfileTabs from "./profileTabs";

import { getAuthToken } from "~/utils/authHelpers";
import { verifyJwtToken } from "~/utils/jwt";

const ProfilePage = () => {
  const { user, userCars, dealers, reviews, isUserLoggedIn } =
    useLoaderData<typeof loader>();

  const description: string =
    user?.role === "user" ? "Private Seller" : "Private Dealer";

  const phoneDesc: string =
    user?.role === "user" ? "Seller Phone" : "Dealer Phone";

  const emailDesc: string =
    user?.role === "user" ? "Seller Email" : "Dealer Email";

  const sellerFullname: string = user
    ? user?.first_name || user?.last_name
    : null;
  const dealerFullname: string = dealers ? dealers?.username : null;

  return (
    <main className="max__container relative mb-10 box-border p-4 md:p-10">
      <div className="grid gap-5 pt-3 lg:grid-cols-12 lg:pt-5">
        <aside className="relative md:col-span-12 lg:col-span-9">
          <div className="grid items-center justify-between gap-5 md:mb-5 md:flex">
            {/* PROFILE IMAGE */}
            <span className="">
              <ListingSellerImage
                imgUrl="/sain.jpeg"
                name={sellerFullname || dealerFullname}
                className="h-22 w-22 border-b md:border-none"
                desc={description}
              />
            </span>
            <span className="mb-5 grid grid-cols-2 gap-5 lg:mb-0 lg:gap-10">
              {/* TEL */}
              <span className="w-full cursor-pointer lg:border lg:bg-gray-200 lg:p-2">
                <ProfileInfo
                  phone={user?.phone || dealers.phone}
                  phoneDesc={phoneDesc}
                  icon={
                    <BsFillTelephoneOutboundFill
                      className="mt-2 text-yellow"
                      size={14}
                    />
                  }
                />
              </span>
              {/* EMAIL */}
              <span className="w-full cursor-pointer lg:border lg:bg-gray-200 lg:p-2">
                <ProfileInfo
                  email={user?.email || dealers.email}
                  emailDesc={emailDesc}
                  icon={
                    <HiOutlineMailOpen className="mt-2 text-yellow" size={18} />
                  }
                />
              </span>
            </span>
          </div>
          <Divider />
          {/* INVENTORY SECTION */}

          <ProfileTabs
            userCars={userCars}
            dealers={dealers}
            reviews={reviews}
            isUserLoggedIn={isUserLoggedIn} // boolean
          />
          {/* INVENTORY SECTION ENDS */}
        </aside>
        <aside className="relative mt-5 box-border md:col-span-12 lg:col-span-3">
          <ProfileForm />
        </aside>
      </div>
    </main>
  );
};

export default ProfilePage;

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const apiVersion = import.meta.env.VITE_API_VERSION || "/api/v1";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const dealerId = params.userId;

  try {
    const formData = await request.formData();
    const token = getAuthToken(request);
    if (!token) {
      return json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyJwtToken(token);
    if (!payload) {
      return json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 },
      );
    }

    const authorId = payload.userId;
    console.log(authorId);

    const data = {
      dealerId: dealerId,
      userId: authorId,
      comment: formData.get("comment"),
      buyingProcess: Number(formData.get("buyingProcess")),
      customerService: Number(formData.get("customerService")),
      overallExperience: Number(formData.get("overallExperience")),
    };

    // Create review
    const response = await createReview(data, token);

    if (response.success) {
      return redirect(`/profile/${dealerId}?review=success`);
    }

    return json({ success: false, message: response.message }, { status: 400 });
  } catch (error) {
    console.error("❌ ERROR FROM createReview action:", error);
    return json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
};

// Passing data to the profile cars component because remix does not fetch data on client components instead on routes.
export async function loader({ params, request }: LoaderFunctionArgs) {
  const { userId } = params;
  const url = new URL(request.url);

  // Check for token to determine if user is logged in
  const token = getAuthToken(request);
  let isUserLoggedIn = false;

  // Token exists
  if (token) {
    // Verify token validity
    const payload = verifyJwtToken(token);
    if (payload) {
      isUserLoggedIn = true;
    }
  }

  // Get search params
  const condition = url.searchParams.get("condition");
  const carMake = url.searchParams.get("make");
  const carModel = url.searchParams.get("model");

  const searchParams = new URLSearchParams();

  if (condition) searchParams.append("condition", condition);
  if (carMake) searchParams.append("make", carMake);
  if (carModel) searchParams.append("model", carModel);

  const queryString = searchParams.toString();

  // Define endpoint based on presence of query params
  const endPoints = queryString
    ? `${apiBaseUrl}${apiVersion}/dealers/filtered-cars/${userId}?${searchParams.toString()}`
    : `${apiBaseUrl}${apiVersion}/users/${userId}`;

  const result = await apiFetch(endPoints);

  return {
    user: result.data,
    userCars: result.data.cars,
    reviews: result.data.dealerReviews,
    dealers: result.data,
    queryString: { carMake, carModel, condition },
    isUserLoggedIn,
  };
}

// Route Components
function ProfileInfo({
  phoneDesc,
  icon,
  emailDesc,
  phone,
  email,
}: {
  icon?: ReactNode;
  phoneDesc?: string;
  emailDesc?: string;
  phone?: string;
  email?: string;
}) {
  return (
    <span className="flex w-full gap-3">
      {icon && <span>{icon}</span>}
      <span className="flex flex-col">
        {phone && (
          <a
            href={`tel:+220${phone}`}
            className="gray__text-dark text-[14px] font-semibold md:text-[16px] lg:text-[20px]"
          >
            ( +220) {phone}
          </a>
        )}

        {email && (
          <a
            href=""
            className="gray__text-dark text-[14px] font-semibold lg:text-[20px]"
          >
            {email}
          </a>
        )}

        <span className="font-body gray__text-light">
          {phoneDesc || emailDesc}
        </span>
      </span>
    </span>
  );
}

// Route Components
function ProfileForm({}) {
  return (
    <Form className="relative bg-primary p-5 shadow-lg">
      <h3 className="font-montserrat mb-3 text-[14px] font-extrabold capitalize text-white lg:text-[18px]">
        Contact Seller
      </h3>
      <div className="gray__text-light flex flex-col gap-6">
        <textarea
          name=""
          id=""
          placeholder="Your message"
          className="font-body w-full p-3 text-[12px] outline-none"
          rows={7}
          required
        />

        <Input
          placeholder="First Name, Last Name*"
          className="font-body pl-4 text-[12px]"
          required
        />
        <Input
          type="email"
          placeholder="Your Email Address*"
          className="font-body pl-4 text-[12px]"
          required
        />
        <Input
          type="text"
          placeholder="Your Address*"
          className="font-body pl-4 text-[12px]"
          required
        />
        <Input
          type="tel"
          placeholder="Your Phone*"
          className="text- pl-4 text-[12px]"
          required
        />

        <Button
          title="Send Message"
          className="my-6 w-full py-3 text-[14px] text-white"
        />
      </div>
    </Form>
  );
}
