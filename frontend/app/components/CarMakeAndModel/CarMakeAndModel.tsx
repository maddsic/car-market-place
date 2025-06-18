import { Car } from "~/interfaces";

const CarMakeAndModel = ({ car }: { car: Car }) => {
  return (
    <label className="labels flex flex-col">
      <p className="">{car.make}</p>
      <p className="font-semibold text-primary">{car.model}</p>
    </label>
  );
};

export default CarMakeAndModel;
