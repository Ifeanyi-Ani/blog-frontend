import React from "react";
import { Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { connect } from "react-redux";
import { auth } from "../redux/user/user.action";
import { SIGN_IN } from "../redux/user/user.type";

const INIT_STATE = {
  email: "",
  password: "",
};
const LoginForm = ({
  currentUser,
  showLogin,
  handleModal2,
  handlePrevModal,
  auth,
}) => {
  const [formData, setFormData] = useState(INIT_STATE);
  function handleSubmit(e) {
    e.preventDefault();
    // const data = new FormData();
    // data.append("email", formData.email);
    // data.append("password", formData.password);
    // console.log(data, formData);
    auth(formData, SIGN_IN);
    setFormData(INIT_STATE);
    handleModal2();
  }
  return (
    <Modal centered show={showLogin} onHide={handleModal2}>
      <Modal.Header className='d-flex justify-content-center border-0 modalPrimary'>
        <button
          style={{
            position: "absolute",
            left: "30px",
            top: "20px",
            backgroundColor: "unset",
            border: "none",
            color: "#fff",
            fontWeight: "700",
          }}
          onClick={handlePrevModal}
        >
          ⇚
        </button>
        <Modal.Title>tumblr</Modal.Title>
      </Modal.Header>

      <Modal.Body className='modalPrimary'>
        <Form
          className='centerForm'
          onSubmit={handleSubmit}
          encType='multipart/form-data'
        >
          <Form.Group>
            <Form.Control
              type='email'
              placeholder='Email'
              required
              value={formData.email}
              onChange={e =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type='password'
              placeholder='Set a password'
              required
              value={formData.password}
              onChange={e =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Control type='submit' value='Submit' />
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
const mapStateToProps = ({ user: { currentUser } }) => ({ currentUser });
const mapDispatchToProps = {
  auth,
};
export default connect(null, mapDispatchToProps)(LoginForm);
