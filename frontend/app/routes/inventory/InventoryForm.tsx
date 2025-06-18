import { Form } from "@remix-run/react";
import React from "react";
import Button from "~/components/Button/button";
import { CarMake, CarModel } from "~/interfaces";

const InventoryForm = ({
  handleMakeChange,
  carMakes,
  models,
}: {
  handleMakeChange: () => void;
  carMakes: { id: string; name: string }[];
  models: { id: string; name: string }[];
}) => {
  return (
    <Form className="grid gap-4 p-5 lg:gap-6">
      {/* CONDITION */}
      <select
        name="condition"
        className="block w-full bg-muted p-2.5 text-sm capitalize text-gray-600 focus:border-none"
      >
        <option value="">condition</option>
        <option value="all">All</option>
        <option value="new">New</option>
        <option value="used">Used</option>
        <option value="certified_used">Certified USed</option>
      </select>

      {/* BODY */}
      <select
        name="body"
        className="block w-full bg-muted p-2.5 text-sm capitalize text-gray-600 focus:border-none"
      >
        <option value="">body</option>
        <option value="all">All</option>
      </select>

      {/* MAKE */}
      <select
        name="make"
        className="block w-full bg-muted p-2.5 text-sm capitalize text-gray-600 focus:border-none"
        onChange={handleMakeChange}
      >
        <option value="">Make</option>
        <option value="all">All</option>
        {carMakes.map((make: any) => (
          <option value={make.id} key={make.id}>
            {make.name}
          </option>
        ))}
      </select>

      {/* MODEL */}
      <select
        name="model"
        className="block w-full bg-muted p-2.5 text-sm capitalize text-gray-600 focus:border-none"
        onChange={handleMakeChange}
      >
        <option value="">Model</option>
        <option value="all">All</option>

        {models &&
          models.length > 0 &&
          models.map((model: CarModel) => (
            <option key={model.id} value={model.name}>
              {model.name}
            </option>
          ))}
      </select>

      {/* YEAR */}
      <select
        name="year"
        className="block w-full bg-muted p-2.5 text-sm capitalize text-gray-600 focus:border-none"
      >
        <option value="">year</option>
        <option value="all">All</option>
      </select>

      {/* transmission */}
      <select
        name="transmission"
        className="block w-full bg-muted p-2.5 text-sm capitalize text-gray-600 focus:border-none"
      >
        <option value="">transmission</option>
        <option value="all">All</option>
        <option value="petrol">automatic</option>
        <option value="gas">manual</option>
      </select>

      {/* LISTING STATUS */}
      <select
        name="listing_status"
        className="block w-full bg-muted p-2.5 text-sm capitalize text-gray-600 focus:border-none"
      >
        <option value="">listing status</option>
        <option value="active">active</option>
        <option value="sold">sold</option>
      </select>

      {/* button */}
      <Button
        title="reset all"
        classNames="bg-yellow w-full py-4 px-2 text-white font-bold tracking-wide"
      />
    </Form>
  );
};

export default InventoryForm;
