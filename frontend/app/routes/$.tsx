import { json } from "@vercel/remix";
import { Link } from "@remix-run/react";

export const meta = () => [{ title: "Page not found | GamAutos" }];

// Makes the response a real 404 so search engines don't index it
export const loader = () => json(null, { status: 404 });

export default function NotFound() {
  return (
    <main className="screen__height flex items-center justify-center px-4 text-center">
      <div>
        <p className="text-6xl font-black text-yellow">404</p>
        <h1 className="mt-3 text-2xl">Page not found</h1>
        <p className="mt-2 text-gray-600">
          The page you are looking for does not exist or has moved.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/"
            className="rounded-xl bg-yellow px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-950 transition hover:bg-amber-300 active:scale-95"
          >
            Back to home
          </Link>
          <Link
            to="/inventory"
            className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-bold uppercase tracking-wider text-gray-700 transition hover:border-yellow hover:text-yellow active:scale-95"
          >
            Browse cars
          </Link>
        </div>
      </div>
    </main>
  );
}
