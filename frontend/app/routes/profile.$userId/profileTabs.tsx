import { useState } from "react";
import Inventory from "./inventory";
import Reviews from "./reviews";
import WriteReview from "./writeReview";
import { FaCarSide, FaPenAlt, FaStar } from "react-icons/fa";

interface DealerTabsProps {
  userCars: any[];
  dealers: any;
  reviews: any[];
  isUserLoggedIn: boolean;
}
// TABS DEFINITION
const tabs = [
  { key: "inventory", label: "View Inventory", icon: <FaCarSide size={16} /> },
  { key: "reviews", label: "View Reviews", icon: <FaStar size={16} /> },
  { key: "write", label: "Write a Review", icon: <FaPenAlt size={16} /> },
];

export default function ProfileTabs({
  userCars,
  dealers,
  reviews,
  isUserLoggedIn,
}: DealerTabsProps) {
  const [activeTab, setActiveTab] = useState<"inventory" | "reviews" | "write">(
    "inventory",
  );

  return (
    <section className="relative pt-10">
      {/* 🔹 Tabs Header */}
      <div className="flex flex-wrap gap-3 bg-primary">
        {tabs.map(({ key, label, icon }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center gap-2 rounded-t-md px-4 py-3 font-semibold transition-all duration-500${
                isActive
                  ? "py- border-l-4 border-t-4 border-primary border-l-primary border-t-yellow bg-white text-primary shadow-md"
                  : "bg-primary text-white"
              }`}
            >
              {icon}
              {label}
            </button>
          );
        })}
      </div>

      {/* 🔹 Tabs Content */}
      <div className="mt-6">
        {activeTab === "inventory" && (
          <Inventory userCars={userCars} dealers={dealers} />
        )}
        {activeTab === "reviews" && <Reviews reviews={reviews} />}
        {activeTab === "write" && (
          <WriteReview isUserLoggedIn={isUserLoggedIn} />
        )}
      </div>
    </section>
  );
}
