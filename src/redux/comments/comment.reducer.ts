import { CREATECOMMENT, GETCOMMENTS, DELETECOMMENT } from "./comment.type";
const INIT = {
  comments: [],
};

const commentReducer = (state = INIT, action) => {
  switch (action.type) {
    case CREATECOMMENT:
      return {
        ...state,
        comments: action.payload,
      };
    case GETCOMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case DELETECOMMENT:
      return {
        ...state,
        comments: action.payload,
      };
    default:
      return state;
  }
};
export default commentReducer;
