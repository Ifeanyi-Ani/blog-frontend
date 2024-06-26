import { Stack } from "react-bootstrap";
import like from "../../assets/heart-gray.svg";
import liked from "../../assets/heart-filled.svg";
import reply from "../../assets/reply.svg";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IPost } from "../../types/type";
import CommentCount from "../comments/ComentCount";

type Props = {
  post?: IPost;
  postId?: string;
  isReplyingTo?: boolean;
  setisReplayingTo?: (isReplyingTo: boolean) => void;
  showReply?: boolean;
  toggleShowReply?: (showReply: boolean) => void;
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
          onClick={() => setisReplayingTo!(!isReplyingTo)}
        />
        <div className="flex items-center gap-2">
          {comment?.length > 0 && (
            <>
              {comment
                ?.slice(0, 3)
                .map((item: any, idx: number) => (
                  <CommentCount
                    comment={item}
                    toggleShowReply={toggleShowReply}
                    showReply={showReply}
                    post={post}
                    postId={postId}
                    key={idx}
                    index={idx}
                  />
                ))}
              <div
                className="cursor-pointer text-subtle text-blue-800"
                onClick={
                  pathname === `/post/${postId}`
                    ? () => toggleShowReply!(!showReply)
                    : () => navigate(`/post/${post?._id}`)
                }
              >
                {comment?.length} repl
                {comment?.length > 1 ? "ies" : "y"}
              </div>
            </>
          )}
        </div>
      </Stack>
    </>
  );
};

export default Actions;
