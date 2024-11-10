import { twMerge } from "tailwind-merge";

const SubHeading = ({
  title,
  colouredText,
  classNames,
}: {
  title: string;
  colouredText?: string;
  classNames?: string;
}) => {
  return (
    <h3
      className={twMerge(
        `font-montserrat box-border font-bold uppercase ${classNames}`,
      )}
    >
      {title}{" "}
    </h3>
  );
};

export default SubHeading;
