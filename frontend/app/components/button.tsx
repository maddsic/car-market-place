import { twMerge } from "tailwind-merge";

const Button = ({
  title,
  classNames,
}: {
  title: string | any;
  classNames?: string;
}) => {
  return (
    <span>
      <button
        className={twMerge(
          `rounded-sm bg-btn px-6 py-2 font-bold uppercase shadow-2xl shadow-black ${classNames}`,
        )}
      >
        {title}
      </button>
    </span>
  );
};

export default Button;
