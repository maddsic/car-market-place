import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

// Verify a JWT and return its payload
export const verifyJwtToken = (token: string) => {
  try {
    const jwt_secret_key = process.env.JWT_SECRET_KEY;

    if (!jwt_secret_key) {
      console.error("❌ JWT_SECRET_KEY is not defined in environment variables.");
      return null;
    }

    const decodedToken = jwt.verify(
      token,
      jwt_secret_key as string,
    ) as JwtPayload;
    return decodedToken as { userId: string; role?: string };
  } catch (error) {
    console.error("❌ JWT verification failed:", error);
    return null;
  }
};
