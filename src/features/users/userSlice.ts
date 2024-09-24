import { IUser } from "../../types/type";
import { apiSlice } from "../api/apiSlice";
import { UserLogin, UserLogout } from "../auth/authSlice";

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
            })
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
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
      invalidatesTags: (_result, _error, arg: any) => [
        { type: "users", id: arg.id },
      ],
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
          apiSlice.util.resetApiState();
        } catch (error) {
          console.error(error);
        }
      },
    }),

    getUsers: builder.query({
      query: () => ({
        url: "users",
      }),
      providesTags: (result, _error, _arg) =>
        result
          ? [
              ...result.map(({ id }: { id: string }) => ({
                type: "users" as const,
                id,
              })),
              "users",
            ]
          : ["users"],
    }),

    updateUser: builder.mutation({
      query: ({ formData, id }: IUserData) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "users", id: arg.id },
      ],
    }),

    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),

    getUser: builder.query({
      query: (id: string) => ({
        url: `users/${id}`,
      }),
      providesTags: (_result, _error, arg: any) => [
        { type: "users", id: arg.id },
      ],
    }),

    refresh: builder.mutation({
      query: () => ({
        url: "auth/refresh",
        method: "GET",
      }),

      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          setTimeout(() => {
            dispatch(
              UserLogin({
                token: result.data.token,
                currentUser: result.data.currentUser,
              })
            );
          }, 1000);
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
  useRefreshMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserQuery,
} = usersSlice;
