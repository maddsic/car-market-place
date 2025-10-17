import type { z } from "zod";
import { SignInSchema, SignUpSchema } from "~/schemas/authSchema";

type registerData = z.infer<typeof SignUpSchema>;
type loginData = z.infer<typeof SignInSchema>;

// const API_BASE_URL = process.env.API_BASE_URL;
// const API_VERSION = process.env.API_VERSION || "/api/v1";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const API_VERSION = import.meta.env.VITE_API_VERSION || "/api/v1";

export const RegisterUser = async (data: registerData) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_VERSION}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

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

export const LoginUser = async (data: loginData) => {
  const response = await fetch(`${API_BASE_URL}${API_VERSION}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to login user");
  }

  const user = await response.json();
  console.log("USER FROM LOGIN HELPER:", user);
  return user;
};
