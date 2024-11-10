import { span } from "framer-motion/client";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ListSubMenuProps {
  text: string;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

const ListingSubHeader: React.FC<ListSubMenuProps> = ({
  text,
  icon,
  className,
  onClick,
}) => {
  return (
    <span
      className={twMerge(
        `text-gray-500, flex items-center gap-1 rounded-2xl border px-[8px] py-1 text-[8px] uppercase md:text-[10px] ${className}`,
      )}
      onClick={onClick}
    >
      {icon && <span className="text-yellow">{icon}</span>}
      {text}
    </span>
  );
};

export default ListingSubHeader;
