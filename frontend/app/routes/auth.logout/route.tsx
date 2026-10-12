import { type ActionFunctionArgs, redirect } from "@remix-run/node";
import { toast } from "react-toastify";

export const action = async ({ request }: ActionFunctionArgs) => {
  return redirect("/auth/login", {
    status: 302,
    headers: {
      "Set-Cookie":
        "authToken=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
    },
  });
};

export const loader = async () => {
  toast.success("You have been logged out successfully.");
  return redirect("/auth/login");
};
