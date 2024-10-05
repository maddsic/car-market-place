import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BrowseBymake from "~/components/browse";
import Category from "~/components/category";
import Header from "~/components/header";
import Highlight from "~/components/highlight";
import LatestCars from "~/components/latestCars";
import Navbar from "~/components/navbar";
import PremiumCars from "~/components/premium";

export const meta: MetaFunction = () => {
  return [
    { title: "GamAutos" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async () => {
  const response = await fetch("http://localhost:8080/api/v1/cars/carmakes");
  const carMakes = await response.json();

  if (!carMakes.success) {
    throw new Response("Failed to fetch car makes", { status: 500 });
  }

  return carMakes.data;
};

export default function Index() {
  const carMakes = useLoaderData<typeof loader>() || null;
  // console.log(carMakes);

  return (
    <>
      <header className="max-h-[70%]">
        <Navbar />
        <Header carMakes={carMakes} />
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
        <section className="relative sm:mb-28 sm:mt-8">
          <LatestCars />
        </section>
      </main>
    </>
  );
}
