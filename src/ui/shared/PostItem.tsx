import { Link } from 'react-router-dom';
import { ChevronRight, MessageSquare, ThumbsUp } from 'lucide-react';
import { format } from 'date-fns';
import { MenuItem, MenuItems } from '@headlessui/react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { IPost } from '../../types/type';
import { DropDownMenu } from './DropDownMenu';
import CommentSection from '../../features/comments/CommentSection';
import { useGetPostCommentsQuery } from '../../features/comments/commentSlice';
import { useAppSelector } from '../../app/hook';
import { CodeBlock } from '../../features/posts/SyntaxHighligher';

interface PostItemProps<T extends IPost> {
  post: T;
  isPreview?: boolean;
}

export default function PostItem<T extends IPost>({
  post,
  isPreview = false,
}: PostItemProps<T>) {
  const { data: initialComments } = useGetPostCommentsQuery(post?._id);
  const { currentUser } = useAppSelector((state) => state.auth);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`grid w-full p-2 transition-all duration-300 ${!isPreview && 'rounded-lg bg-card shadow-md hover:shadow-lg'}`}
    >
      <div className="relative mb-4 flex items-start justify-between">
        <Link
          to={`/posts/${post._id}`}
          className="text-xl font-semibold text-primary transition-colors duration-200 hover:text-primary/80 hover:underline sm:text-2xl"
        >
          {post.title}
        </Link>
        {isPreview && currentUser?.id === post.author._id && (
          <DropDownMenu>
            <MenuItems className="absolute right-0 !z-20 mt-2 w-56 origin-top-right divide-y divide-border rounded-md bg-popover shadow-lg ring-1 ring-primary/10 focus:outline-none">
              <div className="px-1 py-1">
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={`${
                        focus
                          ? 'bg-accent text-accent-foreground'
                          : 'text-foreground hover:bg-accent/10'
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
                          ? 'bg-destructive text-destructive-foreground'
                          : 'text-destructive hover:bg-destructive/10'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors duration-200`}
                    >
                      Delete
                    </button>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </DropDownMenu>
        )}
      </div>

      <div className="mb-4 flex items-center space-x-2 text-xs text-muted-foreground sm:text-sm">
        <img
          src={post.author.photo}
          alt={post.author.username}
          className="h-6 w-6 rounded-full border border-primary/20 sm:h-8 sm:w-8"
        />
        <span className="font-medium text-foreground/80">
          {post.author?.username}
        </span>
        <span>•</span>
        <span>{format(new Date(post.createdAt as string), 'MMM d, yyyy')}</span>
      </div>

      <div
        className={`prose prose-sm dark:prose-invert mb-6 w-full overflow-auto text-foreground ${
          !isPreview && 'line-clamp-3'
        }`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return node && match ? (
                <CodeBlock language={match[1]}>
                  {String(children).replace(/\n$/, '')}
                </CodeBlock>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {!isPreview && (
        <Link
          to={`/posts/${post._id}`}
          className="flex items-center text-primary transition-colors duration-200 hover:text-primary/80"
        >
          Read More
          <ChevronRight size={16} className="ml-1" />
        </Link>
      )}

      <div className="mb-6 flex flex-wrap gap-2">
        {post?.tags?.map((tag) => (
          <span
            key={tag._id}
            className="rounded-full bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary transition-colors duration-200 hover:bg-secondary/20"
          >
            {tag.text}
          </span>
        ))}
      </div>

      <div className="flex items-center space-x-6 text-muted-foreground">
        <button className="flex items-center space-x-2 transition-colors duration-200 hover:text-primary">
          <ThumbsUp size={16} />
          <span className="text-sm">{post.likes?.length}</span>
        </button>

        <button className="flex items-center space-x-2 transition-colors duration-200 hover:text-primary">
          <MessageSquare size={16} />
          <span className="text-sm">{initialComments?.length}</span>
        </button>
      </div>

      {isPreview && (
        <CommentSection
          initialComments={initialComments}
          postId={post._id as string}
        />
      )}
    </motion.div>
  );
}
