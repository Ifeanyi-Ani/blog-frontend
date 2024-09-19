import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";

import Profile from "./pages/Profile";
import PostPreview from "./pages/Post[id].tsx";
import Layout from "./ui/Layout.tsx";
import Home from "./pages/Home";
import Preview from "./pages/Preview";
import { Children } from "react";
import LoginForm from "./features/auth/LoginForm.tsx";
import AuthLayout from "./ui/AuthLayout.tsx";
import LoginPage from "./pages/Login.tsx";
import SignupPage from "./pages/Signup.tsx";
import CreatePostPage from "./pages/CreatePost.tsx";

const App = () => {
  const route = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <div>Someting went wrong</div>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/new",
          element: <CreatePostPage />,
        },
        {
          path: "/posts/:id",
          element: <PostPreview />,
        },
        {
          path: "/:user",
          element: <div>Profile page</div>,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      errorElement: <div>Something went wrong</div>,
      children: [
        {
          path: "/auth/login",
          element: <LoginPage />,
        },
        {
          path: "/auth/register",
          element: <SignupPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={route} />;
};

export default App;
