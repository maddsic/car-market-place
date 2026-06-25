import { Input } from "~/components/ui/input";

interface FormInputProps {
  id?: string | number;
  className?: string;
  error?: string;
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export function FormInput({
  id,
  className,
  error,
  label,
  type = "text",
  name,
  placeholder,
  value,
  defaultValue,
  required,
  disabled,
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
        id={id ? String(id) : undefined}
        className={`border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${className}`}
        onError={error}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}
