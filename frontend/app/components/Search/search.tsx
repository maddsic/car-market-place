import { Form } from "@remix-run/react";
import { IoCarSportOutline } from "react-icons/io5";
import Button from "../Button/button";
import { TbZoomReset } from "react-icons/tb";
import { Fragment, useState } from "react";
import { CloudCog } from "lucide-react";

interface CarModel {
  id: string;
  name: string;
}

interface CarMake {
  id: string;
  name: string;
  CarModels: CarModel[];
}

const SearchInventory = ({ carMakes }: { carMakes: [] }) => {
  const [selectedMake, setSelectedMake] = useState<CarMake | null>(null);
  const [models, setModels] = useState<CarModel[]>([]);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    price: "",
  });

  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const makeName = e.target.value;

    const foundMake = carMakes.find((make: CarMake) => make.name === makeName);
    console.log("found make");
    console.log(foundMake);

    if (foundMake) {
      setSelectedMake(foundMake);
      setModels(foundMake.CarModels || []);
    }
  };

  return (
    <Fragment>
      <main className="absolute bottom-[28%] mx-auto box-border hidden max-w-full flex-col justify-between gap-8 rounded bg-primary px-5 py-10 text-white shadow md:bottom-[6%] md:left-[44px] md:flex md:max-w-[90%] lg:bottom-[6%] lg:right-10 lg:max-w-[75%] xl:max-w-[50%] 2xl:max-w-[50%]">
        <div className="mb-5 flex items-center gap-3">
          <IoCarSportOutline size={24} className="text-yellow" />
          <h2 className="font-sans text-xl">Search Inventory</h2>
        </div>

        <Form className="grid gap-2 md:grid-cols-4 lg:grid-cols-4">
          <div className="">
            <select
              name="make"
              className="block w-full rounded border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              value={formData.make}
              onChange={handleMakeChange}
            >
              <option value="">Make</option>
              <option value="all">All</option>
              {carMakes.map((make: CarMake) => (
                <option key={make.id} value={make.name} className="capitalize">
                  {make.name}
                </option>
              ))}
            </select>
          </div>

          <div className="">
            <select
              name="model"
              className="block w-full rounded border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              value={formData.model}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  model: e.target.value,
                })
              }
            >
              <option value="">Models</option>
              <option value="all">All</option>

              {models &&
                models.length > 0 &&
                models.map((model: CarModel) => (
                  <option
                    key={model.id}
                    value={model.name}
                    className="capitalize"
                  >
                    {model.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="">
            <select
              name="price"
              className="block w-full rounded border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              defaultValue="Price"
            >
              <option value="">Price</option>
            </select>
          </div>
          {/* BUTTONS */}
          <span className="box-border flex items-center justify-center gap-1 lg:flex">
            <Button
              title="Search"
              classNames="bg-yellow hover:bg-yellow/70 transition-all duration-1000"
            />
            <span className="group relative">
              <Button
                title={<TbZoomReset size={24} />}
                classNames="bg-red-500 hover:bg-red-500/70 transition-all duration-1000 relative"
              />
              <span className="absolute left-1/2 m-4 mx-auto -translate-x-1/2 -translate-y-full rounded-md bg-gray-800 px-1 text-sm text-gray-100 opacity-0 transition-opacity group-hover:opacity-100">
                reset
              </span>
            </span>
          </span>
        </Form>
        {/* SELECTS */}
      </main>
    </Fragment>
  );
};

export default SearchInventory;
