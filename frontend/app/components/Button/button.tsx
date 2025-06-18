import { twMerge } from "tailwind-merge";

const Button = ({
  title,
  classNames,
  disabled,
  type,
}: {
  title: string | any;
  classNames?: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
}) => {
  return (
    <span>
      <button
        type={type}
        disabled={disabled}
        className={twMerge(
          `rounded-sm bg-yellow px-6 py-2 font-bold uppercase shadow-2xl hover:bg-yellow/80 ${classNames}`,
        )}
      >
        {title}
      </button>
    </span>
  );
};

export default Button;
