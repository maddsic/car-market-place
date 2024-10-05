import { json } from "@remix-run/node";

export async function apiFetch(url: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from ${url}: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    throw new Response(error.message || "Failed to fetch data", {
      status: 500,
    });
  }
}
