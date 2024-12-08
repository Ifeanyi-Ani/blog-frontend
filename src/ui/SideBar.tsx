import { RenderTrending } from './RenderTrending';
import { IPost, IUser } from '../types/type';
import { Link } from 'react-router-dom';

const Sidebar = ({
  trendingBlogs,
  popularUsers,
}: {
  trendingBlogs: IPost[];
  popularUsers: IUser[];
}) => {
  return (
    <div className="space-y-6">
      <div className="w-3/4 rounded-md bg-secondary px-6 py-3 text-card-foreground ring-2 ring-input">
        <h2 className="mb-4 text-xl font-semibold text-primary">
          Trending Blogs
        </h2>
        <ul className="space-y-2">
          {trendingBlogs
            ?.slice(0, 5)
            ?.map((blog) => <RenderTrending post={blog} key={blog._id} />)}
        </ul>
      </div>
      <div className="w-3/4 rounded-md bg-card bg-secondary/90 px-6 py-3 ring-2 ring-input">
        <h2 className="mb-4 text-xl font-semibold text-primary">
          Popular Users
        </h2>
        <ul className="space-y-2">
          {popularUsers?.slice(0, 4)?.map((user) => (
            <li key={user.username}>
              <Link
                to={`/users/${user._id}`}
                className="flex items-center space-x-2"
              >
                <img
                  src={user.photo}
                  alt={user.username}
                  className="h-8 w-8 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-sm text-primary/90">
                    @{user.username}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {user?.occupation || 'Ananymous'}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
