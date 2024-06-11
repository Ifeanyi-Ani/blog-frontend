import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { useCreateCommentMutation } from "./commentSlice";
import { useAppSelector } from "../../app/hook";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
type Props = {
  postId: string;
};

type DataProps = {
  text: string;
  userId: string;
};

const CreateComment = (props: Props) => {
  const { id: postId } = useParams();
  const { currentUser } = useAppSelector((state) => state.auth);
  const [comment, setComment] = useState<DataProps>();
  const [createComment, { isLoading, isSuccess, isError }] =
    useCreateCommentMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreateComment = async (data: any) => {
    const formData = { ...data, userId: currentUser?.id };
    console.log(formData, errors);
    if (!formData?.userId) {
      return toast.error("user not found");
    }
    await createComment({ formData, postId });
  };
  return (
    <form className="comment-form" onSubmit={handleSubmit(handleCreateComment)}>
      <fieldset>
        <input
          type="text"
          placeholder="comment..."
          className="no-focus text-blue-900 outline-none"
          {...register("text", { required: "this field is required" })}
        />
      </fieldset>
      <button
        type="submit"
        className="rounded-lg bg-blue-500 px-5 py-1.5"
        disabled={isLoading}
      >
        {isLoading ? "Replying" : "Reply"}
      </button>
    </form>
  );
};

export default CreateComment;
