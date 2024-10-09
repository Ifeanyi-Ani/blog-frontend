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
      <MenuButton className="flex items-center gap-2 rounded-full bg-customBlue-800 p-2 transition-colors duration-200 hover:bg-customBlue-700 focus:outline-none focus:ring-2 focus:ring-neonPink-500 focus:ring-opacity-50">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neonPink-500">
          {user.photo ? (
            <img src={user.photo} alt="user-image" className="h-6 w-6" />
          ) : (
            <User className="h-5 w-5 text-customBlue-900" />
          )}
        </div>
        <div className="flex flex-col items-start">
          <h5 className="text-sm font-bold text-electricCyan-300">
            {user.username}
          </h5>
          <p className="text-xs text-electricCyan-500">software developer</p>
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
        <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right rounded-md border border-neonPink-500/30 bg-customBlue-800 shadow-lg shadow-neonPink-500/20 focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm text-electricCyan-300">My Account</p>
          </div>
          <MenuItem>
            {({ focus }) => (
              <div
                className={`flex items-center justify-between px-4 py-2 ${focus ? 'bg-customBlue-700' : ''}`}
              >
                <div className="flex items-center gap-2">
                  {isDarkMode ? (
                    <Moon className="h-4 w-4 text-electricCyan-400" />
                  ) : (
                    <Sun className="h-4 w-4 text-electricCyan-400" />
                  )}
                  <span className="text-electricCyan-300">
                    {isDarkMode ? 'Dark' : 'Light'} Mode
                  </span>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${isDarkMode ? 'bg-electricCyan-500' : 'bg-gray-200'}`}
                >
                  <span
                    className={`transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`}
                  />
                </button>
              </div>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <Link
                className={`flex w-full items-center gap-2 px-4 py-2 ${focus ? 'bg-customBlue-700' : ''} text-electricCyan-300`}
                to={`/settings/${user._id}`}
              >
                <Settings className="h-4 w-4 text-electricCyan-400" />
                Settings
              </Link>
            )}
          </MenuItem>
          <div className="border-t border-neonPink-500/30"></div>
          <MenuItem>
            {({ focus }) => (
              <button
                onClick={handleLogOut}
                disabled={isLoading}
                className={`flex w-full items-center gap-2 px-4 py-2 ${focus ? 'bg-customBlue-700' : ''} text-customRed-400 hover:text-customRed-300`}
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
