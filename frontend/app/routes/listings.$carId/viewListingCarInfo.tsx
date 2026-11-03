import { useState } from "react";
import { MdDirectionsCar, MdExpandMore, MdExpandLess } from "react-icons/md";
import { FaTruckMonster } from "react-icons/fa";
import { Car } from "~/interfaces";
import { CarDetail } from "./carDetail";

export const ViewListingCarInfo = ({ car }: { car: Car }) => {
  const [showAllMobile, setShowAllMobile] = useState(false);

  return (
    <div className="mb-5 mt-10 md:mt-5 lg:mt-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 2xl:grid-cols-4">
        {/* --- Primary specs (always visible everywhere) --- */}
        <CarDetail
          type="condition"
          value={car?.condition}
          icon={<MdDirectionsCar />}
        />
        <CarDetail
          type="body"
          value={car?.carType!}
          icon={<FaTruckMonster />}
        />
        <CarDetail
          type="make"
          value={car?.make!}
          icon={<MdDirectionsCar />}
        />
        <CarDetail
          type="model"
          value={car?.model!}
          icon={<MdDirectionsCar />}
        />

        {/* --- Secondary specs: hidden on mobile until toggled, always visible on md+ --- */}
        <div
          className={`${showAllMobile ? "contents" : "hidden"
            } md:contents`}
        >
          <CarDetail
            type="mileage"
            value={car?.mileage ? car.mileage.toLocaleString() + " km" : "N/A"}
            icon={<MdDirectionsCar />}
          />
          <CarDetail
            type="fuel type"
            value={car?.fuelType!}
            icon={<MdDirectionsCar />}
          />
          <CarDetail
            type="engine"
            value={car?.engineType!}
            icon={<MdDirectionsCar />}
          />
          <CarDetail
            type="year"
            value={car?.year!}
            icon={<MdDirectionsCar />}
          />
          <CarDetail
            type="transmission"
            value={car?.transmission!}
            icon={<MdDirectionsCar />}
          />
          <CarDetail
            type="drive"
            value={car?.drive}
            icon={<MdDirectionsCar />}
          />
          <CarDetail
            type="exterior"
            value={car?.ext_color! || "N/A"}
            icon={<MdDirectionsCar />}
          />
          <CarDetail
            type="interior"
            value={car?.int_color || "N/A"}
            icon={<MdDirectionsCar />}
          />
        </div>
      </div>

      {/* --- Toggle button: visible on mobile, hidden on tablet/desktop (md:hidden) --- */}
      <div className="mt-4 flex justify-center md:hidden">
        <button
          type="button"
          onClick={() => setShowAllMobile((prev) => !prev)}
          className="flex items-center gap-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100 active:scale-95"
        >
          <span>{showAllMobile ? "Show Less" : "Show More Details"}</span>
          {showAllMobile ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
        </button>
      </div>
    </div>
  );
};
