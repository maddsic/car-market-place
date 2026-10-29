import React from 'react'
import { NavLink } from '@remix-run/react'
import { NavLinks } from '~/data/navLinks'

const MobileNav = () => {
  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full justify-around border-t border-slate-800 bg-primary/95 py-2 backdrop-blur-md md:hidden">
      {NavLinks.slice(0, 5).map((link) => (
        <NavLink
          key={link.id}
          to={link.href}
          end={link.href === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center rounded-lg px-2 py-1 text-[11px] font-bold uppercase tracking-tight transition ${isActive ? "bg-yellow/10 text-yellow" : "text-slate-400 hover:text-slate-200"
            }`
          }
        >
          <span className="text-lg">{link.icon}</span>
          <span>{link.title}</span>
        </NavLink>
      ))}
    </div>
  )
}

export default MobileNav
