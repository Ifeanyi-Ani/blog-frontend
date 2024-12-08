import { AlertCircle } from 'lucide-react';

interface NotFoundStateProps {
  title?: string;
  message?: string;
}
export const NotFoundState = ({ title, message }: NotFoundStateProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="max-w-md rounded-lg border border-primary p-6">
        <div className="mb-4 flex items-center text-primary/95">
          <AlertCircle size={24} className="mr-2" />
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};
