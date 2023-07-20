import baseUrl from "../../apis/baseUrl";
import {
  FETCH_USER,
  FETCH_USERS,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
  SIGN_IN,
  SIGN_UP,
  LOG_OUT,
} from "./user.type";
export const auth = (data, actionType) => async dispatch => {
  try {
    let response;
    if (actionType === SIGN_UP) {
      response = await baseUrl.post(`/auth/signup`, data);
      dispatch({
        type: actionType,
        payload: response.data,
      });
    } else if (actionType === SIGN_IN) {
      response = await baseUrl.post(`/auth/login`, data);
      dispatch({
        type: SIGN_IN,
        payload: response.data,
      });
    }
  } catch (err) {
    alert(err?.response?.data.message);
  }
};
export const logOut = () => ({
  type: LOG_OUT,
});
export const fetchUsers = () => async dispatch => {
  try {
    const response = await baseUrl.get("/users");
    dispatch({
      type: FETCH_USERS,
      payload: response.data,
    });
  } catch (err) {
    alert(err.response.data.message);
  }
};
export const fetchUser = (id: any) => async dispatch => {
  try {
    const response = await baseUrl.get(`/users/${id}`);
    dispatch({
      type: FETCH_USER,
      payload: response.data,
    });
  } catch (err) {
    alert(err.response.data.message);
  }
};
export const editUser = (data, id) => async dispatch => {
  try {
    const response = await baseUrl.patch(`/users/${id}`, data);
    dispatch({
      type: EDIT_USER,
      payload: response.data,
    });
  } catch (err) {
    alert(err.response.data.message);
  }
};
export const deleteUser = id => async dispatch => {
  try {
    const response = await baseUrl.delete(`/users/${id}`);
    dispatch({
      type: DELETE_USER,
      payload: response.data,
    });
  } catch (err) {
    alert(err.response.data.message);
  }
};
