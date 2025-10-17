import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import SignIn from "~/components/auth/signin";
import SignUp from "~/components/auth/signup";
import { handleSignIn, handleSignUp } from "~/utils/authHandler";

const AuthRoute = () => {
  const { authRoute } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  console.log("auth route", authRoute);

  return authRoute === "login" ? (
    <SignIn actionData={actionData} />
  ) : (
    <SignUp actionData={actionData} />
  );
};

export default AuthRoute;

// LOADER FUNCTION TO FETCH AUTH ROUTE TYPE
// This is used to determine which component to render (SignUp or Signin).
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { authRoute } = params;

  if (authRoute !== "signup" && authRoute !== "login") {
    throw new Response("Not Found", { status: 404 });
  }
  return { authRoute };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  // GET ROUTE TYPE FROM PARAMS
  const { authRoute } = params;
  // GET FORM DATA FROM REQUEST
  const formData = await request.formData();

  if (authRoute === "signup") {
    return await handleSignUp(formData);
  } else if (authRoute === "login") {
    return await handleSignIn(formData);
  }

  return null;
};
