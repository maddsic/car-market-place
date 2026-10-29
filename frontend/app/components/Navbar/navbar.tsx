import MobileNav from "./mobileNav";
import DesktopNav from "./desktopNav";

export default function Navbar() {
  return (
    <header className="relative h-20 w-full">
      <DesktopNav />
      <MobileNav />
    </header>
  );
}
