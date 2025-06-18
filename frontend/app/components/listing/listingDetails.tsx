import Select from "../Select/select";

interface ListingDetailsProps {
  carMakes: any[];
  models: any[];
  formData: {
    errors: {
      condition: string;
      make: string;
      model: string;
      year: string;
    };
  };
  onMakeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CreateListingDetails: React.FC<ListingDetailsProps> = ({
  carMakes,
  models,
  formData,
  onMakeChange,
}) => {
  return (
    <div className="relative grid gap-5 border bg-primary p-5 md:grid-cols-2 lg:grid-cols-4">
      <div className="flex flex-col gap-2">
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
        {/* {formData?.errors?.condition && (
          <Error error={formData.errors.condition} />
        )} */}
      </div>
      {/* MAKE */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-extrabold capitalize text-white">make*</p>
        <Select
          name="make"
          className="capitalize text-white"
          onChange={onMakeChange}
          placeholder="Select Make"
          options={carMakes.map((make: any) => ({
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
          name="model"
          className="text-white"
          placeholder="Select Model"
          options={models.map((model: any) => ({
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
          name="year"
          className="text-white"
          placeholder="Select Year"
          options={[{ label: "all", value: "all" }]}
        />
        {/* {formData?.errors?.year && <Error error={formData.errors.year} />} */}
      </div>
    </div>
  );
};

export default CreateListingDetails;
