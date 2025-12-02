import { twMerge } from "tailwind-merge";

const Price = ({
  price,
  className,
}: {
  price: string | number;
  className?: string;
}) => {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GMD",
  });

  const formattedPrice = currencyFormatter.format(price);

  return (
    <span
      className={twMerge(
        `clip-path font-montserrat relative flex items-center border-b-2 border-b-primary bg-yellow px-5 py-2 text-[18px] font-extrabold text-white ${className}`,
      )}
    >
      <p>{formattedPrice}</p>
    </span>
  );
};

export default Price;
