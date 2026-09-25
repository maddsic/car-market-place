import { FaGasPump, FaRoad } from "react-icons/fa";
import { SiTransmission } from "react-icons/si";
import { Car } from "~/interfaces";

const CarDescription = ({ car }: { car: Car }) => {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-700">
      <span className="flex items-center gap-1 min-w-0">
        <FaRoad className="shrink-0 text-gray-500" />
        <span className="truncate">
          {car?.mileage ? car.mileage.toLocaleString() : 0} km
        </span>
      </span>
      <span className="flex items-center gap-1 shrink-0">
        <FaGasPump className="text-gray-500" />
        <span className="capitalize">{car?.fuelType || "N/A"}</span>
      </span>
      <span className="flex items-center gap-1 shrink-0">
        <SiTransmission className="text-gray-500" />
        <span className="capitalize">{car?.transmission || "N/A"}</span>
      </span>
    </div>
  );
};

export default CarDescription;
