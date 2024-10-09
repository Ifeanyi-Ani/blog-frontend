import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hook';
export default function AuthLayout() {
  const { currentUser } = useAppSelector((state) => state.auth);

  if (currentUser) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-customBlue-950 via-customBlue-900 to-customBlue-800 p-6">
      <div className="w-full space-y-8 p-8 md:max-w-md md:rounded-xl md:border md:border-neonPink-700/30 md:bg-customBlue-900 md:shadow-xl">
        <Outlet />
      </div>
    </div>
  );
}
