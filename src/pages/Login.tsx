import { Link } from "react-router-dom";
import { LoginForm } from "../features/auth/LoginForm";
import { BackBtn } from "../ui/shared/BackBtn";
import { ForgotPassword } from "../features/auth/ForgotPassword";

export default function LoginPage() {
  return (
    <>
      <div className="mb-8">
        <BackBtn text="Home" to="/" />
      </div>
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neonPink-400 to-electricCyan-400 animate-glow">
          Login
        </h1>
        <p className="text-electricCyan-300">
          Enter your credentials to access your account
        </p>
      </div>
      <LoginForm />
      <div className="text-center mt-4">
        <ForgotPassword />
      </div>
      <div className="relative mt-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-customBlue-700"></span>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-customBlue-900 text-electricCyan-400">
            Or continue with
          </span>
        </div>
      </div>
      <button className="w-full py-2 px-4 bg-customBlue-800 border border-customBlue-700 text-electricCyan-300 rounded-md font-medium hover:bg-customBlue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-customBlue-900 focus:ring-electricCyan-500 transition-colors duration-200">
        Login with Google
      </button>
      <div className="text-center text-sm text-electricCyan-400 mt-4">
        Don't have an account?{" "}
        <Link
          to="/auth/register"
          className="font-medium text-neonPink-400 hover:text-neonPink-300 transition-colors"
        >
          Sign up
        </Link>
      </div>
    </>
  );
}
