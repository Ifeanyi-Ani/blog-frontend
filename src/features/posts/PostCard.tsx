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

const PostCard = ({ children, post }: PostCardProps) => {
  const { currentUser } = useAppSelector((state) => state.auth);
  // const [show, setShow] = useState(false);
  const [checkLike, setCheckLike] = useState(false);
  // const dispatch = useAppDispatch();

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

  // useEffect(() => {
  //   // getAllComments();
  //   checkLikeUser();
  // }, []);
  // const dispatch = useAppDispatch();
  // const [check, setCheck] = useState(false);
  // const comments = useSelector((state) => state.comment?.comments);

  // const [postComments, setPostComments] = useState();
  // const init_data = {
  //   text: "",
  //   userId: currentUser?.id || "",
  // };
  // const [comment, setComment] = useState(init_data);

  /* async function handleCommentSubmit(postId: string) {
    const updatedComment = { ...comment, postId };
    await dispatch(createComment(postId, updatedComment));
    await dispatch(fetchComments(postId));
    await getAllComments(); // Assuming getAllComments is an asynchronous function
    setComment(init_data);
  } */

  /* async function handleComment(postId: string) {
    await dispatch(fetchComments(postId));
    setCheck(!check);
  } */

  /* async function getAllComments() {
    const response = await API.get("/posts/comments");
    const allCommets = await response.data.data.comments;
    setPostComments(allCommets);
  } */
  /* async function handleDeleteComment(postId: string, id: string) {
    if (confirm("Are you sure you want to delete this comment?")) {
      await dispatch(deleteComment(postId, id));
      await dispatch(fetchComments(postId));
      getAllComments();
    }
  } */

  /* const [loaded, setisLoaded] = useState(true);
  useEffect(() => {
    if (loaded) {
      getAllComments();
      checkLikeUser();
    }
    setisLoaded(false);
  }, [loaded]); */
  return (
    <div>
      <Card>
        {children}
        <UserHeader currentUser={currentUser} post={post} />
        <Card.Body>
          <div className="" />
          <Link
            to={`/post/${post.id}`}
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

        {/* {check && ( */}
        {/*   <div className="commentSec p-3"> */}
        {/*     <div className="commentNav border-bottom-1 d-flex gap-3"> */}
        {/*       <div> */}
        {/*         <i className="bi bi-chat"></i> */}
        {/*         {postComments */}
        {/*           ? postComments.filter( */}
        {/*               (comment) => comment.postId === post._id, */}
        {/*             ).length */}
        {/*           : null} */}
        {/*       </div> */}
        {/*       <div> */}
        {/*         <i className="bi bi-fullscreen"></i>900 */}
        {/*       </div> */}
        {/*       <div> */}
        {/*         <i className="bi bi-heart"></i> */}
        {/*         {post?.likes ? post?.likes?.length : null} */}
        {/*       </div> */}
        {/*       <div> */}
        {/*         <i className="bi bi-fullscreen"></i>900 */}
        {/*       </div> */}
        {/*       <div className="ms-auto">Comments</div> */}
        {/*     </div> */}
        {/*     <div className="card-footer bg-white p-0 border-0 mb-4"> */}
        {/*       <div className="d-flex flex-start w-100"> */}
        {/*         <img */}
        {/*           className="rounded-circle shadow-1-strong me-3" */}
        {/*           src={currentUser?.data?.user?.photo} */}
        {/*           alt="avatar" */}
        {/*           width="40" */}
        {/*           height="40" */}
        {/*         /> */}
        {/*         <div className="form-outline w-100"> */}
        {/*           <textarea */}
        {/*             className="form-control" */}
        {/*             id="textAreaExample" */}
        {/*             rows={4} */}
        {/*             placeholder="comments" */}
        {/*             style={{ background: "#fff" }} */}
        {/*             value={comment.text} */}
        {/*             onChange={(e) => */}
        {/*               setComment({ ...comment, text: e.target.value }) */}
        {/*             } */}
        {/*           ></textarea> */}
        {/*         </div> */}
        {/*       </div> */}
        {/*       <div className="float-end pt-1"> */}
        {/*         <button */}
        {/*           type="button" */}
        {/*           className="btn btn-primary btn-sm" */}
        {/*           onClick={() => handleCommentSubmit(post?._id)} */}
        {/*         > */}
        {/*           Post comment */}
        {/*         </button> */}
        {/*       </div> */}
        {/*     </div> */}
        {/*     <div className="commentsBody"> */}
        {/*       {comments?.data?.comments ? ( */}
        {/*         [...comments.data.comments].reverse().map((comment) => ( */}
        {/*           <div className="commentItem" key={comment._id}> */}
        {/*             <div className="d-flex flex-start"> */}
        {/*               <img */}
        {/*                 className="rounded-circle shadow-1-strong me-3" */}
        {/*                 src={comment?.userId?.photo} */}
        {/*                 width="60" */}
        {/*                 height="60" */}
        {/*               /> */}
        {/**/}
        {/*               <div> */}
        {/*                 <h6 className="fw-bold mb-1"> */}
        {/*                   {comment?.userId?.username || "Unknown User"} */}
        {/*                 </h6> */}
        {/*                 <div className="d-flex align-items-center mb-3"> */}
        {/*                   <p className="mb-0"> */}
        {/*                     {new Date(comment.createdAt).toLocaleString()} */}
        {/*                     <span className="badge bg-primary"> */}
        {/*                       {comment?.userId?.role || "Unknown User"} */}
        {/*                     </span> */}
        {/*                   </p> */}
        {/**/}
        {/*                   {currentUser?.data?.user?._id === */}
        {/*                   comment?.userId?._id ? ( */}
        {/*                     <> */}
        {/*                       <a href="#!" className="link-muted"> */}
        {/*                         <i */}
        {/*                           className="bi bi-trash-fill" */}
        {/*                           role="button" */}
        {/*                           onClick={() => */}
        {/*                             handleDeleteComment(post?._id, comment._id) */}
        {/*                           } */}
        {/*                         ></i> */}
        {/*                       </a> */}
        {/*                       <a href="#!" className="link-muted"> */}
        {/*                         <i className="bi bi-pencil-fill"></i> */}
        {/*                       </a> */}
        {/*                     </> */}
        {/*                   ) : null} */}
        {/*                 </div> */}
        {/*                 <p className="mb-0">{comment.text}</p> */}
        {/*               </div> */}
        {/*             </div> */}
        {/**/}
        {/*             <hr className="my-0" /> */}
        {/*           </div> */}
        {/*         )) */}
        {/*       ) : ( */}
        {/*         <div>Loading Comment</div> */}
        {/*       )} */}
        {/*     </div> */}
        {/*   </div> */}
        {/* )} */}
      </Card>
      {/* <Login_Signup */}
      {/*   show={show} */}
      {/*   handleModal1={() => setShow(false)} */}
      {/*   setShow={setShow} */}
      {/* /> */}
    </div>
  );
};

export default PostCard;
