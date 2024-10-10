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
    <div className="w-full rounded-lg bg-card p-6 shadow-lg">
      <h2 className="mb-6 flex items-center text-2xl font-bold text-primary">
        {showTrending ? (
          <>
            <TrendingUp className="mr-2" />
            Trending Blogs
          </>
        ) : (
          <>
            <Users className="mr-2" />
            Popular Users
          </>
        )}
      </h2>
      {showTrending ? (
        <div className="space-y-4">
          {trendingBlogs?.slice(0, 5).map((blog) => (
            <div
              key={blog._id}
              className="rounded-lg border border-border bg-card p-4 transition-colors duration-300 hover:bg-accent"
            >
              <Link
                to={`/posts/${blog._id}`}
                className="font-semibold text-primary"
              >
                {blog.title}
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">
                by {blog.author.username}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {blog.likes.length} likes
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {popularUsers?.slice(0, 4).map((user) => (
            <Link
              key={user._id}
              className="flex items-center rounded-lg border border-border bg-card p-4 transition-colors duration-300 hover:bg-accent"
              to={`/users/${user._id}`}
            >
              <img
                src={user.photo}
                alt={user.username}
                className="mr-3 h-10 w-10 rounded-full border-2 border-primary"
              />
              <div>
                <h3 className="font-semibold text-primary">{user.username}</h3>
                <p className="text-xs text-muted-foreground">
                  {user.followers?.length} followers
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
