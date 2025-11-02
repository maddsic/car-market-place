import { Card, CardHeader, CardContent, CardTitle } from "~/components/ui/card";
import { motion } from "framer-motion";
import { FaCarSide, FaEdit, FaTrashAlt } from "react-icons/fa";

const activities = [
  {
    id: 1,
    action: "Added a new listing: 2022 BMW X5",
    icon: <FaCarSide className="text-blue-500" />,
    time: "2 hours ago",
  },
  {
    id: 2,
    action: "Updated price for 2018 Toyota Camry",
    icon: <FaEdit className="text-yellow-500" />,
    time: "Yesterday",
  },
  {
    id: 3,
    action: "Removed listing: 2017 Audi A4",
    icon: <FaTrashAlt className="text-red-500" />,
    time: "2 days ago",
  },
];

export default function RecentActivities() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border border-gray-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary">
            Recent Activities
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-3 rounded-md border-b border-gray-100 pb-3 last:border-0"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                {activity.icon}
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  {activity.action}
                </p>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            </motion.div>
          ))}

          {activities.length === 0 && (
            <p className="text-center text-sm text-gray-400">
              No recent activities found.
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
