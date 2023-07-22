import { ReactNode, useEffect, useState } from "react";
import { Card, Stack } from "react-bootstrap";
import UserHeader from "./UserHeader";
import Avater from "./Avater";
import { connect } from "react-redux";
import {
  fetchComments,
  createComment,
  deleteComment,
} from "../redux/comments/comment.actions";
import { fetchPosts } from "../redux/posts/posts.action";
import baseUrl from "../apis/baseUrl";
import { LIKE, UNLIKE } from "../redux/likes/likes.type";
import { likeAndunlikePost } from "../redux/likes/likes.action";
import Login_Signup from "./Login_Signup";

type PostCardProps = {
  userId: string;
  postId: string;
  post: any;
  title: string;
  body: string;
  src: string;
  category: any;
  shareLogo: string;
  reloadLogo: string;
  likeLogo: string;
  createComment: any;
  comments: any;
  fetchComments: any;
  fetchPosts: any;
  deleteComment: any;
  likeAndunlikePost: any;
  currentUser: any;
  children?: ReactNode;
};

const PostCard = ({
  userId,
  title,
  body,
  src,
  shareLogo,
  category,
  children,
  postId,
  post,
  createComment,
  comments,
  currentUser,
  fetchComments,
  deleteComment,
  fetchPosts,
  likeAndunlikePost,
}: PostCardProps) => {
  const [check, setCheck] = useState<boolean>(false);

  const [show, setShow] = useState<boolean>(false);

  const [postComments, setPostComments] = useState();
  const init_data = {
    text: "",
    userId: currentUser?.data?.user?._id || "",
  };
  const [comment, setComment] = useState(init_data);
  async function handleCommentSubmit(postId) {
    const updatedComment = { ...comment, postId };
    await createComment(postId, updatedComment);
    await fetchComments(postId);
    getAllComments();
    setComment(init_data);
  }
  async function handleComment(postId) {
    await fetchComments(postId);
    setCheck(!check);
  }

  async function getAllComments() {
    const response = await baseUrl.get("/posts/comments");
    const allCommets = await response.data.data.comments;
    setPostComments(allCommets);
  }
  async function handleDeleteComment(postId, id) {
    if (confirm("Are you sure you want to delete this comment?")) {
      await deleteComment(postId, id);
      await fetchComments(postId);
      getAllComments();
    }
  }
  async function handleLike(postId) {
    const data = { userId: currentUser?.data?.user?._id };
    await likeAndunlikePost(data, postId, LIKE);
    await fetchComments(postId);
    await fetchPosts();
  }
  async function handleUnlike(postId) {
    const data = { userId: currentUser?.data?.user?._id };
    await likeAndunlikePost(data, postId, UNLIKE);
    await fetchComments(postId);
    await fetchPosts();
  }
  useEffect(() => {
    getAllComments();
  }, [postId]);
  return (
    <div>
      <Card>
        {children}
        <UserHeader
          userId={userId}
          currentUserId={currentUser}
          post={post}
          fetchPosts={fetchPosts}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Img src={src} alt='content' />
          {body}
          <Card.Text className='d-flex gap-1 flex-wrap'>
            {category
              ? JSON.parse(category).map((item, idx) => (
                  <span key={idx}>#{item.label}</span>
                ))
              : null}
          </Card.Text>
        </Card.Body>
        <Card.Footer style={{ borderTop: "none" }} className='d-flex'>
          {currentUser ? (
            <div
              className='border rounded-5 d-flex justify-content-center align-items-center p-2'
              role='button'
              onClick={() => handleComment(postId)}
            >
              {postComments
                ? postComments.filter(comment => comment.postId === postId)
                    .length + " notes"
                : "notes"}
            </div>
          ) : (
            <div
              className='border rounded-5 d-flex justify-content-center align-items-center p-2'
              role='button'
              onClick={() => setShow(true)}
            >
              {postComments
                ? postComments.filter(comment => comment.postId === postId)
                    .length + " notes"
                : "notes"}
            </div>
          )}
          <Stack className='footer-img ms-auto gap-3' direction='horizontal'>
            <img src={shareLogo} alt='logo' role='button' />
            <i
              className='bi bi-hand-thumbs-down'
              role='button'
              onClick={
                currentUser ? () => handleUnlike(postId) : () => setShow(true)
              }
            ></i>
            <i
              className='bi bi-heart'
              role='button'
              onClick={
                currentUser ? () => handleLike(postId) : () => setShow(true)
              }
            ></i>
          </Stack>
        </Card.Footer>

        {check && (
          <div className='commentSec p-3'>
            <div className='commentNav border-bottom-1 d-flex gap-3'>
              <div>
                <i className='bi bi-chat'></i>
                {postComments
                  ? postComments.filter(comment => comment.postId === postId)
                      .length
                  : null}
              </div>
              <div>
                <i className='bi bi-fullscreen'></i>900
              </div>
              <div>
                <i className='bi bi-heart'></i>
                {post.likes ? post.likes.length : null}
              </div>
              <div>
                <i className='bi bi-fullscreen'></i>900
              </div>
              <div className='ms-auto'>Comments</div>
            </div>
            <div className='card-footer bg-white p-0 border-0 mb-4'>
              <div className='d-flex flex-start w-100'>
                <img
                  className='rounded-circle shadow-1-strong me-3'
                  src={`http://127.0.0.1:4000/img/users/${currentUser?.data?.user?.photo}`}
                  alt='avatar'
                  width='40'
                  height='40'
                />
                <div className='form-outline w-100'>
                  <textarea
                    className='form-control'
                    id='textAreaExample'
                    rows='4'
                    placeholder='comments'
                    style={{ background: "#fff" }}
                    value={comment.text}
                    onChange={e =>
                      setComment({ ...comment, text: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
              <div className='float-end pt-1'>
                <button
                  type='button'
                  className='btn btn-primary btn-sm'
                  onClick={() => handleCommentSubmit(postId)}
                >
                  Post comment
                </button>
              </div>
            </div>
            <div className='commentsBody'>
              {comments?.data?.comments ? (
                [...comments.data.comments].reverse().map(comment => (
                  <div className='commentItem' key={comment._id}>
                    <div className='d-flex flex-start'>
                      <img
                        className='rounded-circle shadow-1-strong me-3'
                        src={`http://127.0.0.1:4000/img/users/${comment?.userId?.photo}`}
                        width='60'
                        height='60'
                      />

                      <div>
                        <h6 className='fw-bold mb-1'>
                          {comment?.userId?.username || "Unknown User"}
                        </h6>
                        <div className='d-flex align-items-center mb-3'>
                          <p className='mb-0'>
                            {new Date(comment.createdAt).toLocaleString()}
                            <span className='badge bg-primary'>
                              {comment?.userId?.role || "Unknown User"}
                            </span>
                          </p>

                          {currentUser?.data?.user?._id ===
                          comment?.userId?._id ? (
                            <>
                              <a href='#!' className='link-muted'>
                                <i
                                  className='bi bi-trash-fill'
                                  role='button'
                                  onClick={() =>
                                    handleDeleteComment(postId, comment._id)
                                  }
                                ></i>
                              </a>
                              <a href='#!' className='link-muted'>
                                <i className='bi bi-pencil-fill'></i>
                              </a>
                            </>
                          ) : null}
                        </div>
                        <p className='mb-0'>{comment.text}</p>
                      </div>
                    </div>

                    <hr className='my-0' />
                  </div>
                ))
              ) : (
                <div>Loading Comment</div>
              )}
            </div>
          </div>
        )}
      </Card>
      <Login_Signup
        show={show}
        handleModal1={() => setShow(false)}
        setShow={setShow}
      />
    </div>
  );
};

const mapStateToProps = ({ auth: { currentUser }, comment: { comments } }) => ({
  currentUser,
  comments,
});
const mapDispatchToProps = {
  createComment,
  fetchComments,
  deleteComment,
  likeAndunlikePost,
  fetchPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);
