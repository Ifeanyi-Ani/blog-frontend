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
import { Link, NavLink } from "react-router-dom";
import { postModal } from "../redux/modals/modals.actions";
import ProfileAction from "./ProfileAction";
import CreatePost from "./CreatePost";
import { auth, logOut } from "../redux/user/user.action";
import { useNavigate } from "react-router-dom";
import Avater from "./Avater";
import Login_Signup from "./Login_Signup";
import { search } from "../redux/search/search.action";

const Navbar = function ({
  postModal,
  hideModal,
  currentUser,
  logOut,
  search,
}) {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState([]);
  const [show, setShow] = useState<boolean>(false);
  function handleModal1(val: boolean) {
    setShow(val);
  }

  async function handleLogOut(e) {
    e.stopPropagation();
    logOut();
    navigate("/");
  }
  function handleSearch(e) {
    const query = e.target.value;
    setSearchInput(query);
    search(query);
  }

  return (
    <>
      <NavbarBs className='navbarbs position-sticky top-0 w-100 myPrimaryb maxZ'>
        <Container>
          <NavbarBs.Brand to='/' className='link-light fs-1' as={NavLink}>
            t
          </NavbarBs.Brand>
          <form onSubmit={e => e.preventDefault()}>
            <div className='searchItem'>
              <i className='bi bi-search'></i>
              <input
                type='text'
                placeholder='Search Tumblr'
                value={searchInput}
                onChange={handleSearch}
              />
            </div>
          </form>
          <NavbarBs.Toggle aria-controls='basic-navbar-nav' />
          <NavbarBs.Collapse id='basic-navbar-nav'>
            <Nav
              className='ms-auto my-2 my-lg-0'
              style={{ maxHeight: "100px" }}
            >
              {!currentUser ? (
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
                  <Nav.Link as={Link} to='/'>
                    <i className='bi bi-house-fill'></i>
                  </Nav.Link>

                  {/* <Nav.Link href='#link'>
                    <i className='bi bi-gift-fill'></i>
                  </Nav.Link>
                  <Nav.Link href='#link'>
                    <i className='bi bi-envelope-fill'></i>
                  </Nav.Link>
                  <Nav.Link href='#link'>
                    <i className='bi bi-emoji-laughing-fill'></i>
                  </Nav.Link> */}
                  {currentUser.data.user.role === "admin" ? (
                    <>
                      <Nav.Link as={Link} to='/admin'>
                        <i className='bi bi-compass'></i>
                      </Nav.Link>
                    </>
                  ) : null}
                  {/* <Nav.Link href='#link'>
                    <i className='bi bi-lightning-charge-fill'></i>
                  </Nav.Link> */}
                  {currentUser.data.user ? (
                    <>
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
                        {/* <NavDropdown.Item
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
                        </NavDropdown.Item> */}
                        {/* <NavDropdown.Item
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
                        </NavDropdown.Item> */}
                        {/* <NavDropdown.Item
                          href='#action/3.2'
                          className='d-flex justify-content-between'
                        >
                          <div className='leftCol'>
                            <div className='offSetImg'>
                              <i className='bi bi-gift-fill'></i>
                            </div>
                            Change palette
                          </div>
                        </NavDropdown.Item> */}

                        {/* <NavDropdown.Item
                          href='#action/3.3'
                          className='secBreak'
                        >
                          <div>Blogs</div>
                          <div role='button'>+New</div>
                        </NavDropdown.Item> */}

                        <div className='profileActx'>
                          <div className='offSetImg'>
                            <Avater src={currentUser?.data?.user?.photo} />
                          </div>
                          <ProfileAction
                            username={currentUser.data.user.username}
                            email={currentUser.data.user.email}
                            id={currentUser.data.user._id}
                          />
                        </div>
                      </NavDropdown>
                    </>
                  ) : null}
                  <Nav.Link
                    role='button'
                    className='btnConfig bg-info px-3 rounded-1'
                    onClick={postModal}
                  >
                    <i className='bi bi-pencil-fill'></i>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </NavbarBs.Collapse>
        </Container>
      </NavbarBs>
      {/* <Modal centered show={show} onHide={() => handleModal1(false)}>
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
            <div
              className='text-warning'
              style={{ cursor: "pointer" }}
              role='button'
              onClick={handleShowLogin}
            >
              have an account already? login
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
      <LoginForm
        showLogin={showLogin}
        handleModal2={() => setShowLogin(false)}
        handlePrevModal={handlePrevModal}
      /> */}

      <Login_Signup
        show={show}
        setShow={setShow}
        handleModal1={() => handleModal1(false)}
      />
      <Modal
        centered
        show={hideModal}
        onHide={postModal}
        className='modalSecon'
      >
        <Modal.Body className='modalSecon text-center'>
          <CreatePost />
        </Modal.Body>
      </Modal>
    </>
  );
};
const mapStateToProps = ({
  toggleModal: { hideModal },
  auth: { currentUser },
}) => ({
  hideModal,
  currentUser,
});
const mapDispatchToProps = dispatch => ({
  postModal: () => dispatch(postModal()),
  logOut: () => dispatch(logOut()),
  search: data => dispatch(search(data)),
  auth,
});
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
