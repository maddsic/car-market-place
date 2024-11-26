import { ReactNode } from "react";
import { MdDirectionsCar } from "react-icons/md";

interface CarDetailProps {
  type: string;
  value: string | number;
  icon: ReactNode;
}

const CarDetail: React.FC<CarDetailProps> = ({ type, value, icon }) => {
  return (
    <div className="grid grid-cols-12 gap-2 border-b pb-2">
      <span className="col-span-5 flex gap-1">
        {icon && <span className="text-yellow">{icon}</span>}
        <span className="gray__text-medium text-xs capitalize">{type}</span>
      </span>
      <span className="font-montserrat col-span-7 flex items-center gap-8">
        <span className="text-[14px] font-bold capitalize md:text-base">
          {value}
        </span>
      </span>
    </div>
  );
};

export default CarDetail;
