import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import baseUrl, { IPost } from "../apis/baseUrl";

interface PostsState {
  posts?: IPost[];
  status: "loading" | "success" | "error";
  error: string | null;
}

const initialState = {
  posts: [],
  status: "loading",
  error: null,
} as PostsState;

export const fetchPosts = createAsyncThunk<
  IPost[],
  void,
  { rejectValue: string }
>("posts", async (_, thunkApi) => {
  try {
    const response = await baseUrl.get("/posts");
    const data = response.data as IPost[];
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue("failed to fetch issues");
  }
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state: PostsState) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state: PostsState, action) => {
        state.status = "success";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state: PostsState, action) => {
        (state.status = "error"),
          (state.error = action.error.message || "Something went wrong");
      });
  },
});

export default postSlice.reducer;
