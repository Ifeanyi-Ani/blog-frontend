import { AlertCircle } from 'lucide-react';

interface NotFoundStateProps {
  title?: string;
  message?: string;
}
export const NotFoundState = ({ title, message }: NotFoundStateProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center from-customBlue-950 via-customBlue-900 to-customBlue-800 md:bg-gradient-to-br">
      <div className="max-w-md rounded-lg border border-electricCyan-500 bg-customBlue-800 p-6">
        <div className="mb-4 flex items-center text-electricCyan-300">
          <AlertCircle size={24} className="mr-2" />
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <p className="text-electricCyan-100">{message}</p>
      </div>
    </div>
  );
};
