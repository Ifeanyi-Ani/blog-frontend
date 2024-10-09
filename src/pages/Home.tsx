import PostList from '../features/posts/PostList';
import { useGetPostsQuery } from '../features/posts/postSlice';
import { CustomPageError } from '../ui/shared/CustomPageError';
import { LoadingState } from '../ui/shared/LoadingState';
import { NotFoundState } from '../ui/shared/NotFoundState';

const Home = function () {
  const { data: posts, isLoading, error } = useGetPostsQuery(null);

  if (isLoading) return <LoadingState />;
  if (error) return <CustomPageError error={error} title="Error" />;
  if (!posts.length)
    return (
      <NotFoundState
        title="No Post Found"
        message="Sorry, there is no post to display, start by creating a post"
      />
    );
  return (
    <>
      <PostList posts={posts} />
    </>
  );
};

export default Home;
