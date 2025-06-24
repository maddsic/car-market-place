import Button from "../Button/button";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "~/data/slider";
import SearchInventory from "../Search/search";

const Header = ({ carMakes }: { carMakes: any }) => {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    const time = setTimeout(() => {
      if (currentState === Slider.length - 1) {
        setCurrentState(0);
      } else {
        setCurrentState((prev) => prev + 1);
      }
    }, 10000);
    return () => clearTimeout(time);
  }, [currentState]);

  //  Hero background Styles
  const bgImageStyle = {
    backgroundImage: `url(${Slider[currentState].url})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100%",
    maxWidth: "100%",
  };
  return (
    <>
      <header className="group relative h-[calc(100vh-80px)] max-w-full overflow-hidden overflow-x-hidden md:h-[calc(100vh-250px)]">
        <motion.div
          style={bgImageStyle}
          className="transform opacity-100 transition-all duration-1000 ease-in-out group-hover:scale-125"
        />
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ x: -1500 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="z-999 w-content group absolute left-5 top-[18%] flex flex-col gap-3 overflow-hidden bg-black/30 p-5 text-white transition-all duration-1000 hover:bg-black/40 md:left-1/4 md:top-[15%] md:flex lg:w-auto lg:p-10"
          >
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-4 text-4xl font-extrabold capitalize leading-none tracking-tight text-white dark:text-white md:text-5xl lg:text-6xl"
            >
              {Slider[currentState].title}
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl font-bold uppercase text-white md:text-4xl"
            >
              {Slider[currentState].subTitle}
            </motion.h2>
            <h3 className="text-3xl font-semibold uppercase md:text-5xl">
              <span className="text-yellow transition-all duration-1000 group-hover:text-white">
                ${Slider[currentState].price}
              </span>{" "}
              /
              <span className="transition-all duration-1000 group-hover:text-yellow">
                {" "}
                MO
              </span>
            </h3>

            <Button
              title="Learn More"
              classNames="group-hover:bg-yellow transition-all duration-1000"
            />
          </motion.div>
        </AnimatePresence>
      </header>

      <SearchInventory carMakes={carMakes} />
    </>
  );
};

export default Header;
