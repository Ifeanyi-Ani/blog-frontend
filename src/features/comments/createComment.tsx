import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateCommentMutation } from "./commentSlice";
import { useAppSelector } from "../../app/hook";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const CreateComment = () => {
  const { id: postId } = useParams();
  const { currentUser } = useAppSelector((state) => state.auth);
  const [createComment, { isLoading, isSuccess, isError }] =
    useCreateCommentMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);

  const handleCreateComment = async (data: any) => {
    const formData = { ...data, userId: currentUser?.id };
    console.log(formData, errors);
    if (!formData?.userId) {
      return toast.error("User not found");
    }
    await createComment({ formData, postId });
    reset(); // Reset the form fields after comment is created
    setIsTextareaFocused(false); // Hide the textarea after submitting
  };

  return (
    <form className="mt-2" onSubmit={handleSubmit(handleCreateComment)}>
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
          onMouseLeave={() => setIsTextareaFocused(false)}
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-700 px-5 py-1.5 absolute bottom-2 right-2 transition-all duration-200 ease-in-out"
          disabled={isLoading}
        >
          {isLoading ? "Replying" : "Reply"}
        </button>
      </fieldset>
    </form>
  );
};

export default CreateComment;
