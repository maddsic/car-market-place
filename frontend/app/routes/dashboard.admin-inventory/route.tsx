import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
import { FaSearch, FaFilter, FaCar, FaUserTie, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getAuthToken } from "~/utils/authHelpers";
import { verifyJwtToken } from "~/utils/jwt.server";
import { getAdminInventory } from "~/service/admin.server";
import { Pagination } from "~/components/pagination/pagination";
import { useEffect, useState } from "react";

interface CarOwner {
  userId: string;
  username: string;
  email: string;
  phone?: string;
}

interface CarItem {
  carId: string;
  stockNumber?: string;
  make: string;
  model: string;
  year: number;
  price: string | number;
  status: "available" | "pending" | "sold";
  vin?: string | null;
  imageUrl?: string;
  location?: string;
  isPremium?: boolean;
  createdAt: string;
  owner?: CarOwner;
}

export default function AdminInventory() {
  const { cars, statusFilter, searchQuery } = useLoaderData<typeof loader>();
  const [carsPerPage, setCarsPerPage] = useState<number>(10);
  const [startIndex, setStartIndex] = useState<number>(0);
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSearching = navigation.state === "loading";

  // Reset to first page if search/filter results change
  useEffect(() => {
    setStartIndex(0);
  }, [cars]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [startIndex])

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    submit(e.currentTarget.form);
  };

  const handlePageSelect = (pageNumber: number) => {
    setStartIndex((pageNumber - 1) * carsPerPage)
  }

  // PAGINATE RIGHT
  const handleNext = () => {
    if (startIndex + 1 < cars.length - carsPerPage + 1) {
      setStartIndex(startIndex + 10);
    }
  };

  // PAGINATE LEFT
  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 10);
    }
  };

  console.log("Cars from Admin dashboard",)

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="flex flex-col gap-6">

        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-black text-primary">All Platform Inventory</h1>
            <p className="text-sm text-gray-500">
              Browse, monitor, and moderate vehicle listings across all registered dealerships.
            </p>
          </div>
          <div>
            <span className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
              {cars.length} {cars.length === 1 ? "Listing" : "Listings"} Found
            </span>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <Form method="get" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Search Input */}
            <div className="relative sm:col-span-2">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                name="search"
                defaultValue={searchQuery}
                placeholder="Search by make, model, stock # or VIN..."
                className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-4 text-sm focus:border-primary focus:outline-none"
              />
            </div>

            {/* Status Dropdown */}
            <div className="flex gap-2">
              <div className="relative w-full">
                <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
                <select
                  name="status"
                  defaultValue={statusFilter}
                  onChange={handleStatusChange}
                  className="w-full appearance-none rounded-lg border border-gray-300 py-2 pl-8 pr-8 text-sm capitalize focus:border-primary focus:outline-none"
                >
                  <option value="all">All</option>
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSearching}
                className="rounded-lg bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-primary/90 disabled:opacity-50"
              >
                {isSearching ? "..." : "Filter"}
              </button>
            </div>
          </Form>
        </div>

        {/* Vehicles Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-4">Vehicle</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Dealer / Owner</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Listed Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cars && cars.length > 0 ? (
                cars.slice(startIndex, startIndex + carsPerPage).map((car: CarItem) => (
                  <tr key={car.carId} className="hover:bg-gray-50/60 transition-colors">
                    {/* Vehicle Details & Thumbnail */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {car.imageUrl ? (
                          <img
                            src={car.imageUrl}
                            alt={`${car.year} ${car.make} ${car.model}`}
                            className="h-12 w-16 rounded-md object-cover border border-gray-100"
                          />
                        ) : (
                          <div className="flex h-12 w-16 items-center justify-center rounded-md bg-gray-100 text-gray-400">
                            <FaCar size={20} />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-gray-900 capitalize">
                            {car.year} {car.make} {car.model}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span>{car.stockNumber || "No Stock #"}</span>
                            {car.isPremium && (
                              <span className="rounded bg-yellow-100 px-1.5 py-0.2 text-[10px] font-bold text-yellow-800 uppercase">
                                Premium
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Price in Dalasi */}
                    <td className="px-6 py-4 font-bold text-gray-900">
                      D{Number(car.price || 0).toLocaleString()}
                    </td>

                    {/* Dealer / Owner */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FaUserTie className="text-gray-400" size={12} />
                        <div>
                          <p className="font-medium text-gray-800">
                            {car.owner?.username || "Unknown"}
                          </p>
                          <p className="text-xs text-gray-400">
                            {car.owner?.phone || car.owner?.email || "—"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-4 text-xs font-medium text-gray-600 capitalize">
                      {car.location || "—"}
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${car.status === "available"
                          ? "bg-green-100 text-green-800"
                          : car.status === "sold"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-yellow-100 text-yellow-800"
                          }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${car.status === "available"
                            ? "bg-green-600"
                            : car.status === "sold"
                              ? "bg-gray-500"
                              : "bg-yellow-600"
                            }`}
                        />
                        {car.status}
                      </span>
                    </td>

                    {/* Listed Date */}
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {car.createdAt
                        ? new Date(car.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                        : "—"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    No vehicles found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          totalItems={cars.length}
          itemsPerPage={carsPerPage}
          startIndex={startIndex}
          onNext={handleNext}
          onPrev={handlePrev}
          onPageSelect={handlePageSelect}
        />

      </div>
    </div>
  );
}

// Admin-Guarded Loader
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const token = getAuthToken(request);
  if (!token) return redirect("/auth/login");

  const verifiedToken = verifyJwtToken(token);
  if (!verifiedToken || verifiedToken.role !== "admin") {
    return redirect("/dashboard");
  }

  const url = new URL(request.url);
  const statusFilter = url.searchParams.get("status") || "all";
  const searchQuery = url.searchParams.get("search")?.trim() || "";

  try {
    const response = await getAdminInventory(request, {
      status: statusFilter,
      search: searchQuery,
    });

    return json({
      cars: response?.data || response || [],
      statusFilter,
      searchQuery,
    });
  } catch (error) {
    console.error("Failed to load admin inventory:", error);
    return json({
      cars: [],
      statusFilter,
      searchQuery,
    });
  }
};
