import { useState } from "react";
import {
  Container,
  Nav,
  Form,
  Stack,
  Button,
  Navbar as NavbarBs,
  Modal,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import googleLogo from "../assets/googleLogo.jpg";
import appleLogo from "../assets/appleLogo.jpg";
import emailLogo from "../assets/messLogo.jpg";

export function Navbar() {
  const [show, setShow] = useState<boolean>(false);
  const [isOpen, setisOpen] = useState<boolean>(false);

  function handleModal1(val: boolean) {
    setShow(val);
  }
  function handleModal2(val: boolean) {
    setisOpen(val);
  }
  function modalAct() {
    setisOpen(true);
    setShow(false);
  }
  return (
    <>
      <NavbarBs className='navbarbs'>
        <Container>
          <NavbarBs.Brand to='/' className='link-light fs-1' as={NavLink}>
            t
          </NavbarBs.Brand>
          <form>
            <div className='searchItem'>
              <i className='bi bi-search'></i>
              <input type='text' placeholder='Search Tumblr' />
            </div>
          </form>
          <Nav className='ms-auto my-2 my-lg-0' style={{ maxHeight: "100px" }}>
            <Stack direction='horizontal' gap={3}>
              <Button variant='info'>Click for frogs</Button>
              <Button variant='success' onClick={() => handleModal1(true)}>
                Log in
              </Button>
            </Stack>
          </Nav>
        </Container>
      </NavbarBs>
      <Modal centered show={show} onHide={() => handleModal1(false)}>
        <Modal.Header className='d-flex justify-content-center border-0 modalPrimary'>
          <Modal.Title>tumblr</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalPrimary text-center'>
          Welcome to your corner of the internet. You'll never be bored again.
          <div className='text-center my-3'>Sign up or log in</div>
          <Stack
            className='m-auto'
            direction='vertical'
            gap={2}
            style={{ width: "70%" }}
          >
            <Button variant='light' className='rounded-5 modalBtn'>
              <div className='imgCon'>
                <img src={googleLogo} alt='logo' />
              </div>
              <div className='nameCon'>Continue with Google</div>
            </Button>
            <Button variant='light' className='rounded-5 modalBtn'>
              <div className='imgCon'>
                <img src={appleLogo} alt='logo' />
              </div>
              <div className='nameCon'>Continue with Apple</div>
            </Button>
            <Button
              variant='light'
              className='rounded-5 modalBtn'
              onClick={modalAct}
            >
              <div className='imgCon'>
                <img src={emailLogo} alt='logo' />
              </div>
              <div className='nameCon'>Continue with email</div>
            </Button>
            <div className='text-warning' style={{ cursor: "pointer" }}>
              Coming from Twitter? Sign up
            </div>
          </Stack>
        </Modal.Body>
      </Modal>
    </>
  );
}
