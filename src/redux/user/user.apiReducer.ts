import { FETCH_USER, FETCH_USERS, EDIT_USER, DELETE_USER } from "./user.type";
const INIT_STATE = {
  currentUser: null,
  data: null,
};
const userApiReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, data: action.payload };
    case FETCH_USER:
      return { ...state, data: action.payload };
    case EDIT_USER:
      return { ...state, data: action.payload };
    case DELETE_USER:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
export default userApiReducer;
