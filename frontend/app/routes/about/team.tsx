import Heading from "~/components/Heading/heading";
import { StyledUndeline } from "./underline";
import { BsTelephoneFill, BsTelephoneOutboundFill } from "react-icons/bs";
import { TeamData } from "~/data/team";
import { MdEmail } from "react-icons/md";

const Team = () => {
  return (
    <section className="mb- relative bg-[#f0f2f5] md:p-10 lg:p-10">
      <div className="max__container relative flex flex-col gap-5">
        <div className="flex flex-col items-center justify-center gap-2">
          <Heading
            title="our team"
            classNames="text-center uppercase lg:text-[28px]"
          />
          <StyledUndeline />
        </div>
        <div className="mb-10 mt-2 grid gap-10 md:grid-cols-2 lg:mt-5 lg:grid-cols-4 lg:p-10">
          {TeamData.map((member, index) => (
            <TeamMember member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;

interface TeamMemberProps {
  id: number;
  image: string;
  name: string;
  position: string;
  email: string;
}

function TeamMember({
  member,
  index,
}: {
  member: TeamMemberProps;
  index: number;
}) {
  return (
    <div
      key={index}
      className="font-montserrat group relative flex flex-col gap-3"
    >
      <img
        src={member.image}
        alt=""
        className="aspect-[4/3] h-auto max-w-full overflow-hidden rounded-sm bg-slate-300 object-cover"
      />
      {/* INFO */}
      <span className="font-body rounded-sm border-yellow bg-white px-10 py-5 text-center transition-all duration-500 group-hover:bg-black group-hover:text-white">
        <p className="text-[14px] font-semibold uppercase">{member.name}</p>
        <em className="gray__text-soft text-[13px] capitalize group-hover:text-white">
          {member.position}
        </em>
      </span>
      {/* CONTACT - HIDDEN */}
      <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-2 p-5 opacity-0 transition-all duration-1000 group-hover:opacity-100">
        <span className="flex items-center gap-2 rounded-2xl bg-yellow px-3 py-2 text-xs font-semibold text-white">
          <span className="rounded-full border-2 border-black p-1">
            <MdEmail fill="black" />
          </span>

          {member.email}
        </span>
        <span className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm text-gray-900">
          <span className="rounded-full border-2 border-yellow p-1">
            <BsTelephoneOutboundFill className="text-yellow" />
          </span>
          <a href="tel:+2207531646" className="ld:text-md">
            +220 7531646
          </a>
        </span>
      </div>
    </div>
  );
}
