import React, { useState, ChangeEvent, KeyboardEvent, useContext } from "react";
import { Form, Modal } from "react-bootstrap";
import Select from "react-select";
import { useCreatePostMutation } from "./postSlice";
import { ContextData } from "../../contexts/contextData";
import { useAppSelector } from "../../app/hook";
import Avater from "../users/Avater";

type CategoryOption = {
  value: string;
  label: string;
};

type InitProps = {
  title: string;
  body: string;
  image: any | null;
  category: any;
};

const CreatePostForm = () => {
  const [createPost, { isLoading, isSuccess }] = useCreatePostMutation();
  const { toggleCreateModal, setToggleCreateModal } = useContext(ContextData);
  const { currentUser } = useAppSelector((state) => state.auth);
  const INIT_STATE: InitProps = {
    title: "",
    body: "",
    image: "",
    category: [],
    // userId: currentUser?.id || "",
  };
  const [post, setPost] = useState<InitProps>(INIT_STATE);
  const [inputValue, setInputValue] = useState<string>("");

  const handleClose = () => {
    setPost(INIT_STATE);
    setToggleCreateModal(false);
  };

  const handleInputChange = (inputValue: string) => {
    setInputValue(inputValue);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue) {
      const newOption: CategoryOption = {
        value: inputValue.toLowerCase(),
        label: inputValue,
      };
      setPost((prevState) => ({
        ...prevState,
        category: [...prevState.category, newOption],
      }));
      setInputValue("");
      event.preventDefault(); // Prevents form submission
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost(post);
    setPost(INIT_STATE);
    setToggleCreateModal(false);
  };
  return (
    <Modal
      centered
      show={toggleCreateModal}
      onHide={() => setToggleCreateModal(false)}
      className="modalSecon"
      backdrop="static"
    >
      <Modal.Body className="customBody">
        <Avater src={currentUser?.photo || ""} />
        <div className="modalForm">
          <div className="title">
            <div className="nameCon">{currentUser?.username}</div>
            <div className="icons"></div>
          </div>
          <Form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Title"
                value={post.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPost({
                    ...post,
                    title: e.target.value,
                    // userId: currentUser?.id as string,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <textarea
                name=""
                id=""
                cols={30}
                rows={10}
                className="textareas"
                placeholder="Go ahead, put anything"
                value={post.body}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setPost({ ...post, body: e.target.value })
                }
              ></textarea>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPost({ ...post, image: e.target.files![0] })
                }
              />
            </Form.Group>
            <Form.Group>
              <Select
                isMulti={true}
                menuIsOpen={false}
                placeholder="#add tags to help people find your post"
                value={post.category}
                options={post.category}
                onChange={(selectedOptions) =>
                  setPost({
                    ...post,
                    category: selectedOptions as CategoryOption[],
                  })
                }
                onInputChange={handleInputChange}
                onKeyDown={handleKeyDown}
                isSearchable
              />
            </Form.Group>

            <Form.Group className="actionCrt">
              <button type="button" onClick={handleClose}>
                Close
              </button>
              <Form.Select role="button">
                <option>For Everyone</option>
              </Form.Select>
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Posting..." : "Post now"}
              </button>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreatePostForm;
