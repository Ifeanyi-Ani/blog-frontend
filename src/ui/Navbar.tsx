import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';

import { useAppSelector } from '../app/hook';
import { Input } from './shared/Input';
import { Account } from './shared/Account';
import MobileNav from './MobileNav';
import { IUser } from '../types/type';

const Navbar = function () {
  const { currentUser } = useAppSelector((state) => state.auth);

  return (
    <nav className="relative z-50 w-full border-neonPink-700/30 bg-gradient-to-r from-customBlue-950 via-customBlue-900 to-customBlue-800 py-2 shadow-lg md:mb-4">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="animate-glow bg-gradient-to-r from-neonPink-400 to-electricCyan-400 bg-clip-text text-3xl font-extrabold text-transparent"
            >
              devTalk
            </Link>
          </div>
          <div className="mx-4 hidden max-w-md flex-1 md:block">
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <Input
                placeholder="Search"
                className="border-electricCyan-700 bg-customBlue-800 pl-10 text-electricCyan-100 placeholder-electricCyan-600 focus:border-transparent focus:ring-2 focus:ring-neonPink-500"
              />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-electricCyan-400" />
            </form>
          </div>
          <div className="hidden items-center space-x-4 md:flex">
            <Link
              to={!currentUser ? '/auth/login' : '/new'}
              className="flex items-center rounded-full bg-gradient-to-r from-neonPink-500 to-electricCyan-500 px-4 py-2 font-semibold text-customBlue-900 shadow-md transition duration-300 ease-in-out hover:from-neonPink-400 hover:to-electricCyan-400 hover:shadow-lg hover:shadow-neonPink-500/20"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create
            </Link>
            {!currentUser ? (
              <Link
                to="/auth/login"
                className="rounded-md px-3 py-2 text-sm font-medium text-electricCyan-300 transition duration-300 ease-in-out hover:text-electricCyan-100"
              >
                Login
              </Link>
            ) : (
              <Account user={currentUser} />
            )}
          </div>
          <div className="md:hidden">
            <MobileNav currentUser={currentUser as IUser} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
