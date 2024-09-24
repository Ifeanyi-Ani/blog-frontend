import React, { useMemo } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { zodResolver } from "@hookform/resolvers/zod";

import { useCreatePostMutation } from "./postSlice";
import { FormField } from "../../ui/shared/FormField";
import { SubmitBtn } from "../../ui/shared/SubmitBtn";

interface Tag {
  id: string;
  [key: string]: string;
  className?: any;
}

const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.object({ id: z.string(), text: z.string() })).optional(),
  images: z.array(z.instanceof(File)).optional(),
});

type CreatePostFormData = z.infer<typeof createPostSchema>;

export const CreatePostForm = () => {
  const navigate = useNavigate();
  const [createPost, { isLoading }] = useCreatePostMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
      images: [],
    },
  });

  const watchedTags = watch("tags") as Tag[];
  const watchedImages = watch("images") as File[];

  const onSubmit = async (data: CreatePostFormData) => {
    try {
      await createPost(data).unwrap();
      toast.success("Post created successfully!");
      navigate("/");
    } catch (err) {
      console.error("Failed to create the post:", err);
      toast.error("Failed to create the post. Please try again.");
    }
  };

  const handleTagDelete = (i: number) => {
    const newTags = [...watchedTags];
    newTags.splice(i, 1);
    setValue("tags", newTags);
  };

  const handleTagAddition = (tag: { id: string; text: string }) => {
    setValue("tags", [...watchedTags, tag]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setValue("images", [...watchedImages, ...files]);
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ color: [] }, { background: [] }],
        ["link", "image"],
        ["clean"],
      ],
    }),
    []
  );
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
      encType="multipart/form-data"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-customBlue-300 mb-2"
        >
          Title
        </label>
        <FormField
          name="title"
          control={control}
          placeholder="Enter post title"
          type="text"
        />
        {errors.title && (
          <p className="mt-1 text-red-500 text-xs">{errors.title.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-customBlue-300 mb-2"
        >
          Content
        </label>
        <div className="h-96">
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <ReactQuill
                {...field}
                theme="snow"
                modules={modules}
                className="w-full bg-customBlue-800 border-customBlue-700 text-electricCyan-100 placeholder-customBlue-500 focus:border-electricCyan-500 focus:ring-electricCyan-500 rounded-md custom-scrollbar h-full overflow-hidden"
              />
            )}
          />
        </div>
        {errors.content && (
          <p className="mt-1 text-red-500 text-xs">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-customBlue-300 mb-2">
          Tags
        </label>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <ReactTags
              tags={field.value}
              handleDelete={handleTagDelete}
              handleAddition={handleTagAddition}
              inputFieldPosition="bottom"
              autocomplete
              classNames={{
                tags: "flex flex-wrap gap-2",
                tagInput: "mt-2",
                tagInputField:
                  "w-full rounded-md border border-customBlue-700 bg-customBlue-800 px-3 py-2 text-sm text-customBlue-100 placeholder-customBlue-500 focus:border-customBlue-500 focus:outline-none focus:ring-1 focus:ring-customBlue-500",
                selected:
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-customBlue-700 text-customBlue-200",
                remove: "ml-1 text-customBlue-400 hover:text-customBlue-200",
              }}
            />
          )}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-customBlue-300 mb-2">
          Images
        </label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-customBlue-700 border-dashed rounded-lg cursor-pointer bg-customBlue-800 hover:bg-customBlue-700"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <PlusCircle className="w-10 h-10 mb-3 text-customBlue-500" />
              <p className="mb-2 text-sm text-customBlue-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-customBlue-500">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>

            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleImageUpload}
              multiple
              accept="image/*"
            />
          </label>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {watchedImages.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`Uploaded ${index + 1}`}
              className="w-full h-24 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      <SubmitBtn
        type="submit"
        isLoading={isLoading}
        btnText="Create Post"
        loadingBtnText="Creating Post..."
      />
    </form>
  );
};
