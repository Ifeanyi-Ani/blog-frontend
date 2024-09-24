import React from "react";
import { useParams } from "react-router-dom";
import { User, Settings, Users, Book, Award, ChevronRight } from "lucide-react";
import { useGetUserQuery } from "../features/users/userSlice";
import { CustomPageError } from "../ui/shared/CustomPageError";
import { LoadingState } from "../ui/shared/LoadingState";
import { NotFoundState } from "../ui/shared/NotFoundState";

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
    <div className="min-h-screen bg-gradient-to-br from-customBlue-950 via-customBlue-900 to-customBlue-800 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-customBlue-900 rounded-xl p-8 shadow-xl border border-neonPink-700/30">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <img
              src={user.photo}
              alt={user.username}
              className="w-40 h-40 rounded-full border-4 border-electricCyan-500 shadow-lg shadow-electricCyan-500/50"
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-neonPink-400 to-electricCyan-400">
                {user.username}
              </h1>
              <p className="text-electricCyan-300 mb-4">
                @{user.username.toLowerCase()}
              </p>
              <div className="flex justify-center md:justify-start items-center space-x-4 mb-6">
                <span className="text-neonPink-300">
                  <Users size={18} className="inline mr-2" />
                  {user.followers} followers
                </span>
                <button className="bg-electricCyan-600 hover:bg-electricCyan-500 text-customBlue-900 font-bold py-2 px-4 rounded-full transition-colors duration-200">
                  Follow
                </button>
              </div>
              <p className="text-customBlue-100 mb-6">
                Full-stack developer passionate about clean code and innovative
                solutions. Always learning, always coding.
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-customBlue-800 rounded-lg p-4 hover:shadow-md hover:shadow-neonPink-500/20 transition-all duration-200">
              <h2 className="text-2xl font-semibold mb-2 text-neonPink-300">
                Recent Posts
              </h2>
              <ul className="space-y-2">
                {[
                  "Optimizing React Renders",
                  "GraphQL vs REST",
                  "Dockerizing Your App",
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
            <div className="bg-customBlue-800 rounded-lg p-4 hover:shadow-md hover:shadow-neonPink-500/20 transition-all duration-200">
              <h2 className="text-2xl font-semibold mb-2 text-neonPink-300">
                Achievements
              </h2>
              <ul className="space-y-2">
                {[
                  "Galactic Contributor",
                  "Nova Creator",
                  "Starlight Innovator",
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

          <div className="mt-8 space-y-4">
            <button className="w-full bg-customBlue-800 hover:bg-customBlue-700 text-electricCyan-300 font-semibold py-3 px-4 rounded-lg flex justify-between items-center transition-colors duration-200">
              <span className="flex items-center">
                <User size={18} className="mr-2" />
                Edit Profile
              </span>
              <ChevronRight size={18} />
            </button>
            <button className="w-full bg-customBlue-800 hover:bg-customBlue-700 text-electricCyan-300 font-semibold py-3 px-4 rounded-lg flex justify-between items-center transition-colors duration-200">
              <span className="flex items-center">
                <Settings size={18} className="mr-2" />
                Account Settings
              </span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
