import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './ui/Layout.tsx';
import Home from './pages/Home';
import AuthLayout from './ui/AuthLayout.tsx';
import LoginPage from './pages/Login.tsx';
import SignupPage from './pages/Signup.tsx';
import CreatePostPage from './pages/CreatePost.tsx';
import UserProfile from './pages/UserProfile.tsx';
import PostPreview from './pages/Post[id].tsx';
import AccountSettings from './pages/AccountSettings.tsx';
import MainLayout from './ui/MainLayout.tsx';
import SettingsLayout from './ui/SettingLayout.tsx';

const App = () => {
  const route = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <div>Someting went wrong</div>,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              path: '/',
              element: <Home />,
            },
            {
              path: '/new',
              element: <CreatePostPage />,
            },
            {
              path: '/users/:id',
              element: <UserProfile />,
            },
            {
              path: '/posts/:postId',
              element: <PostPreview />,
            },
          ],
        },
        {
          element: <SettingsLayout />,
          children: [
            {
              path: '/settings/:userId',
              element: <AccountSettings />,
            },
          ],
        },
      ],
    },
    {
      path: '/auth',
      element: <AuthLayout />,
      errorElement: <div>Something went wrong</div>,
      children: [
        {
          path: '/auth/login',
          element: <LoginPage />,
        },
        {
          path: '/auth/register',
          element: <SignupPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={route} />;
};

export default App;
