import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const partnersData: string[] = [
  "/africell.jpg",
  "/takaful.jpg",
  "/tkmotors.jpg",
  "/qcell.png",
  "/gamcell.png",
  "/africell.jpg",
];

const OurPartners = () => {
  const [isDesktop, setIsDesktop] = useState(true);

  // Effect to check screen size and update state
  useEffect(() => {
    // Check if the screen is wider than the 'md' breakpoint (768px)
    const mediaQuery = window.matchMedia(`(min-width: 768px)`);

    const handleResize = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    // Initial check
    setIsDesktop(mediaQuery.matches);

    // Set listener for future changes
    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <section className="relative">
      <motion.div
        className="max__container relative flex flex-col items-center gap-10 p-4 md:grid md:grid-cols-3 md:justify-between md:gap-10 lg:grid-cols-6"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          ease: "linear",
          duration: 15,
          repeat: Infinity,
        }}
        {...(isDesktop && {
          animate: { x: ["0%", "-100%"] },
          transition: {
            ease: "linear",
            duration: 10, // faster duration for smaller items
            repeat: Infinity,
          },
        })}
      >
        {partnersData.map((partner, index) => (
          <span
            className="relative flex items-center justify-center"
            key={index}
          >
            <img
              src={partner}
              alt={`${partner} logo`}
              className="h-20 w-20 object-contain md:h-24 md:w-24 lg:h-28 lg:w-28"
            />
          </span>
        ))}
      </motion.div>
    </section>
  );
};

export default OurPartners;
