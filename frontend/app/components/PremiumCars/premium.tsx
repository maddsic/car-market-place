import { useNavigate } from "@remix-run/react";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

import Heading from "../Heading/heading";
import Button from "../Button/button";
import Divider from "../Divider/divider";
import Price from "../Price/price";
import CarMakeAndModel from "../CarMakeAndModel/CarMakeAndModel";
import CarDescription from "../CarDescription/CarDescription";
import Image from "../Image/Image";

import { Car } from "~/interfaces";
import { useCarStore } from "~/store/carStore";

const PremiumCars = () => {
  const { premiumCars } = useCarStore();
  const navigate = useNavigate();

  const handleNavigate = (section: string, value: string) => {
    navigate(`/inventory?section=${section}&value=${value}`);
  };

  const handleNavigateToListings = (carId: string) => {
    navigate(`/listings/${carId}`);
  };

  // Helper to extract sanitized phone number
  const getCarPhoneNumber = (car: Car) => {
    const rawPhone = car.owner?.phone || "14707338533";
    const cleanPhone = rawPhone.replace(/\D/g, "");
    return cleanPhone.length === 10 ? `1${cleanPhone}` : cleanPhone;
  };

  // Direct Phone Call handler
  const handleCall = (e: React.MouseEvent, car: Car) => {
    e.stopPropagation();
    const phone = getCarPhoneNumber(car);
    window.location.href = `tel:+${phone}`;
  };

  // WhatsApp Chat handler
  const handleWhatsAppChat = (e: React.MouseEvent, car: Car) => {
    e.stopPropagation();
    const phone = getCarPhoneNumber(car);
    const message = `Hello, I'm interested in this ${car.year || ""} ${car.make} ${car.model} listed for D${car.price?.toLocaleString()} on GamAutos (ID: ${car.carId}). Is it still available?`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  // Helper to determine status badge style
  const getStatusStyles = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "sold":
        return "bg-red-500/90 text-white backdrop-blur-md";
      case "reserved":
        return "bg-amber-500/90 text-white backdrop-blur-md";
      case "pending":
        return "bg-orange-500/90 text-white backdrop-blur-md";
      default: // available
        return "bg-emerald-500/90 text-white backdrop-blur-md";
    }
  };

  return (
    <section className="max__container relative">
      <Heading
        title="Latest Premium"
        colouredText="Cars"
        classNames="text-center"
      />

      {/* CAR GRID */}
      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {(premiumCars || []).map((car) => (
          <div
            key={car.carId}
            onClick={() => handleNavigateToListings(car.carId)}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-yellow/30 hover:shadow-xl cursor-pointer"
          >
            <div>
              {/* IMAGE & BADGE CONTAINER */}
              <div className="relative overflow-hidden rounded-xl">
                {/* STATUS BADGE */}
                <div
                  className={`absolute right-3 top-3 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md ${getStatusStyles(
                    car.status
                  )}`}
                >
                  {car.status || "Available"}
                </div>

                {/* CAR IMAGE */}
                <div className="transition-transform duration-700 ease-out group-hover:scale-105">
                  <Image car={car as Car} />
                </div>

                {/* HOVER OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* MAKE, MODEL & PRICE */}
              <div className="mt-4 flex items-start justify-between gap-2 px-1">
                <div className="transition-colors group-hover:text-yellow">
                  <CarMakeAndModel car={car as Car} />
                </div>
                <Price price={car.price} className="origin-top-right scale-95 font-bold" />
              </div>

              {/* DESCRIPTION & SPECS */}
              <div className="mt-2 px-1 text-xs text-gray-500">
                <CarDescription car={car as Car} />
              </div>
            </div>

            {/* CARD BOTTOM ACTION ROW: CALL OR WHATSAPP */}
            <div className="mt-4">
              <hr className="mb-3 border-gray-100" />
              <div className="grid grid-cols-2 gap-2">
                {/* CALL BUTTON */}
                <button
                  type="button"
                  onClick={(e) => handleCall(e, car as Car)}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-xs font-bold text-slate-800 transition hover:bg-slate-100 active:scale-[0.98]"
                >
                  <FaPhoneAlt className="text-xs text-slate-600" />
                  <span>Call</span>
                </button>

                {/* WHATSAPP BUTTON */}
                <button
                  type="button"
                  onClick={(e) => handleWhatsAppChat(e, car as Car)}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500 py-2.5 px-3 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-600 active:scale-[0.98]"
                >
                  <FaWhatsapp className="text-sm" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW ALL BUTTON */}
      <div className="mt-10 flex w-full items-center justify-center">
        <Button
          onClick={() => handleNavigate("premium", "all")}
          title="show all premium cars"
          className="font-montserrat rounded-xl bg-yellow px-10 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-yellow/90 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:bg-primary"
        />
      </div>

      <Divider classNames="md:mb-10 mt-12" />
    </section>
  );
};

export default PremiumCars;
