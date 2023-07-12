// import React, { useState, ChangeEvent, KeyboardEvent } from "react";
// import { Form, Modal } from "react-bootstrap";
// import Avater from "./Avater";
// import { connect, ConnectedProps } from "react-redux";
// import Select, { ValueType } from "react-select";
// import { createPost } from "../redux/posts/posts.action";
// import { fetchPosts } from "../redux/posts/posts.action";

// type CategoryOption = {
//   value: string;
//   label: string;
// };

// type CreatePostFormProps = {
//   hideCreateForm: boolean;
//   togglePostForm: () => void;
// };

// type InitProps = {
//   title: string;
//   body: string;
//   image: string;
//   category: CategoryOption[];
//   userId: string;
// };

// const CreatePostForm: React.FC<CreatePostFormProps & ReduxProps> = ({
//   hideCreateForm,
//   togglePostForm,
//   createPost,
//   currentUser,
//   fetchPosts,
// }) => {
//   const INIT_STATE: InitProps = {
//     title: "",
//     body: "",
//     image: "",
//     category: [],
//     userId: currentUser?.data?.user?._id || "",
//   };
//   const [post, setPost] = useState<InitProps>(INIT_STATE);
//   const [inputValue, setInputValue] = useState<string>("");

//   const handleClose = () => {
//     setPost(INIT_STATE);
//     togglePostForm();
//   };

//   const handleInputChange = (inputValue: string) => {
//     setInputValue(inputValue);
//   };

//   const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === "Enter" && inputValue) {
//       const newOption: CategoryOption = {
//         value: inputValue.toLowerCase(),
//         label: inputValue,
//       };
//       setPost(prevState => ({
//         ...prevState,
//         category: [...prevState.category, newOption],
//       }));
//       setInputValue("");
//       event.preventDefault(); // Prevents form submission
//     }
//   };

//   const handleSubmit = (e: React.FormEvent, cb) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", post.title);
//     formData.append("body", post.body);
//     formData.append("image", post.image);
//     formData.append("category", JSON.stringify(post.category));
//     formData.append("userId", post.userId);
//     createPost(post);
//     fetchPosts();
//     setPost(INIT_STATE);
//     togglePostForm();
//   };
//   console.log(post);
//   return (
//     <Modal
//       centered
//       show={hideCreateForm}
//       onHide={togglePostForm}
//       className='modalSecon'
//       backdrop='static'
//     >
//       <Modal.Body className='customBody'>
//         <Avater />
//         <div className='modalForm'>
//           <div className='title'>
//             <div className='nameCon'>i-ani</div>
//             <div className='icons'></div>
//           </div>
//           <Form onSubmit={handleSubmit} encType='multipart/form-data'>
//             <Form.Group>
//               <Form.Control
//                 type='text'
//                 placeholder='Title'
//                 value={post.title}
//                 onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                   setPost({ ...post, title: e.target.value })
//                 }
//               />
//             </Form.Group>
//             <Form.Group>
//               <textarea
//                 name=''
//                 id=''
//                 cols={30}
//                 rows={10}
//                 className='textareas'
//                 placeholder='Go ahead, put anything'
//                 value={post.body}
//                 onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
//                   setPost({ ...post, body: e.target.value })
//                 }
//               ></textarea>
//             </Form.Group>
//             <Form.Group>
//               <Form.Control
//                 type='file'
//                 onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                   setPost({ ...post, image: e.target.files[0] })
//                 }
//               />
//             </Form.Group>
//             <Form.Group>
//               <Select
//                 isMulti
//                 menuIsOpen={false}
//                 placeholder='#add tags to help people find your post'
//                 value={post.category}
//                 options={post.category}
//                 onChange={(selectedOptions: ValueType<CategoryOption, true>) =>
//                   setPost({
//                     ...post,
//                     category: selectedOptions as CategoryOption[],
//                   })
//                 }
//                 onInputChange={handleInputChange}
//                 onKeyDown={handleKeyDown}
//                 isSearchable
//               />
//             </Form.Group>

//             <Form.Group className='actionCrt'>
//               <button type='button' onClick={handleClose}>
//                 Close
//               </button>
//               <Form.Select role='button'>
//                 <option>For Everyone</option>
//               </Form.Select>
//               <button type='submit'>Post now</button>
//             </Form.Group>
//           </Form>
//         </div>
//       </Modal.Body>
//     </Modal>
//   );
// };

// const mapStateToProps = state => ({
//   currentUser: state.user.currentUser,
// });
// const mapDispatchToProps = {
//   createPost,
//   fetchPosts,
// };

// const connector = connect(mapStateToProps, mapDispatchToProps);
// type ReduxProps = ConnectedProps<typeof connector>;

// export default connector(CreatePostForm);
