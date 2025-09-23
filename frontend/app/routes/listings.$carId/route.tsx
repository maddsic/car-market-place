import React from "react";
import { useLoaderData, useNavigation } from "@remix-run/react";
import { useState } from "react";
import { GrSchedule } from "react-icons/gr";
import { MdAccessTime, MdShare } from "react-icons/md";
import Divider from "~/components/Divider/divider";
import Heading from "~/components/Heading/heading";
import { Car } from "~/interfaces";

import { LoaderFunctionArgs } from "@remix-run/node";
import { apiFetch } from "~/utils/apiFetch";
import { BigImage } from "./bigImage";
import { ListingSmallImg } from "./listingImg";
import { ViewListingCarInfo } from "./viewListingCarInfo";
import { ViewListingCarFeatures } from "./carFeatures";
import { ViewListingDealerContactInfoRight } from "./viewListingDealerContactRight";
import { ListingContactInfo } from "./contactInfoRight";
import { MessageDealerForm } from "./messageDealerForm";
import { ListingSubHeader } from "./submenu";
import SubHeading from "~/components/Heading/subheading";
import LoadingIndicator from "~/components/Loader/loadingIndicator";

interface loaderData {
  car: Car | null;
}

const ViewListing = () => {
  const { car } = useLoaderData<loaderData>();
  const [index, setIndex] = useState<number>(0); // FOR IMAGE GALLERY NOT USED YET
  const [showNumber, setShowNumber] = useState<Boolean>(false);
  const navigation = useNavigation();
  const loading = navigation.state === "loading";

  const handleShowNumber = (): void => {
    setShowNumber(!showNumber);
  };

  return (
    <React.Fragment>
      <LoadingIndicator isLoading={loading} />
      <div className="max__container mb-10 box-border p-4 md:p-10">
        <section className="mt-5 grid grid-cols-1 gap-4 md:gap-10 lg:grid-cols-12">
          {/* TOP: ASIDE LEFT - CAR INFO */}
          <aside className="col-span-12 flex flex-col gap-3 md:col-span-9">
            <Heading
              title={car?.make + " " + car?.model}
              classNames="lg:text-[38px] text-[24px] uppercase"
            />

            {/* SUB HEADER */}
            <SubHeader car={car!} />

            {/* BIG IMAGE */}
            <BigImage imageUrl={car?.imageUrl!} price={car?.price!} />

            {/* SMALL IMAGE */}
            <div className="relative flex flex-row justify-between gap-4">
              <ListingSmallImg imageUrl={car?.imageUrl!} />
              <ListingSmallImg imageUrl={car?.imageUrl!} />
              <ListingSmallImg imageUrl={car?.imageUrl!} />
              <ListingSmallImg imageUrl={car?.imageUrl!} />
            </div>

            {/* CAR INFO */}
            <ViewListingCarInfo car={car!} />
            <Divider />
            <ViewListingCarFeatures />
            <Divider />
            <SellerNote />
          </aside>

          {/*TOP: ASIDE RIGHT - Dealer contact info*/}
          <ViewListingDealerContactInfoRight car={car!} />
        </section>
      </div>

      {/* BOTTOM: CONTACT SECTION */}
      <section className="relative mt-5 bg-[#e8edef]">
        <div className="max__container">
          <aside className="mt-10 grid grid-cols-1 md:grid-cols-12 md:gap-5">
            {/*BOTTOM: ASIDE LEFT - DEALER CONTACT INFO */}
            <ListingContactInfo
              car={car!}
              showNumber={showNumber}
              handleShowNumber={handleShowNumber}
            />
            {/*BOTTOM: ASIDE RIGHT - FORM */}
            <MessageDealerForm />
          </aside>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ViewListing;

function SubHeader({ car }: { car: Car }) {
  const createdAtDate: Date = new Date(car?.createdAt!);

  // FORMAT DATE
  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
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
      <ListingSubHeader text="share this" icon={<MdShare size={16} />} />
    </div>
  );
}

function SellerNote({}) {
  return (
    <div className="mt-4">
      <SubHeading title="seller's notes" />
      <p className="gray__text-light mt-4 font-sans text-[14px] md:text-[12px]">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat optio,
        incidunt eligendi itaque, impedit, nemo velit voluptatibus ratione amet
        commodi minus neque repellat sequi explicabo? Animi voluptatem autem
        ipsam temporibus. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Quo temporibus similique deserunt labore unde, esse alias culpa,
        eos quia id ex quidem debitis odit numquam perspiciatis saepe quae
        nostrum necessitatibus. numquam perspiciatis saepe quae nostrum
        necessitatibus.
      </p>
    </div>
  );
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const apiVersion = import.meta.env.VITE_API_VERSION || "/api/v1";

export async function loader({ params }: LoaderFunctionArgs) {
  const { carId } = params;

  const car = await apiFetch(`${apiBaseUrl}${apiVersion}/cars/${carId}`);
  // console.log(car);

  return { car: car.data };
}
