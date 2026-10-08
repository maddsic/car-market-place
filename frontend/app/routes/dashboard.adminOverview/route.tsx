import React from 'react'
import { FaCar, FaCoins, FaUsers, FaUserTie } from 'react-icons/fa6';
import DashboardChart from '../dashboard._index/dashboardCharts';
import RecentActivities from '../dashboard._index/recentActivities';
import StatsCard from '../dashboard._index/statsCard';

interface AdminOverviewProps {
  stats: {
    totalUsers: number;
    totalDealers: number;
    totalListings: number;
    totalInventoryValue: number;
  };
  recentUsers: Array<{
    userId: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
  }>;
  activities: any[];
}

const AdminOverview = ({ stats, recentUsers, activities }: AdminOverviewProps) => {
  const adminStatsCardData = [
    {
      title: "Total Buyers & Users",
      value: stats.totalUsers ?? 0,
      icon: <FaUsers className="text-blue-600" size={26} />,
    },
    {
      title: "Registered Dealers",
      value: stats.totalDealers ?? 0,
      icon: < FaUserTie className="text-yellow" size={26} />,
    },
    {
      title: "Active Inventory",
      value: stats.totalListings ?? 0,
      icon: <FaCar className="text-green-600" size={26} />,
    },
    {
      title: "Platform Valuation",
      value: `$${(stats.totalInventoryValue || 0).toLocaleString()}`,
      icon: < FaCoins className="text-yellow-600" size={26} />,
    },
  ];

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* 4 Admin KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {adminStatsCardData.map((item, i) => (
          <StatsCard key={i} title={item.title} value={item.value} icon={item.icon} />
        ))}
      </div>

      {/* Analytics Chart + Recent Signups */}
      <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
        <div className="w-full lg:col-span-2">
          <DashboardChart />
        </div>

        {/* Quick User Verification / Latest Signups widget */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-base font-bold text-primary">Recent Registrations</h3>
          <div className="flex flex-col divide-y divide-gray-100">
            {recentUsers?.slice(0, 5).map((user) => (
              <div key={user.userId} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="font-semibold text-gray-800">{user.username}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase ${user.role === "agent"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
                    }`}
                >
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Activity Feed */}
      <RecentActivities activities={activities} />
    </div>
  );
}

export default AdminOverview
