/* eslint-disable react-refresh/only-export-components */
import { Form, Modal } from "react-bootstrap";
import { connect, ConnectedProps } from "react-redux";
import { useMutistepForm } from "./useMutistepForm";
import { UserFromEmail } from "./UserFromEmail";
import { UserFormPassword } from "./UserFormPassword";
import { UserFormBithYear } from "./UserFormBithYear";
import { useState } from "react";
import { UserFormUsername } from "./UserFormUsername";
import { useSignUpMutation } from "../features/users/userSlice";

type FormData = {
  email: string;
  password: string;
  passwordConfirm: string;
  dob: string;
  username: string;
};

const INITIAL_DATA: FormData = {
  email: "",
  password: "",
  passwordConfirm: "",
  dob: "",
  username: "",
};

type SignupWithEmailProp = {
  isOpen: any;
  handleModal2: any;
  handlePrevModal: any;
  closeModal: any;
};

const SignupWithEmail: React.FC<SignupWithEmailProp> = (props) => {
  const { isOpen, handleModal2, handlePrevModal, closeModal } = props;

  const [signUp, { isLoading, isSuccess }] = useSignUpMutation();
  const [data, setData] = useState(INITIAL_DATA);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { setCurrentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMutistepForm([
      <UserFromEmail {...data} updateFields={updateFields} />,
      <UserFormPassword {...data} updateFields={updateFields} />,
      <UserFormBithYear {...data} updateFields={updateFields} />,
      <UserFormUsername {...data} updateFields={updateFields} />,
    ]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    await signUp(data);
    // isLoggedin();
    closeModal();
  }

  return (
    <Modal
      centered
      show={isOpen}
      onHide={() => {
        setCurrentStepIndex(0);
        handleModal2();
      }}
    >
      <Modal.Header className="d-flex justify-content-center border-0 modalPrimary">
        {isFirstStep ? (
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
        ) : (
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
            onClick={back}
          >
            ⇚
          </button>
        )}
        <Modal.Title>tumblr</Modal.Title>
      </Modal.Header>

      <Modal.Body className="modalPrimary">
        <Form
          className="centerForm"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {step}
          <Form.Group>
            <Form.Control type="submit" value="Next ⇛" />
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignupWithEmail;
