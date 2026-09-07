import { FaCar, FaDollarSign, FaCarSide, FaStar } from "react-icons/fa";
import StatsCard from "./statsCard";
import DashboardChart from "./dashboardCharts";
import DealerProfileCard from "./dealerProfileCard";
import RecentActivities from "./recentActivities";
import { getDashboardActivities, getDealerDashboardStats, getDealerProfileCardData } from "~/service/dealer.server";
import { json, redirect, useLoaderData } from "@remix-run/react";
import { getAuthToken } from "~/utils/authHelpers";

type DashboardStats = {
  totalListings: number;
  availableListings: number;
  soldListings: number;
  reviewCount: number;
};

export default function DashboardIndex() {
  const data = useLoaderData<typeof loader>();

  // Handle error state with responsive UI container
  if ("error" in data) {
    return (
      <div className="mx-auto max-w-7xl p-4 sm:p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 shadow-sm sm:p-6 sm:text-base">
          <p className="font-semibold">Error Loading Dashboard</p>
          <p>{data.error}</p>
        </div>
      </div>
    );
  }

  // Get stats from loader data
  const { stats, activities, profileData } = data;

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
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="flex flex-col gap-6 sm:gap-8">

        {/* Stats Section - Stacks on mobile, 2 per row on tablet, 4 per row on desktop */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {statsCardData.map((statsData, i) => (
            <StatsCard
              key={i}
              title={statsData.title}
              value={statsData.value}
              icon={statsData.icon}
            />
          ))}
        </div>

        {/* Middle Section: Chart + Profile */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
          <div className="w-full lg:col-span-2">
            <DashboardChart />
          </div>
          <div className="w-full lg:col-span-1">
            <DealerProfileCard profileData={profileData} />
          </div>
        </div>

        {/* Bottom Section: Recent Activities */}
        <div className="w-full">
          <RecentActivities activities={activities} />
        </div>

      </div>
    </div>
  );
}

export const loader = async ({ request }: { request: Request }) => {
  const token = getAuthToken(request);
  if (!token) {
    return redirect("/auth/login");
  }

  try {
    const [stats, activitiesData, profileData] = await Promise.all([
      getDealerDashboardStats(request),
      getDashboardActivities(request),
      getDealerProfileCardData(request),
    ]);

    return json({
      stats: stats as DashboardStats,
      activities: activitiesData?.data || [],
      profileData: profileData?.data || {},
    });
  } catch (error) {
    console.error("Dashboard loader error", error);
    return json({ error: "Failed to load dashboard data" }, { status: 500 });
  }
};
