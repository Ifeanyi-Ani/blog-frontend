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

  useEffect(() => {
    if (isSuccess) {
      toast.success('Comment added successfully');
      setNewComment('');
    }
    if (error) {
      toast.error('Failed to add comment');
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (isMounted) {
      setComments(initialComments);
    }
    setMount(true);
  }, [isMounted, initialComments]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="mt-8 p-0 md:rounded-xl md:border md:border-border md:bg-card md:shadow-md">
      <h3 className="mb-6 flex items-center text-2xl font-semibold text-primary">
        <MessageSquare className="mr-2" />
        Comments ({comments?.length})
      </h3>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex items-center space-x-4">
          <img
            src="/path/to/user/photo.jpg"
            alt="Current User"
            className="h-10 w-10 rounded-full border-2 border-primary"
          />
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-grow rounded-lg border border-input bg-background p-3 text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            className="hidden items-center rounded-lg bg-primary px-6 py-3 font-bold text-primary-foreground hover:bg-primary/90 md:flex"
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
          <CommentItem key={comment._id} comment={comment} postId={postId} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
