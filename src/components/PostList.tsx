import { useEffect, useState } from "react";
import { fetchPosts, getPosts } from "../features/postSlice";
import { useAppDispatch, useAppSelector } from "../app/hook";

import Avater from "./Avater";
import PostCard from "./PostCard";
import { IPost } from "../types/type";

const PostList = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(getPosts);
  const status = useAppSelector((state) => state.posts.status);
  let content: JSX.Element;
  if (status === "loading") {
    content = <div>Fetching Data</div>;
    return content;
  }
  if (status === "error") {
    content = <div>please refresh the page</div>;
    return content;
  }
  if (status === "success") {
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
    return content;
  }

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return content!;
};

export default PostList;
