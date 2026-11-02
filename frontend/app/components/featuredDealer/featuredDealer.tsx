import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { FaArrowRight, FaMapMarkerAlt, FaStar } from "react-icons/fa";

// Rename avatar / rating / reviewsCount to match your dealers API
interface Dealer {
  userId: string;
  username: string;
  address: string;
  carsCount: number;
  avatarUrl?: string;
  rating?: number;
  reviewsCount?: number;
}

// The dealers come from the home route loader (components do not fetch data)
const FeaturedDealers = ({ dealers }: { dealers: Dealer[] }) => {
  if (!dealers || dealers.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-slate-950 py-16">
      {/* Soft glows */}
      <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-yellow/10 blur-3xl" />
      <div className="absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-yellow/10 blur-3xl" />

      <div className="max__container relative z-10 px-4">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="inline-flex rounded-full border border-yellow/30 bg-yellow/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-yellow">
            Local Dealers
          </span>
          <h2 className="text-3xl font-black uppercase text-white sm:text-4xl">
            Featured <span className="text-yellow">Dealers</span>
          </h2>
        </div>

        {/* Dealer cards (swipe on phones, grid on bigger screens) */}
        <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {dealers.map((dealer, index) => (
            <motion.div
              key={dealer.userId}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-[75%] shrink-0 snap-start sm:w-auto"
            >
              <Link
                key={dealer.userId}
                to={`/profile/${dealer.userId}`}
                className="group flex w-[75%] shrink-0 snap-start flex-col items-center rounded-3xl border border-yellow/20 bg-gradient-to-br from-slate-900 to-slate-950 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-yellow/50 hover:shadow-xl hover:shadow-yellow/10 sm:w-auto"
              >
                {/* Logo (first letter if there is no image) */}
                {dealer.avatarUrl ? (
                  <img
                    src={dealer.avatarUrl}
                    alt={`${dealer.username} logo`}
                    loading="lazy"
                    className="h-20 w-20 rounded-full border-2 border-yellow/40 bg-white object-cover"
                  />
                ) : (
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow text-3xl font-black text-slate-950">
                    {dealer.username.charAt(0).toUpperCase()}
                  </span>
                )}

                <h3 className="mt-4 text-base font-bold text-white transition-colors group-hover:text-yellow">
                  {dealer.username}
                </h3>

                {/* Rating (or "New dealer" until they get reviews) */}
                {dealer.reviewsCount && dealer.rating ? (
                  <p className="mt-1 flex items-center gap-1 text-sm text-slate-300">
                    <FaStar className="text-yellow" size={13} />
                    <span className="font-bold text-white">
                      {dealer.rating.toFixed(1)}
                    </span>
                    <span className="text-slate-400">
                      ({dealer.reviewsCount}{" "}
                      {dealer.reviewsCount === 1 ? "review" : "reviews"})
                    </span>
                  </p>
                ) : (
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    New dealer
                  </p>
                )}

                <p className="mt-3 rounded-full border border-yellow/30 bg-yellow/10 px-3 py-1 text-xs font-bold text-yellow">
                  {dealer.carsCount} {dealer.carsCount === 1 ? "car" : "cars"} in
                  stock
                </p>

                {dealer.address && (
                  <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                    <FaMapMarkerAlt className="text-yellow" size={12} />
                    {dealer.address}
                  </p>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <div className="mt-8 flex justify-center">
          <Link
            to="/dealers"
            className="inline-flex items-center gap-2 rounded-xl border border-yellow/40 px-6 py-3 text-sm font-bold uppercase tracking-wider text-yellow transition hover:bg-yellow hover:text-slate-950 active:scale-95"
          >
            View all dealers
            <FaArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDealers;
