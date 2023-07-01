import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Container from "react-bootstrap/esm/Container";
import Home from "./pages/Home";
import { Preview } from "./pages/Preview";

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <>
        <BrowserRouter>
          <Container fluid className='page-wrapper p-0'>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/blog/:id' element={<Preview />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
