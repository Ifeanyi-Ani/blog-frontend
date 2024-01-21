import { useEffect } from "react";
import { fetchPosts, getPosts } from "../features/posts/postSlice";
import { useAppDispatch, useAppSelector } from "../app/hook";

import Avater from "./Avater";
import PostCard from "./PostCard";

const PostList = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(getPosts);
  const status = useAppSelector((state) => state.posts.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  let content: JSX.Element;
  if (status === "loading") {
    content = <div>Fetching Data</div>;
  } else if (status === "error") {
    content = <div>please refresh the page</div>;
  } else if (status === "success") {
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
