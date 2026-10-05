import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ListSubMenuProps {
  text: string;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ListingSubHeader: React.FC<ListSubMenuProps> = ({
  text,
  icon,
  className,
  onClick,
}) => {
  return (
    <span
      className={twMerge(
        "flex w-fit items-center gap-1 rounded-2xl border px-2 py-1 text-[8px] uppercase text-gray-500 md:text-[10px]",
        onClick ? "cursor-pointer" : "cursor-default",
        className
      )}
      onClick={onClick}
    >
      {icon && <span className="text-yellow">{icon}</span>}
      {text}
    </span>
  );
};
