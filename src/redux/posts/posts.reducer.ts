const posts = [];
const postReducer = (state = posts, action) => {
  switch (action.type) {
    case "FETCH_POSTS":
      return {
        ...state,
        posts: action.payload,
      };

    default:
      return state;
  }
};
export default postReducer;
