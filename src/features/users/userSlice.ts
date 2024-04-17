import { IUser } from "../../types/type";
import { apiSlice } from "../api/apiSlice";
import { UserLogin, UserLogout } from "./authSlice";

interface IUserData {
  formData: Partial<IUser | any>;
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
          dispatch(UserLogout());
        } catch (error) {
          console.error(error);
        }
      },
    }),

    getUsers: builder.query({
      query: () => ({
        url: "users",
      }),
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

export const {
  useLoginMutation,
  useSignUpMutation,
  useLogOutMutation,
  useRefreshQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserQuery,
} = usersSlice;
