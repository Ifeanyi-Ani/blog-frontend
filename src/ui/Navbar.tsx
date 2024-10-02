import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { useAppSelector } from "../app/hook";
import { Input } from "./shared/Input";
import { Account } from "./shared/Account";
import MobileNav from "./MobileNav";
import { Author } from "../types/type";

const Navbar = function () {
  const { currentUser } = useAppSelector((state) => state.auth);

  return (
    <nav className="relative z-50 w-full bg-gradient-to-r from-customBlue-950 via-customBlue-900 to-customBlue-800 border-neonPink-700/30 shadow-lg py-2 md:mb-4">
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
              to={!currentUser ? "/auth/login" : "/new"}
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
          <div className="md:hidden">
            <MobileNav currentUser={currentUser as Author} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
