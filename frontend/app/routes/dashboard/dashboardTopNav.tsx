import React from "react";
import { FaBell, FaEnvelope } from "react-icons/fa";

export const DashboardTopNav = () => {
  return (
    <div className="mb-5 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
      <h1 className="text-2xl font-semibold text-primary">
        Welcome Back, Kunta
      </h1>
      <div className="flex items-center gap-5">
        <button className="relative text-gray-500 transition hover:text-primary">
          <FaEnvelope size={22} />
          <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
            3
          </span>
        </button>
        <button className="relative text-gray-500 transition hover:text-primary">
          <FaBell size={22} />
          <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
            5
          </span>
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-white">
          D
        </div>
      </div>
    </div>
  );
};
