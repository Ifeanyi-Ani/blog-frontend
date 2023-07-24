import Avater from "./Avater";
import CreatePost from "./CreatePost";
// import { memo } from "react";

const CreatePostContainer = ({ user }) => {
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
