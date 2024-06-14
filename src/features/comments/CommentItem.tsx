import avater from "../../assets/avater.jpg";
type Props = {
  comment: any;
};

const CommentItem = (props: Props) => {
  const { comment } = props;
  return (
    <div className="flex w-full gap-2 mt-4">
      <div className="w-6 h-6 relative">
        <img
          className="absolute w-full h-full"
          src={comment.userId.photo || avater}
          alt={comment.userId.photo}
        />
      </div>
      <div className="flex-1 bg-blue-600 p-2 rounded overflow-hidden">
        <h5>{comment.userId.username}</h5>
        <span className="text-wrap">{comment.text}</span>
      </div>
    </div>
  );
};

export default CommentItem;
