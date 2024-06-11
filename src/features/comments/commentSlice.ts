import { apiSlice } from "../api/apiSlice";

const commentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (postId) => `comments/${postId}/`,
    }),

    getComment: builder.query({
      query: ({ postId, commentId }) => `comments/posts/${postId}/${commentId}`,
    }),

    createComment: builder.mutation({
      query: ({ formData, postId }) => ({
        url: `comments/${postId}`,
        method: "POST",
        body: formData,
      }),
    }),

    updateComment: builder.mutation({
      query: ({ formData, postId, commentId }) => ({
        url: `comments/${postId}/${commentId}`,
        method: "PATCH",
        body: formData,
      }),
    }),

    deleteComment: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `comments/posts/${postId}/${commentId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCommentQuery,
  useGetCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentSlice;
