import { AlertCircle } from 'lucide-react';
import { ReactNode } from 'react';
interface CustomPageErrorProps {
  error: any;
  title: string;
  children?: ReactNode;
}

export const CustomPageError = ({
  error,
  title,
  children,
}: CustomPageErrorProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center from-customBlue-950 via-customBlue-900 to-customBlue-800 md:bg-gradient-to-br">
      <div className="max-w-md rounded-lg border border-customRed-500 bg-customRed-900/50 p-6">
        <div className="mb-4 flex items-center text-customRed-300">
          <AlertCircle size={24} className="mr-2" />
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <p className="text-customRed-100">
          {'data' in error
            ? error.data.message
            : error instanceof Error
              ? error.message
              : 'An unknown error occurred. Please try again later.'}
        </p>
        {children}
      </div>
    </div>
  );
};
