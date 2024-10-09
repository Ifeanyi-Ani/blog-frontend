import { Loader, MessageSquare, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { toast } from 'react-hot-toast';

import { CommentItem } from './CommentItem';
import { useCreateCommentMutation } from './commentSlice';
import { IComment } from '../../types/type';

interface CommentSectionProps {
  initialComments: IComment[];
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  initialComments = [],
  postId,
}) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isMounted, setMount] = useState(false);
  const [createComment, { isLoading, isSuccess, error }] =
    useCreateCommentMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { content: newComment };
    await createComment({ formData: data, postId: postId }).unwrap();
  };

  const handleLike = (commentId: string) => {
    setComments(
      updateCommentRecursively(comments, commentId, (comment: IComment) => ({
        ...comment,
        likes: comment.likes?.length + 1,
      }))
    );
  };

  const handleDislike = (commentId: string) => {
    setComments(
      updateCommentRecursively(comments, commentId, (comment) => ({
        ...comment,
        dislikes: comment.dislikes + 1,
      }))
    );
  };

  const handleReply = (commentId, replyContent) => {
    const reply = {
      id: Date.now(),
      content: replyContent,
      author: {
        username: 'Current User',
        photo: '/path/to/user/photo.jpg',
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      replies: [],
    };

    setComments(
      updateCommentRecursively(comments, commentId, (comment) => ({
        ...comment,
        replies: [reply, ...(comment.replies || [])],
      }))
    );
  };

  const updateCommentRecursively = (comments, id, updateFn) => {
    return comments.map((comment) => {
      if (comment.id === id) {
        return updateFn(comment);
      }
      if (comment.replies) {
        return {
          ...comment,
          replies: updateCommentRecursively(comment.replies, id, updateFn),
        };
      }
      return comment;
    });
  };

  useEffect(
    function () {
      if (isSuccess) {
        toast.success('You just comment to a post');
        setNewComment('');
      }
      if (error) {
        if ('data' in error) {
          toast.error(error?.data?.message || 'An error occured!');
        } else {
          toast.error('An unexpected error occured');
        }
      }
    },
    [isSuccess, error]
  );

  useEffect(
    function () {
      if (isMounted) {
        setComments(initialComments);
      }
      setMount(true);
    },
    [isMounted, initialComments]
  );

  if (!isMounted) {
    return null;
  }
  return (
    <div className="mt-8 rounded-xl border border-neonPink-700/30 bg-customBlue-900 p-6 shadow-xl">
      <h3 className="mb-6 flex items-center text-2xl font-semibold text-neonPink-300">
        <MessageSquare className="mr-2" />
        Comments ({comments?.length})
      </h3>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex items-center space-x-4">
          <img
            src="/path/to/user/photo.jpg"
            alt="Current User"
            className="h-10 w-10 rounded-full border-2 border-electricCyan-500"
          />
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-grow rounded-lg border border-neonPink-700/30 bg-customBlue-800 p-3 text-customBlue-100 placeholder-customBlue-400 transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-neonPink-500"
          />
          <button
            type="submit"
            className="flex items-center rounded-lg bg-neonPink-600 px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-neonPink-500"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader className="mr-2 animate-spin" size={16} />
                Commenting...
              </span>
            ) : (
              <>
                <Send size={18} className="mr-2" />
                Comment
              </>
            )}
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {comments?.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            onLike={handleLike}
            onDislike={handleDislike}
            onReply={handleReply}
            postId={postId}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
