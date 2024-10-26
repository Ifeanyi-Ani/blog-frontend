import {
  ThumbsUp,
  ThumbsDown,
  Reply,
  X,
  Send,
  Loader,
  EyeOff,
  Eye,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { useCreateReplyMutation, useGetRepliesQuery } from './commentSlice.ts';
import { IComment } from '../../types/type.ts';
import { LoadingState } from '../../ui/shared/LoadingState';

interface CommentItemProps {
  comment: IComment;
  onLike?: (commentId: string) => void;
  onDislike?: (commentId: string) => void;
  onReply?: (commentId: any, replyContent: any) => void;
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

  const handleReplySubmit = (e: React.FormEvent) => {
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

  useEffect(() => {
    if (isSuccess) {
      toast.success('Reply added successfully');
      setReplyContent('');
      setIsReplying(false);
      setIsExpanded(true);
    }
    if (error) {
      toast.error('Failed to add reply');
    }
  }, [isSuccess, error]);

  return (
    <div
      className={`rounded-lg ${!comment?.parentId && 'bg-card p-4 shadow-md'}`}
    >
      <div className="flex">
        <img
          src={comment?.userId?.photo}
          alt={comment?.userId?.username || 'avatar'}
          className="mr-3 h-8 w-8 rounded-full border border-primary"
        />
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="font-semibold text-primary">
              {comment?.userId?.username}
            </span>
            {comment?.parentAuthor && (
              <>
                <span className="ml-1 text-xs text-muted-foreground">
                  replied to
                </span>
                <span className="ml-1 text-xs font-semibold text-primary">
                  {comment?.parentAuthor}
                </span>
              </>
            )}
          </div>
          <span className="text-sm text-muted-foreground">
            {new Date(comment?.createdAt as Date).toLocaleDateString()}
          </span>
          <p className="mb-3 text-foreground">{comment.content}</p>
          <div className="mb-3 flex items-center space-x-4 text-sm">
            <button
              onClick={() => onLike(comment._id)}
              className="flex items-center text-muted-foreground hover:text-primary"
            >
              <ThumbsUp size={14} className="mr-1" />
              {comment?.likes?.length}
            </button>
            <button
              onClick={() => onDislike(comment._id)}
              className="flex items-center text-muted-foreground hover:text-primary"
            >
              <ThumbsDown size={14} className="mr-1" />
              {comment?.dislikes?.length}
            </button>
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="flex items-center text-muted-foreground hover:text-primary"
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
                className="flex items-center text-muted-foreground hover:text-primary"
              >
                {isExpanded ? (
                  <span className="flex text-primary">
                    <EyeOff className="h-4 w-4 shrink-0" />
                    {`(${repliesComment?.length})`}
                  </span>
                ) : (
                  <>
                    <Eye className="h-4 w-4 shrink-0" />
                    {`(${repliesComment?.length})`}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {isReplying && (
        <form onSubmit={handleReplySubmit} className="mb-3">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply..."
              className="flex-grow rounded-lg border border-input bg-background p-2 text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="hidden items-center rounded-lg bg-primary px-4 py-2 font-bold text-primary-foreground hover:bg-primary/90 md:flex"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader className="mr-2 animate-spin" size={16} />
                  Replying...
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
        repliesComment?.map((reply: IComment) => (
          <CommentItem
            key={reply._id}
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
