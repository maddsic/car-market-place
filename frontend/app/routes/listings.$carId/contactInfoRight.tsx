import { Link } from "@remix-run/react";
import { MdMessage, MdWhatsapp } from "react-icons/md";
import { ToggleShowNumber } from "~/components/ToggleNumber/toggleNumber";
import { Car } from "~/interfaces";
import { ListingSellerImage } from "./listingSeller";
import { Contact } from "~/components/listing";

export const ListingContactInfo = ({
  showNumber,
  handleShowNumber,
  car,
}: {
  showNumber: Boolean;
  handleShowNumber: () => void;
  car: Car;
}) => {
  return (
    <aside className="col-span-12 box-border md:col-span-5 lg:col-span-4">
      <div className="mt-5 border-t-4 border-t-gray-900 bg-white p-4 shadow md:my-10">
        {/* SELLER BIO */}
        <Link to={`/profile/${car?.owner?.userId}`}>
          <ListingSellerImage
            imgUrl="/sain.jpeg"
            name={`${car?.owner?.first_name} ${car?.owner?.last_name} `}
            className="h-22 w-22 border-b"
          />
        </Link>
        <div className="mb-5 flex flex-col gap-3">
          {/* PHONE # */}
          <ToggleShowNumber
            car={car!}
            showNumber={showNumber}
            handleShowNumber={handleShowNumber}
          />
          {/* WHATSAPP */}
          <Contact
            className="text-[13px] font-semibold shadow"
            text="chat via whatsapp"
            icon={
              <MdWhatsapp
                size={28}
                fill="green" // className="text-green-500"
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
  );
};
