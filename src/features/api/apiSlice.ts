import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  // baseUrl: "https://tumblr-bkend.onrender.com",
  baseUrl: "http://127.0.0.1:4000/",
  credentials: "include" as const,
  prepareHeaders: (headers, { getState }: { getState: any }) => {
    const Token = getState().auth.token;
    if (Token) {
      headers.set("Authorization", `Bearer ${Token}`);
    }
    headers.set("Content-Type", "application/json");

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["users", "posts", "comments", "likes"],
  endpoints: () => ({}),
});
