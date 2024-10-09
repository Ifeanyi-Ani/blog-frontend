import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

function Layout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr] bg-gradient-to-br from-customBlue-950 via-customBlue-900 to-customBlue-800 text-electricCyan-100">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
