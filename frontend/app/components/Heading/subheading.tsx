import { twMerge } from "tailwind-merge";

const SubHeading = ({
  title,
  colouredText,
  className,
}: {
  title: string;
  colouredText?: string;
  className?: string;
}) => {
  return (
    <h3
      className={twMerge(
        `font-montserrat box-border font-bold uppercase ${className}`,
      )}
    >
      {title}{" "}
    </h3>
  );
};

export default SubHeading;
