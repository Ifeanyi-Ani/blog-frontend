import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../features/posts/postSlice";
import PostCard from "../features/posts/PostCard";
import { useEffect } from "react";
import { SpinnerCircle } from "../ui/SpinnerCircle";
import CreateComment from "../features/comments/createComment";
import CommentList from "../features/comments/commentList";
import { useAppSelector } from "../app/hook";

const PostPreview = () => {
  const { id } = useParams<{ id: string }>();
  const { data: postData, isLoading, error, isSuccess } = useGetPostQuery(id!);
  const { currentUser } = useAppSelector((state) => state.auth);
  const { id: postId } = useParams();

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
    console.log(postData);
    return (
      <>
        <PostCard post={postData} />
        <div>
          <CreateComment currentUser={currentUser} postId={postId} />
        </div>
        <CommentList postId={postId} />
      </>
    );
  }

  return null;
};

export default PostPreview;
