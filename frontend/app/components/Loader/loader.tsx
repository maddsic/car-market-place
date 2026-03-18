import { LinksFunction } from "@remix-run/node";
import loaderStyles from "./loader.module.css";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-yellow border-opacity-75">
        <img src="/logo_03.png" alt="rounded-full" />
      </div>
    </div>
  );
};

export default Loader;

export const links: LinksFunction = () => [
  // i've to call this styles in other components too so i exported it here
  { rel: "stylesheet", href: loaderStyles.styles },
];
