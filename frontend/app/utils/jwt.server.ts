import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

// Verify a JWT and return its payload
// NOTE: This file must only be imported from server-side code (loaders/actions).
// The ".server.ts" suffix ensures Remix strips this module out of the client
// bundle, so `process.env.JWT_SECRET_KEY` is always available at runtime.
export const verifyJwtToken = (token: string) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string,
    ) as JwtPayload;
    return decoded as { userId: string; role?: string };
  } catch (error) {
    console.error("❌ Invalid or expired token:", error);
    return null;
  }
};
