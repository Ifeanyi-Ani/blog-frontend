/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import Avater from "./Avater";
import { connect, ConnectedProps } from "react-redux";
import Select, { ValueType } from "react-select";
import { editPost } from "../redux/posts/posts.action";
import { fetchPosts } from "../redux/posts/posts.action";

type CategoryOption = {
  value: string;
  label: string;
};

type EditFormProps = {
  editForm: boolean;
  toggleEditForm: () => void;
  data: object;
};

type InitProps = {
  title: string;
  body: string;
  image?: any;
  category: CategoryOption[];
  userId: string;
};

const EditForm: React.FC<EditFormProps & ReduxProps> = ({
  editForm,
  toggleEditForm,
  editPost,
  currentUser,
  fetchPosts,
  data,
}) => {
  const INIT_STATE: InitProps = {
    title: "",
    body: "",
    image: null,
    category: [],
    userId: currentUser?.data?.user?._id || "",
  };
  const [post, setPost] = useState<InitProps>(INIT_STATE);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (data) {
      setPost({
        title: data.title || "",
        body: data.body || "",
        category: data.category ? JSON.parse(data.category) : [],
        userId: currentUser?.data?.user?._id || "",
      });
    }
  }, [currentUser?.data?.user?._id, data]);
  const handleClose = () => {
    toggleEditForm();
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
      setPost(prevState => ({
        ...prevState,
        category: [...prevState.category, newOption],
      }));
      setInputValue("");
      event.preventDefault(); // Prevents form submission
    }
  };

  const handleSubmit = async (
    e: React.FormEvent,
    cb: { (): Promise<void>; (): void }
  ) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("body", post.body);
    formData.append("category", JSON.stringify(post.category));
    formData.append("userId", post.userId);
    if (post.image) {
      formData.append("image", post.image, post.image.name);
    }
    await editPost(data._id, formData);
    cb();
    setPost(INIT_STATE);
    toggleEditForm();
  };
  return (
    <Modal
      centered
      show={editForm}
      onHide={toggleEditForm}
      className='modalSecon'
      backdrop='static'
    >
      <Modal.Body className='customBody'>
        <Avater src={currentUser?.data?.user?.photo} />
        <div className='modalForm'>
          <div className='title'>
            <div className='nameCon'>{currentUser?.data?.user?.username}</div>
            <div className='icons'></div>
          </div>
          <Form
            onSubmit={e => handleSubmit(e, fetchPosts)}
            encType='multipart/form-data'
          >
            <Form.Group>
              <Form.Control
                type='text'
                placeholder='Title'
                value={post.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPost({ ...post, title: e.target.value })
                }
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
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setPost({ ...post, body: e.target.value })
                }
              ></textarea>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type='file'
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPost({ ...post, image: e.target.files[0] })
                }
              />
            </Form.Group>
            <Form.Group>
              <Select
                isMulti={true}
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
              <button type='submit'>Save Post</button>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state: {
  auth: { currentUser: any };
  posts: { data: any };
}) => ({
  currentUser: state.auth.currentUser,
  data: state.posts.data,
});
const mapDispatchToProps = {
  editPost,
  fetchPosts,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(EditForm);
