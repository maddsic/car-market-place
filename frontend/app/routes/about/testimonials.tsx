import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { GiCelebrationFire } from "react-icons/gi";
import { IoMdHappy } from "react-icons/io";
import Heading from "~/components/Heading/heading";
import { testimonialData } from "~/data/testimonail";

const Testimonials = () => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [visible, setVisible] = useState<number>(1);

  const handleNext = (): void => {
    if (startIndex + 1 < testimonialData.length - visible + 1) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = (): void => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <aside className="relative">
      <Heading title="customer testimonials" classNames="uppercase mb-5" />
      <hr />
      {/* Body */}
      <div className="relative flex flex-col gap-5 pt-3">
        {testimonialData
          .slice(startIndex, startIndex + visible)
          .map((item, index) => (
            <div key={index} className="flex flex-col gap-5">
              <p className="gray__text-light text-[14px]">
                Happy customers share their experiences.
              </p>
              <em className="font-body gray__text-soft leading-5">
                {item.message}
              </em>
              {/* FOOTER */}
              <div className="gray__text-light flex items-center justify-between">
                <div className="font-body flex items-center gap-5">
                  <span className="font-body text-[14px] font-thin uppercase">
                    {item.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <IoMdHappy size={24} className="text-yellow" />
                    <em className="gray__text-light font-body">{item.car}</em>
                  </span>
                </div>
                <div className="flex cursor-pointer items-center gap-10">
                  <ChevronLeft size={24} onClick={handlePrev} />
                  <ChevronRight size={24} onClick={handleNext} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </aside>
  );
};

export default Testimonials;
