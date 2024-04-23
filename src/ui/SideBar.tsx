import { Container } from "react-bootstrap";

import { Footer } from "./Footer";
import CardItem from "../features/posts/CardItem";

interface SideBarProps {
  children: React.ReactNode;
  header: string;
  title: string;
  Src: string;
  cardHeader: string;
}

export function SideBar(props: SideBarProps) {
  const { children, header, title, Src, cardHeader } = props;
  return (
    <div className="sideBar">
      {children}

      <div className="text-light navbarbs fs-3 nameCon mt-3 mb-3 p-2">
        {cardHeader}
      </div>
      <CardItem />

      <div className="text-light navbarbs fs-3 nameCon mt-3 p-2">{header}</div>

      <Container fluid className="mt-3 footerStick">
        <div className="text-light">{title}</div>
        <img src={Src} style={{ width: "80%", height: "400px" }} />
        <Footer />
      </Container>
    </div>
  );
}
