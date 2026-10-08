import { useState } from "react";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { FaChartBar, FaCarSide, FaUserCircle, FaEnvelope, FaBars, FaTimes, FaTags, FaUsers } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardTopNav } from "./dashboardTopNav";
import { getAuthToken } from "~/utils/authHelpers";
import jwt from "jsonwebtoken";

const dealerNavItems = [
  { to: "/dashboard", label: "Overview", icon: <FaChartBar size={18} /> },
  {
    to: "/dashboard/inventory",
    label: "Inventory",
    icon: <FaCarSide size={18} />,
  },
  {
    to: "/dashboard/messages",
    label: "Messages",
    icon: <FaEnvelope size={18} />,
  },
  {
    to: "/dashboard/profile",
    label: "Profile Settings",
    icon: <FaUserCircle size={18} />,
  },
];

const adminNavItems = [
  { to: "/dashboard", label: "Overview", icon: <FaChartBar size={18} /> },
  { to: "/dashboard/users", label: "User Directory", icon: <FaUsers size={18} /> },
  { to: "/dashboard/admin-inventory", label: "All Inventory", icon: <FaCarSide size={18} /> },
  { to: "/dashboard/taxonomy", label: "Makes & Models", icon: <FaTags size={18} /> },
  { to: "/dashboard/messages", label: "Messages & Inquiries", icon: <FaEnvelope size={18} /> },
];

export default function DashboardLayout() {
  const { role } = useLoaderData<typeof loader>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = role === "admin" ? adminNavItems : dealerNavItems;

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    // Outer Container: locked to exact screen height
    <div className="h-screen w-full overflow-hidden bg-gray-50 flex flex-col md:flex-row">

      {/* Mobile Top Header Toggle Bar */}
      <div className="flex-shrink-0 z-20 flex items-center justify-between bg-primary p-4 text-white md:hidden">
        <button
          onClick={toggleSidebar}
          className="rounded-md p-2 text-white hover:bg-white/10 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
        <span className="font-montserrat text-sm font-bold uppercase tracking-wider text-yellow">
          {role === "admin" ? "Admin Portal" : "Dealer Portal"}
        </span>
      </div>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-xs md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Fixed Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-full w-64 flex-shrink-0 flex-col bg-primary p-5 shadow-lg transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
          <span className="font-montserrat text-lg font-bold uppercase text-white">
            {role === "admin" ? "Admin Panel" : "Dealer Panel"}
          </span>
          <button
            onClick={closeSidebar}
            className="text-white md:hidden hover:text-yellow"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <nav className="font-montserrat flex flex-1 flex-col gap-2 overflow-y-auto no-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/dashboard"}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `relative flex items-center gap-3 rounded-md p-2.5 font-medium transition-all duration-300 ease-in-out ${isActive
                  ? "bg-white text-primary shadow-md"
                  : "text-white hover:bg-gray-100/10 hover:text-yellow"
                }`
              }
            >
              {({ isActive }) => (
                <>
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

      {/* Main Content Area: flex-1 + min-h-0 + pb-24 ensures 100% of content is scrollable */}
      <main className="font-montserrat flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 lg:p-8 no-scrollbar pb-24">
        <DashboardTopNav />
        <div className="mt-6">
          <Outlet />
        </div>
      </main>

    </div>
  );
}
// DEFINE INTERFACE FOR DECODED TOKEN
interface AuthTokenPayload {
  userId: string;
  email: string;
  role: "admin" | "agent" | "user";
}

// LOADER FUNCTION TO PROTECT DASHBOARD ROUTES & SERVE USER ROLE
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const token = getAuthToken(request);
  if (!token) return redirect("/auth/login");

  const decodedToken = jwt.decode(token) as AuthTokenPayload | null;

  if (!decodedToken || (decodedToken.role !== "admin" && decodedToken.role !== "agent")) {
    return redirect(`/profile/${decodedToken?.userId || ""}`);
  }

  return json({ role: decodedToken.role, userId: decodedToken.userId });
};
