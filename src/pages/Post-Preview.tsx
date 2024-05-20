import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../features/posts/postSlice";
import PostCard from "../features/posts/PostCard";
import { useEffect } from "react";
import { SpinnerCircle } from "../ui/SpinnerCircle";

const PostPreview = () => {
  const { id } = useParams<{ id: string }>();
  const { data: postData, isLoading, error, isSuccess } = useGetPostQuery(id!);

  if (isLoading) {
    return <SpinnerCircle />;
  }
  if (error) {
    if ("data" in error!) {
      const errorData = error as any;
      const message =
        errorData?.data.msg ||
        errorData?.data?.message ||
        "something went wrong";
      return <div>{message}</div>;
    }
  }
  if (isSuccess) {
    return <PostCard post={postData} />;
  }

  return null;
};

export default PostPreview;
