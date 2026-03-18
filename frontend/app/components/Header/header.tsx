import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button/button";
import SearchInventory from "../Search/search";
import { Slider } from "~/data/slider";

const Header = () => {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentState((prev) => (prev === Slider.length - 1 ? 0 : prev + 1));
    }, 10000);
    return () => clearTimeout(timer);
  }, [currentState]);

  const bgImageStyle = {
    backgroundImage: `url(${Slider[currentState].url})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
  };

  return (
    <>
      <header className="relative h-[calc(100vh-250px)] w-full overflow-hidden">
        <motion.div
          style={bgImageStyle}
          className="duration-[3000ms] absolute inset-0 z-0 scale-100 transform transition-all ease-in-out group-hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentState}
            initial={{ x: -1500 }}
            animate={{ x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="relative z-10 flex h-full flex-col justify-center px-6 py-12 text-white md:px-16 lg:w-2/3"
          >
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl"
            >
              {Slider[currentState].title}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mt-3 text-xl font-medium uppercase md:text-3xl"
            >
              {Slider[currentState].subTitle}
            </motion.h2>

            <motion.h3
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-5 text-3xl font-semibold md:text-4xl"
            >
              <span className="">D{Slider[currentState].price}</span>
              <span className="ml-2 text-white">/ MO</span>
            </motion.h3>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-6"
            >
              <Button
                title="Learn More"
                className="hover:text-yellow-500 rounded-md bg-yellow px-6 py-3 text-black shadow-lg transition-colors duration-300 hover:bg-white"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </header>

      <SearchInventory />
    </>
  );
};

export default Header;
