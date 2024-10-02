import React, { useState, useEffect } from "react";
import { TrendingUp, Users, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

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
  followers: number;
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
    <div className="absolute top-0 left-0 ">
      <div className="fixed w-80 bg-customBlue-900 backdrop-blur-sm p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-neonPink-400 to-electricCyan-400 flex items-center">
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
                className="bg-customBlue-900/50 p-4 rounded-lg hover:bg-customBlue-800/50 transition-colors duration-300 border border-neonPink-500/10 hover:border-neonPink-500/30"
              >
                <Link
                  to={`/posts/${blog._id}`}
                  className="text-neonPink-300 font-semibold"
                >
                  {blog.title}
                </Link>
                <p className="text-electricCyan-300 text-sm mt-1">
                  by {blog.author.username}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-electricCyan-400 text-xs">
                    {blog.likes.length} likes
                  </span>
                  <ChevronRight className="text-electricCyan-400 h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {popularUsers?.slice(0, 4).map((user) => (
              <Link
                key={user._id}
                className="flex items-center bg-customBlue-900/50 p-4 rounded-lg hover:bg-customBlue-800/50 transition-colors duration-300 border border-neonPink-500/10 hover:border-neonPink-500/30"
                to={`/users/${user._id}`}
              >
                <img
                  src={user.photo}
                  alt={user.username}
                  className="w-10 h-10 rounded-full mr-3 border-2 border-neonPink-500"
                />
                <div>
                  <h3 className="text-neonPink-300 font-semibold">
                    {user.username}
                  </h3>
                  <p className="text-electricCyan-300 text-xs">
                    {user.followers.length} followers
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
