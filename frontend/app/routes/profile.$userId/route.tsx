import { ReactNode } from "react";
import { Form, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { cn } from "~/lib/utils";

import { createReview } from "~/utils/user";
import { ListingSellerImage } from "../listings.$carId/listingSeller";
import Divider from "~/components/Divider/divider";

import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { HiOutlineMailOpen } from "react-icons/hi";

import { Input } from "~/components/ui/input";
import Button from "~/components/Button/button";
import ProfileTabs from "./profileTabs";

import { apiFetch } from "~/utils/apiFetch";
import { getAuthToken } from "~/utils/authHelpers";
import { verifyJwtToken } from "~/utils/jwt.server";

const ProfilePage = () => {
  const { user, userCars, dealers, reviews, isUserLoggedIn } =
    useLoaderData<typeof loader>();

  const description: string =
    user?.role === "user" ? "Private Seller" : "Private Dealer";

  const phoneDesc: string =
    user?.role === "user" ? "Seller Phone" : "Dealer Phone";

  const emailDesc: string =
    user?.role === "user" ? "Seller Email" : "Dealer Email";

  const sellerFullname: string | null = user
    ? user?.first_name + " " + user?.last_name
    : null;
  const username: string | null = dealers ? dealers?.username : null;

  return (
    <main className="max__container relative mb-10 box-border p-4 md:p-10">
      <div className="grid gap-5 pt-3 lg:grid-cols-12 lg:pt-5">
        <aside className="relative md:col-span-12 lg:col-span-9">
          <div className="grid items-center justify-between gap-5 md:mb-5 md:flex">
            {/* PROFILE IMAGE */}
            <span className="">
              <ListingSellerImage
                imgUrl={user?.avatarUrl}
                name={username || sellerFullname || ""}
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

    // Construct review data from form inputs
    const data = {
      comment: String(formData.get("comment") || ""),
      buyingProcess: Number(formData.get("buyingProcess") || 1),
      customerService: Number(formData.get("customerService") || 1),
      overallExperience: Number(formData.get("overallExperience") || 1),
    };

    // Create review
    const response = await createReview(dealerId!, data, token);
    // console.log("✅ createReview response:", response.success, response.message);

    if (response.success) {
      return json({ success: true, message: "Review submitted successfully" });
      // return redirect(`/profile/${dealerId}`);
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

interface ProfileInfoProps {
  icon?: ReactNode;
  phoneDesc?: string;
  emailDesc?: string;
  phone?: string;
  email?: string;
  className?: string;
}


interface ProfileInfoProps {
  icon?: ReactNode;
  phone?: string;
  email?: string;
  phoneDesc?: string;
  emailDesc?: string;
  className?: string;
}

export function ProfileInfo({
  icon,
  phone,
  email,
  phoneDesc,
  emailDesc,
  className,
}: ProfileInfoProps) {
  // Clean phone to avoid duplicate country codes in href
  const cleanPhone = phone ? String(phone).replace(/\D/g, "") : "";
  const telNumber = cleanPhone.startsWith("220") ? cleanPhone : `220${cleanPhone}`;

  const description = phoneDesc || emailDesc;

  return (
    <div
      className={cn(
        "group flex items-center gap-3.5 rounded-xl border border-gray-150 bg-white p-3 shadow-xs transition hover:border-gray-300 hover:shadow-sm",
        className
      )}
    >
      {/* Icon Badge */}
      {icon && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-700 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
          {icon}
        </div>
      )}

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Sub-label */}
        {description && (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            {description}
          </span>
        )}

        {/* Phone Link */}
        {phone && (
          <a
            href={`tel:+${telNumber}`}
            className="truncate text-sm font-bold text-gray-900 transition hover:text-yellow md:text-base"
          >
            (+220) {phone}
          </a>
        )}

        {/* Email Link */}
        {email && (
          <a
            href={`mailto:${email}`}
            className="truncate text-sm font-bold text-gray-900 transition hover:text-yellow md:text-base"
          >
            {email}
          </a>
        )}
      </div>
    </div>
  );
}

// ASIDE RIGHT: CONTACT DEALER
function ProfileForm() {
  return (
    <Form className="relative rounded-2xl bg-primary p-6 shadow-xl border border-gray-800">
      <h3 className="mb-4 text-base font-extrabold uppercase tracking-wider text-white lg:text-lg">
        Contact Seller
      </h3>
      <div className="flex flex-col gap-4">
        <textarea
          name="message"
          placeholder="Write your message..."
          className="w-full rounded-lg bg-white/10 p-3 text-xs text-white placeholder-gray-400 outline-none ring-1 ring-white/20 transition-all focus:bg-white/20 focus:ring-yellow"
          rows={5}
          required
        />

        <Input
          name="fullName"
          placeholder="First Name, Last Name*"
          className="bg-white/10 text-xs text-white placeholder-gray-400 ring-1 ring-white/20 focus:ring-yellow"
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Your Email Address*"
          className="bg-white/10 text-xs text-white placeholder-gray-400 ring-1 ring-white/20 focus:ring-yellow"
          required
        />
        <Input
          type="text"
          name="address"
          placeholder="Your Address*"
          className="bg-white/10 text-xs text-white placeholder-gray-400 ring-1 ring-white/20 focus:ring-yellow"
          required
        />
        <Input
          type="tel"
          name="phone"
          placeholder="Your Phone*"
          className="bg-white/10 text-xs text-white placeholder-gray-400 ring-1 ring-white/20 focus:ring-yellow"
          required
        />

        <Button
          title="Send Message"
          className="mt-2 w-full py-3 text-sm font-bold uppercase tracking-wider text-white bg-yellow hover:bg-yellow/90 transition-all shadow-md"
        />
      </div>
    </Form>
  );
}
