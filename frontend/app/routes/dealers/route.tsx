import { Link, useLoaderData } from "@remix-run/react";
import { apiFetch } from "~/utils/apiFetch";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { FaStore } from "react-icons/fa";
import DealersSearchFilter from "./dealersSearchFilter";
import DisplayDealerInfo from "./displayDealerInfo";
import { useState } from "react";
import { apiEndpoints } from "~/store/apiEndpoints";

interface DealerData {
  userId: string;
  username: string;
  address: string;
  phone: string;
  carsCount: number;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Dealers | Gamautos" },
    {
      name: "description",
      content: "Find local car dealerships and browse their inventory.",
    },
  ];
};

const Dealers = () => {
  // Add fallback defaults (= []) so dropdowns never break on refresh
  const {
    carMakes = [],
    dealers = [],
    query = {},
    hasFilters = false,
  } = useLoaderData<typeof loader>() || {};

  // PAGINATION
  const perPage = 6;
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(dealers.length / perPage);
  const currentPage = Math.min(page, Math.max(totalPages - 1, 0));
  const visibleDealers = dealers.slice(
    currentPage * perPage,
    currentPage * perPage + perPage
  );

  return (
    <div className="pb-16">
      {/* DARK HEADER */}
      <section className="relative overflow-hidden bg-slate-950 pb-28 pt-16 text-center">
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-yellow/10 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-yellow/10 blur-3xl" />

        <div className="max__container relative z-10 px-4">
          <span className="inline-flex rounded-full border border-yellow/30 bg-yellow/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-yellow">
            Dealers
          </span>
          <h1 className="mt-4 text-3xl font-black uppercase text-white sm:text-5xl">
            Find Local <span className="text-yellow">Dealers</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400 sm:text-base">
            Browse dealerships across The Gambia and see the cars they have in
            stock.
          </p>
        </div>
      </section>

      <div className="max__container relative z-10 -mt-16 px-4">
        {/* FILTER CARD (overlaps the header) */}
        <div className="rounded-2xl bg-white p-5 shadow-xl sm:p-6">
          <DealersSearchFilter carMakes={carMakes} />
        </div>

        {/* RESULTS HEADER */}
        <div className="mt-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
              {hasFilters ? "Search Results" : "All Dealers"}
            </h2>
            <div className="mt-2 h-1 w-16 rounded-full bg-yellow" />
          </div>
          <p className="text-sm text-slate-500">
            {dealers.length} {dealers.length === 1 ? "dealer" : "dealers"} found
          </p>
        </div>

        {/* DEALERS LIST */}
        {dealers.length > 0 ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {visibleDealers.map((dealer: DealerData, index: number) => (
              <DisplayDealerInfo
                key={dealer.userId || index}
                {...dealer}
                query={query}
              />
            ))}
          </div>
        ) : (
          /* Clear feedback when a search returns 0 results */
          <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow/15 text-yellow">
              <FaStore size={22} />
            </span>
            <h3 className="mt-4 text-lg font-bold text-slate-900">
              No dealers found
            </h3>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              No dealers have cars matching your search. Try a different make or
              model.
            </p>
            <Link
              to="/dealers"
              className="mt-5 rounded-xl bg-yellow px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-950 transition hover:bg-amber-300 active:scale-95"
            >
              Show all dealers
            </Link>
          </div>
        )}

        {/* PAGINATION (only when there is more than one page) */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 0}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-yellow hover:text-yellow disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <p className="text-sm font-semibold text-slate-600">
              Page {currentPage + 1} of {totalPages}
            </p>

            <button
              type="button"
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              className="rounded-xl bg-yellow px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dealers;

// BASE URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION || "/api/v1";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  // 1. Extract query params and trim whitespace
  const condition = url.searchParams.get("condition")?.trim() || "";
  const make = url.searchParams.get("make")?.trim() || "";
  const model = url.searchParams.get("model")?.trim() || "";

  const hasFilters = Boolean(condition || make || model);

  // 2. Always fetch static dropdown metadata first
  const endPoints = [
    { key: "carMakes", url: `${apiEndpoints.carMakes}` },
    { key: "carBodyTypes", url: `${apiEndpoints.carBodyTypes}` },
  ];

  try {
    const result = await Promise.all(endPoints.map(({ url }) => apiFetch(url)));
    const staticData = Object.fromEntries(
      result.map((res, index) => [endPoints[index].key, res.data])
    );

    let dealers: DealerData[] = [];

    // 3. Conditionally fetch filtered or default dealers
    if (hasFilters) {
      const searchParams = new URLSearchParams();
      if (condition) searchParams.append("condition", condition);
      if (make) searchParams.append("make", make);
      if (model) searchParams.append("model", model);

      const dealersResult = await apiFetch(
        `${API_BASE_URL}${API_VERSION}/dealers?${searchParams.toString()}`
      );
      dealers = dealersResult.data || [];
    } else {
      const dealersResult = await apiFetch(`${apiEndpoints.allDealers}`);
      dealers = dealersResult.data || [];
    }

    // 4. Return both static dropdown data and dealers
    return {
      carMakes: staticData.carMakes || [],
      carBodyTypes: staticData.carBodyTypes || [],
      dealers,
      hasFilters,
      query: { condition, make, model },
    };
  } catch (error) {
    console.error("Error in dealers loader:", error);

    // EVEN ON ERROR: Always return empty arrays for dropdowns so React doesn't break
    return {
      carMakes: [],
      carBodyTypes: [],
      dealers: [],
      hasFilters: false,
      query: { condition, make, model },
    };
  }
};
