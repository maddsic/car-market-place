import { apiEndpoints } from "~/store/apiEndpoints";

export const createReview = async (dealerId: string, data: any, token: string) => {
  try {
    const response = await fetch(`${apiEndpoints.createReview}/${dealerId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 👈 send the JWT token
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to create review");
    }

    return result;
  } catch (error) {
    console.error("ERROR FROM CREATE REVIEW HELPER:", error);
    throw error;
  }
};
