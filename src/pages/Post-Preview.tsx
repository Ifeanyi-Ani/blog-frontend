import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../features/posts/postSlice";
import toast from "react-hot-toast";
import PostCard from "../features/posts/PostCard";

const PostPreview = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, error } = useGetPostQuery(id!);

  let content: JSX.Element;

  if (isLoading) {
    content = <div>Loading</div>;
  } else if (error) {
    if ("data" in error!) {
      const errorData = error as any;
      const message =
        errorData?.data.msg ||
        errorData?.data?.message ||
        "something went wrong";
      toast.error(message);
    }
  } else if (post) content = <PostCard post={post} />;

  return content!;
};

export default PostPreview;
