import React from "react";
import { Button } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

const AdminNav: React.FC = () => {
  return (
    <div>
      <nav className='mt-4 d-flex justify-content-between'>
        <ul className='nav nav-tabs border-0'>
          <li className='nav-item'>
            <Link to='/admin' className='nav-link'>
              Dashboard
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/admin/posts' className='nav-link'>
              Posts
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/admin/users' className='nav-link'>
              Users
            </Link>
          </li>
        </ul>
        <div className='d-flex gap-3'>
          <Button>
            Create <br /> Post
          </Button>
          <Button>
            Create <br /> User
          </Button>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default AdminNav;
