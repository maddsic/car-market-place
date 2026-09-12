import { Link } from "@remix-run/react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { NavLinks } from "~/data/navLinks"; // Adjust path to where your navLinks are stored
import Divider from "../Divider/divider";
import Logo from "../Logo/logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-primary overflow-hidden text-slate-300">
      {/* Background Lighting & Glow Effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px]" />
        {/* Carbon Micro-Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* TOP SECTION: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">

          {/* Brand Info (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 flex flex-col items-start gap-4">
            <Logo />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Your trusted marketplace for buying, selling, renting, and bidding on premium vehicle fleets.
            </p>

            {/* Automotive Contact Badges */}
            <div className="flex flex-col gap-2 mt-2">
              <a
                href="mailto:support@gamautos.com"
                className="inline-flex items-center gap-2.5 text-xs text-slate-400 hover:text-amber-400 transition-colors"
              >
                <span className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-amber-400">
                  <FaEnvelope size={12} />
                </span>
                support@gamautos.com
              </a>
              <a
                href="tel:+18005550199"
                className="inline-flex items-center gap-2.5 text-xs text-slate-400 hover:text-amber-400 transition-colors"
              >
                <span className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-amber-400">
                  <FaPhoneAlt size={12} />
                </span>
                +1 (800) 555-0199
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-white border-l-2 border-amber-400 pl-2">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2 text-xs font-medium mt-1">
              {NavLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-amber-400 transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Marketplace Services Column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-white border-l-2 border-amber-400 pl-2">
              Marketplace
            </h3>
            <ul className="flex flex-col gap-2 text-xs font-medium text-slate-400 mt-1">
              <li>
                <Link to="/inventory" className="hover:text-amber-400 transition-colors">
                  Browse Inventory
                </Link>
              </li>
              <li>
                <Link to="/auctions" className="hover:text-amber-400 transition-colors">
                  Live Auctions
                </Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-amber-400 transition-colors">
                  Sell Your Vehicle
                </Link>
              </li>
              <li>
                <Link to="/fleet-rentals" className="hover:text-amber-400 transition-colors">
                  Fleet Rentals
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support Column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-white border-l-2 border-amber-400 pl-2">
              Legal & Help
            </h3>
            <ul className="flex flex-col gap-2 text-xs font-medium text-slate-400 mt-1">
              <li>
                <Link to="/terms" className="hover:text-amber-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-amber-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-amber-400 transition-colors">
                  Help Center & FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Divider classNames="my-4 border-slate-800/80" />

        {/* BOTTOM SECTION: Copyright & Modern Socials */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 pt-4">
          <p>© {currentYear} GamAutos. All rights reserved.</p>

          <div className="flex items-center gap-2.5">
            {[
              { icon: <FaFacebookF size={13} />, href: "https://facebook.com", label: "Facebook" },
              { icon: <FaInstagram size={13} />, href: "https://instagram.com", label: "Instagram" },
              { icon: <FaLinkedinIn size={13} />, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: <FaTwitter size={13} />, href: "https://twitter.com", label: "Twitter" },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-950 hover:bg-amber-400 hover:border-amber-400 transition-all duration-300 transform hover:-translate-y-1 shadow-md"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
