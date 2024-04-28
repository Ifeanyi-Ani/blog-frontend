import { apiSlice } from "../api/apiSlice";

const commentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (postId) => `posts/${postId}/comments`,
    }),

    getComment: builder.query({
      query: ({ postId, commentId }) => `posts/${postId}/comments/${commentId}`,
    }),

    createComment: builder.mutation({
      query: ({ formData, postId }) => ({
        url: `posts/${postId}/comments`,
        method: "POST",
        body: formData,
      }),
    }),

    updateComment: builder.mutation({
      query: ({ formData, postId, commentId }) => ({
        url: `posts/${postId}/comments/${commentId}`,
        method: "PATCH",
        body: formData,
      }),
    }),

    deleteComment: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `posts/${postId}/comments/${commentId}`,
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
