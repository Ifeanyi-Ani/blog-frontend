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
import baseUrl from "../apis/baseUrl";

type PostCardProps = {
  userId: string;
  postId: string;
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
  deleteComment: any;
  currentUser: any;
  children?: ReactNode;
};

const PostCard = ({
  userId,
  title,
  body,
  src,
  shareLogo,
  reloadLogo,
  category,
  children,
  postId,
  createComment,
  comments,
  currentUser,
  fetchComments,
  deleteComment,
}: PostCardProps) => {
  const [check, setCheck] = useState<boolean>(false);

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
    setComment(init_data);
  }
  function handleComment(postId) {
    fetchComments(postId);

    setCheck(!check);
  }

  async function getAllComments() {
    const response = await baseUrl.get("/posts/comments");
    const allCommets = await response.data.data.comments;
    setPostComments(allCommets);
    console.log("hi");
  }
  async function handleDeleteComment(postId, id) {
    if (confirm("Are you sure you want to delete this comment?")) {
      await deleteComment(postId, id);
      await fetchComments(postId);
      getAllComments();
    }
  }
  useEffect(() => {
    getAllComments();
  }, [postId]);

  return (
    <div>
      <Card>
        {children}
        <UserHeader userId={userId} />
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
            >
              {postComments
                ? postComments.filter(comment => comment.postId === postId)
                    .length + " notes"
                : "notes"}
            </div>
          )}
          <Stack className='footer-img ms-auto gap-3' direction='horizontal'>
            <img src={shareLogo} alt='logo' role='button' />
            <img src={reloadLogo} alt='logo' role='button' />
            <i className='bi bi-heart' role='button'></i>
          </Stack>
        </Card.Footer>

        {check && (
          <div className='commentSec p-3'>
            <div className='commentNav border-bottom-1 d-flex gap-3'>
              <div>
                <i className='bi bi-chat'></i>0
              </div>
              <div>
                <i className='bi bi-fullscreen'></i>900
              </div>
              <div>
                <i className='bi bi-heart'></i>90
              </div>
              <div>
                <i className='bi bi-fullscreen'></i>900
              </div>
              <div className='ms-auto'>Comments</div>
            </div>
            <div className='commentsBody'>
              <div>
                <form action='' className='d-flex'>
                  <textarea
                    name=''
                    id=''
                    cols='30'
                    rows='2'
                    value={comment.text}
                    onChange={e =>
                      setComment({ ...comment, text: e.target.value })
                    }
                    style={{ width: "90%" }}
                  />
                  <button
                    type='button'
                    onClick={() => handleCommentSubmit(postId)}
                  >
                    send
                  </button>
                </form>
              </div>
              {comments?.data?.comments ? (
                [...comments.data.comments].reverse().map(comment => (
                  <div
                    className='commentItem'
                    style={{ borderBottom: "1px solid gainsboro" }}
                    key={comment._id}
                  >
                    <div className='d-flex'>
                      <Avater />
                      {comment.userId.username}
                    </div>
                    <div>{comment.text}</div>
                    {currentUser?.data?.user?._id === comment.userId._id ? (
                      <i
                        className='bi bi-trash-fill delBtn'
                        role='button'
                        onClick={() => handleDeleteComment(postId, comment._id)}
                      ></i>
                    ) : null}
                  </div>
                ))
              ) : (
                <div>Loading Comment</div>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

const mapStateToProps = ({ user: { currentUser }, comment: { comments } }) => ({
  currentUser,
  comments,
});
const mapDispatchToProps = {
  createComment,
  fetchComments,
  deleteComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);
