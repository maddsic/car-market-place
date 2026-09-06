import React from "react";
import { twMerge } from "tailwind-merge";

// Formatter with fallback and optional fraction digit control
const createCurrencyFormatter = (fractionDigits: number = 0) =>
  new Intl.NumberFormat("en-GM", {
    style: "currency",
    currency: "GMD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

interface PriceProps {
  price: string | number;
  className?: string;
  variant?: "solid" | "badge" | "minimal";
  size?: "sm" | "md" | "lg";
  showFraction?: boolean;
}

const Price: React.FC<PriceProps> = ({
  price,
  className,
  variant = "solid",
  size = "md",
  showFraction = false,
}) => {
  // Safe numeric parsing
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;
  const isValidPrice = !isNaN(numericPrice) && numericPrice !== null;

  const formattedPrice = isValidPrice
    ? createCurrencyFormatter(showFraction ? 2 : 0).format(numericPrice)
    : "Price TBD";

  // Size variants
  const sizeClasses = {
    sm: "px-3 py-1 text-xs font-bold",
    md: "px-4 py-2 text-base font-extrabold md:text-lg",
    lg: "px-6 py-2.5 text-xl font-black md:text-2xl tracking-tight",
  };

  // Modern visual styles
  const variantClasses = {
    // High-contrast primary badge (slanted/angled cut feel with modern rounded corners & gradient)
    solid:
      "bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 shadow-md hover:shadow-lg transition-all duration-200 rounded-lg border-b-2 border-amber-700/40",

    // Glassmorphic / Subtle badge outline
    badge:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 backdrop-blur-md rounded-full",

    // Minimalist clean text without background box
    minimal: "bg-transparent text-slate-900 dark:text-slate-100 p-0 border-none font-bold",
  };

  return (
    <span
      className={twMerge(
        "inline-flex items-center justify-center font-montserrat whitespace-nowrap select-none",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <span>{formattedPrice}</span>
    </span>
  );
};

export default Price;
