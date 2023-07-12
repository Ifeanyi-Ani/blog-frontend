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
}: PostCardProps) => {
  const init_data = {
    text: "",
    userId: currentUser?.data?.user?._id || "",
  };
  const [comment, setComment] = useState(init_data);
  function handleCommentSubmit(postId) {
    const updatedComment = { ...comment, postId };
    console.log(updatedComment, postId);
    createComment(postId, updatedComment);
    setComment(init_data);
  }
  function handleComment(postId) {
    fetchComments(postId);
  }

  useEffect(() => {
    fetchComments(postId);
  }, [fetchComments, postId]);

  // Get the comments count for the current post
  // const postComments = comments?.comments?.filter(
  //   comment => comment.postId === postId
  // );
  // // const commentsCount = postComments.length;z

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
          <div
            className='border rounded-5 d-flex justify-content-center align-items-center p-2'
            role='button'
            onClick={() => handleComment(postId)}
          >
            {comments ? comments.results + " notes" : "0 notes"}
          </div>
          <Stack className='footer-img ms-auto gap-3' direction='horizontal'>
            <img src={shareLogo} alt='logo' role='button' />
            <img src={reloadLogo} alt='logo' role='button' />
            <i className='bi bi-heart' role='button'></i>
          </Stack>
        </Card.Footer>

        {/* Rest of the component */}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);
