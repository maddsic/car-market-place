import { twMerge } from "tailwind-merge";

const Button = ({
  title,
  classNames,
  disabled,
}: {
  title: string | any;
  classNames?: string;
  disabled?: boolean;
}) => {
  return (
    <span>
      <button
        disabled={disabled}
        className={twMerge(
          `rounded-sm bg-yellow px-6 py-2 font-bold uppercase shadow-2xl ${classNames}`,
        )}
      >
        {title}
      </button>
    </span>
  );
};

export default Button;
