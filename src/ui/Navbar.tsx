import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';

import { useAppSelector } from '../app/hook';
import { Input } from './shared/Input';
import { Account } from './shared/Account';
import MobileNav from './MobileNav';
import { IUser } from '../types/type';

const Navbar = () => {
  const { currentUser } = useAppSelector((state) => state.auth);

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            devTalk
          </Link>
          <div className="hidden flex-1 items-center justify-center lg:flex">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full max-w-lg"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="w-full rounded-full border-0 bg-secondary py-2 pl-10 pr-4 text-secondary-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
                />
              </div>
            </form>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to={!currentUser ? '/auth/login' : '/new'}
              className="flex items-center rounded-full bg-primary px-4 py-2 font-semibold text-primary-foreground transition duration-300 ease-in-out hover:bg-primary/90"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create
            </Link>
            {!currentUser ? (
              <Link
                to="/auth/login"
                className="rounded-full border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Login
              </Link>
            ) : (
              <Account user={currentUser} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
