import { Link } from 'react-router-dom';
import { IPost, IUser } from '../types/type';

const Sidebar = ({
  trendingBlogs,
  popularUsers,
}: {
  trendingBlogs: IPost[];
  popularUsers: IUser[];
}) => (
  <div className="space-y-6">
    <div className="rounded-lg bg-card p-6 text-card-foreground shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-primary">
        Trending Blogs
      </h2>
      <ul className="space-y-2">
        {trendingBlogs?.slice(0, 5)?.map((blog) => (
          <li key={blog._id}>
            <Link to={`/posts/${blog._id}`} className="text-sm hover:underline">
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <div className="rounded-lg bg-card p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-primary">Popular Users</h2>
      <ul className="space-y-2">
        {popularUsers?.slice(0, 4)?.map((user) => (
          <li key={user.username} className="flex items-center space-x-2">
            <img
              src={user.photo}
              alt={user.username}
              className="h-8 w-8 rounded-full"
            />
            <span className="text-sm">{user.username}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
export default Sidebar;
