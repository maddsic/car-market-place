import { json } from "@remix-run/react";
import { SignInSchema, SignUpSchema } from "~/schemas/authSchema";
import { LoginUser, RegisterUser } from "./authHelpers";

// HANDLE SIGN UP LOGIC
export const handleSignUp = async (formData: FormData) => {
  const data = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
    password: formData.get("password"),
    phone: formData.get("phone"),
    username: formData.get("username"),
    role: formData.get("role"),
    hasWhatsapp: formData.get("hasWhatsapp") === "on",
  };
  const validateResult = SignUpSchema.safeParse(data);

  if (!validateResult.success) {
    const fieldErrors = validateResult.error.flatten().fieldErrors;

    return json({ errors: fieldErrors, values: data }, { status: 400 });
  }

  // IF VALIDATION SUCCEEDS, CALL THE REGISTER USER FUNCTION
  try {
    const user = await RegisterUser(validateResult.data);
    // Check use role and redirect accordingly
    console.log("Registered User:", user);
    return json({ success: true }, { status: 200 });
  } catch (error) {
    // HANDLE ERROR FROM REGISTER USER FUNCTION
    if (error instanceof Error) {
      return json(
        { errors: { formError: error.message }, values: data },
        { status: 400 },
      );
    }
    return json(
      { errors: { formError: "An unexpected error occurred" }, values: data },
      { status: 500 },
    );
  }
};

// HANDLE SIGN IN LOGIC
export const handleSignIn = async (formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validateResult = SignInSchema.safeParse(data);
  if (!validateResult.success) {
    return json(
      { errors: validateResult.error.flatten().fieldErrors, values: data },
      { status: 400 },
    );
  }

  try {
    const { user, setCookie } = await LoginUser(validateResult.data);

    return json(
      { success: true, data: data },
      { headers: setCookie ? { "Set-Cookie": setCookie } : {} },
    );
  } catch (error) {
    if (error instanceof Error) {
      return json(
        { errors: { formError: error.message }, values: data },
        { status: 400 },
      );
    }
    return json(
      { errors: { formError: "An unexpected error occurred" }, values: data },
      { status: 500 },
    );
  }
};
