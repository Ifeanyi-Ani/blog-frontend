import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Users, Book, Award } from 'lucide-react';

import { useGetUserQuery } from '../features/users/userSlice';
import { CustomPageError } from '../ui/shared/CustomPageError';
import { LoadingState } from '../ui/shared/LoadingState';
import { NotFoundState } from '../ui/shared/NotFoundState';

const UserProfile: React.FC = () => {
  const { id } = useParams();
  const { data: user, isLoading, error } = useGetUserQuery(id);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <CustomPageError title="Error Loading Profile" error={error} />;
  }

  if (!user) {
    return (
      <NotFoundState
        title="User Not Found"
        message="We couldn't find the user you're looking for. They might
          have venture into another dimension."
      />
    );
  }

  return (
    <>
      <div className="flex flex-col items-center space-y-6 md:flex-row md:items-start md:space-x-8 md:space-y-0">
        <img
          src={user.photo}
          alt={user.username}
          className="h-40 w-40 rounded-full border-4 border-primary shadow-lg shadow-primary/50"
        />
        <div className="flex-1 text-center md:text-left">
          <h5 className="mb-2 text-4xl font-bold text-primary/90">
            @{user.username}
          </h5>
          <p className="mb-4 text-muted-foreground">
            {user.email.toLowerCase()}
          </p>
          <div className="mb-6 flex items-center justify-center space-x-4 md:justify-start">
            <span className="text-primary">
              <Users size={18} className="mr-2 inline" />
              {user.followers.length} followers
            </span>
            <button className="rounded-full bg-primary px-4 py-2 font-bold text-primary-foreground transition-colors duration-200 hover:bg-primary/90">
              Follow
            </button>
          </div>
          <p className="mb-6 text-muted-foreground">
            Full-stack developer passionate about clean code and innovative
            solutions. Always learning, always coding.
          </p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-card p-4 shadow-md shadow-accent transition-all duration-200 hover:shadow-md hover:shadow-primary/20">
          <h2 className="mb-2 text-2xl font-semibold text-primary/70">
            Recent Posts
          </h2>
          <ul className="space-y-2">
            {user?.posts?.map((post, index) => (
              <li
                key={index}
                className="flex items-center text-card-foreground"
              >
                <Book size={16} className="mr-2" />
                <span>{post.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-card p-4 shadow-md shadow-accent transition-all duration-200 hover:shadow-md hover:shadow-primary/20">
          <h2 className="mb-2 text-2xl font-semibold text-primary/70">
            Achievements
          </h2>
          <ul className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <li
                key={index}
                className="flex items-center text-card-foreground"
              >
                <Award size={16} className="text-warning mr-2" />
                <span>comming soon</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
