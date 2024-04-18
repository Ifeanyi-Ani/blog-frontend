import { Container } from "react-bootstrap";

import Avater from "../components/Avater";
import PostCard from "../components/PostCard";
import { useGetPostsQuery } from "../features/posts/postSlice";
import { useAppSelector } from "../app/hook";
import { SpinnerCircle } from "../components/SpinnerCircle";
import { IPost } from "../types/type";
import { useEffect, useState } from "react";

const Preview = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { data: posts, isLoading, isSuccess } = useGetPostsQuery(null);
  const [data, setData] = useState<IPost[] | null>(null);

  let content: JSX.Element;

  const getPostsById = (id: string, Posts: IPost[]) => {
    const filterPost = Posts.filter((post: IPost) => post.userId.id === id);
    return filterPost;
  };
  useEffect(() => {
    setData(getPostsById(currentUser?.id as string, posts));
  }, []);

  if (isLoading) {
    content = (
      <div>
        <SpinnerCircle />
      </div>
    );
  } else if (data) {
    content = (
      <section>
        <Container className="mansoryLayout listView">
          {data
            ? data.map((post: any) => (
                <div className="gridItem" key={post._id}>
                  <Avater src={post?.userId?.photo} />
                  <PostCard post={post} />
                </div>
              ))
            : "You have not post anything yet"}
        </Container>
      </section>
    );
  }

  return content!;
};
export default Preview;
