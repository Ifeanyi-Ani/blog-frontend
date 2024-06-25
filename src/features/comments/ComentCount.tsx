import { useLocation, useNavigate } from "react-router-dom";

const CommentCount = (props: any) => {
  const { comment, toggleShowReply, showReply, post, postId } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <img
      src={comment.userId.photo}
      alt="repost"
      className="cursor-pointer object-cover w-6 h-6"
      role="button"
      key={comment._id}
      onClick={
        pathname === `/post/${postId}`
          ? () => toggleShowReply(!showReply)
          : () => navigate(`/post/${post._id}`)
      }
    />
  );
};

export default CommentCount;
