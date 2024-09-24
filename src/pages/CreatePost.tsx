import { useAppSelector } from "../app/hook";
import { CreatePostForm } from "../features/posts/CreatePostForm";
import { Navigate, useNavigate } from "react-router-dom";
import { BackBtn } from "../ui/shared/BackBtn";
import { GlowHeading } from "../ui/shared/GlowHeading";

const CreatePostPage = () => {
  const { currentUser } = useAppSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/auth/login" replace />;
  }
  return (
    <>
      <div className="mb-8">
        <BackBtn text="Back" />
      </div>

      <div className="space-y-2 text-center">
        <GlowHeading heading="Create New Post" />
      </div>

      <CreatePostForm />
    </>
  );
};

export default CreatePostPage;
