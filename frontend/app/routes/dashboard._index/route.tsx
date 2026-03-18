import { FaCar, FaDollarSign, FaCarSide, FaStar } from "react-icons/fa";
import StatsCard from "./statsCard";
import DashboardChart from "./dashboardCharts";
import DealerProfileCard from "./dealerProfileCard";
import RecentActivities from "./recentActivities";
import { getDashboardActivities, getDealerDashboardStats } from "~/service/dealer.server";
import { json, redirect, useLoaderData } from "@remix-run/react";
import { getAuthToken } from "~/utils/authHelpers";

type DashboardStats = {
  totalListings: number;
  availableListings: number;
  soldListings: number;
  reviewCount: number;
}


export default function DashboardIndex() {
  const data = useLoaderData<typeof loader>();

  // Handle error state
  if ("error" in data) {
    return <div className="text-red-500">Error: {data.error}</div>;
  }
  // Get stats from loader data
  const { stats, activities } = data

  const statsCardData = [
    {
      title: "Total Listings",
      value: stats.totalListings ?? 0,
      icon: <FaCar className="text-primary" size={26} />,
      color: "bg-yellow",
    },
    {
      title: "Active Listings",
      value: stats.availableListings ?? 0,
      icon: <FaCarSide className="text-green-600" size={26} />,
      color: "bg-green-100",
    },
    {
      title: "Total Sales",
      value: stats.soldListings ?? 0,
      icon: <FaDollarSign className="text-yellow-600" size={26} />,
      color: "bg-yellow-100",
    },
    {
      title: "Customer Reviews",
      value: stats.reviewCount ?? 0,
      icon: <FaStar className="text-orange-500" size={26} />,
      color: "bg-orange-100",
    },
  ];


  return (
    <div className="mb-10 flex flex-col gap-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {statsCardData.map((statsData, i) => (
          <StatsCard
            key={i}
            title={statsData.title}
            value={statsData.value}
            icon={statsData.icon}
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
      <RecentActivities activities={activities} />
    </div>
  );
}

export const loader = async ({ request }: { request: Request }) => {
  const token = getAuthToken(request)
  if (!token) {
    return redirect("/auth/login")
  }

  try {
    const [stats, activitiesData] = await Promise.all([
      getDealerDashboardStats(request),
      getDashboardActivities(request)
    ])

    console.log(activitiesData)
    return json({ stats: stats as DashboardStats, activities: activitiesData.data || [] });
  } catch (error) {
    console.error("Dashboard loader error", error)
    return json({ error: "Failed to load dashboard data" }, { status: 500 });
  }
}
