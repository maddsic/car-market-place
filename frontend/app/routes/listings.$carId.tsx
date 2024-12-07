// import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@vercel/remix";
import { useState } from "react";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { FaDollarSign, FaTruckMonster } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { GrSchedule } from "react-icons/gr";
import {
  MdAccessTime,
  MdDirectionsCar,
  MdMessage,
  MdShare,
  MdWhatsapp,
} from "react-icons/md";
import Button from "~/components/Button/button";
import Divider from "~/components/Divider/divider";
import Heading from "~/components/Heading/heading";
import SubHeading from "~/components/Heading/subheading";
import CarDetail from "~/components/listing/carDetail";
import Contact from "~/components/listing/contact";
import ListingFeatures from "~/components/listing/listingFeatures";
import ListingImg from "~/components/listing/listingImg";
import ListingSeller from "~/components/listing/listingSeller";
import ListingSubHeader from "~/components/listing/submenu";
import MapComponent from "~/components/Map/map";
import Price from "~/components/Price/price";
import { apiFetch } from "~/utils/apiFetch";
import FormatDate from "~/utils/formatDate";

type Car = {
  carId: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color: string;
  fuelType: string;
  carType: string;
  description: string;
  imageUrl: string;
  engineType: string;
  status: string;
  transmission: string;
  createdAt: Date | string;
};

type loaderData = {
  car: Car | null;
};

const API_BASE_URL = process.env.API_BASE_URL;

export async function loader({ params }: LoaderFunctionArgs) {
  const { carId } = params;

  const car = await apiFetch(`${API_BASE_URL}/api/v1/cars/${carId}`);
  // console.log(car);

  return { car: car.data };
}

const CarDetails = () => {
  const { car } = useLoaderData<loaderData>();
  const [index, setIndex] = useState<number>(0);
  const [showNumber, setShowNumber] = useState<Boolean>(false);

  const createdAtDate: Date = new Date(car?.createdAt!);

  // FORMAT DATE
  const formattedDate: {} = createdAtDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleShowNumber = (): void => {
    setShowNumber(!showNumber);
  };





  return (
    <>
      <div className="max__container mb-10 box-border p-4 md:p-10">
        <div className="mt-5 grid grid-cols-1 gap-4 md:gap-10 lg:grid-cols-12">
          {/* TOP: ASIDE LEFT - CAR INFO */}
          <div className="col-span-12 flex flex-col gap-3 md:col-span-9">
            <Heading
              title={car?.make + " " + car?.model}
              classNames="lg:text-[38px] text-[24px] uppercase"
            />
            {/* SUB HEADER */}
            <div className="flex flex-wrap items-center gap-3">
              <ListingSubHeader
                text={`added: ${formattedDate}`}
                icon={<MdAccessTime size={16} />}
              />

              <ListingSubHeader text="stock #153093" className="bg-muted" />

              <ListingSubHeader
                text="schedule test drive"
                icon={<GrSchedule size={16} />}
              />

              <ListingSubHeader
                text="share this"
                icon={<MdShare size={16} />}
              />
            </div>

            {/* BIG IMAGE */}
            <div className="relative mb-5 mt-2 max-h-[500px] overflow-clip">
              <img
                src={car?.imageUrl}
                alt=""
                // sizes="50vw"
                // width="100%"
                className="max-h-[400px] w-full rounded-md object-cover md:max-h-[500px]"
              />
              <span className="rotate-diagonal z-999 font-montserrat text-md absolute -left-10 top-6 bg-yellow px-14 py-2 text-center font-semibold uppercase text-white">
                special
              </span>
              <Price
                price={car?.price!}
                className="absolute bottom-0 right-0 border-b-4 border-b-primary px-3 text-sm md:text-base lg:hidden"
              />
            </div>

            {/* SMALL IMAGE */}
            <div className="relative flex flex-row justify-between gap-4">
              <ListingImg imageUrl={car?.imageUrl!} />
              <ListingImg imageUrl={car?.imageUrl!} />
              <ListingImg imageUrl={car?.imageUrl!} />
              <ListingImg imageUrl={car?.imageUrl!} />
            </div>
            {/* CAR INFO */}
            <div className="mb-5 mt-10 grid grid-cols-1 gap-4 md:mt-5 md:grid-cols-3 md:gap-5 lg:mt-10 2xl:grid-cols-4">
              {/* <SubHeading title="details" /> */}

              <CarDetail
                type="condition"
                value="certified used"
                icon={<MdDirectionsCar />}
              />
              <CarDetail
                type="body"
                value={car?.carType!}
                icon={<FaTruckMonster />}
              />
              <CarDetail
                type="make"
                value={car?.make!}
                icon={<MdDirectionsCar />}
              />
              {/* second row */}
              <CarDetail
                type="model"
                value={car?.model!}
                icon={<MdDirectionsCar />}
              />
              <CarDetail
                type="mileage"
                value={car?.mileage!}
                icon={<MdDirectionsCar />}
              />
              <CarDetail
                type="fuel type"
                value={car?.fuelType!}
                icon={<MdDirectionsCar />}
              />
              {/* third row */}
              <CarDetail
                type="engine"
                value={car?.engineType!}
                icon={<MdDirectionsCar />}
              />
              <CarDetail
                type="year"
                value={car?.year!}
                icon={<MdDirectionsCar />}
              />
              <CarDetail
                type="trans..."
                value={car?.transmission!}
                icon={<MdDirectionsCar />}
              />
              {/* forth row */}
              <CarDetail type="drive" value="RWD" icon={<MdDirectionsCar />} />
              <CarDetail
                type="exterior"
                value={car?.color!}
                icon={<MdDirectionsCar />}
              />
              <CarDetail
                type="interior"
                value="gold"
                icon={<MdDirectionsCar />}
              />
            </div>

            <Divider />

            {/* CAR FEATURES */}
            <div className="relative my-4">
              <SubHeading title="features" />
              <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-4">
                <div className="">
                  <h4 className="font-bold capitalize">Comfort</h4>

                  <ListingFeatures text="A/C: Front" />
                  <ListingFeatures text="backup camera" />
                  <ListingFeatures text="cruise control" />
                  <ListingFeatures text="navigation" />
                </div>
                <div className="">
                  <h2 className="font-bold capitalize">entertainment</h2>
                  <ListingFeatures text="MP3 player" />
                  <ListingFeatures text="premium audio" />
                  <ListingFeatures text="am/fm stereo" />
                  <ListingFeatures text="DVD systems" />
                </div>
                <div className="">
                  <h2 className="font-bold capitalize">safety</h2>
                  <ListingFeatures text="Airbag: Driver" />
                  <ListingFeatures text="Airbag: passenger" />
                  <ListingFeatures text="security system" />
                  <ListingFeatures text="antilock breaks" />
                </div>
                <div className="">
                  <h2 className="font-bold capitalize">seats</h2>
                  <ListingFeatures text="Heated seats" />
                  <ListingFeatures text="power seats" />
                  <ListingFeatures text="bucket seats" />
                  <ListingFeatures text="leather seats" />
                </div>
              </div>
            </div>

            <Divider />

            {/*  SELLER NOTE */}
            <div className="mt-4">
              <SubHeading title="seller's notes" />
              <p className="gray__text-light mt-4 font-sans text-[14px] md:text-[12px]">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat
                optio, incidunt eligendi itaque, impedit, nemo velit
                voluptatibus ratione amet commodi minus neque repellat sequi
                explicabo? Animi voluptatem autem ipsam temporibus. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Quo temporibus
                similique deserunt labore unde, esse alias culpa, eos quia id ex
                quidem debitis odit numquam perspiciatis saepe quae nostrum
                necessitatibus. numquam perspiciatis saepe quae nostrum
                necessitatibus.
              </p>
            </div>
          </div>
          {/*TOP: ASIDE RIGHT */}
          <aside className="relative col-span-3 hidden flex-col gap-3 lg:flex">
            <Price
              price={car?.price!}
              className="flex items-center justify-center border-b-8 border-b-gray-900 py-5 text-3xl"
            />
            {/* SELLER PIC */}
            <div className="mt-5">
              <ListingSeller imgUrl="/sain.jpeg" name="Kunta Sidibeh" />
            </div>

            {/* CONTACT: WHATSAPP */}
            <Contact
              className="py-4 font-semibold leading-3 shadow"
              text="chat via whatsapp"
              icon={<MdWhatsapp size={28} fill="green" />}
            />

            {/* CONTACT: TELEPHONE */}
            <div className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 transition-all duration-300 ease-in-out hover:bg-gray-100 hover:shadow-lg">
              <BsFillTelephoneOutboundFill size={20} className="text-yellow" />

              {showNumber ? (
                <a href="tel:+1 (512)999-4635" className="text-md">
                  +1 (512)999-4444
                </a>
              ) : (
                <span className="text-md">+1 (512)*******</span>
              )}
              <span
                className="underline-dotted cursor-pointer text-[10px] capitalize underline decoration-dotted underline-offset-4"
                onClick={handleShowNumber}
              >
                show number
              </span>
            </div>

            {/* CONTACT: MESSAGE */}
            <Contact
              className="py-4 font-semibold shadow"
              text="message us"
              icon={<MdMessage size={24} className="text-yellow" />}
            />

            {/* OFFER  */}
            <Contact
              className="gray__text-light border-none bg-[#f0f2f5] py-4 font-thin hover:bg-gray-200"
              text="make an offer price"
              icon={<FaDollarSign size={24} className="text-yellow" />}
            />

            {/* TRADE IN FORM */}
            <Contact
              className="gray__text-light border-none bg-[#f0f2f5] py-4 font-thin hover:bg-gray-200"
              text="trade in form"
              icon={<FaArrowRightArrowLeft size={24} className="text-yellow" />}
            />

            {/* TODO: MAPS */}
            <div className="maps mt-5 border">
              <h1 className="font-body">maps</h1>
              <MapComponent />
            </div>
          </aside>
        </div>
      </div>

      {/* BOTTOM: CONTACT SECTION */}
      <div className="relative mt-5 bg-[#e8edef]">
        <div className="max__container">
          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 md:gap-5">
            {/*BOTTOM: ASIDE LEFT */}
            <aside className="col-span-12 box-border md:col-span-5 lg:col-span-4">
              <div className="mt-5 border-t-4 border-t-gray-900 bg-white p-4 shadow md:my-10">
                {/* SELLER BIO */}
                <ListingSeller imgUrl="/sain.jpeg" name="Kunta Sidibeh" />
                <div className="mb-5 flex flex-col gap-3">
                  {/* PHONE # */}
                  <div className="mt-5 flex items-center gap-3 px-2 py-4">
                    <BsFillTelephoneOutboundFill
                      className="text-yellow"
                      size={10}
                    />

                    {showNumber ? (
                      <a
                        href="tel:+1 (512)-999-4635"
                        className="text-md font-bold"
                      >
                        +1 (512)999-4635
                      </a>
                    ) : (
                      <span className="text-md font-bold">+1 (512)*******</span>
                    )}
                    <span
                      className="underline-dotted cursor-pointer text-[13px] capitalize underline decoration-dotted underline-offset-4"
                      onClick={handleShowNumber}
                    >
                      show number
                    </span>
                  </div>
                  {/* WHATSAPP */}
                  <Contact
                    className="text-[13px] font-semibold shadow"
                    text="chat via whatsapp"
                    icon={
                      <MdWhatsapp
                        size={28}
                        fill="green"
                        // className="text-green-500"
                      />
                    }
                  />

                  <Contact
                    className="py-4 text-[13px] font-semibold shadow"
                    text="message us"
                    icon={<MdMessage size={24} className="text-yellow" />}
                  />
                </div>
              </div>
            </aside>
            {/*BOTTOM: ASIDE RIGHT - FORM */}
            <div className="relative col-span-12 md:col-span-7 lg:col-span-8">
              <div className="mt-10 flex w-full flex-col gap-2">
                <SubHeading title="message to dealer" />
                <Form action="" method="post">
                  <textarea
                    name="message"
                    rows={8}
                    placeholder="Your Message"
                    className="w-full p-3 text-[13px] outline-none"
                  ></textarea>

                  {/* inputs */}
                  <div className="relative my-3 grid grid-cols-9 gap-2">
                    <div className="col-span-3 flex flex-col gap-2">
                      <label
                        htmlFor="name"
                        className="text-[13px] font-semibold uppercase"
                      >
                        Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter name"
                        className="gray__text-medium px-3 py-1 text-[13px] outline-none"
                        name="name"
                      />
                    </div>
                    {/* Email */}
                    <div className="col-span-3 flex flex-col gap-2">
                      <label
                        htmlFor="email"
                        className="text-[13px] font-semibold uppercase"
                      >
                        EMAIL <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter email"
                        className="gray__text-medium px-3 py-1 text-[13px] outline-none"
                        name="email"
                      />
                    </div>
                    {/* PHONE */}
                    <div className="col-span-3 flex flex-col gap-2">
                      <label
                        htmlFor="phone"
                        className="text-[13px] font-semibold uppercase"
                      >
                        PHONE<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter phone"
                        className="gray__text-medium px-3 py-1 text-[13px] outline-none"
                        name="phone"
                      />
                    </div>
                  </div>
                  {/* checkbox */}
                  <div className="mt-2 flex items-center gap-1">
                    <input type="checkbox" name="policy" />
                    <span className="gray__text-medium text-[13px]">
                      I accept the{" "}
                      <span className="text-yellow">privacy policy.</span>
                    </span>
                  </div>

                  {/* button */}
                  <Button
                    title="send message"
                    classNames="text-[13px] mt-5 text-white mb-5 lg:mb-20"
                  />
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarDetails;
