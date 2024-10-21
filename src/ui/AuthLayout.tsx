import { useAppSelector } from '../app/hook';
import { motion } from 'framer-motion';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthLayout() {
  const { currentUser } = useAppSelector((state) => state.auth);

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-primary to-secondary p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full space-y-8 rounded-lg border border-border bg-card p-8 shadow-lg shadow-secondary/20 transition-shadow hover:shadow-xl md:max-w-md"
      >
        <Outlet />
      </motion.div>
    </div>
  );
}
