import React, { useEffect } from "react";
import { useGetCommentsQuery } from "./commentSlice";
import { SpinnerCircle } from "../../ui/SpinnerCircle";
import CommentItem from "./CommentItem";

const CommentList = (props: any) => {
  const { postId } = props;
  const {
    data: commentsData,
    isLoading,
    isSuccess,
    error,
    isError,
  } = useGetCommentsQuery(postId);
  let content: JSX.Element;

  if (isLoading) {
    content = <SpinnerCircle />;
  } else if (error) {
    if ("status" in error) {
      content = (
        <div>{"error" in error ? error.error : JSON.stringify(error.data)}</div>
      );
    } else {
      // TODO: find the right type to resolve the error showing in the error.data
      content = <div>{error?.message}</div>;
      console.error(error);
    }
  } else if (isSuccess) {
    content =
      commentsData.length > 0 &&
      commentsData.map((comment) => {
        return <CommentItem comment={comment} />;
      });
  }
  return content!;
};

export default CommentList;
