import React from "react";
import { FaCarSide } from "react-icons/fa";
import { FaMoneyBill1 } from "react-icons/fa6";
import { IoCarSportOutline } from "react-icons/io5";
import Heading from "~/components/Heading/heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

const Advantages = () => {
  return (
    <aside className="relative">
      <Heading title="our advantages" classNames="uppercase mb-5" />
      <hr />
      <Accordion type="multiple" className="relative" defaultValue={["item-1"]}>
        <AccordionItem value="item-1" defaultChecked={true}>
          <AccordionTrigger className="">
            <div className="flex items-center gap-2 text-[14px] font-semibold lg:text-[16px]">
              <FaMoneyBill1 size={24} className="text-extrabold text-yellow" />
              Do you want to sell a car?
            </div>
          </AccordionTrigger>
          <AccordionContent className="gray__text-soft my-2 text-xs leading-5">
            What&rsquo;s your car worth? Receive the absolute best value for
            your trade-in vehicle. We even handle all paperwork. Schedule your
            appointment today!
          </AccordionContent>
        </AccordionItem>
        {/*  */}
        <AccordionItem value="item-2">
          <AccordionTrigger className="">
            <div className="flex items-center gap-2 text-[14px] font-semibold lg:text-[16px]">
              <IoCarSportOutline
                size={24}
                className="text-extrabold text-yellow"
              />
              Are you looking for a new car?
            </div>
          </AccordionTrigger>
          <AccordionContent className="gray__text-soft my-2 text-xs leading-5">
            Our cars are delivered fully-registered with all requirements
            completed. We&rsquo;ll deliver your car wherever you are.
          </AccordionContent>
        </AccordionItem>
        {/*  */}
        <AccordionItem value="item-3">
          <AccordionTrigger className="">
            <div className="flex items-center gap-2 text-[14px] font-semibold lg:text-[16px]">
              <IoCarSportOutline
                size={24}
                className="text-extrabold text-yellow"
              />
              Are you looking for a dealer?
            </div>
          </AccordionTrigger>
          <AccordionContent className="gray__text-soft my-2 text-xs leading-5 hover:no-underline">
            Our cars are delivered fully-registered with all requirements
            completed. We&rsquo;ll deliver your car wherever you are.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default Advantages;
