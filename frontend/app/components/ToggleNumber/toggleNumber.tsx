import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { Car } from "~/interfaces";

export const ToggleShowNumber = ({
  showNumber,
  handleShowNumber,
  car,
}: {
  showNumber: Boolean;
  handleShowNumber: () => void;
  car: Car;
}) => {
  return (
    <div className="mt-5 flex cursor-pointer items-center gap-3 px-2 py-4">
      <BsFillTelephoneOutboundFill className="text-yellow" size={10} />

      {showNumber ? (
        <a href={`tel:+220${car?.owner?.phone}`} className="text-md font-bold">
          (+220) {car?.owner?.phone}
        </a>
      ) : (
        <span className="text-md font-bold">
          {" "}
          (+220) {car?.owner?.phone.slice(0, 3)}****
        </span>
      )}
      <span
        className="underline-dotted cursor-pointer text-[13px] capitalize underline decoration-dotted underline-offset-4 hover:decoration-yellow"
        onClick={handleShowNumber}
      >
        {showNumber ? "Hide Number" : "Show Number"}
      </span>
    </div>
  );
};
