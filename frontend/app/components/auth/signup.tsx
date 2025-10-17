import { useEffect, useState } from "react";
import { Form, Link, useNavigate } from "@remix-run/react";
import { cn } from "~/lib/utils";

// components
import Heading from "~/components/Heading/heading";
import { Checkbox } from "~/components/ui/checkbox";
import { FormInput } from "~/components/FormInput/formInput";
import { Card } from "~/components/ui/card";
import Button from "~/components/Button/button";
import DisplayError from "../DisplayError/displayError";
import PasswordRequirements from "../PasswordRequirement/passwordRequirement";

// Third party libraries
import { toast } from "react-toastify";

const SignUp = ({ actionData }: { actionData?: ActionData }) => {
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData?.success) {
      toast.success(
        "User registered successfully! Please sign in to continue.",
      );

      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    }
  }, [actionData, navigate]);

  return (
    <div className="input__bg flex min-h-screen justify-center px-4">
      <div className="relative w-full max-w-4xl py-20 pt-10 md:pt-20">
        <Heading title="Sign Up" classNames="uppercase lg:text-[28px]" />
        <Card className="space-y-6 rounded-2xl border-t-4 border-gray-900 p-7 shadow-xl md:p-10">
          <Form className="relative w-full" method="post">
            {/* Display errors if any */}
            {actionData?.errors?.formError && (
              <DisplayError error={actionData.errors.formError} />
            )}
            <h2 className="mb-2 text-lg font-semibold">Personal Information</h2>
            <div className="relative grid gap-5 gap-y-7 py-5 md:grid-cols-2">
              <div>
                <FormInput
                  label="First Name"
                  name="first_name"
                  defaultValue={actionData?.values?.first_name}
                  placeholder="Enter your first name"
                />
                {actionData?.errors?.first_name && (
                  <DisplayError error={actionData.errors.first_name} />
                )}
              </div>
              <div>
                <FormInput
                  label="Last Name"
                  name="last_name"
                  defaultValue={actionData?.values?.last_name}
                  placeholder="Enter your last name"
                />
                {actionData?.errors?.last_name && (
                  <DisplayError error={actionData.errors.last_name} />
                )}
              </div>
              <span className="space-y-2">
                <div>
                  {" "}
                  <FormInput
                    label="Phone Number"
                    name="phone"
                    defaultValue={actionData?.values?.phone}
                    placeholder="Enter your phone number"
                  />
                  {actionData?.errors?.phone && (
                    <DisplayError error={actionData.errors.phone} />
                  )}
                </div>
                <div>
                  <CustomCheckBox
                    text="I have a whatsapp account with this number"
                    htmlFor=""
                    classNames="text-[10px]"
                    name="hasWhatsapp"
                    value="on"
                  />
                </div>
              </span>
              <div>
                <FormInput
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="Enter your Email"
                />
                {actionData?.errors?.email && (
                  <DisplayError error={actionData.errors.email} />
                )}
              </div>
              <div>
                <FormInput
                  label="Username"
                  name="username"
                  placeholder="Enter your username to login"
                />
                {actionData?.errors?.username && (
                  <DisplayError error={actionData.errors.username} />
                )}
              </div>
              <div>
                <PasswordRequirements
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* Hidden input to include password in form submission */}
                <input type="hidden" name="password" value={password} />
              </div>
              {/* TERMS AND SERVICE */}
              <div className="space-y-5">
                <div>
                  <CustomCheckBox
                    text="I accept the terms of service"
                    htmlFor="terms"
                  />
                  {actionData?.errors?.password && (
                    <DisplayError error={actionData.errors.password} />
                  )}
                </div>
                <div>
                  <CustomCheckBox
                    name="role"
                    text="As Agent"
                    htmlFor="as_agent"
                    value="agent"
                  />
                </div>
              </div>
              {/* SUBMIT BTN */}
              <Button
                type="submit"
                title={"Submit"}
                className="sticky bottom-0 mt-5 w-full border-t p-3 text-white shadow"
              />
            </div>
          </Form>
          <em className="gray__text-soft text-center text-xs md:text-sm">
            Already a member ? signin{" "}
            <Link to="/auth/login" className="text-blue-500">
              here
            </Link>
          </em>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;

type ActionData = {
  // Errors object to hold validation errors
  // This can be used to display errors in the form fields
  errors?: {
    formError?: string; // General form error
    first_name?: string;
    last_name?: string;
    email?: string;
    username?: string;
    password?: string;
    phone?: string;
    role?: boolean;
    hasWhatsapp?: boolean; // Indicates if the user has a hasWhatsapp account with the provided phone number
  };
  // Values object to hold the form values
  // This can be used to pre-fill the form fields in case of errors
  values?: {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    phone: string;
    role?: boolean;
    hasWhatsapp?: boolean;
  };
  success?: boolean;
  role?: "admin" | "agent" | "user"; // Indicates if the form submission was successful
};

function CustomCheckBox({
  classNames,
  text,
  htmlFor,
  name,
  value,
}: {
  classNames?: string;
  text: string;
  htmlFor: string;
  name?: string;
  value?: string;
}) {
  return (
    <div className={cn(`flex items-center space-x-2 ${classNames}`)}>
      <Checkbox
        id={htmlFor}
        className="border-none bg-[#f0f2f5]"
        name={name}
        value={value}
      />
      <label
        htmlFor={htmlFor}
        className="gray__text-soft text-[13px] font-medium leading-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-xs"
      >
        <em>{text}</em>
      </label>
    </div>
  );
}
