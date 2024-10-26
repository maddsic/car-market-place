import { NavLink } from "@remix-run/react";
import { FaCarSide, FaUserCircle } from "react-icons/fa";
import Logo from "../Logo/page";

const NavLinks = [
  {
    id: 1,
    title: "Home",
    href: "/",
  },
  {
    id: 2,
    title: "inventory",
    href: "/inventory",
  },
  {
    id: 3,
    title: "listings",
    href: "/listings",
  },
  {
    id: 4,
    title: "dealers",
    href: "/dealers",
  },
  {
    id: 5,
    title: "auction",
    href: "/auctions",
  },
];

const Navbar = () => {
  return (
    <main className="relative h-[100px] w-full">
      <nav className="fixed left-0 top-0 z-20 h-[100px] w-full bg-primary">
        <div className="max__container z-999 relative h-full text-white">
          <div className="flex h-full items-center justify-between">
            <Logo />
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

              <button className="hidden items-center gap-2 rounded bg-yellow px-4 py-3 text-sm font-semibold hover:bg-yellow/80 md:flex">
                <FaCarSide size={20} color="black" />
                Add Your Item
              </button>
            </div>
          </div>
        </div>
      </nav>
    </main>
  );
};

export default Navbar;
