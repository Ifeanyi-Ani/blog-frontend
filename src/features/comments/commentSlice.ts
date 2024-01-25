import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { IComment } from "../../types/type";
import API from "../../apis/baseUrl";

export const fetchComments = createAsyncThunk<
  IComment[],
  void,
  { rejectValue: string }
>("posts/comments", async (_, thunkApi) => {
  try {
    const response = await API.get("/posts/comments");
    const data = response.data as IComment[];
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue("failed to fetch comments");
  }
});

export const createComment = createAsyncThunk<
  IComment,
  void,
  { rejectValue: string }
>("createComment", async (formData, thunkApi) => {
  try {
    const response = await API.post("/posts/comments", formData);
    const data = response.data;
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue("failed to create comment");
  }
});

export const deleteComment = createAsyncThunk<
  IComment,
  void,
  { rejectValue: string }
>("deleteComment", async (commentId, thunkApi) => {
  try {
    const response = await API.post(`/posts/comments/${commentId}`);
    const data = response.data;
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue("failed to delete comment");
  }
});

interface CommentState {
  comments: IComment[];
  status: "loading" | "success" | "error";
  error: string | null;
}
const initialState = {
  comments: [],
  status: "loading",
  error: null,
} as CommentState;

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "success";
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload || "sommething went wrong";
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });
  },
});

export const getComments = (state: RootState) => state.comments.comments;

export const getPostComment = (state: RootState, postId: string) => {
  const postComment = state?.comments?.comments?.find(
    (comment) => comment.postId === postId,
  );
  return postComment;
};

export default commentSlice.reducer;
