import { IUser } from '../../../types/type';

interface ProfileProps<T extends IUser> {
  user: T;
  children: React.ReactNode;
}
export function Profile<T extends IUser>({ user, children }: ProfileProps<T>) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
        <div className="relative">
          <img
            src={user?.photo}
            alt="Profile"
            className="h-32 w-32 rounded-full border-4 border-primary object-cover shadow-lg"
          />
          <div className="absolute -bottom-2 -right-2 rounded-full bg-secondary p-2 text-secondary-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-bold text-foreground">
            {user?.username}
          </h2>
          <p className="text-lg text-muted-foreground">Full-stack Developer</p>
          <div className="mt-2 flex justify-center space-x-2 sm:justify-start">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              React
            </span>
            <span className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary">
              Node.js
            </span>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-muted p-6 shadow-inner">{children}</div>
    </div>
  );
}
