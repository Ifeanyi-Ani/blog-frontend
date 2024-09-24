import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hook";
export default function AuthLayout() {
  const { currentUser } = useAppSelector((state) => state.auth);

  if (currentUser) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-customBlue-950 via-customBlue-900 to-customBlue-800 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 bg-customBlue-900 p-8 rounded-xl shadow-xl border border-neonPink-700/30">
        <Outlet />
      </div>
    </div>
  );
}
