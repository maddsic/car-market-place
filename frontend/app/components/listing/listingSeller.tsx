import React from "react";

interface ListingSellerProps {
  imgUrl: string;
  name: string;
  desc?: string;
}

const ListingSeller: React.FC<ListingSellerProps> = ({
  imgUrl,
  name,
  desc = "private Seller",
}) => {
  return (
    <span className="flex items-center gap-3 border-b pb-6">
      <span className="h-10 w-10">
        <img src={imgUrl} alt="" className="rounded-full" />
      </span>
      <span className="flex flex-col gap-0">
        <span className="font-bold capitalize">{name}</span>
        <span className="capitalize text-gray-600 md:text-[10px]">{desc}</span>
      </span>
    </span>
  );
};

export default ListingSeller;
