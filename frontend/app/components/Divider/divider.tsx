import React from "react";
import { twMerge } from "tailwind-merge";

const Divider = ({ classNames }: { classNames?: string }) => {
  return (
    <hr className={twMerge(`h-[0.30rem] w-full bg-primary ${classNames}`)} />
  );
};

export default Divider;
