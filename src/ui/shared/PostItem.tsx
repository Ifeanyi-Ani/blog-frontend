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
  useEffect(
    function () {
      if (isPreview) {
        setComments(initialComments);
      }
    },
    [isPreview]
  );

  return (
    <div className="rounded-xl p-0 transition-all duration-300 md:bg-customBlue-900 md:p-6 md:shadow-xl">
      <div className="mb-4 flex items-start justify-between">
        <Link
          to={`/posts/${post._id}`}
          className="text-3xl font-semibold text-neonPink-300 transition-colors duration-200 hover:text-neonPink-200"
        >
          {post.title}
        </Link>
        <DropDownMenu>
          <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-customBlue-700 rounded-md bg-customBlue-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <MenuItem>
                {({ focus }) => (
                  <button
                    className={`${
                      focus
                        ? 'bg-customBlue-700 text-electricCyan-300'
                        : 'text-electricCyan-400'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors duration-200`}
                  >
                    Edit
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <button
                    className={`${
                      focus
                        ? 'bg-customBlue-700 text-customRed-300'
                        : 'text-customRed-400'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors duration-200`}
                  >
                    Delete
                  </button>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </DropDownMenu>
      </div>

      {!isPreview && (
        <>
          <div className="mb-4 flex items-center space-x-2 text-subtle text-electricCyan-300">
            <img
              src={post.author.photo}
              alt={post.author.username}
              className="h-8 w-8 rounded-full border-2 border-neonPink-500"
            />
            <span>{post.author?.username}</span>
            <span>•</span>
            <span>
              {format(new Date(post.createdAt as string), 'MMM d, yyyy')}
            </span>
          </div>
        </>
      )}
      {isPreview && (
        <>
          {post.images && post.images.length > 0 && (
            <div className="mb-6 flex items-center">
              <img
                src={post?.author?.photo}
                alt={post.author.username}
                className="h-12 w-12 rounded-full border-2 border-electricCyan-500"
              />
              <div className="ml-4">
                <p className="font-semibold text-electricCyan-300">
                  {post.author.username}
                </p>
                <p className="text-sm text-customBlue-300">
                  Posted on {formatDate(post.createdAt as string)} ·{' '}
                  {Math.ceil(post.content.length / 1000)} min read
                </p>
              </div>
            </div>
          )}
        </>
      )}
      <div
        className={`prose prose-sm prose-headings:text-neonPink-300 prose-a:text-electricCyan-400 hover:prose-a:text-electricCyan-300 mb-6 max-w-none text-customBlue-100 ${!isPreview && 'line-clamp-3'}`}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      {!isPreview && (
        <Link
          to={`/posts/${post._id}`}
          className="flex items-center text-neonPink-400 transition-colors duration-200 hover:text-neonPink-300"
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
              className="h-48 w-full rounded-lg border border-neonPink-500/30 object-cover shadow-md transition-transform duration-300 hover:scale-105"
            />
          ))}
        </div>
      )}
      <div className="mb-6 flex flex-wrap gap-2">
        {post?.tags?.map((tag) => (
          <span
            key={tag._id}
            className="rounded-full border border-electricCyan-700 bg-electricCyan-900 px-3 py-1 text-xs font-medium text-electricCyan-300 transition-colors duration-200 hover:bg-electricCyan-800 hover:text-electricCyan-200"
          >
            {tag.text}
          </span>
        ))}
      </div>
      <div className="flex items-center space-x-6 text-neonPink-400">
        <button className="flex items-center space-x-2 transition-colors duration-200 hover:text-neonPink-300">
          <ThumbsUp size={18} />
          <span>{post.likes?.length}</span>
        </button>

        <button className="flex items-center space-x-2 transition-colors duration-200 hover:text-neonPink-300">
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
