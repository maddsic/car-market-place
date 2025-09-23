import React from "react";
import { FaGasPump, FaRoad, FaTruckMonster } from "react-icons/fa";
import { TbEngine } from "react-icons/tb";
import { GiSteeringWheel } from "react-icons/gi";
import { IoMdColorPalette } from "react-icons/io";
import DropDownIcon from "~/components/DropDownIcon/dropDownIcon";
import IconField from "~/components/IconField/icon";
import Select from "~/components/Select/select";
import { Input } from "~/components/ui/input";
import { SiTransmission } from "react-icons/si";
import { IoDocumentTextSharp } from "react-icons/io5";
import CreateListingLocation from "./createListingLocation";

type CreateListingInfoProps = {
  carBodyTypes: { id: string; typeName: string }[];
  formData: {
    errors: {
      bodyType: string;
      mileage: string;
      fuelType: string;
      engineType: string;
      transmission: string;
    };
  };
};

const CreateListingInfo: React.FC<CreateListingInfoProps> = ({
  carBodyTypes,
  formData,
}) => {
  return (
    <>
      <div className="relative grid gap-5 pt-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-5">
        {/* BODY => select */}
        <IconField
          icon={
            <FaTruckMonster
              size={20}
              className="transition duration-1000 ease-in-out group-hover:text-yellow"
            />
          }
          label="body*"
        >
          <Select
            name="carType"
            placeholder="Select Body"
            className="font-body gray__text-light w-full appearance-none border-none pl-5 text-xs outline-none"
            options={carBodyTypes.map((bodyType: any) => ({
              label: bodyType.typeName,
              value: bodyType.typeName,
              // key: bodyType.typeId,
            }))}
          />
          <DropDownIcon />
        </IconField>
        {/* MILEAGE => input */}
        <IconField
          icon={
            <FaRoad
              size={20}
              className="transition duration-1000 ease-in-out group-hover:text-yellow"
            />
          }
          label="Mileage*"
        >
          <Input
            name="mileage"
            className="input__bg font-body h-12 w-full rounded-none pl-5 text-xs outline-none"
            type="text"
            placeholder="Enter Mileage (mi)"
          />
        </IconField>
        {/* FUEL TYPE => select */}
        <IconField
          icon={
            <FaGasPump
              size={20}
              className="transition duration-1000 ease-in-out group-hover:text-yellow"
            />
          }
          label="fuel type*"
        >
          <Select
            name="fuelType"
            className="font-body gray__text-light w-full appearance-none border-none pl-5 text-xs outline-none"
            options={[
              { label: "Fuel Type", value: "" },
              { label: "Diesel", value: "Diesel" },
              { label: "Gasoline", value: "Gasoline" },
              { label: "Hybrid", value: "Hybrid" },
              { label: "Electric", value: "Electric" },
            ]}
          />
          {/* {formData?.errors?.fuelType && (
            <Error error={formData.errors.fuelType} />
          )} */}
          <DropDownIcon />
        </IconField>

        {/* ----------------SECOND ROW------------------- */}
        {/* ENGINE => input */}
        <IconField
          icon={
            <TbEngine
              size={20}
              className="transition duration-1000 ease-in-out group-hover:text-yellow"
            />
          }
          label="Engine*"
        >
          <Input
            name="engineType"
            className="input__bg font-body h-12 w-full rounded-none pl-5 text-xs outline-none"
            type="text"
            placeholder="eg v4"
          />
        </IconField>
        {/* TRANSMISSION  => select*/}
        <IconField
          icon={
            <SiTransmission
              size={16}
              className="transition duration-1000 ease-in-out group-hover:text-yellow"
            />
          }
          label="transmission*"
        >
          <Select
            name="transmission"
            className="font-body gray__text-light w-full appearance-none border-none text-xs outline-none"
            options={[
              { label: "Select Transmission", value: "" },
              { label: "Automatic", value: "Automatic" },
              { label: "Manual", value: "Manual" },
            ]}
          />
          {/* {formData?.errors?.transmission && (
            <Error error={formData.errors.transmission} />
          )} */}
          <DropDownIcon />
        </IconField>
        {/* DRIVE => select */}
        <IconField
          icon={
            <GiSteeringWheel
              size={20}
              className="transition duration-1000 ease-in-out group-hover:text-yellow"
            />
          }
          label="Drive"
        >
          <Select
            name="drive"
            className="font-body gray__text-light w-full appearance-none border-none pl-5 text-xs outline-none"
            options={[
              { label: "Select Drive", value: "" },
              { label: "4WD", value: "4WD" },
              { label: "AWD", value: "AWD" },
              { label: "FWD", value: "FWD" },
              { label: "RWD", value: "RWD" },
            ]}
          />
          <DropDownIcon />
        </IconField>

        {/* -------------THIRD ROW------------------------------ */}
        {/* EXTERIOR COLOR => input*/}
        <IconField
          icon={
            <IoMdColorPalette
              size={20}
              className="transition duration-1000 ease-in-out group-hover:text-yellow"
            />
          }
          label="Exterior color*"
        >
          <Input
            name="ext_color"
            className="input__bg font-body h-12 w-full rounded-none pl-5 text-xs outline-none"
            type="text"
            placeholder="Exterior Color"
          />
        </IconField>
        {/* INTERIOR COLOR */}
        <IconField
          icon={
            <IoMdColorPalette
              size={20}
              className="transition duration-1000 ease-in-out group-hover:text-yellow"
            />
          }
          label="interior color"
        >
          <Input
            name="int_color"
            className="input__bg font-body h-12 w-full rounded-none pl-5 text-xs outline-none"
            type="text"
            placeholder="Interior Color"
          />
        </IconField>
        {/* VIN */}
        <IconField
          icon={
            <IoDocumentTextSharp
              size={20}
              className="transition duration-1000 ease-in-out group-hover:text-yellow"
            />
          }
          label="VIN"
        >
          <Input
            name="vin"
            className="input__bg font-body h-12 w-full rounded-none pl-5 text-xs outline-none"
            type="text"
            placeholder="Enter Vin Number"
          />
        </IconField>
      </div>
      {/* LOCATION */}
      <CreateListingLocation />
    </>
  );
};

export default CreateListingInfo;
