import { Form, Link, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// Components
import { FormInput } from "~/components/FormInput/formInput";
import Button from "~/components/Button/button";
import DisplayError from "../DisplayError/displayError";
import Logo from "../Logo/logo";

interface SignInActionDataProps {
  errors?: {
    formError?: string;
    email?: string;
    password?: string;
  };
  success?: boolean;
  role?: "admin" | "dealer" | "user";
}

const SignIn = ({ actionData }: { actionData?: SignInActionDataProps }) => {
  const [showPassword, setShowPassword] = useState(false);

  // True while the form is being sent, so we can stop double clicks
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.success) {
      toast.success("Welcome back to Gamautos!");
    }
  }, [actionData]);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-950 p-4 sm:p-6 lg:p-8">
      {/* Background glows (yellow, to match the rest of the site) */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-yellow/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-yellow/10 blur-3xl" />

      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 my-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-2xl lg:flex-row"
      >
        {/* LEFT SIDE: brand banner (desktop only) */}
        <div className="relative hidden flex-col justify-between border-r border-slate-800/80 bg-slate-950 p-10 text-white lg:flex lg:w-1/2 xl:p-12">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-yellow/10 via-transparent to-transparent" />

          <div className="relative z-10">
            <div className="mb-10 flex items-center gap-3">
              <div className="rounded-xl border border-slate-700 bg-slate-800 p-2.5 shadow-lg">
                <Logo />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                GAMAUTOS
              </span>
            </div>

            <p className="text-4xl font-extrabold leading-tight tracking-tight text-white xl:text-5xl">
              Welcome <br />
              <span className="font-black text-yellow">back.</span>
            </p>
            <p className="mt-4 max-w-xs text-sm font-medium leading-relaxed text-slate-400 xl:text-base">
              Sign in to manage your listings and reach buyers across The
              Gambia.
            </p>
          </div>

          <div className="relative z-10 rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
            <p className="text-xs font-medium italic text-slate-300">
              &quot;Connecting Gambian dealers and buyers with trust and
              transparency.&quot;
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: form */}
        <div className="flex w-full flex-col justify-center bg-slate-900/50 p-6 sm:p-10 md:p-12 lg:w-1/2 lg:p-14">
          {/* Mobile brand */}
          <div className="mb-6 flex items-center gap-3 lg:hidden">
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-2">
              <Logo />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">
              GAMAUTOS
            </span>
          </div>

          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl">
              Sign In
            </h1>
            <p className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
              Welcome back! Please enter your details.
            </p>
          </div>

          <Form method="post" className="space-y-4 sm:space-y-5">
            {actionData?.errors?.formError && (
              <DisplayError error={actionData.errors.formError} />
            )}

            <div className="space-y-1">
              <FormInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="name@example.com"
                className="rounded-xl border-slate-700 bg-slate-800/80 text-sm font-medium text-white shadow-sm placeholder:text-slate-500 focus:bg-slate-800 [&_input]:text-white"
              />
              {actionData?.errors?.email && (
                <DisplayError error={actionData.errors.email} />
              )}
            </div>

            <div className="space-y-1">
              <div className="relative">
                <FormInput
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="rounded-xl border-slate-700 bg-slate-800/80 pr-12 text-sm font-medium text-white shadow-sm focus:bg-slate-800 [&_input]:text-white"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-[38px] p-1 text-slate-400 transition-colors hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>

              {actionData?.errors?.password && (
                <DisplayError error={actionData.errors.password} />
              )}

              <div className="flex justify-end pt-1">
                <Link
                  to="/auth/resetPassword"
                  className="text-xs font-semibold text-slate-400 underline-offset-2 transition-colors hover:text-yellow hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button
              title={isSubmitting ? "Signing in..." : "Sign In"}
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-xl bg-yellow py-3.5 text-xs font-black uppercase tracking-wider text-slate-950 shadow-xl transition-all hover:bg-amber-500 active:scale-95 sm:py-4 sm:text-sm"
            />
          </Form>

          <p className="mt-6 text-center text-xs font-medium text-slate-400 sm:mt-8 sm:text-sm">
            Don&rsquo;t have an account?{" "}
            <Link
              to="/auth/signup"
              className="font-bold text-yellow underline-offset-4 hover:underline"
            >
              Join Gamautos
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
