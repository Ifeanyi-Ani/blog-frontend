import { BrowserRouter, Routes, Route } from "react-router-dom";

import Profile from "./pages/Profile";
import PostPreview from "./pages/Post[id].tsx";
import Layout from "./ui/Layout.tsx";
import Home from "./pages/Home";
import Preview from "./pages/Preview";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostPreview />} />
            <Route path="/blog/:username" element={<Preview />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
