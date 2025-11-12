import { Form, Link, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { FormInput } from "~/components/FormInput/formInput";
import Heading from "~/components/Heading/heading";
import { Card } from "~/components/ui/card";
import Button from "~/components/Button/button";
import DisplayError from "../DisplayError/displayError";

const SignIn = ({ actionData }: { actionData: any }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (actionData?.success) {
      toast.success(
        `Welcome back! You are now signed in as ${actionData.data.first_name} ${actionData.data.last_name}.`,
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  }, [actionData, navigate]);

  return (
    <div className="input__bg screen__height flex items-center justify-center px-4">
      <div className="relative w-full max-w-4xl md:mt-20 md:p-20">
        <Heading title="Sign In" classNames="uppercase lg:text-[28px]" />

        <Card className="relative flex flex-col gap-8 border-t-4 border-t-gray-900 p-7 pt-5 shadow-lg md:flex-row md:p-10">
          {/* ==== Sign In Form ==== */}
          <Form className="relative w-full md:w-2/3" method="post">
            {actionData?.errors?.formError && (
              <DisplayError error={actionData.errors.formError} />
            )}

            <div className="grid gap-6">
              {/* Email Input */}
              <FormInput
                label="Email"
                name="email"
                placeholder="Enter your email"
              />
              {actionData?.errors?.email && (
                <DisplayError error={actionData.errors.email} />
              )}

              {/* Password Input with Eye Toggle */}
              <div className="relative">
                <FormInput
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <div
                  className="absolute right-3 top-[38px] cursor-pointer text-gray-500 hover:text-gray-800"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </div>
              </div>
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

          {/* ==== Demo User Info ==== */}
          <div className="rounded-lg bg-gray-50 p-5 text-sm text-gray-700 shadow-inner md:w-1/3">
            <h3 className="mb-3 text-base font-semibold text-gray-800">
              Demo Account Info
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="font-semibold">Email:</span> alpha@email.com
              </li>
              <li>
                <span className="font-semibold">Password:</span> Password1234$
              </li>
            </ul>
            <p className="mt-4 text-xs text-gray-500">
              Use these demo credentials to explore the dashboard.
            </p>
          </div>
        </Card>

        {/* Sign Up link */}
        <em className="gray__text-soft mt-3 block text-center text-xs md:text-sm">
          Don’t have an account?{" "}
          <Link to="/auth/signup" className="text-blue-500 hover:underline">
            Sign up here
          </Link>
        </em>
      </div>
    </div>
  );
};

export default SignIn;

type SignInActionData = {
  errors?: {
    formError?: string;
    username?: string;
    password?: string;
  };
  values?: {
    username?: string;
    password?: string;
  };
  success?: boolean;
  role?: "admin" | "dealer" | "user";
};
