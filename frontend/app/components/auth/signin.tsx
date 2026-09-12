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
    <div className="min-h-screen w-full bg-slate-950 relative overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background Radial Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row w-full max-w-5xl bg-slate-900/90 backdrop-blur-2xl rounded-3xl sm:rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-800 relative z-10 my-auto"
      >
        {/* LEFT SIDE: Brand Banner (Dark Slate with Accent Gradients) */}
        <div className="hidden lg:flex lg:w-1/2 bg-slate-950 p-10 xl:p-12 flex-col justify-between text-white border-r border-slate-800/80 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-amber-500/10 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="bg-slate-800 p-2.5 rounded-xl shadow-lg border border-slate-700">
                <Logo />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                GAMAUTOS
              </span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight text-white">
              Manage Your <br />
              <span className="text-yellow font-black">Dealership.</span>
            </h1>
            <p className="mt-4 text-slate-400 text-sm xl:text-base font-medium max-w-xs leading-relaxed">
              Log in to access inventory control, customer inquiries, and fleet analytics across The Gambia.
            </p>
          </div>

          <div className="relative z-10 p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <p className="text-slate-300 text-xs italic font-medium">
              "Connecting Gambian dealers and buyers with trust and transparency."
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Form Area */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-center bg-slate-900/50">

          {/* Mobile Header Brand */}
          <div className="flex lg:hidden items-center gap-3 mb-6">
            <div className="bg-slate-800 p-2 rounded-lg border border-slate-700">
              <Logo />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">
              GAMAUTOS
            </span>
          </div>

          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Sign In
            </h2>
            <p className="text-slate-400 font-medium text-xs sm:text-sm mt-1">
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
                placeholder="name@example.com"
                className="bg-slate-800/80 border-slate-700 focus:bg-slate-800 text-white [&_input]:text-white font-medium placeholder:text-slate-500 shadow-sm text-sm rounded-xl"
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
                  className="bg-slate-800/80 border-slate-700 focus:bg-slate-800 text-white [&_input]:text-white font-medium shadow-sm text-sm pr-12 rounded-xl"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-[38px] text-slate-400 hover:text-white transition-colors p-1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>

              {actionData?.errors?.password && (
                <DisplayError error={actionData.errors.password} />
              )}

              {/* Forgot Password Link */}
              <div className="flex justify-end pt-1">
                <Link
                  to="/auth/resetPassword"
                  className="text-xs font-semibold text-slate-400 hover:text-yellow hover:underline underline-offset-2 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button
              title="Sign In"
              type="submit"
              className="w-full py-3.5 sm:py-4 bg-yellow hover:bg-amber-500 text-slate-950 font-black rounded-xl transition-all active:scale-95 shadow-xl uppercase tracking-wider text-xs sm:text-sm mt-2"
            />
          </Form>

          {/* Demo User Info Box */}
          <div className="mt-6 sm:mt-8 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[10px] sm:text-xs font-black text-emerald-400 uppercase tracking-widest">
                Demo Credentials
              </span>
            </div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium space-y-1">
              <p className="truncate">
                Email: <span className="font-mono text-emerald-300">sidibehsain1@gmail.com</span>
              </p>
              <p>
                Pass: <span className="font-mono text-emerald-300">Password1234$</span>
              </p>
            </div>
          </div>

          <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-slate-400 font-medium">
            Don’t have an account?{" "}
            <Link
              to="/auth/signup"
              className="text-yellow font-bold hover:underline underline-offset-4"
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
