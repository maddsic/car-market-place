import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

// Country code + number, no "+" and no spaces
const WHATSAPP_NUMBER = "14707338533";

const FindMyCar = () => {
  const [request, setRequest] = useState("");

  const message = request.trim()
    ? `Hi GamAutos, I'm looking for ${request.trim()}`
    : "Hi GamAutos, I'm looking for a car. Can you help me find one?";

  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <section className="max__container my-10 px-4">
      <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-yellow p-6 shadow-xl sm:p-10 lg:flex-row">
        {/* Text */}
        <div className="text-center lg:max-w-md lg:text-left">
          <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
            Can&apos;t find your car?
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-900 sm:text-base">
            Tell us what you are looking for and we will get back to you on
            WhatsApp.
          </p>
        </div>

        {/* Input + button */}
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-xl">
          <input
            type="text"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            placeholder="e.g. Toyota RAV4 around D600,000"
            aria-label="What car are you looking for?"
            className="w-full rounded-xl border-0 bg-white px-4 py-3.5 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
          />
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-slate-800 active:scale-95"
          >
            <FaWhatsapp size={18} />
            Message us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FindMyCar;
