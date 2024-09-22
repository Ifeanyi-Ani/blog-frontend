import { Loader } from "lucide-react";

interface SubmitBtnProps {
  isLoading: boolean;
  type: "button" | "submit" | "reset";
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
      className={`w-full py-2 px-4 bg-gradient-to-r from-neonPink-600 to-electricCyan-600 text-customBlue-100 rounded-md font-medium hover:from-neonPink-500 hover:to-electricCyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-customBlue-900 focus:ring-electricCyan-500 transition-colors duration-200 ${className}`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <Loader className="animate-spin mr-2" size={16} />
          {loadingBtnText}
        </span>
      ) : (
        btnText
      )}
    </button>
  );
};
