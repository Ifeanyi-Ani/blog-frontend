import { Outlet, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useAppSelector } from '../app/hook';

export default function AuthLayout() {
  const { currentUser } = useAppSelector((state) => state.auth);

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-secondary p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full space-y-8 rounded-lg border border-border bg-card p-8 shadow-lg md:max-w-md"
      >
        <Outlet />
      </motion.div>
    </div>
  );
}
