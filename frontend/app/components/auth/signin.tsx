import { Form, Link, useNavigate } from "@remix-run/react";
import { FormInput } from "~/components/FormInput/formInput";
import Heading from "~/components/Heading/heading";
import { Card } from "~/components/ui/card";
import Button from "~/components/Button/button";
import { useEffect } from "react";
import { toast } from "react-toastify";
import DisplayError from "../DisplayError/displayError";

const SignIn = ({ actionData }: { actionData: any }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData?.success) {
      toast.success(
        `welcome back! You are now signed in as ${actionData.data.first_name} ${actionData.data.last_name}.`,
      );

      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [actionData, navigate]);

  return (
    <div className="input__bg screen__height flex items-center justify-center px-4">
      <div className="relative w-full max-w-3xl pt-10 md:mt-20 md:p-20">
        <Heading title="Sign In" classNames="uppercase lg:text-[28px]" />
        <Card className="relative flex flex-col gap-5 border-t-4 border-t-gray-900 p-7 pt-5 shadow-lg md:p-10">
          <Form className="relative w-full" method="post">
            {actionData?.errors?.formError && (
              <DisplayError error={actionData.errors.formError} />
            )}
            <div className="grid gap-6">
              <FormInput
                label="Email"
                name="email"
                placeholder="Enter your email"
              />
              {actionData?.errors?.email && (
                <DisplayError error={actionData.errors.email} />
              )}
              <FormInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />
              {actionData?.errors?.password && (
                <DisplayError error={actionData.errors.password} />
              )}
              <Button
                title="Sign In"
                type="submit"
                className="mt-2 w-full p-3 text-white shadow"
              />
            </div>
          </Form>
          <em className="gray__text-soft text-center text-xs md:text-sm">
            Don't have an account? Sign up {""}
            <Link to="/auth/signup" className="text-blue-500">
              here
            </Link>
          </em>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;

type SignInActionData = {
  // Errors object to hold validation errors
  // This can be used to display errors in the form fields
  errors?: {
    formError?: string; // General form error
    username?: string;
    password?: string;
    // is_dealer?: string;
  };
  // Values object to hold the form values
  values?: {
    username?: string;
    password?: string;
  };
  success?: boolean; // Indicates if the form submission was successful
  role?: "admin" | "dealer" | "user";
};
