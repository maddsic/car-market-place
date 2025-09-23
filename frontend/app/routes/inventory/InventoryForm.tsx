import { Form } from "@remix-run/react";
import { useEffect, useState } from "react";
import Button from "~/components/Button/button";
import { CarMake, CarModel } from "~/interfaces";
import { useCarStore } from "~/store/carStore";

const InventoryForm = () => {
  const { carBodyTypes, carMakes, fetchCarData } = useCarStore();
  const [models, setModels] = useState<CarModel[]>([]);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
  });

  useEffect(() => {
    if (carBodyTypes.length === 0 || carMakes.length === 0) {
      fetchCarData();
    }
  }, [carBodyTypes, carMakes, fetchCarData]);

  // Handle Make change
  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const makeId = e.target.value;
    const foundMake = carMakes.find((make: any) => make.id === makeId);

    // Update formdata for the make and reset model
    setFormData({ ...formData, make: makeId, model: "" });

    if (foundMake) {
      setModels(foundMake.CarModels || []);
    } else {
      setModels([]);
    }
  };

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
        {carBodyTypes.map((bodyType: any) => (
          <option value={bodyType.typeName} key={bodyType.typeId} className="">
            {bodyType.typeName}
          </option>
        ))}
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
        className="w-full bg-yellow px-2 py-4 font-bold tracking-wide text-white"
      />
    </Form>
  );
};

export default InventoryForm;
