import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../features/posts/postSlice";
import PostCard from "../features/posts/PostCard";
import { SpinnerCircle } from "../ui/SpinnerCircle";
import CreateComment from "../features/comments/createComment";
import CommentList from "../features/comments/commentList";
import { useAppSelector } from "../app/hook";
import { useGetCommentsQuery } from "../features/comments/commentSlice";

const PostPreview = () => {
  const { id } = useParams<{ id: string }>();
  const { data: postData, isLoading, error, isSuccess } = useGetPostQuery(id!);
  const { currentUser } = useAppSelector((state) => state.auth);
  const { id: postId } = useParams();
  const {
    data: commentsData,
    isLoading: commentLoading,
    isSuccess: commentSuccess,
    error: commentError,
  } = useGetCommentsQuery(postId);
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
    console.log("commentData", commentsData);
    return (
      <>
        <PostCard post={postData} />
        <div>
          <CreateComment currentUser={currentUser} postId={postId} />
        </div>
        <CommentList
          commentsData={commentsData}
          isLoading={commentLoading}
          isSuccess={commentSuccess}
          isError={commentError}
          error={error}
          postId={postId}
          currentUser={currentUser}
        />
      </>
    );
  }

  return null;
};

export default PostPreview;
