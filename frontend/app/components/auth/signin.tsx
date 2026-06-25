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

const SignIn = ({ actionData }: { actionData: SignInActionDataProps }) => {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (actionData?.success) {
      toast.success(`Welcome back to Gamautos!`);
    }
  }, [actionData]);

  return (
    <div className="min-h-screen bg-[url('/auth_bg.png')] bg-cover bg-center flex items-center justify-center p-4 lg:p-0">

      {/* 🪟 Glassmorphism Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row w-full max-w-5xl bg-white/20 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[600px] border border-white/30"
      >

        {/* LEFT SIDE: Brand/Visual Side (Dark Glass) */}
        <div className="hidden lg:flex lg:w-1/2 bg-slate-950/40 relative p-12 flex-col justify-between text-white border-r border-white/10">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="bg-primary p-2.5 rounded-xl shadow-lg">
                <Logo />
              </div>
              <span className="text-2xl font-black tracking-tighter">GAMAUTOS</span>
            </div>
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
              Welcome <br />
              <span className="text-yellow font-black">Back.</span>
            </h1>
            <p className="mt-4 text-slate-200 font-medium max-w-xs">
              Log in to manage your listings and connect with buyers across The Gambia.
            </p>
          </div>

          <div className="relative z-10 p-6 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md">
            <p className="text-white text-xs italic font-medium">
              "Connecting Gambian dealers and buyers with trust and transparency."
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: The Form (Clear Glass) */}
        <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white/40">
          <div className="mb-10">
            <h2 className="text-4xl font-black text-slate-950 tracking-tight">Sign In</h2>
            <p className="text-slate-900 font-bold mt-2">Access your dealer dashboard.</p>
          </div>

          <Form method="post" className="space-y-6">
            {actionData?.errors?.formError && (
              <DisplayError error={actionData.errors.formError} />
            )}

            <div className="space-y-1">
              <FormInput
                label="Email Address"
                name="email"
                placeholder="name@example.com"
                className="bg-white/60 border-white/50 focus:bg-white/80 text-slate-950 font-semibold placeholder:text-slate-500 shadow-sm"
              />
              {actionData?.errors?.email && <DisplayError error={actionData.errors.email} />}
            </div>

            <div className="relative space-y-1">
              <FormInput
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-white/60 border-white/50 focus:bg-white/80 text-slate-950 font-semibold shadow-sm"
              />
              <button
                type="button"
                className="absolute right-4 top-[42px] text-slate-600 hover:text-blue-700 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
              {actionData?.errors?.password && <DisplayError error={actionData.errors.password} />}
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
              className="w-full py-4 bg-yellow hover:bg-primary text-white font-black rounded-2xl transition-all active:scale-95 shadow-xl uppercase tracking-wider mt-2"
            />
          </Form>

          {/* Demo User Info (Translucent Design) */}
          <div className="mt-8 p-5 rounded-2xl bg-blue-50/50 border border-blue-200/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-black text-primary uppercase tracking-widest">Demo Account</span>
            </div>
            <div className="text-sm text-slate-900 font-bold space-y-1">
              <p>Email: <span className="font-mono text-blue-900">alpha@email.com</span></p>
              <p>Pass: <span className="font-mono text-blue-900">Password1234$</span></p>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-slate-950 font-bold">
            Don’t have an account?{" "}
            <Link to="/auth/signup" className="text-blue-700 font-black hover:underline underline-offset-4">
              Join Gamautos
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;

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















// import { Form, Link } from "@remix-run/react";
// import { useEffect, useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { FormInput } from "~/components/FormInput/formInput";
// import Heading from "~/components/Heading/heading";
// import { Card } from "~/components/ui/card";
// import Button from "~/components/Button/button";
// import DisplayError from "../DisplayError/displayError";

// const SignIn = ({ actionData }: { actionData: SignInActionDataProps }) => {
//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     if (actionData?.success) {
//       toast.success(`Welcome back! You are now signed in...`);
//     }
//   }, [actionData]);

//   return (
//     <div className="input__bg screen__height flex items-center justify-center px-4">
//       <div className="relative w-full max-w-4xl md:mt-20 md:p-20">
//         <Heading title="Sign In" classNames="uppercase lg:text-[28px]" />

//         <Card className="relative flex flex-col gap-8 border-t-4 border-t-gray-900 p-7 pt-5 shadow-lg md:flex-row md:p-10">
//           {/* ==== Sign In Form ==== */}
//           <Form className="relative w-full md:w-2/3" method="post">
//             {actionData?.errors?.formError && (
//               <DisplayError error={actionData.errors.formError} />
//             )}

//             <div className="grid gap-6">
//               {/* Email Input */}
//               <FormInput
//                 label="Email"
//                 name="email"
//                 placeholder="Enter your email"
//               />
//               {actionData?.errors?.email && (
//                 <DisplayError error={actionData.errors.email} />
//               )}

//               {/* Password Input with Eye Toggle */}
//               <div className="relative">
//                 <FormInput
//                   label="Password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                 />
//                 <div
//                   className="absolute right-3 top-[38px] cursor-pointer text-gray-500 hover:text-gray-800"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <FaEyeSlash size={20} />
//                   ) : (
//                     <FaEye size={20} />
//                   )}
//                 </div>
//               </div>
//               {actionData?.errors?.password && (
//                 <DisplayError error={actionData.errors.password} />
//               )}

//               <Button
//                 title="Sign In"
//                 type="submit"
//                 className="mt-2 w-full p-3 text-white shadow"
//               />
//             </div>
//           </Form>

//           {/* ==== Demo User Info ==== */}
//           <div className="rounded-lg bg-gray-50 p-5 text-sm text-gray-700 shadow-inner md:w-1/3">
//             <h3 className="mb-3 text-base font-semibold text-gray-800">
//               Demo Account Info
//             </h3>
//             <ul className="space-y-2">
//               <li>
//                 <span className="font-semibold">Email:</span> alpha@email.com
//               </li>
//               <li>
//                 <span className="font-semibold">Password:</span> Password1234$
//               </li>
//             </ul>
//             <p className="mt-4 text-xs text-gray-500">
//               Use these demo credentials to explore the dashboard.
//             </p>
//           </div>
//         </Card>

//         {/* Sign Up link */}
//         <em className="gray__text-soft mt-3 block text-center text-xs md:text-sm">
//           Don’t have an account?{" "}
//           <Link to="/auth/signup" className="text-blue-500 hover:underline">
//             Sign up here
//           </Link>
//         </em>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

// interface SignInActionDataProps {
//   errors?: {
//     formError?: string;
//     email?: string;
//     password?: string;
//   };
//   values?: {
//     email?: string;
//     password?: string;
//   };
//   success?: boolean;
//   role?: "admin" | "dealer" | "user";
// }
