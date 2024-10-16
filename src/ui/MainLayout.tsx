import { Outlet } from 'react-router-dom';

import { useGetPostsQuery } from '../features/posts/postSlice';
import { useGetUsersQuery } from '../features/users/userSlice';
import Sidebar from './SideBar';

const MainLayout = () => {
  const { data: popularUsers } = useGetUsersQuery(null);
  const { data: posts } = useGetPostsQuery(null);

  return (
    <div className="container mx-auto flex min-h-screen w-full max-w-screen-2xl flex-col p-6 md:flex-row">
      <div className="relative flex h-full w-full flex-grow items-start justify-center pt-20 md:w-2/3">
        <div className="mx-auto w-full max-w-4xl space-y-8">
          <Outlet />
        </div>
      </div>

      <aside className="hidden md:block lg:w-[40%]">
        <div className="max-w-1/3 fixed top-20 w-96 overflow-hidden bg-background p-6">
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
