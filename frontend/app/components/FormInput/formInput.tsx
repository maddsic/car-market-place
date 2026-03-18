import { Input } from "~/components/ui/input";

interface FormInputProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export function FormInput({
  label,
  type = "text",
  name,
  placeholder,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
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
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className="input__bg font-body gray__text-light h-12 w-full rounded-none pl-5 text-xs outline-none"
      />
    </div>
  );
}
