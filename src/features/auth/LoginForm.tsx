import React, { MouseEventHandler, useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useLoginMutation } from "../users/userSlice";

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
  const [login, { isSuccess, isLoading, isError, error, data }] =
    useLoginMutation();

  const [formData, setFormData] = useState(INIT_STATE);

  async function handleSubmit(e: React.FormEvent) {
    try {
      e.preventDefault();
      // const data = new FormData();
      // data.append("email", formData.email);
      // data.append("password", formData.password);

      await login(formData).unwrap();

      handleModal2();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "user logged in successfully";
      toast.success(message);
      setFormData(INIT_STATE);
    }
    if (isError) {
      if ("data" in error!) {
        const errorData = error as any;
        const message =
          errorData?.data.msg ||
          errorData?.data?.message ||
          "something went wrong";
        toast.error(message);
      }
    }
  }, [isSuccess, isError]);
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
            <Form.Control type="submit" value="Submit" disabled={isLoading} />
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default LoginForm;
