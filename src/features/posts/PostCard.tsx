import { Link } from "react-router-dom";
import { ReactNode, useState } from "react";
import { Card, Stack } from "react-bootstrap";

import like from "../../assets/heart-gray.svg";
import liked from "../../assets/heart-filled.svg";
import repost from "../../assets/repost.svg";
import reply from "../../assets/reply.svg";
import share from "../../assets/share.svg";
import { useAppSelector } from "../../app/hook";
import UserHeader from "../users/UserHeader";
import { IPost } from "../../types/type";

type PostCardProps = {
  post: IPost;
  children?: ReactNode;
};

const PostCard = (props: PostCardProps) => {
  const { children, post } = props;
  const { currentUser } = useAppSelector((state) => state.auth);
  const [checkLike, setCheckLike] = useState(false);

  function checkLikeUser() {
    const likedIndex = post.likes.findIndex(
      (like) => like.user.toString() === currentUser?.id,
    );
    if (likedIndex === -1) {
      return setCheckLike(false);
    }
    return setCheckLike(true);
  }

  async function handleLike(postId: string) {
    try {
      if (!currentUser) {
        return null;
      }
      const data = { userId: currentUser?.id };
      // const response = await API.post(`/${postId}/like`, data);
      return alert(await response.data);

      // await dispatch(likeAndunlikePost(data, postId, LIKE));
    } catch (error: any) {
      alert(error.response.data.message);
    }
  }

  return (
    <div>
      <Card>
        {children}
        <UserHeader currentUser={currentUser} post={post} />
        <Card.Body>
          <div className="" />
          <Link
            to={`/post/${post._id}`}
            className="text-decoration-none fs-3 text-dark text-decoration-hover"
          >
            <Card.Title>{post?.title}</Card.Title>
          </Link>
          {post?.image ? (
            <Card.Img
              src={post?.image}
              alt="content"
              className="img-fluid"
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
          <Card.Text className="d-flex gap-1 flex-wrap">
            {post?.category
              ? post?.category.map(
                  (item: { value: string; label: string }, idx: number) => (
                    <span key={idx}>#{item.label}</span>
                  ),
                )
              : null}
          </Card.Text>
        </Card.Body>
        <Card.Footer style={{ borderTop: "none" }} className="d-flex">
          <Stack className="footer-img gap-3" direction="horizontal">
            <img
              src={checkLike ? liked : like}
              alt="like"
              className="cursor-pointer object-fit-contain"
              role="button"
              onClick={() => handleLike(post.id)}
              style={{ width: "24px", height: "24px" }}
            />
            <Link to={`/post/${post.id}`}>
              <img
                src={reply}
                alt="reply"
                className="cursor-pointer object-fit-contain"
                style={{ width: "24px", height: "24px" }}
              />
            </Link>
            <img
              src={repost}
              alt="repost"
              className="cursor-pointer object-fit-contain"
              role="button"
              style={{ width: "24px", height: "24px" }}
            />
            <img
              src={share}
              alt="share"
              className="cursor-pointer object-fit-contain"
              role="button"
              style={{ width: "24px", height: "24px" }}
            />
          </Stack>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default PostCard;
