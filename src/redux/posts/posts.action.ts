import _ from "lodash";
import baseUrl from "../../apis/baseUrl";

import {
  FETCH_POST,
  FETCH_POSTS,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
} from "./posts.type";
import { Dispatch } from "redux";

export const fetchPosts = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await baseUrl.get("/posts");
      dispatch({
        type: FETCH_POSTS,
        payload: response.data,
      });
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
};

export const createPost = (data: any) => async (dispatch: Dispatch) => {
  try {
    const response = await baseUrl.post("/posts", data);
    dispatch({
      type: CREATE_POST,
      payload: response.data,
    });
  } catch (err: any) {
    alert(err.response.data.msg);
  }
};

export const fetchPost = (id: string) => async (dispatch: Dispatch) => {
  try {
    const response = await baseUrl.get(`/posts/${id}`);
    dispatch({ type: FETCH_POST, payload: response.data });
  } catch (err: any) {
    alert(err.response.data.msg);
  }
};

export const editPost = (id: any, data: any) => async (dispatch: Dispatch) => {
  try {
    const response = await baseUrl.patch(`/posts/${id}`, data);
    dispatch({ type: EDIT_POST, payload: response.data });
  } catch (err) {
    alert(err.response.data.msg);
  }
};

export const deletePost = (id: any) => async (dispatch: Dispatch) => {
  try {
    const response = await baseUrl.delete(`/posts/${id}`);
    dispatch({ type: DELETE_POST, payload: response.data });
  } catch (err) {
    alert(err.response.data.msg);
  }
};
export const selectedPost = (data) => ({
  type: "SELECTED_POST",
  payload: data,
});
