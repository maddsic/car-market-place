import React from "react";

interface StatsCardProps {
  key: number;
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ key, title, value, icon }) => {
  return (
    <div
      key={key}
      className="flex items-center justify-between rounded-2xl bg-primary p-6 text-white shadow-md transition hover:shadow-lg"
    >
      <div>
        <p className="text-sm font-medium opacity-80">{title}</p>
        <h2 className="mt-1 text-2xl font-bold">{value}</h2>
      </div>
      <div className="text-white opacity-90">{icon}</div>
    </div>
  );
};

export default StatsCard;
