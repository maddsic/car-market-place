import { MdOutlineGridView } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import SubHeading from "~/components/Heading/subheading";
import { ProfileCars } from "./ProfileCars";

interface DealerInventoryTabProps {
  userCars: any[];
  dealers: any;
}

export default function Inventory({
  userCars,
  dealers,
}: DealerInventoryTabProps) {
  return (
    <section>
      <SubHeading
        className="font-extrabold capitalize md:text-xl"
        title={dealers ? "Dealer Inventory" : "Seller Inventory"}
      />
      <div className="mt-5">
        <div className="flex items-center gap-2">
          <span className="font-body uppercase antialiased">View as:</span>{" "}
          <span className="cursor-pointer bg-gray-200 p-1 hover:bg-gray-300/40">
            <MdOutlineGridView size={18} className="gray__text-light" />
          </span>
          <span className="cursor-pointer bg-gray-200 p-1 hover:bg-gray-300/40">
            <FaListUl size={18} className="gray__text-light" />
          </span>
        </div>
        <ProfileCars userCars={userCars} dealerFilteredCars={dealers} />
      </div>
    </section>
  );
}
