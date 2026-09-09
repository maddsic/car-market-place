import { Link } from "@remix-run/react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import Divider from "../Divider/divider";
import Logo from "../Logo/logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-primary text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* TOP SECTION: Logo, Quick Links & Socials */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between">

          {/* Logo & Brief Tagline */}
          <div className="md:col-span-4 flex flex-col items-start gap-3">
            <Logo />
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Your trusted marketplace for buying, selling, and managing dealership vehicle fleets.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="md:col-span-8 flex flex-wrap items-center justify-start md:justify-end gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-wider">
            <Link
              to="/dealers"
              className="text-slate-400 hover:text-white transition-colors duration-300 py-1"
            >
              Dealers List
            </Link>
            <span className="hidden sm:inline text-slate-700">•</span>

            <Link
              to="/inventory"
              className="text-slate-400 hover:text-white transition-colors duration-300 py-1"
            >
              Inventory
            </Link>
            <span className="hidden sm:inline text-slate-700">•</span>

            <Link
              to="/about"
              className="text-slate-400 hover:text-white transition-colors duration-300 py-1"
            >
              About Us
            </Link>
            <span className="hidden sm:inline text-slate-700">•</span>

            <Link
              to="/contact"
              className="text-slate-400 hover:text-white transition-colors duration-300 py-1"
            >
              Contact Us
            </Link>
          </nav>
        </div>

        <Divider classNames="my-8 border-slate-800" />

        {/* BOTTOM SECTION: Copyright & Social Icons */}
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
