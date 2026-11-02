import { Link } from "@remix-run/react";
import { FaArrowRight } from "react-icons/fa";
import Heading from "~/components/Heading/heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

const faqs = [
  {
    question: "How do I buy a car?",
    answer:
      "Browse the inventory or use the search filters, then call or WhatsApp the seller from the listing. Visit the car, check it and agree the deal with the seller.",
  },
  {
    question: "How do I list my car for sale?",
    answer:
      "Create an account, click Sell Your Car, then add photos, your price in Dalasi and the car's details. Buyers will contact you directly by phone or WhatsApp.",
  },
  {
    question: "Do you deliver cars?",
    answer:
      "Many of our cars are fully registered and can be delivered to your door if agreed with dealer. Ask the dealer about delivery to your area, and about any cost, before you agree.",
  },
  {
    question: "Who handles the payment?",
    answer:
      "Payment is agreed directly between you and the seller. Never pay before you have seen the car and checked the registration papers.",
  },
];

const FAQ = () => {
  return (
    <section className="max__container px-4 py-10">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <Heading title="frequently asked" colouredText="questions" />
        <div className="h-1 w-16 rounded-full bg-yellow" />
      </div>

      {/* Questions */}
      <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-slate-100 bg-white px-5 shadow-sm sm:px-8">
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-sm font-semibold text-slate-900 hover:no-underline sm:text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-6 text-slate-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Help Center link */}
      <div className="mt-6 text-center">
        <Link
          to="/help"
          className="inline-flex items-center gap-2 text-sm font-bold text-yellow transition hover:gap-3"
        >
          Visit the Help Center for more answers
          <FaArrowRight size={12} />
        </Link>
      </div>
    </section>
  );
};

export default FAQ;
