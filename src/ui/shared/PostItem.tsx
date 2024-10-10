import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MessageSquare, ThumbsUp } from 'lucide-react';
import { format } from 'date-fns';
import { MenuItem, MenuItems } from '@headlessui/react';

import { IPost } from '../../types/type';
import { DropDownMenu } from './DropDownMenu';
import CommentSection from '../../features/comments/CommentSection';
import { useGetPostCommentsQuery } from '../../features/comments/commentSlice';

interface PostItemProps {
  post: IPost;
  isPreview?: boolean;
}

const PostItem: React.FC<PostItemProps> = ({ post, isPreview = false }) => {
  const {
    data: initialComments,
    isLoading,
    error,
  } = useGetPostCommentsQuery(post?._id);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (isPreview) {
      setComments(initialComments);
    }
  }, [isPreview, initialComments]);

  return (
    <div className="rounded-lg bg-card p-6 shadow-md transition-all duration-300">
      <div className="mb-4 flex items-start justify-between">
        <Link
          to={`/posts/${post._id}`}
          className="text-2xl font-semibold text-primary hover:underline"
        >
          {post.title}
        </Link>
        <DropDownMenu>
          <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-border rounded-md bg-popover shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <MenuItem>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? 'bg-accent text-accent-foreground'
                        : 'text-foreground'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Edit
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? 'bg-destructive text-destructive-foreground'
                        : 'text-destructive'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Delete
                  </button>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </DropDownMenu>
      </div>

      <div className="mb-4 flex items-center space-x-2 text-sm text-muted-foreground">
        <img
          src={post.author.photo}
          alt={post.author.username}
          className="h-8 w-8 rounded-full"
        />
        <span>{post.author?.username}</span>
        <span>•</span>
        <span>{format(new Date(post.createdAt as string), 'MMM d, yyyy')}</span>
      </div>

      <div
        className={`prose prose-sm mb-6 max-w-none text-foreground ${
          !isPreview && 'line-clamp-3'
        }`}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {!isPreview && (
        <Link
          to={`/posts/${post._id}`}
          className="flex items-center text-primary hover:underline"
        >
          Read More
          <ChevronRight size={16} className="ml-1" />
        </Link>
      )}

      {post.images && post.images.length > 0 && (
        <div className="mb-6 grid grid-cols-2 gap-4">
          {post.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Post ${index + 1}`}
              className="h-48 w-full rounded-lg object-cover shadow-md transition-transform duration-300 hover:scale-105"
            />
          ))}
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-2">
        {post?.tags?.map((tag) => (
          <span
            key={tag._id}
            className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
          >
            {tag.text}
          </span>
        ))}
      </div>

      <div className="flex items-center space-x-6 text-muted-foreground">
        <button className="flex items-center space-x-2 hover:text-primary">
          <ThumbsUp size={18} />
          <span>{post.likes?.length}</span>
        </button>

        <button className="flex items-center space-x-2 hover:text-primary">
          <MessageSquare size={18} />
          <span>{initialComments?.length}</span>
        </button>
      </div>

      {isPreview && (
        <CommentSection
          initialComments={initialComments}
          postId={post._id as string}
        />
      )}
    </div>
  );
};

export default PostItem;
