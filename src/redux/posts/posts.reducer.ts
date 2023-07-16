import {
  CREATE_POST,
  DELETE_POST,
  EDIT_POST,
  FETCH_POST,
  FETCH_POSTS,
} from "./posts.type";
const postReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case FETCH_POST: {
      return { ...state, post: action.payload };
    }
    case EDIT_POST: {
      return { ...state, post: action.payload };
    }
    case CREATE_POST: {
      return { ...state, post: action.payload };
    }
    case DELETE_POST: {
      return { ...state, post: action.payload };
    }
    case "SELECTED_POST":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
export default postReducer;
