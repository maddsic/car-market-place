import { twMerge } from "tailwind-merge";

const Heading = ({
  title,
  colouredText,
  classNames,
}: {
  title: string;
  colouredText?: string;
  classNames?: string;
}) => {
  return (
    <h2
      className={twMerge(
        "font-montserrat my-2 block text-balance font-extrabold capitalize leading-tight tracking-tight",
        "text-[26px] sm:text-[30px] md:text-[34px] lg:text-[40px]",
        classNames,
      )}
    >
      {title}
      {colouredText && (
        <>
          {" "}
          <span className="text-yellow">{colouredText}</span>
        </>
      )}
    </h2>
  );
};

export default Heading;
