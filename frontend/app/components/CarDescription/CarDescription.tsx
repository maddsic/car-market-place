import { FaGasPump, FaRoad } from "react-icons/fa";
import { SiTransmission } from "react-icons/si";
import { Car } from "~/interfaces";

const CarDescription = ({ car }: { car: Car }) => {
  return (
    <div className="mt-4 flex items-center gap-4 text-xs md:flex">
      <span className="flex items-center gap-1 text-gray-700">
        <FaRoad />
        <span className=" text-gray-700 truncate">
          {car?.mileage ? car.mileage.toLocaleString() : 0} km
        </span>
      </span>
      <span className="flex items-center gap-1 text-gray-700">
        <FaGasPump />
        <span className="capitalize">{car.fuelType}</span>
      </span>
      <span className="flex items-center gap-1 text-gray-700">
        <SiTransmission />
        <span className="capitalize">{car.transmission}</span>
      </span>
    </div>
  );
};

export default CarDescription;
