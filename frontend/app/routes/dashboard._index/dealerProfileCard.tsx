import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "~/components/ui/card";
import { FaStar, FaCheckCircle, FaUserEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "@remix-run/react";

interface DealerProfileCardProps {
  profileData?: {
    fullName: string;
    verified: boolean;
    rating: number;
    totalReviews: number;
    location: string;
    joined: string;
  };
}

export default function DealerProfileCard({ profileData }: DealerProfileCardProps) {
  const dealer = profileData

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border border-gray-200 shadow-md">
        <CardHeader className="flex flex-col items-center justify-center text-center">
          <Link to="/dashboard/profile">
            <img
              src="/sain.jpeg"
              alt="Dealer"
              className="h-20 w-20 rounded-full border-4 border-primary shadow-md"
            />
          </Link>
          <CardTitle className="mt-3 text-xl font-semibold text-gray-900">
            {dealer?.fullName}
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{dealer?.location} {",The Gambia"}</span>
            {dealer?.verified && (
              <FaCheckCircle
                className="text-green-500"
                title="Verified Dealer"
              />
            )}
          </div>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <FaStar
                  key={i}
                  className={`${i < Math.round(dealer?.rating ?? 0)
                    ? "text-yellow"
                    : "text-gray-300"
                    }`}
                />
              ))}
          </div>
          <p className="text-sm text-gray-500">
            {dealer?.rating} / 5.0 ({dealer?.totalReviews} reviews)
          </p>
          <p className="mt-1 text-xs text-gray-400">Joined {dealer?.joined}</p>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Link to={'/dashboard/profile'} className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90">
            <FaUserEdit size={14} /> Edit Profile
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
