import { Loader } from 'lucide-react';

export const LoadingState = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex justify-center flex-col items-center">
        <Loader className="h-12 w-12 animate-spin text-primary" />
        <div className="text-lg font-semibold text-primary">
          Loading...
        </div>
      </div>
    </div>
  );
};
