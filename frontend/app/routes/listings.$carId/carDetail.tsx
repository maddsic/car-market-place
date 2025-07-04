import { ReactNode } from "react";

interface CarDetailProps {
  type: string;
  value: string | number;
  icon: ReactNode;
}

export const CarDetail: React.FC<CarDetailProps> = ({ type, value, icon }) => {
  return (
    <div className="grid grid-cols-12 gap-2 border-b pb-2">
      <span className="col-span-6 flex gap-1 md:col-span-5">
        {icon && <span className="text-yellow">{icon}</span>}
        <span className="gray__text-medium text-xs capitalize">{type}</span>
      </span>
      <span className="font-montserrat col-span-6 flex items-center gap-8 md:col-span-7">
        <span className="text-[14px] font-bold capitalize md:text-base">
          {value}
        </span>
      </span>
    </div>
  );
};
