import { Link } from "react-router-dom";
import { RegisterForm } from "../features/auth/RegisterForm";

export default function SignupPage() {
  return (
    <>
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neonPink-400 to-electricCyan-400 animate-glow">
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
          <span className="px-2 bg-customBlue-900 text-electricCyan-400">
            Or continue with
          </span>
        </div>
      </div>
      <button className="w-full py-2 px-4 bg-customBlue-800 border border-customBlue-700 text-electricCyan-300 rounded-md font-medium hover:bg-customBlue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-customBlue-900 focus:ring-electricCyan-500 transition-colors duration-200">
        Sign Up with Google
      </button>
      <div className="text-center text-sm text-electricCyan-400">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="font-medium text-neonPink-400 hover:text-neonPink-300 transition-colors"
        >
          Log in
        </Link>
      </div>
    </>
  );
}
