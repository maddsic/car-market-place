import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import Heading from "~/components/Heading/heading";
import { testimonialData } from "~/data/testimonial";

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const total = testimonialData.length;

  // Nothing to show yet
  if (total === 0) return null;

  const item = testimonialData[index];
  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  return (
    <aside className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
      <Heading
        title="customer"
        colouredText="testimonials"
        classNames="uppercase"
      />
      <div className="mb-3 mt-1 h-1 w-16 rounded-full bg-yellow" />
      <p className="text-sm text-slate-500">
        Happy customers share their experiences.
      </p>

      {/* QUOTE */}
      <div className="mt-5 flex gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow/15 text-yellow">
          <FaQuoteLeft size={16} />
        </span>
        <blockquote className="text-sm italic leading-7 text-slate-700 sm:text-base">
          {item.message}
        </blockquote>
      </div>

      {/* FOOTER */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow text-base font-black text-slate-950">
            {item.name.charAt(0)}
          </span>
          <div>
            <p className="text-sm font-bold text-slate-900">{item.name}</p>
            <p className="text-xs text-slate-500">{item.car}</p>
          </div>
        </div>

        {/* Arrows only appear when there is more than one testimonial */}
        {total > 1 && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="rounded-full border border-slate-200 p-2.5 text-slate-600 transition hover:border-yellow hover:text-yellow active:scale-95"
            >
              <FaChevronLeft size={12} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="rounded-full border border-slate-200 p-2.5 text-slate-600 transition hover:border-yellow hover:text-yellow active:scale-95"
            >
              <FaChevronRight size={12} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Testimonials;
