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
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
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
      response = await baseUrl.post(`/auth/login`, data, {
        headers: {
          Authorization: `Bearer ${response?.data?.token}`,
        },
      });
      dispatch({
        type: SIGN_IN,
        payload: response.data,
      });
    }
  } catch (err) {
    console.log(err?.response?.data);
  }
};
export const fetchUsers = () => async dispatch => {
  try {
    const response = await baseUrl.get("/users");
    dispatch({
      type: FETCH_USERS,
      payload: response.data,
    });
  } catch (err) {
    console.log(err.response.data);
  }
};
export const fetchUser = id => async dispatch => {
  try {
    const response = await baseUrl.get(`/users/${id}`);
    dispatch({
      type: FETCH_USER,
      payload: response.data,
    });
  } catch (err) {
    console.log(err.response.data);
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
    console.log(err.response.data);
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
    console.log(err.response.data);
  }
};
