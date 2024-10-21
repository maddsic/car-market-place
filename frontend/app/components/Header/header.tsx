import Button from "../Button/button";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    }, 5000);
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
          className="transform transition-all duration-1000 ease-in-out group-hover:scale-125"
        />
        <div className="absolute left-0 top-0 z-30 h-screen w-full"></div>

        <motion.div
          initial={{ x: -1500 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="z-999 w-content group absolute left-5 top-[18%] flex flex-col gap-3 overflow-hidden bg-black/30 p-5 text-white transition-all duration-1000 hover:bg-black/40 md:left-1/4 md:top-[15%] md:flex lg:w-auto lg:p-10"
        >
          <h1 className="text-5xl font-bold uppercase text-white group-hover:text-yellow md:text-6xl">
            {Slider[currentState].title}
          </h1>
          <h2 className="text-3xl font-bold uppercase text-white md:text-4xl">
            {Slider[currentState].subTitle}
          </h2>
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
      </header>
      {/* <div className="relative h-screen" id="home">
        <motion.div style={bgImageStyle} />
        <div className="transparent_bg absolute left-0 top-0 z-30 h-screen w-full"></div>

        <motion.div
          initial={{ x: -1500 }}
          animate={{ x: 0 }}
          transition={{ delay: 1, duration: 3.5, type: "spring" }}
          className="description from-bg-gray-900 absolute top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-gradient-to-t to-red-700 text-blue-100"
        >
          <div className="xs:px-6 mt-4 max-w-4xl sm:px-12 md:px-16 lg:px-0">
            <h1 className="mb-10 text-5xl font-bold text-white md:text-6xl">
              Mercedez-Benz <br /> AMG GT 2017
            </h1>
            <motion.p
              initial={{ y: 250 }}
              animate={{ y: 4 }}
              transition={{ delay: 1.5, duration: 1.5, type: "spring" }}
              className="lg:text-lg"
            >
              $320
            </motion.p>
          </div>

          <div className="carousal flex items-center justify-center">
            {imagesSlide.map((image, currentState) => (
              <span
                key={currentState}
                onClick={() => goToNext(currentState)}
                className="ml-[10px] mt-8 hidden cursor-pointer rounded-md bg-gray-500 shadow-lg transition-all hover:bg-red-400 lg:block lg:h-[10px] lg:w-[50px]"
              />
            ))}
          </div>
        </motion.div>
      </div> */}
      <SearchInventory carMakes={carMakes} />
    </>
  );
};

export default Header;
