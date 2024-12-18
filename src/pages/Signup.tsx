import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { RegisterForm } from '../features/auth/RegisterForm';
import { BackBtn } from '../ui/shared/BackBtn';

export default function SignupPage() {
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
        <h1 className="text-5xl font-extrabold tracking-tighter text-primary">
          Sign Up
        </h1>
        <p className="text-sm text-muted-foreground">
          Create an account to get started
        </p>
      </div>
      <RegisterForm />
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
      <button className="mt-4 w-full rounded-lg border border-input px-4 py-2 font-medium text-secondary-foreground transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring">
        Sign Up with Google
      </button>
      <div className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          to="/auth/login"
          className="font-medium text-primary transition-colors hover:text-primary/80"
        >
          Log in
        </Link>
      </div>
    </motion.div>
  );
}
