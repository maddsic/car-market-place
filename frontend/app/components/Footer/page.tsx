import {
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import Divider from "../Divider/divider";
import Logo from "../Logo/page";

const Footer = () => {
  return (
    <main className="relative box-border w-full bg-primary">
      <div className="max__container relative flex w-full flex-col justify-around gap-2 p-10">
        <div className="grid items-center justify-between gap-4 md:flex">
          <Logo />

          <ul className="footer_text flex items-center justify-between gap-2 text-[13px] capitalize text-gray-400 md:col-span-2 md:gap-4">
            <li className="cursor-pointer border-r-2 border-gray-500 pr-5 transition duration-1000 ease-in-out hover:text-white">
              dealers list
            </li>
            <li className="cursor-pointer border-r-2 border-gray-500 pr-5 transition duration-1000 ease-in-out hover:text-white">
              contact us
            </li>
            <li className="cursor-pointer border-r-2 border-gray-500 pr-5 transition duration-1000 ease-in-out hover:text-white">
              about us
            </li>
            <li className="cursor-pointer pr-5 transition duration-1000 ease-in-out hover:text-white">
              inventory
            </li>
          </ul>
        </div>
        <Divider classNames="mt-4" />

        <div className="relative mt-3 box-border flex items-center justify-between">
          <span className="text-[13px] text-gray-500">
            Copyright &#64; 2024 GamAutos
          </span>

          <span className="flex items-center gap-4">
            <FaFacebook
              className="cursor-pointer text-gray-500 transition duration-1000 ease-in-out hover:text-white"
              size={18}
            />
            <FaInstagramSquare
              className="cursor-pointer text-gray-500 transition duration-1000 ease-in-out hover:text-white"
              size={18}
            />
            <FaLinkedin
              className="cursor-pointer text-gray-500 transition duration-1000 ease-in-out hover:text-white"
              size={18}
            />
            <FaTwitter
              className="cursor-pointer text-gray-500 transition duration-1000 ease-in-out hover:text-white"
              size={18}
            />
          </span>
        </div>
      </div>
    </main>
  );
};

export default Footer;
