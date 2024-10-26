import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { UserLogin } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
  // baseUrl: "https://blog-backend-youe.onrender.com/",
  baseUrl: 'https://blog-backend-production-2d72.up.railway.app/',
  // baseUrl: 'http://127.0.0.1:4000/',
  credentials: 'include' as const,
  // prepareHeaders: (headers, { getState }: { getState: any }) => {
  //   const Token = getState().auth.token;
  //   if (Token) {
  //     headers.set("Authorization", `Bearer ${Token}`);
  //   }
  //   headers.set("Content-Type", "application/json");
  //
  //   return headers;
  // },
});

const baseQueryWithReauth = async (arg: any, api: any, extraOptions: any) => {
  const result = await baseQuery(arg, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log('sending refresh token');

    const refreshResult = (await baseQuery(
      'auth/refresh',
      api,
      extraOptions
    )) as any;
    if (refreshResult?.data) {
      api.dispatch(
        UserLogin({
          token: refreshResult.data.token,
          currentUser: refreshResult.data.currentUser,
        })
      );
      localStorage.setItem(
        'currentUser',
        JSON.parse(refreshResult.data.currentUser)
      );
      console.log(refreshResult);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = 'Your login has expired';
      }
      return refreshResult;
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['users', 'posts', 'comments', 'likes'],
  endpoints: () => ({}),
});
