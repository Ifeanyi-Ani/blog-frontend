import { Outlet } from 'react-router-dom';

import { useGetPostsQuery } from '../features/posts/postSlice';
import { useGetUsersQuery } from '../features/users/userSlice';
import Sidebar from './SideBar';

const MainLayout = () => {
  const { data: popularUsers } = useGetUsersQuery(null);
  const { data: posts } = useGetPostsQuery(null);

  return (
    <div className="container mx-auto grid min-h-screen lg:grid-cols-3 lg:gap-6">
      <div className="w-full lg:col-span-2">
        <div className="mx-auto mt-4 w-full max-w-4xl space-y-8 px-1 md:px-2">
          <Outlet />
        </div>
      </div>

      <aside className="hidden lg:col-span-1 lg:block">
        <div className="custom-scrollbar sticky top-20 h-[calc(100vh-5rem)] space-y-4 overflow-y-auto pb-4">
          <Sidebar
            trendingBlogs={posts || []}
            popularUsers={popularUsers || []}
          />
        </div>
      </aside>
    </div>
  );
};
export default MainLayout;
