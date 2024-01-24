import "bootstrap/dist/css/bootstrap.min.css";
import API from "./apis/baseUrl.ts";
import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Container from "react-bootstrap/esm/Container";
import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Preview from "./pages/Preview";
// import Dashboard from "./pages/admin/Dashboard";
import AdminNav from "./pages/admin/AdminNav";
import Users from "./pages/admin/Users";
import Posts from "./pages/admin/Posts";
import Profile from "./pages/Profile";
import { useAppDispatch, useAppSelector } from "./app/hook";
import { fetchPosts } from "./features/posts/postSlice.ts";

import PostList from "./components/PostList.tsx";

const App = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.posts.status);

  useEffect(() => {
    if (status === "loading") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);
  // const Navbar = lazy(() => import("./components/Navbar"));
  const Home = lazy(() => import("./pages/Home"));
  const Preview = lazy(() => import("./pages/Preview"));
  const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
  // const AdminNav = () => import("./pages/admin/AdminNav");
  // const Users = () => import("./pages/admin/Users");
  // const Posts = () => import("./pages/admin/Posts");
  // const Profile = () => import("./pages/Profile");
  return (
    <>
      <BrowserRouter>
        <Container fluid className="page-wrapper p-0">
          {/* <Navbar /> */}
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<div>...Loading</div>}>
                  <Home />
                </Suspense>
              }
            />

            <Route
              path="/blog/:username"
              element={
                <Suspense fallback={<div>...Loading</div>}>
                  <Preview />
                </Suspense>
              }
            />
            <Route path="/profile/:id" element={<Profile />} />
            <Route
              path="/admin"
              element={
                <Suspense fallback={<div>...Loading</div>}>
                  <AdminNav />
                </Suspense>
              }
            >
              <Route
                index
                element={
                  <Suspense fallback={<div>...Loading</div>}>
                    <Dashboard />
                  </Suspense>
                }
              />
              <Route
                path="posts"
                element={
                  <Suspense fallback={<div>...Loading</div>}>
                    <Posts />
                  </Suspense>
                }
              />
              <Route
                path="users"
                element={
                  <Suspense fallback={<div>...Loading</div>}>
                    <Users />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
};

export default App;
