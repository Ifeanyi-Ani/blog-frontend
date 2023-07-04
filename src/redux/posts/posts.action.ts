import _ from "lodash";

import posts from "../../apis/posts";
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
      const response = await posts.get("/posts");
      dispatch({
        type: FETCH_POSTS,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const createPost = (data: any) => async (dispatch: Dispatch) => {
  try {
    const response = await posts.post("/posts", data);
    dispatch({
      type: CREATE_POST,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchPost = (id: any) => async (dispatch: Dispatch) => {
  try {
    const response = await posts.get(`/posts/${id}`);
    dispatch({ type: FETCH_POST, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const editPost = (id: any, data: any) => async (dispatch: Dispatch) => {
  try {
    const response = await posts.patch(`/posts/${id}`, data);
    dispatch({ type: EDIT_POST, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id: any) => async (dispatch: Dispatch) => {
  try {
    const response = await posts.delete(`/posts/${id}`);
    dispatch({ type: DELETE_POST, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
