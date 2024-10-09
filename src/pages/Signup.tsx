import { Link } from 'react-router-dom';

import { RegisterForm } from '../features/auth/RegisterForm';
import { BackBtn } from '../ui/shared/BackBtn';

export default function SignupPage() {
  return (
    <>
      <div className="mb-8">
        <BackBtn text="Home" to="/" />
      </div>
      <div className="space-y-2 text-center">
        <h1 className="animate-glow bg-gradient-to-r from-neonPink-400 to-electricCyan-400 bg-clip-text text-4xl font-bold tracking-tighter text-transparent">
          Sign Up
        </h1>
        <p className="text-electricCyan-300">
          Create an account to get started
        </p>
      </div>
      <RegisterForm />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-customBlue-700"></span>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-customBlue-900 px-2 text-electricCyan-400">
            Or continue with
          </span>
        </div>
      </div>
      <button className="w-full rounded-md border border-customBlue-700 bg-customBlue-800 px-4 py-2 font-medium text-electricCyan-300 transition-colors duration-200 hover:bg-customBlue-700 focus:outline-none focus:ring-2 focus:ring-electricCyan-500 focus:ring-offset-2 focus:ring-offset-customBlue-900">
        Sign Up with Google
      </button>
      <div className="text-center text-sm text-electricCyan-400">
        Already have an account?{' '}
        <Link
          to="/auth/login"
          className="font-medium text-neonPink-400 transition-colors hover:text-neonPink-300"
        >
          Log in
        </Link>
      </div>
    </>
  );
}
