import { Link } from "@remix-run/react";
import { FaArrowRight } from "react-icons/fa";
import Heading from "~/components/Heading/heading";

const buyerSteps = [
  {
    title: "Search",
    text: "Browse cars or filter by make, model, year and more.",
  },
  {
    title: "Contact the seller",
    text: "Call or WhatsApp the seller directly from the listing.",
  },
  {
    title: "Inspect and buy",
    text: "See the car, check the papers, then agree the deal.",
  },
];

const sellerSteps = [
  {
    title: "Create an account",
    text: "Sign up with your name, email and phone number.",
  },
  {
    title: "List your car",
    text: "Add photos, your price in Dalasi and the car's details.",
  },
  {
    title: "Get calls",
    text: "Buyers contact you directly by phone or WhatsApp.",
  },
];

const columns = [
  {
    label: "For buyers",
    steps: buyerSteps,
    linkText: "Browse cars",
    href: "/inventory",
  },
  {
    label: "For sellers",
    steps: sellerSteps,
    linkText: "List your car",
    href: "/addListing",
  },
];

const HowItWorks = () => {
  return (
    <section className="max__container px-4 py-10">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <Heading title="how it" colouredText="works" />
        <div className="h-1 w-16 rounded-full bg-yellow" />
        <p className="mt-2 max-w-xl text-sm text-slate-500">
          Buying or selling a car on GamAutos takes three simple steps.
        </p>
      </div>

      {/* Two columns */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {columns.map((column) => (
          <div
            key={column.label}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-yellow">
              {column.label}
            </p>

            <ol className="mt-5 flex flex-col gap-5">
              {column.steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow text-sm font-black text-slate-950">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <Link
              to={column.href}
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-yellow transition hover:gap-3"
            >
              {column.linkText}
              <FaArrowRight size={12} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
