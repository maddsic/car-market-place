import { Link } from "@remix-run/react";

// COMPONENT

// ICONS
import { IoCarSportOutline } from "react-icons/io5";

import { FcSearch } from "react-icons/fc";
import { AiFillDollarCircle } from "react-icons/ai";
import Button from "../Button/button";

const Highlight = () => {
  return (
    <div className="relative w-full bg-gray-900 bg-[url(/latest_cars/x7.jpg)] bg-center object-cover p-3 md:p-7 lg:max-h-[calc(100vh-500px)] lg:p-10">
      <div className="max__container relative h-full">
        <div className="z-10 grid h-full grid-cols-1 gap-5 p-3 lg:grid-cols-2 lg:gap-10">
          {/* LOOKING FOR A CAR */}
          <div className="max-w-content relative flex flex-col justify-between gap-5 overflow-hidden bg-card p-5 md:p-10 lg:p-6">
            <div className="relative">
              <IoCarSportOutline size={80} className="text-extrabold" />
              <FcSearch
                size={50}
                className="z-999 absolute -left-2 bottom-0 md:-left-8 lg:-left-4"
              />
            </div>
            <h3 className="font-montserrat text-[24px] font-extrabold uppercase md:text-[32px]">
              looking for a car
            </h3>
            <p className="text-muted-foreground">
              Our cars are delivered fully-registered with all requirements
              completed. We will deliver your car wherever you are.
            </p>
            <Link to="/inventory">
              <Button
                title="Inventory"
                classNames="text-white font-montserrat hover:bg-yellow"
              />
            </Link>
          </div>
          {/* SELL YOUR CAR */}
          <div className="relative flex max-w-full flex-col justify-between gap-5 overflow-hidden bg-card bg-yellow p-5 md:p-10 lg:p-6">
            <div className="relative ml-7 md:ml-4">
              <IoCarSportOutline size={80} className="text-extrabold" />
              <AiFillDollarCircle
                size={50}
                className="z-999 absolute -left-4 bottom-0 -ml-3 md:-left-8 md:-ml-1"
              />
            </div>
            <h3 className="font-montserrat text-[24px] font-extrabold uppercase md:text-[32px]">
              want to sell A car
            </h3>
            <p className="text-white">
              Our cars are delivered fully-registered with all requirements
              completed. We will deliver your car wherever you are.
            </p>
            <Link to="/">
              <Button
                title="sell your car"
                classNames="text-white font-montserrat hover:bg-gray-900"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Highlight;
