import { Outlet } from 'react-router-dom';
import { useGetPostsQuery } from '../features/posts/postSlice';
import { useGetUsersQuery } from '../features/users/userSlice';
import Sidebar from './SideBar';

const MainLayout = () => {
  const { data: popularUsers } = useGetUsersQuery(null);
  const { data: posts } = useGetPostsQuery(null);

  return (
    <div className="mx-auto flex max-h-screen w-full max-w-screen-2xl flex-col md:flex-row">
      <div className="relative pt-28 flex h-full w-full flex-grow items-center justify-center p-6 md:w-2/3">
        <div className="mx-auto max-w-4xl space-y-8">
          <Outlet />
        </div>
      </div>

      <aside className="hidden md:block md:w-1/3">
        <div className="no-scrollbar w-96 top-28 fixed max-w-1/3 overflow-hidden bg-background p-6">
          <Sidebar trendingBlogs={posts} popularUsers={popularUsers} />
        </div>
      </aside>
    </div>
  );
};

export default MainLayout;
