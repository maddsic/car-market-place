import { type LoaderFunction, type MetaFunction } from "@vercel/remix";
import { useLoaderData } from "@remix-run/react";
import Navbar from "~/components/Navbar/navbar";
import Header from "~/components/Header/header";
import BrowseBymake from "~/components/Browse/browse";
import PremiumCars from "~/components/PremiumCars/premium";
import Highlight from "~/components/Highlight/highlight";
import Category from "~/components/Category/category";
import LatestCars from "~/components/LatestCars/latestCars";

export const meta: MetaFunction = () => {
  return [
    { title: "GamAutos" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async () => {
  // const response = await fetch("http://localhost:8080/api/v1/cars/carmakes");
  const response = await fetch(
    "https://pumped-polliwog-fast.ngrok-free.app/api/v1/cars/carmakes",
  );
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
        <section className="relative sm:mb-14 sm:mt-8">
          <LatestCars />
        </section>
      </main>
    </>
  );
}