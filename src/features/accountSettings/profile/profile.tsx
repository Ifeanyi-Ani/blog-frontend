import { IUser } from '../../../types/type';

interface ProfileProps {
  user: Partial<IUser>;
  children: React.ReactNode;
}
export const Profile = ({ user, children }: ProfileProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <img
          src={user?.photo}
          alt="Profile"
          className="h-24 w-24 rounded-full border-4 border-electricCyan-500"
        />
        <div>
          <h2 className="text-2xl font-bold text-electricCyan-300">
            {user?.username}
          </h2>
          <p className="text-neonPink-300">Full-stack Developer</p>
        </div>
      </div>
      {children}
    </div>
  );
};
