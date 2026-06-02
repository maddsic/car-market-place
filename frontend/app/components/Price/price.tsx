import { twMerge } from "tailwind-merge";

const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GMD",
  minimumFractionDigits: 0,
});

interface PriceProps {
  price: string | number;
  className?: string;
}

const Price = ({ price, className }: PriceProps) => {
  // 2. Handle potential string inputs and non-numbers safely
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;
  const formattedPrice = isNaN(numericPrice) ? "Price TBD" : currencyFormatter.format(numericPrice);

  return (
    <span
      className={twMerge(
        "clip-path relative flex items-center border-b-2 border-b-primary bg-yellow px-5 py-2 font-montserrat text-[18px] font-extrabold text-white",
        className
      )}
    >
      <p>{formattedPrice}</p>
    </span>
  );
};

export default Price;
