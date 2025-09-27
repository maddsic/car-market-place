import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ContactProps {
  text: string;
  icon?: ReactNode;
  className?: string;
}

const Contact: React.FC<ContactProps> = ({ text, icon, className }) => {
  return (
    <div
      className={twMerge(
        `flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 transition-all duration-300 ease-in-out hover:bg-gray-100 hover:shadow-lg ${className}`,
      )}
    >
      {/* Icon */}{" "}
      {icon && (
        <span className="flex items-center justify-center rounded-full bg-primary/10 p-2 text-white">
          {icon}
        </span>
      )}
      {/* Text */}
      <span className="text-sm font-semibold uppercase tracking-wide text-gray-800">
        {text}
      </span>
    </div>
  );
};

export default Contact;
