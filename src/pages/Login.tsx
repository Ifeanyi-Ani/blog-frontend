import { Link } from 'react-router-dom';

import { LoginForm } from '../features/auth/LoginForm';
import { BackBtn } from '../ui/shared/BackBtn';
import { ForgotPassword } from '../features/auth/ForgotPassword';

export default function LoginPage() {
  return (
    <>
      <div className="mb-8">
        <BackBtn text="Home" to="/" />
      </div>
      <div className="space-y-2 text-center">
        <h1 className="animate-glow bg-gradient-to-r from-neonPink-400 to-electricCyan-400 bg-clip-text text-4xl font-bold tracking-tighter text-transparent">
          Login
        </h1>
        <p className="text-electricCyan-300">
          Enter your credentials to access your account
        </p>
      </div>
      <LoginForm />
      <div className="mt-4 text-center">
        <ForgotPassword />
      </div>
      <div className="relative mt-6">
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
        Login with Google
      </button>
      <div className="mt-4 text-center text-sm text-electricCyan-400">
        Don&apos;t have an account?
        <Link
          to="/auth/register"
          className="font-medium text-neonPink-400 transition-colors hover:text-neonPink-300"
        >
          Sign up
        </Link>
      </div>
    </>
  );
}
