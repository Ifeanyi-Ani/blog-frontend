import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import MainLayout from "./MainLayout";

function Layout() {
  return (
    <div className="grid grid-rows-[auto_1fr] h-screen  bg-gradient-to-br from-customBlue-950 via-customBlue-900 to-customBlue-800 text-electricCyan-100">
      <Navbar />
      <MainLayout>
        <Outlet />
      </MainLayout>
    </div>
  );
}

export default Layout;
