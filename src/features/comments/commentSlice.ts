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
      });
  },
});

export const getComments = (state: RootState) => state.comments.comments;

export default commentSlice.reducer;
