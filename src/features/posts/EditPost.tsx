import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import Avater from "../../ui/Avater";
import Select from "react-select";
import { useAppSelector } from "../../app/hook";
import { useGetPostsQuery, useUpdatePostMutation } from "./postSlice";

type CategoryOption = {
  value: string;
  label: string;
};

type InitProps = {
  id?: string;
  title: string;
  body: string;
  image?: any;
  category: CategoryOption[];
  userId: string;
};

type EditPostProps = {
  editForm: boolean;
  toggleEditForm: () => void;
  data: InitProps;
};

const EditPost: React.FC<EditPostProps> = (props) => {
  const { editForm, toggleEditForm, data } = props;
  const { currentUser } = useAppSelector((state) => state.auth);
  const {
    data: fetchPosts,
    // isLoading: postsisLoading,
    // isSuccess: postsisSuccess,
  } = useGetPostsQuery(null);
  const [editPost /* { isLoading, isSuccess } */] = useUpdatePostMutation();
  const INIT_STATE: InitProps = {
    title: "",
    body: "",
    image: null,
    category: [],
    userId: currentUser?.id || "",
  };
  const [post, setPost] = useState<InitProps>(INIT_STATE);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setPost({
        title: data.title || "",
        body: data.body || "",
        category: data.category,
        userId: currentUser?.id || "",
      });
    }
  }, [currentUser?.id, data]);
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
      setPost((prevState) => ({
        ...prevState,
        category: [...prevState.category, newOption],
      }));
      setInputValue("");
      event.preventDefault(); // Prevents form submission
    }
  };

  const handleSubmit = async (
    e: React.FormEvent,
    cb: { (): Promise<void>; (): void },
  ) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("body", post.body);
    formData.append("category", post.category as any);
    formData.append("userId", post.userId);
    if (post.image) {
      formData.append("image", post.image, post.image.name);
    }
    await editPost({ postId: data.id!, postData: formData as any })
      .then(() => {
        setLoading(false); // Step 3: Hide loading spinner on success
        cb();
        setPost(INIT_STATE);
        toggleEditForm();
      })
      .catch((error) => {
        setLoading(false); // Hide loading spinner on error if needed
        console.error("Error editing post:", error);
      });
  };
  return (
    <Modal
      centered
      show={editForm}
      onHide={toggleEditForm}
      className="modalSecon"
      backdrop="static"
    >
      <Modal.Body className="gap-7 grid grid-cols-[0.1fr_2fr]">
        <Avater src={currentUser?.photo || ""} />
        <div className="bg-white p-2 rounded">
          <div className="title">
            <div className="nameCon">{currentUser?.username}</div>
            <div className="icons"></div>
          </div>
          <Form
            onSubmit={(e) => handleSubmit(e, fetchPosts)}
            encType="multipart/form-data"
          >
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Title"
                value={post.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPost({ ...post, title: e.target.value })
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
              <button type="submit">
                {loading ? "Saving..." : "Save Post"}
              </button>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditPost;
