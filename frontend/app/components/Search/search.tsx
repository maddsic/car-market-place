import { useMemo, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { IoCarSportOutline, IoSearch } from "react-icons/io5";
import { TbZoomReset } from "react-icons/tb";
import Button from "../Button/button";
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

const initialForm = { condition: "", carType: "", make: "", model: "" };

const fieldClass =
  "block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium text-slate-900 shadow-sm transition focus:border-yellow focus:outline-none focus:ring-2 focus:ring-yellow/40";

const SearchInventory = () => {
  const { carMakes, carBodyTypes } = useCarStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);

  // Models come straight from the selected make, so they can never go stale
  const models: CarModel[] = useMemo(
    () =>
      carMakes.find((make: CarMake) => make.name === formData.make)
        ?.CarModels ?? [],
    [carMakes, formData.make],
  );

  // One handler for every field. Changing the make clears the chosen model.
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "make" ? { model: "" } : {}),
    }));
  };

  const handleReset = () => setFormData(initialForm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      if (value && value !== "all") queryParams.append(key, value);
    });

    navigate(`/inventory?${queryParams.toString()}`);
  };

  return (
    // In normal page flow, pulled up over the bottom of the hero.
    // Works on every screen size (the old version was hidden on mobile).
    <section
      aria-label="Search inventory"
      className="relative z-20 mx-auto -mt-20 w-full max-w-6xl px-4 sm:px-6 md:-mt-24"
    >
      <div className="rounded-2xl border border-white/10 bg-primary/95 p-5 text-white shadow-2xl backdrop-blur-xl sm:p-7">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow/15 text-yellow">
            <IoCarSportOutline size={22} />
          </span>
          <div>
            <h2 className="text-lg font-bold leading-tight sm:text-xl">
              Search Inventory
            </h2>
            <p className="text-xs text-slate-400">
              Find your next car in seconds
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Select
              name="condition"
              placeholder="Select Condition"
              className={fieldClass}
              value={formData.condition}
              onChange={handleChange}
              options={[
                { label: "Certified Used", value: "certified_used" },
                { label: "New", value: "new" },
                { label: "Used", value: "used" },
              ]}
            />

            <Select
              name="carType"
              placeholder="Select Body"
              className={fieldClass}
              value={formData.carType}
              onChange={handleChange}
              options={carBodyTypes.map((bodyType: any) => ({
                label: bodyType.typeName,
                value: bodyType.typeName,
                key: bodyType.typeId,
              }))}
            />

            <Select
              name="make"
              placeholder="Select Make"
              className={fieldClass}
              value={formData.make}
              onChange={handleChange}
              options={carMakes.map((make: CarMake) => ({
                label: make.name,
                value: make.name,
                key: make.id,
              }))}
            />

            <Select
              name="model"
              placeholder="Select Model"
              className={fieldClass}
              value={formData.model}
              onChange={handleChange}
              options={
                models.length > 0
                  ? models.map((model: CarModel) => ({
                    label: model.name,
                    value: model.name,
                    key: model.id,
                  }))
                  : [{ label: "All", value: "all", key: "all" }]
              }
            />
          </div>

          <div className="mt-5 flex gap-3">
            <Button
              type="submit"
              title={
                <span className="flex items-center justify-center gap-2">
                  <IoSearch size={18} />
                  Search
                </span>
              }
              className="flex-1 rounded-xl bg-yellow py-3.5 text-sm font-black uppercase tracking-wider text-slate-950 shadow-lg transition-all duration-300 hover:bg-yellow/80 active:scale-95"
            />
            <Button
              type="button"
              onClick={handleReset}
              title={<TbZoomReset size={22} />}
              className="shrink-0 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-white transition-all duration-300 hover:border-red-400 hover:text-red-400 active:scale-95"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchInventory;
