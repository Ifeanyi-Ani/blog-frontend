import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { LoginForm } from '../features/auth/LoginForm';
import { BackBtn } from '../ui/shared/BackBtn';
import { ForgotPassword } from '../features/auth/ForgotPassword';

export default function LoginPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <BackBtn text="Home" to="/" />
      </div>
      <div className="space-y-2 text-center">
        <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-5xl font-extrabold tracking-tighter text-transparent">
          Login
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>
      <LoginForm />
      <div className="mt-4 text-center">
        <ForgotPassword />
      </div>
      <div className="relative mt-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border"></span>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-3 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button className="mt-4 w-full rounded-lg border border-input bg-secondary px-4 py-2 font-medium text-secondary-foreground transition-all hover:bg-secondary/80 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
        Login with Google
      </button>
      <div className="mt-4 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link
          to="/auth/register"
          className="font-medium text-primary transition-colors hover:text-primary/80"
        >
          Sign up
        </Link>
      </div>
    </motion.div>
  );
}
