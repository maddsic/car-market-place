import { NavLink, Outlet } from "@remix-run/react";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { FaChartBar, FaCarSide, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { DashboardTopNav } from "./dashboardTopNav";
import { getAuthToken } from "~/utils/authHelpers";
import jwt from "jsonwebtoken";

const navItems = [
  { to: "/dashboard", label: "Overview", icon: <FaChartBar size={18} /> },
  {
    to: "/dashboard/inventory",
    label: "Inventory",
    icon: <FaCarSide size={18} />,
  },
  {
    to: "/dashboard/profile",
    label: "Profile Settings",
    icon: <FaUserCircle size={18} />,
  },
];

export default function DashboardLayout() {
  return (
    <div className="flex bg-gray-50">
      <aside className="flex w-64 flex-col bg-primary p-5 shadow-lg">
        <nav className="font-montserrat mt-3 flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/dashboard"}
              className={({ isActive }) =>
                `relative flex items-center gap-3 rounded-md p-2 font-medium transition-all duration-300 ease-in-out ${isActive
                  ? "bg-white text-primary shadow-md"
                  : "text-white hover:bg-gray-100/10 hover:text-yellow"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Animated left indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 h-full w-[4px] rounded-r-md bg-yellow"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    />
                  )}
                  {item.icon}
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="font-montserrat flex-1 items-center gap-5 p-8">
        <DashboardTopNav />
        <Outlet />
      </main>
    </div>
  );
}

// DEFINE INTERFACE FOR DECODED TOKEN
interface AuthTokenPayload extends jwt.JwtPayload {
  userId: string;
  email: string;
  role: "admin" | "agent" | "user";
}


// LOADER FUNCTION TO PROTECT DASHBOARD ROUTES
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const token = getAuthToken(request);
  if (!token) return redirect("/auth/login");

  const decodedToken = jwt.decode(token) as AuthTokenPayload | null;

  if (decodedToken?.role !== "agent") {
    return redirect(`/profile/${decodedToken?.userId}`);
  }
  return null;
}
















