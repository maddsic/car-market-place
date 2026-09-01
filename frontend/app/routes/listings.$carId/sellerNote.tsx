import SubHeading from "~/components/Heading/subheading";
import { Car } from "~/interfaces";

const SellerNote = ({ car }: { car: Car }) => {
  return (
    <div className="mt-4">
      <SubHeading title="seller's notes" />
      <p className="gray__text-light mt-4 font-sans text-[14px] md:text-[14px]">
        {car?.seller_note}
      </p>
    </div>
  );
}

export default SellerNote;


