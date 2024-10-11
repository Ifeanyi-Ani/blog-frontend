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
import { motion } from 'framer-motion';

interface PostItemProps {
  post: IPost;
  isPreview?: boolean;
}

const PostItem = ({ post }: { post: IPost }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg bg-card p-6 shadow-md transition-all duration-300"
    >
      <div className="mb-4 flex items-start justify-between">
        <Link
          to={`/posts/${post._id}`}
          className="text-2xl font-semibold text-primary hover:underline"
        >
          {post.title}
        </Link>
        <DropDownMenu>{/* Your existing DropDownMenu content */}</DropDownMenu>
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
        className="prose prose-sm mb-6 line-clamp-3 max-w-none text-foreground"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <Link
        to={`/posts/${post._id}`}
        className="mb-4 flex items-center text-primary hover:underline"
      >
        Read More
        <ChevronRight size={16} className="ml-1" />
      </Link>

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
          <span>{post.comments?.length}</span>
        </button>
      </div>
    </motion.div>
  );
};
export default PostItem;
