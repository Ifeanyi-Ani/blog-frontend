import Avater from "./Avater";
import CreatePost from "./CreatePost";
// import { memo } from "react";

const CreatePostContainer = ({ user }) => {
  
  return (
    <div className='createPost'>
      <Avater
        src={`http://127.0.0.1:4000/img/users/${user?.data?.user?.photo}`}
      />
      <CreatePost />
    </div>
  );
};

export default CreatePostContainer;
