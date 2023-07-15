import { LIKE, UNLIKE } from "./likes.type";
const likeReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE:
      return { ...state, like: action.payload };
    case UNLIKE:
      return { ...state, unlike: action.payload };
    default:
      return state;
  }
};
export default likeReducer