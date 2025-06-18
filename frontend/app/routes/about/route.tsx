import React, { Fragment } from "react";
import Heading from "../../components/Heading/heading";

// icons
import { GiCheckMark } from "react-icons/gi";
import AboutCarousel from "~/components/AboutCarousel/Carousel";
import CoreValues from "./coreValues";
import AboutGamAutos from "./aboutGamAutos";
import MediaGallary from "./mediaGallary";
import Advantages from "./advantages";
import Testimonials from "./testimonials";
import { StyledUndeline } from "./underline";
import Team from "./team";
import OurPartners from "./partners";

const AboutUs = () => {
  return (
    <Fragment>
      <div className="mb-10 flex flex-col gap-y-10 p-2">
        <div className="max__container font-montserrat relative flex flex-col gap-y-8 p-4 md:gap-y-16 md:p-10">
          <AboutGamAutos />
          <CoreValues />
        </div>
        <MediaGallary />
        <section className="max__container p-4 md:p-10 lg:p-10">
          <div className="grid gap-x-5 gap-y-8 md:grid-cols-2">
            <Advantages />
            <Testimonials />
          </div>
        </section>
        <Team />
        <OurPartners />
      </div>
    </Fragment>
  );
};

export default AboutUs;
