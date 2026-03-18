import { FaGasPump, FaRoad } from "react-icons/fa";
import { SiTransmission } from "react-icons/si";
import { Car } from "~/interfaces";

const CarDescription = ({ car }: { car: Car }) => {
  return (
    <div className="mt-4 flex items-center gap-4 text-xs md:flex">
      <span className="flex items-center gap-1 text-muted-foreground">
        <FaRoad />
        <span>{car.mileage}</span>
        <span>mi</span>
      </span>
      <span className="flex items-center gap-1 text-muted-foreground">
        <FaGasPump />
        <span className="capitalize">{car.fuelType}</span>
      </span>
      <span className="flex items-center gap-1 text-muted-foreground">
        <SiTransmission />
        <span className="capitalize">{car.transmission}</span>
      </span>
    </div>
  );
};

export default CarDescription;
