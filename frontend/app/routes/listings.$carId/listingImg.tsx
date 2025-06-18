export const ListingSmallImg = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div className="relative max-h-32 w-[25%] cursor-pointer gap-4">
      <img
        src={imageUrl}
        alt=""
        sizes="30vw"
        className="rounded-md bg-gray-200 object-cover"
      />
    </div>
  );
};
