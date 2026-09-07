import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useFetcher, useNavigate } from "@remix-run/react";
import { getDealerDashboardInventory } from "~/service/dealer.server";

import {
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineCheckCircle,
  HiOutlineRefresh,
  HiOutlineExclamation,
  HiChevronLeft,
  HiChevronRight
} from "react-icons/hi";
import { deleteVehicle, updateVehicleStatus } from "~/service/car.server";
import React, { useState } from "react";
import { getAuthToken } from "~/utils/authHelpers";
import { Car } from "~/interfaces";

export default function InventoryDashboard() {
  const { cars, error } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [carsPerPage] = useState<number>(8); // Adjust cars shown per page

  if (error) {
    return (
      <div className="p-4 sm:p-8 text-red-600 bg-red-50 rounded-lg max-w-7xl mx-auto my-6">
        {error}
      </div>
    );
  }

  // Calculate Pagination Indices
  const totalCars = cars.length;
  const totalPages = Math.ceil(totalCars / carsPerPage);
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto text-slate-900">

        {/* Responsive Header */}
        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Fleet Inventory 🏢</h1>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">Real-time management of your dealership stock.</p>
          </div>
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-xs self-start sm:self-auto">
            <span className="text-xs font-bold text-slate-400 uppercase block">Total Stock</span>
            <span className="text-xl font-black">{totalCars}</span>
          </div>
        </header>

        {/* CONDITION AREA */}
        {totalCars > 0 ? (
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
            {/* Desktop / Tablet Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-0">
                <thead>
                  <tr className="bg-slate-50/80">
                    <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200">Vehicle Details</th>
                    <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200">Technical Specs</th>
                    <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200">Market Value</th>
                    <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 text-right">Status Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentCars.map((car: Car) => (
                    <InventoryRow key={car.carId} car={car} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Layout Fallback (< md) */}
            <div className="md:hidden divide-y divide-slate-100">
              {currentCars.map((car: Car) => (
                <MobileInventoryCard key={car.carId} car={car} />
              ))}
            </div>

            {/* --- PAGINATION CONTROLS --- */}
            {totalPages > 1 && (
              <div className="px-5 py-4 bg-slate-50/80 border-t border-slate-200 flex items-center justify-between flex-wrap gap-4">
                <div className="text-xs font-semibold text-slate-500">
                  Showing <span className="text-slate-900 font-bold">{indexOfFirstCar + 1}</span> to{" "}
                  <span className="text-slate-900 font-bold">{Math.min(indexOfLastCar, totalCars)}</span> of{" "}
                  <span className="text-slate-900 font-bold">{totalCars}</span> vehicles
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    aria-label="Previous Page"
                  >
                    <HiChevronLeft size={18} />
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNum = index + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currentPage === pageNum
                              ? "bg-indigo-600 text-white shadow-xs"
                              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    aria-label="Next Page"
                  >
                    <HiChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-8 sm:p-12 md:p-20 text-center flex flex-col items-center max-w-xl mx-auto mt-4 sm:mt-8">
            <div className="text-4xl sm:text-5xl mb-4">🚗✨</div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">Your lot is completely empty!</h2>
            <p className="text-slate-500 mt-2 text-sm max-w-sm leading-relaxed">
              There are currently no active listings in your inventory. Ready to scale your fleet and attract potential buyers?
            </p>
            <button
              onClick={() => navigate("/addListing")}
              className="mt-6 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-indigo-100 active:scale-95"
            >
              + Create First Listing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// DESKTOP TABLE ROW COMPONENT
function InventoryRow({ car }: { car: Car }) {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const handleDelete = () => {
    fetcher.submit(
      { intent: "delete", carId: car.carId },
      { method: "post" }
    );
    setShowDeleteModal(false);
  };

  const currentStatus = fetcher.formData?.get("status") || car.status;
  const isSold = currentStatus === "sold";
  const isUpdating = fetcher.state !== "idle";

  return (
    <>
      <tr className={`group transition-all ${isSold ? "bg-slate-50/50" : "hover:bg-slate-50/20"}`}>
        <td className="p-5">
          <div className="flex items-center gap-4">
            <img src={car.image || "/placeholder.svg"} className="w-16 h-12 rounded-lg object-cover border" alt={`${car.make} ${car.model}`} />
            <div>
              <div className={`font-bold capitalize ${isSold ? "text-slate-400 line-through" : "text-slate-900"}`}>
                {car.year} {car.make} {car.model}
              </div>
              <div className="text-[10px] font-mono text-slate-500 uppercase">{car.stockNumber}</div>
            </div>
          </div>
        </td>

        <td className="p-5 text-sm text-slate-600">
          <div>{car.transmission} • {car.fuelType}</div>
          <div className="text-xs text-slate-400">{Number(car.mileage).toLocaleString()} miles</div>
        </td>

        <td className="p-5">
          <div className="font-bold text-slate-900">GMD {Number(car.price || car.pricePerDay).toLocaleString()}</div>
          <div className={`text-[10px] font-bold uppercase ${isSold ? "text-rose-500" : "text-emerald-500"}`}>
            {currentStatus}
          </div>
        </td>

        <td className="p-5 text-right">
          <div className="flex items-center justify-end gap-2">
            <fetcher.Form method="post">
              <input type="hidden" name="carId" value={car.carId} />
              <input type="hidden" name="status" value={isSold ? "available" : "sold"} />
              <button
                type="submit"
                name="intent"
                value="update-status"
                disabled={isUpdating}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${isSold
                    ? "bg-white border text-slate-600 hover:bg-slate-50"
                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}
              >
                {isSold ? <HiOutlineRefresh size={16} /> : <HiOutlineCheckCircle size={16} />}
                {isSold ? "Relist" : "Mark Sold"}
              </button>
            </fetcher.Form>

            <button
              className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100"
              onClick={() => navigate(`/addListing?carId=${car.carId}`)}
            >
              <HiOutlinePencilAlt size={20} />
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <HiOutlineTrash size={20} />
            </button>
          </div>
        </td>
      </tr>

      {showDeleteModal && (
        <DeleteModal
          car={car}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}

// MOBILE CARD COMPONENT (< md)
function MobileInventoryCard({ car }: { car: Car }) {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const handleDelete = () => {
    fetcher.submit(
      { intent: "delete", carId: car.carId },
      { method: "post" }
    );
    setShowDeleteModal(false);
  };

  const currentStatus = fetcher.formData?.get("status") || car.status;
  const isSold = currentStatus === "sold";
  const isUpdating = fetcher.state !== "idle";

  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img src={car.image || "/placeholder.svg"} className="w-16 h-12 rounded-lg object-cover border" alt={`${car.make} ${car.model}`} />
          <div>
            <div className={`font-bold capitalize text-sm ${isSold ? "text-slate-400 line-through" : "text-slate-900"}`}>
              {car.year} {car.make} {car.model}
            </div>
            <div className="text-[10px] font-mono text-slate-500 uppercase">{car.stockNumber}</div>
          </div>
        </div>

        <div className="text-right">
          <div className="font-bold text-sm text-slate-900">GMD {Number(car.price || car.pricePerDay).toLocaleString()}</div>
          <div className={`text-[10px] font-bold uppercase ${isSold ? "text-rose-500" : "text-emerald-500"}`}>
            {currentStatus}
          </div>
        </div>
      </div>

      <div className="text-xs text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
        <span>{car.transmission} • {car.fuelType}</span>
        <span>{Number(car.mileage).toLocaleString()} miles</span>
      </div>

      <div className="flex items-center justify-end gap-2 pt-1">
        <fetcher.Form method="post" className="flex-1 sm:flex-initial">
          <input type="hidden" name="carId" value={car.carId} />
          <input type="hidden" name="status" value={isSold ? "available" : "sold"} />
          <button
            type="submit"
            name="intent"
            value="update-status"
            disabled={isUpdating}
            className={`w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isSold
                ? "bg-white border text-slate-600 hover:bg-slate-50"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
          >
            {isSold ? <HiOutlineRefresh size={14} /> : <HiOutlineCheckCircle size={14} />}
            {isSold ? "Relist" : "Mark Sold"}
          </button>
        </fetcher.Form>

        <button
          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-slate-200"
          onClick={() => navigate(`/addListing?carId=${car.carId}`)}
        >
          <HiOutlinePencilAlt size={18} />
        </button>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-slate-200"
        >
          <HiOutlineTrash size={18} />
        </button>
      </div>

      {showDeleteModal && (
        <DeleteModal
          car={car}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

// DELETE CONFIRMATION MODAL
function DeleteModal({ car, onClose, onConfirm }: { car: Car; onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600 mb-4 mx-auto">
          <HiOutlineExclamation size={24} />
        </div>

        <h3 className="text-lg font-bold text-center text-slate-900">Delete Vehicle?</h3>
        <p className="text-slate-500 text-center mt-2 text-sm leading-relaxed">
          Are you sure you want to remove the <strong>{car.year} {car.make} {car.model}</strong>? This action cannot be undone.
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors text-sm"
          >
            No, Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 shadow-lg shadow-rose-200 transition-all active:scale-95 text-sm"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// Loader function
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const token = getAuthToken(request);
  if (!token) {
    return redirect("/login");
  }

  try {
    const result = await getDealerDashboardInventory(request);
    return json({
      cars: result?.data || [],
      error: null
    });
  } catch (error: any) {
    if (error instanceof Error && error.message.includes("Unauthorized")) {
      return redirect("/login");
    }

    const errorMessage = error?.message?.toLowerCase() || "";
    if (errorMessage.includes("no record found")) {
      return json({
        cars: [],
        error: null
      });
    }

    return json({ cars: [], error: "Failed to load inventory." }, { status: 500 });
  }
};

// Action function
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const carId = formData.get("carId") as string;

  try {
    if (intent === "update-status") {
      const status = formData.get("status") as string;
      await updateVehicleStatus(request, carId, status);
      return json({ success: true, message: "Status updated" });
    }

    if (intent === "delete") {
      await deleteVehicle(request, carId);
      return json({ success: true, message: "Vehicle removed from inventory" });
    }

    return json({ success: false, error: "Invalid intent" }, { status: 400 });
  } catch (error) {
    return json({ success: false, error: "Action failed" }, { status: 500 });
  }
};
