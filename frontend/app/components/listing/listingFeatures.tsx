import { MdCheckCircleOutline } from "react-icons/md";

const ListingFeatures = ({ text }: { text: string }) => {
  return (
    <span className="gray__text-medium mt-2 flex items-center gap-2 text-[13px]">
      <MdCheckCircleOutline className="text-yellow" size={14} />
      <span className="capitalize">{text}</span>
    </span>
  );
};

export default ListingFeatures;
