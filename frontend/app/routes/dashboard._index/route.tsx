import { FaCar, FaDollarSign, FaCarSide, FaStar } from "react-icons/fa";
import StatsCard from "./statsCard";
import DashboardChart from "./dashboardCharts";
import DealerProfileCard from "./dealerProfileCard";
import RecentActivities from "./recentActivities";

export default function DashboardIndex() {
  const stats = [
    {
      title: "Total Listings",
      value: "42",
      icon: <FaCar className="text-primary" size={26} />,
      color: "bg-yellow",
    },
    {
      title: "Active Listings",
      value: "29",
      icon: <FaCarSide className="text-green-600" size={26} />,
      color: "bg-green-100",
    },
    {
      title: "Total Sales",
      value: "$89,200",
      icon: <FaDollarSign className="text-yellow-600" size={26} />,
      color: "bg-yellow-100",
    },
    {
      title: "Customer Reviews",
      value: "87",
      icon: <FaStar className="text-orange-500" size={26} />,
      color: "bg-orange-100",
    },
  ];
  return (
    <div className="mb-10 flex flex-col gap-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {stats.map((stat, i) => (
          <StatsCard
            key={i}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Middle: Chart + Profile */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="col-span-2">
          <DashboardChart />
        </div>
        <DealerProfileCard />
      </div>

      {/* Bottom: Recent Activities */}
      <RecentActivities />
    </div>
  );
}
