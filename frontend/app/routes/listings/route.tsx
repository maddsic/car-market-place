import { Form } from "@remix-run/react";
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
import Price from "~/components/Price/price";

const CarDetails = () => {
  const [index, setIndex] = useState<number>(0);
  const [showNumber, setShowNumber] = useState<Boolean>(false);

  const handleShowNumber = () => {
    setShowNumber(!showNumber);
  };

  return (
    <>
      <div className="max__container mb-20 box-border p-4 md:p-10">
        <div className="mt-10 grid grid-cols-1 gap-4 md:gap-10 lg:grid-cols-12">
          {/* TOP: ASIDE LEFT */}
          <div className="col-span-12 flex flex-col gap-5 md:col-span-9">
            <Heading
              title="certified used BMW M5"
              classNames="lg:text-[38px]"
            />
            {/* SUB HEADER */}
            <div className="flex items-center gap-3">
              <ListingSubHeader
                text="added: june 18, 2021"
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
            {/* CAR SECTION */}
            <div className="">
              {/* BIG IMAGE */}
              <div className="relative mb-5 mt-2 overflow-clip">
                <img
                  src="/bmw.jpg"
                  alt=""
                  // sizes="50vw"
                  width="100%"
                  className="rounded-md object-cover"
                />
                <span className="rotate-diagonal z-999 font-montserrat text-md absolute -left-10 top-6 bg-yellow px-14 py-2 text-center font-semibold uppercase text-white">
                  special
                </span>
              </div>
              {/* SMALL IMAGE */}
              <div className="flex flex-row justify-between gap-4">
                <ListingImg imgUrl="/bmw.jpg" />
                <ListingImg imgUrl="/bmw.jpg" />
                <ListingImg imgUrl="/bmw.jpg" />
                <ListingImg imgUrl="/bmw.jpg" />
              </div>
            </div>
            {/* CAR INFO */}
            <div className="mb-5 mt-0 grid grid-cols-2 gap-8 md:mt-5 md:grid-cols-3 md:gap-5 lg:mt-10 2xl:grid-cols-4">
              <CarDetail
                type="condition"
                value="certified used"
                icon={<MdDirectionsCar />}
              />
              <CarDetail type="body" value="sedan" icon={<FaTruckMonster />} />
              <CarDetail type="make" value="bmw" icon={<MdDirectionsCar />} />
              {/* second row */}
              <CarDetail type="model" value="m5" icon={<MdDirectionsCar />} />
              <CarDetail
                type="mileage"
                value="50000"
                icon={<MdDirectionsCar />}
              />
              <CarDetail
                type="fuel type"
                value="gasoline"
                icon={<MdDirectionsCar />}
              />
              {/* third row */}
              <CarDetail
                type="engine"
                value="6,2L V8"
                icon={<MdDirectionsCar />}
              />
              <CarDetail type="year" value="2023" icon={<MdDirectionsCar />} />
              <CarDetail
                type="trans..."
                value="automatic"
                icon={<MdDirectionsCar />}
              />
              {/* forth row */}
              <CarDetail type="drive" value="RWD" icon={<MdDirectionsCar />} />
              <CarDetail
                type="exterior"
                value="black"
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
              <p className="mt-4 text-[10px] leading-4 text-[#7e7d7d] md:text-[12px]">
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
              price={"35,000"}
              className="flex items-center justify-center border-b-8 border-b-gray-900 py-5 text-3xl"
            />
            <div className="mt-5">
              <ListingSeller imgUrl="/sain.jpeg" name="Kunta Sidibeh" />
            </div>

            <Contact
              className="py-4 font-semibold leading-3 shadow"
              text="chat via whatsapp"
              icon={<MdWhatsapp size={24} fill="green" />}
            />

            <div className="flex items-center gap-3 rounded border px-2 py-4 shadow hover:bg-slate-50">
              <BsFillTelephoneOutboundFill size={20} className="text-yellow" />

              {showNumber ? (
                <a href="tel:+1 (512)-999-4635" className="text-md">
                  +1 (512)999-4635
                </a>
              ) : (
                <span className="text-md">+1 (512)*******</span>
              )}
              <span
                className="underline-dotted cursor-pointer text-xs capitalize underline decoration-dotted underline-offset-4"
                onClick={handleShowNumber}
              >
                show number
              </span>
            </div>

            <Contact
              className="py-4 font-semibold leading-3 shadow"
              text="message us"
              icon={<MdMessage size={24} className="text-yellow" />}
            />

            <Contact
              className="border-none bg-[#f0f2f5] py-4 font-thin leading-3 text-gray-500"
              text="make an offer price"
              icon={<FaDollarSign size={24} className="text-yellow" />}
            />

            <Contact
              className="border-none bg-[#f0f2f5] py-4 font-thin leading-3 text-gray-500"
              text="trade in form"
              icon={<FaArrowRightArrowLeft size={24} className="text-yellow" />}
            />
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
                      className="underline-dotted cursor-pointer text-[8px] capitalize underline decoration-dotted underline-offset-4"
                      onClick={handleShowNumber}
                    >
                      show number
                    </span>
                  </div>
                  {/* WHATSAPP */}
                  <Contact
                    className="text-xs font-semibold shadow"
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
                    className="py-4 font-semibold leading-3 shadow"
                    text="message us"
                    icon={<MdMessage size={24} className="text-yellow" />}
                  />
                </div>
              </div>
            </aside>
            {/*BOTTOM: ASIDE RIGHT */}
            <div className="relative col-span-12 md:col-span-7 lg:col-span-8">
              <div className="mt-10 flex w-full flex-col gap-2">
                <SubHeading title="message to dealer" />
                <Form action="" method="post">
                  <textarea
                    name="message"
                    rows={8}
                    placeholder="Your Message"
                    className="w-full p-3 text-xs outline-none"
                  ></textarea>

                  {/* inputs */}
                  <div className="relative my-3 grid grid-cols-9 gap-2">
                    <div className="col-span-3 flex flex-col gap-2">
                      <label
                        htmlFor="name"
                        className="text-[10px] font-semibold"
                      >
                        Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="name"
                        className="px-3 py-1 text-[10px] text-gray-600 outline-none"
                        name="name"
                      />
                    </div>
                    {/* Email */}
                    <div className="col-span-3 flex flex-col gap-2">
                      <label
                        htmlFor="name"
                        className="text-[10px] font-semibold"
                      >
                        EMAIL <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="name"
                        className="px-3 py-1 text-[10px] text-gray-600 outline-none"
                        name="name"
                      />
                    </div>
                    {/* PHONE */}
                    <div className="col-span-3 flex flex-col gap-2">
                      <label
                        htmlFor="name"
                        className="text-[10px] font-semibold"
                      >
                        PHONE<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="name"
                        className="px-3 py-1 text-[10px] text-gray-600 outline-none"
                        name="name"
                      />
                    </div>
                  </div>
                  {/* checkbox */}
                  <div className="mt-2 flex items-center gap-1">
                    <input type="checkbox" name="policy" />
                    <span className="text-[8px] text-gray-600">
                      I accept the{" "}
                      <span className="text-yellow">privacy policy.</span>
                    </span>
                  </div>

                  {/* button */}
                  <Button
                    title="send message"
                    classNames="text-[10px] mt-5 text-white mb-5 lg:mb-20"
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
