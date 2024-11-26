import React from "react";
import { twMerge } from "tailwind-merge";

const Price = ({ price, className }: { price: number; className?: string }) => {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GMD",
  });

  const formattedPrice = currencyFormatter.format(price);

  return (
    <span
      className={twMerge(
        `clip-path font-montserrat relative flex items-center bg-yellow px-5 py-2 text-[18px] font-extrabold text-white ${className}`,
      )}
    >
      <p>{formattedPrice}</p>
    </span>
  );
};

export default Price;
