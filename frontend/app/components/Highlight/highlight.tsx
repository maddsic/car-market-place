import { Link, useNavigate } from "@remix-run/react";
import Button from "../Button/button";

// ICONS
import { IoCarSportOutline, IoArrowForwardOutline, IoShieldCheckmarkOutline, IoFlashOutline } from "react-icons/io5";
import { AiOutlineDollar } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";

const Highlight = () => {
  const navigate = useNavigate();

  const handleNavigate = (section: string, value: string) => {
    navigate(`/inventory?section=${section}&value=${value}`);
  };

  return (
    <section className="relative w-full bg-slate-950 py-16 lg:py-24 overflow-hidden">
      {/* Background Image with Dark Gradient Mesh */}
      <div
        className="absolute inset-0 bg-[url('/latest_cars/x7.jpg')] bg-cover bg-center opacity-15 mix-blend-luminosity scale-105 transition-transform duration-1000 ease-out hover:scale-100"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70" />

      {/* Decorative Neon Light Bleeds */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-yellow/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />

      <div className="max__container relative z-10 px-4 md:px-8">

        {/* Section Header Badge */}
        <div className="mb-10 flex items-center justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-yellow/20 bg-yellow/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-yellow backdrop-blur-md">
            <IoFlashOutline size={14} /> Ultimate Auto Marketplace
          </span>
        </div>

        {/* Asymmetric Dual Hero Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">

          {/* LEFT CARD: BUY/INVENTORY (Featured Larger Card - 7 Columns) */}
          <div
            onClick={() => handleNavigate("inventory", "all")}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-8 md:p-12 backdrop-blur-2xl transition-all duration-500 hover:border-yellow/50 hover:bg-slate-900/80 hover:shadow-[0_0_50px_rgba(234,179,8,0.15)] cursor-pointer lg:col-span-7"
          >
            {/* Top Glow Accent */}
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-yellow/20 blur-2xl transition-all duration-500 group-hover:scale-150" />

            <div>
              {/* Header Icon Row */}
              <div className="flex items-center justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:bg-yellow group-hover:text-slate-950">
                  <BiSearchAlt size={32} />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400 group-hover:text-yellow">
                  01 / BUY
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="mt-8 font-montserrat text-3xl font-black uppercase tracking-tight text-white md:text-4xl lg:text-5xl">
                Find Your <br />
                <span className="bg-gradient-to-r from-white via-gray-200 to-yellow bg-clip-text text-transparent">
                  Dream Drive
                </span>
              </h3>

              <p className="mt-4 max-w-lg text-sm leading-relaxed text-gray-300 md:text-base">
                Explore fully registered, quality-certified vehicles. We handle every step of the paperwork and deliver your chosen car straight to your doorstep.
              </p>

              {/* Quick Perks Badges */}
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-gray-300">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 border border-white/5">
                  <IoShieldCheckmarkOutline className="text-yellow" /> Fully Registered
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 border border-white/5">
                  <IoCarSportOutline className="text-yellow" /> Doorstep Delivery
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
              <Button
                title="Browse Inventory"
                className="font-montserrat bg-yellow px-8 py-3.5 text-xs font-black uppercase tracking-wider text-slate-950 shadow-lg shadow-yellow/20 transition-all duration-300 hover:bg-yellow/90 hover:scale-105"
              />
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-yellow transition-transform duration-300 group-hover:translate-x-2">
                <span>View All Cars</span>
                <IoArrowForwardOutline size={18} />
              </div>
            </div>
          </div>

          {/* RIGHT CARD: SELL (High-Contrast Accent Card - 5 Columns) */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-yellow/30 bg-gradient-to-b from-yellow/15 via-slate-900/80 to-slate-950 p-8 md:p-12 backdrop-blur-2xl transition-all duration-500 hover:border-yellow hover:shadow-[0_0_50px_rgba(234,179,8,0.2)] lg:col-span-5">

            {/* Ambient Corner Glow */}
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-yellow/20 blur-2xl transition-all duration-500 group-hover:scale-150" />

            <div>
              {/* Header Icon Row */}
              <div className="flex items-center justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow/20 border border-yellow/40 text-yellow shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:bg-yellow group-hover:text-slate-950">
                  <AiOutlineDollar size={34} />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-yellow">
                  02 / SELL
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="mt-8 font-montserrat text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                Instant <br />
                <span className="text-yellow">Car Sale</span>
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-gray-300">
                Turn your car into cash effortlessly. Get competitive offers, zero marketplace hassle, and guaranteed fast payouts.
              </p>
            </div>

            {/* Action Bar */}
            <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6">
              <Link to="/addListing" className="w-full">
                <Button
                  title="List Your Vehicle"
                  className="w-full font-montserrat bg-white px-8 py-3.5 text-center text-xs font-black uppercase tracking-wider text-slate-950 shadow-xl transition-all duration-300 hover:bg-yellow hover:text-slate-950"
                />
              </Link>

              <Link
                to="/addListing"
                className="flex items-center justify-center gap-2 text-xs font-bold uppercase text-gray-300 transition-colors duration-300 hover:text-yellow"
              >
                <span>Get Instant Valuation</span>
                <IoArrowForwardOutline size={16} />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Highlight;
