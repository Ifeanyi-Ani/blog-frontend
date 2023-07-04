/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import Avater from "./Avater";
import { connect } from "react-redux";
import Select, { ValueType } from "react-select";
import { createPost } from "../redux/posts/posts.action";

type CategoryOption = {
  value: string;
  label: string;
};

type CreatePostFormProps = {
  hideCreateForm: boolean;
  togglePostForm: () => void;
  createPost: (post: InitProps) => void;
};

type InitProps = {
  title: string;
  body: string;
  image: string;
  category: CategoryOption[];
};

const INIT_STATE: InitProps = {
  title: "",
  body: "",
  image: "",
  category: [],
};

const CreatePostForm: React.FC<CreatePostFormProps> = ({
  hideCreateForm,
  togglePostForm,
  createPost,
}) => {
  const [post, setPost] = useState<InitProps>(INIT_STATE);
  const [inputValue, setInputValue] = useState<string>("");

  const handleClose = () => {
    setPost(INIT_STATE);
    togglePostForm();
  };
  const handleInputChange = (inputValue: string) => {
    setInputValue(inputValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue) {
      const newOption: CategoryOption = {
        value: inputValue.toLowerCase(),
        label: inputValue,
      };
      setPost(prevState => ({
        ...prevState,
        category: [...prevState.category, newOption],
      }));
      setInputValue("");
      event.preventDefault(); // Prevents form submission
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(post);
    createPost(post);
  };

  return (
    <Modal
      centered
      show={hideCreateForm}
      onHide={togglePostForm}
      className='modalSecon'
      backdrop='static'
    >
      <Modal.Body className='customBody'>
        <Avater />
        <div className='modalForm'>
          <div className='title'>
            <div className='nameCon'>i-ani</div>
            <div className='icons'></div>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type='text'
                placeholder='Title'
                value={post.title}
                onChange={e => setPost({ ...post, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <textarea
                name=''
                id=''
                cols={30}
                rows={10}
                className='textareas'
                placeholder='Go ahead, put anything'
                value={post.body}
                onChange={e => setPost({ ...post, body: e.target.value })}
              ></textarea>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type='file'
                value={post.image}
                onChange={e => setPost({ ...post, image: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Select
                isMulti
                menuIsOpen={false}
                placeholder='#add tags to help people find your post'
                value={post.category}
                options={post.category}
                onChange={(selectedOptions: ValueType<CategoryOption, true>) =>
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

            <Form.Group className='actionCrt'>
              <button type='button' onClick={handleClose}>
                Close
              </button>
              <Form.Select role='button'>
                <option>For Everyone</option>
              </Form.Select>
              <button type='submit'>Post now</button>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default connect(null, { createPost })(CreatePostForm);
