import React from "react";
import { GiCheckMark } from "react-icons/gi";
import Heading from "~/components/Heading/heading";

const coreValuesData = [
  "Stress-free finance department.",
  "Robust selection of popular vehicles.",
  "350 offers on site, trusted by a community.",
  "Maintain your car to stay safe on the road.",
  "We know how to handle a wide range of car services.",
];

const CoreValues = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-0 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* LEFT CONTENT */}
      <div className="flex flex-col gap-2">
        <Heading
          title="core values"
          classNames="uppercase text-2xl sm:text-3xl font-extrabold tracking-tight"
        />
        <div className="h-0.5 w-16 bg-yellow-500 rounded-full my-1" />
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          We go through extensive factory training so that we may provide you
          with the knowledge you need to make an educated decision in choosing
          the vehicle that is right for your lifestyle.
        </p>
        {/* VALUE LIST */}
        <ul className="mt-4 flex flex-col gap-3">
          {coreValuesData.map((value, index) => (
            <AboutList key={index} text={value} />
          ))}
        </ul>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative group overflow-hidden rounded-2xl shadow-lg border border-slate-100 bg-slate-200">
        <img
          src="/about-us-2-image.jpg"
          alt="GamAutos Dealership Core Values"
          className="w-full h-[320px] sm:h-[400px] md:h-[450px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </section>
  );
};

export default CoreValues;

/* SUB-COMPONENT */
interface AboutListProps {
  text: string;
  icon?: React.ReactNode;
}

function AboutList({ text, icon }: AboutListProps) {
  return (
    <li className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-700">
      <span className="flex items-center justify-center shrink-0 w-6 h-6 rounded-full bg-yellow-500/10 text-yellow-500">
        {icon ?? <GiCheckMark size={12} className="text-yellow-500" />}
      </span>
      <span>{text}</span>
    </li>
  );
}
