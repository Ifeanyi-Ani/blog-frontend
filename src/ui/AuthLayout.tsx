import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hook";
export default function AuthLayout() {
  const { currentUser } = useAppSelector((state) => state.auth);

  if (currentUser) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="bg-customBlue-950 text-stone-100 flex min-h-screen w-full items-center justify-center">
      <Outlet />
    </div>
  );
}
