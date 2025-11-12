import React from "react";
import { DollarSign } from "lucide-react"; // Icons for visual appeal

// --- Main Route Component ---
export default function AuctionsComingSoon() {
  return (
    <div className="font-montserrat flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-primary text-white shadow-2xl md:flex">
        {/* Left Section: Content */}
        <div className="flex flex-col justify-center p-8 text-center md:w-2/3 md:p-12 md:text-left">
          <h1 className="mb-6 flex items-center justify-center gap-3 text-5xl font-extrabold text-yellow md:justify-start md:text-6xl">
            Auctions Are Coming Soon!
          </h1>

          <div className="mb-8 rounded-xl bg-gray-700/50 p-6">
            <h2 className="mb-2 text-3xl font-bold text-white">
              We're Building Something Special
            </h2>
            <p className="text-xl text-gray-300">
              Get ready to bid on exclusive, high-value vehicles. Our digital
              auction house will soon be live, offering a seamless and secure
              bidding experience.
            </p>
          </div>

          <p className="text-sm text-gray-400">
            We are working hard to finalize our platform. Follow us on social
            media for official announcements regarding the launch date!
          </p>
        </div>

        {/* Right Section: Image Placeholder */}
        <div
          className="flex min-h-[300px] items-center justify-center bg-cover bg-center p-6 md:min-h-full md:w-1/3"
          style={{
            backgroundImage:
              "url('https://placehold.co/400x600/1F2937/FBBF24?text=AUCTION+CAR')",
          }}
        ></div>
      </div>
    </div>
  );
}

// Add CSS for the Inter font
export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
    },
  ];
}
