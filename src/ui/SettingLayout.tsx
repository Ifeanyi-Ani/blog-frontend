import { Navigate, Outlet, useParams } from 'react-router-dom';

import { useAppSelector } from '../app/hook';

export default function SettingsLayout() {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { userId } = useParams();

  if (currentUser?.id !== userId) {
    return <Navigate to="/" replace />;
  }
  return (
    <main className="flex-grow overflow-y-auto">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </main>
  );
}
