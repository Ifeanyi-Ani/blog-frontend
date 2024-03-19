import React, { MouseEventHandler } from "react";
import { Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { useAppDispatch } from "../app/hook";
import { login } from "../features/users/userSlice";

interface LoginFormProps {
  showLogin: boolean;
  handleModal2: () => void;
  handlePrevModal: MouseEventHandler<HTMLButtonElement>;
}
const INIT_STATE = {
  email: "",
  password: "",
};
const LoginForm = ({
  showLogin,
  handleModal2,
  handlePrevModal,
}: LoginFormProps) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState(INIT_STATE);

  async function handleSubmit(e: React.FormEvent) {
    try {
      e.preventDefault();
      // const data = new FormData();
      // data.append("email", formData.email);
      // data.append("password", formData.password);

      await dispatch(login(formData)).unwrap();

      setFormData(INIT_STATE);

      handleModal2();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Modal centered show={showLogin} onHide={handleModal2}>
      <Modal.Header className="d-flex justify-content-center border-0 modalPrimary">
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

      <Modal.Body className="modalPrimary">
        <Form
          className="centerForm"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Enter password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Control type="submit" value="Submit" />
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default LoginForm;
