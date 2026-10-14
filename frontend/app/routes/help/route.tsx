import { useState, useId } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaEnvelope,
  FaPhoneAlt,
  FaChevronDown,
  FaArrowLeft,
  FaThumbsUp,
  FaThumbsDown,
  FaCheckCircle,

} from "react-icons/fa";
import { FaSprayCanSparkles } from "react-icons/fa6";
import { CATEGORIES, FAQS } from "~/data/help";

export const meta: MetaFunction = () => {
  return [
    { title: "Help & Support Center | Gamautos" },
    {
      name: "description",
      content:
        "Get instant help with car purchasing, dealer verification, listing vehicles, and marketplace security on Gamautos.",
    },
  ];
};



export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openFaqId, setOpenFaqId] = useState<string | null>("buyer-1");
  const [feedback, setFeedback] = useState<Record<string, "yes" | "no">>({});

  const searchInputId = useId();

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const handleFeedback = (id: string, vote: "yes" | "no") => {
    setFeedback((prev) => ({ ...prev, [id]: vote }));
  };

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q) ||
      faq.tag.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 antialiased selection:bg-yellow-400 selection:text-slate-900">
      {/* Top Floating Nav */}
      <div className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-primary transition-colors"
          >
            <FaArrowLeft
              size={12}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span>Back to Marketplace</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 border border-emerald-200/60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Support Online
            </span>
          </div>
        </div>
      </div>

      {/* Hero Header with subtle gradient mesh */}
      <header className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-primary to-slate-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Ambient Glow Orbs */}
        <div
          aria-hidden="true"
          className="absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-10 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none"
        />

        <div className="relative mx-auto max-w-3xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-yellow-300 backdrop-blur-sm">
            <FaSprayCanSparkles size={11} />
            <span>Gamautos Knowledge Base</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            How can we help you today?
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Search answers on vehicle inquiries, dealership inventory, secure payments, and fraud prevention.
          </p>

          {/* Search Bar with Glass effect */}
          <div className="pt-2 max-w-2xl mx-auto">
            <div className="relative group">
              <label htmlFor={searchInputId} className="sr-only">
                Search help articles
              </label>
              <FaSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-yellow-400"
                size={16}
              />
              <input
                id={searchInputId}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, e.g., 'escrow', 'dealership photos', 'VIN check'..."
                className="w-full rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md py-4 pl-12 pr-4 text-sm text-white placeholder-slate-400 focus:border-yellow-400 focus:bg-white/15 focus:outline-none focus:ring-4 focus:ring-yellow-400/10 transition shadow-2xl"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-slate-300 hover:bg-white/20"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Keyword Suggestions */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-400">
              <span className="text-[11px]">Popular:</span>
              {["Inspect car", "Mark as sold", "VIN verification", "Scam alert"].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setSearchQuery(term)}
                  className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[11px] text-slate-300 hover:bg-white/10 hover:text-white transition"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Interactive Section - pulled up into header */}
      <main className="relative -mt-12 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-20 space-y-10">
        {/* Category Tabs Pill Bar */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-2 shadow-lg shadow-slate-200/50 flex flex-wrap sm:flex-nowrap gap-1.5">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const Icon = "icon" in cat ? cat.icon : null;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex-1 min-w-[140px] flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-bold transition-all ${isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                  }`}
              >
                {Icon && <Icon size={13} className={isActive ? "text-yellow-400" : "text-slate-400"} />}
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-semibold ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results Counter if searching */}
        {searchQuery && (
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Found <strong className="text-slate-900">{filteredFaqs.length}</strong> {filteredFaqs.length === 1 ? "answer" : "answers"} for &ldquo;{searchQuery}&rdquo;
            </span>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-primary font-semibold hover:underline"
            >
              Reset search
            </button>
          </div>
        )}

        {/* Accordion FAQ List */}
        <section className="space-y-3.5">
          <AnimatePresence initial={false}>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                const userVote = feedback[faq.id];

                return (
                  <motion.div
                    key={faq.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${isOpen
                      ? "border-primary/30 shadow-md ring-1 ring-primary/10"
                      : "border-slate-200/80 shadow-xs hover:border-slate-300"
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4"
                    >
                      <div className="space-y-1">
                        <span className="inline-block rounded-md bg-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-600 px-2 py-0.5">
                          {faq.tag}
                        </span>
                        <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                          {faq.question}
                        </h2>
                      </div>

                      <div
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-colors ${isOpen
                          ? "bg-slate-900 text-yellow-400 border-slate-900"
                          : "border-slate-200 text-slate-400 group-hover:text-slate-600"
                          }`}
                      >
                        <FaChevronDown
                          size={12}
                          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                            }`}
                        />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="border-t border-slate-100 px-5 sm:px-6 pt-4 pb-6 text-sm text-slate-600 leading-relaxed bg-slate-50/40 space-y-4">
                            <p>{faq.answer}</p>

                            {/* Helpful Voting Bar */}
                            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/60 text-xs text-slate-500">
                              <span>Was this explanation helpful?</span>

                              {userVote ? (
                                <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600">
                                  <FaCheckCircle size={12} />
                                  Thanks for your feedback!
                                </span>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleFeedback(faq.id, "yes")}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition"
                                  >
                                    <FaThumbsUp size={11} className="text-slate-400" />
                                    <span>Yes</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleFeedback(faq.id, "no")}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition"
                                  >
                                    <FaThumbsDown size={11} className="text-slate-400" />
                                    <span>No</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center space-y-2">
                <p className="font-bold text-slate-800">No matching questions found</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  We couldn&apos;t find an article matching your keyword. Try a different search term or reach out to our team below.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="mt-3 inline-block text-xs font-bold text-primary hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </AnimatePresence>
        </section>

        {/* Support Contact Grid - Modern elevated cards */}
        <section className="pt-6">
          <div className="text-center mb-6 space-y-1">
            <h3 className="text-lg font-bold text-slate-900">Still have questions?</h3>
            <p className="text-xs text-slate-500">
              Our local automotive support team is ready to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Email Card */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <FaEnvelope size={18} />
                </span>
                <div>
                  <h4 className="font-bold text-slate-900">Email Customer Support</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Have questions about listing your car, verification, or accounts? We respond within 24 business hours.
                  </p>
                </div>
              </div>

              <a
                href="mailto:support@gamautos.com"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-yellow-600 transition-colors uppercase tracking-wider"
              >
                <span>support@gamautos.com</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

            {/* Telephone Card */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-amber-400/60 hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <FaPhoneAlt size={18} />
                </span>
                <div>
                  <h4 className="font-bold text-slate-900">Direct Telephone Line</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Need immediate assistance with a dealership inquiry or urgent listing report? Speak directly with staff.
                  </p>
                </div>
              </div>

              <a
                href="tel:+2207531646"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 group-hover:text-amber-800 transition-colors uppercase tracking-wider"
              >
                <span>+220 753 1646</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
