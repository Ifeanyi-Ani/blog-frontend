import * as React from "react";
import {
  useForm,
  UseFormReturn,
  Control,
  FieldPath,
  FieldValues,
  Controller,
} from "react-hook-form";
import { LucideIcon } from "lucide-react";

const Form = React.forwardRef<
  HTMLFormElement,
  React.FormHTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => (
  <form ref={ref} className={`"space-y-8" ${className}`} {...props} />
));
Form.displayName = "Form";

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  form: UseFormReturn<TFieldValues>;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  ...props
}: {
  name: TName;
  control: Control<TFieldValues>;
  children: React.ReactNode;
}) => {
  return (
    <FormFieldContext.Provider
      value={{ name, form: { control } as UseFormReturn<TFieldValues> }}
    >
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <div {...props}>
              {React.isValidElement(props.children) &&
                React.cloneElement(props.children as React.ReactElement, {
                  ...field,
                  ...props,
                })}
            </div>
          );
        }}
      />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = fieldContext.form;
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();
  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={`space-y-2 ${className}`} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const FormLabel = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField();
    return (
      <label
        ref={ref}
        className={`text-sm font-medium text-electricCyan-300 ${error && "text-red-500 dark:text-red-900"} ${className}`}
        htmlFor={formItemId}
        {...props}
      />
    );
  }
);
FormLabel.displayName = "FormLabel";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={`
        text-sm font-medium text-red-500 dark:text-red-900
        ${className}
      `}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
}

const InputField = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon: Icon, ...props }, ref) => {
    return (
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        )}
        <input
          type={type}
          className={`
            w-full flex rounded-md border border-customBlue-700 bg-customBlue-900 px-3 py-2 text-sm text-customBlue-100 placeholder-customBlue-500 focus:border-customBlue-500 focus:outline-none focus:ring-1 focus:ring-customBlue-500 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50
            ${Icon && "pl-10"}
            ${className}
          `}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
InputField.displayName = "InputField";

export {
  useForm,
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
  InputField,
};
