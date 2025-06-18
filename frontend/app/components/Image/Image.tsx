import { Car } from "~/interfaces";
import { cn } from "~/lib/utils";

const Image = ({ car, className }: { car: Car; className?: string }) => {
  return (
    <img
      src={car.imageUrl}
      alt={car.model}
      className={cn(`max-h-[70%] w-full bg-gray-200 object-cover ${className}`)}
    />
  );
};

export default Image;
