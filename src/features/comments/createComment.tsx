import { useState } from "react";
import { Form } from "react-hook-form";
type Props = {};

const CreateComment = (props: Props) => {
  const [comment, setComment] = useState("");
  return (
    <form className="comment-form">
      <fieldset>
        <input
          type="text"
          placeholder="Comment..."
          className="no-focus text-blue-900 outline-none"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </fieldset>
      <button type="submit" className="rounded-lg bg-blue-500 px-5 py-1.5">
        Reply
      </button>
    </form>
  );
};

export default CreateComment;
