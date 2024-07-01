import { Link } from "react-router-dom";
import { ReactNode, useState } from "react";
import { Card, Stack } from "react-bootstrap";

import { useAppSelector } from "../../app/hook";
import UserHeader from "../users/UserHeader";
import { IPost } from "../../types/type";
import Actions from "./Actions";
import DeleteBtn from "../../utils/DeleteBtn";
import { useDeletePostMutation } from "./postSlice";

type PostCardProps = {
  post: IPost;
  children?: ReactNode;
};

const PostCard = (props: PostCardProps) => {
  const { children, post } = props;
  const { currentUser } = useAppSelector((state) => state.auth);
  const [
    deletePost,
    {
      isLoading: deletePostisLoading,
      isSuccess: deletPostisSucess,
      isError: deletePostisError,
    },
  ] = useDeletePostMutation();

  const deletePostData = post?._id;

  return (
    <article className="flex-1 rounded-xl">
      <Card className="relative">
        {post?.userId?.id === currentUser?.id && (
          <DeleteBtn
            deleteData={deletePost}
            deleteDetails={deletePostData}
            isLoading={deletePostisLoading}
            isSuccess={deletPostisSucess}
            isError={deletePostisError}
          />
        )}
        {children}
        <UserHeader currentUser={currentUser} post={post} />
        <Card.Body>
          <div />
          <Link
            to={`/post/${post._id}`}
            className="no-underline font-bold text-blue-900 hover:underline"
          >
            <Card.Title className="">{post?.title}</Card.Title>
          </Link>
          {post?.image ? (
            <Card.Img
              src={post?.image}
              alt="content"
              className="w-full"
              style={{
                width: "500px",
                height: "400px",
                objectFit: "cover",
              }}
            />
          ) : null}

          <div className="" style={{ width: "50%" }}>
            {post?.body}
          </div>
          <Card.Text className="flex gap-1 flex-wrap">
            {post?.category
              ? post?.category.map(
                  (item: { value: string; label: string }, idx: number) => (
                    <span key={idx}>#{item.label}</span>
                  ),
                )
              : null}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="flex border-none">
          <Actions post={post} comment={post.comments} />
        </Card.Footer>
      </Card>
    </article>
  );
};

export default PostCard;
