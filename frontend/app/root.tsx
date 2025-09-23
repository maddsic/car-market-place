import {
  Link,
  Links,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { type MetaFunction } from "@remix-run/node";
import { type LinksFunction } from "@vercel/remix";
import { ToastContainer } from "react-toastify";

import Footer from "./components/Footer/page";
import Navbar from "./components/Navbar/navbar";

// import type { LinksFunction } from "@remix-run/node";
import tailwindStyles from "./tailwind.css?url";
import globalStyles from "./styles/global.css?url";

export const meta: MetaFunction = () => {
  return [
    { title: "Car Marketplace", description: "Buy and sell cars" },
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Links />
      </head>
      <body>
        <main>
          <Navbar />
          <Outlet />
          <Footer />
        </main>
        <ScrollRestoration />
        <ToastContainer position="top-right" />
        <Scripts />
      </body>
    </html>
  );
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: globalStyles },
  { rel: "stylesheet", href: tailwindStyles },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Lato:wght@100;400&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/react-toastify/dist/ReactToastify.css",
  },
];

export function ErrorBoundary({ error }: { error: any }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Links />
      </head>
      <body className="h-[calc(100vh-80px)]">
        <main className="error">
          <h1>An error occured</h1>
          <h2>{error?.message}</h2>
          <p className="mt-2">
            Back to{" "}
            <Link to="/" className="text-blue-500 underline underline-offset-2">
              Home
            </Link>{" "}
            page
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
