import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "~/components/ui/card";
import { FaStar, FaCheckCircle, FaUserEdit } from "react-icons/fa";
import { motion } from "framer-motion";

export default function DealerProfileCard() {
  const dealer = {
    name: "Kunta Motors",
    verified: true,
    rating: 4.8,
    totalReviews: 132,
    location: "Atlanta GA, USA",
    joined: "Jan 2023",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border border-gray-200 shadow-md">
        <CardHeader className="flex flex-col items-center justify-center text-center">
          <img
            src="/sain.jpeg"
            alt="Dealer"
            className="h-20 w-20 rounded-full border-4 border-primary shadow-md"
          />
          <CardTitle className="mt-3 text-xl font-semibold text-gray-900">
            {dealer.name}
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{dealer.location}</span>
            {dealer.verified && (
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
                  className={`${
                    i < Math.round(dealer.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
          </div>
          <p className="text-sm text-gray-500">
            {dealer.rating} / 5.0 ({dealer.totalReviews} reviews)
          </p>
          <p className="mt-1 text-xs text-gray-400">Joined {dealer.joined}</p>
        </CardContent>

        <CardFooter className="flex justify-center">
          <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90">
            <FaUserEdit size={14} /> Edit Profile
          </button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
