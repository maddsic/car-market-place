import React from "react";
import { twMerge } from "tailwind-merge";

const Heading = ({
  title,
  colouredText,
  classNames,
}: {
  title: string;
  colouredText: string;
  classNames?: string;
}) => {
  return (
    <h2
      className={twMerge(
        `font-montserrat my-1.5 box-border text-[18px] font-bold capitalize leading-[30px] md:text-[22px] lg:text-[28px] ${classNames}`,
      )}
    >
      {title} <span className="text-yellow">{colouredText}</span>
    </h2>
  );
};

export default Heading;
