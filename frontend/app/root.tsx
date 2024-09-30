import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node";
import tailwindStyles from "./tailwind.css?url";
import globalStyles from "./styles/global.css?url";

export function Layout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <Meta />
            <Links />
         </head>
         <body>
            {children}
            <ScrollRestoration />
            <Scripts />
         </body>
      </html>
   );
}

export const links: LinksFunction = () => [
   { rel: "stylesheet", href: globalStyles },
   { rel: "styleSheet", href: tailwindStyles },
   { rel: "styleSheet", href: "https://fonts.googleapis.com/css2?family=Lato:wght@100;400&display=swap" },
];

export default function App() {
   return <Outlet />;
}
