import React from "react";
import { twMerge } from "tailwind-merge";

interface CategoryImageProps {
  imgUrl: string;
  classNames?: string;
  title: string;
  count?: number;
  onClick?: () => void;
}

const CategoryImage: React.FC<CategoryImageProps> = ({
  imgUrl,
  classNames,
  title,
  count,
  onClick,
}) => {
  return (
    <div
      className={twMerge(
        `relative col-span-5 h-auto overflow-hidden ${classNames} cursor-pointer`,
      )}
      onClick={onClick}
    >
      <img
        src={imgUrl}
        className="h-[300px] w-[100%] object-cover"
        alt="BMW 1"
      />
      <div className="z-999 font-montserrat absolute bottom-1 left-2 text-white lg:bottom-2 lg:left-5">
        <p className="text-lg font-bold capitalize lg:text-2xl">{title}</p>
        <p className="font-sans text-sm capitalize">{count} Cars</p>
      </div>
    </div>
  );
};

export default CategoryImage;
