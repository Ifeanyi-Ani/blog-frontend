import { Outlet } from 'react-router-dom';

import { useGetPostsQuery } from '../features/posts/postSlice';
import { useGetUsersQuery } from '../features/users/userSlice';
import Sidebar from './SideBar';

const MainLayout = () => {
  const { data: popularUsers } = useGetUsersQuery(null);
  const { data: posts } = useGetPostsQuery(null);
  return (
    <div className="custom-scrollbar mx-auto grid h-full w-full max-w-screen-2xl grid-cols-[none] gap-6 overflow-y-scroll lg:grid-cols-12">
      <main className="relative col-[1fr] min-h-screen md:px-4 md:py-6 lg:col-start-2 lg:col-end-9">
        <div className="w-full max-w-4xl space-y-8 p-8 md:rounded-xl md:bg-customBlue-900 md:shadow-xl">
          <Outlet />
        </div>
      </main>
      <aside className="no-scrollbar relative col-start-9 col-end-12 hidden w-80 overflow-y-auto lg:block">
        <Sidebar trendingBlogs={posts} popularUsers={popularUsers} />
      </aside>
    </div>
  );
};

export default MainLayout;
