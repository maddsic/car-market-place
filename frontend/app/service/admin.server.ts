import { apiFetch } from "~/utils/apiFetch";
import { getAuthToken } from "~/utils/authHelpers";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const API_VERSION = import.meta.env.VITE_API_VERSION || "/api/v1";

// Get admin dashboard stats
export async function getAdminDashboardStats(request: Request) {
  const token = getAuthToken(request);
  if (!token) {
    throw new Error("Unauthorized: No auth token found");
  }

  return await apiFetch(`${API_BASE_URL}${API_VERSION}/admin-dashboard/stats`, token);
}

// Get recent users for admin dashboard
export async function getRecentUsers(request: Request) {
  const token = getAuthToken(request);
  if (!token) {
    throw new Error("Unauthorized: No auth token found");
  }

  return await apiFetch(`${API_BASE_URL}${API_VERSION}/admin-dashboard/recent-users`, token);
}

// Get dashboard activities for both admin and dealer dashboards
export async function getDashboardActivities(request: Request) {
  const token = getAuthToken(request);
  if (!token) {
    throw new Error("Unauthorized: No auth token found");
  }

  return await apiFetch(`${API_BASE_URL}${API_VERSION}/dashboard/activities`, token);
}

// Get admin users with optional filters for role and search
export async function getAdminUsers(request: Request, filters: { role?: string; search?: string } = {}) {
  const token = getAuthToken(request);
  if (!token) throw new Error("Unauthorized: No auth token found");

  // Construct query parameters based on provided filters
  const queryParams = new URLSearchParams();
  if (filters.role && filters.role !== "all") queryParams.append("role", filters.role);
  if (filters.search) queryParams.append("search", filters.search);

  // Construct the query string for the API request
  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";

  return await apiFetch(
    `${API_BASE_URL}${API_VERSION}/admin-dashboard/users${queryString}`,
    token
  );
}

// Get admin inventory with optional filters for status and search
export async function getAdminInventory(
  request: Request,
  filters: { status?: string; search?: string } = {}
) {
  const token = getAuthToken(request);
  if (!token) throw new Error("Unauthorized: No auth token found");

  const queryParams = new URLSearchParams();
  if (filters.status && filters.status !== "all") queryParams.append("status", filters.status);
  if (filters.search) queryParams.append("search", filters.search);

  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";

  return await apiFetch(
    `${API_BASE_URL}${API_VERSION}/admin-dashboard/cars${queryString}`,
    token
  );
}
