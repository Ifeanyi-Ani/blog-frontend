import { Fragment, useState } from "react";
import { User, Sun, Moon, Settings, LogOut } from "lucide-react";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from "@headlessui/react";
import { useLogOutMutation } from "../../features/users/userSlice";
import { Author } from "../../types/type";
import { Link } from "react-router-dom";

export const Account = ({ user }: { user: Author }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [logOut, { isLoading }] = useLogOutMutation();

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleLogOut = async () => {
        try {
            await logOut(null).unwrap();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <Menu as="div" className="relative inline-block text-left z-50">
            <MenuButton className="flex items-center gap-2 p-2 rounded-full bg-customBlue-800 hover:bg-customBlue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neonPink-500 focus:ring-opacity-50">
                <div className="w-8 h-8 rounded-full bg-neonPink-500 flex items-center justify-center">
                    {user.photo ? (
                        <img
                            src={user.photo}
                            alt="user-image"
                            className="w-6 h-6"
                        />
                    ) : (
                        <User className="w-5 h-5 text-customBlue-900" />
                    )}
                </div>
                <div className="flex flex-col items-start">
                    <h5 className="font-bold text-sm text-electricCyan-300">
                        {user.username}
                    </h5>
                    <p className="text-xs text-electricCyan-500">
                        software developer
                    </p>
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
                <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right bg-customBlue-800 border border-neonPink-500/30 shadow-lg shadow-neonPink-500/20 rounded-md focus:outline-none">
                    <div className="px-4 py-3">
                        <p className="text-sm text-electricCyan-300">
                            My Account
                        </p>
                    </div>
                    <MenuItem>
                        {({ focus }) => (
                            <div
                                className={`flex items-center justify-between px-4 py-2 ${focus ? "bg-customBlue-700" : ""}`}
                            >
                                <div className="flex items-center gap-2">
                                    {isDarkMode ? (
                                        <Moon className="w-4 h-4 text-electricCyan-400" />
                                    ) : (
                                        <Sun className="w-4 h-4 text-electricCyan-400" />
                                    )}
                                    <span className="text-electricCyan-300">
                                        {isDarkMode ? "Dark" : "Light"} Mode
                                    </span>
                                </div>
                                <button
                                    onClick={toggleDarkMode}
                                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ${isDarkMode ? "bg-electricCyan-500" : "bg-gray-200"}`}
                                >
                                    <span
                                        className={`transform ${isDarkMode ? "translate-x-6" : "translate-x-1"} inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200`}
                                    />
                                </button>
                            </div>
                        )}
                    </MenuItem>
                    <MenuItem>
                        {({ focus }) => (
                            <Link
                                className={`flex items-center gap-2 w-full px-4 py-2 ${focus ? "bg-customBlue-700" : ""} text-electricCyan-300`}
                                to={`/settings/${user._id}`}
                            >
                                <Settings className="w-4 h-4 text-electricCyan-400" />
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
                                className={`flex items-center gap-2 w-full px-4 py-2 ${focus ? "bg-customBlue-700" : ""} text-customRed-400 hover:text-customRed-300`}
                            >
                                <LogOut className="w-4 h-4" />
                                {isLoading ? "Logging out..." : "Log out"}
                            </button>
                        )}
                    </MenuItem>
                </MenuItems>
            </Transition>
        </Menu>
    );
};
