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
        `flex cursor-pointer items-center gap-4 rounded border bg-white px-2 py-3 hover:bg-slate-50 ${className} `,
      )}
    >
      {icon && <span>{icon}</span>}
      <span className="font-montserrat text-[14px] uppercase">{text}</span>
    </div>
  );
};

export default Contact;
