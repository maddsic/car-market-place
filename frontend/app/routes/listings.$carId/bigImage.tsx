import Price from "~/components/Price/price";

export const BigImage = ({
  imageUrl,
  price,
}: {
  imageUrl: string;
  price: string;
}) => {
  return (
    <div className="relative mb-5 mt-2 max-h-[500px] overflow-clip bg-gray-200">
      <img
        src={imageUrl}
        alt=""
        className="max-h-[400px] w-full rounded-md object-cover md:max-h-[500px]"
      />
      <span className="rotate-diagonal z-999 font-montserrat text-md absolute -left-10 top-6 bg-yellow px-14 py-2 text-center font-semibold uppercase text-white">
        special
      </span>
      <Price
        price={price}
        className="absolute bottom-0 right-0 border-b-4 border-b-primary px-3 text-sm md:text-base lg:hidden"
      />
    </div>
  );
};
