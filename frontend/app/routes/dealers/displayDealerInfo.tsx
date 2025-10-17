import React, { useState } from "react";
import { Link } from "@remix-run/react";
import { Car, ExternalLink, MapPin, Phone, Star } from "lucide-react";

interface DealershipInfoProps {
  userId: string;
  username: string;
  address: string;
  phone: string;
  carsCount: number;
  reviewCount?: number;
  logoUrl?: string;
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
  reviewCount = 34, // Placeholder for review count
  logoUrl,
  query,
}) => {
  const [showFullNumber, setShowFullNumber] = useState(false);
  const profileUrl = `/profile/${userId}?condition=${query?.condition || ""}&make=${
    query?.make || ""
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
              {logoUrl ? (
                <img
                  src={logoUrl || "/placeholder.svg"}
                  alt={`${username} Logo`}
                  className="h-12 w-auto"
                />
              ) : (
                <div className="rounded-lg bg-gradient-to-br from-blue-600 to-purple-700 p-1 text-white shadow-lg">
                  <div className="text-center">
                    <div className="text-xs font-bold leading-tight">SS</div>
                    <div className="text-xs font-bold leading-tight">
                      JAMMEH
                    </div>
                    <div className="mt-1 border-t border-white/30 pt-1 text-[10px] font-semibold">
                      MOTORS
                    </div>
                  </div>
                </div>
              )}
            </Link>

            {/* Business Name and Reviews */}
            <div>
              <Link to={profileUrl} className="">
                <h1 className="text-lg font-bold text-gray-900 transition duration-1000 hover:text-yellow lg:text-xl">
                  {username}
                </h1>
              </Link>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <span>(Reviews {reviewCount})</span>
                <div className="ml-2 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < 4 ? "fill-current text-yellow" : "text-gray-300"}`}
                    />
                  ))}
                </div>
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
            <span className="flex items-center space-x-1">
              <Star className="text-yellow-400 h-4 w-4 fill-current" />
              <span>4.2 rating</span>
            </span>
            <span>Open until 8:00 PM</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DisplayDealerInfo;
