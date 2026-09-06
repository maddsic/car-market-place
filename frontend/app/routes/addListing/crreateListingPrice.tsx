import React from "react";
import Heading from "~/components/Heading/heading";
import { Input } from "~/components/ui/input";

interface CreateListingPriceProps {
  initialData?: {
    price?: number;
    forRent?: boolean;
    pricePerDay?: number;
  } | null;
}

const CreateListingPrice = ({ initialData }: CreateListingPriceProps) => {
  const [isForRent, setIsForRent] = React.useState<boolean>(initialData?.forRent || false);

  return (
    <div className="relative mb-10 pt-5 md:py-10">
      <Heading
        title="SET YOUR ASKING PRICE & RENTAL OPTIONS"
        classNames="uppercase lg:text-md"
      />

      <div className="flex flex-col gap-5 md:flex md:flex-row">
        <div className="flex w-full flex-col gap-5 bg-primary p-10 md:w-1/3">
          {/* SALE PRICE */}
          <div className="flex flex-col">
            <label
              htmlFor="price"
              className="font-body pb-3 font-bold capitalize text-white"
            >
              price (GMD)*
            </label>
            <Input
              name="price"
              type="number"
              defaultValue={initialData?.price || ""}
              id="price"
              placeholder="Enter price"
              className="font-body"
              required
            />
          </div>

          {/* FOR RENT CHECKBOX */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="forRent"
              name="forRent"
              value="true"
              checked={isForRent}
              onChange={(e) => setIsForRent(e.target.checked)}
              className="h-5 w-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <label
              htmlFor="forRent"
              className="font-body font-bold capitalize text-white"
            >
              Available for Rent
            </label>
          </div>

          {/* PRICE PER DAY (CONDITIONAL) */}
          {isForRent && (
            <div className="flex flex-col">
              <label
                htmlFor="pricePerDay"
                className="font-body pb-3 font-bold capitalize text-white"
              >
                Price Per Day (GMD)*
              </label>
              <Input
                name="pricePerDay"
                type="number"
                defaultValue={initialData?.pricePerDay || ""}
                id="pricePerDay"
                placeholder="Enter daily rental price"
                className="font-body"
                required={isForRent}
              />
            </div>
          )}
        </div>

        {/* SIDE CONTENT */}
        <div className="w-full md:flex-1">
          <Heading
            title="price your vehicle competitively."
            classNames="lg:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm text-xs font-body uppercase"
          />
          <p className="gray__text-soft font-body">
            Determine a competitive price by comparing your vehicle's
            information and mileage to similar vehicles for sale by dealers and
            private sellers in your area. Then consider pricing your vehicle
            within range. If you offer rental options, specify a competitive daily
            rate to attract short-term drivers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateListingPrice;
