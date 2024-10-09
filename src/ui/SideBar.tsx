import * as React from 'react';
import { useState, useEffect } from 'react';
import { TrendingUp, Users, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Blog {
  _id: string;
  title: string;
  author: {
    username: string;
  };
  likes: string[];
}

interface User {
  _id: string;
  username: string;
  photo: string;
  followers: string[];
}

interface SidebarProps {
  trendingBlogs: Blog[];
  popularUsers: User[];
}

const Sidebar: React.FC<SidebarProps> = ({ trendingBlogs, popularUsers }) => {
  const [showTrending, setShowTrending] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTrending((prev) => !prev);
    }, 10000); // Switch every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute left-0 top-0">
      <div className="fixed w-80 rounded-xl bg-customBlue-900 p-6 shadow-xl backdrop-blur-sm">
        <h2 className="mb-6 flex items-center bg-gradient-to-r from-neonPink-400 to-electricCyan-400 bg-clip-text text-2xl font-bold text-transparent">
          {showTrending ? (
            <>
              <TrendingUp className="mr-2 text-neonPink-400" />
              Trending Blogs
            </>
          ) : (
            <>
              <Users className="mr-2 text-electricCyan-400" />
              Popular Users
            </>
          )}
        </h2>
        {showTrending ? (
          <div className="space-y-4">
            {trendingBlogs?.slice(0, 5).map((blog) => (
              <div
                key={blog._id}
                className="rounded-lg border border-neonPink-500/10 bg-customBlue-900/50 p-4 transition-colors duration-300 hover:border-neonPink-500/30 hover:bg-customBlue-800/50"
              >
                <Link
                  to={`/posts/${blog._id}`}
                  className="font-semibold text-neonPink-300"
                >
                  {blog.title}
                </Link>
                <p className="mt-1 text-sm text-electricCyan-300">
                  by {blog.author.username}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-electricCyan-400">
                    {blog.likes.length} likes
                  </span>
                  <ChevronRight className="h-4 w-4 text-electricCyan-400" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {popularUsers?.slice(0, 4).map((user) => (
              <Link
                key={user._id}
                className="flex items-center rounded-lg border border-neonPink-500/10 bg-customBlue-900/50 p-4 transition-colors duration-300 hover:border-neonPink-500/30 hover:bg-customBlue-800/50"
                to={`/users/${user._id}`}
              >
                <img
                  src={user.photo}
                  alt={user.username}
                  className="mr-3 h-10 w-10 rounded-full border-2 border-neonPink-500"
                />
                <div>
                  <h3 className="font-semibold text-neonPink-300">
                    {user.username}
                  </h3>
                  <p className="text-xs text-electricCyan-300">
                    {user.followers?.length} followers
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
