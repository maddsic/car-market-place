import { twMerge } from "tailwind-merge";

const Button = ({
  title,
  className,
  disabled,
  type,
  icon,
}: {
  title: string | any;
  className?: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  icon?: React.ReactNode;
}) => {
  const baseStyles = `rounded-sm bg-yellow px-6 py-2 font-bold uppercase shadow-2xl transition-colors duration-200 ease-in-out text-white ${icon ? "flex items-center gap-2 justify-center" : ""}`;

  const interactiveStyles =
    "hover:bg-yellow/80 focus:outline-none focus:ring-2 focus:ring-yellow/50";

  const disabledStyles = "cursor-not-allowed bg-gray-400 opacity-50";

  const finalStyles = twMerge(
    baseStyles,
    disabled ? disabledStyles : interactiveStyles,
    className,
  );
  return (
    <button type={type} disabled={disabled} className={finalStyles}>
      {icon && <span className="text-white">{icon}</span>}
      {title}
    </button>
  );
};

export default Button;
