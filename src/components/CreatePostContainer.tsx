import Avater from "./Avater";
import CreatePost from "./CreatePost";

const CreatePostContainer = ({ user }) => {
  console.log(user);
  return (
    <div className='createPost'>
      <Avater
        src={`https://tumblr-bkend.onrender.com/img/users/${user?.data?.user?.photo}`}
      />
      <CreatePost />
    </div>
  );
};

export default CreatePostContainer;
