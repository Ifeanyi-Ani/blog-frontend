import "bootstrap/dist/css/bootstrap.min.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Profile from "./pages/Profile";
import PostPreview from "./pages/Post-Preview";
import Layout from "./pages/Layout.tsx";

const App = () => {
  const Home = lazy(() => import("./pages/Home"));
  const Preview = lazy(() => import("./pages/Preview"));
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={null}>
                  <Home />
                </Suspense>
              }
            />

            <Route path="/post/:id" element={<PostPreview />} />

            <Route
              path="/blog/:username"
              element={
                <Suspense fallback={<div>...Loading</div>}>
                  <Preview />
                </Suspense>
              }
            />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;
