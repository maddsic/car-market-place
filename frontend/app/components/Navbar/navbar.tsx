import { Link, NavLink } from "@remix-run/react";
import {
  FaCarSide,
  FaGavel,
  FaHome,
  FaInfoCircle,
  FaPhoneAlt,
  FaUserCircle,
  FaUsers,
  FaPlusCircle
} from "react-icons/fa";
import Logo from "../Logo/logo";

const NavLinks = [
  { id: 1, title: "Home", href: "/", icon: <FaHome size={20} /> },
  { id: 2, title: "Inventory", href: "/inventory", icon: <FaCarSide size={20} /> },
  { id: 4, title: "Dealers", href: "/dealers", icon: <FaUsers size={20} /> },
  { id: 5, title: "Auction", href: "/auctions", icon: <FaGavel size={20} /> },
  { id: 6, title: "About", href: "/about", icon: <FaInfoCircle size={20} /> },
  { id: 7, title: "Contact", href: "/contact", icon: <FaPhoneAlt size={20} /> },
];

const Navbar = () => {
  return (
    <header className="relative h-[80px] w-full">
      <nav className="fixed left-0 top-0 z-50 h-[80px] w-full bg-primary shadow-lg border-b border-white/5">
        <div className="max__container h-full px-4">
          <div className="flex h-full items-center justify-between">

            {/* LOGO SECTION */}
            <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              {/* Using bg-primary for the logo background */}
              <div className=" p-1.5 rounded-lg ">
                <Logo />
              </div>
              <span className="text-xl font-black tracking-tighter text-white hidden sm:block">
                GAMAUTOS
              </span>
            </Link>

            {/* DESKTOP NAVLINKS */}
            <ul className="hidden items-center gap-8 text-[13px] font-bold uppercase tracking-widest text-slate-300 lg:flex">
              {NavLinks.map((link) => (
                <li key={link.id}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `transition-colors hover:text-yellow ${isActive ? "text-yellow border-b-2 border-primary pb-1 underline-offset-4 underline" : ""
                      }`
                    }
                  >
                    {link.title}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* USER ACTIONS */}
            <div className="flex items-center gap-3 md:gap-6">

              {/* MOBILE ADD BUTTON */}
              <Link
                to="/addListing"
                className="flex lg:hidden rounded-full bg-yellow p-2.5 text-slate-900 shadow-md active:scale-95 transition-transform"
              >
                <FaPlusCircle size={20} />
              </Link>

              {/* PROFILE / LOGIN */}
              <Link
                to="/auth/login"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group"
              >
                <div className="rounded-full bg-slate-800 p-2 group-hover:bg-slate-700 transition-colors">
                  <FaUserCircle size={24} />
                </div>
                <span className="hidden xl:block text-xs font-bold uppercase tracking-wider">Account</span>
              </Link>

              {/* SELL YOUR CAR BUTTON */}
              <Link to="/addListing" className="hidden md:block">
                <button className="flex items-center gap-2 rounded-xl bg-yellow px-6 py-3 text-sm font-black uppercase tracking-tight text-slate-900 hover:bg-yellow/90 transition-all active:scale-95 shadow-lg shadow-yellow/20">
                  <FaCarSide size={18} />
                  Sell Your Car
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 z-50 flex w-full justify-around border-t border-slate-200 bg-white pb-safe pt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:hidden rounded-t-2xl">
        {NavLinks.slice(0, 5).map((link) => (
          <NavLink
            key={link.id}
            to={link.href}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 transition-all ${isActive ? "text-primary scale-110" : "text-slate-400"
              }`
            }
          >
            <div className="mb-1">{link.icon}</div>
            <span className="text-[10px] font-bold uppercase tracking-tighter">{link.title}</span>
          </NavLink>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
