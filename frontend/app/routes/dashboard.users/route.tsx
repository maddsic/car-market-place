import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
import { FaSearch, FaUsers, FaUserTie, FaUser, FaFilter, FaCheck, FaTimes } from "react-icons/fa";
import { getAuthToken } from "~/utils/authHelpers";
import { verifyJwtToken } from "~/utils/jwt.server";
import { getAdminUsers } from "~/service/admin.server";

interface UserItem {
  userId: string;
  username: string;
  email: string;
  phone?: string;
  role: "admin" | "agent" | "user";
  isVerified: boolean;
  createdAt: string;
}

export default function AdminUsersDirectory() {
  const { users, roleFilter, searchQuery } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSearching = navigation.state === "loading";

  // Auto-submit when changing the role dropdown
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    submit(e.currentTarget.form);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="flex flex-col gap-6">

        {/* Header & Title */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-black text-primary">User Directory</h1>
            <p className="text-sm text-gray-500">
              Manage and view all registered buyers, dealers, and administrators.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
              {users.length} {users.length === 1 ? "User" : "Users"} Total
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <Form method="get" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Search Input */}
            <div className="relative sm:col-span-2">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                name="search"
                defaultValue={searchQuery}
                placeholder="Search by username or email..."
                className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-4 text-sm focus:border-primary focus:outline-none"
              />
            </div>

            {/* Role Filter Dropdown */}
            <div className="flex gap-2">
              <div className="relative w-full">
                <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
                <select
                  name="role"
                  defaultValue={roleFilter}
                  onChange={handleRoleChange}
                  className="w-full appearance-none rounded-lg border border-gray-300 py-2 pl-8 pr-8 text-sm capitalize focus:border-primary focus:outline-none"
                >
                  <option value="all">All Roles</option>
                  <option value="user">Buyers (Users)</option>
                  <option value="agent">Dealers (Agents)</option>
                  <option value="admin">Admins</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSearching}
                className="rounded-lg bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-primary/90 disabled:opacity-50"
              >
                {isSearching ? "..." : "Search"}
              </button>
            </div>
          </Form>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Phone Number</th>
                <th className="px-6 py-4">Registration Date</th>
                <th className="px-6 py-4">Verification Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users && users.length > 0 ? (
                users.map((user: UserItem) => (
                  <tr key={user.userId} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                          {user.username?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.username}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${user.role === "agent"
                          ? "bg-yellow-100 text-yellow-800"
                          : user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                          }`}
                      >
                        {user.role === "agent" ? (
                          <FaUserTie size={10} />
                        ) : user.role === "admin" ? (
                          <FaUsers size={10} />
                        ) : (
                          <FaUser size={10} />
                        )}
                        {user.role === "agent" ? "Dealer" : user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {user.phone || <span className="text-gray-400 italic">Not provided</span>}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                        : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ${user.isVerified
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                          }`}
                      >
                        {user.isVerified ? (
                          <FaCheck size={10} />
                        ) : (
                          <FaTimes size={10} />
                        )}
                        {user.isVerified ? "Verified" : "Not Verified"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-500">
                    No users found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

// Route Loader Guarded for Admins Only
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const token = getAuthToken(request);
  if (!token) return redirect("/auth/login");

  const verifiedToken = verifyJwtToken(token);
  if (!verifiedToken || verifiedToken.role !== "admin") {
    // Non-admins get bounced to their standard dashboard
    return redirect("/dashboard");
  }

  const url = new URL(request.url);
  const roleFilter = url.searchParams.get("role") || "all";
  const searchQuery = url.searchParams.get("search")?.trim() || "";

  try {
    const usersResponse = await getAdminUsers(request, {
      role: roleFilter,
      search: searchQuery,
    });

    return json({
      users: usersResponse?.data || usersResponse || [],
      roleFilter,
      searchQuery,
    });
  } catch (error) {
    console.error("Failed to load admin users directory:", error);
    return json({
      users: [],
      roleFilter,
      searchQuery,
    });
  }
};
