import { Link, NavLink } from '@remix-run/react'
import Logo from '../Logo/logo'
import { NavLinks } from '~/data/navLinks'
import { FaCarSide, FaPlusCircle, FaUserCircle } from 'react-icons/fa'

const DesktopNav = () => {
  return (
    <nav className="fixed left-0 top-0 z-50 h-20 w-full border-b border-slate-800 bg-primary/95 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" aria-label="gamautos home" className="flex items-center gap-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-1.5 shadow-sm">
            <Logo />
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-8 text-xs font-bold uppercase tracking-wider lg:flex">
          {NavLinks.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.href}
                end={link.href === '/'}
                className={({ isActive }) =>
                  `relative py-2 transition-colors hover:text-yellow ${isActive ? "text-yellow font-black" : "text-slate-300"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.title}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-yellow" />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          {/* Mobile Add Listing Button */}
          <Link
            to="/addListing"
            aria-label="Add Listing"
            className="flex items-center justify-center rounded-xl bg-yellow p-2.5 text-slate-950 transition active:scale-95 lg:hidden"
          >
            <FaPlusCircle size={18} />
          </Link>

          {/* Account Link */}
          <Link
            to="/auth/login"
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-300 transition hover:border-yellow/40 hover:text-yellow"
          >
            <FaUserCircle size={18} />
            <span className="hidden xl:inline">Account</span>
          </Link>

          {/* Sell Car CTA */}
          <Link
            to="/addListing"
            className="hidden items-center gap-2 rounded-xl bg-yellow px-4 py-2.5 text-xs font-black uppercase tracking-wider text-slate-950 transition hover:opacity-90 active:scale-95 md:flex"
          >
            <FaCarSide size={16} />
            <span>Sell Your Car</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default DesktopNav
