import { Controller } from "react-hook-form";
import { Input } from "./Input";
import { LucideIcon } from "lucide-react";

interface FormFieldProps {
  control: any;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string | undefined;
  icon?: LucideIcon;
  multiline?: boolean;
  value?: string;
  label?: string;
  disabled?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  control,
  name,
  type = "text",
  placeholder,
  className,
  value,
  label,
  disabled = false,
  multiline = false,
  icon: Icon,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="space-y-1">
          {label && (
            <label className="text-sm font-medium text-electricCyan-300">
              {label}
            </label>
          )}
          <div className="relative">
            {Icon && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon size={18} className="text-neonPink-300" />
              </div>
            )}
            {multiline ? (
              <textarea
                disabled={disabled}
                className={`w-full bg-customBlue-900 text-electricCyan-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-electricCyan-500 focus:border-electricCyan-500 disabled:cursor-not-allowed disabled:opacity-50  ${
                  Icon ? "pl-10" : ""
                }`}
                rows={3}
                defaultValue={value}
                {...field}
              />
            ) : (
              <Input
                id={name}
                type={type}
                placeholder={placeholder}
                className={`w-full bg-customBlue-800 border-customBlue-700 text-electricCyan-100 placeholder-customBlue-500 focus:border-electricCyan-500 focus:ring-electricCyan-500 ${Icon && "pl-10"} ${className}`}
                disabled={disabled}
                {...props}
                {...field}
              />
            )}
          </div>
        </div>
      )}
    />
  );
};
