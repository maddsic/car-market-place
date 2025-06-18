import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Signin from "~/components/auth/signin";
import SignUp from "~/components/auth/signup";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { authRoute } = params;
  if (authRoute === "signup") {
    return "signup";
  } else if (authRoute === "signin") {
    return "signin";
  }
  return authRoute;
};

const AuthRoute = () => {
  const authRoute = useLoaderData();

  return authRoute === "signup" ? <SignUp /> : <Signin />;
};

export default AuthRoute;
