import { Link } from "@remix-run/react";

const Logo = () => {
  return (
    <Link to="/">
      <img src="/logo_03.png" className="h-24 w-24 object-contain" />
    </Link>
  );
};

export default Logo;
