import { MdLocationPin } from "react-icons/md";
import Heading from "~/components/Heading/heading";
import IconField from "~/components/IconField/icon";
import { Input } from "~/components/ui/input";

const CreateListingLocation = () => {
  return (
    <div className="location pt-10">
      <Heading
        title="Listing Item location"
        classNames="text-sm font-light lg:text-[20px] mb-5"
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {/* LOCATION */}
        <IconField
          icon={
            <MdLocationPin
              size={20}
              className="transition duration-1000 ease-in-out group-hover:text-yellow"
            />
          }
          label="location*"
        >
          <Input
            name="location"
            className="input__bg font-body h-12 w-full rounded-none pl-5 text-xs outline-none"
            type="text"
            placeholder="Enter ZIP or Address"
          />
        </IconField>
        {/* LATITUDE */}
        <IconField
          icon={
            <MdLocationPin
              size={20}
              className="transition duration-1000 ease-in-out group-hover:text-yellow"
            />
          }
          label="latitude"
        >
          <Input
            name="lat"
            className="input__bg font-body h-12 w-full rounded-none pl-5 text-xs outline-none"
            type="text"
            disabled
            placeholder="Enter Latitude"
          />
        </IconField>
        {/* LONGITUTE */}
        <IconField
          icon={
            <MdLocationPin
              size={20}
              className="transition duration-1000 ease-in-out group-hover:text-yellow"
            />
          }
          label="longitude"
        >
          <Input
            name="lng"
            className="input__bg font-body h-12 w-full rounded-none pl-5 text-xs outline-none"
            type="text"
            disabled
            placeholder="Enter Longitude"
          />
        </IconField>
      </div>
    </div>
  );
};

export default CreateListingLocation;
