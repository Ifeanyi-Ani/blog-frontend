import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Image,
  MessageSquare,
  ThumbsUp,
  Clock,
} from 'lucide-react';
import { MenuItem, MenuItems } from '@headlessui/react';
import { motion } from 'framer-motion';

import { formatDate as format } from '../../lib/utils';
import { IPost } from '../../types/type';
import { DropDownMenu } from './DropDownMenu';
import CommentSection from '../../features/comments/CommentSection';
import { useGetPostCommentsQuery } from '../../features/comments/commentSlice';
import { useAppSelector } from '../../app/hook';
import {
  useDeletePostMutation,
  useLikePostMutation,
} from '../../features/posts/postSlice';
import { cn } from '../../lib/utils';

interface PostItemProps<T extends IPost> {
  post: T;
  isPreview?: boolean;
}

export default function PostItem<T extends IPost>({
  post,
  isPreview = false,
}: PostItemProps<T>) {
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { data: initialComments } = useGetPostCommentsQuery(post?._id);
  const [likePost] = useLikePostMutation();
  const [deletePost, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeletePostMutation();

  const decodeHtml = (html: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const decodedContent = decodeHtml(post.content || '');
  const imgMatch = decodedContent.match(/<img[^>]*src=["']([^"']*)["'][^>]*>/);
  const imgSrc = imgMatch ? imgMatch[1] : '';

  const previewText = decodedContent
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .slice(0, 30)
    .join(' ');

  const handleLike = async () => {
    try {
      await likePost(post._id as string).unwrap();
      toast.success('Post liked!');
    } catch (error) {
      toast.error('Failed to like post');
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(post._id as string).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (deleteSuccess) {
      toast.success('Post deleted successfully');
      navigate('/');
    }
    if (deleteError) {
      toast.error('Failed to delete post');
    }
  }, [deleteSuccess, deleteError, navigate]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden px-6"
    >
      {isPreview && currentUser?.id === post.author._id && (
        <div className="absolute right-4 top-4 z-10">
          <DropDownMenu>
            <MenuItems
              className="w-fit rounded-lg bg-card p-1 shadow-xl"
              anchor="left"
            >
              <MenuItem>
                {({ focus }) => (
                  <button
                    className={cn(
                      'w-full rounded-md px-3 py-2 text-sm transition-colors',
                      focus && 'bg-primary text-primary-foreground'
                    )}
                  >
                    Edit
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <button
                    onClick={handleDelete}
                    className={cn(
                      'w-full rounded-md px-3 py-2 text-sm transition-colors',
                      focus && 'bg-destructive text-destructive-foreground'
                    )}
                  >
                    Delete
                  </button>
                )}
              </MenuItem>
            </MenuItems>
          </DropDownMenu>
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={post.author.photo}
            alt={post.author.username}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20"
          />
          <div>
            <p className="font-medium text-primary">{post.author?.username}</p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground dark:text-gray-400">
              <Clock size={14} />
              <time>{format(new Date(post.createdAt as string))}</time>
            </div>
          </div>
        </div>
      </div>

      <Link to={`/posts/${post._id}`} className="block">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="mb-4 text-2xl font-bold text-primary">
              {post.title}
            </h2>
            {!isPreview && (
              <p className="mb-4 text-muted-foreground">{previewText}...</p>
            )}
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <span
                  key={tag._id}
                  className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
                >
                  {tag.text}
                </span>
              ))}
            </div>
          </div>
          {!isPreview && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              {imgSrc ? (
                <img
                  src={imgSrc}
                  alt="Post cover"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gray-100 dark:bg-gray-700">
                  <Image className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>
          )}
        </div>
      </Link>

      {isPreview && (
        <div
          className="prose prose-lg dark:prose-invert mt-8 max-w-none"
          dangerouslySetInnerHTML={{ __html: decodedContent }}
        />
      )}

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={cn(
              'flex items-center space-x-2 rounded-full bg-secondary/50 px-4 py-2 hover:bg-secondary',
              post.likes?.includes(currentUser?._id as string) &&
                'bg-primary/10 text-primary hover:bg-primary/20'
            )}
          >
            <ThumbsUp size={18} />
            <span>{post.likes?.length || 0}</span>
          </button>
          <button
            className="flex items-center space-x-2 rounded-full bg-gray-100 bg-secondary/50 px-4 py-2"
            onClick={() => navigate(`/posts/${post._id}`)}
          >
            <MessageSquare size={18} />
            <span>{initialComments?.length || 0}</span>
          </button>
        </div>

        {!isPreview && (
          <Link
            to={`/posts/${post._id}`}
            className="flex items-center space-x-2 font-medium text-accent-foreground transition-colors hover:text-accent-foreground/80"
          >
            <span>Read More</span>
            <ChevronRight size={16} />
          </Link>
        )}
      </div>

      {isPreview && (
        <div className="mt-8 pt-8">
          <CommentSection
            initialComments={initialComments}
            postId={post._id as string}
          />
        </div>
      )}
    </motion.article>
  );
}
