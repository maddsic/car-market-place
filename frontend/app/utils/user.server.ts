import type { z } from "zod";
import { SignInSchema, SignUpSchema } from "~/schemas/authSchema";

type registerData = z.infer<typeof SignUpSchema>;
type loginData = z.infer<typeof SignInSchema>;
const API_BASE_URL = process.env.API_BASE_URL;

export const RegisterUser = async (data: registerData) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
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
};

export const LoginUser = async (data: loginData) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
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
