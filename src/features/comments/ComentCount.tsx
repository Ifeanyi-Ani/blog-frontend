import { useLocation, useNavigate } from "react-router-dom";

const CommentCount = (props: any) => {
  const { comment, toggleShowReply, showReply, post, postId, index } = props;
  return (
    <img
      src={comment.userId.photo}
      alt="repost"
      className={`${index !== 0 && "-ml-5"} w-6 h-6 object-cover rounded-full`}
      key={comment._id}
    />
  );
};

export default CommentCount;
