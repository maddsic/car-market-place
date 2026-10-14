import { FaBell, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import { useNavigate, useSubmit } from "@remix-run/react";

export const DashboardTopNav = () => {
  const navigate = useNavigate();
  const submit = useSubmit();

  const handleSignOut = () => {
    // Sends a POST request to /auth/logout
    submit(null, { method: "post", action: "/auth/logout" });
  };

  return (
    <div className="mb-5 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
      <h1 className="text-2xl font-semibold text-primary">
        Welcome
      </h1>
      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={() => navigate("/dashboard/messages")}
          className="relative text-gray-500 transition hover:text-primary"
          aria-label="Messages"
        >
          <FaEnvelope size={22} />
        </button>

        <button
          type="button"
          className="relative text-gray-500 transition hover:text-primary"
          aria-label="Notifications"
        >
          <FaBell size={22} />
        </button>

        <button
          type="button"
          onClick={handleSignOut}
          title="Sign Out"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-white transition hover:bg-red-600 focus:outline-none"
          aria-label="Sign out"
        >
          <FaSignOutAlt size={16} />
        </button>
      </div>
    </div>
  );
};
