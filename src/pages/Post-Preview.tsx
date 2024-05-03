import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../features/posts/postSlice";
import toast from "react-hot-toast";
import PostCard from "../features/posts/PostCard";
import { useEffect, useState } from "react";
import { SpinnerCircle } from "../ui/SpinnerCircle";
import { isError } from "lodash";

const PostPreview = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, error, isSuccess } = useGetPostQuery(id!);

  let content: JSX.Element;
  useEffect(() => {
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
    } else if (isSuccess) content = <PostCard post={post} />;
  }, [isLoading, isSuccess, error]);

  return isLoading ? <SpinnerCircle /> : <> {content!}</>;
};

export default PostPreview;
