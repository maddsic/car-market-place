import { useEffect, useState } from "react";
import Select from "../Select/select";
import { CarMake, CarModel } from "~/interfaces";

interface ListingDetailsProps {
  carMakes: CarMake[];
  formData: {
    errors: {
      condition: string;
      make: string;
      model: string;
      year: number;
    };
  };
  initialData: {
    carId: string,
    condition?: string;
    make?: string;
    model?: string;
    year?: number;
  };
}

const CreateListingConditionMakeModelPrice: React.FC<ListingDetailsProps> = ({
  carMakes,
  formData,
  initialData
}) => {
  const [selectedMake, setSelectedMake] = useState<CarMake | null>(null);
  const [models, setModels] = useState<CarModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<CarModel | null>(null);
  const [availableYears, setAvailableYears] = useState<any[]>([]);

  // console.log("CAR MAKES", carMakes[0].CarModels)

  useEffect(() => {
    //  1. Check weather we are in edit mode
    if (initialData?.make && carMakes) {
      const foundMake = carMakes.find((make: any) => make.name.toLowerCase() === initialData?.make?.toLowerCase())

      if (foundMake) {
        setSelectedMake(foundMake);
        const makeModels = foundMake.CarModels || []
        setModels(makeModels)

        // 2. FIND THE MODELS FOR EDIT MODE
        const foundModels = makeModels.find(
          (model: any) => model.name.toLowerCase() === initialData.model?.toLowerCase()
        )
        if (foundModels) {
          setSelectedModel(foundModels)
          setAvailableYears(foundModels?.years || [])
        }
      }

    }
  }, [initialData, carMakes])

  //   Handles changes in the make selection
  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const makeName = e.target.value;
    const make = e.target.name;

    if (e.target.name.toLowerCase() === make.toLowerCase()) {
      const foundMake = carMakes.find(
        (make: CarMake) => make.name === makeName,
      );
      if (foundMake) {
        setSelectedMake(foundMake);
        setModels(foundMake.CarModels || []);
      }
    }
  };

  // UPDATE WHEN MODEL CHANGES
  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const modelName = e.target.value;
    const foundModel = models.find((model: any) => model.name === modelName)

    if (foundModel) {
      setSelectedModel(foundModel)
      setAvailableYears(foundModel?.years || [])
    } else {
      setSelectedModel(null)
      setAvailableYears([])
    }
  }


  return (
    <div className="relative grid gap-5 border bg-primary p-5 md:grid-cols-2 lg:grid-cols-4">
      <div className="flex flex-col gap-2">
        {" "}
        <p className="text-sm font-extrabold capitalize text-white">
          condition*
        </p>
        <Select
          key={initialData?.condition ? "loaded" : "loading"}
          name="condition"
          className="text-white"
          placeholder="Select Condition"
          defaultValue={initialData?.condition}
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
          defaultValue={initialData?.make}
          onChange={handleMakeChange}
          placeholder="Select Make"
          options={carMakes?.map((make: any) => ({
            label: make.name,
            value: make.name,
          }))}
        />
        {/* {formData?.errors?.make && <Error error={formData.errors.make} />} */}
      </div>
      {/* models */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-extrabold capitalize text-white">model*</p>
        <Select
          key={models.length}
          name="model"
          className="text-white"
          defaultValue={initialData?.model}
          onChange={handleModelChange}
          placeholder="Select Model"
          options={models?.map((model: CarModel) => ({
            label: model.name,
            value: model.name,
          }))}
        />
        {/* {formData?.errors?.model && <Error error={formData.errors.model} />} */}
      </div>
      {/* year */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-extrabold capitalize text-white">year*</p>
        <Select
          key={availableYears.length}
          name="year"
          defaultValue={initialData?.year}
          className="text-white"
          placeholder="Select Year"
          options={availableYears?.map((year: any) => ({
            label: year.year,
            value: year.year,
          }))}
        />
        {/* {formData?.errors?.year && <Error error={formData.errors.year} />} */}
      </div>
    </div>
  );
};

export default CreateListingConditionMakeModelPrice;
