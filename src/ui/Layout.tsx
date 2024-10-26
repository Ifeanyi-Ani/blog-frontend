import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

function Layout() {
  return (
    <div className="relative grid min-h-screen w-full grid-rows-[1fr_auto] bg-background text-foreground">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
