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
  const content = (
    <>
      {icon && <span className="flex shrink-0 items-center text-yellow">{icon}</span>}
      <span className="truncate">{text}</span>
    </>
  );

  const baseStyles = twMerge(
    "inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-600 transition md:text-xs",
    onClick && "cursor-pointer hover:border-gray-300 hover:bg-gray-50 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/20",
    className
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={baseStyles}>
        {content}
      </button>
    );
  }

  return <span className={baseStyles}>{content}</span>;
};
