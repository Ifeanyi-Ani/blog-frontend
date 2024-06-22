import { useState } from "react";
import avater from "../../assets/avater.jpg";
import Actions from "../posts/Actions";
import CommentList from "./commentList";
import CreateComment from "./createComment";
type Props = {
  comment: any;
  postId: string;
  // isReplayingTo: boolean;
  // setisReplayingTo: (isReplayingTo: boolean) => void;
};

const CommentItem = (props: Props) => {
  const { comment, postId } = props;
  const [isReplayingTo, setisReplayingTo] = useState(false);
  return (
    <div className="flex w-full gap-2 mt-4">
      <div className="w-6 h-6 relative">
        <img
          className="absolute w-full h-full"
          src={comment.userId.photo || avater}
          alt={comment.userId.photo}
        />
      </div>
      <div className="flex-1 bg-blue-600 p-2 rounded overflow-hidden">
        <h5>{comment.userId.username}</h5>
        <span className="text-wrap">{comment.text}</span>
        <Actions postId={postId} setisReplayingTo={setisReplayingTo} />
        {isReplayingTo && <CreateComment />}
        {comment.replies.length > 0 && (
          <CommentList commentsData={comment.replies} />
        )}
      </div>
    </div>
  );
};

export default CommentItem;
