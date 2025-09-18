import { useState } from "react";
import { FormInput } from "../FormInput/formInput";

const PasswordRequirements = ({
  value,
  onChange,
  name = "password",
  placeholder = "Enter your password",
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
}) => {
  const [isInputFocused, setIsInputFocused] = useState<Boolean>(false);

  const validationRulesChecks = [
    {
      label: "At least 10 characters",
      isValid: value?.length >= 10,
    },
    {
      label: "At least one uppercase letter",
      isValid: /[A-Z]/.test(value || ""),
    },
    {
      label: "At least one lowercase letter",
      isValid: /[a-z]/.test(value || ""),
    },
    {
      label: "At least one number",
      isValid: /\d/.test(value || ""),
    },
    {
      label: "At least one special character",
      isValid: /[^A-Za-z0-9]/.test(value || ""),
    },
  ];

  return (
    <div className="space-y-2">
      <FormInput
        label="Password"
        type="password"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
      />
      {isInputFocused && (
        <div className="rounded bg-gray-100 p-3 shadow-inner">
          <p className="mb-2 text-sm font-medium text-gray-700">
            Password must contain:
          </p>
          <ul className="space-y-1 text-sm">
            {validationRulesChecks.map((check, index) => (
              <li key={index} className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    check.isValid ? "bg-green-500" : "bg-red-400"
                  }`}
                />
                <span
                  className={check.isValid ? "text-green-700" : "text-gray-700"}
                >
                  {check.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordRequirements;
