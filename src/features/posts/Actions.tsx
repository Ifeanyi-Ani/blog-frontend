import { Stack } from "react-bootstrap";
import like from "../../assets/heart-gray.svg";
import liked from "../../assets/heart-filled.svg";
import repost from "../../assets/repost.svg";
import reply from "../../assets/reply.svg";
import share from "../../assets/share.svg";
import { useState } from "react";
import { useAppSelector } from "../../app/hook";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IPost } from "../../types/type";

type Props = {
  post: IPost;
  postId: string;
  setisReplayingTo: (isReplyingTo: boolean) => void;
  showReply: boolean;
  toggleShowReply: (showReply: boolean) => void;
};

const Actions = (props: any) => {
  const { post, postId, setisReplayingTo, showReply, toggleShowReply } = props;
  const { currentUser } = useAppSelector((state) => state.auth);
  const [checkLike, setCheckLike] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
        {pathname === `/post/${postId}` ? (
          <img
            src={repost}
            alt="repost"
            className="cursor-pointer object-cover w-6 h-6"
            role="button"
            onClick={() => toggleShowReply(!showReply)}
          />
        ) : (
          <Link to={`/post/${post._id}`}>
            <img
              src={repost}
              alt="repost"
              className="cursor-pointer object-cover w-6 h-6"
              role="button"
            />
          </Link>
        )}
      </Stack>
    </>
  );
};

export default Actions;
