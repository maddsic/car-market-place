const ListingImg = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div className="relative max-h-32 w-[25%]  cursor-pointer gap-4">
      <img
        src={imageUrl}
        alt=""
        sizes="30vw"
        className="rounded-md object-cover bg-gray-200"
      />
    </div>
  );
};

export default ListingImg;
