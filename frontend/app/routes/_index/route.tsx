import { type LoaderFunction, type MetaFunction } from "@vercel/remix";
import {
  isRouteErrorResponse,
  json,
  useLoaderData,
  useNavigation,
  useRouteError,
} from "@remix-run/react";
import Header from "~/components/Header/header";
import BrowseBymake from "~/components/Browse/browse";
import PremiumCars from "~/components/PremiumCars/premium";
import Highlight from "~/components/Highlight/highlight";
import Category from "~/components/Category/category";
import LatestCars from "~/components/LatestCars/latestCars";
import LoadingIndicator from "~/components/Loader/loadingIndicator";
import { useEffect } from "react";
import { useCarStore } from "~/store/carStore";
import { apiEndpoints } from "~/store/apiEndpoints";

export const meta: MetaFunction = () => {
  return [
    { title: "Gam-autos" },
    { name: "description", content: "Welcome to Gam-autos!" },
  ];
};

// MAIN
export default function Index() {
  const initialData = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const loading = navigation.state === "loading";

  // Zustand store setters
  const setCarMakes = useCarStore((state) => state.setCarMakes);
  const setCarBodyTypes = useCarStore((state) => state.setCarBodyTypes);
  const setPremiumCars = useCarStore((state) => state.setPremiumCars);
  const setLatestCars = useCarStore((state) => state.setLatestCars);

  // Set initial data from loader to Zustand store
  useEffect(() => {
    if (initialData.carMakes.length > 0)
      setCarMakes(initialData.carMakes);
    if (initialData.carBodyTypes.length > 0)
      setCarBodyTypes(initialData.carBodyTypes);
    if (initialData.premiumCars.length > 0)
      setPremiumCars(initialData.premiumCars);
    if (initialData.latestCars.length > 0)
      setLatestCars(initialData.latestCars);
  }, [initialData, setCarMakes, setCarBodyTypes, setPremiumCars, setLatestCars]);

  return (
    <>
      <LoadingIndicator isLoading={loading} />
      <header className="max-h-[70%]">
        <Header />
      </header>
      <main className="relative mt-10 md:mt-24">
        <section className="">
          <BrowseBymake />
        </section>
        <section className="relative sm:mb-10 sm:mt-8">
          <PremiumCars />
        </section>
        <section className="relative mt-10 sm:mb-10">
          <Highlight />
        </section>
        <section className="relative mt-10 sm:mb-10">
          <Category />
        </section>
        <section className="relative sm:mb-14 sm:mt-8">
          <LatestCars />
        </section>
      </main>
    </>
  );
}

// 1. REMIX SERVER LOADER (Bypasses all client 304 cache issues)
export async function loader() {
  try {
    const [makesRes, bodyTypesRes, premiumRes, latestRes] = await Promise.all([
      fetch(apiEndpoints.carMakes).then((r) => r.json()).catch(() => null),
      fetch(apiEndpoints.carBodyTypes).then((r) => r.json()).catch(() => null),
      fetch(apiEndpoints.premiumCars).then((r) => r.json()).catch(() => null),
      fetch(apiEndpoints.latestCars).then((r) => r.json()).catch(() => null),
    ]);

    return json({
      carMakes: makesRes?.data || [],
      carBodyTypes: bodyTypesRes?.data || [],
      premiumCars: premiumRes?.data || [],
      latestCars: latestRes?.data || [],
    });
  } catch (error) {
    console.error("Loader fetch error:", error);
    return json({
      carMakes: [],
      carBodyTypes: [],
      premiumCars: [],
      latestCars: [],
    });
  }
}

// Route Error Boundary
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <main className="screen__height items-center justify-center">
        <div className="error">
          <h1>Oops! Something went wrong.</h1>
          <p>Status: {error.status}</p>
          <pre>{error.data?.message || "An unexpected error occurred."}</pre>
        </div>
      </main>
    );
  }

  let errorMessage = "message kunta/flex to start backend server";

  return (
    <main className="screen__height flex items-center justify-center">
      <div className="error">
        <h1>Uh oh ...</h1>
        <p>
          looks like the server is down... please contact admin to start server
        </p>
        <pre>{errorMessage}</pre>
      </div>
    </main>
  );
}



// john.coyle@opswat.com
