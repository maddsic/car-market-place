import { type LoaderFunction, type MetaFunction } from "@vercel/remix";
import {
  isRouteErrorResponse,
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
import { apiFetch } from "~/utils/apiFetch";
import LoadingIndicator from "~/components/Loader/loadingIndicator";

export const meta: MetaFunction = () => {
  return [
    { title: "Gam-autos" },
    { name: "description", content: "Welcome to Gam-autos!" },
  ];
};

const API_BASE_URL = process.env.API_BASE_URL;

export const loader: LoaderFunction = async () => {
  const endPoints = [
    { key: "carMakes", url: `${API_BASE_URL}/api/v1/cars/carmakes` },
    { key: "premiumCars", url: `${API_BASE_URL}/api/v1/cars/premium-cars` },
    { key: "latestCars", url: `${API_BASE_URL}/api/v1/cars/latest-cars` },
  ];

  //
  const results = await Promise.all(endPoints.map(({ url }) => apiFetch(url)));

  return Object.fromEntries(
    results.map((result, index) => [endPoints[index].key, result.data]),
  );
};

// MAIN
export default function Index() {
  const { carMakes, premiumCars, latestCars } =
    useLoaderData<typeof loader>() || null;

  const navigation = useNavigation();
  const loading = navigation.state === "loading";

  return (
    <>
      <LoadingIndicator isLoading={loading} />
      <header className="max-h-[70%]">
        <Header carMakes={carMakes} />
      </header>
      <main className="relative mt-10 md:mt-24">
        <section className="">
          <BrowseBymake carMakes={carMakes} />
        </section>
        <section className="relative sm:mb-10 sm:mt-8">
          <PremiumCars premiumCars={premiumCars} />
        </section>
        <section className="relative mt-10 sm:mb-10">
          <Highlight />
        </section>
        <section className="relative mt-10 sm:mb-10">
          <Category />
        </section>
        <section className="relative sm:mb-14 sm:mt-8">
          <LatestCars latestCars={latestCars} />
        </section>
      </main>
    </>
  );
}

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
