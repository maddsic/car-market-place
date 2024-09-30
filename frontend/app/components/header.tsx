import React from "react";

// import bannerImg from "/banner-img.jpg";
import bannerImg1 from "/banner-img-1.jpg";

import Button from "./button";
import SearchInventory from "./search";

// import "./styles.css";

const Header = () => {
   return (
      <>
         <header className="w-full md:h-[calc(100vh-250px)] relative">
            <div className="w-full h-full md:h-full bg-gray-800 relative group overflow-hidden">
               <img
                  src={bannerImg1}
                  alt=""
                  className="w-full h-full object-cover opacity-60 relative group-hover:scale-125 transition-all duration-1000 ease-in-out transform overflow-y-hidden"
               />
               <div className="group hidden  absolute h-auto top-[10%] left-10 md:top-[15%] md:left-1/4 z-999 text-white md:flex flex-col gap-6 p-10 bg-black/20 hover:bg-black/40 transition-all duration-1000">
                  <h1 className="text-2xl md:text-5xl text-white font-bold tracking-wider">
                     Mercedez-Benz <br /> AMG GT 2017
                  </h1>
                  <h2 className="text-2xl md:text-5xl font-semibold ">
                     <span className="text-yellow group-hover:text-white transition-all duration-1000">$320</span> /
                     <span className="group-hover:text-yellow transition-all duration-1000"> MO</span>
                  </h2>

                  <Button title="Learn More" classNames="group-hover:bg-yellow transition-all duration-1000" />
               </div>
            </div>
         </header>
         <SearchInventory />
      </>
   );
};

export default Header;
