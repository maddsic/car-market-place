import React from "react";

const Price = ({ price }: { price: number | string }) => {
  return (
    <span className="clip-path font-montserrat relative flex items-center bg-yellow px-5 py-2 text-[18px] font-extrabold text-white">
      <p>${price}</p>
    </span>
  );
};

export default Price;
