import * as React from 'react';
import { Loader } from 'lucide-react';

interface SubmitBtnProps {
  isLoading: boolean;
  type: 'button' | 'submit' | 'reset';
  btnText: string;
  loadingBtnText?: string;
  className?: string;
}

export const SubmitBtn: React.FC<SubmitBtnProps> = ({
  isLoading,
  type,
  btnText,
  loadingBtnText,
  className,
}) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={`w-full rounded-md bg-gradient-to-r from-background to-primary px-4 py-2 font-medium text-customBlue-100 transition-colors duration-200 hover:from-neonPink-500 hover:to-electricCyan-500 focus:outline-none focus:ring-2 focus:ring-electricCyan-500 focus:ring-offset-2 focus:ring-offset-customBlue-900 ${className}`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <Loader className="mr-2 animate-spin" size={16} />
          {loadingBtnText}
        </span>
      ) : (
        btnText
      )}
    </button>
  );
};
