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
  iscomment?: boolean;
  comments: [
    userId: {
      photo: string;
    },
  ];
};

const PostCard = (props: PostCardProps) => {
  const { children, post, iscomment, comments } = props;
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
    <article className="flex-1 rounded-xl">
      <Card>
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
          <Stack className="gap-3" direction="horizontal">
            <img
              src={checkLike ? liked : like}
              alt="like"
              className="cursor-pointer object-cover w-6 h-6"
              role="button"
              onClick={() => handleLike(post.id)}
            />
            <img
              src={reply}
              alt="reply"
              className="cursor-pointer object-cover w-6 h-6"
            />
            {/* {iscomment && comments.length > 0 && ( */}
            {/*   <Link to={`/post/${post.id}`}> */}
            {/*     {comments.length} repl{comments.length > 1 ? "ies" : "y"} */}
            {/*   </Link> */}
            {/* )} */}
            <img
              src={repost}
              alt="repost"
              className="cursor-pointer object-cover w-6 h-6"
              role="button"
            />
            <img
              src={share}
              alt="share"
              className="cursor-pointer object-cover w-6 h-6"
              role="button"
            />
          </Stack>
        </Card.Footer>
      </Card>

      {/* {!iscomment && comments.length > 0 && ( */}
      {/*   <div className="ml-1 mt-3 flex items-center gap-2"> */}
      {/*     {comments.slice(0, 2).map((comment, index) => ( */}
      {/*       <img */}
      {/*         key={index} */}
      {/*         src={comment.photo} */}
      {/*         alt={`user_${index}`} */}
      {/*         width={24} */}
      {/*         height={24} */}
      {/*         className={`${index !== 0 && "-ml-5"} rounded-full object-cover`} */}
      {/*       /> */}
      {/*     ))} */}
      {/**/}
      {/*     <Link to={`/post/${post._id}`}> */}
      {/*       <p className="mt-1 text-subtle-medium text-gray-1"> */}
      {/*         {comments.length} repl{comments.length > 1 ? "ies" : "y"} */}
      {/*       </p> */}
      {/*     </Link> */}
      {/*   </div> */}
      {/* )} */}
    </article>
  );
};

export default PostCard;
