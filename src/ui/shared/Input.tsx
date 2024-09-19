import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`
          w-full
          rounded-md
          border
          border-customBlue-700
          bg-customBlue-900
          px-3
          py-2
          text-sm
          text-customBlue-100
          placeholder-customBlue-500
          focus:border-customBlue-500
          focus:outline-none
          focus:ring-1
          focus:ring-customBlue-500
          file:border-0
          file:bg-transparent
          file:text-sm
          file:font-medium
          disabled:cursor-not-allowed
          disabled:opacity-50
          ${className}
        `}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
