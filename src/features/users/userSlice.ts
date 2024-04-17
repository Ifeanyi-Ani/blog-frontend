import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../apis/baseUrl";
import { RootState } from "../../app/store";
import { IUser } from "../../types/type";
import { apiSlice } from "../api/apiSlice";
import { UserLogin } from "./authSlice";

interface IUserData {
  formData: Partial<IUser>;
  id: string;
}

const usersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (formData) => ({
        url: "auth/login",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            UserLogin({
              token: result.data.token,
              currentUser: result.data.currentUser,
            }),
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),

    signUp: builder.mutation({
      query: (formData) => ({
        url: "auth/signup",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            UserLogin({
              token: result.data.token,
              currentUser: result.data.currentUser,
            }),
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),

    logOut: builder.mutation({
      query: () => ({
        url: "auth/logOut",
        method: "POST",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(UserLogOut());
        } catch (error) {
          console.error(error);
        }
      },
    }),

    updateUser: builder.mutation({
      query: ({ formData, id }: IUserData) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: formData,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),

    getUser: builder.query({
      query: (id: string) => ({
        url: `users/${id}`,
      }),
    }),

    refresh: builder.query({
      query: () => ({
        url: "auth/refresh",
        method: "GET",
      }),

      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            UserLogin({
              token: result.data.token,
              currentUser: result.data.currentUser,
            }),
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});
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

export const {
  useLoginMutation,
  useSignUpMutation,
  useLogOutMutation,
  useRefreshQuery,
  useGetLoggedUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserQuery,
} = usersSlice;
export const getUsers = (state: RootState) => state.users.users;
export const getUser = (state: RootState, userId: string) =>
  state?.users?.users?.find((user) => user.id === userId);
export default userSlice.reducer;
function UserLogOut(): any {
  throw new Error("Function not implemented.");
}
