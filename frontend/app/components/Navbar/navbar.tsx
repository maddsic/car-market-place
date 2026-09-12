import { Link, NavLink } from "@remix-run/react";
import { FaCarSide, FaPlusCircle, FaUserCircle } from "react-icons/fa";
import Logo from "../Logo/logo";
import { NavLinks } from "~/data/navLinks";

const Navbar = () => {
  return (
    <header className="relative h-[80px] w-full">
      {/* FIXED TOP NAVBAR */}
      <nav className="fixed left-0 top-0 z-50 h-[80px] w-full bg-primary/95 backdrop-blur-md shadow-2xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-full items-center justify-between">

            {/* LOGO SECTION */}
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-95 transition-all transform hover:scale-[1.02]"
            >
              <div className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
                <Logo />
              </div>
              {/* <div className="hidden sm:flex flex-col">
                <span className="text-xl font-black tracking-tight text-white leading-none">
                  GAMAUTOS
                </span>
                <span className="text-[9px] font-bold tracking-widest text-yellow uppercase">
                  Marketplace
                </span>
              </div> */}
            </Link>

            {/* DESKTOP NAVLINKS */}
            <ul className="hidden items-center gap-6 xl:gap-8 text-xs font-bold uppercase tracking-wider text-slate-300 lg:flex">
              {NavLinks.map((link) => (
                <li key={link.id}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `relative py-2 px-1 transition-all duration-300 hover:text-yellow ${isActive
                        ? "text-yellow font-black"
                        : "text-slate-300"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.title}
                        {isActive && (
                          <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* USER ACTIONS */}
            <div className="flex items-center gap-3 md:gap-5">
              {/* MOBILE ADD BUTTON */}
              <Link
                to="/addListing"
                aria-label="Add Listing"
                className="flex lg:hidden rounded-xl bg-amber-400 p-2.5 text-slate-950 shadow-lg shadow-amber-400/20 active:scale-95 transition-transform"
              >
                <FaPlusCircle size={18} />
              </Link>

              {/* PROFILE / LOGIN */}
              <Link
                to="/auth/login"
                className="flex items-center gap-2 text-slate-300 hover:text-yellow transition-colors group p-1.5 rounded-xl hover:bg-slate-900/60"
              >
                <div className="rounded-xl bg-slate-900 border border-slate-800 p-2 text-slate-300 group-hover:text-yellow group-hover:border-amber-400/30 transition-all shadow-md">
                  <FaUserCircle size={20} />
                </div>
                <span className="hidden xl:block text-xs font-bold uppercase tracking-wider">
                  Account
                </span>
              </Link>

              {/* SELL YOUR CAR CTA BUTTON */}
              <Link to="/addListing" className="hidden md:block">
                <button className="flex items-center gap-2 rounded-xl bg-yellow hover:bg-amber-300 px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-950 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-amber-400/20">
                  <FaCarSide size={16} />
                  <span>Sell Your Car</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-0 left-0 z-50 flex w-full justify-around border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-xl px-2 py-2 md:hidden shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        {NavLinks.slice(0, 5).map((link) => (
          <NavLink
            key={link.id}
            to={link.href}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition-all ${isActive
                ? "text-amber-400 bg-amber-400/10 font-bold scale-105"
                : "text-slate-400 hover:text-slate-200"
              }`
            }
          >
            <div className="text-lg mb-0.5">{link.icon}</div>
            <span className="text-[10px] uppercase font-bold tracking-tight">
              {link.title}
            </span>
          </NavLink>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
