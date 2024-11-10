import { MdCheckCircleOutline } from "react-icons/md";

const ListingFeatures = ({ text }: { text: string }) => {
  return (
    <span className="mt-2 flex items-center gap-2 text-[12px] text-gray-600">
      <MdCheckCircleOutline className="text-yellow" size={14} />
      <span className="capitalize">{text}</span>
    </span>
  );
};

export default ListingFeatures;
