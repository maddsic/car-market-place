import { LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { IoCarSportOutline } from "react-icons/io5";

import Button from "~/components/Button/button";
import Divider from "~/components/Divider/divider";
import Heading from "~/components/Header/heading";
import { FaArrowLeft, FaArrowRight, FaGasPump, FaRoad } from "react-icons/fa";
import { SiTransmission } from "react-icons/si";
import { cars } from "~/data/latestcars";
import Next from "~/components/PaginationRight/next";
import NextButton from "~/components/PaginationRight/next";
import PrevButton from "~/components/PaginationLeft/prev";

interface CarModel {
  id: string;
  name: string;
}

interface CarMake {
  id: string;
  name: string;
  CarModels: CarModel[];
}

export const loader: LoaderFunction = async () => {
  // const response = await fetch("http://localhost:8080/api/v1/cars/carmakes");
  const response = await fetch(
    "https://pumped-polliwog-fast.ngrok-free.app/api/v1/cars/carmakes",
  );
  const carMakes = await response.json();

  if (!carMakes.success) {
    throw new Response("Failed to fetch car makes", { status: 500 });
  }

  return carMakes.data;
};

const InventoryPage = () => {
  const [selectedMake, setSelectedMake] = useState<CarMake | null>(null);
  const [models, setModels] = useState<CarModel[]>([]);

  const [formData, setFormData] = useState({
    condition: "",
    body: "",
    make: "",
    model: "",
    year: "",
    transmission: "",
    listing_status: "",
  });
  const [startIndex, setStartIndex] = useState<number>(0);
  const [carsPerPage, setCarsPerPage] = useState<number>(0);
  const carMakes = useLoaderData<typeof loader>() || null;
  //   console.log(carMakes);

  const handleNext = () => {
    if (startIndex + 1 < cars.length - carsPerPage + 1) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const makeId = e.target.value;
    // console.log("zfghjkvbn");
    // console.log(makeId);

    const foundMake = carMakes.find((make: any) => make.id === makeId);
    // console.log("FOUND MAKE");
    // console.log(foundMake);

    if (foundMake) {
      setSelectedMake(foundMake);
      setModels(foundMake.CarModels || []);
    }
  };

  return (
    <div className="max__container relative mb-20">
      <div className="mt-14 grid-cols-12 gap-5 sm:grid">
        {/* SIDEBAR */}
        <aside className="sidebar col-span-3 mb-10 max-h-[650px] bg-white shadow-md shadow-gray-500 lg:shadow-xl">
          <div className="max-auto flex w-full items-center justify-center gap-4 bg-gray-900 px-2 py-6 text-white">
            <IoCarSportOutline size={30} className="text-extrabold" />
            <span className="font-bold capitalize">search options</span>
          </div>

          {/* FORM */}
          <Form className="grid gap-4 p-5 lg:gap-6">
            {/* CONDITION */}
            <select
              name="condition"
              className="block w-full bg-muted p-2.5 text-sm capitalize text-gray-600 focus:border-none"
              defaultValue={formData.condition}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  condition: e.target.value,
                })
              }
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
              defaultValue={formData.body}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  body: e.target.value,
                })
              }
            >
              <option value="">body</option>
              <option value="all">All</option>
            </select>

            {/* MAKE */}
            <select
              name="make"
              className="block w-full bg-muted p-2.5 text-sm capitalize text-gray-600 focus:border-none"
              defaultValue={formData.make}
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
              defaultValue={formData.model}
              onChange={handleMakeChange}
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
              defaultValue={formData.year}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  year: e.target.value,
                })
              }
            >
              <option value="">year</option>
              <option value="all">All</option>
            </select>

            {/* transmission */}
            <select
              name="transmission"
              className="block w-full bg-muted p-2.5 text-sm capitalize text-gray-600 focus:border-none"
              defaultValue={formData.transmission}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  transmission: e.target.value,
                })
              }
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
              defaultValue={formData.listing_status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  listing_status: e.target.value,
                })
              }
            >
              <option value="">listing status</option>
              <option value="active">active</option>
              <option value="sold">sold</option>
            </select>

            <Button
              title="reset all"
              classNames="bg-yellow w-full py-4 px-2 text-white font-bold tracking-wide"
            />
          </Form>
        </aside>

        {/*  CONTENT */}
        <div className="content sm:col-span-9">
          <Heading title="cars for sale" />
          <Divider classNames="h-[1px] mt-6" />

          <h2 className="mb-6 mt-6 text-xl font-semibold text-yellow">
            23 matches
          </h2>

          <Divider classNames="h-[1px]" />

          <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {cars.map((car) => (
              <div
                className="relative cursor-pointer overflow-clip"
                key={car.id}
              >
                {/* CAR IMAGE */}
                <img
                  src={car.img}
                  alt={car.model}
                  className="max-h-[70%] w-full"
                />

                {/*CAR TITLE */}
                <div className="mt-3 flex justify-between">
                  <label className="labels flex flex-col">
                    <p className="">{car.make}</p>
                    <p className="font-semibold text-primary">{car.model}</p>
                  </label>

                  {/* CAR PRICE */}
                  <span className="clip-path font-montserrat relative flex items-center bg-yellow px-5 py-0 text-[14px] font-extrabold text-white">
                    ${car.price}
                  </span>
                </div>

                {/* CAR DESCRIPTION */}
                <div className="mt-4 flex items-center gap-4 text-xs md:flex">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <FaRoad />
                    <span>{car.millage}</span>
                    <span>mi</span>
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <FaGasPump />
                    <span>{car.fuelType}</span>
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <SiTransmission />
                    <span>{car.transmission}</span>
                  </span>
                </div>

                <span className="rotate-diagonal z-999 font-montserrat absolute -left-5 top-4 bg-yellow px-12 py-2 text-xs font-semibold uppercase text-white">
                  special
                </span>

                <hr className="mt-3 border-gray-300" />
              </div>
            ))}
          </div>

          {/* TODO: PAGINATION */}
          <div className="mt-10 flex items-center justify-between">
            {/* PREV BUTTON */}
            <PrevButton startIndex={startIndex} handlePrev={handlePrev} />

            {/* PAGINATION PAGE NUMBERS */}
            <div className="flex items-center gap-2">
              <span className="rounded bg-gray-200 px-4 py-1 text-white">
                1
              </span>
              <span className="rounded bg-yellow px-4 py-1 text-white">2</span>
              <span className="rounded bg-yellow px-4 py-1 text-white">3</span>
            </div>

            {/* NEXT BUTTON */}
            <NextButton
              handleNext={handleNext}
              startIndex={startIndex}
              carsPerPage={carsPerPage}
              carsLength={cars.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
