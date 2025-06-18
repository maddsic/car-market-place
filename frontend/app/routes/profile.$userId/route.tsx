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

const ProfilePage = () => {
  const { user, userCars } = useLoaderData<typeof loader>();

  const description: string =
    user?.role === "user" ? "Private Seller" : "Private Dealer";

  const phoneDesc: string =
    user?.role === "user" ? "Seller Phone" : "Dealer Phone";

  const emailDesc: string =
    user?.role === "user" ? "Seller Email" : "Dealer Email";

  const fullname: string = user?.first_name + " " + user?.last_name;

  return (
    <main className="max__container relative mb-10 box-border p-4 md:p-10">
      <div className="grid gap-5 pt-3 lg:grid-cols-12 lg:pt-5">
        <aside className="relative md:col-span-12 lg:col-span-9">
          <div className="grid items-center justify-between gap-5 md:mb-5 md:flex">
            {/* PROFILE IMAGE */}
            <span className="">
              <ListingSellerImage
                imgUrl="/sain.jpeg"
                name={fullname}
                className="h-22 w-22 border-b md:border-none"
                desc={description}
              />
            </span>
            <span className="mb-5 grid grid-cols-2 gap-5 lg:mb-0 lg:gap-10">
              {/* TEL */}
              <span className="w-full cursor-pointer lg:border lg:bg-gray-200 lg:p-2">
                <ProfileInfo
                  phone={user?.phone}
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
                  email={user?.email}
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
          <section className="relative pt-5">
            <SubHeading
              classNames="font-extrabold md:text-xl capitalize"
              title="seller inventory"
            />
            <div className="mt-5">
              <div className="flex items-center gap-2">
                <span className="font-body uppercase antialiased">
                  View as:
                </span>{" "}
                <span className="cursor-pointer bg-gray-200 p-1 hover:bg-gray-300/40">
                  <MdOutlineGridView size={18} className="gray__text-light" />
                </span>
                <span className="cursor-pointer bg-gray-200 p-1 hover:bg-gray-300/40">
                  <FaListUl size={18} className="gray__text-light" />
                </span>
              </div>
              <ProfileCars userCars={userCars} />
            </div>
          </section>
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

const API_BASE_URL = process.env.API_BASE_URL;

export async function loader({ params }: LoaderFunctionArgs) {
  const { userId } = params;

  const user = await apiFetch(`${API_BASE_URL}/api/v1/users/${userId}`);
  // console.log("User Data from profile page loader");
  // console.log(user);

  return { user: user.data, userCars: user.data.cars };
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
          classNames="text-white w-full text-[14px] my-6 py-3"
        />
      </div>
    </Form>
  );
}
