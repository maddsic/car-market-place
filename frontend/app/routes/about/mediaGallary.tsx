import AboutCarousel from "~/components/AboutCarousel/Carousel";
import Heading from "~/components/Heading/heading";
import { StyledUndeline } from "./underline";

const MediaGallary = () => {
  return (
    <section className="relative bg-slate-950 p-4 md:p-10 lg:p-20">
      <div className="max__container text-white">
        <div className="flex flex-col items-center justify-center gap-2">
          <Heading
            title="media gallary"
            classNames="text-center uppercase lg:text-[36px] shadow"
          />
          <StyledUndeline />
        </div>
        {/* Slider */}
        <AboutCarousel />
      </div>
    </section>
  );
};

export default MediaGallary;
