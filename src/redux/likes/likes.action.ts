import baseUrl from "../../apis/baseUrl";
import { LIKE, UNLIKE } from "./likes.type";
export const likeAndunlikePost =
  (data, postId, actionType) => async dispatch => {
    try {
      let response;
      if (actionType === LIKE) {
        response = await baseUrl.post(`/${postId}/like`, data);
        dispatch({
          type: LIKE,
          payload: response.data,
        });
      } else if (actionType === UNLIKE) {
        response = await baseUrl.post(`/${postId}/unlike`, data);
        dispatch({
          type: UNLIKE,
          payload: response.data,
        });
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };
