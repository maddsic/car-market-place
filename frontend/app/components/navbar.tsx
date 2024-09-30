import { NavLink } from "@remix-run/react";
import { FaCarSide, FaUserCircle } from "react-icons/fa";

const NavLinks = [
  {
    id: 1,
    title: "Home",
    href: "/",
  },
  {
    id: 2,
    title: "inventory",
    href: "/",
  },
  {
    id: 3,
    title: "listings",
    href: "/",
  },
  {
    id: 4,
    title: "dealers",
    href: "/",
  },
];

const Navbar = () => {
  return (
    <main className="relative h-[80px] w-full bg-primary">
      <nav className="max__container h-full text-white">
        <div className="flex h-full items-center justify-between">
          <h1 className="cursor-pointer text-2xl font-bold tracking-wider">
            <span className="text-yellow">G</span>amAutos
          </h1>

          <ul className="hidden items-center justify-between gap-5 text-sm font-semibold uppercase lg:flex">
            {NavLinks.map((link) => (
              <li key={link.id} className="tracking-wider">
                <NavLink to={link.href}>{link.title}</NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-center gap-5 md:gap-10">
            <span className="rounded-full bg-yellow p-2 md:hidden">
              <FaCarSide size={24} className="cursor-pointer" />
            </span>
            <span className="rounded-full bg-gray-500 p-2">
              <FaUserCircle size={24} className="cursor-pointer" />
            </span>

            <button className="hidden items-center gap-2 bg-yellow px-4 py-2 text-sm font-semibold hover:bg-yellow/80 md:flex">
              <FaCarSide />
              Add Your Item
            </button>
          </div>
        </div>
      </nav>
    </main>
  );
};

export default Navbar;
