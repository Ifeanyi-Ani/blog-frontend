import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, Plus, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "./shared/Input";
import { IUser } from "../types/type";

interface MobileNavProps {
  currentUser: IUser;
}
const MobileNav: React.FC<MobileNavProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleMenu}
        className="relative z-50 text-electricCyan-300 hover:text-electricCyan-100 focus:outline-none focus:text-electricCyan-100 transition duration-300 ease-in-out"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-customBlue-900 bg-opacity-98 z-40"
          >
            <div className="flex flex-col h-full pt-20 px-4 overflow-y-auto">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="relative mb-6"
              >
                <Input
                  placeholder="Search"
                  className="pl-10 bg-customBlue-800 border-electricCyan-700 text-electricCyan-100 placeholder-electricCyan-600 focus:ring-2 focus:ring-neonPink-500 focus:border-transparent w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-electricCyan-400 w-5 h-5" />
              </form>
              <Link
                to={!currentUser ? "/auth/login" : "/new"}
                className="flex items-center justify-center bg-gradient-to-r from-neonPink-500 to-electricCyan-500 hover:from-neonPink-400 hover:to-electricCyan-400 text-customBlue-900 font-semibold rounded-full px-4 py-3 transition duration-300 ease-in-out shadow-md hover:shadow-lg hover:shadow-neonPink-500/20 mb-6"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create
              </Link>
              {!currentUser ? (
                <Link
                  to="/auth/login"
                  className="block text-electricCyan-300 hover:text-electricCyan-100 px-3 py-2 rounded-md text-lg font-medium transition duration-300 ease-in-out mb-4"
                >
                  Login
                </Link>
              ) : (
                <div className="flex items-center space-x-3 px-3 py-2 bg-customBlue-800 rounded-lg mb-4">
                  <div className="w-12 h-12 rounded-full bg-neonPink-500 flex items-center justify-center">
                    {currentUser.photo ? (
                      <img
                        src={currentUser.photo}
                        alt="user-image"
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <User className="w-6 h-6 text-customBlue-900" />
                    )}
                  </div>
                  <div>
                    <h5 className="font-bold text-lg text-electricCyan-300">
                      {currentUser.username}
                    </h5>
                    <p className="text-sm text-electricCyan-500">
                      software developer
                    </p>
                  </div>
                </div>
              )}
              {/* Add more menu items here if needed */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
