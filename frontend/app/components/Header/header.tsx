import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button/button";
import SearchInventory from "../Search/search";
import { Slider } from "~/data/slider";

// Fallback high-quality automotive imagery if Slider[i].url is empty
const defaultCarImages = [
  "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1920&q=80",
];

const Header = () => {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentState((prev) => (prev === Slider.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearTimeout(timer);
  }, [currentState]);

  const activeImage =
    Slider[currentState]?.url ||
    defaultCarImages[currentState % defaultCarImages.length];

  return (
    <>
      <header className="relative min-h-[560px] lg:h-[calc(100vh-200px)] w-full overflow-hidden bg-slate-950 flex flex-col justify-between p-6 md:p-12 lg:p-16">

        {/* Animated Background Image Slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentState}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${activeImage})` }}
          >
            {/* Dark Gradient Vignette for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />

            {/* Cyber / Tech Mesh Grid Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          </motion.div>
        </AnimatePresence>

        {/* Content Box */}
        <div className="relative z-10 my-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentState}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center text-white"
            >
              {/* Automotive Tag */}
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-400/10 border border-amber-400/30 text-yellow text-xs font-bold tracking-widest uppercase">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Premium Inventory
                </span>
              </div>

              {/* Vehicle Title */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none text-white drop-shadow-md">
                {Slider[currentState].title}
              </h1>

              {/* Subtitle / Model */}
              <h2 className="mt-2 text-lg sm:text-2xl font-bold text-slate-300 uppercase tracking-wider">
                {Slider[currentState].subTitle}
              </h2>

              {/* Vehicle Quick Specs Badge Row */}
              <div className="mt-5 flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="text-yellow">⚡</span> Automatic
                </div>
                <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="text-yellow">🏁</span> 0-60 in 3.4s
                </div>
                <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="text-yellow">⛽</span> Hybrid / Petrol
                </div>
              </div>

              {/* Pricing */}
              {/* <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-yellow tracking-tight">
                  D{Slider[currentState].price}
                </span>
                <span className="text-slate-400 font-bold text-sm">/ MONTH</span>
              </div> */}

              {/* Action Button */}
              <div className="mt-8">
                <Button
                  title="View Vehicle Specs"
                  className="bg-yellow hover:bg-amber-300 text-slate-950 font-black px-8 py-3.5 rounded-xl shadow-xl hover:shadow-amber-400/20 transition-all duration-300 active:scale-95 uppercase tracking-wider text-xs sm:text-sm"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dynamic Slide Navigation & Status Bar */}
        <div className="relative z-10 flex items-center justify-between pt-4 border-t border-slate-800/60 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            {Slider.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentState(index)}
                aria-label={`Select vehicle slide ${index + 1}`}
                className={`h-2 transition-all duration-300 rounded-full ${currentState === index
                  ? "w-10 bg-yellow"
                  : "w-2 bg-slate-700 hover:bg-slate-500"
                  }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400">
            <span>MODEL</span>
            <span className="text-yellow">0{currentState + 1}</span>
            <span>/ 0{Slider.length}</span>
          </div>
        </div>
      </header>

      {/* Inventory Search Component */}
      <SearchInventory />
    </>
  );
};

export default Header;
