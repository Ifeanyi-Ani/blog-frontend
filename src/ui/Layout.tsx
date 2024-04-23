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
    <Container fluid className="page-wrapper p-0">
      <Navbar />
      <div className="d-flex justify-content-center gap-3 pt-3 homeHead">
        <Main>
          <Outlet />
        </Main>
        <SideBar
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
