import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Menu, X, Search } from "lucide-react";
import { useAppSelector } from "../app/hook";
import { Input } from "./shared/Input";
import { Account } from "./shared/Account";

const Navbar = function () {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-gradient-to-r from-customBlue-950 via-customBlue-900 to-customBlue-800 border-neonPink-700/30 shadow-lg py-2 mb-4">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neonPink-400 to-electricCyan-400 animate-glow"
            >
              devTalk
            </Link>
          </div>
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <Input
                placeholder="Search"
                className="pl-10 bg-customBlue-800 border-electricCyan-700 text-electricCyan-100 placeholder-electricCyan-600 focus:ring-2 focus:ring-neonPink-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-electricCyan-400 w-5 h-5" />
            </form>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to={!currentUser ? "/auth/login" : "/posts/new"}
              className="flex items-center bg-gradient-to-r from-neonPink-500 to-electricCyan-500 hover:from-neonPink-400 hover:to-electricCyan-400 text-customBlue-900 font-semibold rounded-full px-4 py-2 transition duration-300 ease-in-out shadow-md hover:shadow-lg hover:shadow-neonPink-500/20"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create
            </Link>
            {!currentUser ? (
              <Link
                to="/auth/login"
                className="text-electricCyan-300 hover:text-electricCyan-100 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
              >
                Login
              </Link>
            ) : (
              <Account user={currentUser} />
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-electricCyan-300 hover:text-electricCyan-100 focus:outline-none focus:text-electricCyan-100 transition duration-300 ease-in-out"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-customBlue-900 shadow-lg rounded-b-lg mt-2">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative mb-3"
            >
              <Input
                placeholder="Search"
                className="pl-10 bg-customBlue-800 border-electricCyan-700 text-electricCyan-100 placeholder-electricCyan-600 focus:ring-2 focus:ring-neonPink-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-electricCyan-400 w-5 h-5" />
            </form>
            <Link
              to={!currentUser ? "/auth/login" : "/posts/new"}
              className="flex items-center justify-center bg-gradient-to-r from-neonPink-500 to-electricCyan-500 hover:from-neonPink-400 hover:to-electricCyan-400 text-customBlue-900 font-semibold rounded-full px-4 py-2 transition duration-300 ease-in-out shadow-md hover:shadow-lg hover:shadow-neonPink-500/20"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create
            </Link>
            {!currentUser ? (
              <Link
                to="/auth/login"
                className="block text-electricCyan-300 hover:text-electricCyan-100 px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
              >
                Login
              </Link>
            ) : (
              <div className="px-3 py-2">
                <Account />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
