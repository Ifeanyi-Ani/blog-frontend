import * as React from "react"
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';

import { useCreatePostMutation } from './postSlice';

const createPostSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be 100 characters or less'),
  content: z.string().min(3, 'Content must be at least 3 characters long'),
  tags: z.string().optional(),
});

type CreatePostFormData = z.infer<typeof createPostSchema>;

export const CreatePostForm = () => {
  const navigate = useNavigate();
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [previewMode, setPreviewMode] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: '',
    },
  });

  const watchContent = watch('content');

  const onSubmit = async (data: CreatePostFormData) => {
    try {
      const tagsArray = data.tags
        ? data.tags.split(',').map((tag) => ({ text: tag.trim() }))
        : [];

      await createPost({ ...data, tags: tagsArray }).unwrap();
      toast.success('Post created successfully!');
      navigate('/');
    } catch (err) {
      console.error('Failed to create the post:', err);
      toast.error('Failed to create the post. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-lg bg-card p-6 shadow-md"
    >
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Title
        </label>
        <input
          {...register('title')}
          type="text"
          id="title"
          placeholder="Enter post title"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {errors.title && (
          <p className="mt-1 text-xs text-destructive">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="content"
            className="text-sm font-medium text-foreground"
          >
            Content
          </label>
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="text-sm text-primary hover:text-primary/80"
          >
            {previewMode ? 'Edit' : 'Preview'}
          </button>
        </div>
        {previewMode ? (
          <div className="prose prose-sm dark:prose-invert min-h-[300px] w-full rounded-md border border-input bg-background p-3">
            <ReactMarkdown>{watchContent}</ReactMarkdown>
          </div>
        ) : (
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                id="content"
                placeholder="Write your post content here (Markdown supported)"
                className="min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
              />
            )}
          />
        )}
        {errors.content && (
          <p className="mt-1 text-xs text-destructive">
            {errors.content.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="tags"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Tags (comma-separated)
        </label>
        <input
          {...register('tags')}
          type="text"
          id="tags"
          placeholder="Enter tags, separated by commas"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-md bg-primary py-2 text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
      >
        {isLoading ? 'Creating Post...' : 'Create Post'}
      </button>
    </form>
  );
};
