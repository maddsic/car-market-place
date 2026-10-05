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
    return json(
      {
        success: false,
        message: "Please fix the validation errors in the form.",
        errors: fieldErrors,
        values: data
      },
      { status: 400 }
    );
  }

  try {
    const user = await RegisterUser(validateResult.data);

    // If your backend service returns { status: 409, message: '...' } instead of throwing
    if (user.status && user.status >= 400) {
      return json(
        { success: false, message: user.message },
        { status: user.status }
      );
    }

    return json(
      { success: true, message: user.message },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";

    return json(
      {
        success: false,
        message: errorMessage,
        errors: { formError: errorMessage },
        values: data
      },
      { status: 500 }
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
      { success: true, data: user },
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
