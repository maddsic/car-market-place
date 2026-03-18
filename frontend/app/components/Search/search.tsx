import { Form, useNavigate } from "@remix-run/react";
import { IoCarSportOutline } from "react-icons/io5";
import Button from "../Button/button";
import { TbZoomReset } from "react-icons/tb";
import { Fragment, useState } from "react";
import Select from "../Select/select";
import { useCarStore } from "~/store/carStore";

interface CarModel {
  id: string;
  name: string;
}

interface CarMake {
  id: string;
  name: string;
  CarModels: CarModel[];
}

const SearchInventory = () => {
  const { carMakes, carBodyTypes } = useCarStore();
  const [selectedMake, setSelectedMake] = useState<CarMake | null>(null);
  const [models, setModels] = useState<CarModel[]>([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    condition: "",
    carType: "",
    make: "",
    model: "",
  });

  // Change mode
  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const makeName = e.target.value;
    const foundMake = carMakes.find((make: CarMake) => make.name === makeName);

    if (foundMake) {
      setSelectedMake(foundMake);
      setModels(foundMake.CarModels || []);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build query params for selected filters
    const queryParams = new URLSearchParams();

    Object.entries(formData).forEach(([key, value]) => {
      if (value && value !== "all") queryParams.append(key, value);
    });

    // Navigate to /inventory with query params
    navigate(`/inventory?${queryParams.toString()}`);
  };

  return (
    <Fragment>
      <main className="absolute bottom-[28%] mx-auto box-border hidden max-w-full flex-col justify-between gap-5 rounded-2xl bg-primary px-5 py-10 text-white shadow md:bottom-[6%] md:left-[44px] md:flex md:max-w-[90%] lg:bottom-[6%] lg:right-10 lg:max-w-[75%] xl:max-w-[50%] 2xl:max-w-[50%]">
        <div className="mb-5 flex items-center gap-3">
          <IoCarSportOutline size={24} className="text-yellow" />
          <h2 className="font-sans text-xl">Search Inventory</h2>
        </div>

        <Form className="" onSubmit={handleSubmit} method="get">
          {/* CONDITION */}
          <div className="grid gap-2 overflow-visible md:grid-cols-4 lg:grid-cols-4">
            <Select
              name="condition"
              placeholder="Select Condition"
              className="z-10 block w-full rounded border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              value={formData.condition}
              onChange={handleMakeChange}
              options={[
                { label: "Certified Used", value: "certified_used" },
                { label: "New", value: "new" },
                { label: "Used", value: "used" },
              ]}
            />
            {/* BODY */}
            <Select
              name="carType"
              placeholder="Select Body"
              className="z-10 block w-full rounded border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              options={carBodyTypes.map((bodyType: any) => ({
                label: bodyType.typeName,
                value: bodyType.typeName,
                key: bodyType.typeId,
              }))}
            />
            {/* MAKE */}
            <Select
              name="make"
              placeholder="Select Make"
              value={formData.make}
              onChange={handleMakeChange}
              className="z-10 block w-full rounded border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              options={carMakes.map((make: CarMake) => ({
                label: make.name,
                value: make.name,
                key: make.id,
              }))}
            />
            {/* MODEL */}
            <Select
              name="model"
              placeholder="Select Model"
              value={formData.model}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  model: e.target.value,
                })
              }
              className="z-10 block w-full rounded border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              options={
                models && models.length > 0
                  ? models.map((model: CarModel) => ({
                      label: model.name,
                      value: model.name,
                      key: model.id,
                    }))
                  : [{ label: "All", value: "all", key: "all" }]
              }
            />
          </div>

          {/* BUTTONS */}
          <div className="mt-3 flex items-center justify-center gap-3 lg:flex">
            <Button
              type="submit"
              title="Search"
              className="bg-yellow transition-all duration-1000 hover:bg-yellow/70"
            />
            <span className="group relative">
              <Button
                type="reset"
                title={<TbZoomReset size={24} />}
                className="relative bg-red-500 transition-all duration-1000 hover:bg-red-500/70"
              />
            </span>
          </div>
        </Form>
      </main>
    </Fragment>
  );
};

export default SearchInventory;
