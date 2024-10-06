import {
  ThumbsUp,
  ThumbsDown,
  Reply,
  X,
  ChevronUp,
  ChevronDown,
  Send,
  Loader,
} from "lucide-react";
import { useCreateReplyMutation, useGetRepliesQuery } from "./commentSlice.ts";
import { LoadingState } from "../../ui/shared/LoadingState";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IComment } from "../../types/type.ts";

interface CommentItemProps {
  comment: IComment;
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
  onReply: (commentId: any, replyContent: any) => void;
  postId: string;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onLike,
  onDislike,
  onReply,
  postId,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [createReply, { isLoading, isSuccess, error }] =
    useCreateReplyMutation();

  const { data: repliesComment, isLoading: loadingReplies } =
    useGetRepliesQuery(comment?._id);

  const handleReplySubmit = (e: any) => {
    e.preventDefault();
    const data = {
      content: replyContent,
      postId,
      parentAuthor: comment?.userId?.username,
    };
    createReply({
      formData: data,
      parentId: comment._id,
    }).unwrap();
  };

  const toggleReplies = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(
    function () {
      if (isSuccess) {
        toast.success("You just reply a comment");
        setReplyContent("");
        setIsReplying(false);
        setIsExpanded(true);
      }
      if (error) {
        if ("data" in error) {
          toast.error(error?.data?.message || "An error occured");
        } else {
          toast.error("An unexpected error occured");
        }
      }
    },
    [isSuccess, error]
  );

  return (
    <div
      className={`rounded-lg ${!comment?.parentId && "bg-customBlue-800 p-4  shadow-md"}`}
    >
      <div className="flex items-center">
        <img
          src={comment?.userId?.photo}
          alt={comment?.userId?.username || "avatar"}
          className="w-8 h-8 rounded-full border border-electricCyan-500 mr-3"
        />
        <span className="font-semibold text-electricCyan-300">
          {comment?.userId?.username}
        </span>
        {comment?.parentAuthor && (
          <>
            <span className="text-customBlue-400 text-xs ml-1">replied</span>
            <span className="font-semibold text-neonPink-300 ml-1 text-xs">
              {comment?.parentAuthor}
            </span>
          </>
        )}
        <span className="text-customBlue-400 text-sm ml-2">
          {new Date(comment?.createdAt)?.toLocaleDateString()}
        </span>
      </div>
      <p className="text-customBlue-100 mb-3">{comment.content}</p>
      <div className="flex items-center space-x-4 text-sm mb-3">
        <button
          onClick={() => onLike(comment._id)}
          className="flex items-center text-neonPink-400 hover:text-neonPink-300 transition-colors duration-200"
        >
          <ThumbsUp size={14} className="mr-1" />
          {comment?.likes?.length}
        </button>
        <button
          onClick={() => onDislike(comment._id)}
          className="flex items-center text-neonPink-400 hover:text-neonPink-300 transition-colors duration-200"
        >
          <ThumbsDown size={14} className="mr-1" />
          {comment?.dislikes?.length}
        </button>
        <button
          onClick={() => setIsReplying(!isReplying)}
          className="flex items-center text-electricCyan-400 hover:text-electricCyan-300 transition-colors duration-200"
        >
          {isReplying ? (
            <X size={14} className="mr-1" />
          ) : (
            <Reply size={14} className="mr-1" />
          )}
          {isReplying ? "Cancel" : "Reply"}
        </button>
        {repliesComment && repliesComment?.length > 0 && (
          <button
            onClick={toggleReplies}
            className="flex items-center text-electricCyan-400 hover:text-electricCyan-300 transition-colors duration-200"
          >
            {isExpanded ? (
              <ChevronUp size={14} className="mr-1" />
            ) : (
              <ChevronDown size={14} className="mr-1" />
            )}
            {isExpanded
              ? "Hide Replies"
              : `Show Replies (${repliesComment?.length})`}
          </button>
        )}
      </div>

      {isReplying && (
        <form onSubmit={handleReplySubmit} className="mb-3">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply..."
              className="flex-grow bg-customBlue-700 text-customBlue-100 placeholder-customBlue-400 border border-neonPink-700/30 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-neonPink-500 focus:border-transparent transition-all duration-300"
            />
            <button
              type="submit"
              className="bg-neonPink-600 hover:bg-neonPink-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center"
            >
              
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader className="animate-spin mr-2" size={16} />
                  Replaying...
                </span>
              ) : (
                <>
                  <Send size={14} className="mr-1" />
                  Reply
                </>
              )}
            </button>
          </div>
        </form>
      )}
      {isExpanded && loadingReplies && <LoadingState />}
      {isExpanded &&
        repliesComment &&
        repliesComment?.map((reply: any) => (
          <CommentItem
            key={reply.id}
            comment={reply}
            onLike={onLike}
            onDislike={onDislike}
            onReply={onReply}
            postId={postId}
          />
        ))}
    </div>
  );
};
