import { cn } from "~/lib/utils";

interface SelectProps {
  name: string;
  value?: string | undefined;
  key?: string | undefined;
  options: { label: string; value: string }[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void | undefined;
  placeholder?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  name,
  value,
  key,
  options,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={cn(`font-body h-12 border bg-inherit pl-3 ${className}`)}
    >
      {placeholder && (
        <option value="" className="capitalize">
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="gray__text-light capitalize"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
