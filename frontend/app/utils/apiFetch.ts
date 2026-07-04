/** Standard envelope from car-management-v2 / legacy API (ADR 0002). */
export type ApiEnvelope<T = unknown> = {
  success?: boolean;
  message?: string;
  data?: T;
};

/**
 * Fetch JSON from the API. Expects `{ success, message, data }` for list/detail
 * routes. Returns the parsed envelope; callers read `.data`.
 */
export async function apiFetch(url: string, token?: string) {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });

    const body = (await response.json()) as ApiEnvelope;

    if (!response.ok) {
      throw new Error(
        body.message || `Failed to fetch data from ${url}: ${response.statusText}`,
      );
    }

    // Normalize missing data to [] so empty lists never crash loaders (ADR 0009).
    if (body.data === undefined || body.data === null) {
      body.data = [];
    }

    return body;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch data";
    console.error("Error fetching data:", error);
    throw new Response(message, { status: 500 });
  }
}
