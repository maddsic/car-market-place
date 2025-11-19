import type { z } from "zod";
import { SignInSchema, SignUpSchema } from "~/schemas/authSchema";
import { apiEndpoints } from "~/store/apiEndpoints";
import { parse } from "cookie";

type registerData = z.infer<typeof SignUpSchema>;
type loginData = z.infer<typeof SignInSchema>;

// REGISTER USER HELPER FUNCTION
export const RegisterUser = async (data: registerData) => {
  try {
    const response = await fetch(`${apiEndpoints.register}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to register user");
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.log("ERROR FROM REGISTER USER HELPER:", error);
    throw error;
  }
};

// LOGIN USER HELPER FUNCTION
export const LoginUser = async (data: loginData) => {
  const response = await fetch(`${apiEndpoints.login}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to login user");
  }

  const user = await response.json();
  const setCookie = response.headers.get("Set-Cookie");
  // console.log("USER FROM LOGIN HELPER:", user, setCookie);
  return { user, setCookie };
};

// FUNCTION TO EXTRACT AUTH TOKEN FROM REQUEST COOKIES
export function getAuthToken(request: Request): string | null {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;

  const cookies = parse(cookieHeader);
  // read and return the token stored in HTTP-only cookie
  return cookies.authToken || null;
}
