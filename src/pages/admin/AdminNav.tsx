import { divide } from "lodash";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { Form } from "react-bootstrap";
import { adminModal, togglePostForm } from "../../redux/modals/modals.actions";
import CreatePostForm from "../../components/CreatePostForm";

const AdminNav: React.FC = ({
  currentUser,
  adminModal,
  adModal,
  hideForm,
  togglePostForm,
}) => {
  const INIT_STATE = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    dob: "",
    photo: "",
    role: "user",
  };
  const [user, setUser] = useState(INIT_STATE);
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      {currentUser ? (
        currentUser.data.user.role === "admin" ? (
          <div>
            <nav className='mt-4 d-flex justify-content-between'>
              <ul className='nav nav-tabs border-0'>
                <li className='nav-item'>
                  <Link to='/admin' className='nav-link'>
                    Dashboard
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/admin/posts' className='nav-link'>
                    Posts
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/admin/users' className='nav-link'>
                    Users
                  </Link>
                </li>
              </ul>
              <div className='d-flex gap-3'>
                <Button onClick={adminModal}>
                  Create <br /> User
                </Button>
                <Button onClick={() => togglePostForm()}>
                  Create <br /> Post
                </Button>
              </div>
            </nav>
            <Modal show={adModal} onHide={adminModal} centered>
              <Modal.Body className='modalPrimary'>
                <Form className='centerForm' onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Control
                      type='text'
                      placeholder='Username'
                      required
                      value={user.username}
                      onChange={e =>
                        setUser({ ...user, username: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type='email'
                      placeholder='Email'
                      required
                      value={user.email}
                      onChange={e =>
                        setUser({ ...user, email: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type='date'
                      placeholder='Date of Birth'
                      required
                      value={user.dob}
                      onChange={e => setUser({ ...user, dob: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <select
                      name=''
                      id=''
                      value={user.role}
                      onChange={e => setUser({ ...user, role: e.target.value })}
                    >
                      <option value='user'>user</option>
                      <option value='admin'>admin</option>
                    </select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type='password'
                      placeholder='Set a password'
                      required
                      value={user.password}
                      onChange={e =>
                        setUser({ ...user, password: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type='password'
                      placeholder='Repeat password'
                      required
                      value={user.passwordConfirm}
                      onChange={e =>
                        setUser({ ...user, passwordConfirm: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type='file'
                      required
                      value={user.photo}
                      onChange={e =>
                        setUser({ ...user, photo: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control type='submit' value='Submit' />
                  </Form.Group>
                </Form>
              </Modal.Body>
            </Modal>
            <CreatePostForm
              hideCreateForm={hideForm}
              togglePostForm={togglePostForm}
            />
            <Outlet />
          </div>
        ) : (
          <div>
            <h2>Access Denied</h2>
            <p>You don't have permission to view this page!!!!</p>
          </div>
        )
      ) : (
        <div>
          <h2>Access Denied</h2>
          <p>You are not signed in!!</p>
        </div>
      )}
    </>
  );
};
const mapStateToProps = ({
  user: { currentUser },
  toggleModal: { adModal, hideForm },
}) => ({ currentUser, adModal, hideForm });
const mapDispatchToProps = dispatch => ({
  adminModal: () => dispatch(adminModal()),
  togglePostForm: () => dispatch(togglePostForm()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminNav);
