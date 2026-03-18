import { getAuthToken } from "~/utils/authHelpers";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const API_VERSION = import.meta.env.VITE_API_VERSION || "/api/v1";


export async function getDealerDashboardStats(request: Request) {
  const token = getAuthToken(request);
  // console.log(token)
  if (!token) {
    throw new Error("Unauthorized: No auth token found");
  }

  const response = await fetch(`${API_BASE_URL}${API_VERSION}/dealer-dashboard/stats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch dealer dashboard stats");
  }
  return await response.json();
}


export async function getDealerDashboardInventory(request: Request) {
  const token = getAuthToken(request);
  if (!token) {
    throw new Error("Unauthorized: No auth token found");
  }

  const response = await fetch(`${API_BASE_URL}${API_VERSION}/dealer-dashboard/inventory`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch dealer dashboard inventory");
  }
  return await response.json();
}

export async function getDashboardActivities(request: Request) {
  const token = getAuthToken(request);
  if (!token) {
    throw new Error("Unauthorized: No auth token found");
  }

  const response = await fetch(`${API_BASE_URL}${API_VERSION}/dealer-dashboard/activities`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch dealer dashboard Activities");
  }
  return await response.json();
}
