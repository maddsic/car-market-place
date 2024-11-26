import React from "react";
import { MdOutlineVerifiedUser } from "react-icons/md";

interface ListingSellerProps {
  imgUrl: string;
  name: string;
  desc?: string;
}

const ListingSeller: React.FC<ListingSellerProps> = ({
  imgUrl,
  name,
  desc = "verified Seller",
}) => {
  return (
    <div className="flex items-center gap-4 border-b border-gray-200 py-4 transition-colors duration-300 hover:bg-gray-50">
      {/* Seller Image */}
      <div className="relative flex-shrink-0">
        <img
          src={imgUrl}
          alt={name}
          className="h-16 w-16 rounded-full border-2 border-green-400 object-cover"
        />
        {/* Optional badge to indicate verified status */}
        <div className="absolute bottom-0 right-0 rounded-full bg-green-500 p-1">
          <MdOutlineVerifiedUser size={16} className="text-white" />
        </div>
      </div>

      {/* Seller Info */}
      <div className="flex flex-col justify-center">
        <h3 className="text-lg font-semibold capitalize text-gray-800">
          {name}
        </h3>
        <span className="mt-1 flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 shadow-md md:text-xs">
          <MdOutlineVerifiedUser size={16} className="text-green-600" />
          {desc}
        </span>
      </div>
    </div>
  );
};

export default ListingSeller;
