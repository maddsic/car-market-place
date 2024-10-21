import React from "react";
import { twMerge } from "tailwind-merge";

const CategoryImage = ({
  imgUrl,
  classNames,
  title,
  count,
}: {
  imgUrl: string | any;
  classNames?: string;
  title: string;
  count: number;
}) => {
  return (
    <div
      className={twMerge(
        `relative col-span-5 h-auto overflow-hidden ${classNames} cursor-pointer`,
      )}
    >
      <img src={imgUrl} className="h-full w-full" alt="BMW 1" />
      <div className="z-999 font-montserrat absolute bottom-1 left-2 text-white lg:bottom-2 lg:left-5">
        <p className="text-lg font-bold capitalize lg:text-2xl">{title}</p>
        <p className="font-sans text-sm capitalize">{count} Cars</p>
      </div>
    </div>
  );
};

export default CategoryImage;
