import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Sun, Moon, Settings, LogOut } from 'lucide-react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';

import { useLogOutMutation } from '../../features/users/userSlice';
import { IUser } from '../../types/type';

export const Account = ({ user }: { user: IUser }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [logOut, { isLoading }] = useLogOutMutation();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogOut = async () => {
    try {
      await logOut(null).unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Menu as="div" className="relative z-50 inline-block text-left">
      <MenuButton className="">
        <div className="flex h-8 w-8 items-center justify-center rounded-full">
          {user.photo ? (
            <img src={user.photo} alt="user-image" className="h-8 w-8" />
          ) : (
            <User className="h-8 w-8" />
          )}
        </div>
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right rounded-md border border-input bg-primary/70 shadow-lg focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm text-foreground">My Account</p>
          </div>
          <MenuItem>
            {({ focus }) => (
              <div
                className={`flex items-center justify-between px-4 py-2 text-primary-foreground ${focus ? 'bg-primary' : ''}`}
              >
                <div className="flex items-center gap-2">
                  {isDarkMode ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                  <span className="">{isDarkMode ? 'Dark' : 'Light'} Mode</span>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${isDarkMode ? 'bg-secondary' : 'bg-secondary/50'}`}
                >
                  <span
                    className={`transform ${isDarkMode ? 'translate-x-6 bg-primary/70' : 'translate-x-1 bg-accent-foreground'} inline-block h-4 w-4 transform rounded-full transition-transform duration-200`}
                  />
                </button>
              </div>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <Link
                className={`flex w-full items-center gap-2 px-4 py-2 text-primary-foreground ${focus ? 'bg-primary' : ''}`}
                to={`/settings/${user._id}`}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            )}
          </MenuItem>
          <div className="border-t border-input"></div>
          <MenuItem>
            {({ focus }) => (
              <button
                onClick={handleLogOut}
                disabled={isLoading}
                className={`flex w-full items-center gap-2 px-4 py-2 text-destructive ${focus ? 'bg-destructive' : ''} hover:bg-destructive hover:text-destructive-foreground`}
              >
                <LogOut className="h-4 w-4" />
                {isLoading ? 'Logging out...' : 'Log out'}
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
};
