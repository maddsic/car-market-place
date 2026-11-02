import { type MetaFunction } from "@vercel/remix";
import {
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useNavigation,
  useRouteError,
} from "@remix-run/react";
import { useEffect } from "react";
import BrowseBymake from "~/components/Browse/browse";
import PremiumCars from "~/components/PremiumCars/premium";
import Highlight from "~/components/Highlight/highlight";
import Category from "~/components/Category/category";
import LatestCars from "~/components/LatestCars/latestCars";
import LoadingIndicator from "~/components/Loader/loadingIndicator";
import Header from "~/components/Header/header";
import { useCarStore } from "~/store/carStore";
import FindMyCar from "~/components/findMyCar/findMyCar";
import HowItWorks from "~/components/howItWorks/howItWorks";
import { apiEndpoints } from "~/store/apiEndpoints";
import { apiFetch } from "~/utils/apiFetch";
import FeaturedDealers from "~/components/featuredDealer/featuredDealer";
import FAQ from "~/components/faq/faq";
import Animation from "~/components/animation.tsx/animation";

export const meta: MetaFunction = () => {
  const title = "GamAutos | Buy, Sell, Rent & Bid on Quality Cars";
  const description =
    "Browse quality-certified, fully registered cars with doorstep delivery. Buy, sell, rent or bid on vehicles at GamAutos.";

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
  ];
};

export default function Index() {
  const fetchCarData = useCarStore((state) => state.fetchCarData);
  const { dealers } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const loading = navigation.state === "loading";

  useEffect(() => {
    fetchCarData();
  }, [fetchCarData]);

  return (
    <>
      <LoadingIndicator isLoading={loading} />

      {/* Header already renders the hero and the search card */}
      <Header />

      <main className="mt-12 md:mt-16">
        <section>
          <BrowseBymake />
        </section>
        <section className="mt-8 sm:mb-10">
          <PremiumCars />
        </section>
        <section className="mt-10 sm:mb-10">
          <Highlight />
        </section>
        <section className="mt-10 sm:mb-10">
          <Category />
        </section>
        <section className="mt-8 sm:mb-14">
          <LatestCars />
        </section>
        <section className="py-10">
          <FeaturedDealers dealers={dealers} />
        </section>
        <section>
          <FindMyCar />
        </section>
        <section className="bg-slate-100 py-10">
          <FAQ />
        </section>
        <Animation>
          <section className="py-10">
            <HowItWorks />
          </section>
        </Animation>
      </main>
    </>
  );
}

export const loader = async () => {
  try {
    const result = await apiFetch(apiEndpoints.allDealers);
    const dealers = (result.data || [])
      .sort((a: any, b: any) => b.carsCount - a.carsCount)
      .slice(0, 4);
    return { dealers };
  } catch (error) {
    console.error("Error loading dealers:", error);
    return { dealers: [] };
  }
};

// Route Error Boundary
export function ErrorBoundary() {
  const error = useRouteError();

  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  const message = isNotFound
    ? "The page you are looking for does not exist or has moved."
    : "We could not load this page right now. Please try again in a moment.";

  return (
    <main className="screen__height flex items-center justify-center px-4">
      <div className="error">
        <h1 className="text-2xl">
          {isNotFound ? "Page not found" : "Oops! Something went wrong."}
        </h1>
        <p className="mt-2 text-gray-600">{message}</p>

        <div className="mt-6 flex justify-center gap-3">
          {isNotFound ? (
            <Link
              to="/"
              className="rounded-xl bg-yellow px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-950 transition hover:bg-amber-300 active:scale-95"
            >
              Back to home
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-xl bg-yellow px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-950 transition hover:bg-amber-300 active:scale-95"
            >
              Try again
            </button>
          )}
          <Link
            to="/inventory"
            className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-bold uppercase tracking-wider text-gray-700 transition hover:border-yellow hover:text-yellow active:scale-95"
          >
            Browse cars
          </Link>
        </div>
      </div>
    </main>
  );
}
