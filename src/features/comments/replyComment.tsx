import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateReplyMutation } from "./commentSlice";
import { toast } from "react-hot-toast";

const ReplyComment = (props: any) => {
  const { currentUser, postId, parentId } = props;
  const [createReply, { isLoading, isSuccess, isError }] =
    useCreateReplyMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);

  const handleCreateReply = async (data: any) => {
    const formData = { ...data, userId: currentUser?.id };
    console.log(formData, errors, parentId);
    if (!formData?.userId) {
      return toast.error("User not found");
    }
    await createReply({ formData, postId, parentId });
    reset(); // Reset the form fields after comment is created
    setIsTextareaFocused(false); // Hide the textarea after submitting
  };

  return (
    <form className="mt-2" onSubmit={handleSubmit(handleCreateReply)}>
      <fieldset
        className={`relative bg-blue-600 p-2 rounded-md ${
          isTextareaFocused ? "h-40" : "h-auto"
        }`}
      >
        <textarea
          placeholder="Post your reply..."
          className={`no-focus text-stone-200 outline-none w-full bg-[unset] transition-all duration-200 ease-in-out ${
            isTextareaFocused ? "h-24 pb-10" : "h-8"
          }`}
          {...register("text", { required: "This field is required" })}
          onFocus={() => setIsTextareaFocused(true)}
        />
        {isTextareaFocused && (
          <div className="absolute bottom-2 right-2 flex gap-4 transition-all duration-200 ease-in-out">
            <button
              className="rounded-lg bg-blue-500 px-5 py-1.5"
              onClick={() => setIsTextareaFocused(false)}
            >
              close
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-700 px-5 py-1.5"
              disabled={isLoading}
            >
              {isLoading ? "Replying" : "Reply"}
            </button>
          </div>
        )}
      </fieldset>
    </form>
  );
};

export default ReplyComment;
