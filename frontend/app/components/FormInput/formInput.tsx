import { Input } from "~/components/ui/input";

interface FormInputProps {
  label: string;
  type?: string;
  name: string;
  placeholder: string;
}

export function FormInput({
  label,
  type = "text",
  name,
  placeholder,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>
        {label}
        <span className="text-red-500">*</span>
      </label>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        className="input__bg font-body gray__text-light h-12 w-full rounded-none pl-5 text-xs outline-none"
      />
    </div>
  );
}
