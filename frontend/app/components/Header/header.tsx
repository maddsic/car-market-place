import { useCallback, useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowRight,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaCogs,
  FaGasPump,
  FaShieldAlt,
  FaTachometerAlt,
  FaTruck,
} from "react-icons/fa";
import SearchInventory from "../Search/search";
import { Slider } from "~/data/slider";

// Fallback imagery if Slider[i].url is empty
const defaultCarImages = [
  "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1920&q=80",
];

// Optional per-slide fields. Add these to ~/data/slider so every slide shows
// its own real specs instead of the same hardcoded ones.
type SlideExtras = {
  transmission?: string; // e.g. "Automatic"
  acceleration?: string; // e.g. "0-60 in 3.4s"
  fuel?: string; // e.g. "Petrol"
  price?: string | number;
  href?: string; // e.g. "/listings/123"
};

const SLIDE_MS = 8000;

const trustPoints = [
  { icon: <FaShieldAlt />, label: "Quality certified" },
  { icon: <FaCheckCircle />, label: "Fully registered" },
  { icon: <FaTruck />, label: "Doorstep delivery" },
];

const pad = (n: number) => String(n).padStart(2, "0");

const Header = () => {
  const total = Slider.length;
  const [currentState, setCurrentState] = useState(0);
  const [paused, setPaused] = useState(false);

  const getImage = useCallback(
    (i: number) =>
      Slider[i]?.url || defaultCarImages[i % defaultCarImages.length],
    [],
  );

  const next = useCallback(
    () => setCurrentState((p) => (p + 1) % total),
    [total],
  );
  const prev = useCallback(
    () => setCurrentState((p) => (p - 1 + total) % total),
    [total],
  );

  // Auto-advance (pauses while hovering or focusing the hero)
  useEffect(() => {
    if (paused || total < 2) return;
    const timer = setTimeout(next, SLIDE_MS);
    return () => clearTimeout(timer);
  }, [currentState, paused, next, total]);

  // Preload the next slide so the crossfade never flashes
  useEffect(() => {
    if (total < 2) return;
    const img = new Image();
    img.src = getImage((currentState + 1) % total);
  }, [currentState, total, getImage]);

  const slide = Slider[currentState] as
    | ((typeof Slider)[number] & SlideExtras)
    | undefined;

  if (!slide) return <SearchInventory />;

  const specs = [
    slide.transmission && { icon: <FaCogs />, label: slide.transmission },
    slide.acceleration && { icon: <FaTachometerAlt />, label: slide.acceleration },
    slide.fuel && { icon: <FaGasPump />, label: slide.fuel },
  ].filter(Boolean) as { icon: JSX.Element; label: string }[];

  const activeImage = getImage(currentState);

  return (
    <>
      <section
        aria-roledescription="carousel"
        aria-label="Featured vehicles"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="relative flex min-h-[88svh] w-full flex-col justify-between overflow-hidden bg-slate-950 px-5 pb-28 pt-10 sm:px-8 md:min-h-[calc(100vh-200px)] md:px-12 md:pb-32 lg:px-16"
      >
        {/* Site-level heading for SEO / screen readers */}
        <h1 className="sr-only">
          GamAutos - buy, sell, rent and bid on quality cars
        </h1>

        {/* Background: crossfades between slides (no dark gap) */}
        <AnimatePresence initial={false}>
          <motion.img
            key={currentState}
            src={activeImage}
            alt={`${slide.title} ${slide.subTitle}`}
            decoding="async"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-0 h-full w-full object-cover object-center"
          />
        </AnimatePresence>

        {/* Static overlays: stronger on mobile so text stays readable */}
        <div className="absolute inset-0 z-[1] bg-slate-950/60 md:bg-transparent" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-slate-950 via-slate-950/75 to-transparent" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
        <div className="absolute inset-0 z-[1] opacity-10 [background-size:20px_20px] bg-[radial-gradient(#fff_1px,transparent_1px)]" />

        {/* Content */}
        <div className="relative z-10 my-auto max-w-3xl py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentState}
              aria-live="polite"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col text-white"
            >
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-yellow/30 bg-yellow/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-yellow backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-yellow" />
                Premium Inventory
              </span>

              <h2 className="text-balance break-words text-5xl font-black leading-[0.95] tracking-tight drop-shadow-lg sm:text-6xl lg:text-8xl">
                {slide.title}
              </h2>

              <p className="mt-3 text-xl font-bold uppercase tracking-wider text-slate-200 sm:text-2xl lg:text-3xl">
                {slide.subTitle}
              </p>

              {specs.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2.5 text-xs font-semibold text-slate-200 sm:text-sm">
                  {specs.map((spec) => (
                    <li
                      key={spec.label}
                      className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/70 px-3.5 py-2 backdrop-blur-md"
                    >
                      <span className="text-yellow">{spec.icon}</span>
                      {spec.label}
                    </li>
                  ))}
                </ul>
              )}

              {slide.price && (
                <p className="mt-6 text-4xl font-black tracking-tight text-yellow sm:text-5xl">
                  D{slide.price}
                </p>
              )}

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={slide.href ?? "/inventory"}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-yellow px-8 py-4 text-sm font-black uppercase tracking-wider text-slate-950 shadow-xl transition-all duration-300 hover:bg-amber-300 hover:shadow-yellow/30 active:scale-95"
                >
                  {slide.href ? "View This Car" : "Browse Inventory"}
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/addListing"
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:border-yellow hover:text-yellow active:scale-95"
                >
                  Sell Your Car
                </Link>
              </div>

              {/* Trust row */}
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-slate-300">
                {trustPoints.map((t) => (
                  <li key={t.label} className="flex items-center gap-2">
                    <span className="text-yellow">{t.icon}</span>
                    {t.label}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide controls */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3">
          <div className="flex items-center">
            {Slider.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentState(index)}
                aria-label={`Show vehicle ${index + 1} of ${total}`}
                aria-current={currentState === index}
                className="p-2"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 ${currentState === index
                      ? "w-10 bg-yellow"
                      : "w-2 bg-slate-600 hover:bg-slate-400"
                    }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 font-mono text-xs font-bold text-slate-400 sm:flex">
              <span>MODEL</span>
              <span className="text-yellow">{pad(currentState + 1)}</span>
              <span>/ {pad(total)}</span>
            </div>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous vehicle"
              className="rounded-full border border-white/20 p-2.5 text-white transition hover:border-yellow hover:text-yellow active:scale-95"
            >
              <FaChevronLeft size={12} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next vehicle"
              className="rounded-full border border-white/20 p-2.5 text-white transition hover:border-yellow hover:text-yellow active:scale-95"
            >
              <FaChevronRight size={12} />
            </button>
          </div>
        </div>
      </section>

      {/* Inventory Search Component */}
      <SearchInventory />
    </>
  );
};

export default Header;
