/**
 * API base URL for car-management-v2 (JCC backend).
 * Override via frontend/.env — see .env.example.
 */
export const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const apiVersion = import.meta.env.VITE_API_VERSION || "/api/v1";

/** Build a full API URL path, e.g. apiUrl("/cars/search") */
export function apiUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${apiBaseUrl}${apiVersion}${normalized}`;
}
