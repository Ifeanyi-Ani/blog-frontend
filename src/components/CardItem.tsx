import { Card, Stack } from "react-bootstrap";
import avater from "../assets/avater.jpg";
import shareLogo from "../assets/share.jpg";
import reloadLogo from "../assets/reload.jpg";
import likeLogo from "../assets/likes.jpg";
import content1 from "../assets/content1.png";
export function CardItem() {
  return (
    <Card>
      <Card.Header
        style={{
          position: "relative",
          borderBottom: "none",
          paddingLeft: "55px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "30px",
            transform: "translate(-50%, -50%)",
            width: "35px",
            height: "35px",
          }}
          role='button'
        >
          <img
            src={avater}
            alt='avater'
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <span role='button'>todayontumblr </span>
        <span className='text-primary' role='button'>
          follow
        </span>
        <div
          role='button'
          className='d-flex justify-content-center align-items-center fs-4'
          style={{
            position: "absolute",
            top: "50%",
            right: "2px",
            transform: "translate(-50%, -50%)",
          }}
        >
          ...
        </div>
      </Card.Header>
      <Card.Body className='p-0'>
        <Card.Title>Wednesday, June 21.</Card.Title>
        <Card.Img src={content1} alt='content' />
        <Card.Text className='ps-3 d-flex gap-1 flex-wrap'>
          <span>#today on tumblr</span>
          <span>#tubme</span>
          <span>#today on tumblr</span>
          <span>#tubme</span>
        </Card.Text>
      </Card.Body>
      <Card.Footer style={{ borderTop: "none" }} className='d-flex'>
        <div
          className='border rounded-5 d-flex justify-content-center align-items-center p-2'
          role='button'
        >
          2,440 notes
        </div>
        <Stack className='footer-img ms-auto gap-3' direction='horizontal'>
          <img src={shareLogo} alt='logo' role='button' />
          <img src={reloadLogo} alt='logo' role='button' />
          <img src={likeLogo} alt='logo' role='button' />
        </Stack>
      </Card.Footer>
    </Card>
  );
}
