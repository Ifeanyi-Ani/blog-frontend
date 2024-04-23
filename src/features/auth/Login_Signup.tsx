import { Dispatch, SetStateAction, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import SignupWithEmail from "./SignupWithEmail";
import LoginForm from "./LoginForm";

import googleLogo from "../../assets/googleLogo.jpg";
import appleLogo from "../../assets/appleLogo.jpg";
import emailLogo from "../../assets/messLogo.jpg";

interface Login_SignupProps {
  show: boolean;
  handleModal1: () => void;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const Login_Signup = ({ show, handleModal1, setShow }: Login_SignupProps) => {
  const [isOpen, setisOpen] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  function handleModal2(val: boolean) {
    setisOpen(val);
  }
  function modalAct() {
    setisOpen(true);
    setShow(false);
  }
  function handlePrevModal() {
    setisOpen(false);
    setShowLogin(false);
    setShow(true);
  }
  function handleShowLogin() {
    setShow(false);
    setShowLogin(true);
  }
  return (
    <>
      <Modal centered show={show} onHide={handleModal1}>
        <Modal.Header className="d-flex justify-content-center border-0 modalPrimary">
          <Modal.Title>tumblr</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalPrimary text-center">
          Welcome to your corner of the internet. You'll never be bored again.
          <div className="text-center my-3">Sign up or log in</div>
          <Stack
            className="m-auto"
            direction="vertical"
            gap={2}
            style={{ width: "70%" }}
          >
            <Button variant="light" className="rounded-5 modalBtn">
              <div className="imgCon">
                <img src={googleLogo} alt="logo" />
              </div>
              <div className="nameCon">Continue with Google</div>
            </Button>
            <Button variant="light" className="rounded-5 modalBtn">
              <div className="imgCon">
                <img src={appleLogo} alt="logo" />
              </div>
              <div className="nameCon">Continue with Apple</div>
            </Button>
            <Button
              variant="light"
              className="rounded-5 modalBtn"
              onClick={modalAct}
            >
              <div className="imgCon">
                <img src={emailLogo} alt="logo" />
              </div>
              <div className="nameCon">Continue with email</div>
            </Button>
            <div
              className="text-warning"
              style={{ cursor: "pointer" }}
              role="button"
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
      />
    </>
  );
};

export default Login_Signup;
