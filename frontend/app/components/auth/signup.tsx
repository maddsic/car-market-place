import { useEffect, useState } from "react";
import { Form, Link, useNavigate, useNavigation } from "@remix-run/react";
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
  };
  values?: {
    first_name?: string;
    last_name?: string;
    email?: string;
    username?: string;
    phone?: string;
  };
  success?: boolean;
  message?: string;
}

// Same style for every input
const inputStyle =
  "rounded-xl border-slate-700 bg-slate-800/80 text-sm font-medium text-white shadow-sm placeholder:text-slate-500 focus:bg-slate-800 [&_input]:text-white";

const SignUp = ({ actionData }: { actionData?: SignUpActionDataProps }) => {
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  // True while the form is being sent, so we can stop double clicks
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (!actionData) return;

    if (actionData.success) {
      toast.success(
        actionData.message ||
        "Account created successfully! Redirecting to login..."
      );

      const timer = setTimeout(() => navigate("/auth/login"), 2000);
      return () => clearTimeout(timer);
    }

    // Only show an error toast when the server sent a message
    if (actionData.message) {
      toast.error(actionData.message);
    }
  }, [actionData, navigate]);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-950 p-4 py-12 lg:p-8">
      {/* Background glows (yellow, to match the rest of the site) */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-yellow/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-yellow/10 blur-3xl" />

      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 my-auto flex w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-2xl lg:flex-row"
      >
        {/* LEFT SIDE: brand banner (desktop only) */}
        <div className="relative hidden flex-col justify-between border-r border-slate-800/80 bg-slate-950 p-10 text-white lg:flex lg:w-1/3 xl:p-12">
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

            <p className="text-4xl font-extrabold leading-tight text-white">
              Join <br />
              <span className="font-black text-yellow">GamAutos.</span>
            </p>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-400">
              Create an account to list your cars and reach buyers across The
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
        <div className="flex w-full flex-col justify-center bg-slate-900/50 p-6 sm:p-10 md:p-12 lg:w-2/3">
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
              Sign Up
            </h1>
            <p className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
              Ready to hit the road with Gamautos? Create your account below.
            </p>
          </div>

          <Form method="post" className="space-y-6">
            {actionData?.errors?.formError && (
              <DisplayError error={actionData.errors.formError} />
            )}

            {/* Form fields */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
              <div className="space-y-1">
                <FormInput
                  label="First Name"
                  name="first_name"
                  defaultValue={actionData?.values?.first_name}
                  placeholder="John"
                  className={inputStyle}
                />
                {actionData?.errors?.first_name && (
                  <DisplayError error={actionData.errors.first_name} />
                )}
              </div>

              <div className="space-y-1">
                <FormInput
                  label="Last Name"
                  name="last_name"
                  defaultValue={actionData?.values?.last_name}
                  placeholder="Sanneh"
                  className={inputStyle}
                />
                {actionData?.errors?.last_name && (
                  <DisplayError error={actionData.errors.last_name} />
                )}
              </div>

              <div className="space-y-2">
                <FormInput
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  defaultValue={actionData?.values?.phone}
                  placeholder="+220 ..."
                  className={inputStyle}
                />
                <CustomCheckBox
                  id="whatsapp"
                  name="hasWhatsapp"
                  value="on"
                  text="I have WhatsApp on this number"
                />
                {actionData?.errors?.phone && (
                  <DisplayError error={actionData.errors.phone} />
                )}
              </div>

              <div className="space-y-1">
                <FormInput
                  label="Email Address"
                  name="email"
                  type="email"
                  defaultValue={actionData?.values?.email}
                  placeholder="john@email.com"
                  className={inputStyle}
                />
                {actionData?.errors?.email && (
                  <DisplayError error={actionData.errors.email} />
                )}
              </div>

              <div className="space-y-1">
                <FormInput
                  label="Username"
                  name="username"
                  defaultValue={actionData?.values?.username}
                  placeholder="johnny_auto"
                  className={inputStyle}
                />
                {actionData?.errors?.username && (
                  <DisplayError error={actionData.errors.username} />
                )}
              </div>

              <div className="space-y-2">
                <PasswordRequirements
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input type="hidden" name="password" value={password} />
                {actionData?.errors?.password && (
                  <DisplayError error={actionData.errors.password} />
                )}
              </div>
            </div>

            {/* Bottom actions */}
            <div className="mt-4 flex flex-col items-start justify-between gap-6 border-t border-slate-800 pt-6 md:flex-row md:items-center">
              <div className="space-y-3">
                <CustomCheckBox
                  id="as_agent"
                  name="role"
                  value="agent"
                  text="Register as an Agent / Dealer"
                />

                {/* Terms: the link opens in a new tab so the form is not lost */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="accept_terms"
                    name="acceptTerms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) =>
                      setAcceptedTerms(checked === true)
                    }
                    className="h-4 w-4 rounded border-slate-700 bg-slate-800 transition-colors data-[state=checked]:bg-yellow data-[state=checked]:text-slate-950"
                  />
                  <label
                    htmlFor="accept_terms"
                    className="cursor-pointer text-xs font-medium text-slate-300"
                  >
                    I accept the{" "}
                    <Link
                      to="/terms"
                      target="_blank"
                      className="font-bold text-yellow underline-offset-2 hover:underline"
                    >
                      Terms &amp; Conditions
                    </Link>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                title={isSubmitting ? "Creating account..." : "Create Account"}
                disabled={!acceptedTerms || isSubmitting}
                className="w-full rounded-xl bg-yellow px-10 py-3.5 text-xs font-black uppercase tracking-wider text-slate-950 shadow-xl transition-all hover:bg-amber-500 active:scale-95 sm:py-4 sm:text-sm md:w-auto"
              />
            </div>
          </Form>

          <p className="mt-8 text-center text-xs font-medium text-slate-400 sm:text-sm">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-bold text-yellow underline-offset-4 hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;

// Styled checkbox for the dark theme
function CustomCheckBox({
  id,
  text,
  name,
  value,
}: {
  id: string;
  text: string;
  name: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Checkbox
        id={id}
        name={name}
        value={value}
        className="h-4 w-4 rounded border-slate-700 bg-slate-800 transition-colors data-[state=checked]:bg-yellow data-[state=checked]:text-slate-950"
      />
      <label
        htmlFor={id}
        className="cursor-pointer text-xs font-medium text-slate-300 transition-colors hover:text-white"
      >
        {text}
      </label>
    </div>
  );
}
