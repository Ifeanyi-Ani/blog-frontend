import * as React from 'react';
import { Controller } from 'react-hook-form';
import { LucideIcon } from 'lucide-react';
import { Description, Field, Input, Label, Textarea } from '@headlessui/react';

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
  description?: string;
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
  description,
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
        <Field className="space-y-2">
          <div>
            {label && (
              <Label className="block text-sm font-medium text-primary">
                {label}
              </Label>
            )}
            {description && (
              <Description className="text-muted-foreground">
                {description}
              </Description>
            )}
          </div>
          <div className="relative focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary disabled:cursor-not-allowed disabled:opacity-50">
            {Icon && (
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon size={18} className="text-muted-foreground" />
              </div>
            )}
            {multiline ? (
              <Textarea
                disabled={disabled}
                className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ${
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
                className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ${
                  Icon ? 'pl-10' : ''
                } ${className}`}
                disabled={disabled}
                {...props}
                {...field}
              />
            )}
          </div>
        </Field>
      )}
    />
  );
};
