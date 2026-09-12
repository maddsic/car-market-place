import React, { useState, useEffect } from "react";
import { Form, json, Link, useActionData, useNavigation } from "@remix-run/react";
import { ActionFunctionArgs } from "@remix-run/node";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// Components
import { FormInput } from "~/components/FormInput/formInput";
import Button from "~/components/Button/button";
import LoadingIndicator from "~/components/Loader/loadingIndicator";
import Logo from "~/components/Logo/logo";
import DisplayError from "~/components/DisplayError/displayError";
import { resetPasswordSubmit, sendPasswordResetCode } from "~/service/auth.server";

interface ActionData {
  success: boolean;
  step?: number;
  email?: string;
  message?: string;
  error?: string;
}

export async function action({ request }: ActionFunctionArgs) {
  let formData: FormData | null = null;
  try {
    formData = await request.formData();
    const intent = formData.get("intent");

    // 📩 STEP 1: Request Code
    if (intent === "send-code") {
      const email = formData.get("email") as string;

      const result = await sendPasswordResetCode(email);
      return json({
        success: true,
        step: 2,
        email,
        message: result.message
      });
    }

    // 🔒 STEP 2: Verify and Reset
    if (intent === "reset-password") {
      const email = formData.get("email") as string;
      const code = formData.get("code") as string;
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;

      // Base validations before network traffic
      if (!code || code.length !== 6) {
        return json({ success: false, step: 2, error: "Please enter a valid 6-digit code.", email }, { status: 400 });
      }
      if (password !== confirmPassword) {
        return json({ success: false, step: 2, error: "Passwords do not match.", email }, { status: 400 });
      }

      const result = await resetPasswordSubmit(email, code, password, confirmPassword);
      return json({
        success: true,
        step: 3,
        message: result.message
      });
    }

    return json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    const intent = (formData as FormData | null)?.get("intent") || "send-code";
    return json({
      success: false,
      step: intent === "reset-password" ? 2 : 1,
      error: error.message || "Connection to authentication server failed."
    });
  }
}

// COMPONENT: ResetPassword
export default function ResetPassword() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();

  // Track steps locally, driven by server action progress
  const [step, setStep] = useState(1);
  const [userEmail, setUserEmail] = useState("");

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (!actionData) return;

    if (actionData.success) {
      if (actionData?.message) toast.success(actionData.message);
      if (actionData?.step) setStep(actionData.step);
      if (actionData?.email) setUserEmail(actionData.email as string);
    } else if (actionData.error) {
      toast.error(actionData.error);
    }
  }, [actionData]);

  return (
    <React.Fragment>
      <LoadingIndicator isLoading={isSubmitting} />

      <div className="min-h-screen w-full bg-slate-950 relative overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Background Ambient Radial Glows */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Main Glass/Dark Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row w-full max-w-5xl bg-slate-900/90 backdrop-blur-2xl rounded-3xl sm:rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[600px] border border-slate-800 relative z-10 my-auto"
        >

          {/* LEFT SIDE: Brand Visual Side (Dark Slate Header) */}
          <div className="hidden lg:flex lg:w-1/2 bg-slate-950 p-10 xl:p-12 flex-col justify-between text-white border-r border-slate-800/80 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-amber-500/10 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-10">
                <div className="bg-slate-800 p-2.5 rounded-xl shadow-lg border border-slate-700">
                  <Logo />
                </div>
                <span className="text-2xl font-black tracking-tighter text-white">GAMAUTOS</span>
              </div>
              <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight text-white">
                Reset <br />
                <span className="text-yellow font-black">Password.</span>
              </h1>
              <p className="mt-4 text-slate-400 text-sm xl:text-base font-medium max-w-xs leading-relaxed">
                Recover access to your dealer account and resume connecting with buyers.
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

            {/* Context Header Text */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                {step === 3 ? "Success!" : "Recovery"}
              </h2>
              <p className="text-slate-400 font-medium text-xs sm:text-sm mt-1">
                {step === 1 && "Enter your email address to receive a recovery code."}
                {step === 2 && `We sent a code to ${userEmail}.`}
                {step === 3 && "Your account password has been safely updated."}
              </p>
            </div>

            {/* STEP 1: REQUEST CODE FORM */}
            {step === 1 && (
              <Form method="post" className="space-y-4 sm:space-y-5">
                <input type="hidden" name="intent" value="send-code" />

                {actionData?.error && <DisplayError error={actionData.error} />}

                <div className="space-y-1">
                  <FormInput
                    label="Email Address"
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="bg-slate-800/80 border-slate-700 focus:bg-slate-800 text-white [&_input]:text-white font-medium placeholder:text-slate-500 shadow-sm text-sm rounded-xl"
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  title={isSubmitting ? "Sending Code..." : "Send Reset Code"}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 sm:py-4 bg-yellow hover:bg-amber-500 text-slate-950 font-black rounded-xl transition-all active:scale-95 shadow-xl uppercase tracking-wider text-xs sm:text-sm mt-2"
                />
              </Form>
            )}

            {/* STEP 2: VERIFY CODE & SET NEW PASSWORD */}
            {step === 2 && (
              <Form method="post" className="space-y-4 sm:space-y-5">
                <input type="hidden" name="intent" value="reset-password" />
                <input type="hidden" name="email" value={userEmail} />

                {actionData?.error && <DisplayError error={actionData.error} />}

                {/* Reset Code Input */}
                <div className="space-y-1">
                  <FormInput
                    label="Verification Code"
                    id="code"
                    name="code"
                    type="text"
                    required
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className="w-full bg-slate-800/80 border-slate-700 focus:bg-slate-800 text-white [&_input]:text-white font-mono tracking-widest text-center text-lg shadow-sm rounded-xl"
                    disabled={isSubmitting}
                  />
                </div>

                {/* New Password */}
                <div className="space-y-1">
                  <FormInput
                    label="New Password"
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="bg-slate-800/80 border-slate-700 focus:bg-slate-800 text-white [&_input]:text-white font-medium shadow-sm text-sm rounded-xl"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <FormInput
                    label="Confirm New Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="bg-slate-800/80 border-slate-700 focus:bg-slate-800 text-white [&_input]:text-white font-medium shadow-sm text-sm rounded-xl"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <Button
                    title={isSubmitting ? "Updating..." : "Update Password"}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 sm:py-4 bg-yellow hover:bg-amber-500 text-slate-950 font-black rounded-xl transition-all active:scale-95 shadow-xl uppercase tracking-wider text-xs sm:text-sm"
                  />

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs font-semibold text-slate-400 hover:text-yellow underline underline-offset-2 transition-colors"
                    >
                      Back to change email
                    </button>
                  </div>
                </div>
              </Form>
            )}

            {/* STEP 3: SUCCESS STATE */}
            {step === 3 && (
              <div className="text-center space-y-6 mt-2">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 backdrop-blur-sm shadow-inner">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-sm mx-auto">
                  Your account credentials have been safely updated. You can now access your dashboard again.
                </p>

                <Link
                  to="/auth/login"
                  className="inline-block w-full py-3.5 sm:py-4 bg-yellow hover:bg-amber-500 text-slate-950 font-black rounded-xl text-center shadow-xl uppercase tracking-wider text-xs sm:text-sm transition-all active:scale-95"
                >
                  Go to Sign In
                </Link>
              </div>
            )}

            {/* Back Anchor Footer */}
            {step !== 3 && (
              <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-slate-400 font-medium">
                Remember your password?{" "}
                <Link to="/auth/login" className="text-yellow font-bold hover:underline underline-offset-4">
                  Sign In
                </Link>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </React.Fragment>
  );
}
