import {
  FETCH_USER,
  FETCH_USERS,
  EDIT_USER,
  DELETE_USER,
  CREATE_USER,
  SIGN_IN,
  SIGN_UP,
} from "./user.type";
const INIT_STATE = {
  currentUser: null,
  data: null,
};
const userApiReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGN_UP:
      return { ...state, currentUser: action.payload };
    case SIGN_IN:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};
export default userApiReducer;
