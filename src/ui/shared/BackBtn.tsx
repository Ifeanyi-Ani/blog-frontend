import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface BackBtnProps {
  to?: string;
  className?: string;
  text?: string;
}
export const BackBtn: React.FC<BackBtnProps> = ({
  to,
  className,
  text = "Back",
}) => {
  const navigate = useNavigate();
  const style = `text-electricCyan-400 hover:text-electricCyan-300 transition-colors duration-200 inline-flex items-center ${className}`;
  if (to) {
    return (
      <Link to={to} className={style}>
        <ArrowLeft size={20} className="mr-2" />
        {text}
      </Link>
    );
  }
  return (
    <div className={style} onClick={() => navigate(-1)}>
      <ArrowLeft size={20} className="mr-2" />
      {text}
    </div>
  );
};
