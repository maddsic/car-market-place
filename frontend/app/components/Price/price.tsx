import React from "react";
import { twMerge } from "tailwind-merge";

const Price = ({
  price,
  className,
}: {
  price: number | string;
  className?: string;
}) => {
  return (
    <span
      className={twMerge(
        `clip-path font-montserrat relative flex items-center bg-yellow px-5 py-2 text-[18px] font-extrabold text-white ${className}`,
      )}
    >
      <p>${price}</p>
    </span>
  );
};

export default Price;
