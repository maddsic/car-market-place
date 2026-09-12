import Heading from "~/components/Heading/heading";
import { StyledUndeline } from "./underline";

const AboutGamAutos = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* IMAGE CONTAINER */}
      <aside className="relative group">
        <div className="relative overflow-hidden rounded-2xl shadow-lg border border-slate-100 bg-slate-200">
          <img
            src="/aboutsUs3.jpeg"
            alt="Kunta Sidibeh - CEO & Founder of GamAutos"
            className="w-full h-[320px] sm:h-[400px] md:h-[450px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        {/* Subtle decorative background accent */}
        <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border-2 border-primary/20 -z-10 hidden sm:block" />
      </aside>

      {/* CONTENT CONTAINER */}
      <aside className="flex flex-col gap-5">
        <Heading
          title="welcome to"
          colouredText="gamautos"
          classNames="uppercase tracking-tight text-2xl sm:text-3xl font-extrabold"
        />
        {/* <StyledUndeline /> */}


        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Before we get ahead of ourselves, we want to warmly welcome you to GamAutos.
          While nothing replaces the hands-on, on-the-lot experience, our digital showroom is designed to give you complete control from anywhere.
        </p>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Thank you for taking the time to visit our platform. Our mission is to
          provide an intuitive experience that lets you explore our wide
          selection of new and pre-owned vehicles, request quotes, schedule services, or apply for financing—all in one convenient place. We understand that shopping for a vehicle comes with high expectations, and we are committed to delivering not just exceptional vehicles, but exceptional service.
        </p>

        {/* PRESIDENT QUOTE SIGNATURE */}
        <div className="pt-2 border-l-4 border-primary pl-4 my-2">
          <p className="text-xs sm:text-sm font-semibold text-slate-900 tracking-wide uppercase">
            Kunta Sidibeh
          </p>
          <p className="text-xs text-slate-500 font-medium">
            CEO & Founder, GamAutos
          </p>
        </div>
      </aside>
    </section>
  );
};

export default AboutGamAutos;
