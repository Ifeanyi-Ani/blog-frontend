import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

function Layout() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
