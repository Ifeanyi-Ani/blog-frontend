import { useEffect, useState } from "react";
import { fetchPosts } from "../redux/posts/posts.action";
import { useSelector, useDispatch } from "react-redux";

import shareLogo from "../assets/share.jpg";
import reloadLogo from "../assets/reload.jpg";

import Avater from "./Avater";
import PostCard from "./PostCard";
import { IPost } from "../apis/baseUrl";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts?.posts);
  const [isLoading, setisLoading] = useState<boolean>(true);
  useEffect(() => {
    if (isLoading) {
      dispatch(fetchPosts());
    }
    setisLoading(false);
  }, [isLoading, dispatch]);

  return (
    <>
      {isLoading ? (
        <div>Fetching Data...</div>
      ) : posts?.data?.posts?.length ? (
        [...posts.data.posts].reverse().map((post: IPost, idx: number) => {
          return (
            <div className="gridItem" key={idx}>
              <Avater src={post?.userId?.photo} />
              <PostCard
                shareLogo={shareLogo}
                reloadLogo={reloadLogo}
                post={post}
              />
            </div>
          );
        })
      ) : (
        <div>No Posts Available</div>
      )}
    </>
  );
};

export default PostList;
