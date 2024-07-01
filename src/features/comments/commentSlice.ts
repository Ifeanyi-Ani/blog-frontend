import { apiSlice } from "../api/apiSlice";

const commentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (postId) => `comments/${postId}/`,
      providesTags: (result, _error, _arg) =>
        result
          ? [
              ...result.map(({ id }: { id: string }) => {
                return {
                  type: "comments" as const,
                  id,
                };
              }),
              "comments",
            ]
          : ["coments"],
    }),

    getComment: builder.query({
      query: ({ postId, commentId }) => `comments/posts/${postId}/${commentId}`,
      providesTags: (_result, _error, arg) => {
        return [
          {
            type: "comments" as const,
            id: arg.id,
          },
        ];
      },
    }),

    createComment: builder.mutation({
      query: ({ formData, postId }) => ({
        url: `comments/${postId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (_result, _error, arg) => {
        return [{ type: "comments", id: arg.id }];
      },
    }),

    createReply: builder.mutation({
      query: ({ formData, postId, parentId }) => ({
        url: `comments/${postId}/${parentId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (_result, _error, arg) => {
        return [{ type: "comments", id: arg.id }];
      },
    }),

    updateComment: builder.mutation({
      query: ({ formData, postId, commentId }) => ({
        url: `comments/${postId}/${commentId}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (_result, _error, arg) => {
        return [
          {
            type: "comments",
            id: arg.id,
          },
        ];
      },
    }),

    deleteComment: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `comments/${postId}/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => {
        return [{ type: "comments", id: arg.id }];
      },
    }),
  }),
});

export const {
  useGetCommentQuery,
  useGetCommentsQuery,
  useCreateCommentMutation,
  useCreateReplyMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentSlice;
