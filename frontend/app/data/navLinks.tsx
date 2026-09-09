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

export interface NavLinkItem {
  id: number;
  title: string;
  href: string;
  icon: React.ReactNode;
}


export const NavLinks: NavLinkItem[] = [
  { id: 1, title: "Home", href: "/", icon: <FaHome size={20} /> },
  { id: 2, title: "Inventory", href: "/inventory", icon: <FaCarSide size={20} /> },
  { id: 3, title: "Dealers", href: "/dealers", icon: <FaUsers size={20} /> },
  { id: 4, title: "Rentals", href: "/rentals", icon: <FaCarSide size={20} /> },
  { id: 5, title: "Auction", href: "/auctions", icon: <FaGavel size={20} /> },
  { id: 6, title: "About", href: "/about", icon: <FaInfoCircle size={20} /> },
  { id: 7, title: "Contact", href: "/contact", icon: <FaPhoneAlt size={20} /> },
];

// export const MobileNavLinks: NavLinkItem[] = [
//   { id: 1, title: "Home", href: "/", icon: <FaHome size={20} /> },
//   { id: 2, title: "Inventory", href: "/inventory", icon: <FaCarSide size={20} /> },
//   { id: 3, title: "Dealers", href: "/dealers", icon: <FaUsers size={20} /> },
//   { id: 4, title: "Rentals", href: "/rentals", icon: <FaCarSide size={20} /> },
//   { id: 5, title: "Auction", href: "/auctions", icon: <FaGavel size={20} /> },
//   { id: 6, title: "About", href: "/about", icon: <FaInfoCircle size={20} /> },
//   { id: 7, title: "Contact", href: "/contact", icon: <FaPhoneAlt size={20} /> },
// ];
