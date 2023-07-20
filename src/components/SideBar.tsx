import { Container } from "react-bootstrap";

import { Footer } from "./Footer";
import { CardItem } from "./CardItem";

interface SideBarProps {
  children: any;
  header: string;
  title: string;
  Src: string;
  cardHeader: string;
}

export function SideBar({
  children,
  header,
  title,
  Src,
  cardHeader,
}: SideBarProps) {
  return (
    <div className='sideBar'>
      {children}

      <div className='text-light navbarbs fs-3 nameCon mt-3 mb-3 p-2'>
        {cardHeader}
      </div>
      <CardItem />

      <div className='text-light navbarbs fs-3 nameCon mt-3 p-2'>{header}</div>

      <Container fluid className='mt-3 footerStick'>
        <div className='text-light'>{title}</div>
        <img src={Src} style={{ width: "80%", height: "400px" }} />
        <Footer />
      </Container>
    </div>
  );
}
