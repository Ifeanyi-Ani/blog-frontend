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
    <nav className="border-1 fixed top-0 z-50 w-full border bg-background py-2 text-primary-foreground shadow-lg">
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
                placeholder="Search..."
                className="rounded-full border-0 bg-input py-3 pl-10 pr-4 text-secondary-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-offset-accent"
              />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-primary" />
            </form>
          </div>
          <div className="hidden items-center space-x-4 md:flex">
            <Link
              to={!currentUser ? '/auth/login' : '/new'}
              className="flex items-center rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 font-semibold text-primary-foreground shadow-md transition duration-300 ease-in-out hover:from-neonPink-400 hover:to-electricCyan-400 hover:shadow-lg hover:shadow-neonPink-500/20"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create
            </Link>
            {!currentUser ? (
              <Link
                to="/auth/login"
                className="bg-bacground rounded-full border border-input px-3 py-2 text-sm font-medium text-accent-foreground transition-colors duration-300 ease-in-out hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
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
