import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";

import Profile from "./pages/Profile";
import PostPreview from "./pages/Post[id].tsx";
import Layout from "./ui/Layout.tsx";
import Home from "./pages/Home";
import Preview from "./pages/Preview";

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
          path: "/posts/:id",
          element: <PostPreview />,
        },
        {
          path: "/:user",
          element: <div>Profile page</div>,
        },
      ],
    },
  ]);
  return <RouterProvider router={route} />;
};

export default App;
