import { getAuthToken } from "~/utils/authHelpers";
import { apiUrl } from "~/config/api";

export async function updateVehicleStatus(
  request: Request,
  carId: string,
  status: string,
) {
  const token = getAuthToken(request);

  if (!token) {
    throw new Error("Unauthorized: No auth token found");
  }

  const response = await fetch(apiUrl(`/cars/${carId}/status`), {
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

  const response = await fetch(apiUrl(`/cars/${carId}`), {
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
