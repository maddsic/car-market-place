const ListingImg = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div className="relative h-32 w-[25%] cursor-pointer gap-4">
      <img
        src={imageUrl}
        alt=""
        sizes="30vw"
        className="rounded-md object-cover"
      />
    </div>
  );
};

export default ListingImg;
