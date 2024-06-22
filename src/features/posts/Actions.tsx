import { Stack } from "react-bootstrap";
import like from "../../assets/heart-gray.svg";
import liked from "../../assets/heart-filled.svg";
import repost from "../../assets/repost.svg";
import reply from "../../assets/reply.svg";
import share from "../../assets/share.svg";
import { useState } from "react";
import { useAppSelector } from "../../app/hook";
import { useLocation, useNavigate } from "react-router-dom";

const Actions = (props: any) => {
  const { post, postId, setisReplayingTo } = props;
  const { currentUser } = useAppSelector((state) => state.auth);
  const [checkLike, setCheckLike] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleReplyBox = () => {
    console.log(post?.id);
  };

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
    console.log(postId);
  }
  return (
    <>
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
          role="button"
          onClick={() => setisReplayingTo((prev: boolean) => !prev)}
        />
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
    </>
  );
};

export default Actions;
