import { z } from "zod";

export const SignUpSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .regex(/^[a-zA-Z\s'-]+$/, "First name must contain only letters"),
  last_name: z
    .string()
    .min(1, "Last name is required")
    .regex(/^[a-zA-Z\s'-]+$/, "Last name must contain only letters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(10, "Password must be at least 10 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits long")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  role: z.enum(["admin", "agent", "user"]).default("user"),
  hasWhatsapp: z.boolean(),
});

export const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(10, "Password is requireed"),
});
