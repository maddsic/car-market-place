import React, { useState } from "react";
import { Link } from "@remix-run/react";
import {
  FaArrowRight,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStar,
} from "react-icons/fa";

interface DealershipInfoProps {
  userId: string;
  username: string;
  address: string;
  phone: string;
  carsCount: number;
  reviewsCount?: number | string;
  avgRating?: number | string;
  avatarUrl?: string;
  isVerified?: boolean | number | string;
  createdAt?: string;
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
  isVerified,
  createdAt,
  query,
}) => {
  const [showNumber, setShowNumber] = useState(false);

  // The API can send these as text ("1.8") or 1/0, so convert them
  const rating = Number(avgRating) || 0;
  const reviews = Number(reviewsCount) || 0;
  const verified = Number(isVerified) === 1;
  const year = createdAt ? new Date(createdAt).getFullYear() : NaN;

  // Add the country code if the saved number does not have one
  const cleanPhone = (phone || "").replace(/\s/g, "");
  const callNumber = cleanPhone.startsWith("+") ? cleanPhone : `+220${cleanPhone}`;

  // Keep the search filters when opening the dealer's page
  const params = new URLSearchParams();
  if (query?.condition) params.set("condition", query.condition);
  if (query?.make) params.set("make", query.make);
  if (query?.model) params.set("model", query.model);
  const search = params.toString();
  const profileUrl = `/profile/${userId}${search ? `?${search}` : ""}`;

  return (
    <div className="flex flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow/40 hover:shadow-xl">
      {/* Top: logo, name, rating, area */}
      <div className="flex items-center gap-4">
        <Link to={profileUrl} className="shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${username} logo`}
              loading="lazy"
              className="h-20 w-20 rounded-full border-2 border-yellow/40 bg-white object-cover"
            />
          ) : (
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow text-3xl font-black text-slate-950">
              {username.charAt(0).toUpperCase()}
            </span>
          )}
        </Link>

        <div className="min-w-0">
          <Link to={profileUrl}>
            <h3 className="flex items-center gap-1.5 text-lg font-bold text-slate-900 transition-colors hover:text-yellow">
              <span className="truncate">{username}</span>
              {verified && (
                <FaCheckCircle
                  size={16}
                  className="shrink-0 text-sky-500"
                  title="Verified dealer"
                  aria-label="Verified dealer"
                />
              )}
            </h3>
          </Link>

          {reviews > 0 && rating > 0 ? (
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-600">
              <FaStar className="text-yellow" size={14} />
              <span className="font-bold text-slate-900">{rating.toFixed(1)}</span>
              <span className="text-slate-400">
                ({reviews} {reviews === 1 ? "review" : "reviews"})
              </span>
            </p>
          ) : (
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
              New dealer
            </p>
          )}

          {address && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
              <FaMapMarkerAlt className="shrink-0 text-yellow" size={12} />
              <span className="truncate">{address}</span>
            </p>
          )}
        </div>
      </div>

      {/* Middle: quick facts */}
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full bg-yellow/15 px-3 py-1 text-xs font-bold text-slate-900">
          {carsCount} {carsCount === 1 ? "car" : "cars"} in stock
        </span>
        {!Number.isNaN(year) && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            Member since {year}
          </span>
        )}
      </div>

      {/* Bottom: buttons */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <Link
          to={profileUrl}
          className="flex items-center justify-center gap-2 rounded-xl bg-yellow px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-950 transition hover:bg-amber-300 active:scale-95"
        >
          View cars
          <FaArrowRight size={11} />
        </Link>

        {showNumber ? (
          <a
            href={`tel:${callNumber}`}
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-xs font-bold text-white transition hover:bg-slate-800 active:scale-95"
          >
            <FaPhoneAlt size={11} />
            {callNumber}
          </a>
        ) : (
          <button
            type="button"
            onClick={() => setShowNumber(true)}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 transition hover:border-yellow hover:text-yellow active:scale-95"
          >
            <FaPhoneAlt size={11} />
            Show number
          </button>
        )}
      </div>
    </div>
  );
};

export default DisplayDealerInfo;
