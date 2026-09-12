import { useEffect, useState } from "react";
import { Form, Link, useNavigate } from "@remix-run/react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// Components
import { FormInput } from "~/components/FormInput/formInput";
import { Checkbox } from "~/components/ui/checkbox";
import Button from "~/components/Button/button";
import DisplayError from "../DisplayError/displayError";
import PasswordRequirements from "../PasswordRequirement/passwordRequirement";
import Logo from "../Logo/logo";

interface SignUpActionDataProps {
  errors?: {
    formError?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    username?: string;
    password?: string;
    phone?: string;
    role?: boolean;
    hasWhatsapp?: boolean;
  };
  values?: {
    first_name?: string;
    last_name?: string;
    email?: string;
    username?: string;
    phone?: string;
  };
  success?: boolean;
  role?: "admin" | "agent" | "user";
}

const SignUp = ({ actionData }: { actionData?: SignUpActionDataProps }) => {
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData?.success) {
      toast.success("Welcome to Gamautos! Please sign in to continue.");
      setTimeout(() => navigate("/auth/login"), 1000);
    }
  }, [actionData, navigate]);

  return (
    <div className="min-h-screen w-full bg-slate-950 relative overflow-hidden flex items-center justify-center p-4 py-12 lg:p-8">
      {/* Background Ambient Radial Glows */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glass/Dark Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row w-full max-w-6xl bg-slate-900/90 backdrop-blur-2xl rounded-3xl sm:rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-800 relative z-10 my-auto"
      >
        {/* LEFT SIDE: Brand Visual Side */}
        <div className="hidden lg:flex lg:w-1/3 bg-slate-950 p-10 xl:p-12 flex-col justify-between text-white border-r border-slate-800/80 relative">
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

            <h1 className="text-4xl font-extrabold leading-tight text-white">
              Drive Your <br />
              <span className="text-yellow font-black">Ambition.</span>
            </h1>
            <p className="mt-4 text-slate-400 text-sm font-medium leading-relaxed">
              Create an account to join the most trusted automotive network in The Gambia.
            </p>
          </div>

          <div className="relative z-10 p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <p className="text-slate-300 text-xs italic font-medium">
              "Connecting dealers and buyers with transparency and speed."
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: SignUp Form */}
        <div className="w-full lg:w-2/3 p-6 sm:p-10 md:p-12 flex flex-col justify-center bg-slate-900/50">

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
              Sign Up
            </h2>
            <p className="text-slate-400 font-medium text-xs sm:text-sm mt-1">
              Ready to hit the road with Gamautos? Create your account below.
            </p>
          </div>

          <Form method="post" className="space-y-6">
            {actionData?.errors?.formError && (
              <DisplayError error={actionData.errors.formError} />
            )}

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

              <div className="space-y-1">
                <FormInput
                  label="First Name"
                  name="first_name"
                  defaultValue={actionData?.values?.first_name}
                  placeholder="John"
                  className="bg-slate-800/80 border-slate-700 focus:bg-slate-800 text-white [&_input]:text-white font-medium placeholder:text-slate-500 shadow-sm text-sm rounded-xl"
                />
                {actionData?.errors?.first_name && <DisplayError error={actionData.errors.first_name} />}
              </div>

              <div className="space-y-1">
                <FormInput
                  label="Last Name"
                  name="last_name"
                  defaultValue={actionData?.values?.last_name}
                  placeholder="Sanneh"
                  className="bg-slate-800/80 border-slate-700 focus:bg-slate-800 text-white [&_input]:text-white font-medium placeholder:text-slate-500 shadow-sm text-sm rounded-xl"
                />
                {actionData?.errors?.last_name && <DisplayError error={actionData.errors.last_name} />}
              </div>

              <div className="space-y-2">
                <FormInput
                  label="Phone Number"
                  name="phone"
                  defaultValue={actionData?.values?.phone}
                  placeholder="+220 ..."
                  className="bg-slate-800/80 border-slate-700 focus:bg-slate-800 text-white [&_input]:text-white font-medium placeholder:text-slate-500 shadow-sm text-sm rounded-xl"
                />
                <CustomCheckBox text="I have WhatsApp on this number" name="hasWhatsapp" htmlFor="whatsapp" value="on" />
                {actionData?.errors?.phone && <DisplayError error={actionData.errors.phone} />}
              </div>

              <div className="space-y-1">
                <FormInput
                  label="Email Address"
                  name="email"
                  type="email"
                  defaultValue={actionData?.values?.email}
                  placeholder="john@email.com"
                  className="bg-slate-800/80 border-slate-700 focus:bg-slate-800 text-white [&_input]:text-white font-medium placeholder:text-slate-500 shadow-sm text-sm rounded-xl"
                />
                {actionData?.errors?.email && <DisplayError error={actionData.errors.email} />}
              </div>

              <div className="space-y-1">
                <FormInput
                  label="Username"
                  name="username"
                  defaultValue={actionData?.values?.username}
                  placeholder="johnny_auto"
                  className="bg-slate-800/80 border-slate-700 focus:bg-slate-800 text-white [&_input]:text-white font-medium placeholder:text-slate-500 shadow-sm text-sm rounded-xl"
                />
                {actionData?.errors?.username && <DisplayError error={actionData.errors.username} />}
              </div>

              <div className="space-y-2">
                <PasswordRequirements value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="hidden" name="password" value={password} />
                {actionData?.errors?.password && <DisplayError error={actionData.errors.password} />}
              </div>

            </div>

            {/* Bottom Actions Area */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-6 border-t border-slate-800 mt-4">
              <div className="space-y-3">
                <CustomCheckBox text="Register as an Agent / Dealer" name="role" value="agent" htmlFor="as_agent" />
                <CustomCheckBox text="I accept the Terms & Conditions" htmlFor="terms" />
              </div>

              <Button
                type="submit"
                title="Create Account"
                className="w-full md:w-auto px-10 py-3.5 sm:py-4 bg-yellow hover:bg-amber-500 text-slate-950 font-black rounded-xl transition-all shadow-xl active:scale-95 uppercase tracking-wider text-xs sm:text-sm"
              />
            </div>
          </Form>

          <p className="mt-8 text-center text-xs sm:text-sm text-slate-400 font-medium">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-yellow font-bold hover:underline underline-offset-4">
              Sign in here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;

/**
 * Styled Checkbox for the Dark Theme
 */
function CustomCheckBox({ text, htmlFor, name, value }: { text: string; htmlFor: string; name?: string; value?: string }) {
  return (
    <div className="flex items-center space-x-3 group cursor-pointer">
      <Checkbox
        id={htmlFor}
        name={name}
        value={value}
        className="w-4 h-4 rounded border-slate-700 bg-slate-800 data-[state=checked]:bg-yellow data-[state=checked]:text-slate-950 transition-colors"
      />
      <label
        htmlFor={htmlFor}
        className="text-xs font-medium text-slate-300 cursor-pointer group-hover:text-white transition-colors"
      >
        {text}
      </label>
    </div>
  );
}
