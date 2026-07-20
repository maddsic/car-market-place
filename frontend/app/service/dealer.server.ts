import { getAuthToken } from "~/utils/authHelpers";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const API_VERSION = import.meta.env.VITE_API_VERSION || "/api/v1";

// This function will be used to fetch stats for the dealer dashboard stats page
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

// This function will be used to fetch inventory data for the dealer dashboard inventory page
// export async function getDealerDashboardInventory(request: Request) {
//   const token = getAuthToken(request);
//   if (!token) {
//     throw new Error("Unauthorized: No auth token found");
//   }

//   const response = await fetch(`${API_BASE_URL}${API_VERSION}/dealer-dashboard/inventory`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token}`,
//     },
//   });
//   if (!response.ok) {
//     throw new Error("Failed to fetch dealer dashboard inventory");
//   }
//   return await response.json();
// }

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
    // Read the actual error message sent by the backend framework
    const errorText = await response.text();
    let errorMessage = "Failed to fetch dealer dashboard inventory";

    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.message || errorMessage;
    } catch {
      errorMessage = errorText || errorMessage;
    }

    throw new Error(errorMessage);
  }

  return await response.json();
}
// This function will be used to fetch activities for the dealer dashboard activities page
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

// This function will be used to fetch dealer profile data for the dealer dashboard profile page
export async function getDealerProfileCardData(request: Request) {
  const token = getAuthToken(request);
  if (!token) {
    throw new Error("Unauthorized: No auth token found");
  }

  const response = await fetch(`${API_BASE_URL}${API_VERSION}/dealer-dashboard/profile-card`, {
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

// This function will be used to update dealer profile from the dealer dashboard profile page
export async function updateDealerProfile(request: Request, formData: FormData) {
  const token = getAuthToken(request);
  if (!token) {
    throw new Error("Unauthorized: No auth token found");
  }

  const response = await fetch(`${API_BASE_URL}${API_VERSION}/dealer-dashboard/profile-update`, {
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

// This function will be used to send message to dealer from the car details page
export async function sendMessageToDealer(request: Request, formData: FormData) {
  // Convert formData to a plain object
  const formEntries = Object.fromEntries(formData)

  // Send message to dealer
  const response = await fetch(`${API_BASE_URL}${API_VERSION}/messages/create`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(formEntries),
  });

  // Check if response is ok
  if (!response.ok) {
    // try to extract error message from response body, if it fails use a default error message
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || "Failed to send message to dealer");
  }
  // return response data
  return await response.json();
}

// This function will be used to fetch messages for the dealer dashboard messages page
export async function getDealerMessages(request: Request) {
  const token = getAuthToken(request);
  if (!token) {
    throw new Error("Unauthorized: No auth token found");
  }

  const response = await fetch(`${API_BASE_URL}${API_VERSION}/messages/dealer`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to update dealer profile");
  }
  const result = await response.json();
  return result
}

// This function will be used to mark a message as read from the dealer dashboard messages page
export async function markMessageAsRead(request: Request, messageId: string) {
  const token = getAuthToken(request);
  if (!token) {
    throw new Error("Unauthorized: No auth token found");
  }

  const response = await fetch(`${API_BASE_URL}${API_VERSION}/messages/${messageId}/read`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to mark message as read");
  }

  const result = await response.json();
  return result;
}

