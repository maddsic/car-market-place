import { Form, Link } from "@remix-run/react";
import { FormInput } from "~/components/FormInput/formInput";
import Heading from "~/components/Heading/heading";
import { Card } from "~/components/ui/card";
import Button from "~/components/Button/button";

const SignIn = () => {
  return (
    <div className="input__bg screen__height flex justify-center px-4">
      <div className="relative w-full max-w-3xl pt-10 md:mt-20 md:p-20">
        <Heading title="Sign In" classNames="uppercase lg:text-[28px]" />
        <Card className="relative flex flex-col gap-5 border-t-4 border-t-gray-900 p-7 pt-5 shadow-lg md:p-10">
          <Form className="relative w-full">
            <div className="grid gap-6">
              <FormInput
                label="Username"
                name="username"
                placeholder="Enter your username"
              />
              <FormInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />
              <Button
                title="Sign In"
                type="submit"
                classNames="mt-2 text-white shadow w-full p-3"
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
