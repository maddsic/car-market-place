import { FaArrowRightArrowLeft } from "react-icons/fa6";
import MapComponent from "../../components/Map/map";
import Contact from "../../components/listing/contact";
import { FaDollarSign } from "react-icons/fa";
import { MdMessage, MdWhatsapp } from "react-icons/md";
import Price from "../../components/Price/price";
import { Car } from "~/interfaces";
import { ListingSellerImage } from "./listingSeller";
import { Link } from "@remix-run/react";

export const ViewListingDealerContactInfoRight = ({ car }: { car: Car }) => {
  const fullname = `${car?.owner?.first_name} ${car?.owner?.last_name}`;
  return (
    <aside className="relative col-span-3 hidden flex-col gap-3 lg:flex">
      <Price
        price={Number(car?.price)}
        className="flex items-center justify-center border-b-8 border-b-gray-900 py-5 text-3xl"
      />
      {/* SELLER PIC */}
      <Link to={`/profile/${car?.owner?.userId}`} className="mt-5">
        <ListingSellerImage
          imgUrl="/sain.jpeg"
          name={fullname}
          className="h-22 w-22 border-b"
        />
      </Link>

      {/* CONTACT: WHATSAPP */}
      <Contact
        className="py-4 font-semibold leading-3 shadow"
        text="chat via whatsapp"
        icon={<MdWhatsapp size={28} fill="green" />}
      />

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
  );
};
