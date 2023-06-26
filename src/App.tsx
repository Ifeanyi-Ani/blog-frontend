import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import { Home } from "./pages/Home";
import { Preview } from "./pages/Preview";
// import  DataProvider  from "./context/ContextData";

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <>
        {/* <DataProvider> */}
        <BrowserRouter>
          <Container fluid className='page-wrapper p-0'>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/blog/:id' element={<Preview />} />
            </Routes>
          </Container>
        </BrowserRouter>
        {/* </DataProvider> */}
      </>
    );
  }
}

export default App;
