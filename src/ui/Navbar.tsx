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
    <nav className="w-full bg-customBlue-900 border-b border-customBlue-700 shadow-lg py-2 mb-4">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-3xl font-extrabold text-customBlue-100"
            >
              devTalk
            </Link>
          </div>
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <Input placeholder="Search" className="pl-10" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customBlue-500 w-5 h-5" />
            </form>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to={!currentUser ? "/auth/login" : "/posts/new"}
              className="flex items-center bg-customBlue-600 hover:bg-customBlue-500 text-customBlue-100 rounded-full px-4 py-2 transition duration-150 ease-in-out"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create
            </Link>
            {!currentUser ? (
              <Link
                to="/auth/login"
                className="text-customBlue-300 hover:text-customBlue-100 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                Login
              </Link>
            ) : (
              <Account />
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-customBlue-300 hover:text-customBlue-100 focus:outline-none focus:text-customBlue-100"
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

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative mb-3"
            >
              <Input placeholder="Search" className="pl-10" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customBlue-500 w-5 h-5" />
            </form>
            <Link
              to={!currentUser ? "/auth/login" : "/posts/new"}
              className="flex items-center bg-customBlue-600 hover:bg-customBlue-500 text-customBlue-100 rounded-full px-4 py-2 transition duration-150 ease-in-out"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create
            </Link>
            {!currentUser ? (
              <Link
                to="/auth/login"
                className="block text-customBlue-300 hover:text-customBlue-100 px-3 py-2 rounded-md text-base font-medium"
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
