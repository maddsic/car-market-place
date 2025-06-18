import Heading from "~/components/Heading/heading";
import { Input } from "~/components/ui/input";

const CreateListingPrice = () => {
  return (
    <div className="relative mb-10 pt-5 md:py-10">
      {/* <Heading
        title="set your Asking price"
        classNames="lg:text-md uppercase pb-5"
      /> */}
      <Heading
        title="SET YOUR ASKING PRICE"
        classNames="uppercase lg:text-md"
      />

      <div className="flex flex-col gap-5 md:flex md:flex-row">
        <div className="w-full bg-primary p-10 md:w-1/3">
          <label
            htmlFor="price"
            className="font-body pb-3 font-bold capitalize text-white"
          >
            price*
          </label>
          <Input
            name="price"
            type="string"
            id="price"
            placeholder="Enter price"
            className="font-body"
          />
        </div>
        <div className="w-full md:flex-1">
          <Heading
            title="price your vehicle competitvely."
            classNames="lg:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm text-xs font-body uppercase"
          />
          <p className="gray__text-soft font-body">
            Determine a competitive price by comparing your vehicle's
            information and mileage to similar vehicles for sale by dealers and
            private sellers in your area. Then consider pricing your vehicle
            within range. Be sure to provide Seller's Comments and photos to
            highlight the best features of your vehicle, especially if your
            asking price is above average.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateListingPrice;
