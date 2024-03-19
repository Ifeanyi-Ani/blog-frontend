import { useGetPostsQuery } from "../features/posts/postSlice";

import Avater from "./Avater";
import PostCard from "./PostCard";

const PostList = () => {
  // FIX: why is it showing 1-2 argument expected 0 provided in useGetPostsQuery()
  const { data: posts, isLoading, error } = useGetPostsQuery(null);

  let content: JSX.Element;
  if (isLoading) {
    content = <div>Fetching Data</div>;
  } else if (error) {
    // TODO: find the right type to resolve the error showing in the error.data
    content = <div>{error?.data?.message}</div>;
    console.log(error);
  } else if (posts) {
    console.log(posts);
    content = (
      <>
        {posts ? (
          [...posts].reverse().map((post) => (
            <div className="gridItem" key={post.id}>
              <Avater src={post?.userId?.photo} />
              <PostCard post={post} />
            </div>
          ))
        ) : (
          <div>No Posts Available</div>
        )}
      </>
    );
  }

  return (
    <>
      <div>{content!}</div>
    </>
  );
};

export default PostList;
