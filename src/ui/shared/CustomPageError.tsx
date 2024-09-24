import { AlertCircle } from "lucide-react";
import { ReactNode } from "react";
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
    <div className="min-h-screen md:bg-gradient-to-br from-customBlue-950 via-customBlue-900 to-customBlue-800 flex items-center justify-center">
      <div className="bg-customRed-900/50 border border-customRed-500 rounded-lg p-6 max-w-md">
        <div className="flex items-center text-customRed-300 mb-4">
          <AlertCircle size={24} className="mr-2" />
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <p className="text-customRed-100">
          {"data" in error
            ? error.data.message
            : error instanceof Error
              ? error.message
              : "An unknown error occurred. Please try again later."}
        </p>
        {children}
      </div>
    </div>
  );
};
