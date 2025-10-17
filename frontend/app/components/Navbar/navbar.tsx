import { Link, NavLink } from "@remix-run/react";
import {
  FaCarSide,
  FaGavel,
  FaHome,
  FaInfoCircle,
  FaPhoneAlt,
  FaUserCircle,
  FaUsers,
} from "react-icons/fa";
import Logo from "../Logo/logo";

const NavLinks = [
  { id: 1, title: "Home", href: "/", icon: <FaHome size={22} /> },
  {
    id: 2,
    title: "Inventory",
    href: "/inventory",
    icon: <FaCarSide size={22} />,
  },
  { id: 4, title: "Dealers", href: "/dealers", icon: <FaUsers size={22} /> },
  { id: 5, title: "Auction", href: "/auctions", icon: <FaGavel size={22} /> },
  { id: 6, title: "About", href: "/about", icon: <FaInfoCircle size={22} /> },
  { id: 7, title: "Contact", href: "/contact", icon: <FaPhoneAlt size={22} /> },
];

const Navbar = () => {
  return (
    <main className="relative h-[80px] w-full">
      <nav className="fixed left-0 top-0 z-20 h-[80px] w-full bg-primary">
        <div className="max__container z-999 relative h-full text-white">
          <div className="flex h-full items-center justify-between">
            <Logo />
            {/* DESKTOP NAVLINKS */}
            <ul className="hidden items-center justify-between gap-5 text-sm font-semibold uppercase lg:flex">
              {NavLinks.map((link) => (
                <li key={link.id} className="tracking-wider">
                  <NavLink to={link.href}>{link.title}</NavLink>
                </li>
              ))}
            </ul>
            {/* USER ACTIONS - Login and AddListing*/}
            <div className="flex items-center justify-center gap-2 md:gap-10">
              <Link
                to="/addListing"
                className="rounded-full bg-yellow p-2 md:hidden"
              >
                <FaCarSide size={24} className="cursor-pointer" />
              </Link>
              {/* SIGN-IN BUTTON */}
              <Link to={"/auth/login"} className="rounded-full bg-gray-500 p-2">
                <FaUserCircle size={24} className="cursor-pointer" />
              </Link>

              {/* ADD LISTING BUTTON */}
              <Link to="/addListing">
                <button className="hidden items-center gap-2 rounded bg-yellow px-4 py-3 text-sm font-semibold hover:bg-yellow/80 md:flex">
                  <FaCarSide size={20} color="black" />
                  Add Your Item
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* MOBILE NAVBAR */}
      <div className="fixed bottom-0 left-0 z-20 flex w-full justify-around rounded-xl border-t border-primary bg-gray-50 py-2 shadow-md md:hidden">
        {NavLinks.map((link) => {
          return (
            <NavLink
              key={link.id}
              to={link.href}
              className={`flex flex-col items-center justify-center text-xs transition`}
            >
              <div className={`rounded-full p-2`}>{link.icon}</div>
              <span className="mt-1 text-[10px]">{link.title}</span>
            </NavLink>
          );
        })}
      </div>
    </main>
  );
};

export default Navbar;
