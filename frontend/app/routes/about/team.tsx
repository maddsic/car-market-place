import { BsTelephoneOutboundFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import Heading from "~/components/Heading/heading";
import { TeamData } from "~/data/team";

const Team = () => {
  return (
    <section className="bg-slate-50 py-14 lg:py-20">
      <div className="max__container">
        {/* HEADER */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-yellow">
            The people behind GamAutos
          </p>
          <Heading title="meet our" colouredText="team" />
          <div className="mt-1 h-1 w-16 rounded-full bg-yellow" />
        </div>

        {/* GRID */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TeamData.map((member) => (
            <TeamMember member={member} key={member.email} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;

interface TeamMemberProps {
  name: string;
  position: string;
  image: string;
  email: string;
  phone: string;
}

function TeamMember({ member }: { member: TeamMemberProps }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* PHOTO */}
      <div className="aspect-[4/5] overflow-hidden bg-slate-200">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* INFO */}
      <div className="p-5 text-center">
        <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-yellow">
          {member.position}
        </p>

        {/* CONTACT BUTTONS (always visible, so they work on phones too) */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <a
            href={`mailto:${member.email}`}
            aria-label={`Email ${member.name}`}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-700 transition hover:border-yellow hover:text-yellow active:scale-95"
          >
            <MdEmail size={16} />
            Email
          </a>
          <a
            href={`tel:${member.phone.replace(/\s/g, "")}`}
            aria-label={`Call ${member.name}`}
            className="flex items-center justify-center gap-2 rounded-xl bg-yellow py-2.5 text-xs font-bold text-slate-950 transition hover:bg-amber-300 active:scale-95"
          >
            <BsTelephoneOutboundFill size={13} />
            Call
          </a>
        </div>
      </div>
    </div>
  );
}
