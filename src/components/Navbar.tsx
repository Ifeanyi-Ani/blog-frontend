/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import {
  Container,
  Nav,
  Stack,
  Button,
  Navbar as NavbarBs,
  Modal,
  NavDropdown,
} from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import googleLogo from "../assets/googleLogo.jpg";
import appleLogo from "../assets/appleLogo.jpg";
import emailLogo from "../assets/messLogo.jpg";
import SignupWithEmail from "./SignupWithEmail";
import { isLoggedin } from "../redux/user/user.action";
import { ProfileAction } from "./ProfileAction";

const Navbar = function ({ hidden, isLoggedin }) {
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
  function handlePrevModal() {
    setisOpen(false);
    setShow(true);
  }
  function handleLogOut(e) {
    e.stopPropagation();
    isLoggedin();
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
          <NavbarBs.Toggle aria-controls='basic-navbar-nav' />
          <NavbarBs.Collapse id='basic-navbar-nav'>
            <Nav
              className='ms-auto my-2 my-lg-0'
              style={{ maxHeight: "100px" }}
            >
              {hidden ? (
                <>
                  <Stack direction='horizontal' gap={3}>
                    <Button variant='info'>Click for frogs</Button>
                    <Button
                      variant='success'
                      onClick={() => handleModal1(true)}
                    >
                      Log in
                    </Button>
                  </Stack>
                </>
              ) : (
                <>
                  <Nav.Link href='#home'>
                    <i className='bi bi-house-fill'></i>
                  </Nav.Link>
                  <Nav.Link href='#link'>
                    <i className='bi bi-compass'></i>
                  </Nav.Link>
                  <Nav.Link href='#link'>
                    <i className='bi bi-gift-fill'></i>
                  </Nav.Link>
                  <Nav.Link href='#link'>
                    <i className='bi bi-envelope-fill'></i>
                  </Nav.Link>
                  <Nav.Link href='#link'>
                    <i className='bi bi-emoji-laughing-fill'></i>
                  </Nav.Link>
                  <Nav.Link href='#link'>
                    <i className='bi bi-lightning-charge-fill'></i>
                  </Nav.Link>
                  <NavDropdown
                    title={<i className='bi bi-person-fill'></i>}
                    id='basic-nav-dropdown'
                    className='dropDownConfig'
                  >
                    <NavDropdown.Item as={Button} className='secBreak'>
                      <div>Account</div>
                      <div
                        role='button'
                        className='btnConfig'
                        onClick={e => handleLogOut(e)}
                      >
                        Log out
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href='#'
                      className='d-flex justify-content-between'
                    >
                      <div className='leftCol'>
                        <div className='offSetImg'>
                          <i className='bi bi-gift-fill'></i>
                        </div>
                        Likes
                      </div>
                      <div>2</div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href='#action/3.2'
                      className='d-flex justify-content-between'
                    >
                      <div className='leftCol'>
                        <div className='offSetImg'>
                          <i className='bi bi-gift-fill'></i>
                        </div>
                        Following
                      </div>
                      <div>31</div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href='#action/3.2'
                      className='d-flex justify-content-between'
                    >
                      <div className='leftCol'>
                        <div className='offSetImg'>
                          <i className='bi bi-gift-fill'></i>
                        </div>
                        Settings
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href='#action/3.2'
                      className='d-flex justify-content-between'
                    >
                      <div className='leftCol'>
                        <div className='offSetImg'>
                          <i className='bi bi-gift-fill'></i>
                        </div>
                        Domains
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href='#action/3.2'
                      className='d-flex justify-content-between'
                    >
                      <div className='leftCol'>
                        <div className='offSetImg'>
                          <i className='bi bi-gift-fill'></i>
                        </div>
                        Go Ad-Free
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href='#action/3.2'
                      className='d-flex justify-content-between'
                    >
                      <div className='leftCol'>
                        <div className='offSetImg'>
                          <i className='bi bi-gift-fill'></i>
                        </div>
                        Payments & purchase
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href='#action/3.2'
                      className='d-flex justify-content-between'
                    >
                      <div className='leftCol'>
                        <div className='offSetImg'>
                          <i className='bi bi-gift-fill'></i>
                        </div>
                        Gifts
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href='#action/3.2'
                      className='d-flex justify-content-between'
                    >
                      <div className='leftCol'>
                        <div className='offSetImg'>
                          <i className='bi bi-gift-fill'></i>
                        </div>
                        What's new
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href='#action/3.2'
                      className='d-flex justify-content-between'
                    >
                      <div className='leftCol'>
                        <div className='offSetImg'>
                          <i className='bi bi-gift-fill'></i>
                        </div>
                        Help
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href='#action/3.2'
                      className='d-flex justify-content-between'
                    >
                      <div className='leftCol'>
                        <div className='offSetImg'>
                          <i className='bi bi-gift-fill'></i>
                        </div>
                        Keyboard shortcuts
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href='#action/3.2'
                      className='d-flex justify-content-between'
                    >
                      <div className='leftCol'>
                        <div className='offSetImg'>
                          <i className='bi bi-gift-fill'></i>
                        </div>
                        Change palette
                      </div>
                    </NavDropdown.Item>

                    <NavDropdown.Item href='#action/3.3' className='secBreak'>
                      <div>Blogs</div>
                      <div role='button'>+New</div>
                    </NavDropdown.Item>

                    <NavDropdown.Item href='#action/3.4'>
                      <div className='offSetImg'>
                        <i className='bi bi-gift-fill'></i>
                      </div>
                      <ProfileAction />
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href='#link'>
                    <i className='bi bi-pencil-fill'></i>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </NavbarBs.Collapse>
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
      <SignupWithEmail
        isOpen={isOpen}
        handleModal2={() => handleModal2(false)}
        handlePrevModal={handlePrevModal}
        closeModal={() => setisOpen(false)}
      />
    </>
  );
};
const mapStateToProps = ({ isLoggedin: { hidden } }) => ({
  hidden,
});
const mapDispatchToProps = dispatch => ({
  isLoggedin: () => dispatch(isLoggedin()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
