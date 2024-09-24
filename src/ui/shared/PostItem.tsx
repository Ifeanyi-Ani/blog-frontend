import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, MessageSquare, ThumbsUp } from "lucide-react";
import { format } from "date-fns";
import { Post } from "../../types/type";
import { DropDownMenu } from "./DropDownMenu";
import { MenuItem, MenuItems } from "@headlessui/react";

interface PostItemProps {
  post: Post;
  isPreview?: boolean;
}

const PostItem: React.FC<PostItemProps> = ({ post, isPreview = false }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateContent = (content: string, maxLength: number) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, content.lastIndexOf(" ", maxLength)) + "...";
  };

  return (
    <div className="bg-customBlue-900 rounded-xl p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-neonPink-500/20 border border-neonPink-700/30">
      <div className="flex justify-between items-start mb-4">
        <Link
          to={`/posts/${post._id}`}
          className="text-3xl font-semibold text-neonPink-300 hover:text-neonPink-200 transition-colors duration-200"
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
                        ? "bg-customBlue-700 text-electricCyan-300"
                        : "text-electricCyan-400"
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
                        ? "bg-customBlue-700 text-customRed-300"
                        : "text-customRed-400"
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
          <div className="text-electricCyan-300 mb-4 flex items-center space-x-2 text-subtle">
            <img
              src={post.author.photo}
              alt={post.author.username}
              className="w-8 h-8 rounded-full border-2 border-neonPink-500"
            />
            <span>{post.author?.username}</span>
            <span>•</span>
            <span>{format(new Date(post.createdAt), "MMM d, yyyy")}</span>
          </div>
        </>
      )}
      {isPreview && (
        <>
          {post.images && post.images.length > 0 && (
            <div className="flex items-center mb-6">
              <img
                src={post?.author?.photo}
                alt={post.author.username}
                className="w-12 h-12 rounded-full border-2 border-electricCyan-500"
              />
              <div className="ml-4">
                <p className="text-electricCyan-300 font-semibold">
                  {post.author.username}
                </p>
                <p className="text-customBlue-300 text-sm">
                  Posted on {formatDate(post.createdAt)} ·{" "}
                  {Math.ceil(post.content.length / 1000)} min read
                </p>
              </div>
            </div>
          )}
        </>
      )}
      <div
        className="text-customBlue-100 mb-6 prose prose-sm max-w-none prose-headings:text-neonPink-300 prose-a:text-electricCyan-400 hover:prose-a:text-electricCyan-300"
        dangerouslySetInnerHTML={
          isPreview
            ? { __html: post.content }
            : { __html: truncateContent(post.content, 3000) }
        }
      />
      {!isPreview && (
        <Link
          to={`/posts/${post._id}`}
          className="text-neonPink-400 hover:text-neonPink-300 transition-colors duration-200 flex items-center"
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
              alt={`Post image ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105 border border-neonPink-500/30"
            />
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map((tag) => (
          <span
            key={tag._id}
            className="bg-electricCyan-900 text-electricCyan-300 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 hover:bg-electricCyan-800 hover:text-electricCyan-200 border border-electricCyan-700"
          >
            {tag.text}
          </span>
        ))}
      </div>
      <div className="flex items-center space-x-6 text-neonPink-400">
        <button className="flex items-center space-x-2 hover:text-neonPink-300 transition-colors duration-200">
          <ThumbsUp size={18} />
          <span>{post.likes.length}</span>
        </button>

        <button className="flex items-center space-x-2 hover:text-neonPink-300 transition-colors duration-200">
          <MessageSquare size={18} />
          <span>{post.comments.length}</span>
        </button>
      </div>
    </div>
  );
};

export default PostItem;
