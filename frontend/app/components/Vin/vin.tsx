import { Input } from "../ui/input";
import Button from "../Button/button";

const VinNumber = () => {
  return (
    <div className="flex w-full flex-col gap-4 py-8 lg:w-1/2 lg:py-10">
      <p className="gray__text-light font-montserrat text-base">
        Enter you <span className="uppercase">vin</span> to import vehicle
        details
      </p>
      {/* Input and Button */}
      <div className="flex flex-col gap-3 md:flex md:flex-row">
        <Input
          name="search_vin"
          className="input__bg w-full rounded-none pl-5 text-xs outline-none md:w-1/2 lg:text-sm"
          type="text"
          placeholder="Enter VIN..."
        />
        <Button title="APPLY" classNames="text-white px-12 block w-full" />
      </div>
    </div>
  );
};

export default VinNumber;
