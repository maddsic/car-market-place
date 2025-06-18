import Heading from "~/components/Heading/heading";

const AboutGamAutos = () => {
  return (
    <section className="grid gap-5 md:grid-cols-2 lg:p-0">
      <aside className="aside-left">
        <div className="">
          <img
            src="/aboutus.jpg"
            alt="ceo of gamautos image"
            className="h-[290px] w-full"
          />
        </div>
      </aside>
      <aside className="aside-right flex flex-col gap-4">
        <Heading
          title="welcome to"
          colouredText="gamautos"
          classNames="uppercase"
        />

        <p className="gray__text-light text-[14px] leading-normal tracking-wide">
          Before we get ahead of ourselves, we want to welcome you to Loeber
          Motors. While nothing can replace thing on-the-lot experience.
        </p>
        <p className="gray__text-light text-[14px] leading-normal tracking-wide">
          We appreciate you taking the time today to visit our web site. Our
          goal is to give you an interactive tour of our new and used inventory,
          as well as allow you to conveniently get a quote, schedule a service
          appointment, or apply for financing. The search for a luxury car is
          filled with high expectations. Undoubtedly, that has a lot to do with
          the vehicles you are considering, but at Motors, we think you should
          also have pretty high expectations for your dealership.
        </p>

        <em className="gray__text-light text-[14px] tracking-wide">
          — Kunta Sidibeh, President of GamAutos
        </em>
      </aside>
    </section>
  );
};

export default AboutGamAutos;
