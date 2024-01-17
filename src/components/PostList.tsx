import { useEffect, useState } from "react";
import { fetchPosts } from "../features/postSlice";
import { useAppDispatch, useAppSelector } from "../app/hook";

import Avater from "./Avater";
import PostCard from "./PostCard";
import { IPost } from "../types/type";

const PostList = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts?.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      {/* {isLoading ? ( */}
      {/*   <div>Fetching Data...</div> */}
      {/* ) : posts?.data?.posts?.length ? ( */}
      {/*   [...posts.data.posts].reverse().map((post: IPost, idx: number) => { */}
      {/*     return ( */}
      {/*       <div className="gridItem" key={idx}> */}
      {/*         <Avater src={post?.userId?.photo} /> */}
      {/*         <PostCard post={post} /> */}
      {/*       </div> */}
      {/*     ); */}
      {/*   }) */}
      {/* ) : ( */}
      {/*   <div>No Posts Available</div> */}
      {/* )} */}
      {posts ? (
        posts.map((post) => <div>{post.title}</div>)
      ) : (
        <div>fetching posts</div>
      )}
    </>
  );
};

export default PostList;
