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
    <div className="flex min-h-screen items-center justify-center bg-card">
      <div className="max-w-md rounded-lg border border-destructive bg-destructive p-6">
        <div className="mb-4 flex items-center text-destructive">
          <AlertCircle size={24} className="mr-2" />
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <p className="text-destructive/90">
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
