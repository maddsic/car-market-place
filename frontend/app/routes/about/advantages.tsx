import { Link } from "@remix-run/react";
import { FaArrowRight, FaStore } from "react-icons/fa";
import { FaMoneyBill1 } from "react-icons/fa6";
import { IoCarSportOutline } from "react-icons/io5";
import Heading from "~/components/Heading/heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

const advantages = [
  {
    value: "item-1",
    icon: <FaMoneyBill1 size={20} />,
    question: "Want to sell your car?",
    answer:
      "List your car in a few minutes and reach buyers across The Gambia. Buyers contact you directly by phone or WhatsApp, so you stay in control of the sale.",
    linkText: "List your car",
    href: "/addListing",
  },
  {
    value: "item-2",
    icon: <IoCarSportOutline size={20} />,
    question: "Looking for a car?",
    answer:
      "Browse cars from dealers and private sellers in one place, with prices in Dalasi. Our cars are delivered fully registered with all requirements completed.",
    linkText: "Browse cars",
    href: "/inventory",
  },
  {
    value: "item-3",
    icon: <FaStore size={18} />,
    question: "Looking for a dealer?",
    answer:
      "Find local dealerships, see what they have in stock, their ratings and where they are based, then contact them directly.",
    linkText: "Find dealers",
    href: "/dealers",
  },
];

const Advantages = () => {
  return (
    <aside className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
      <Heading title="our" colouredText="advantages" classNames="uppercase" />
      <div className="mb-4 mt-1 h-1 w-16 rounded-full bg-yellow" />

      <Accordion type="multiple" defaultValue={["item-1"]}>
        {advantages.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3 text-left text-sm font-semibold text-slate-900 lg:text-base">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow/15 text-yellow">
                  {item.icon}
                </span>
                {item.question}
              </div>
            </AccordionTrigger>

            <AccordionContent className="pl-[52px]">
              <p className="text-sm leading-6 text-slate-600">{item.answer}</p>
              <Link
                to={item.href}
                className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-yellow transition hover:gap-3"
              >
                {item.linkText}
                <FaArrowRight size={12} />
              </Link>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
};

export default Advantages;
