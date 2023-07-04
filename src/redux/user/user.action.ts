import baseUrl from "../../apis/baseUrl";
import {
  FETCH_USER,
  FETCH_USERS,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
  SIGN_IN,
  SIGN_UP,
} from "./user.type";
export const isLoggedin = () => ({
  type: "TOGGLE_HIDDEN",
});

export const signUp = data => async dispatch => {
  try {
    const response = await baseUrl.post(`/auth/signup`, data);
    dispatch({
      type: SIGN_UP,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};
export const signIn = data => async dispatch => {
  try {
    const response = await baseUrl.post(`/auth/login`, data);
    dispatch({
      type: SIGN_IN,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};
