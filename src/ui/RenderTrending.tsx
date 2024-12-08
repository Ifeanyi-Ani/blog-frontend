import { Link } from 'react-router-dom';
import { Image, Clock } from 'lucide-react';

import { formatDate as format } from '../lib/utils';
import { IPost } from '../types/type';

export const RenderTrending = ({ post }: { post: IPost }) => {
  const decodeHtml = (html: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const decodedContent = decodeHtml(post.content || '');
  const imgMatch = decodedContent.match(/<img[^>]*src=["']([^"']*)["'][^>]*>/);
  const imgSrc = imgMatch ? imgMatch[1] : '';
  return (
    <li className="w-full">
      <Link
        to={`/posts/${post._id}`}
        className="flex w-full items-center text-sm hover:underline"
      >
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
        <div className="flex-1">
          {post.title}
          <div>
            <p className="font-medium text-primary">{post.author?.username}</p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground dark:text-gray-400">
              <time>{format(new Date(post.createdAt as string))}</time>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default RenderTrending;
