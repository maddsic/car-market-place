import React, { useEffect, useState } from "react";
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

  const handleShowNumber = (): void => {
    setShowNumber(!showNumber);
  };

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
              title={car?.make + " " + car?.model}
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

            {/* THUMBNAILS */}
            <div className="relative flex flex-row justify-between gap-4">
              {car?.images &&
                car?.images?.map((img, i) => (
                  <ListingSmallImg
                    key={i}
                    imageUrl={img.imageUrl!}
                    onClick={() => setIndex(i)}
                    className={i === index ? "border-4 border-yellow" : ""}
                  />
                ))}
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
        text={`stock ${car.stockNumber}`}
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






