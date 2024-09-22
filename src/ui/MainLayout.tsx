import { useGetPostsQuery } from "../features/posts/postSlice";
import { useGetUsersQuery } from "../features/users/userSlice";
import Sidebar from "./SideBar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: popularUsers } = useGetUsersQuery(null);
  const { data: posts } = useGetPostsQuery(null);
  return (
    <div className="overflow-y-scroll custom-scrollbar grid lg:grid-cols-12 grid-cols-[none] gap-6 w-full max-w-screen-2xl mx-auto h-full">
      <main className="col-[1fr] lg:col-start-2 lg:col-end-9 h-full md:px-4 md:py-6 relative">
        {children}
      </main>
      <aside className="col-start-9 col-end-12 relative hidden lg:block w-80 overflow-y-auto no-scrollbar">
        <Sidebar trendingBlogs={posts} popularUsers={popularUsers} />
      </aside>
    </div>
  );
};

export default MainLayout;
