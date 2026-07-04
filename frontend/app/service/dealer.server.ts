import { getAuthToken } from "~/utils/authHelpers";
import { apiEndpoints } from "~/store/apiEndpoints";

export async function getDealerDashboardStats(request: Request) {
  const token = getAuthToken(request);
  if (!token) {
    throw new Error("Unauthorized: No auth token found");
  }

  const response = await fetch(apiEndpoints.dealerStats, {
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

  const response = await fetch(apiEndpoints.dealerInventory, {
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

  const response = await fetch(apiEndpoints.dealerActivities, {
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

export async function getDealerProfileCardData(request: Request) {
  const token = getAuthToken(request);
  if (!token) {
    throw new Error("Unauthorized: No auth token found");
  }

  const response = await fetch(apiEndpoints.dealerProfileCard, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch dealer dashboard Profile Card Data");
  }
  return await response.json();
}

export async function updateDealerProfile(request: Request, formData: FormData) {
  const token = getAuthToken(request);
  if (!token) {
    throw new Error("Unauthorized: No auth token found");
  }

  const response = await fetch(apiEndpoints.dealerProfileUpdate, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update dealer profile");
  }
  return result
}
