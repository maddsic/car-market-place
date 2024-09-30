import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import acura from "/cars_logos/acura.png";
import bmw from "/cars_logos/bmw.png";
import chevy from "/cars_logos/chevy.png";
import ford from "/cars_logos/ford.png";
import honda from "/cars_logos/honda.png";
import hyundai from "/cars_logos/hyundai.png";
import kia from "/cars_logos/kia.png";
import lexus from "/cars_logos/lexus.png";
import mazda from "/cars_logos/mazda.png";
import mercedes from "/cars_logos/mercedes.png";
import nissan from "/cars_logos/nissan.png";
import toyota from "/cars_logos/toyota.png";

const cars = [
  {
    id: 1,
    name: "Acura",
    img: acura,
  },
  {
    id: 2,
    name: "BMW",
    img: bmw,
  },
  {
    id: 3,
    name: "Chevrolet",
    img: chevy,
  },
  {
    id: 4,
    name: "Ford",
    img: ford,
  },
  {
    id: 5,
    name: "Honda",
    img: honda,
  },
  {
    id: 6,
    name: "Hyundai",
    img: hyundai,
  },
  {
    id: 7,
    name: "Kia",
    img: kia,
  },
  {
    id: 8,
    name: "Lexus",
    img: lexus,
  },
  // {
  //    id: 9,
  //    name: "Mazda",
  //    img: mazda,
  // },
  // {
  //    id: 10,
  //    name: "Mercedes",
  //    img: mercedes,
  // },
  // {
  //    id: 11,
  //    name: "Nissan",
  //    img: nissan,
  // },
  // {
  //    id: 12,
  //    name: "Toyota",
  //    img: toyota,
  // },
];

const BrowseBymake = () => {
  return (
    <main className="max__container hidden p-6 md:block">
      <div className="flex items-center justify-between">
        <h2 className="section_heading">
          Browse By <span className="text-yellow">Make</span>
        </h2>
        <div className="flex gap-4">
          <span className="cursor-pointer rounded-lg bg-gray-200 px-5 py-3 duration-1000 hover:bg-yellow">
            <FaArrowLeft className="text-gray-400" />
          </span>
          <span className="cursor-pointer rounded-lg bg-gray-200 px-5 py-3 duration-1000 hover:bg-yellow">
            <FaArrowRight className="text-gray-400" />
          </span>
        </div>
      </div>

      {/* <div className="w-full flex items-center justify-between mt-10 relative">
            {cars.map((make, id) => (
               <div key={id} className="hover:border w-44 flex flex-col gap-2 items-center justify-between p-2 ">
                  <img src={make.img} alt="Car Make" className="w-20" />
                  <p className="text-sm underline text-gray-500">{make.name}</p>
               </div>
            ))}
         </div> */}
      <div className="mt-10 grid grid-cols-3 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {cars.map((make) => (
          <div
            key={make.id}
            className="flex cursor-pointer flex-col items-center justify-center p-4 hover:border"
          >
            <img src={make.img} alt={make.name} className="mb-4 w-20" />
            <p className="text-lg font-medium text-gray-600">{make.name}</p>
          </div>
        ))}
      </div>

      <hr className="h-1 w-full bg-primary" />
    </main>
  );
};
export default BrowseBymake;
