import { Stack } from "react-bootstrap";
import like from "../../assets/heart-gray.svg";
import liked from "../../assets/heart-filled.svg";
import repost from "../../assets/repost.svg";
import reply from "../../assets/reply.svg";
import { useState } from "react";
import { useAppSelector } from "../../app/hook";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IPost } from "../../types/type";
import CommentCount from "../comments/ComentCount";

type Props = {
  post?: IPost;
  postId: string;
  isReplyingTo: boolean;
  setisReplayingTo: (isReplyingTo: boolean) => void;
  showReply: boolean;
  toggleShowReply: (showReply: boolean) => void;
  comment: any;
};

const Actions = (props: Props) => {
  const {
    post,
    postId,
    setisReplayingTo,
    showReply,
    toggleShowReply,
    isReplyingTo,
    comment,
  } = props;
  const [checkLike, _setCheckLike] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  console.log(post);
  async function handleLike(postId: string) {}
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
          onClick={() => setisReplayingTo(!isReplyingTo)}
        />
        <div>
          {post?.comments?.length > 0
            ? post?.comments?.map((comment) => (
                <CommentCount
                  comment={comment}
                  toggleShowReply={toggleShowReply}
                  showReply={showReply}
                  post={post}
                  postId={postId}
                  key={comment._id}
                />
              ))
            : comment?.replies?.length > 0
              ? comment.replies.map((comment) => (
                  <CommentCount
                    comment={comment}
                    toggleShowReply={toggleShowReply}
                    showReply={showReply}
                    post={post}
                    postId={postId}
                    key={comment._id}
                  />
                ))
              : null}
        </div>
      </Stack>
    </>
  );
};

export default Actions;
