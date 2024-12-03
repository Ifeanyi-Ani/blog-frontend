import { Navigate, Outlet, useParams } from 'react-router-dom';

import { useAppSelector } from '../app/hook';

export default function SettingsLayout() {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { userId } = useParams();

  if (currentUser?.id !== userId) {
    return <Navigate to="/" replace />;
  }
  return (
    <main className="container mx-auto min-h-screen rounded-md p-0 sm:p-2">
      <div className="h-full w-full overflow-hidden">
        <Outlet />
      </div>
    </main>
  );
}
