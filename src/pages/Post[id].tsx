import * as React from 'react';
import { useParams } from 'react-router-dom';

import { LoadingState } from '../ui/shared/LoadingState';
import { useGetPostQuery, useGetPostsQuery } from '../features/posts/postSlice';
import { CustomPageError } from '../ui/shared/CustomPageError';
import { NotFoundState } from '../ui/shared/NotFoundState';
import PostItem from '../ui/shared/PostItem';
import { IPost } from '../types/type';
import { BackBtn } from '../ui/shared/BackBtn';

interface PostPreviewProps {
  post?: IPost;
}

const PostPreview: React.FC<PostPreviewProps> = () => {
  const { postId } = useParams<{ postId: string }>();
  const { data: post, isLoading, error } = useGetPostQuery(postId as string);
  const { data: posts } = useGetPostsQuery(null);

  if (isLoading) return <LoadingState />;
  if (error) return <CustomPageError error={error} title="Error" />;
  if (!post)
    return (
      <NotFoundState
        title="Post Not Found"
        message="We couldn't find the post you are looking for with that postId"
      />
    );

  return (
    <>
      <div className="mb-8">
        <BackBtn text="Back to posts" to="/" />
      </div>
      <PostItem post={post} isPreview />

      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-accent-foreground">
          Recommended Posts
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts
            ?.slice(0, 2)
            .map((rec: IPost) => <PostItem post={rec} key={rec._id} />)}
        </div>
      </div>
    </>
  );
};

export default PostPreview;
