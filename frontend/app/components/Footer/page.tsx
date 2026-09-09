import { Link } from "@remix-run/react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { NavLinks } from "~/data/navLinks"; // Adjust path to where your navLinks are stored
import Divider from "../Divider/divider";
import Logo from "../Logo/logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-primary text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* TOP SECTION: Logo & Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between">

          {/* Logo & Tagline */}
          <div className="md:col-span-4 flex flex-col items-start gap-3">
            <Logo />
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Your trusted marketplace for buying, selling, renting, and bidding on vehicle fleets.
            </p>
          </div>

          {/* Dynamic NavLinks Mapping - Hidden on small devices (below md) */}
          <nav className="hidden md:flex md:col-span-8 flex-wrap items-center justify-end gap-x-5 gap-y-3 text-xs font-semibold uppercase tracking-wider">
            {NavLinks.map((link, index) => (
              <div key={link.id} className="flex items-center gap-x-5">
                <Link
                  to={link.href}
                  className="text-slate-400 hover:text-white transition-colors duration-300"
                >
                  {link.title}
                </Link>

                {/* Bullet separator between items except the last one */}
                {index < NavLinks.length - 1 && (
                  <span className="text-slate-700">•</span>
                )}
              </div>
            ))}
          </nav>
        </div>

        <Divider classNames="my-8 border-slate-800" />

        {/* BOTTOM SECTION: Copyright & Socials */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} GamAutos. All rights reserved.</p>

          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="p-2.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-300"
            >
              <FaFacebookF size={14} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="p-2.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-300"
            >
              <FaInstagram size={14} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-300"
            >
              <FaLinkedinIn size={14} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="p-2.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-300"
            >
              <FaTwitter size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
