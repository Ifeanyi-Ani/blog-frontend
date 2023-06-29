import _ from "lodash";
import posts from "../../apis/posts";

// export const fetchPostsAndUser = () => async (dispatch, getState) => {
//   await dispatch(fetchPosts());
//   const userIds = _.uniq(_.map(getState().posts, "userId"));
//   userIds.forEach(id => dispatch(fetchPostUser(id)));
//   // _.chain(getState().posts)
//   //   .map("userId")
//   //   .uniq()
//   //   .forEach(id => dispatch(fetchPostUser(id)))
//   //   .value();
// };

export const fetchPosts = () => {
  return async dispatch => {
    const response = await posts.get("/posts");
    dispatch({
      type: "FETCH_POSTS",
      payload: response.data,
    });
  };
};

export const fetchPostUser = id => async dispatch => {
  const response = await posts.get(`/users/${id}`);
  dispatch({ type: "USER_POSTS", payload: response.data });
};
