import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { verifyUserEmailToken } from "~/service/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  console.log("Token from the verify-email component", token)

  if (!token) {
    return json({ success: false, error: "No verification token provided." }, { status: 400 });
  }

  try {
    await verifyUserEmailToken(token);
    return json({ success: true, error: null });
  } catch (error) {
    return json({ success: false, error: "Invalid or expired token." }, { status: 400 });
  }
};

export default function VerifyEmailPage() {
  const data = useLoaderData<typeof loader>();
  const isSuccess = data.success;

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        {/* Status Badge Icon */}
        <div style={styles.iconCircle(isSuccess)}>
          {isSuccess ? (
            <svg style={styles.icon("#16a34a")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg style={styles.icon("#dc2626")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>

        {/* Dynamic Header & Text */}
        <h1 style={styles.title}>
          {isSuccess ? "Email Verified Successfully!" : "Verification Failed"}
        </h1>
        <p style={styles.description}>
          {isSuccess
            ? "Your email has been confirmed. You can now log in to access your account."
            : data.error}
        </p>

        {/* Dynamic Buttons */}
        {isSuccess ? (
          <Link to="auth/login" style={styles.primaryButton}>
            Go to Login
          </Link>
        ) : (
          <div style={styles.buttonStack}>
            <Link to="/resend-verification" style={styles.primaryButton}>
              Request New Link
            </Link>
            <Link to="auth/login" style={styles.secondaryButton}>
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// Minimal CSS Styles
const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
    padding: "1.5rem",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "2.5rem 2rem",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center" as const,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)",
    border: "1px solid #e2e8f0",
  },
  iconCircle: (isSuccess: boolean) => ({
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: isSuccess ? "#f0fdf4" : "#fef2f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.25rem auto",
  }),
  icon: (color: string) => ({
    width: "32px",
    height: "32px",
    color: color,
  }),
  title: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#0f172a",
    margin: "0 0 0.5rem 0",
  },
  description: {
    fontSize: "0.925rem",
    color: "#64748b",
    lineHeight: "1.5",
    margin: "0 0 1.75rem 0",
  },
  buttonStack: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
  },
  primaryButton: {
    display: "block",
    width: "100%",
    boxSizing: "border-box" as const,
    backgroundColor: "#2563eb",
    color: "#ffffff",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "0.9rem",
    textDecoration: "none",
  },
  secondaryButton: {
    display: "block",
    width: "100%",
    boxSizing: "border-box" as const,
    backgroundColor: "transparent",
    color: "#64748b",
    padding: "0.6rem 1rem",
    borderRadius: "8px",
    fontWeight: "500",
    fontSize: "0.875rem",
    textDecoration: "none",
  },
};
