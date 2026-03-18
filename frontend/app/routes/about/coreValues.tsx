import React from "react";
import { GiCheckMark } from "react-icons/gi";
import Heading from "~/components/Heading/heading";

const CoreValues = () => {
  return (
    <section className="relative grid gap-x-5 gap-y-10 md:grid-cols-2">
      <div>
        <Heading title="core values" classNames="uppercase" />
        <hr className="mt-5" />
        <p className="gray__text-light font-body leading-normal tracking-wide">
          We go through extensive factory training so that we may provide you
          with the knowledge you need to make an educated decision in choosing
          the vehicle that is right for your lifestyle.
        </p>

        {/* LIST */}
        <ul className="font-body mt-5 flex flex-col gap-2">
          <AboutList
            text="Stress-free finance department."
            icon={<GiCheckMark className="text-yellow" />}
          />
          <AboutList
            text="Robust selection of popular vehicles.."
            icon={<GiCheckMark className="text-yellow" />}
          />
          <AboutList
            text="350 offers on site, trusted by a community."
            icon={<GiCheckMark className="text-yellow" />}
          />
          <AboutList
            text="Maintain your car to stay safe on the road"
            icon={<GiCheckMark className="text-yellow" />}
          />
          <AboutList
            text="We know how to handle a wide range of car services."
            icon={<GiCheckMark className="text-yellow" />}
          />
        </ul>
      </div>
      <div>
        <img
          src="/about-us-2-image.jpg"
          alt="ceo of gamautos image"
          className="h-[290px] w-full"
        />
      </div>
    </section>
  );
};

export default CoreValues;

function AboutList({ text, icon }: { text: String; icon: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3">
      {icon ?? <span>{icon}</span>}
      <span className="font-body gray__text-light">{text}</span>
    </li>
  );
}
