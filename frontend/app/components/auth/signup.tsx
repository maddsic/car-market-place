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

const SignUp = ({ actionData }: { actionData?: SignUpActionDataProps }) => {
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData?.success) {
      toast.success("Welcome to Gamautos! Please sign in to continue.");
      setTimeout(() => navigate("/auth/login"), 2000);
    }
  }, [actionData, navigate]);

  return (
    <div className="min-h-screen bg-[url('/auth_bg.png')] bg-cover bg-center flex items-center justify-center p-4 py-12 lg:p-0">

      {/* 🪟 Main Glassmorphism Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row w-full max-w-6xl bg-white/20 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[750px] border border-white/30"
      >

        {/* LEFT SIDE: Brand Visuals (Dark Glass) */}
        <div className="hidden lg:flex lg:w-1/3 bg-slate-950/40 relative p-12 flex-col justify-between text-white border-r border-white/10">
          {/* Subtle Carbon Fiber Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="bg-primary p-2.5 rounded-xl shadow-lg">
                <Logo />
              </div>
              <span className="text-2xl font-black tracking-tighter">GAMAUTOS</span>
            </div>

            <h1 className="text-4xl font-extrabold leading-tight">
              Drive Your <br />
              <span className="text-yellow">Ambition.</span>
            </h1>
            <p className="mt-6 text-slate-200 text-sm font-medium leading-relaxed">
              Create an account to join the most trusted automotive network in The Gambia.
            </p>
          </div>

          <div className="relative z-10 p-6 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md">
            <p className="text-white text-xs italic font-medium">
              "Connecting dealers and buyers with transparency and speed."
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: The Form (Clear Glass) */}
        <div className="w-full lg:w-2/3 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white/40">
          <div className="mb-8">
            <h2 className="text-4xl font-black text-slate-950 tracking-tight">Sign Up</h2>
            <p className="text-slate-900 font-bold mt-2">Ready to hit the road with Gamautos?</p>
          </div>

          <Form method="post" className="space-y-6">
            {actionData?.errors?.formError && (
              <DisplayError error={actionData.errors.formError} />
            )}

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

              <div className="space-y-1">
                <FormInput
                  label="First Name"
                  name="first_name"
                  defaultValue={actionData?.values?.first_name}
                  placeholder="John"
                  className="bg-white/60 border-white/50 focus:bg-white/80 text-slate-950 font-semibold placeholder:text-slate-500 shadow-sm"
                />
                {actionData?.errors?.first_name && <DisplayError error={actionData.errors.first_name} />}
              </div>

              <div className="space-y-1">
                <FormInput
                  label="Last Name"
                  name="last_name"
                  defaultValue={actionData?.values?.last_name}
                  placeholder="Sanneh"
                  className="bg-white/60 border-white/50 focus:bg-white/80 text-slate-950 font-semibold placeholder:text-slate-500 shadow-sm"
                />
                {actionData?.errors?.last_name && <DisplayError error={actionData.errors.last_name} />}
              </div>

              <div className="space-y-4">
                <FormInput
                  label="Phone Number"
                  name="phone"
                  defaultValue={actionData?.values?.phone}
                  placeholder="+220 ..."
                  className="bg-white/60 border-white/50 focus:bg-white/80 text-slate-950 font-semibold shadow-sm"
                />
                <CustomCheckBox text="I have WhatsApp" name="hasWhatsapp" htmlFor="whatsapp" />
              </div>

              <div className="space-y-1">
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="john@email.com"
                  className="bg-white/60 border-white/50 focus:bg-white/80 text-slate-950 font-semibold shadow-sm"
                />
                {actionData?.errors?.email && <DisplayError error={actionData.errors.email} />}
              </div>

              <div className="space-y-1">
                <FormInput
                  label="Username"
                  name="username"
                  placeholder="johnny_auto"
                  className="bg-white/60 border-white/50 focus:bg-white/80 text-slate-950 font-semibold shadow-sm"
                />
                {actionData?.errors?.username && <DisplayError error={actionData.errors.username} />}
              </div>

              <div className="space-y-2">
                <PasswordRequirements value={password} onChange={(e) => setPassword(e.target.value)} />
                {/* <input type="hidden" name="password" value={password} /> */}
              </div>
            </div>

            {/* Bottom Actions Area */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-6 border-t border-white/30 mt-4">
              <div className="space-y-3">
                <CustomCheckBox text="Register as an Agent/Dealer" name="role" value="agent" htmlFor="as_agent" />
                <CustomCheckBox text="I accept the Terms & Conditions" htmlFor="terms" />
              </div>

              <Button
                type="submit"
                title="Create Account"
                className="w-full md:w-auto px-14 py-4 bg-yellow hover:bg-primary text-white font-black rounded-2xl transition-all shadow-xl active:scale-95 uppercase tracking-wider"
              />
            </div>
          </Form>

          <p className="mt-10 text-center text-sm text-slate-900 font-bold">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-700 hover:underline underline-offset-4">
              Sign in here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;

/** * Styled Checkbox for the Glass Theme
 */
function CustomCheckBox({ text, htmlFor, name, value }: any) {
  return (
    <div className="flex items-center space-x-3 group cursor-pointer">
      <Checkbox
        id={htmlFor}
        name={name}
        value={value}
        className="w-5 h-5 bg-white/40 border-white/50 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white transition-colors"
      />
      <label
        htmlFor={htmlFor}
        className="text-xs font-bold text-slate-900 cursor-pointer group-hover:text-blue-800 transition-colors"
      >
        {text}
      </label>
    </div>
  );
}

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
  values?: any;
  success?: boolean;
}






































// import { useEffect, useState } from "react";
// import { Form, Link, useNavigate } from "@remix-run/react";
// import { cn } from "~/lib/utils";

// // components
// import Heading from "~/components/Heading/heading";
// import { Checkbox } from "~/components/ui/checkbox";
// import { FormInput } from "~/components/FormInput/formInput";
// import { Card } from "~/components/ui/card";
// import Button from "~/components/Button/button";
// import DisplayError from "../DisplayError/displayError";
// import PasswordRequirements from "../PasswordRequirement/passwordRequirement";

// // Third party libraries
// import { toast } from "react-toastify";

// const SignUp = ({ actionData }: { actionData?: SignUpActionDataProps }) => {
//   const [password, setPassword] = useState<string>("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (actionData?.success) {
//       toast.success(
//         "User registered successfully! Please sign in to continue.",
//       );

//       setTimeout(() => {
//         navigate("/auth/login");
//       }, 2000);
//     }
//   }, [actionData, navigate]);

//   return (
//     <div className="input__bg flex min-h-screen justify-center px-4">
//       <div className="relative w-full max-w-4xl py-20 pt-10 md:pt-20">
//         <Heading title="Sign Up" classNames="uppercase lg:text-[28px]" />
//         <Card className="space-y-6 rounded-2xl border-t-4 border-gray-900 p-7 shadow-xl md:p-10">
//           <Form className="relative w-full" method="post">
//             {/* Display errors if any */}
//             {actionData?.errors?.formError && (
//               <DisplayError error={actionData.errors.formError} />
//             )}
//             <h2 className="mb-2 text-lg font-semibold">Personal Information</h2>
//             <div className="relative grid gap-5 gap-y-7 py-5 md:grid-cols-2">
//               <div>
//                 <FormInput
//                   label="First Name"
//                   name="first_name"
//                   defaultValue={actionData?.values?.first_name}
//                   placeholder="Enter your first name"
//                 />
//                 {actionData?.errors?.first_name && (
//                   <DisplayError error={actionData.errors.first_name} />
//                 )}
//               </div>
//               <div>
//                 <FormInput
//                   label="Last Name"
//                   name="last_name"
//                   defaultValue={actionData?.values?.last_name}
//                   placeholder="Enter your last name"
//                 />
//                 {actionData?.errors?.last_name && (
//                   <DisplayError error={actionData.errors.last_name} />
//                 )}
//               </div>
//               <span className="space-y-2">
//                 <div>
//                   {" "}
//                   <FormInput
//                     label="Phone Number"
//                     name="phone"
//                     defaultValue={actionData?.values?.phone}
//                     placeholder="Enter your phone number"
//                   />
//                   {actionData?.errors?.phone && (
//                     <DisplayError error={actionData.errors.phone} />
//                   )}
//                 </div>
//                 <div>
//                   <CustomCheckBox
//                     text="I have a whatsapp account with this number"
//                     htmlFor=""
//                     classNames="text-[10px]"
//                     name="hasWhatsapp"
//                     value="on"
//                   />
//                 </div>
//               </span>
//               <div>
//                 <FormInput
//                   type="email"
//                   label="Email"
//                   name="email"
//                   placeholder="Enter your Email"
//                 />
//                 {actionData?.errors?.email && (
//                   <DisplayError error={actionData.errors.email} />
//                 )}
//               </div>
//               <div>
//                 <FormInput
//                   label="Username"
//                   name="username"
//                   placeholder="Enter your username to login"
//                 />
//                 {actionData?.errors?.username && (
//                   <DisplayError error={actionData.errors.username} />
//                 )}
//               </div>
//               <div>
//                 <PasswordRequirements
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 {/* Hidden input to include password in form submission */}
//                 <input type="hidden" name="password" value={password} />
//               </div>
//               {/* TERMS AND SERVICE */}
//               <div className="space-y-5">
//                 <div>
//                   <CustomCheckBox
//                     text="I accept the terms of service"
//                     htmlFor="terms"
//                   />
//                   {actionData?.errors?.password && (
//                     <DisplayError error={actionData.errors.password} />
//                   )}
//                 </div>
//                 <div>
//                   <CustomCheckBox
//                     name="role"
//                     text="As Agent"
//                     htmlFor="as_agent"
//                     value="agent"
//                   />
//                 </div>
//               </div>
//               {/* SUBMIT BTN */}
//               <Button
//                 type="submit"
//                 title={"Submit"}
//                 className="sticky bottom-0 mt-5 w-full border-t p-3 text-white shadow"
//               />
//             </div>
//           </Form>
//           <em className="gray__text-soft text-center text-xs md:text-sm">
//             Already a member ? signin{" "}
//             <Link to="/auth/login" className="text-blue-500">
//               here
//             </Link>
//           </em>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

interface SignUpActionDataProps {
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
    hasWhatsapp?: boolean;
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
  role?: "admin" | "agent" | "user";
}

// function CustomCheckBox({
//   classNames,
//   text,
//   htmlFor,
//   name,
//   value,
// }: {
//   classNames?: string;
//   text: string;
//   htmlFor: string;
//   name?: string;
//   value?: string;
// }) {
//   return (
//     <div className={cn(`flex items-center space-x-2 ${classNames}`)}>
//       <Checkbox
//         id={htmlFor}
//         className="border-none bg-[#f0f2f5]"
//         name={name}
//         value={value}
//       />
//       <label
//         htmlFor={htmlFor}
//         className="gray__text-soft text-[13px] font-medium leading-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-xs"
//       >
//         <em>{text}</em>
//       </label>
//     </div>
//   );
// }
