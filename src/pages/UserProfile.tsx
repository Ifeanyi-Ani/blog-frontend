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
          className="h-40 w-40 rounded-full border-4 border-electricCyan-500 shadow-lg shadow-electricCyan-500/50"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="mb-2 bg-gradient-to-r from-neonPink-400 to-electricCyan-400 bg-clip-text text-4xl font-bold text-transparent">
            {user.username}
          </h1>
          <p className="mb-4 text-electricCyan-300">
            @{user.username.toLowerCase()}
          </p>
          <div className="mb-6 flex items-center justify-center space-x-4 md:justify-start">
            <span className="text-neonPink-300">
              <Users size={18} className="mr-2 inline" />
              {user.followers.length} followers
            </span>
            <button className="rounded-full bg-electricCyan-600 px-4 py-2 font-bold text-customBlue-900 transition-colors duration-200 hover:bg-electricCyan-500">
              Follow
            </button>
          </div>
          <p className="mb-6 text-customBlue-100">
            Full-stack developer passionate about clean code and innovative
            solutions. Always learning, always coding.
          </p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-customBlue-800 p-4 transition-all duration-200 hover:shadow-md hover:shadow-neonPink-500/20">
          <h2 className="mb-2 text-2xl font-semibold text-neonPink-300">
            Recent Posts
          </h2>
          <ul className="space-y-2">
            {[
              'Optimizing React Renders',
              'GraphQL vs REST',
              'Dockerizing Your App',
            ].map((post, index) => (
              <li
                key={index}
                className="flex items-center text-electricCyan-200"
              >
                <Book size={16} className="mr-2" />
                <span>{post}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-customBlue-800 p-4 transition-all duration-200 hover:shadow-md hover:shadow-neonPink-500/20">
          <h2 className="mb-2 text-2xl font-semibold text-neonPink-300">
            Achievements
          </h2>
          <ul className="space-y-2">
            {[
              'Galactic Contributor',
              'Nova Creator',
              'Starlight Innovator',
            ].map((achievement, index) => (
              <li
                key={index}
                className="flex items-center text-electricCyan-200"
              >
                <Award size={16} className="mr-2 text-customGold-400" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
