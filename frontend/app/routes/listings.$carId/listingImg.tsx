export const ListingSmallImg = ({
  className,
  imageUrl,
  onClick,
}: {
  className?: string;
  imageUrl: string;
  onClick?: () => void;
}) => {
  return (
    <div className="relative max-h-32 w-[25%] cursor-pointer gap-4">
      <img
        src={imageUrl}
        alt=""
        sizes="30vw"
        className={className}
        onClick={onClick}
      />
    </div>
  );
};
