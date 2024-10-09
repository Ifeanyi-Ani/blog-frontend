import {
  ThumbsUp,
  ThumbsDown,
  Reply,
  X,
  ChevronUp,
  ChevronDown,
  Send,
  Loader,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { useCreateReplyMutation, useGetRepliesQuery } from './commentSlice.ts';
import { IComment } from '../../types/type.ts';
import { LoadingState } from '../../ui/shared/LoadingState';

interface CommentItemProps {
  comment: IComment;
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
  onReply: (commentId: any, replyContent: any) => void;
  postId: string;
}

export const CommentItem = ({
  comment,
  onLike,
  onDislike,
  onReply,
  postId,
}: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
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
        toast.success('You just reply a comment');
        setReplyContent('');
        setIsReplying(false);
        setIsExpanded(true);
      }
      if (error) {
        if ('data' in error) {
          toast.error(error?.data?.message || 'An error occured');
        } else {
          toast.error('An unexpected error occured');
        }
      }
    },
    [isSuccess, error]
  );

  return (
    <div
      className={`rounded-lg ${!comment?.parentId && 'bg-customBlue-800 p-4 shadow-md'}`}
    >
      <div className="flex items-center">
        <img
          src={comment?.userId?.photo}
          alt={comment?.userId?.username || 'avatar'}
          className="mr-3 h-8 w-8 rounded-full border border-electricCyan-500"
        />
        <span className="font-semibold text-electricCyan-300">
          {comment?.userId?.username}
        </span>
        {comment?.parentAuthor && (
          <>
            <span className="ml-1 text-xs text-customBlue-400">replied</span>
            <span className="ml-1 text-xs font-semibold text-neonPink-300">
              {comment?.parentAuthor}
            </span>
          </>
        )}
        <span className="ml-2 text-sm text-customBlue-400">
          {new Date(comment?.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="mb-3 text-customBlue-100">{comment.content}</p>
      <div className="mb-3 flex items-center space-x-4 text-sm">
        <button
          onClick={() => onLike(comment._id)}
          className="flex items-center text-neonPink-400 transition-colors duration-200 hover:text-neonPink-300"
        >
          <ThumbsUp size={14} className="mr-1" />
          {comment?.likes?.length}
        </button>
        <button
          onClick={() => onDislike(comment._id)}
          className="flex items-center text-neonPink-400 transition-colors duration-200 hover:text-neonPink-300"
        >
          <ThumbsDown size={14} className="mr-1" />
          {comment?.dislikes?.length}
        </button>
        <button
          onClick={() => setIsReplying(!isReplying)}
          className="flex items-center text-electricCyan-400 transition-colors duration-200 hover:text-electricCyan-300"
        >
          {isReplying ? (
            <X size={14} className="mr-1" />
          ) : (
            <Reply size={14} className="mr-1" />
          )}
          {isReplying ? 'Cancel' : 'Reply'}
        </button>
        {repliesComment && repliesComment?.length > 0 && (
          <button
            onClick={toggleReplies}
            className="flex items-center text-electricCyan-400 transition-colors duration-200 hover:text-electricCyan-300"
          >
            {isExpanded ? (
              <ChevronUp size={14} className="mr-1" />
            ) : (
              <ChevronDown size={14} className="mr-1" />
            )}
            {isExpanded
              ? 'Hide Replies'
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
              className="flex-grow rounded-lg border border-neonPink-700/30 bg-customBlue-700 p-2 text-customBlue-100 placeholder-customBlue-400 transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-neonPink-500"
            />
            <button
              type="submit"
              className="flex items-center rounded-lg bg-neonPink-600 px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-neonPink-500"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader className="mr-2 animate-spin" size={16} />
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
