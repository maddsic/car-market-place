import { Link } from "@remix-run/react";
import { MdMessage, MdWhatsapp } from "react-icons/md";
import { ToggleShowNumber } from "~/components/ToggleNumber/toggleNumber";
import { Car } from "~/interfaces";
import { ListingSellerImage } from "./listingSeller";
import { Contact } from "~/components/listing";

interface ListingContactInfoBottomProps {
  showNumber: boolean;
  handleShowNumber: () => void;
  car: Car;
}

export const ListingContactInfoBottom = ({
  showNumber,
  handleShowNumber,
  car,
}: ListingContactInfoBottomProps) => {
  const profileImage = car?.owner?.avatarUrl || "/placeholder.png";
  const sellerName = car?.owner?.username || "Seller";

  // Clean the number (digits only)
  const phone = car?.owner?.phone ? String(car.owner.phone).replace(/\D/g, "") : "";
  // Add 220 if it's a standard 7-digit Gambia number
  const fullPhone = phone.length === 7 ? `220${phone}` : phone;

  // Short, clear WhatsApp message
  const carTitle = `${car?.year || ""} ${car?.make || ""} ${car?.model || ""}`.trim();
  const msg = encodeURIComponent(`Hi, I'm interested in the ${carTitle} listed on Gamautos.`);
  const whatsappUrl = fullPhone ? `https://wa.me/${fullPhone}?text=${msg}` : "";

  return (
    <aside className="col-span-12 box-border md:col-span-5 lg:col-span-4">
      <div className="mt-5 border-t-4 border-t-gray-900 bg-white p-4 shadow md:my-10">
        {/* SELLER BIO */}
        <Link to={`/profile/${car?.owner?.userId}`}>
          <ListingSellerImage
            imgUrl={profileImage}
            name={sellerName}
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
          {whatsappUrl && (
            <Contact
              href={whatsappUrl}
              text="chat via whatsapp"
              icon={<MdWhatsapp size={24} className="text-green-600" />}
            />
          )}

          {/* MESSAGE */}
          <Contact
            text="message us"
            icon={<MdMessage size={24} className="text-yellow" />}
          />
        </div>
      </div>
    </aside>
  );
};
