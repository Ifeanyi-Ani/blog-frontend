import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  Container,
  Nav,
  Stack,
  Button,
  Navbar as NavbarBs,
  NavDropdown,
} from "react-bootstrap";
import ProfileAction from "./ProfileAction";
import Avater from "./Avater";
import Login_Signup from "./Login_Signup";
import { ContextData } from "../contexts/contextData";
import CreatePostForm from "./CreatePostForm";

const Navbar = function () {
  const navigate = useNavigate();
  const { currentUser, toggleCreateModal, setToggleCreateModal } =
    useContext(ContextData);

  const [searchInput, setSearchInput] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  function handleModal1(val: boolean) {
    setShow(val);
  }

  async function handleLogOut(e: React.FormEvent) {
    e.stopPropagation();
    // logOut();
    navigate("/");
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    setSearchInput(query);
    // search(query);
  }

  return (
    <>
      <NavbarBs className="navbarbs position-sticky top-0 w-100 myPrimaryb maxZ">
        <Container>
          <NavbarBs.Brand to="/" className="link-light fs-1" as={NavLink}>
            t
          </NavbarBs.Brand>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="searchItem">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Search Tumblr"
                value={searchInput}
                onChange={handleSearch}
              />
            </div>
          </form>
          <NavbarBs.Toggle aria-controls="basic-navbar-nav" />
          <NavbarBs.Collapse id="basic-navbar-nav">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
            >
              {!currentUser ? (
                <>
                  <Stack direction="horizontal" gap={3}>
                    <Button variant="info">Click for frogs</Button>
                    <Button
                      variant="success"
                      onClick={() => handleModal1(true)}
                    >
                      Log in
                    </Button>
                  </Stack>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/">
                    <i className="bi bi-house-fill"></i>
                  </Nav.Link>

                  {currentUser.role === "admin" ? (
                    <>
                      <Nav.Link as={Link} to="/admin">
                        <i className="bi bi-compass"></i>
                      </Nav.Link>
                    </>
                  ) : null}
                  {currentUser.user ? (
                    <>
                      <NavDropdown
                        title={<i className="bi bi-person-fill"></i>}
                        id="basic-nav-dropdown"
                        className="dropDownConfig"
                      >
                        <NavDropdown.Item as={Button} className="secBreak">
                          <div>Account</div>
                          <div
                            role="button"
                            className="btnConfig"
                            onClick={(e) => handleLogOut(e)}
                          >
                            Log out
                          </div>
                        </NavDropdown.Item>

                        <div className="profileActx">
                          <div className="offSetImg">
                            <Avater src={currentUser?.photo} />
                          </div>
                          <ProfileAction
                            username={currentUser.username}
                            email={currentUser.email}
                            id={currentUser.id}
                          />
                        </div>
                      </NavDropdown>
                    </>
                  ) : null}
                  <Nav.Link
                    role="button"
                    className="btnConfig bg-info px-3 rounded-1"
                    onClick={() => setToggleCreateModal(!toggleCreateModal)}
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </NavbarBs.Collapse>
        </Container>
      </NavbarBs>

      <Login_Signup
        show={show}
        setShow={setShow}
        handleModal1={() => handleModal1(false)}
      />
      {toggleCreateModal && <CreatePostForm />}
    </>
  );
};

export default Navbar;
