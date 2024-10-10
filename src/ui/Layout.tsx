import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

function Layout() {
  return (
    <div className="min-h-screen bg-background w-full text-foreground">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
