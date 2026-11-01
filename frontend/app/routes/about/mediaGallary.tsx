import AboutCarousel from "~/components/AboutCarousel/Carousel";
import Heading from "~/components/Heading/heading";

const MediaGallery = () => {
  return (
    <section className="bg-slate-950 px-4 py-14 md:px-10 lg:px-20 lg:py-20">
      <div className="max__container text-white">
        <div className="flex flex-col items-center gap-2 text-center">
          <Heading
            title="media"
            colouredText="gallery"
            classNames="uppercase text-white"
          />
          <div className="h-1 w-16 rounded-full bg-yellow" />
          <p className="mt-2 max-w-xl text-sm text-slate-400">
            A look at GamAutos and the cars we work with.
          </p>
        </div>

        <AboutCarousel />
      </div>
    </section>
  );
};

export default MediaGallery;
