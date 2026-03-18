import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useActionData, useLoaderData } from "@remix-run/react";
import SignIn from "~/components/auth/signin";
import SignUp from "~/components/auth/signup";
import { handleSignIn, handleSignUp } from "~/utils/authHandler";
import { getAuthToken } from "~/utils/authHelpers";
import jwt from "jsonwebtoken";

interface AuthTokenPayload extends jwt.JwtPayload {
  userId: string;
  email: string;
  role: "admin" | "agent" | "user";
}

const AuthRoute = () => {
  const { authRoute, message } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div className="auth-container">
      {/* Display the message if it exists */}
      {message && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4">
          {message}
        </div>
      )}
      {authRoute === "login" ? (
        <SignIn actionData={actionData ?? {}} />
      ) : (
        <SignUp actionData={actionData} />
      )}
    </div>
  )
};

export default AuthRoute;

// LOADER FUNCTION TO FETCH AUTH ROUTE TYPE
// This is used to determine which component to render (SignUp or Signin).
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const token = getAuthToken(request);

  // Check if token exists
  if (token) {
    const decodedToken = jwt.decode(token) as AuthTokenPayload | null;
    if (decodedToken?.role === "agent" || decodedToken?.role === "admin") return redirect("/dashboard");
    return redirect(`/profile/${decodedToken?.userId}`);
  }

  // Extract message from the params
  const url = new URL(request.url)
  const message = url.searchParams.get("message") // Grabs "Please log in to create a car"

  // Gran the Auth Route
  const authRoute = params.authRoute;
  if (authRoute !== "signup" && authRoute !== "login") {
    throw new Response("Page Not Found", { status: 404 });
  }
  return { authRoute, message };
};


// ACTION FUNCTION TO HANDLE FORM SUBMISSIONS
export const action = async ({ request, params }: ActionFunctionArgs) => {
  // GET ROUTE TYPE FROM PARAMS
  const { authRoute } = params;
  // GET FORM DATA FROM REQUEST
  const formData = await request.formData();

  if (authRoute === "signup") {
    return (await handleSignUp(formData)) ?? {};
  } else if (authRoute === "login") {
    return (await handleSignIn(formData)) ?? {};
  }

  return {};
};
