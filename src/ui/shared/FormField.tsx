import { Controller } from "react-hook-form";
import { Input } from "./Input";

interface FormFieldProps {
  control: any;
  name: string;
  type: string;
  placeholder?: string;
  className?: string | undefined;
}

export const FormField: React.FC<FormFieldProps> = ({
  control,
  name,
  type,
  placeholder,
  className,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          className={`w-full bg-customBlue-800 border-customBlue-700 text-electricCyan-100 placeholder-customBlue-500 focus:border-electricCyan-500 focus:ring-electricCyan-500 ${className}`}
          {...field}
        />
      )}
    />
  );
};
