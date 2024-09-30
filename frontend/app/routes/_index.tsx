import type { MetaFunction } from "@remix-run/node";
import BrowseBymake from "~/components/browse";
import Header from "~/components/header";
import Navbar from "~/components/navbar";
import PremiumCars from "~/components/premium";

export const meta: MetaFunction = () => {
   return [{ title: "GamAutos" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Index() {
   return (
      <main className="">
         <Navbar />
         <Header />
         <section className="md:mt-28">
            <BrowseBymake />
         </section>
         <section className="md:mt-8 md:mb-28 ">
            <PremiumCars />
         </section>
      </main>
   );
}
