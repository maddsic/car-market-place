import bannerImg1 from "/banner-img-1.jpg";

import Button from "./button";
import SearchInventory from "./search";

const Header = ({ carMakes }: { carMakes: any }) => {
  return (
    <>
      <header className="relative h-[calc(100vh-400px)] max-w-full md:h-[calc(100vh-250px)]">
        <div className="group relative h-full max-w-full overflow-hidden bg-gray-800 md:h-full">
          <img
            src={bannerImg1}
            alt=""
            className="relative h-full w-full transform overflow-y-hidden object-cover opacity-60 transition-all duration-1000 ease-in-out group-hover:scale-125"
          />
          <div className="z-999 group absolute left-10 top-[30%] w-[100%] flex-col gap-6 overflow-hidden bg-black/20 text-white transition-all duration-1000 hover:bg-black/40 md:left-1/4 md:top-[15%] md:flex lg:w-auto lg:p-10">
            <h1 className="text-5xl font-bold tracking-wider text-white md:text-5xl">
              Mercedez-Benz <br /> AMG GT 2017
            </h1>
            <h2 className="text-2xl font-semibold md:text-5xl">
              <span className="text-yellow transition-all duration-1000 group-hover:text-white">
                $320
              </span>{" "}
              /
              <span className="transition-all duration-1000 group-hover:text-yellow">
                {" "}
                MO
              </span>
            </h2>

            <Button
              title="Learn More"
              classNames="group-hover:bg-yellow transition-all duration-1000"
            />
          </div>
        </div>
      </header>
      <SearchInventory carMakes={carMakes} />
    </>
  );
};

export default Header;
