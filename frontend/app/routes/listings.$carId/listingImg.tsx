import { cn } from "~/lib/utils";

interface ListingSmallImageProps {
  imageUrl: string;
  onClick: () => void;
  className?: string;
  alt?: string;
}

export const ListingSmallImg = ({
  imageUrl,
  onClick,
  className,
  alt = "Car thumbnail",
}: ListingSmallImageProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500",
        className
      )}
    >
      <img
        src={imageUrl}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </button>
  );
};
