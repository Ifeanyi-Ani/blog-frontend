import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, X } from 'lucide-react';

import { useAppSelector } from '../app/hook';
import { Input } from './shared/Input';
import { Account } from './shared/Account';

const Navbar = function () {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-primary/50 py-2 shadow-md backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link
                to="/"
                className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-extrabold text-transparent"
              >
                devTalk
              </Link>
            </div>
            <div className="hidden md:block">
              <form onSubmit={(e) => e.preventDefault()} className="relative">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="w-64 rounded-full border-0 bg-muted py-2 pl-10 pr-4 text-secondary-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                />
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-muted-foreground" />
              </form>
            </div>
            <div className="hidden items-center space-x-4 md:flex">
              <Link
                to={!currentUser ? '/auth/login' : '/new'}
                className="flex items-center rounded-full bg-primary px-4 py-2 font-semibold text-primary-foreground shadow-md transition duration-300 ease-in-out hover:bg-primary/90"
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
            <div className="flex items-center md:hidden">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="relative z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm md:hidden"
                  >
                    <div className="w-full max-w-md px-4">
                      <div className="relative">
                        <Input
                          placeholder="Search..."
                          className="w-full rounded-full border-0 bg-input py-3 pl-10 pr-12 text-secondary-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                        />
                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-muted-foreground" />
                        <button
                          onClick={toggleSearch}
                          className="absolute right-3 top-1/2 -translate-y-1/2 transform rounded-full p-1 text-muted-foreground hover:bg-accent"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {!isSearchOpen && (
                <button
                  onClick={toggleSearch}
                  className="mr-2 rounded-full p-2 text-foreground hover:bg-accent"
                >
                  <Search className="h-6 w-6" />
                </button>
              )}
              {/* <MobileNav currentUser={currentUser as IUser} /> */}
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {currentUser && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-4 right-2 z-50 -translate-x-1/2 transform md:hidden"
          >
            <Link
              to="/new"
              className="flex items-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition duration-300 ease-in-out hover:bg-primary/90"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
