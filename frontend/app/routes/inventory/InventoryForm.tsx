import { Form } from "@remix-run/react";
import { useEffect, useState } from "react";
import Button from "~/components/Button/button";
import { useCarStore } from "~/store/carStore";
import { CarModel } from "~/store/carStoreInterfaces";

// Generate years 2026 down to 2000
const START_YEAR = 2000;
const END_YEAR = 2026;
const YEARS = Array.from(
  { length: END_YEAR - START_YEAR + 1 },
  (_, i) => END_YEAR - i
);

const InventoryForm = () => {
  const { carBodyTypes, carMakes, fetchCarData } = useCarStore();
  const [models, setModels] = useState<CarModel[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");

  useEffect(() => {
    if (carBodyTypes.length === 0 || carMakes.length === 0) {
      fetchCarData();
    }
  }, [carBodyTypes, carMakes, fetchCarData]);

  // Handle Make change
  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    // Handles either make.name or make.id depending on what <option value="..."> provides
    const foundMake = carMakes.find(
      (make) => make.name === selectedValue || String(make.id) === selectedValue
    );

    if (foundMake) {
      setSelectedMake(foundMake.name);
      setModels(foundMake.CarModels || []);
    } else {
      // Clears models if user selects "all", empty option, or resets
      setSelectedMake("");
      setModels([]);
    }
  };

  const handleReset = () => {
    setSelectedMake("");
    setSelectedModel("");
    setModels([]);
  };

  return (
    <Form method="get" className="grid gap-4 p-5 lg:gap-6">
      {/* CONDITION */}
      <select
        name="condition"
        defaultValue=""
        className="block w-full rounded-md border border-gray-200 bg-muted p-2.5 text-sm capitalize text-gray-700 focus:outline-none focus:ring-1 focus:ring-yellow-500"
      >
        <option value="">Condition</option>
        <option value="all">All</option>
        <option value="new">New</option>
        <option value="used">Used</option>
        <option value="certified_used">Certified Used</option>
      </select>

      {/* BODY */}
      <select
        name="body"
        defaultValue=""
        className="block w-full rounded-md border border-gray-200 bg-muted p-2.5 text-sm capitalize text-gray-700 focus:outline-none focus:ring-1 focus:ring-yellow-500"
      >
        <option value="">Body</option>
        <option value="all">All</option>
        {carBodyTypes.map((bodyType: any) => (
          <option value={bodyType.typeName} key={bodyType.typeId}>
            {bodyType.typeName}
          </option>
        ))}
      </select>

      {/* MAKE */}
      <select
        name="make"
        value={selectedMake}
        onChange={handleMakeChange}
        className="block w-full rounded-md border border-gray-200 bg-muted p-2.5 text-sm capitalize text-gray-700 focus:outline-none focus:ring-1 focus:ring-yellow-500"
      >
        <option value="">Make</option>
        <option value="all">All</option>
        {carMakes.map((make) => (
          <option value={make.name} key={make.id}>
            {make.name}
          </option>
        ))}
      </select>

      {/* MODEL */}
      <select
        name="model"
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        disabled={!selectedMake || selectedMake === "all"}
        className="block w-full rounded-md border border-gray-200 bg-muted p-2.5 text-sm capitalize text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-1 focus:ring-yellow-500"
      >
        <option value="">Model</option>
        <option value="all">All</option>
        {models.map((model: CarModel) => (
          <option key={model.id} value={model.name}>
            {model.name}
          </option>
        ))}
      </select>

      {/* YEAR (2000 - 2026) */}
      <select
        name="year"
        defaultValue=""
        className="block w-full rounded-md border border-gray-200 bg-muted p-2.5 text-sm capitalize text-gray-700 focus:outline-none focus:ring-1 focus:ring-yellow-500"
      >
        <option value="">Year</option>
        <option value="all">All</option>
        {YEARS.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* TRANSMISSION */}
      <select
        name="transmission"
        defaultValue=""
        className="block w-full rounded-md border border-gray-200 bg-muted p-2.5 text-sm capitalize text-gray-700 focus:outline-none focus:ring-1 focus:ring-yellow-500"
      >
        <option value="">Transmission</option>
        <option value="all">All</option>
        <option value="automatic">Automatic</option>
        <option value="manual">Manual</option>
      </select>


      {/* BUTTON ACTIONS */}
      <div className="flex gap-2 pt-2">
        <button
          type="reset"
          onClick={handleReset}
          className="w-1/2 rounded border border-gray-300 py-3 text-xs font-semibold uppercase tracking-wider text-gray-700 transition hover:bg-gray-100"
        >
          Reset All
        </button>
        <Button
          type="submit"
          title="Apply Filters"
          className="w-1/2 bg-yellow py-3 text-xs font-bold uppercase tracking-wider text-white"
        />
      </div>
    </Form>
  );
};

export default InventoryForm;
