import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../apis/baseUrl";
import { RootState } from "../../app/store";
import { IUser } from "../../types/type";

interface UserState {
  users?: IUser[];
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
}
const initialState = {
  users: [],
  user: null,
  currentUser: null,
  status: "loading",
  error: null,
} as UserState;

export const fetchUsers = createAsyncThunk<
  IUser[],
  void,
  { rejectValue: string }
>("users/fetchUsers", async (_, thunkApi) => {
  try {
    const response = await API.get("/users");
    const data = response.data as IUser[];
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue("failed to fetch issues");
  }
});

export const createUser = createAsyncThunk<
  IUser,
  void,
  { rejectValue: string }
>("users/createUser", async (formData, thunkApi) => {
  try {
    const response = await API.post("/users", formData);
    const data = response.data as IUser;
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue("failed to create user");
  }
});

export const login = createAsyncThunk(
  "auth/login",
  async (formData, thunkApi) => {
    try {
      const response = await API.post("/auth/login", formData);
      const data = response.data;
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue("failed to loggedin User");
    }
  },
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (formData, thunkApi) => {
    try {
      const response = await API.post("/auth/signup", formData);
      const data = response.data;
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue("failed to signup User");
    }
  },
);

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
      })
      .addCase(createUser.fulfilled, (state: UserState, action) => {
        state?.users?.push(action.payload);
      })
      .addCase(login.fulfilled || signup.fulfilled, (_, action) => {
        localStorage.setItem("currentUser", JSON.stringify(action.payload));
      });
  },
});

export const getUsers = (state: RootState) => state.users.users;
export const getUser = (state: RootState, userId: string) =>
  state?.users?.users?.find((user) => user.id === userId);
export default userSlice.reducer;
