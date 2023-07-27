import Avater from "./Avater";
import CreatePost from "./CreatePost";
// import { memo } from "react";

const CreatePostContainer = ({ user }) => {
  return (
    <div className='createPost'>
      <Avater src={user?.data?.user?.photo} />
      <CreatePost />
    </div>
  );
};

export default CreatePostContainer;
