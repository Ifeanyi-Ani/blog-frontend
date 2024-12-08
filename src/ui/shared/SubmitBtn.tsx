import * as React from 'react';
import { Loader } from 'lucide-react';
import { Button } from '@headlessui/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  type: 'button' | 'submit' | 'reset';
  btnText: string;
  loadingBtnText?: string;
}
const SubmitBtn = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isLoading, type, btnText, loadingBtnText, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        type={type}
        disabled={isLoading}
        className={`w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/85 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <Loader className="mr-2 animate-spin" size={16} />
            {loadingBtnText}
          </span>
        ) : (
          btnText
        )}
      </Button>
    );
  }
);

SubmitBtn.displayName = 'SubmitBtn';
export { SubmitBtn };
