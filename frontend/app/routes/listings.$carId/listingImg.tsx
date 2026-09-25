import { cn } from "~/lib/utils";

interface ListingSmallImageProps {
  imageUrl: string,
  onClick: () => void,
  className?: string
}

export const ListingSmallImg = ({ imageUrl, onClick, className }: ListingSmallImageProps) => {
  return (
    <div className="relative h-36 w-full cursor-pointer overflow-hidden rounded-lg bg-gray-100">
      <img
        src={imageUrl}
        alt="Car thumbnail"
        sizes="30vw"
        onClick={onClick}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105",
          className
        )}
      />
    </div>
  );
};
