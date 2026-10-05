import React, { useEffect, useRef, useState } from "react";
import { json, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
// icons
import { GrSchedule } from "react-icons/gr";
import { MdAccessTime, MdShare } from "react-icons/md";
import { toast } from "react-toastify";
// interfaces
import { Car } from "~/interfaces";
// Helper functions
import { apiFetch } from "~/utils/apiFetch";
// components
import Divider from "~/components/Divider/divider";
import Heading from "~/components/Heading/heading";
import LoadingIndicator from "~/components/Loader/loadingIndicator";
import SellerNote from "./sellerNote";
import { BigImage } from "./bigImage";
import { ListingSmallImg } from "./listingImg";
import { ViewListingCarInfo } from "./viewListingCarInfo";
import { ViewListingCarFeatures } from "./carFeatures";
import { ViewListingDealerContactInfoRight } from "./viewListingDealerContactRight";
import { ListingContactInfoBottom } from "./contactInfoRight";
import { MessageDealerForm } from "./messageDealerForm";
import { ListingSubHeader } from "./submenu";
import { sendMessageToDealer } from "~/service/dealer.server";
import { messageDealerSchema } from "~/validations/validateForm";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface loaderData {
  car: Car | null;
}

const ViewListing = () => {
  const { car } = useLoaderData<loaderData>();
  const messageActionData = useActionData<typeof action>();

  const [index, setIndex] = useState<number>(
    car?.images?.findIndex((img) => img.isPrimary) || 0,
  );
  const [showNumber, setShowNumber] = useState<Boolean>(false);

  const navigation = useNavigation();
  const loading = navigation.state === "loading";
  const isSubmitting = navigation.state === "submitting" && navigation.formData?.get("content") !== undefined;
  const formRef = React.useRef<HTMLFormElement>(null);
  // Inside your component:
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const Cartitle = `${car?.year} ${car?.make} ${car?.model}`;


  // Function to handle scrolling of the thumbnail images
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -150 : 150;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Toggle the visibility of the dealer's phone number
  const handleShowNumber = (): void => {
    setShowNumber(!showNumber);
  };

  // Handle toast notifications based on the action data
  useEffect(() => {
    if (!messageActionData) return;

    if ("success" in messageActionData && messageActionData.success === true) {
      toast.success(messageActionData.message || "Message sent to dealer successfully");
      // Reset the form after successful submission
      if (formRef.current) {
        formRef.current.reset()
      }
    }
    else if ("success" in messageActionData && messageActionData.success === false) {
      toast.error(messageActionData.message || messageActionData?.error || "Failed to send message to dealer");
    }

  }, [messageActionData])

  return (
    <React.Fragment>
      <LoadingIndicator isLoading={loading} />
      <div className="max__container mb-10 box-border p-4 md:p-10">
        <section className="mt-5 grid grid-cols-1 gap-4 md:gap-10 lg:grid-cols-12">
          {/* TOP: ASIDE LEFT - CAR INFO */}
          <aside className="col-span-12 flex flex-col gap-3 md:col-span-9">
            <Heading
              title={Cartitle}
              classNames="lg:text-[38px] text-[24px] uppercase"
            />
            {/* SUB HEADER */}
            <SubHeader car={car!} />
            {/* BIG IMAGE */}
            <BigImage
              imageUrl={
                (car?.images && car?.images[index]?.imageUrl!) || car?.image!
              }
              price={car?.price!}
            />

            {/* RENTAL PRICE BADGE / BANNER */}
            {car?.forRent && (
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-primary p-3 px-5 text-white shadow-md sm:flex-nowrap">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-white/20 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
                    For Rent
                  </span>
                  <span className="text-sm font-medium sm:text-base">
                    Daily Rental Rate Available
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold sm:text-2xl">
                    D{car?.pricePerDay.toLocaleString()}
                  </span>
                  <span className="text-xs font-medium opacity-90 sm:text-sm"> / day</span>
                </div>
              </div>
            )}

            {/* THUMBNAILS */}
            {/* THUMBNAILS */}
            <div className="relative w-full">
              {/* Left Arrow Button (Mobile only, shown if > 4 images) */}
              {(car?.images?.length ?? 0) > 4 && (
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  className="absolute -left-2 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-700 shadow-md md:hidden"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Thumbnails Row */}
              <div
                ref={scrollContainerRef}
                className="flex w-full flex-row gap-2 overflow-x-auto scroll-smooth py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:justify-between md:gap-4 md:overflow-visible"
              >
                {car?.images?.map((img, i) => (
                  <div
                    key={i}
                    className="w-[calc((100%-1.5rem)/4)] flex-shrink-0 md:w-full md:flex-shrink"
                  >
                    <ListingSmallImg
                      imageUrl={typeof img === "string" ? img : img.imageUrl!}
                      onClick={() => setIndex(i)}
                      className={`h-full w-full cursor-pointer object-cover ${i === index ? "border-4 border-yellow" : ""
                        }`}
                    />
                  </div>
                ))}
              </div>

              {/* Right Arrow Button (Mobile only, shown if > 4 images) */}
              {(car?.images?.length ?? 0) > 4 && (
                <button
                  type="button"
                  onClick={() => scroll("right")}
                  className="absolute -right-2 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-700 shadow-md md:hidden"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>

            {/* CAR INFO */}
            <ViewListingCarInfo car={car!} />
            <Divider />
            <ViewListingCarFeatures />
            <Divider />
            <SellerNote car={car!} />
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
            <ListingContactInfoBottom
              car={car!}
              showNumber={showNumber}
              handleShowNumber={handleShowNumber}
            />
            {/*BOTTOM: ASIDE RIGHT - FORM */}
            <MessageDealerForm formRef={formRef} isSubmitting={isSubmitting} messageActionData={messageActionData} />
          </aside>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ViewListing;

function SubHeader({ car }: { car: Car }) {
  const createdAtDate: Date = new Date(car?.createdAt!);
  const vinNumber = car?.vin ? `${car.vin.slice(0, -6)}******` : "N/A";

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
      <ListingSubHeader
        text={`stk# ${car.stockNumber}`}
        className="bg-muted"
      />
      <ListingSubHeader
        text={`vin#: ${vinNumber}`}
        className="bg-muted"
      />
      <ListingSubHeader
        text="schedule test drive"
        icon={<GrSchedule size={16} />}
      />
      <ListingSubHeader text="share this" icon={<MdShare size={16} />} />
    </div>
  );
}



const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const apiVersion = import.meta.env.VITE_API_VERSION || "/api/v1";

// Loader function to fetch car details based on carId from the URL params
export async function loader({ params }: LoaderFunctionArgs) {
  const { carId } = params;

  const car = await apiFetch(`${apiBaseUrl}${apiVersion}/cars/${carId}`);
  if (!car || !car.data) {
    return json({ car: null }, { status: 404 })
  }
  return json({ car: car.data });
}

// Action function to handle the form submission from MessageDealerForm
export async function action({ request, params }: LoaderFunctionArgs) {
  // 1. extract carId from params
  const { carId } = params

  if (!carId) {
    return json({ error: "Car ID is required" }, { status: 400 });
  }

  try {
    // 2. Read the incoming formdata
    const formData = await request.formData();
    const values = {
      content: formData.get("content")?.toString().trim(),
      senderName: formData.get("senderName")?.toString().trim(),
      senderEmail: formData.get("senderEmail")?.toString().trim(),
      senderPhone: formData.get("senderPhone")?.toString().trim(),
    };

    // 3. Validate the form data using the messageDealerSchema
    const validatedResult = messageDealerSchema.safeParse(values);
    if (!validatedResult.success) {
      const errors: Record<string, string> = {};
      for (const issue of validatedResult.error.issues) {
        const fieldName = issue.path[0] as string;
        errors[fieldName] = issue.message;
      }
      return json({ success: false, message: "Validation failed", error: "Validation failed!", errors, values }, { status: 400 });
    }

    // 4. Append the carId to the formData so that the backend knows which car the message is about
    formData.append("carId", carId);
    // 5. Call the service function to send the message to the dealer
    const result = await sendMessageToDealer(request, formData);
    // 6. Return a success response
    return json({ success: true, message: "Message sent to dealer successfully", result, error: null });
  } catch (error: any) {
    return json({ success: false, message: error.message || "Failed to send message to dealer", error: error.message || "Failed to send message to dealer" }, { status: 500 });
  }
}






