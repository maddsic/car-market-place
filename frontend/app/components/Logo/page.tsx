import { Link } from "@remix-run/react";

const Logo = () => {
  return (
    <Link to="/">
      <h1 className="z-10 max-h-[calc(100vh-100px)] cursor-pointer text-3xl font-extrabold italic text-white">
        <span className="text-4xl text-yellow">G</span>amAutos
      </h1>
    </Link>
  );
};

export default Logo;
