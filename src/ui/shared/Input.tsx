import * as React from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: string;
  className?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={`w-full rounded-md border border-customBlue-700 bg-customBlue-900 px-3 py-2 text-sm text-customBlue-100 placeholder-customBlue-500 file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-customBlue-500 focus:outline-none focus:ring-1 focus:ring-customBlue-500 disabled:cursor-not-allowed disabled:opacity-50 ${className} `}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
