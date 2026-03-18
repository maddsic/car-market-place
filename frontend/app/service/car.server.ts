import { getAuthToken } from "~/utils/authHelpers";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const API_VERSION = import.meta.env.VITE_API_VERSION || "/api/v1";


// api.server.ts
export async function updateVehicleStatus(request: Request, carId: string, status: string) {
  const token = getAuthToken(request);

  if (!token) {
    throw new Error("Unauthorized: No auth token found");
  }

  // Calling your PATCH endpoint: /api/v1/cars/:id/status
  const response = await fetch(`${API_BASE_URL}${API_VERSION}/cars/${carId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  console.log(response.status)

  if (!response.ok) {
    throw new Error("Failed to update vehicle status");
  }

  return await response.json();
}

export async function deleteVehicle(request: Request, carId: string) {
  const token = getAuthToken(request);

  if (!token) {
    throw new Error("Unauthorized: No auth token found");
  }

  // Calling your delete endpoint: /api/v1/cars/:id
  const response = await fetch(`${API_BASE_URL}${API_VERSION}/cars/${carId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  console.log(response.status)

  if (!response.ok) {
    throw new Error("Failed to update vehicle status");
  }

  return await response.json();
}
