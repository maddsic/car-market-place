import { Form, Link } from "@remix-run/react";
import { Checkbox } from "~/components/ui/checkbox";
import { FormInput } from "~/components/FormInput/formInput";
import Heading from "~/components/Heading/heading";
import { Card } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import Button from "~/components/Button/button";

const SignUp = () => {
  return (
    <div className="input__bg flex min-h-screen justify-center px-4">
      <div className="relative w-full max-w-4xl py-20 pt-10 md:pt-20">
        <Heading title="Sign Up" classNames="uppercase lg:text-[28px]" />
        <Card className="relative flex w-full flex-col gap-5 border-t-4 border-t-gray-900 p-7 pt-5 shadow-lg md:gap-10 md:p-10">
          <Form className="relative w-full">
            <div className="relative grid gap-5 gap-y-7 py-5 md:grid-cols-2">
              <FormInput
                label="First Name"
                name="firstname"
                placeholder="Enter your first name"
              />
              <FormInput
                label="Last Name"
                name="lastname"
                placeholder="Enter your last name"
              />
              <span className="space-y-2">
                <FormInput
                  label="Phone Number"
                  name="phone"
                  placeholder="Enter your phone number"
                />
                <CustomCheckBox
                  text="I have a whatsapp account with this number"
                  htmlFor=""
                  classNames="text-[10px]"
                />
              </span>

              <FormInput
                label="Email"
                name="email"
                placeholder="Enter your Email"
              />
              <FormInput
                label="Username"
                name="username"
                placeholder="Enter your username to login"
              />
              <FormInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />

              {/* TERMS AND SERVICE */}
              <div className="space-y-5">
                <CustomCheckBox
                  text="I accept the terms of service"
                  htmlFor="terms"
                />
                <CustomCheckBox text="As Dealer" htmlFor="is_dealer" />
              </div>

              {/* SUBMIT BTN */}
              <Button
                title={"Submit"}
                classNames="mt-5 text-white shadow w-full p-3"
              />
            </div>
          </Form>
          <em className="gray__text-soft text-center text-xs md:text-sm">
            Already a member ? signin{" "}
            <Link to="/auth/signin" className="text-blue-500">
              here
            </Link>
          </em>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;

function CustomCheckBox({
  classNames,
  text,
  htmlFor,
}: {
  classNames?: string;
  text: string;
  htmlFor: string;
}) {
  return (
    <div className={cn(`flex items-center space-x-2 ${classNames}`)}>
      <Checkbox id={htmlFor} className="border-none bg-[#f0f2f5]" />
      <label
        htmlFor={htmlFor}
        className="gray__text-soft text-[13px] font-medium leading-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-xs"
      >
        <em>{text}</em>
      </label>
    </div>
  );
}
