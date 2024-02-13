import Container from "react-bootstrap/esm/Container";
import { ReactNode, useContext, useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";

import Navbar from "../components/Navbar";
import { SideBar } from "../components/SideBar";
import CardInfo from "../components/CardInfo";
import theme from "../assets/theme.jpg";
import advert from "../assets/advert.png";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { getPosts } from "../features/posts/postSlice";
import { ContextData } from "../contexts/contextData";

function Layout({ children }: { children: React.ReactElement }): ReactNode {
  const { currentUser } = useContext(ContextData);
  const posts = useAppSelector(getPosts);

  const [toggle, setToggle] = useState<boolean>(false);
  function handleToggle(val: boolean) {
    setToggle(val);
  }
  return (
    <Container fluid className="page-wrapper p-0">
      <Navbar />
      <div className="d-flex justify-content-center gap-3 pt-3 homeHead">
        <main className={`${toggle === true ? "gridView-w" : "listView-w"}`}>
          <Stack direction="horizontal" gap={3}>
            <Button variant="outline" className="text-light">
              Today
            </Button>
            <Button variant="outline" className="text-light">
              Trending
            </Button>
            <Button variant="outline" className="text-light">
              Staff Picks
            </Button>
            <Button variant="outline" className="text-light">
              Answer Time
            </Button>
            <Button variant="outline" className="text-light">
              More
            </Button>

            <div className="d-flex ms-auto gap-1 view-cnt">
              <div>
                <i
                  className={`bi bi-grid-1x2-fill ${toggle === true ? "actv" : ""}`}
                  role="button"
                  onClick={() => handleToggle(true)}
                ></i>
              </div>
              <div>
                <i
                  className={`bi bi-distribute-vertical ${
                    toggle === false ? "actv" : ""
                  }`}
                  onClick={() => handleToggle(false)}
                  role="button"
                ></i>
              </div>
            </div>
          </Stack>
          <div
            className={`mansoryLayout ${toggle == true ? "gridView" : "listView"}`}
          >
            {children}
          </div>
        </main>
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
