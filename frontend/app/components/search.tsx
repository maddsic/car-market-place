import { Form } from "@remix-run/react";
import { IoCarSportOutline } from "react-icons/io5";
import Button from "./button";
import { TbZoomReset } from "react-icons/tb";

const SearchInventory = () => {
   return (
      <main className="bg-primary text-white w-full md:w-[90%] lg:w-1/2 mx-auto px-5 py-10 md:flex flex-col justify-between gap-8 absolute bottom-[28%] md:bottom-[10%] lg:bottom-[10%] md:left-[44px] lg:left-1/4 shadow-lg rounded">
         <div className="flex items-center gap-3 mb-5">
            <IoCarSportOutline size={24} className="text-yellow" />
            <h2 className="text-xl font-sans">Search Inventory</h2>
         </div>

         <Form className="grid md:grid-cols-4 lg:grid-cols-4 gap-2">
            <div className="">
               <select
                  name="make"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  defaultValue="Make"
               >
                  <option value="">Make</option>
               </select>
            </div>

            <div className="">
               <select
                  name="model"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  defaultValue="Model"
               >
                  <option value="">Model</option>
               </select>
            </div>

            <div className="">
               <select
                  name="price"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  defaultValue="Price"
               >
                  <option value="">Price</option>
               </select>
            </div>
            <span className="flex items-center justify-center gap-1 lg:flex">
               <Button title="Search" classNames="bg-yellow hover:bg-yellow/70 transition-all duration-1000" />
               <span className="relative group ">
                  <Button title={<TbZoomReset size={24} />} classNames="bg-red-500 hover:bg-red-500/70 transition-all duration-1000 relative" />
                  <span
                     className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 
                           -translate-x-1/2 -translate-y-full opacity-0 m-4 mx-auto"
                  >
                     reset
                  </span>
               </span>
            </span>
         </Form>
         {/* SELECTS */}
      </main>
   );
};

export default SearchInventory;
