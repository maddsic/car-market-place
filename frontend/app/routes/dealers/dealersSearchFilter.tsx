import { Form, useNavigate, useNavigation } from "@remix-run/react";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import Button from "~/components/Button/button";
import Loader from "~/components/Loader/loader";
import Select from "~/components/Select/select";
// import { Select } from "~/components/ui/select";
import { CarMake, CarModel } from "~/interfaces";

interface DealersSearchFilterProps {
  carMakes: any[];
}

const DealersSearchFilter: React.FC<DealersSearchFilterProps> = ({
  carMakes,
}) => {
  const [selectedMAke, setSelectedMake] = useState<CarMake | null>(null);
  const [models, setModels] = useState<CarModel[]>([]);
  const navigation = useNavigation();
  const loading = navigation?.state === "loading";

  if (loading) {
    return <Loader />;
  }

  //   Handles changes in the make selection
  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const makeName = e.target.value;
    const make = e.target.name;

    if (e.target.name === make) {
      const foundMake = carMakes.find(
        (make: CarMake) => make.name === makeName,
      );
      if (foundMake) {
        setSelectedMake(foundMake);
        setModels(foundMake.CarModels || []);
      }
    }
  };

  return (
    <Form
      className="relative grid gap-5 border bg-primary p-5 md:grid-cols-2 lg:grid-cols-4"
      // onSubmit={handleSubmit}
      method="get"
      action="/dealers"
    >
      <div className="flex flex-col gap-2">
        {" "}
        <p className="text-sm font-extrabold capitalize text-white">
          condition*
        </p>
        <Select
          name="condition"
          className="text-white"
          placeholder="Select Condition"
          options={[
            { label: "Certified Used", value: "certified_used" },
            { label: "New", value: "new" },
            { label: "Used", value: "used" },
          ]}
        />
      </div>
      {/* MAKE */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-extrabold capitalize text-white">make*</p>
        <Select
          name="make"
          className="capitalize text-white"
          onChange={handleMakeChange}
          placeholder="Select Make"
          options={carMakes?.map((make: any) => ({
            label: make.name,
            value: make.name,
          }))}
        />
      </div>
      {/* models */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-extrabold capitalize text-white">model*</p>
        <Select
          name="model"
          className="text-white"
          placeholder="Select Model"
          options={models?.map((model: any) => ({
            label: model.name,
            value: model.name,
          }))}
        />
      </div>
      {/* year */}
      <div className="mt-7 flex flex-col gap-2">
        <Button title="find dealer" icon={<SearchIcon />} className="p-3" />
      </div>
    </Form>
  );
};

export default DealersSearchFilter;
