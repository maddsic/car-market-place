import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { apiFetch } from "~/utils/apiFetch";
import { ListingSellerImage } from "../listings.$carId/listingSeller";
import Divider from "~/components/Divider/divider";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { ReactNode } from "react";
import { HiOutlineMailOpen } from "react-icons/hi";
import SubHeading from "~/components/Heading/subheading";
import { MdOutlineGridView } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import { Input } from "~/components/ui/input";
import Button from "~/components/Button/button";

import { ProfileCars } from "./ProfileCars";
import ProfileTabs from "./profileTabs";

const ProfilePage = () => {
  const { user, userCars, dealers } = useLoaderData<typeof loader>();

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
            isLoggedIn={!!user} // boolean
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

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const apiVersion = import.meta.env.VITE_API_VERSION || "/api/v1";

// Passing data to the profile cars component because remix does not fetch data on client components instead on routes.
export async function loader({ params, request }: LoaderFunctionArgs) {
  const { userId } = params;
  const url = new URL(request.url);

  // Get search params
  const condition = url.searchParams.get("condition");
  const carMake = url.searchParams.get("make");
  const carModel = url.searchParams.get("model");

  const searchParams = new URLSearchParams();

  if (condition) searchParams.append("condition", condition);
  if (carMake) searchParams.append("make", carMake);
  if (carModel) searchParams.append("model", carModel);

  const queryString = searchParams.toString();

  const endPoints = queryString
    ? `${apiBaseUrl}${apiVersion}/dealers/filtered-cars/${userId}?${searchParams.toString()}`
    : `${apiBaseUrl}${apiVersion}/users/${userId}`;

  const result = await apiFetch(endPoints);

  return {
    user: result.data,
    userCars: result.data.cars,
    dealers: result.data,
    queryString: { carMake, carModel, condition },
  };
}

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
