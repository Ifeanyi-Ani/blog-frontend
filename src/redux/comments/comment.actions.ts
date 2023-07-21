import baseUrl from "../../apis/baseUrl";
import {
  GETCOMMENTS,
  DELETECOMMENT,
  EDITCOMMENT,
  CREATECOMMENT,
} from "./comment.type";

export const fetchComments = postId => async dispatch => {
  let response;
  try {
    response = await baseUrl.get(`/posts/${postId}/comments`);
    dispatch({
      type: GETCOMMENTS,
      payload: response.data,
    });
  } catch (err) {
    alert(err.response.data.message);
  }
};
export const createComment = (postId, data) => async dispatch => {
  try {
    const response = await baseUrl.post(`/posts/${postId}/comments`, data);

    dispatch({
      type: CREATECOMMENT,
      payload: response.data,
    });
  } catch (err) {
    alert(err.response.data.message);
  }
};
export const deleteComment = (postId, commentId) => async dispatch => {
  let response;
  try {
    response = await baseUrl.delete(`/posts/${postId}/comments/${commentId}`);
    dispatch({
      type: DELETECOMMENT,
      payload: response.data,
    });
  } catch (err) {
    alert(err.response.data.message);
  }
};
