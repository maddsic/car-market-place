import Price from "~/components/Price/price";

export const BigImage = ({
  imageUrl,
  price,
}: {
  imageUrl: string;
  price: number;
}) => {
  return (
    <div className="relative mb-5 mt-2 max-h-[500px] overflow-clip bg-gray-200">
      <img
        src={imageUrl}
        alt=""
        className="max-h-[400px] w-full rounded-md object-cover md:max-h-[500px]"
      />
      <Price
        price={price}
        className="absolute bottom-0 right-0 border-b-4 border-b-primary  lg:hidden"
      />
    </div>
  );
};
