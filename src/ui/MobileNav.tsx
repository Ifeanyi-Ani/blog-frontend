import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Plus, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Input } from './shared/Input';
import { IUser } from '../types/type';

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
        className="relative z-50 text-electricCyan-300 transition duration-300 ease-in-out hover:text-electricCyan-100 focus:text-electricCyan-100 focus:outline-none"
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
            className="bg-opacity-98 fixed inset-0 z-40 bg-customBlue-900"
          >
            <div className="flex h-full flex-col overflow-y-auto px-4 pt-20">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="relative mb-6"
              >
                <Input
                  placeholder="Search"
                  className="w-full border-electricCyan-700 bg-customBlue-800 pl-10 text-electricCyan-100 placeholder-electricCyan-600 focus:border-transparent focus:ring-2 focus:ring-neonPink-500"
                />
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-electricCyan-400" />
              </form>
              <Link
                to={!currentUser ? '/auth/login' : '/new'}
                className="mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-neonPink-500 to-electricCyan-500 px-4 py-3 font-semibold text-customBlue-900 shadow-md transition duration-300 ease-in-out hover:from-neonPink-400 hover:to-electricCyan-400 hover:shadow-lg hover:shadow-neonPink-500/20"
              >
                <Plus className="mr-2 h-5 w-5" />
                Create
              </Link>
              {!currentUser ? (
                <Link
                  to="/auth/login"
                  className="mb-4 block rounded-md px-3 py-2 text-lg font-medium text-electricCyan-300 transition duration-300 ease-in-out hover:text-electricCyan-100"
                >
                  Login
                </Link>
              ) : (
                <div className="mb-4 flex items-center space-x-3 rounded-lg bg-customBlue-800 px-3 py-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neonPink-500">
                    {currentUser.photo ? (
                      <img
                        src={currentUser.photo}
                        alt="user-image"
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <User className="h-6 w-6 text-customBlue-900" />
                    )}
                  </div>
                  <div>
                    <h5 className="text-lg font-bold text-electricCyan-300">
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
