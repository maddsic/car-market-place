import { Form, Link } from "@remix-run/react";
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
  values?: {
    email?: string;
    password?: string;
  };
  success?: boolean;
  role?: "admin" | "dealer" | "user";
}

const SignIn = ({ actionData }: { actionData: SignInActionDataProps }) => {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (actionData?.success) {
      toast.success("Welcome back to Gamautos!");
    }
  }, [actionData]);

  return (
    <div className="min-h-screen w-full bg-[url('/auth_bg.png')] bg-cover bg-center flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* 🪟 Glassmorphism Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row w-full max-w-5xl bg-white/20 backdrop-blur-xl rounded-3xl sm:rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/30 my-auto"
      >
        {/* LEFT SIDE: Brand/Visual Side (Visible on LG screens+) */}
        <div className="hidden lg:flex lg:w-1/2 bg-slate-950/40 relative p-10 xl:p-12 flex-col justify-between text-white border-r border-white/10">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="bg-primary p-2.5 rounded-xl shadow-lg">
                <Logo />
              </div>
              <span className="text-2xl font-black tracking-tighter">GAMAUTOS</span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight">
              Welcome <br />
              <span className="text-yellow font-black">Back.</span>
            </h1>
            <p className="mt-4 text-slate-200 text-sm xl:text-base font-medium max-w-xs">
              Log in to manage your listings and connect with buyers across The Gambia.
            </p>
          </div>

          <div className="relative z-10 p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md">
            <p className="text-white text-xs italic font-medium">
              "Connecting Gambian dealers and buyers with trust and transparency."
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: The Form Container */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-center bg-white/40">

          {/* Mobile/Tablet Header Brand (Hidden on LG) */}
          <div className="flex lg:hidden items-center gap-3 mb-6">
            <div className="bg-primary p-2 rounded-lg shadow-md">
              <Logo />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-950">
              GAMAUTOS
            </span>
          </div>

          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
              Sign In
            </h2>
            <p className="text-slate-800 font-bold text-xs sm:text-sm mt-1">
              Access your dealer dashboard.
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
                placeholder="name@example.com"
                className="bg-white/60 border-white/50 focus:bg-white/80 text-slate-950 font-semibold placeholder:text-slate-500 shadow-sm text-sm"
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
                  className="bg-white/60 border-white/50 focus:bg-white/80 text-slate-950 font-semibold shadow-sm text-sm pr-12"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-[38px] text-slate-600 hover:text-blue-700 transition-colors p-1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>

              {actionData?.errors?.password && (
                <DisplayError error={actionData.errors.password} />
              )}

              {/* 🔑 Forgot Password Link */}
              <div className="flex justify-end pt-1">
                <Link
                  to="/auth/resetPassword"
                  className="text-xs font-bold text-slate-800 hover:text-blue-700 hover:underline underline-offset-2 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button
              title="Sign In"
              type="submit"
              className="w-full py-3.5 sm:py-4 bg-yellow hover:bg-primary text-white font-black rounded-xl sm:rounded-2xl transition-all active:scale-95 shadow-xl uppercase tracking-wider text-xs sm:text-sm mt-2"
            />
          </Form>

          {/* Demo User Info Card */}
          <div className="mt-6 sm:mt-8 p-4 sm:p-5 rounded-2xl bg-blue-50/50 border border-blue-200/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-black text-primary uppercase tracking-widest">
                Demo Account
              </span>
            </div>
            <div className="text-xs sm:text-sm text-slate-900 font-bold space-y-1">
              <p className="truncate">
                Email: <span className="font-mono text-blue-900">sidibehsain1@gmail.com</span>
              </p>
              <p>
                Pass: <span className="font-mono text-blue-900">Password1234$</span>
              </p>
            </div>
          </div>

          <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-slate-950 font-bold">
            Don’t have an account?{" "}
            <Link
              to="/auth/signup"
              className="text-blue-700 font-black hover:underline underline-offset-4"
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
