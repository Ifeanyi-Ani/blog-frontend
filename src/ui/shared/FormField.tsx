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
        <div className="space-y-1">
          {label && (
            <label className="text-sm font-medium text-electricCyan-300">
              {label}
            </label>
          )}
          <div className="relative">
            {Icon && (
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon size={18} className="text-accent-foreground" />
              </div>
            )}
            {multiline ? (
              <textarea
                disabled={disabled}
                className={`w-full rounded-lg border-input bg-secondary text-secondary-foreground placeholder:text-muted-foreground focus:border-electricCyan-500 focus:outline-none focus:ring-1 focus:ring-electricCyan-500 disabled:cursor-not-allowed disabled:opacity-50 ${
                  Icon ? 'pl-10' : ''
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
                className={`w-full border-input bg-secondary text-secondary-foreground placeholder:text-muted-foreground ${Icon && 'pl-10'} ${className}`}
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
