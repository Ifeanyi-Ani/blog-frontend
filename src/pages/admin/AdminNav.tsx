import { divide } from "lodash";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { Form, Modal } from "react-bootstrap";
import { adminModal, togglePostForm } from "../../redux/modals/modals.actions";
import CreatePostForm from "../../components/CreatePostForm";
import { auth } from "../../redux/user/user.action";
import { SIGN_UP } from "../../redux/user/user.type";
import baseUrl from "../../apis/baseUrl";

const AdminNav: React.FC = ({
  currentUser,
  adminModal,
  adModal,
  hideForm,
  togglePostForm,
  auth,
}) => {
  const INIT_STATE = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    dob: "",
    role: "user",
  };
  const [user, setUser] = useState(INIT_STATE);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // const formData = new FormData();
      // formData.append("username", user.username);
      // formData.append("email", user.email);
      // formData.append("password", user.password);
      // formData.append("passwordConfirm", user.passwordConfirm);
      // formData.append("dob", user.dob);
      // if (user.photo instanceof File) {
      //   formData.append("photo", user.photo, user.photo.name);
      // }
      // formData.append("role", user.role);
      const response = await baseUrl.post("/auth/signup", user);
      alert(response);
      adminModal();
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  }
  return (
    <>
      {currentUser ? (
        currentUser.data.user.role === "admin" ? (
          <div>
            <nav className='mt-4 d-flex justify-content-between px-4'>
              <ul className='nav nav-tabs border-0'>
                <li className='nav-item'>
                  <Link to='/admin' className='navAdmin'>
                    Dashboard
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/admin/posts' className='navAdmin'>
                    Posts
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/admin/users' className='navAdmin'>
                    Users
                  </Link>
                </li>
              </ul>
              <div className='d-flex gap-3 btnAdmin'>
                <button onClick={adminModal}>
                  Create <br /> User
                </button>
                <button onClick={() => togglePostForm()}>
                  Create <br /> Post
                </button>
              </div>
            </nav>
            <Modal show={adModal} onHide={adminModal} centered>
              <Modal.Body className='modalPrimary'>
                <Form
                  className='centerForm'
                  onSubmit={handleSubmit}
                  encType='multipart/form-data'
                >
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
                  {/* <Form.Group>
                    <Form.Control
                      type='file'
                      onChange={e =>
                        setUser({ ...user, photo: e.target.files[0] })
                      }
                    />
                  </Form.Group> */}
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
  auth, // Dispatch the auth action
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminNav);
