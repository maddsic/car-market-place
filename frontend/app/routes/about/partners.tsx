import { motion } from "framer-motion";

const partnersData: string[] = [
  "/africell.jpg",
  "/takaful.jpg",
  "/tkmotors.jpg",
  "/qcell.png",
  "/gamcell.png",
  "/africell.jpg",
];

const OurPartners = () => {
  return (
    <section className="relative">
      <motion.div
        className="max__container relative grid grid-cols-1 items-center justify-between gap-10 p-4 md:grid-cols-3 lg:grid-cols-6"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          ease: "linear",
          duration: 15,
          repeat: Infinity,
        }}
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
