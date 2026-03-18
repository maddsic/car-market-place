import { MdDirectionsCar } from "react-icons/md";
import { FaTruckMonster } from "react-icons/fa";
import { Car } from "~/interfaces";
import { CarDetail } from "./carDetail";

export const ViewListingCarInfo = ({ car }: { car: Car }) => {
  return (
    <div className="mb-5 mt-10 grid grid-cols-1 gap-4 md:mt-5 md:grid-cols-3 md:gap-5 lg:mt-10 2xl:grid-cols-4">
      {/* <SubHeading title="details" /> */}

      <CarDetail
        type="condition"
        value={car?.condition}
        icon={<MdDirectionsCar />}
      />
      <CarDetail type="body" value={car?.carType!} icon={<FaTruckMonster />} />
      <CarDetail type="make" value={car?.make!} icon={<MdDirectionsCar />} />
      {/* second row */}
      <CarDetail type="model" value={car?.model!} icon={<MdDirectionsCar />} />
      <CarDetail
        type="mileage"
        value={car?.mileage!}
        icon={<MdDirectionsCar />}
      />
      <CarDetail
        type="fuel type"
        value={car?.fuelType!}
        icon={<MdDirectionsCar />}
      />
      {/* third row */}
      <CarDetail
        type="engine"
        value={car?.engineType!}
        icon={<MdDirectionsCar />}
      />
      <CarDetail type="year" value={car?.year!} icon={<MdDirectionsCar />} />
      <CarDetail
        type="trans..."
        value={car?.transmission!}
        icon={<MdDirectionsCar />}
      />
      {/* forth row */}
      <CarDetail type="drive" value={car?.drive} icon={<MdDirectionsCar />} />
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
  );
};
