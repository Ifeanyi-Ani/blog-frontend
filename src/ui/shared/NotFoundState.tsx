import { AlertCircle } from "lucide-react";
interface NotFoundStateProps {
  title: string;
  message: string;
}
export const NotFoundState = ({ title, message }) => {
  return (
    <div className="min-h-screen md:bg-gradient-to-br from-customBlue-950 via-customBlue-900 to-customBlue-800 flex items-center justify-center">
      <div className="bg-customBlue-800 border border-electricCyan-500 rounded-lg p-6 max-w-md">
        <div className="flex items-center text-electricCyan-300 mb-4">
          <AlertCircle size={24} className="mr-2" />
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <p className="text-electricCyan-100">{message}</p>
      </div>
    </div>
  );
};
