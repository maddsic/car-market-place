import { useState, useRef, useEffect } from "react";
import { FaBell, FaEnvelope, FaSignOutAlt, FaCheck } from "react-icons/fa";
import { useNavigate, useSubmit, useFetcher } from "@remix-run/react";
import { NotificationItem } from "~/interfaces";


interface DashboardTopNavProps {
  notifications?: NotificationItem[];
}

export const DashboardTopNav = ({ notifications = [] }: DashboardTopNavProps) => {
  const navigate = useNavigate();
  const submit = useSubmit();
  const fetcher = useFetcher();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSignOut = () => {
    submit(null, { method: "post", action: "/auth/logout" });
  };

  const markAsRead = (id: string) => {
    fetcher.submit(
      { id: id },
      { method: "patch", action: "/api/notifications/read" }
    );
  };

  return (
    <div className="relative mb-5 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
      <h1 className="text-2xl font-semibold text-primary">Welcome</h1>

      <div className="flex items-center gap-5">
        {/* Messages */}
        <button
          type="button"
          onClick={() => navigate("/dashboard/messages")}
          className="relative text-gray-500 transition hover:text-primary"
          aria-label="Messages"
        >
          <FaEnvelope size={22} />
        </button>

        {/* Notifications Anchor */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="relative text-gray-500 transition hover:text-primary"
            aria-label="Notifications"
          >
            <FaBell size={22} />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown Panel */}
          {isOpen && (
            <div className="absolute right-0 top-9 z-50 w-80 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
              <div className="mb-2 flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <span className="rounded bg-yellow/20 px-2 py-0.5 text-[10px] font-bold text-slate-900">
                    {unreadCount} new
                  </span>
                )}
              </div>

              {notifications.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  No notifications yet.
                </div>
              ) : (
                <div className="max-h-72 space-y-2 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`flex items-start justify-between gap-2 rounded-lg p-2.5 transition ${n.isRead ? "bg-slate-50 opacity-70" : "bg-yellow/10"
                        }`}
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {n.title}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-600 line-clamp-2">
                          {n.message}
                        </p>
                      </div>

                      {!n.isRead && (
                        <button
                          type="button"
                          onClick={() => markAsRead(n.id)}
                          className="shrink-0 text-slate-400 hover:text-primary"
                          title="Mark as read"
                        >
                          <FaCheck size={11} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sign Out */}
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
