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
import { useEffect } from "react";
import { useCarStore } from "~/store/carStore";

export const meta: MetaFunction = () => {
  return [
    { title: "Gam-autos" },
    { name: "description", content: "Welcome to Gam-autos!" },
  ];
};

// MAIN
export default function Index() {
  const { carMakes, carBodyTypes, fetchCarData } = useCarStore();
  const navigation = useNavigation();
  const loading = navigation.state === "loading";

  useEffect(() => {
    if (carMakes.length === 0 || carBodyTypes.length === 0) {
      fetchCarData();
    }
  }, [carMakes.length, carBodyTypes.length]);

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
