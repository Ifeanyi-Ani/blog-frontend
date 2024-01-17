import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../apis/baseUrl";
import { RootState } from "../app/store";
import { IUser } from "../types/type";

interface UserState {
  users?: IUser[];
  status: "loading" | "success" | "error";
  error: string | null;
}
const initialState = {
  users: [],
  status: "loading",
  error: null,
} as UserState;

export const fetchUsers = createAsyncThunk<
  IUser[],
  void,
  { rejectValue: string }
>("users", async (_, thunkApi) => {
  try {
    const response = await baseUrl.get("/users");
    const data = response.data as IUser[];
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue("failed to fetch issues");
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state: UserState) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state: UserState, action) => {
        state.status = "success";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state: UserState, action) => {
        state.status = "error";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const getUsers = (state: RootState) => state.users.users;
export default userSlice.reducer;
