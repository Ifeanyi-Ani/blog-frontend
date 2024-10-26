import * as React from 'react';
import { Controller } from 'react-hook-form';
import { LucideIcon } from 'lucide-react';

import { Input } from './Input';

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
  type = 'text',
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
        <div className="space-y-2">
          {label && (
            <label className="block text-sm font-medium text-primary">
              {label}
            </label>
          )}
          <div className="relative">
            {Icon && (
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon size={18} className="text-muted-foreground" />
              </div>
            )}
            {multiline ? (
              <textarea
                disabled={disabled}
                className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground transition-colors duration-200 placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 ${
                  Icon ? 'pl-10' : ''
                } ${className}`}
                rows={3}
                defaultValue={value}
                placeholder={placeholder}
                {...field}
                {...props}
              />
            ) : (
              <Input
                id={name}
                type={type}
                placeholder={placeholder}
                className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground transition-colors duration-200 placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 ${
                  Icon ? 'pl-10' : ''
                } ${className}`}
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
