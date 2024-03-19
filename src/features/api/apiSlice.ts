import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getToken = (): string | null => {
  return localStorage.getItem("currentUser");
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tumblr-bkend.onrender.com",
    prepareHeaders: (headers) => {
      const Token = getToken();
      if (Token) {
        headers.set("Authorization", `Bearer ${JSON.parse(Token).token}`);
      }
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
