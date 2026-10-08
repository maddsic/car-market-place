import { FaCar, FaDollarSign, FaCarSide, FaStar } from "react-icons/fa";
import StatsCard from "./statsCard";
import DashboardChart from "./dashboardCharts";
import DealerProfileCard from "./dealerProfileCard";
import RecentActivities from "./recentActivities";
import {
  getDashboardActivities,
  getDealerDashboardStats,
  getDealerProfileCardData,
} from "~/service/dealer.server";
import { json, redirect, useLoaderData } from "@remix-run/react";
import { getAuthToken } from "~/utils/authHelpers";
import AdminOverview from "../dashboard.adminOverview/route";
import { verifyJwtToken } from "~/utils/jwt.server";
import { getAdminDashboardStats, getRecentUsers } from "~/service/admin.server";

type DashboardStats = {
  totalListings: number;
  availableListings: number;
  soldListings: number;
  reviewCount: number;
};

export default function DashboardIndex() {
  const data = useLoaderData<typeof loader>();

  // 1. ERROR HANDLING: If the loader returned an error, display it to the user.
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

  // 2. ADMIN VIEW: Handled entirely by AdminOverview
  if (data.role === "admin" && "adminStats" in data) {
    return (
      <AdminOverview
        stats={data.adminStats}
        recentUsers={data.recentUsers}
        activities={data.activities}
      />
    );
  }

  // 3. DEALER VIEW: Narrow the loader result before accessing dealer-only fields.
  if (!("stats" in data)) {
    return null;
  }

  // 4. DEALER VIEW: Render the dealer dashboard with stats, activities, and profile data.
  const { stats, activities, profileData } = data;

  const statsCardData = [
    {
      title: "Total Listings",
      value: stats?.totalListings ?? 0,
      icon: <FaCar className="text-primary" size={26} />,
      color: "bg-yellow",
    },
    {
      title: "Active Listings",
      value: stats?.availableListings ?? 0,
      icon: <FaCarSide className="text-green-600" size={26} />,
      color: "bg-green-100",
    },
    {
      title: "Total Sales",
      value: stats?.soldListings ?? 0,
      icon: <FaDollarSign className="text-yellow-600" size={26} />,
      color: "bg-yellow-100",
    },
    {
      title: "Customer Reviews",
      value: stats?.reviewCount ?? 0,
      icon: <FaStar className="text-orange-500" size={26} />,
      color: "bg-orange-100",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="flex flex-col gap-6 sm:gap-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {statsCardData.map((item, i) => (
            <StatsCard
              key={i}
              title={item.title}
              value={item.value}
              icon={item.icon}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
          <div className="w-full lg:col-span-2">
            <DashboardChart />
          </div>
          <div className="w-full lg:col-span-1">
            <DealerProfileCard profileData={profileData} />
          </div>
        </div>

        <div className="w-full">
          <RecentActivities activities={activities} />
        </div>
      </div>
    </div>
  );
}

export const loader = async ({ request }: { request: Request }) => {
  const token = getAuthToken(request);
  if (!token) return redirect("/auth/login");

  const verifiedToken = verifyJwtToken(token);
  if (!verifiedToken) return redirect("/auth/login");

  const role = verifiedToken.role || "user";

  try {
    if (role === "admin") {
      const [adminStatsResponse, recentUsersData, activitiesData] =
        await Promise.all([
          getAdminDashboardStats(request),
          getRecentUsers(request),
          getDashboardActivities(request),
        ]);

      return json({
        role: "admin",
        // Extract the nested .data property from your Express JSON response
        adminStats: adminStatsResponse?.data || adminStatsResponse || {},
        recentUsers: recentUsersData?.data || [],
        activities: activitiesData?.data || [],
      });
    }

    const [stats, activitiesData, profileData] = await Promise.all([
      getDealerDashboardStats(request),
      getDashboardActivities(request),
      getDealerProfileCardData(request),
    ]);

    return json({
      role: "agent",
      stats: stats as DashboardStats,
      activities: activitiesData?.data || [],
      profileData: profileData?.data || {},
    });
  } catch (error) {
    console.error("Dashboard loader error", error);
    return json({ error: "Failed to load dashboard data" }, { status: 500 });
  }
};
