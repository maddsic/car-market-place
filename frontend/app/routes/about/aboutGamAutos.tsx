import Heading from "~/components/Heading/heading";

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

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Buying a car in The Gambia is a hassle. You visit one dealership after
          another, keep calling friends to ask if they know someone selling the
          car you want, or scroll through social media hoping to find a good
          one. It takes time, and it is hard to know what is available or what
          a fair price is.
        </p>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          I started GamAutos to fix that. Dealers and private sellers list their
          cars in one place, with clear photos, prices in Dalasi and a direct
          line to the seller, so you can find the car you want without chasing
          it around town.
        </p>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Whether you are buying, selling or renting, we want the process to
          feel simple and honest. Thank you for visiting, and please reach out
          if there is anything we can do better.
        </p>

        {/* FOUNDER SIGNATURE */}
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
