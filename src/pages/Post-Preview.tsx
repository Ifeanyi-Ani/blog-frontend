import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import { useGetPostQuery } from "../features/posts/postSlice";

const PostPreview = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, error } = useGetPostQuery(id!);
  let content: JSX.Element;
  if (isLoading) content = <div>Loading</div>;
  else if (error)
    content = <div>{error.data.message || "Something went wrong"}</div>;
  else if (post) content = <PostCard post={post} />;

  return content!;
};

export default PostPreview;
