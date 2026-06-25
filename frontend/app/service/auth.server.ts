// app/services/auth.server.ts

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const API_VERSION = import.meta.env.VITE_API_VERSION || "/api/v1";

interface SendCodeResponse {
  success: boolean;
  message: string;
}

interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

/**
 * STEP 1: Requests a 6-digit password recovery code from the Express backend
 * Endpoint: POST /api/v1/auth/forgot-password
 */
export async function sendPasswordResetCode(email: string): Promise<SendCodeResponse> {
  const response = await fetch(`${API_BASE_URL}${API_VERSION}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to transmit recovery email code.");
  }

  return result;
}

/**
 * STEP 2: Submits the recovery validation code and updates the password
 * Endpoint: POST /api/v1/auth/reset-password
 */
export async function resetPasswordSubmit(
  email: string,
  code: string,
  password: string,
  confirmPassword: string
): Promise<ResetPasswordResponse> {
  const response = await fetch(`${API_BASE_URL}${API_VERSION}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, code, password, confirmPassword }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update your credentials.");
  }

  return result;
}
