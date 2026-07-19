export async function apiFetch(url: string, token?: string) {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from ${url}: ${response.statusText} (${response.status})`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching data:", error);

    // CHANGE THIS: Keep it as a standard Error object so Promise.all can propagate it cleanly
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(error.message || "Failed to fetch data");
  }
}
