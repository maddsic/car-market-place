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
  desc = "Verified Seller",
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-gray-200 hover:shadow-md",
        className
      )}
    >
      {/* Seller Avatar Container */}
      <div className="relative shrink-0">
        <img
          src={imgUrl}
          alt={name}
          className="h-16 w-16 rounded-full border-2 border-emerald-500/20 object-cover shadow-sm"
        />
        {/* Verified Status Avatar Overlay Badge */}
        <div
          className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md ring-2 ring-white"
          title="Verified Seller"
        >
          <MdOutlineVerifiedUser className="h-3.5 w-3.5" />
        </div>
      </div>

      {/* Seller Details */}
      <div className="flex flex-col items-start gap-1">
        <h3 className="text-base font-bold uppercase tracking-wide text-gray-900 md:text-lg">
          {name}
        </h3>

        {/* Verified Pill Badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
          <MdOutlineVerifiedUser className="h-3.5 w-3.5 text-emerald-600" />
          {desc}
        </span>
      </div>
    </div>
  );
};
