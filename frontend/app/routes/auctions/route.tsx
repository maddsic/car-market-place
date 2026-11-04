import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { FaGavel } from "react-icons/fa";
import Animation from "~/components/animation.tsx/animation";

export const meta: MetaFunction = () => {
  return [
    { title: "Auctions Coming Soon | Gamautos" },
    {
      name: "description",
      content:
        "GamAutos online car auctions are coming soon. In the meantime, browse cars for sale from dealers and sellers across The Gambia.",
    },
  ];
};

export default function AuctionsComingSoon() {
  return (
    <Animation>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-4">
        {/* Soft glows */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-yellow/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-yellow/10 blur-3xl" />

        <div className="relative z-10 flex w-full max-w-3xl flex-col items-center rounded-3xl border border-yellow/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 text-center shadow-2xl sm:p-14">
          {/* Icon */}
          <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-yellow text-slate-950">
            <FaGavel size={34} />
          </span>

          {/* Pill label */}
          <span className="mt-6 inline-flex rounded-full border border-yellow/30 bg-yellow/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-yellow">
            Coming Soon
          </span>

          <h1 className="mt-4 text-3xl font-black uppercase text-white sm:text-5xl">
            Auctions are <span className="text-yellow">coming soon</span>
          </h1>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400 sm:text-base">
            We are building online car auctions for The Gambia. In the
            meantime, you can browse cars for sale from dealers and private
            sellers.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              to="/inventory"
              className="rounded-xl bg-yellow px-8 py-3.5 text-sm font-black uppercase tracking-wider text-slate-950 transition hover:bg-amber-300 active:scale-95"
            >
              Browse cars
            </Link>
            <a
              href="mailto:support@gamautos.com?subject=Tell me when auctions open"
              className="rounded-xl border border-white/30 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:border-yellow hover:text-yellow active:scale-95"
            >
              Notify me
            </a>
          </div>
        </div>
      </div>
    </Animation>
  );
}
