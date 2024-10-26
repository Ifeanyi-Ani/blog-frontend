import { apiSlice } from '../api/apiSlice';

const commentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostComments: builder.query({
      query: (postId) => `posts/${postId}/comments`,
      providesTags: (result, _error, _arg) =>
        result
          ? [
              ...result.map(({ id }: { id: string }) => {
                return {
                  type: 'comments' as const,
                  id,
                };
              }),
              'comments',
            ]
          : ['coments'],
    }),

    getComment: builder.query({
      query: ({ postId, commentId }) => `comments/posts/${postId}/${commentId}`,
      providesTags: (_result, _error, arg) => {
        return [
          {
            type: 'comments' as const,
            id: arg.id,
          },
        ];
      },
    }),

    getReplies: builder.query({
      query: (parentId) => `comments/${parentId}/replies`,
      providesTags: (result, _error, _arg) =>
        result
          ? [
              ...result.map(({ id }: { id: string }) => {
                return {
                  type: 'comments' as const,
                  id,
                };
              }),
              'comments',
            ]
          : ['coments'],
    }),
    createComment: builder.mutation({
      query: ({ formData, postId }) => ({
        url: `posts/${postId}/comments`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: (_result, _error, arg) => {
        return [{ type: 'comments', id: arg.id }];
      },
    }),

    createReply: builder.mutation({
      query: ({ formData, parentId }) => ({
        url: `comments/${parentId}/replies`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: (_result, _error, arg) => {
        return [{ type: 'comments', id: arg.id }];
      },
    }),

    updateComment: builder.mutation({
      query: ({ formData, postId, commentId }) => ({
        url: `comments/${postId}/${commentId}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: (_result, _error, arg) => {
        return [
          {
            type: 'comments',
            id: arg.id,
          },
        ];
      },
    }),

    deleteComment: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `comments/${postId}/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, arg) => {
        return [{ type: 'comments', id: arg.id }];
      },
    }),

    likeComment: builder.mutation({
      query: (commentId) => ({
        url: `comments/${commentId}/likes`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, arg) => {
        return [{ type: 'comments', id: arg.id }];
      },
    }),
  }),
});

export const {
  useGetCommentQuery,
  useGetPostCommentsQuery,
  useGetRepliesQuery,
  useCreateCommentMutation,
  useCreateReplyMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useLikeCommentMutation,
} = commentSlice;
