const ListingImg = ({ imgUrl }: { imgUrl: string }) => {
  return (
    <div className="relative h-32 w-[25%] cursor-pointer gap-4">
      <img
        src={imgUrl}
        alt=""
        sizes="30vw"
        className="rounded-md object-cover"
      />
    </div>
  );
};

export default ListingImg;
