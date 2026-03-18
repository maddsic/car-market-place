import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useFetcher, useNavigate } from "@remix-run/react";
import { getDealerDashboardInventory } from "~/service/dealer.server";

import {
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineCheckCircle,
  HiOutlineRefresh,
  HiOutlineExclamation
} from "react-icons/hi";
import { deleteVehicle, updateVehicleStatus } from "~/service/car.server";
import React from "react";
import { getAuthToken } from "~/utils/authHelpers";



export default function InventoryDashboard() {
  const { cars, error } = useLoaderData<typeof loader>();

  if (error) {
    return <div className="p-8 text-red-600 bg-red-50 rounded-lg">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-100 mx-auto text-slate-900">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Fleet Inventory 🏢</h1>
            <p className="text-slate-500 mt-1">Real-time management of your dealership stock.</p>
          </div>
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase block">Total Stock</span>
            <span className="text-xl font-black">{cars.length}</span>
          </div>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
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
                {cars.map((car: any) => (
                  <InventoryRow key={car.carId} car={car} />
                ))}
              </tbody>
            </table>
          </div>
          {cars.length === 0 && (
            <div className="p-20 text-center text-slate-400">No vehicles found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

function InventoryRow({ car }: { car: any }) {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const fetcher = useFetcher();
  const navigate = useNavigate()

  // Handles vehicle delete
  const handleDelete = () => {
    fetcher.submit(
      { intent: "delete", carId: car.carId },
      { method: "post" }
    );
    setShowDeleteModal(false);
  }

  // Optimistic UI state
  const currentStatus = fetcher.formData?.get("status") || car.status;
  const isSold = currentStatus === "sold";
  const isUpdating = fetcher.state !== "idle";

  return (
    <>
      <tr className={`group transition-all ${isSold ? "bg-slate-50/50" : "hover:bg-slate-50/20"}`}>
        {/* 1. Vehicle Identity */}
        <td className="p-5">
          <div className="flex items-center gap-4">
            <img src={car.image} className="w-16 h-12 rounded-lg object-cover border" alt="car" />
            <div>
              <div className={`font-bold ${isSold ? "text-slate-400 line-through" : "text-slate-900"}`}>
                {car.year} {car.make} {car.model}
              </div>
              <div className="text-[10px] font-mono text-slate-500 uppercase">{car.stockNumber}</div>
            </div>
          </div>
        </td>

        {/* 2. Specs & Price */}
        <td className="p-5 text-sm text-slate-600">
          <div>{car.transmission} • {car.fuelType}</div>
          <div className="text-xs text-slate-400">{Number(car.mileage).toLocaleString()} miles</div>
        </td>

        <td className="p-5">
          <div className="font-bold text-slate-900">${Number(car.price).toLocaleString()}</div>
          <div className={`text-[10px] font-bold uppercase ${isSold ? "text-rose-500" : "text-emerald-500"}`}>
            {currentStatus}
          </div>
        </td>

        {/* 3. The 3-Button Management Suite */}
        <td className="p-5 text-right">
          <div className="flex items-center justify-end gap-2">

            {/* Action 1: Status Toggle */}
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

            {/* Action 2: Edit */}
            <button
              className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100"
              onClick={() => navigate(`/addListing?carId=${car.carId}`)}
            >
              <HiOutlinePencilAlt size={20} />
            </button>

            {/* Action 3: Delete (Trigger Modal) */}
            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <HiOutlineTrash size={20} />
            </button>
          </div>
        </td>
      </tr>

      {/* 4. Delete Confirmation Modal Overlay */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
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
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
              >
                No, Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2.5 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 shadow-lg shadow-rose-200 transition-all active:scale-95"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}



export const loader = async ({ request }: LoaderFunctionArgs) => {
  const token = getAuthToken(request)
  if (!token) {
    return redirect("/login")
  }

  try {
    const result = await getDealerDashboardInventory(request);
    return json({
      cars: result.data || [],
      error: null
    });
  } catch (error) {
    console.error("Inventory Loader Error:", error);

    if (error instanceof Error && error.message.includes("Unauthorized")) {
      return redirect("/login");
    }

    return json({ cars: [], error: "Failed to load inventory." }, { status: 500 });
  }
};

// routes/dealer.inventory.tsx
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const carId = formData.get("carId") as string;

  console.log(carId)
  console.log(intent)

  try {
    if (intent === "update-status") {
      const status = formData.get("status") as string;
      console.log(status)
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



