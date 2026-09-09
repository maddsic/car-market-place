import React, { useState } from "react";
import { Link } from "@remix-run/react";
import { Car, ExternalLink, MapPin, Phone, Star } from "lucide-react";
import { IoCarSport } from "react-icons/io5";

interface DealershipInfoProps {
  userId: string;
  username: string;
  address: string;
  phone: string;
  carsCount: number;
  reviewsCount?: number;
  avgRating?: number;
  avatarUrl?: string;
  query?: {
    condition?: string;
    make?: string;
    model?: string;
  };
}

const DisplayDealerInfo: React.FC<DealershipInfoProps> = ({
  userId,
  username,
  address,
  phone,
  carsCount,
  reviewsCount,
  avgRating,
  avatarUrl,
  query,
}) => {
  const [showFullNumber, setShowFullNumber] = useState(false);
  const profileUrl = `/profile/${userId}?condition=${query?.condition || ""}&make=${query?.make || ""
    }&model=${query?.model || ""}`;

  const handleShowNumber = () => {
    setShowFullNumber(true);
  };

  return (
    <main className="border-b border-gray-200 bg-white shadow-sm">
      <div className="max__container mx-auto p-2">
        <div className="flex flex-col gap-5 md:gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Section - Logo and Business Name */}
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <Link to={profileUrl} className="flex-shrink-0 cursor-pointer">
              {avatarUrl ? (
                <img
                  src={avatarUrl || "/placeholder.svg"}
                  alt={`${username} Avatar`}
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <div className="flex h-12 items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 shadow-xs">
                  <div className="h-full w-1.5 rounded-full bg-yellow" />
                  <div className="flex flex-col">
                    <span className="font-montserrat text-xs font-extrabold uppercase tracking-tight text-slate-900 leading-none">
                      {username}
                    </span>
                    <span className="text-[9px] font-semibold tracking-widest text-slate-400 uppercase leading-tight mt-0.5">
                      Verified Dealer
                    </span>
                  </div>
                </div>
              )}
            </Link>

            {/* Business Name and Reviews */}
            <div>
              <Link to={profileUrl} className="">
                <h1 className="text-lg font-bold text-gray-900 capitalize transition duration-1000 hover:text-yellow lg:text-xl">
                  {username}
                </h1>
              </Link>
              <div className="md:flex items-center space-x-1 text-sm text-gray-600 hidden">
                <span>({avgRating} Rating)</span>
                <div className="ml-2 flex items-center">
                  {[...Array(5)].map((_, i) => {
                    const ratingValue = Math.round(Number(avgRating) || 0);
                    return (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < ratingValue
                          ? "fill-current text-yellow"
                          : "text-gray-300"
                          }`}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="md:flex hidden items-center space-x-1 text-sm text-gray-600">
                <span>({reviewsCount} Reviews)</span>
              </div>
            </div>
          </div>

          {/* Right Section - Info Cards */}
          <div className="flex flex-col gap-4 sm:flex-row lg:gap-6">
            {/* Cars in Stock */}
            <Link
              to={profileUrl}
              className="flex items-center space-x-3 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3"
            >
              <div className="rounded-full bg-orange-500 p-2">
                <Car className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  {carsCount} New
                </div>
                <div className="text-sm font-medium text-orange-600">
                  Cars in stock
                </div>
              </div>
            </Link>

            {/* Phone Number */}
            <div className="flex items-center space-x-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <div className="rounded-full bg-gray-600 p-2">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  {showFullNumber ? "(+220) " + phone : "(+220) ***-****"}
                </div>
                {!showFullNumber && (
                  <button
                    onClick={handleShowNumber}
                    className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
                  >
                    Show number
                  </button>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
              <div className="rounded-full bg-blue-600 p-2">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">{address}</div>
                {/* open the map in a popup  */}
                <Link
                  to="/map"
                  className="inline-flex items-center space-x-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
                >
                  <span>See map</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-optimized bottom section */}
        <div className="mt-4 lg:hidden">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-1 text-sm text-gray-600 md:hidden">
              {/* <span>({avgRating} Rating)</span> */}
              <div className="ml-2 flex items-center">
                {[...Array(5)].map((_, i) => {
                  const ratingValue = Math.round(Number(avgRating) || 0);
                  return (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < ratingValue
                        ? "fill-current text-yellow"
                        : "text-gray-300"
                        }`}
                    />
                  );
                })}
              </div>
              <span>{avgRating} Rating</span>

            </div>
            <span>Open until 8:00 PM</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DisplayDealerInfo;
