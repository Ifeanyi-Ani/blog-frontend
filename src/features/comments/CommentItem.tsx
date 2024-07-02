import { useState } from "react";
import avater from "../../assets/avater.jpg";
import Actions from "../posts/Actions";
import ReplyComment from "./replyComment";
import DeleteBtn from "../../utils/DeleteBtn";
import { useDeleteCommentMutation } from "./commentSlice";
type Props = {
  comment: any;
  postId: string;
  currentUser: any;
  index?: number;
};

const CommentItem = (props: Props) => {
  const { comment, postId, currentUser, index } = props;
  const [isReplayingTo, setisReplayingTo] = useState(false);
  const [showReply, toggleShowReply] = useState(false);
  const deleteDetials = {
    postId,
    commentId: comment?._id,
  };

  const [
    deleteComment,
    {
      isLoading: deleteCommentisLoading,
      isSuccess: deleteCommentisSuccess,
      isError: deleteCommentisError,
    },
  ] = useDeleteCommentMutation();

  return (
    <>
      <div className="flex w-full gap-2 mt-4">
        <div className="w-6 h-6 relative">
          <img
            className="absolute w-full h-full object-cover"
            src={comment?.userId?.photo || avater}
            alt={comment.userId.photo}
          />
        </div>

        <div className="flex-1 overflow-hidden rounded flex flex-col">
          <div className="bg-blue-600 p-2 relative">
            {comment?.userId?._id === currentUser?._id && (
              <DeleteBtn
                deleteDetails={deleteDetials}
                deleteData={deleteComment}
                isLoading={deleteCommentisLoading}
                isSuccess={deleteCommentisSuccess}
                isError={deleteCommentisError}
              />
            )}
            <h5>
              <strong>{comment?.userId?.username} </strong>
              {comment.parentAuthor && (
                <span>
                  replied to <strong>{comment.parentAuthor}</strong>
                </span>
              )}
            </h5>
            <span className="text-wrap">{comment.text}</span>
            <Actions
              postId={postId}
              setisReplayingTo={setisReplayingTo}
              showReply={showReply}
              toggleShowReply={toggleShowReply}
              isReplyingTo={isReplayingTo}
              comment={comment.replies}
            />
            {isReplayingTo && (
              <ReplyComment
                postId={postId}
                parentId={comment._id}
                parentAuthor={comment?.userId?.username}
                currentUser={currentUser}
              />
            )}
          </div>
        </div>
      </div>

      {showReply && (
        <div className={`${index !== 0 && "pl-6"}`}>
          {comment?.replies?.map((reply: any, index: number) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              postId={postId}
              currentUser={currentUser}
              index={index}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CommentItem;
