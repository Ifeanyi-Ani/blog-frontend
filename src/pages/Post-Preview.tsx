import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../features/posts/postSlice";
import toast from "react-hot-toast";
import PostCard from "../features/posts/PostCard";
import { useEffect } from "react";
import { SpinnerCircle } from "../ui/SpinnerCircle";

const PostPreview = () => {
  const { id } = useParams<{ id: string }>();
  const { data: postData, isLoading, error, isSuccess } = useGetPostQuery(id!);

  let content: React.ReactElement;
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
  } else if (isSuccess) {
    content = <PostCard post={postData} />;
  }
  console.log(postData, id);

  return isLoading ? <SpinnerCircle /> : <> {content!} </>;
};

export default PostPreview;
