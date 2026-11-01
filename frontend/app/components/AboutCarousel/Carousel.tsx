import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// These files live in /public
const images = [
  "/carousel.jpg",
  "/carousel1.jpg",
  "/carousel2.jpg",
  "/carousel3.jpg",
  "/carousel4.jpg",
];

const AboutCarousel = () => {
  const listRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: number) => {
    listRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  return (
    <div className="relative mt-8">
      {/* Photos */}
      <div
        ref={listRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`GamAutos gallery photo ${i + 1}`}
            loading="lazy"
            className="aspect-[4/3] w-[85%] shrink-0 snap-start rounded-2xl object-cover sm:w-[45%] lg:w-[32%]"
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Previous photo"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-slate-900 transition hover:bg-yellow active:scale-95"
      >
        <FaChevronLeft size={14} />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Next photo"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-slate-900 transition hover:bg-yellow active:scale-95"
      >
        <FaChevronRight size={14} />
      </button>
    </div>
  );
};

export default AboutCarousel;
