import { useState } from "react";
import avater from "../../assets/avater.jpg";
import Actions from "../posts/Actions";
import ReplyComment from "./replyComment";
type Props = {
  comment: any;
  postId: string;
  currentUser: any;
};

const CommentItem = (props: Props) => {
  const { comment, postId, currentUser } = props;
  const [isReplayingTo, setisReplayingTo] = useState(false);
  const [showReply, toggleShowReply] = useState(false);
  console.log(comment);
  return (
    <div className="flex w-full gap-2 mt-4">
      <div className="w-6 h-6 relative">
        <img
          className="absolute w-full h-full"
          src={comment?.userId?.photo || avater}
          alt={comment.userId.photo}
        />
      </div>

      <div className="flex-1 overflow-hidden rounded">
        <div className="bg-blue-600 p-2">
          <h5>{comment?.userId?.username}</h5>
          <span className="text-wrap">{comment.text}</span>
          <Actions
            postId={postId}
            setisReplayingTo={setisReplayingTo}
            showReply={showReply}
            toggleShowReply={toggleShowReply}
          />
          {isReplayingTo && (
            <ReplyComment
              postId={postId}
              parentId={comment._id}
              currentUser={currentUser}
            />
          )}
        </div>
        {showReply && (
          <div className="pl-6">
            {comment?.replies?.map((reply: any) => (
              <CommentItem
                key={reply._id}
                comment={reply}
                postId={postId}
                currentUser={currentUser}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
