import { SIGN_IN, SIGN_UP, LOG_OUT } from "./user.type";
const authReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_UP:
      return { ...state, currentUser: action.payload };
    case SIGN_IN:
      return { ...state, currentUser: action.payload };
    case LOG_OUT:
      return { ...state, currentUser: null };
    default:
      return state;
  }
};
export default authReducer;
