import Container from "react-bootstrap/esm/Container";
import { Outlet } from "react-router-dom";

import theme from "../assets/theme.jpg";
import advert from "../assets/advert.png";
import Navbar from "./Navbar";
import Main from "./Main";
import { SideBar } from "./SideBar";
import CardInfo from "../features/users/CardInfo";

function Layout() {
  return (
    <Container
      fluid
      className="grid grid-rows-[auto_1fr] h-screen bg-customBlue-950 text-stone-300"
    >
      <Navbar />
      <div className="overflow-hidden grid md:grid-cols-12 grid-cols-[none] w-full max-w-screen-2xl mx-auto h-full">
        <Main className="md:col-start-2 md:col-end-9 h-full overflow-y-scroll custom-scrollbar custom-scrollbar-thin">
          <Outlet />
        </Main>
        <SideBar
          className="col-start-9 col-end-12 hidden md:block overflow-y-scroll no-scrollbar"
          cardHeader="Radar"
          header="Sponsored"
          title="Advertisement"
          Src={advert}
        >
          <CardInfo />
          <div
            className="mySecondaryb mt-3 d-flex gap-3 p-2 align-items-center"
            style={{ cursor: "pointer" }}
          >
            <div className="imgCon">
              <img src={theme} alt="themeLogo" />
            </div>
            <div className="nameCon text-light">Change palete</div>
          </div>
        </SideBar>
      </div>
    </Container>
  );
}

export default Layout;
