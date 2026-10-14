import React, { useState } from "react";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { cn } from "~/lib/utils";

interface ListingSellerProps {
  imgUrl?: string;
  name: string;
  desc?: string;
  isVerified?: boolean;
  className?: string;
}

export const ListingSellerImage: React.FC<ListingSellerProps> = ({
  imgUrl,
  name,
  desc = "Verified Dealer",
  isVerified = true,
  className,
}) => {
  const [imgError, setImgError] = useState(false);
  const initials = name ? name.trim().charAt(0).toUpperCase() : "U";

  return (
    <div
      className={cn(
        "flex items-center gap-3.5 rounded-xl border border-gray-150 bg-white p-3.5 shadow-xs transition hover:border-gray-300 hover:shadow-sm",
        className
      )}
    >
      {/* Seller Avatar */}
      <div className="relative shrink-0">
        {imgUrl && !imgError ? (
          <img
            src={imgUrl}
            alt={name}
            onError={() => setImgError(true)}
            className="h-14 w-14 rounded-full border border-gray-200 object-cover bg-gray-50"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg border border-primary/20">
            {initials}
          </div>
        )}

        {/* Small verified check on avatar */}
        {isVerified && (
          <span
            className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs ring-2 ring-white"
            title="Verified Seller"
          >
            <MdOutlineVerifiedUser className="h-3 w-3" />
          </span>
        )}
      </div>

      {/* Seller Details */}
      <div className="flex flex-col min-w-0 flex-1">
        <h3 className="truncate text-sm sm:text-base font-bold text-gray-900 tracking-tight">
          {name}
        </h3>

        {/* Status / Role pill */}
        <div className="mt-1 flex items-center">
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200/60">
            {desc}
          </span>
        </div>
      </div>
    </div>
  );
};
