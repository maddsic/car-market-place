import Heading from "~/components/Heading/heading";

const AboutGamAutos = () => {
  return (
    <section className="grid gap-5 md:grid-cols-2 lg:p-0">
      <aside className="aside-left">
        <div className="">
          <img
            src="/aboutsUs3.jpeg"
            alt="ceo of gamautos image"
            className="aspect-square h-[290px] w-full md:h-[380px]"
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
          Before we get ahead of ourselves, we want to welcome you to Gamautos .
          While nothing can replace thing on-the-lot experience.
        </p>
        <p className="gray__text-light text-[14px] leading-normal tracking-wide">
          Thank you for taking the time to visit our website. Our mission is to
          provide you with an engaging experience that lets you explore our wide
          selection of new and pre-owned vehicles, request a quote, schedule a
          service, or apply for financing—all in one convenient place. We
          understand that shopping for a vehicle comes with high expectations.
          While the quality of the cars we offer certainly sets the standard, we
          believe your experience with our dealership should exceed it. At
          Gamautos, we’re committed to delivering not just exceptional vehicles,
          but exceptional service.
        </p>

        <em className="gray__text-light text-[14px] tracking-wide">
          — Kunta Sidibeh, President of GamAutos
        </em>
      </aside>
    </section>
  );
};

export default AboutGamAutos;
