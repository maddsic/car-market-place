import React from "react";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { cn } from "~/lib/utils";

interface ListingSellerProps {
  imgUrl: string;
  name: string;
  desc?: string;
  className?: string;
}

export const ListingSellerImage: React.FC<ListingSellerProps> = ({
  imgUrl,
  name,
  desc = "verified Seller",
  className,
}) => {
  return (
    <div
      className={cn(
        `flex items-center gap-4 border-gray-200 py-4 transition-colors duration-300 hover:bg-gray-50 ${className}`,
      )}
    >
      {/* Seller Image */}
      <div className="relative w-24">
        <img
          src={imgUrl}
          alt={name}
          className={cn(
            `h-16 w-16 rounded-full border-2 border-green-400 object-cover ${className}`,
          )}
        />
        {/* Optional badge to indicate verified status */}
        <div className="absolute bottom-0 right-0 rounded-full bg-green-500 p-1">
          <MdOutlineVerifiedUser size={16} className="text-white" />
        </div>
      </div>

      {/* Seller Info */}
      <div className="flex flex-col items-center justify-center">
        <h3 className="gray__text-dark text-xl font-semibold capitalize md:text-xl">
          {name}
        </h3>
        <span className="md:font-body flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 shadow lg:shadow-sm">
          <MdOutlineVerifiedUser size={16} className="text-green-600" />
          {desc}
        </span>
      </div>
    </div>
  );
};
